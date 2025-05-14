/**
 * This script can be used to check for potential empty string issues in Image components
 * Run it with: npx tsx scripts/check-image-srcs.tsx
 */

import fs from "fs"
import path from "path"
import { parse } from "@babel/parser"
import traverse from "@babel/traverse"

// Directories to scan
const directories = ["app", "components"]

// File extensions to check
const extensions = [".tsx", ".jsx", ".ts", ".js"]

// Function to find all files with specified extensions
function findFiles(dir: string, extensions: string[]): string[] {
  let results: string[] = []
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      results = results.concat(findFiles(filePath, extensions))
    } else if (extensions.includes(path.extname(file))) {
      results.push(filePath)
    }
  }

  return results
}

// Function to check a file for potential Image component issues
function checkFile(filePath: string): void {
  try {
    const content = fs.readFileSync(filePath, "utf-8")

    // Parse the file
    const ast = parse(content, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    })

    // Track potential issues
    const issues: { line: number; column: number; message: string }[] = []

    // Traverse the AST
    traverse(ast, {
      JSXOpeningElement(path) {
        const name = path.node.name

        // Check if it's an Image component
        if (
          (name.type === "JSXIdentifier" && name.name === "Image") ||
          (name.type === "JSXMemberExpression" &&
            name.property.type === "JSXIdentifier" &&
            name.property.name === "Image")
        ) {
          // Check src attribute
          const srcAttr = path.node.attributes.find(
            (attr) => attr.type === "JSXAttribute" && attr.name.type === "JSXIdentifier" && attr.name.name === "src",
          )

          if (srcAttr && srcAttr.type === "JSXAttribute") {
            // Check for potential empty string issues
            if (srcAttr.value?.type === "StringLiteral" && srcAttr.value.value === "") {
              issues.push({
                line: path.node.loc?.start.line || 0,
                column: path.node.loc?.start.column || 0,
                message: "Empty string used as src attribute",
              })
            } else if (srcAttr.value?.type === "JSXExpressionContainer") {
              const expr = srcAttr.value.expression

              // Check for variables without validation
              if (expr.type === "Identifier") {
                issues.push({
                  line: path.node.loc?.start.line || 0,
                  column: path.node.loc?.start.column || 0,
                  message: `Variable "${expr.name}" used as src without validation`,
                })
              }

              // Check for conditional expressions without fallback
              if (
                expr.type === "ConditionalExpression" &&
                expr.alternate.type === "StringLiteral" &&
                expr.alternate.value === ""
              ) {
                issues.push({
                  line: path.node.loc?.start.line || 0,
                  column: path.node.loc?.start.column || 0,
                  message: "Conditional expression with empty string fallback",
                })
              }
            }
          }
        }
      },
    })

    // Report issues
    if (issues.length > 0) {
      console.log(`\nIssues in ${filePath}:`)
      issues.forEach((issue) => {
        console.log(`  Line ${issue.line}, Column ${issue.column}: ${issue.message}`)
      })
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error)
  }
}

// Main function
function main() {
  console.log("Checking for potential Image component issues...")

  let files: string[] = []
  for (const dir of directories) {
    files = files.concat(findFiles(dir, extensions))
  }

  console.log(`Found ${files.length} files to check.`)

  let issueCount = 0
  for (const file of files) {
    checkFile(file)
    issueCount++
  }

  console.log(`\nChecked ${issueCount} files.`)
}

main()
