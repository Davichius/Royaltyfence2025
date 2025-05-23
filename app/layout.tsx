import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import SchemaMarkup from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "Royalty Fence - Hurricane-Proof Fencing in Orange City, FL",
  description:
    "Expert fence repair & installation in Orange City, FL. Hurricane-proof fencing systems with lifetime warranty. Serving Volusia County including DeBary, Deltona, and Sanford.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {children}
        <SchemaMarkup />
      </body>
    </html>
  )
}
