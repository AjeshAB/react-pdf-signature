interface Position {
  top: number
  left: number
}

export const getMovePosition = (
  x: number,
  y: number,
  dragX: number,
  dragY: number,
  width: number,
  height: number,
  pageWidth: number,
  pageHeight: number
): Position => {
  const newPositionTop = y + dragY
  const newPositionLeft = x + dragX
  const newPositionRight = newPositionLeft + width
  const newPositionBottom = newPositionTop + height

  const top = newPositionTop < 0 ? 0 : newPositionBottom > pageHeight ? pageHeight - height : newPositionTop
  const left = newPositionLeft < 0 ? 0 : newPositionRight > pageWidth ? pageWidth - width : newPositionLeft

  return {
    top,
    left
  }
}

export const readAsImage = (src: Blob | string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    if (src instanceof Blob) {
      const url = window.URL.createObjectURL(src)
      img.src = url
    } else {
      img.src = src
    }
  })
}

export const readAsDataURL = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function ggID(): () => number {
  let id = 0
  return function genId() {
    return id++
  }
}

export function getScaledValue(value: number, scale: number): number {
  switch (Math.sign(value)) {
    case 1:
      return scale + value
    case -1:
      return scale - value
    default:
      return scale
  }
}

export const readAsArrayBuffer = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}


export async function loadPdfFromUrl(url: string) {
  // Fetch the PDF from the URL
  const response = await fetch(url);

  return await response.arrayBuffer();
}