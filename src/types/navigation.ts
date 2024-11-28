import { Attachment } from './attachments'

export type PDFViewerNavigationProps = {
  add: (newAttachment: Attachment) => void
  nextPage: () => void
  previousPage: () => void
  isFirstPage: boolean
  isLastPage: boolean,
  onSave: () => void,
  openSignaturePad: () => void
}

export type PDFViewerNavigationActionType = 'next' | 'previous'
