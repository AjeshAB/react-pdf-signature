import { pdfjs } from '../hooks/usePDF'

interface PDF {
  numPages: number
  getPage: (index: number) => Promise<any>
}

export const readAsPDF = async (file: string): Promise<PDF> => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
  return pdfjs.getDocument(file).promise
}
