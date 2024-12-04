import useUploader from '../../hooks/useUploader'
import { Button } from '../../styled/button'
import { Attachment } from '../../types/attachments'

type PDFSignActionButtonProps = {
  onSave: () => void
  openSignaturePad: () => void
  add: (newAttachment: Attachment) => void
}
const PDFSignActionButton = (props: PDFSignActionButtonProps): JSX.Element => {
  const { onSave, openSignaturePad, add } = props

  const { onClick, inputRef, upload, handleClick } = useUploader(add)

  return (
    <div className='pdf-editor-actions'>
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
      <Button type='button' onClick={handleClick}>
        Add Stamp / Signature
      </Button>
      <Button type='button' onClick={openSignaturePad}>
        Draw Signature
      </Button>
      <Button type='button' onClick={onSave}>
        Save
      </Button>
    </div>
  )
}

export default PDFSignActionButton
