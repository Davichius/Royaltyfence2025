"use client"

import { SafeDynamicImage } from "@/lib/safe-dynamic-image"
import type { ImageProps } from "next/image"

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src: string | null | undefined
  fallbackSrc?: string
}

export function SafeImage({
  src,
  fallbackSrc = "/placeholder.svg?height=600&width=800",
  alt,
  ...props
}: SafeImageProps) {
  return <SafeDynamicImage src={src || "/placeholder.svg"} alt={alt || "Image"} fallbackSrc={fallbackSrc} {...props} />
}
