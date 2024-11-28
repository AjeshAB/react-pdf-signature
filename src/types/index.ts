export type PdfEditorProps = {
  initialPage?: ((totalPages: number) => number) | number
  file: string,
  fileName: string
}

export type ChildrenProps = {
  children: React.ReactNode
}
