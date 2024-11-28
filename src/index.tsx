import { Fragment } from 'react/jsx-runtime'
import { Attachments } from './components/attachments/attachments'
import { StyledPDFPageDiv } from './styled/pdf'
import { PdfEditorProps } from './types'
import { usePdf } from './hooks/usePDF'
import { useAttachments } from './hooks/useAttachments'
import { Page } from './components/page/page'
import PDFViewerNavigation from './components/navigation/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getPDFPages } from './utils/pdf'
import PopUpModal from './components/popup/popup'
import SignaturePad from './components/signaturePad/signaturePad'

const PdfEditor = (props: PdfEditorProps): JSX.Element => {
  const { file: PDFFile, fileName } = props

  const {
    initialize,
    pageIndex,
    isFirstPage,
    isLastPage,
    currentPage,
    previousPage,
    nextPage,
    setDimensions,
    dimensions,
    pages,
    savePdf,
    isOpen,
    handlePopup
  } = usePdf()

  const {
    add: addAttachment,
    pageAttachments,
    reset: resetAttachments,
    update,
    remove,
    setPageIndex,
    allPageAttachments
  } = useAttachments()

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (pages?.length || 0) return
    getPDFPages(PDFFile).then(pages => {
      initialize({ name: fileName, pages: pages.pages })
      resetAttachments(pages.numPages)
    })
  }, [PDFFile, pages])

  useLayoutEffect(() => setPageIndex(pageIndex), [pageIndex, setPageIndex])

  const handleSave = () => {
    return savePdf(PDFFile, allPageAttachments, fileName)
  }

  const renderAttachments = () => {
    if (!Boolean(dimensions)) return <Fragment />

    return (
      dimensions && (
        <Attachments
          pdfName={fileName}
          removeAttachment={remove}
          updateAttachment={update}
          pageDimensions={dimensions}
          attachments={pageAttachments}
          scale={scale}
        />
      )
    )
  }

  const renderNavigation = () => {
    return (
      <PDFViewerNavigation
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        nextPage={nextPage}
        previousPage={previousPage}
        add={addAttachment}
        onSave={handleSave}
        openSignaturePad={handlePopup}
      />
    )
  }

  return (
    <Fragment>
      <section className='pdf-editor'>
        {renderNavigation()}
        <StyledPDFPageDiv className='pdf-editor-page' ref={containerRef}>
          <Page
            page={currentPage}
            dimensions={dimensions}
            updateDimensions={setDimensions}
            scale={scale}
            setScale={setScale}
            containerRef={containerRef}
          />
          {renderAttachments()}
        </StyledPDFPageDiv>
      </section>
      <PopUpModal isOpen={isOpen} onClose={handlePopup} title='Signature Pad'>
        <SignaturePad onClose={handlePopup} onSave={addAttachment} />
      </PopUpModal>
    </Fragment>
  )
}

export default PdfEditor
