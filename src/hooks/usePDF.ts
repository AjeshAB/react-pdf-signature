import * as PDFJS from 'pdfjs-dist'
import { useState, useCallback } from 'react'
import { Dimensions } from '../types/pdf'
import { PDFPageProxy } from 'pdfjs-dist'
import { Attachments } from '../types/attachments'
import { save } from '../utils/pdf'
import { PdfEditorProps } from '../types'

export interface Pdf {
  name: string
  pages: Promise<PDFPageProxy>[]
}

export const usePdf = (props: PdfEditorProps) => {
  const { enableDownload, onSave } = props
  const [name, setName] = useState('')
  const [pageIndex, setPageIndex] = useState(-1)
  const [dimensions, setDimensions] = useState<Dimensions>()
  const [pages, setPages] = useState<any>([])
  const [isMultiPage, setIsMultiPage] = useState(false)
  const [isFirstPage, setIsFirstPage] = useState(false)
  const [isLastPage, setIsLastPage] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const currentPage = pages[pageIndex]

  const setDimensionsHandler = useCallback(setDimensions, [setDimensions])

  const nextPage = () => {
    const newPageIndex = pageIndex + 1
    setPageIndex(pageIndex + 1)
    setIsFirstPage(newPageIndex === 0)
    setIsLastPage(newPageIndex === pages.length - 1)
  }

  const previousPage = () => {
    const newPageIndex = pageIndex - 1
    setPageIndex(newPageIndex)
    setIsFirstPage(newPageIndex === 0)
    setIsLastPage(newPageIndex === pages.length - 1)
  }

  const initialize = ({ name, pages: _pages }: Pdf) => {
    const multi = _pages.length > 1
    setName(name)
    setPages(_pages)
    setPageIndex(0)
    setIsMultiPage(multi)
    setIsFirstPage(true)
    setIsLastPage(_pages.length === 1)
  }

  const savePdf = async (file: string, attachments: Attachments[], name: string) => {
    if (isSaving || !file) return

    setIsSaving(true)

    try {
      await save(file, attachments, name, enableDownload, onSave)
    } catch (e) {
      console.log(e)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePopup = () => setIsOpen(_ => !_)

  return {
    currentPage,
    dimensions,
    setDimensions: setDimensionsHandler,
    name,
    setName,
    pageIndex,
    setPageIndex,
    nextPage,
    pages,
    savePdf,
    initialize,
    isMultiPage,
    previousPage,
    isFirstPage,
    isLastPage,
    isSaving,
    setIsSaving,
    handlePopup,
    isOpen
  }
}

export const pdfjs: typeof PDFJS = PDFJS
