"use client"

import { useEffect } from "react"
import { applyAllOptimizations } from "@/utils/performance"

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Apply optimizations after component mounts
    applyAllOptimizations()

    // Re-apply when route changes (for SPA navigation)
    document.addEventListener("routeChangeComplete", applyAllOptimizations)

    return () => {
      document.removeEventListener("routeChangeComplete", applyAllOptimizations)
    }
  }, [])

  // This component doesn't render anything
  return null
}
