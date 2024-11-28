import { createRef } from 'react'
import { ActionEvent } from '../types/uploader'
import { AttachmentImageProcess } from '../utils/attachment'
import { Attachment, ImageAttachment } from '../types/attachments'

const useUploader = (add: (newAttachment: Attachment) => void) => {
  const inputRef = createRef<HTMLInputElement>()
  const onClick = (event: ActionEvent<HTMLInputElement>) => {
    event.currentTarget.value = ''
  }

  const handleClick = () => {
    const input = inputRef.current

    if (input) {
      input.click()
    }
  }

  const upload = async (event: React.ChangeEvent<HTMLInputElement> & { dataTransfer?: DataTransfer }) => {
    const files: FileList | undefined = event.currentTarget.files || (event.dataTransfer && event.dataTransfer.files)
    if (!files) {
      return
    }

    const file = files[0]

    const result = await AttachmentImageProcess(file)

    return add(result as ImageAttachment)
  }

  return {
    inputRef,
    onClick,
    handleClick,
    upload
  }
}

export default useUploader
