import { AttachmentTypes, IMAGE_MAX_SIZE, IMAGE_SCALE } from '../constants'
import { ImageAttachment } from '../types/attachments'
import { ggID, readAsDataURL, readAsImage } from './helpers'

export const AttachmentImageProcess = async (file: File) => {
  try {
    const url = await readAsDataURL(file)
    const img = await readAsImage(url as string)

    const id = ggID()
    const { width, height } = img

    let scale = IMAGE_SCALE
    if (width > IMAGE_MAX_SIZE) {
      scale = IMAGE_MAX_SIZE / width
    }

    if (height > IMAGE_MAX_SIZE) {
      scale = Math.min(scale, IMAGE_MAX_SIZE / height)
    }

    const newCanvasWidth = width * scale
    const newCanvasHeight = height * scale

    const imageAttachemnt: ImageAttachment = {
      id,
      type: AttachmentTypes.IMAGE,
      x: 0,
      y: 0,
      img,
      file,
      hash: window.crypto.randomUUID(),
      width: newCanvasWidth,
      height: newCanvasHeight
    }
    return imageAttachemnt
  } catch (error) {
    console.log('Failed to load image', error)
    throw new Error('Failed to load image')
  }
}
