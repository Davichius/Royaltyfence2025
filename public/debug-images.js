/**
 * Debug script to identify problematic images
 * Run this in the browser console to highlight images with empty src attributes
 */
;(() => {
  console.log("🔍 Checking for problematic images...")

  // Find all image elements
  const images = document.querySelectorAll("img")
  let problemCount = 0

  images.forEach((img, index) => {
    const src = img.getAttribute("src")

    // Check for empty src
    if (!src || src.trim() === "") {
      console.error(`🚨 Image #${index} has an empty src attribute:`, img)

      // Highlight the problematic image
      img.style.border = "3px solid red"
      img.style.padding = "2px"

      // Add a data attribute for easy identification
      img.dataset.problemImage = "true"

      problemCount++
    }
  })

  if (problemCount === 0) {
    console.log("✅ No problematic images found!")
  } else {
    console.log(`🚨 Found ${problemCount} problematic images. They have been highlighted with red borders.`)
    console.log("To fix these issues:")
    console.log("1. Use the SafeImage component instead of the standard Next.js Image")
    console.log("2. Ensure all image sources are validated before being passed to Image components")
    console.log("3. Add fallback images for all Image components")
  }
})()
