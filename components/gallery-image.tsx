"use client"

import { SafeDynamicImage } from "@/lib/safe-dynamic-image"

interface GalleryImageProps {
  src: string | null | undefined
  alt: string
  fallback?: string
  priority?: boolean
  className?: string
}

export function GalleryImage({
  src,
  alt,
  fallback = "/placeholder.svg?height=600&width=800",
  priority = false,
  className = "",
}: GalleryImageProps) {
  return (
    <div className="relative w-full h-full">
      <SafeDynamicImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`object-cover transition-transform duration-300 ${className}`}
        priority={priority}
        quality={85}
        fallbackSrc={fallback}
      />
    </div>
  )
}
