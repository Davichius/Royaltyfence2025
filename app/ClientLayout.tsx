"use client"

import type React from "react"
import { StickyCTA } from "@/components/sticky-cta"
import { useEffect } from "react"
import { patchNextImage } from "@/lib/patch-next-image"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Apply the patch when the app loads
  useEffect(() => {
    patchNextImage()
  }, [])

  return (
    <html lang="en">
      <body className="bg-gray-100">
        {children}
        <StickyCTA />
      </body>
    </html>
  )
}
