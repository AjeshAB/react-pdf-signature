export type PdfEditorProps = {
  file: string
  fileName: string
  enableDownload?: boolean
  onSave?: (file: File, name: string) => void
  
}

export type ChildrenProps = {
  children: React.ReactNode
}
