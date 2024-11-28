import ReactSignaturePad from 'react-signature-pad-wrapper'
import SignaturePadWrapper from '../../styled/signaturePad'
import { Button } from '../../styled/button'
import { Attachment } from '../../types/attachments'
import { useRef } from 'react'
import { AttachmentImageProcess } from '../../utils/attachment'

type SignaturePadProps = {
  onClose: () => void
  onSave: (attachment: Attachment) => void
}

const SignaturePad = (props: SignaturePadProps): JSX.Element => {
  const { onClose, onSave } = props

  const signaturePadRef = useRef<ReactSignaturePad>(null)

  const handleClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear()
    }
  }

  const handleSave = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.canvas.current?.toBlob(async blob => {
        const result = await AttachmentImageProcess(blob as File)

        onSave(result as Attachment)
        onClose()
      })
    }
  }

  return (
    <SignaturePadWrapper>
      <ReactSignaturePad ref={signaturePadRef} canvasProps={{ className: 'signature-pad' }} />
      <div className='signature-pad-text'>
        <p>Please sign above.</p>
      </div>
      <div className='signature-pad-actions'>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleClear}>Clear</Button>
        <Button onClick={handleSave}>Add</Button>
      </div>
    </SignaturePadWrapper>
  )
}

export default SignaturePad
