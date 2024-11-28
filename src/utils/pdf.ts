import { PDFDocument } from 'pdf-lib'
import { Attachment, Attachments, ImageAttachment } from '../types/attachments'
import { readAsPDF } from './asyncReader'
import { loadPdfFromUrl, readAsArrayBuffer } from './helpers'
import download from 'downloadjs'

export const getPDFPages = async (file: string) => {
  const pdf = await readAsPDF(file)
  return {
    numPages: pdf.numPages,
    pages: Array(pdf.numPages)
      .fill(0)
      .map((_, index) => pdf.getPage(index + 1))
  }
}

export const save = async (pdfFile: string, objects: Attachments[], name: string) => {
  let pdfDoc

  try {
    pdfDoc = await PDFDocument.load(await loadPdfFromUrl(pdfFile))
  } catch (e) {
    console.log('Failed to load PDF.')
    throw e
  }

  const pagesProcesses = pdfDoc.getPages().map(async (page, index) => {
    const pageObjects = objects[index]
    // 'y' starts from bottom in PDFLib, use this to calculate y
    const pageHeight = page.getHeight()
    const embedProcesses = pageObjects.map(async (object: Attachment) => {
      if (object.type === 'image') {
        const { file, x, y, width, height } = object as ImageAttachment
        let img: any
        try {
          if (file.type === 'image/jpeg') {
            img = await pdfDoc.embedJpg(await readAsArrayBuffer(file))
          } else {
            img = await pdfDoc.embedPng(await readAsArrayBuffer(file))
          }
          return () =>
            page.drawImage(img, {
              x,
              y: pageHeight - y - height,
              width,
              height
            })
        } catch (e) {
          console.log('Failed to embed image.', e)
          throw e
        }
      }
    })
    // embed objects in order
    const drawProcesses: any[] = await Promise.all(embedProcesses)
    drawProcesses.forEach(p => p())
  })

  await Promise.all(pagesProcesses)

  try {
    const pdfBytes = await pdfDoc.save()
    download(pdfBytes, name, 'application/pdf')
  } catch (e) {
    console.log('Failed to save PDF.')
    throw e
  }
}
