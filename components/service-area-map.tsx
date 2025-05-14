"use client"

import { useEffect, useState } from "react"
import { SimpleMapEmbed } from "./simple-map-embed"
import { StaticMapFallback } from "./static-map-fallback"

interface ServiceAreaMapProps {
  className?: string
}

export function ServiceAreaMap({ className = "" }: ServiceAreaMapProps) {
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if API key is available via our secure endpoint
    fetch("/api/maps/config")
      .then((res) => res.json())
      .then((data) => {
        setHasApiKey(data.hasApiKey)
      })
      .catch((err) => {
        console.error("Error checking map configuration:", err)
        setHasApiKey(false)
      })
  }, [])

  // Show loading state while checking
  if (hasApiKey === null) {
    return (
      <div className={`relative overflow-hidden rounded-xl shadow-xl ${className}`}>
        <div className="h-[400px] flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-royal-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-royal-blue font-medium">Initializing map...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show the appropriate map based on API key availability
  return hasApiKey ? <SimpleMapEmbed className={className} /> : <StaticMapFallback className={className} />
}
