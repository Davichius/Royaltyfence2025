"use client"

import { useState, useEffect } from "react"
import { MapErrorHandler } from "./map-error-handler"
import { StaticMapFallback } from "./static-map-fallback"

interface SimpleMapEmbedProps {
  location?: string
  zoom?: number
  mapType?: "roadmap" | "satellite"
  height?: string
  width?: string
  className?: string
}

export function SimpleMapEmbed({
  location = "Orange City, FL",
  zoom = 11,
  mapType = "roadmap",
  height = "400px",
  width = "100%",
  className = "",
}: SimpleMapEmbedProps) {
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkApiKey() {
      try {
        setLoading(true)
        const response = await fetch("/api/maps/config")

        // Check for rate limiting
        if (response.status === 429) {
          const data = await response.json()
          const retryAfter = Number.parseInt(response.headers.get("Retry-After") || "60", 10)

          // Dispatch a custom event for the error handler
          window.dispatchEvent(
            new CustomEvent("map-rate-limit-error", {
              detail: {
                message: data.message || "Too many requests. Please try again later.",
                retryAfter: retryAfter,
              },
            }),
          )

          setError("Rate limit exceeded")
          return
        }

        if (!response.ok) {
          throw new Error("Failed to check API key")
        }

        const data = await response.json()
        setHasApiKey(data.hasApiKey)
      } catch (err) {
        console.error("Error checking API key:", err)
        setError("Failed to load map configuration")
      } finally {
        setLoading(false)
      }
    }

    checkApiKey()
  }, [])

  // If still loading, show a loading state
  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`} style={{ height, width }}>
        <div className="animate-pulse text-gray-400">Loading map...</div>
      </div>
    )
  }

  // If there was an error or no API key, show the fallback
  if (error || !hasApiKey) {
    return <StaticMapFallback location={location} height={height} width={width} className={className} />
  }

  // Encode the location for the URL
  const encodedLocation = encodeURIComponent(location)

  // Create the map embed URL using our secure endpoint
  const mapUrl = `/api/maps/embed?q=${encodedLocation}&zoom=${zoom}&maptype=${mapType}`

  return (
    <MapErrorHandler
      fallback={<StaticMapFallback location={location} height={height} width={width} className={className} />}
    >
      <iframe
        src={mapUrl}
        height={height}
        width={width}
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={className}
      ></iframe>
    </MapErrorHandler>
  )
}
