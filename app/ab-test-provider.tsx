"use client"

import { useEffect } from "react"
import { applyABTestVariants } from "@/lib/ab-testing"

export default function ABTestProvider() {
  useEffect(() => {
    applyABTestVariants()
  }, [])

  return null
}
