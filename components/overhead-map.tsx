"use client"

import { useState, useEffect } from "react"
import { MapPin, Navigation } from "lucide-react"

interface OverheadMapProps {
  className?: string
}

export function OverheadMap({ className = "" }: OverheadMapProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null)

  // Service area locations
  const locations = [
    { name: "DeLand", lat: 29.0289, lng: -81.3045 },
    { name: "Orange City", lat: 28.9478, lng: -81.2987 },
    { name: "Deltona", lat: 28.9005, lng: -81.2637 },
    { name: "DeBary", lat: 28.8712, lng: -81.3262 },
    { name: "Lake Helen", lat: 28.9839, lng: -81.2334 },
    { name: "Enterprise", lat: 28.8647, lng: -81.218 },
  ]

  // Check if API key is available
  useEffect(() => {
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

  // Center coordinates for Southwest Volusia County
  const mapCenter = "28.9478,-81.2987" // Orange City coordinates
  const zoom = 11

  // Use our secure API endpoint instead of directly using the API key
  const mapUrl = `/api/maps/embed?q=Orange+City,FL&zoom=${zoom}&maptype=satellite`

  // Create a query string for markers
  const markers = locations.map((loc) => `color:red%7Clabel:${loc.name.charAt(0)}%7C${loc.lat},${loc.lng}`).join("|")

  // Create a path string for the service area
  const path = `color:0x0000FF80|weight:3|fillcolor:0x0000FF20|${locations.map((loc) => `${loc.lat},${loc.lng}`).join("|")}`

  // Static map URL using our secure endpoint
  const staticMapUrl = `/api/maps/static?center=${mapCenter}&zoom=${zoom}&size=1200x600&maptype=satellite&markers=${encodeURIComponent(markers)}&path=${encodeURIComponent(path)}`

  // Handle errors
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setMapError(true)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [isLoaded])

  return (
    <div className={`relative overflow-hidden rounded-xl shadow-xl ${className}`}>
      {/* Loading indicator */}
      {!isLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-royal-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-royal-blue font-medium">Loading satellite view...</p>
          </div>
        </div>
      )}

      {/* Map iframe with satellite view */}
      <div className="relative w-full h-[500px]">
        {!mapError && hasApiKey ? (
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIsLoaded(true)}
            onError={() => setMapError(true)}
            className="absolute inset-0"
          ></iframe>
        ) : (
          // Fallback to static map if iframe fails
          <div className="absolute inset-0 bg-gray-100">
            <img
              src={hasApiKey ? staticMapUrl : "/orange-city-map.jpg"}
              alt="Southwest Volusia Service Area Map"
              className="w-full h-full object-cover"
              onLoad={() => setIsLoaded(true)}
            />
          </div>
        )}
      </div>

      {/* Map Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-2 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-yellow-400" />
            Southwest Volusia Service Area
          </h3>
          <p className="text-white/90 max-w-2xl">
            Royalty Fence proudly serves all of Southwest Volusia County including DeLand, Orange City, Deltona, DeBary,
            Lake Helen, and surrounding areas.
          </p>
        </div>
      </div>

      {/* View on Google Maps button */}
      <div className="absolute top-4 right-4">
        <a
          href={`https://www.google.com/maps/search/Royalty+Fence/@${mapCenter},${zoom}z`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-royal-blue hover:bg-royal-blue hover:text-white transition-colors px-4 py-2 rounded-lg shadow-md flex items-center font-medium text-sm"
        >
          <Navigation className="h-4 w-4 mr-2" />
          View on Google Maps
        </a>
      </div>
    </div>
  )
}
