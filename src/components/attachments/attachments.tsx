import { Fragment } from 'react/jsx-runtime'
import { AttachmentTypes } from '../../constants'
import { Attachment, IAttachments, ImageAttachment } from '../../types/attachments'
import AttachmentImage from './containers/attachmentImage'

export const Attachments = (props: IAttachments): JSX.Element => {
  const { attachments, pdfName = 'test.pdf', pageDimensions, removeAttachment, updateAttachment } = props

  const handleAttachmentUpdate = (index: number) => (attachment: Partial<Attachment>) => {
    return updateAttachment(index, attachment)
  }

  const renderAttachments = () => {
    if (!Boolean(attachments?.length || 0)) return <Fragment />
    return attachments.map((attachment, index) => {
      const key = `${pdfName}-${index}-${attachment.hash}`
      switch (attachment.type) {
        case AttachmentTypes.IMAGE:
          return (
            <AttachmentImage
              key={key}
              pageWidth={pageDimensions?.width}
              pageHeight={pageDimensions?.height}
              removeImage={() => removeAttachment(index)}
              updateImageAttachment={handleAttachmentUpdate(index)}
              {...(attachment as ImageAttachment)}
            />
          )
      }
    })
  }

  if (!Boolean(Attachments)) return <Fragment />

  return <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>{renderAttachments()}</div>
}
