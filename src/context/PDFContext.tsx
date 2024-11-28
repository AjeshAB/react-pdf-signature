import { createContext, useCallback, useMemo, useState } from 'react'
import { ChildrenProps } from '../types'
import { Dimensions, PDFEditorContextProps, PdfPageChangeActionType } from '../types/pdf'
import { PDFPageProxy } from 'pdfjs-dist'

export const PdfContext = createContext<PDFEditorContextProps | undefined>(undefined)

const PDFProvider = (props: ChildrenProps) => {
  const { children } = props

  //States
  const [page, setPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [pages, setPages] = useState<Promise<PDFPageProxy>[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [dimensions, setDimensions] = useState<Dimensions>()

  const setDimensionsHandler = useCallback(setDimensions, [setDimensions])

  //Functions
  const handlePageChange = (action: PdfPageChangeActionType) => {
    switch (action) {
      case 'next':
        return setPage(prev => Math.min(prev + 1, totalPages))
      case 'previous':
        return setPage(prev => Math.max(prev - 1, 1))
    }
  }

  const isFirstPage = page === 0
  const isLastPage = page === totalPages
  const currentPage = useMemo(() => pages[page], [page, pages])

  return (
    <PdfContext.Provider
      value={{
        page,
        handlePageChange,
        isFirstPage,
        isLastPage,
        totalPages,
        setTotalPages,
        pages,
        setPages,
        loading,
        setLoading,
        currentPage,
        dimensions,
        setDimensions: setDimensionsHandler
      }}
    >
      {children}
    </PdfContext.Provider>
  )
}

export default PDFProvider
