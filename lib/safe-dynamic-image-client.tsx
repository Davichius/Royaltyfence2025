"use client"

import dynamic from "next/dynamic"
import { SafeNextImage } from "@/components/safe-next-image"

// Create a safe dynamic import for Image in a client component
export const SafeDynamicImage = dynamic(() => Promise.resolve(SafeNextImage), {
  ssr: false,
})
