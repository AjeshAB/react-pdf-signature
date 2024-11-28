import { AttachmentImageType, ImageAttachment } from '../../../types/attachments'
import { useRef, useState, useEffect } from 'react'
import ImageComponent from '../components/image'
import { RndDragCallback, RndResizeCallback } from 'react-rnd'

const AttachmentImage = (props: AttachmentImageType & ImageAttachment): JSX.Element => {
  const { x, y, img, width, height, removeImage, updateImageAttachment } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasWidth, setCanvasWidth] = useState(width)
  const [canvasHeight, setCanvasHeight] = useState(height)
  const [positionTop, setPositionTop] = useState(y)
  const [positionLeft, setPositionLeft] = useState(x)

  useEffect(() => {
    const renderImage = (img: HTMLImageElement) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const context = canvas.getContext('2d')
      if (!context) return

      setCanvasWidth(canvasWidth)
      setCanvasHeight(canvasHeight)

      canvas.width = canvasWidth
      canvas.height = canvasHeight

      context.drawImage(img, 0, 0, canvasWidth, canvasHeight)
    }

    renderImage(img)
  }, [img, canvasWidth, canvasHeight])

  const handleOnDragStoped: RndDragCallback = (event, data) => {
    event.preventDefault()
    setPositionLeft(data.x)
    setPositionTop(data.y)
    updateImageAttachment({
      x: data.x,
      y: data.y
    })
  }

  const handleOnResizeStop: RndResizeCallback = (e, direction, ref, delta, position) => {
    e.preventDefault()
    const width = parseInt(ref.style.width, 10)
    const height = parseInt(ref.style.height, 10)

    setCanvasWidth(width)
    setCanvasHeight(height)

    setPositionLeft(position.x)
    setPositionTop(position.y)
    updateImageAttachment({
      width: width,
      height: height,
      x: position.x,
      y: position.y
    })
  }

  const deleteImage = () => {
    removeImage()
  }

  return (
    <ImageComponent
      deleteImage={deleteImage}
      positionLeft={positionLeft}
      positionTop={positionTop}
      canvasRef={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      onDragStoped={handleOnDragStoped}
      onResizeStop={handleOnResizeStop}
    />
  )
}

export default AttachmentImage
