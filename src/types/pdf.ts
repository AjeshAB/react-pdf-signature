import { PDFPageProxy } from 'pdfjs-dist'
import { Dispatch, SetStateAction } from 'react'

export type PdfPageChangeActionType = 'next' | 'previous'

export type PDFPageProps = {
  maxWidth?: number
  initialPage?: number
}

export type PDFEditorContextProps = {
  page: number
  handlePageChange: (action: PdfPageChangeActionType) => void
  isFirstPage: boolean
  isLastPage: boolean
  totalPages: number
  setTotalPages: Dispatch<SetStateAction<number>>
  pages: Promise<PDFPageProxy>[]
  setPages: Dispatch<SetStateAction<Promise<PDFPageProxy>[]>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  currentPage: Promise<PDFPageProxy>
  dimensions?: Dimensions
  setDimensions: React.Dispatch<React.SetStateAction<Dimensions | undefined>>
}

export interface Dimensions {
  x: number
  y: number
  width: number
  height: number
}
