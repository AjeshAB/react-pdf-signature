import { Fragment } from 'react/jsx-runtime'
import { Button } from '../../styled/button'
import { PDFViewerNavigationActionType, PDFViewerNavigationProps } from '../../types/navigation'
import useUploader from '../../hooks/useUploader'

const PDFViewerNavigation = (props: PDFViewerNavigationProps): JSX.Element => {
  const { isFirstPage, isLastPage, nextPage, previousPage, add, onSave, openSignaturePad } = props

  const { onClick, inputRef, upload, handleClick } = useUploader(add)

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
      <div style={{ display: 'none !important' }}>
        <input
          type='file'
          id='image'
          name='image'
          accept='image/jpeg, image/png, image/jpg'
          onClick={onClick}
          style={{ display: 'none' }}
          onChange={upload}
          ref={inputRef}
        />
      </div>
      <div className='pdf-editor-navigation'>
        <Button className='pdf-editor-button-previous' disabled={isFirstPage} onClick={handleActions('previous')}>
          Previous
        </Button>
        <Button className='pdf-editor-button-next' disabled={isLastPage} onClick={handleActions('next')}>
          Next
        </Button>
        <Button onClick={openSignaturePad}>Add Signature</Button>
        <Button onClick={handleClick}>Upload Image</Button>
        <Button onClick={onSave}>Save</Button>
      </div>
    </Fragment>
  )
}

export default PDFViewerNavigation
