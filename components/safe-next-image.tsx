import { OptimizedImage } from "./optimized-image"
import { getValidImageSrc } from "@/lib/image-utils"
import type { ImageProps } from "next/image"

interface SafeNextImageProps extends Omit<ImageProps, "src"> {
  src: string | null | undefined
  fallbackSrc?: string
  lowQualitySrc?: string
  blurhash?: string
}

export function SafeNextImage({
  src,
  fallbackSrc = "/placeholder.svg?height=600&width=800",
  alt = "Image",
  lowQualitySrc,
  blurhash,
  ...props
}: SafeNextImageProps) {
  // Use the utility function to get a valid src or fallback
  const validSrc = getValidImageSrc(src, fallbackSrc)

  return (
    <OptimizedImage
      src={validSrc || "/placeholder.svg"}
      alt={alt}
      fallbackSrc={fallbackSrc}
      lowQualitySrc={lowQualitySrc}
      blurhash={blurhash}
      {...props}
    />
  )
}
