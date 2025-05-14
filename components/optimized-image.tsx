"use client"

import Image, { type ImageProps } from "next/image"
import { useState, useEffect } from "react"
import { getValidImageSrc } from "@/lib/image-utils"

interface OptimizedImageProps extends Omit<ImageProps, "src" | "onLoad" | "onError"> {
  src: string | null | undefined
  fallbackSrc?: string
  lowQualitySrc?: string
  sizes?: string
  lazyBoundary?: string
  blurhash?: string
}

export function OptimizedImage({
  src,
  fallbackSrc = "/placeholder.svg?height=600&width=800",
  lowQualitySrc,
  alt,
  width,
  height,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className = "",
  priority = false,
  lazyBoundary = "200px",
  blurhash,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(getValidImageSrc(src, fallbackSrc))
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Reset state when src changes
  useEffect(() => {
    setImgSrc(getValidImageSrc(src, fallbackSrc))
    setIsLoading(true)
    setError(false)
  }, [src, fallbackSrc])

  // Handle image load error
  const handleError = () => {
    setError(true)
    setImgSrc(fallbackSrc)
    setIsLoading(false)
  }

  // Handle successful image load
  const handleLoad = () => {
    setIsLoading(false)
  }

  // Generate blur data URL if blurhash is provided
  const blurDataURL = blurhash || lowQualitySrc || undefined

  // Determine if we should use placeholder
  const shouldUseBlurPlaceholder = isLoading && blurDataURL

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ position: "relative" }}>
      {/* Low quality placeholder while loading */}
      {shouldUseBlurPlaceholder && (
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            filter: "blur(20px)",
            transform: "scale(1.1)",
            zIndex: 1,
          }}
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt || "Image"}
        width={width}
        height={height}
        onError={handleError}
        onLoad={handleLoad}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        quality={props.quality || 85}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"} ${
          error ? "bg-gray-100" : ""
        }`}
        style={{
          objectFit: props.style?.objectFit || "cover",
          objectPosition: props.style?.objectPosition || "center",
        }}
        {...props}
      />

      {/* Loading indicator */}
      {isLoading && !shouldUseBlurPlaceholder && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-100"
          style={{ zIndex: 1 }}
          aria-hidden="true"
        >
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}
