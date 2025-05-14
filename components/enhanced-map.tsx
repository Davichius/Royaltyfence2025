"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Navigation } from "lucide-react"
import Script from "next/script"

interface EnhancedMapProps {
  className?: string
}

// Create a type for the window with google property
declare global {
  interface Window {
    initMap?: () => void
    google?: any
  }
}

export function EnhancedMap({ className = "" }: EnhancedMapProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = useState<any>(null)

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

  // Initialize map when API key status is known
  useEffect(() => {
    if (hasApiKey === true) {
      // We'll load the script via Next.js Script component
      // and initialize the map in the onLoad callback
      window.initMap = () => {
        initializeMap()
      }
    } else if (hasApiKey === false) {
      setMapError(true)
    }
  }, [hasApiKey])

  const initializeMap = () => {
    if (!mapRef.current || !window.google || !window.google.maps) {
      setMapError(true)
      return
    }

    try {
      // Create map centered on Orange City
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 28.9478, lng: -81.2987 },
        zoom: 11,
        mapTypeId: "satellite",
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: window.google.maps.ControlPosition.TOP_RIGHT,
        },
      })

      setMapInstance(map)

      // Add markers for each location
      locations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
          animation: window.google.maps.Animation.DROP,
        })

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div class="p-2"><strong>${location.name}</strong><br>Royalty Fence Service Area</div>`,
        })

        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })
      })

      // Create a polygon for the service area
      const serviceAreaCoords = locations.map((loc) => ({ lat: loc.lat, lng: loc.lng }))

      const serviceArea = new window.google.maps.Polygon({
        paths: serviceAreaCoords,
        strokeColor: "#0047AB",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0047AB",
        fillOpacity: 0.15,
      })

      serviceArea.setMap(map)

      setIsLoaded(true)
    } catch (error) {
      console.error("Error initializing map:", error)
      setMapError(true)
    }
  }

  // Center coordinates for Southwest Volusia County (for fallback)
  const mapCenter = "28.9478,-81.2987" // Orange City coordinates
  const zoom = 11

  // Create a query string for markers (for fallback)
  const markers = locations.map((loc) => `color:red%7Clabel:${loc.name.charAt(0)}%7C${loc.lat},${loc.lng}`).join("|")

  // Static map URL using our secure endpoint
  const staticMapUrl = `/api/maps/static?center=${mapCenter}&zoom=${zoom}&size=1200x600&maptype=satellite&markers=${encodeURIComponent(markers)}&path=${encodeURIComponent(`color:0x0000FF80|weight:3|fillcolor:0x0000FF20|${locations.map((loc) => `${loc.lat},${loc.lng}`).join("|")}`)}`

  return (
    <div className={`relative overflow-hidden rounded-xl shadow-xl ${className}`}>
      {/* Load Google Maps API script securely */}
      {hasApiKey && (
        <Script
          src="/api/maps/script"
          onLoad={() => {
            if (window.google && window.google.maps) {
              initializeMap()
            }
          }}
          onError={() => setMapError(true)}
        />
      )}

      {/* Loading indicator */}
      {!isLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-royal-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-royal-blue font-medium">Loading satellite view...</p>
          </div>
        </div>
      )}

      {/* Interactive Google Map */}
      <div className="relative w-full h-[500px]">
        {!mapError && hasApiKey ? (
          <div ref={mapRef} className="w-full h-full" />
        ) : (
          // Fallback to static map if interactive map fails
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
