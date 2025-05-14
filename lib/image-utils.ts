/**
 * Validates an image source and returns either the valid source or a fallback
 * @param src The source URL to validate
 * @param fallback Optional fallback URL (defaults to a placeholder)
 * @returns A valid image source URL
 */
export function getValidImageSrc(
  src: string | null | undefined,
  fallback = "/placeholder.svg?height=600&width=800",
): string {
  // Check if src is null, undefined, or an empty string
  if (!src || src.trim() === "") {
    return fallback
  }
  return src
}

/**
 * Checks if an image source is valid (not null, undefined, or empty string)
 * @param src The source URL to check
 * @returns Boolean indicating if the source is valid
 */
export function isValidImageSrc(src: string | null | undefined): boolean {
  return !!src && src.trim() !== ""
}
