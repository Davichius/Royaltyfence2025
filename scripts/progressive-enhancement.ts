/**
 * Progressive Enhancement Script
 * Run this script to apply performance enhancements without modifying the original code
 */

import fs from "fs"
import path from "path"
import { glob } from "glob"
import { JSDOM } from "jsdom"

// Configuration
const config = {
  projectRoot: process.cwd(),
  outputDir: path.join(process.cwd(), "enhanced"),
  attributesToAdd: {
    img: {
      loading: (el) => (el.closest('[id^="hero"]') ? "eager" : "lazy"),
      decoding: "async",
      fetchpriority: (el) => (el.closest('[id^="hero"]') ? "high" : "auto"),
    },
    a: {
      "data-conversion": (el) => {
        // Detect if this is likely a CTA
        const text = el.textContent?.toLowerCase() || ""
        if (text.includes("estimate") || text.includes("quote")) return "estimate"
        if (text.includes("call") || text.includes("phone")) return "call"
        if (text.includes("inspection")) return "inspection"
        return null
      },
    },
    form: {
      "data-conversion-form": (el) => {
        // Detect form type
        const id = el.id?.toLowerCase() || ""
        const action = el.getAttribute("action")?.toLowerCase() || ""

        if (id.includes("quote") || action.includes("quote")) return "quote"
        if (id.includes("contact") || action.includes("contact")) return "contact"
        return "form"
      },
    },
  },
}

// Process HTML files
async function processHtmlFiles() {
  const htmlFiles = await glob("**/*.html", { cwd: config.projectRoot })

  for (const file of htmlFiles) {
    const filePath = path.join(config.projectRoot, file)
    const html = fs.readFileSync(filePath, "utf8")

    // Parse HTML
    const dom = new JSDOM(html)
    const { document } = dom.window

    // Apply enhancements
    applyAttributeEnhancements(document)

    // Save enhanced file
    const outputPath = path.join(config.outputDir, file)
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    fs.writeFileSync(outputPath, dom.serialize())

    console.log(`Enhanced: ${file}`)
  }
}

// Apply attribute enhancements
function applyAttributeEnhancements(document: Document) {
  // Process each element type
  for (const [selector, attributes] of Object.entries(config.attributesToAdd)) {
    const elements = document.querySelectorAll(selector)

    elements.forEach((el) => {
      for (const [attr, valueOrFn] of Object.entries(attributes)) {
        // Skip if attribute already exists
        if (el.hasAttribute(attr)) continue

        // Determine attribute value
        const value = typeof valueOrFn === "function" ? valueOrFn(el) : valueOrFn

        // Only add attribute if value is not null
        if (value !== null) {
          el.setAttribute(attr, value)
        }
      }
    })
  }
}

// Run the script
processHtmlFiles().catch(console.error)
