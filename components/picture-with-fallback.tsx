interface PictureWithFallbackProps {
  src: string
  fallbackSrc?: string
  webpSrc?: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export function PictureWithFallback({
  src,
  fallbackSrc,
  webpSrc,
  alt,
  className = "",
  width,
  height,
}: PictureWithFallbackProps) {
  // If webpSrc is not provided, try to generate one from src
  const webpSource =
    webpSrc ||
    (src.includes(".jpg") || src.includes(".jpeg") || src.includes(".png")
      ? src.replace(/\.(jpg|jpeg|png)$/i, ".webp")
      : undefined)

  // Use fallbackSrc if src is not available
  const imgSrc = src || fallbackSrc || "/placeholder.svg"

  return (
    <picture>
      {/* WebP format for browsers that support it */}
      {webpSource && <source srcSet={webpSource} type="image/webp" />}

      {/* Original format as fallback */}
      <img
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading="lazy"
      />
    </picture>
  )
}
