export type PDFViewerNavigationProps = {
  nextPage: () => void
  previousPage: () => void
  isFirstPage: boolean
  isLastPage: boolean

}

export type PDFViewerNavigationActionType = 'next' | 'previous'
