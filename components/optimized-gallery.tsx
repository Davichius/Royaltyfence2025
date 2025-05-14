"use client"

import { useState, useEffect } from "react"
import { SafeNextImage } from "./safe-next-image"
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react"

interface GalleryImage {
  url: string
  alt: string
  caption: string
  fallback: string
}

interface OptimizedGalleryProps {
  images: GalleryImage[]
  itemsPerPage?: number
}

export function OptimizedGallery({ images, itemsPerPage = 9 }: OptimizedGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const priority = true

  const totalPages = Math.ceil(images.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const visibleImages = images.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    // Simulate loading time for demonstration
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [currentPage])

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      setIsLoading(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      setIsLoading(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[800px]">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg h-[350px] animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleImages.map((image, index) => (
            <div
              key={`${currentPage}-${index}`}
              className="group relative overflow-hidden rounded-lg shadow-md bg-white h-[350px] cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative h-[250px] w-full overflow-hidden">
                <SafeNextImage
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={priority}
                  quality={75}
                  fallbackSrc={image.fallback || "/placeholder.svg?height=600&width=800"}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white/80 rounded-full p-2">
                    <ZoomIn className="h-6 w-6 text-[#1e3a8a]" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[#1e3a8a] font-medium text-lg">{image.caption}</p>
                <p className="text-sm text-gray-500 mt-2">Royalty Fence Installation</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center px-4">
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full h-[80vh] bg-white rounded-lg overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
              <button
                className="bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                }}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="relative w-full h-full">
              <SafeNextImage
                src={selectedImage.url}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                quality={90}
                fallbackSrc={selectedImage.fallback || "/placeholder.svg?height=600&width=800"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
