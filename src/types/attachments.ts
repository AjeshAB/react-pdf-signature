import { RefObject } from 'react'
import { Dimensions } from './pdf'
import { RndDragCallback, RndResizeCallback } from 'react-rnd'

type AttachmentType = 'image' | 'text' | 'drawing'

export interface IAttachments {
  attachments: Attachment[]
  pdfName: string
  pageDimensions: Dimensions
  removeAttachment: (index: number) => void
  updateAttachment: (index: number, attachment: Partial<Attachment>) => void
  scale: number
}

interface AttachmentBase {
  id: () => number
  width: number
  height: number
  x: number
  y: number
  type: AttachmentType
  hash?: string
}
export interface ImageAttachment extends AttachmentBase {
  file: File
  img: HTMLImageElement
}

interface DrawingAttachment extends AttachmentBase {
  path?: string
  scale?: number
  stroke?: string
  strokeWidth?: number
}

interface TextAttachment extends AttachmentBase {
  text?: string
  fontFamily?: string
  size?: number
  lineHeight?: number
  lines?: string[]
}

export type Attachment = ImageAttachment | DrawingAttachment | TextAttachment

export type Attachments = Attachment[]

export type AttachmentImageType = {
  pageWidth: number
  pageHeight: number
  removeImage: () => void
  updateImageAttachment: (imageObject: Partial<ImageAttachment>) => void
}

type DragEventListener<T> = (e: React.MouseEvent<T>) => void

export type ImageType = {
  deleteImage: () => void
  width: number
  height: number
  canvasRef: RefObject<HTMLCanvasElement>
  positionTop: number
  positionLeft: number
  onDragStoped: RndDragCallback
  onResizeStop: RndResizeCallback
}
