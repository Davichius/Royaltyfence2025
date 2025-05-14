/**
 * Script to generate low-quality image placeholders for blur-up effect
 *
 * This script can be run with:
 * npx ts-node scripts/generate-image-placeholders.ts
 */

import fs from "fs"
import path from "path"
import sharp from "sharp"

// Configuration
const INPUT_DIR = "public/images"
const OUTPUT_DIR = "public/images/placeholders"
const PLACEHOLDER_WIDTH = 20 // Very small width for placeholders
const PLACEHOLDER_QUALITY = 20 // Low quality for small file size

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Process all images in the input directory
async function processImages() {
  try {
    const files = fs.readdirSync(INPUT_DIR)

    for (const file of files) {
      // Skip directories and non-image files
      const filePath = path.join(INPUT_DIR, file)
      if (fs.statSync(filePath).isDirectory()) continue

      const ext = path.extname(file).toLowerCase()
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue

      // Generate placeholder
      const outputPath = path.join(OUTPUT_DIR, `${path.basename(file, ext)}-placeholder${ext}`)

      await sharp(filePath)
        .resize(PLACEHOLDER_WIDTH) // Tiny size
        .jpeg({ quality: PLACEHOLDER_QUALITY }) // Low quality
        .toFile(outputPath)

      console.log(`Generated placeholder for ${file}`)
    }

    console.log("All placeholders generated successfully!")
  } catch (error) {
    console.error("Error generating placeholders:", error)
  }
}

// Run the script
processImages()
