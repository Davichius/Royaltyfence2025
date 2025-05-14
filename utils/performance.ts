/**
 * Performance optimization utilities that don't require component modifications
 */

// Optimize all images on the page with lazy loading and async decoding
export const optimizeImages = () => {
  if (typeof window === "undefined") return

  // Wait for document to be fully loaded
  if (document.readyState === "complete") {
    applyImageOptimizations()
  } else {
    window.addEventListener("load", applyImageOptimizations)
  }
}

// Apply optimizations to all images
const applyImageOptimizations = () => {
  // Select all images that aren't already optimized
  document.querySelectorAll("img:not([data-optimized])").forEach((img) => {
    // Skip hero images (above the fold)
    const isHero = img.closest('[id^="hero"]') || img.closest(".hero") || img.closest('[class*="hero"]')

    if (!isHero) {
      // Add lazy loading for non-hero images
      if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy")
    }

    // Add async decoding for all images
    if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async")

    // Mark as optimized to avoid reprocessing
    img.setAttribute("data-optimized", "true")

    // Add fade-in effect for lazy-loaded images
    if (img.getAttribute("loading") === "lazy") {
      img.style.transition = "opacity 0.3s ease-in-out"

      // Set initial opacity if not already visible
      if (!img.complete) {
        img.style.opacity = "0"
      }

      // Add load event to fade in
      img.addEventListener("load", () => {
        img.style.opacity = "1"
      })
    }
  })

  // Preload critical hero images
  const heroImages = document.querySelectorAll('.hero img, [id^="hero"] img')
  heroImages.forEach((img) => {
    const src = img.getAttribute("src")
    if (src && !document.querySelector(`link[rel="preload"][href="${src}"]`)) {
      const preload = document.createElement("link")
      preload.rel = "preload"
      preload.href = src
      preload.as = "image"
      document.head.appendChild(preload)
    }
  })
}

// Optimize font loading
export const optimizeFonts = () => {
  if (typeof window === "undefined") return

  // Add font-display: swap to all font faces
  const style = document.createElement("style")
  style.textContent = `
    @font-face {
      font-display: swap !important;
    }
  `
  document.head.appendChild(style)
}

// Defer non-critical CSS
export const deferNonCriticalCSS = () => {
  if (typeof window === "undefined") return

  // Find all non-critical stylesheets
  document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])').forEach((link) => {
    link.setAttribute("media", "print")
    link.setAttribute("onload", "this.media='all'")
  })
}

// Apply all performance optimizations
export const applyAllOptimizations = () => {
  optimizeImages()
  optimizeFonts()
  deferNonCriticalCSS()
}

export default applyAllOptimizations
