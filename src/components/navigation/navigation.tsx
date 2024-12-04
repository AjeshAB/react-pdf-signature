import { Fragment } from 'react/jsx-runtime'
import { PDFViewerNavigationActionType, PDFViewerNavigationProps } from '../../types/navigation'
import { ArrowLeftIcon, ArrowRightIcon } from '../../icons/arrow'

const PDFViewerNavigation = (props: PDFViewerNavigationProps): JSX.Element => {
  const { isFirstPage, isLastPage, nextPage, previousPage } = props

  const handleActions = (action: PDFViewerNavigationActionType) => () => {
    switch (action) {
      case 'previous':
        return previousPage()
      case 'next':
        return nextPage()
    }
  }

  return (
    <Fragment>
      <div className='pdf-editor-navigation'>
        <div className='pdf-editor-navigation-button'>
          <button
            className='pdf-editor-button pdf-editor-button-previous'
            disabled={isFirstPage}
            onClick={handleActions('previous')}
          >
            <ArrowLeftIcon className='pdf-editor-navigation-button-icon' />
          </button>
        </div>
        <div className='pdf-editor-navigation-button'>
          <button
            className='pdf-editor-button pdf-editor-button-next'
            disabled={isLastPage}
            onClick={handleActions('next')}
          >
            <ArrowRightIcon className='pdf-editor-navigation-button-icon' />
          </button>
        </div>
        {/* <Button onClick={openSignaturePad}>Add Signature</Button>
        <Button onClick={handleClick}>Upload Image</Button>
        <Button onClick={onSave}>Save</Button> */}
      </div>
    </Fragment>
  )
}

export default PDFViewerNavigation
