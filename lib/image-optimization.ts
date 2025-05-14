/**
 * Image optimization utilities
 */

// Function to determine appropriate sizes attribute based on layout context
export function getSizeAttribute(context: "hero" | "gallery" | "card" | "thumbnail" | "full" | "badge"): string {
  switch (context) {
    case "hero":
      return "100vw"
    case "gallery":
      return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    case "card":
      return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
    case "thumbnail":
      return "(max-width: 640px) 80px, 120px"
    case "badge":
      return "40px"
    case "full":
    default:
      return "100vw"
  }
}

// Function to generate image srcSet for responsive images
export function generateSrcSet(baseUrl: string, widths: number[] = [640, 750, 828, 1080, 1200, 1920]): string {
  if (!baseUrl || baseUrl.includes("placeholder.svg")) {
    return ""
  }

  // For blob URLs, we can't modify them to add width parameters
  if (baseUrl.includes("blob.vercel-storage.com")) {
    return baseUrl
  }

  // For placeholder SVGs, we can add width parameters
  if (baseUrl.includes("placeholder.svg")) {
    return widths.map((w) => `${baseUrl}&width=${w} ${w}w`).join(", ")
  }

  // For other URLs, try to add width parameters based on common patterns
  // This is a simplified example - in production you'd need to handle various URL formats
  try {
    const url = new URL(baseUrl)
    return widths
      .map((w) => {
        const newUrl = new URL(url.toString())
        newUrl.searchParams.set("width", w.toString())
        return `${newUrl.toString()} ${w}w`
      })
      .join(", ")
  } catch (e) {
    // If URL parsing fails, return the original URL
    return baseUrl
  }
}

// Function to determine if an image should be loaded with priority
export function shouldPrioritize(position: "above-fold" | "below-fold" | "hero" | "critical" | "normal"): boolean {
  return ["above-fold", "hero", "critical"].includes(position)
}

// Function to get appropriate quality setting based on image type
export function getQualitySetting(imageType: "hero" | "thumbnail" | "gallery" | "normal"): number {
  switch (imageType) {
    case "hero":
      return 90 // Higher quality for hero images
    case "thumbnail":
      return 70 // Lower quality is fine for thumbnails
    case "gallery":
      return 80 // Medium quality for gallery images
    case "normal":
    default:
      return 85 // Default quality
  }
}
