import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useContent } from '../src/hooks/useContent'

interface ProjectImageCarouselProps {
  images: string[]
  title: string
  large?: boolean
}

export default function ProjectImageCarousel({ images, title, large = false }: ProjectImageCarouselProps) {
  const { labels } = useContent()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null)

  const revealControls = useCallback(() => {
    setShowControls(true)
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    hideTimerRef.current = setTimeout(() => setShowControls(false), 4000)
  }, [])

  if (!images || images.length === 0) return null

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    revealControls()
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    revealControls()
  }

  const goToImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex(index)
    revealControls()
  }

  return (
    <div
      className="group/carousel relative overflow-hidden cursor-pointer"
      onClick={revealControls}
    >
      {/* Carrusel de imágenes */}
      <div className={`relative bg-surface-2 overflow-hidden ${large ? 'h-72 md:h-[28rem]' : 'h-64 md:h-80'}`}>
        <div
          className="flex w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={image} className="relative w-full h-full flex-shrink-0">
              <Image
                src={image}
                alt={`${title} - ${labels.carousel.image} ${index + 1}`}
                fill
                sizes={large ? '(max-width: 1024px) 100vw, 1024px' : '(max-width: 768px) 100vw, 576px'}
                // La imagen actual y sus vecinas se cargan ya; el resto, bajo demanda
                loading={Math.abs(index - currentIndex) <= 1 ? 'eager' : 'lazy'}
                className="object-contain object-center"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Controles de navegación - visibles al pasar el mouse o al tocar */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/55 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-black/75 hover:scale-110 group-hover/carousel:opacity-100 group-hover/carousel:pointer-events-auto ${
              showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label={labels.carousel.previous}
          >
            <FiChevronLeft size={20} />
          </button>

          <button
            onClick={nextImage}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/55 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-black/75 hover:scale-110 group-hover/carousel:opacity-100 group-hover/carousel:pointer-events-auto ${
              showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label={labels.carousel.next}
          >
            <FiChevronRight size={20} />
          </button>

          {/* Indicadores */}
          <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 rounded-full bg-black/45 px-3 py-2 backdrop-blur-sm transition-opacity duration-300 group-hover/carousel:opacity-100 group-hover/carousel:pointer-events-auto ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToImage(index, e)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`${labels.carousel.goTo} ${index + 1}`}
              />
            ))}
          </div>

          {/* Contador de imágenes */}
          <div className={`absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium transition-opacity duration-300 group-hover/carousel:opacity-100 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}>
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  )
}