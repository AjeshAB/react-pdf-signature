import { useEffect, useRef, useState } from 'react'
import { Dimensions } from '../../types/pdf'
import { useResizeObserver } from '../../hooks/useResizeObserver'

interface Props {
  page: any
  dimensions?: Dimensions
  updateDimensions: ({ width, height }: Dimensions) => void
  scale: number
  setScale: React.Dispatch<React.SetStateAction<number>>
  containerRef: React.RefObject<HTMLDivElement>
}

export const Page = ({ page, dimensions, updateDimensions, scale, setScale, containerRef }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [width, setWidth] = useState((dimensions && dimensions.width) || 0)
  const [height, setHeight] = useState((dimensions && dimensions.height) || 0)

  const updateScale = () => {
    const containerWidth = containerRef.current?.offsetWidth || 1
    const canvas = canvasRef.current
    if (canvas) {
      const originalWidth = canvas.width / scale
      setScale(containerWidth / originalWidth)
    }
  }

  useResizeObserver(containerRef, updateScale)

  useEffect(() => {
    const renderPage = async (p: Promise<any>) => {
      const _page = await p
      if (_page) {
        const context = canvasRef.current?.getContext('2d')
        const viewport = _page.getViewport({ scale: 1 })

        setWidth(viewport.width)
        setHeight(viewport.height)

        if (context) {
          await _page.render({
            canvasContext: canvasRef.current?.getContext('2d'),
            viewport
          }).promise

          const newDimensions = {
            width: viewport.width,
            height: viewport.height
          }

          updateDimensions(newDimensions as Dimensions)
          updateScale()
        }
      }
    }

    renderPage(page)
  }, [page, updateDimensions])

  return <canvas ref={canvasRef} width={width} height={height} />
}
