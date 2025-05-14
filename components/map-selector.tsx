"use client"

import { useState, useEffect } from "react"
import { ServiceAreaMap } from "./service-area-map"
import { OverheadMap } from "./overhead-map"
import { EnhancedMap } from "./enhanced-map"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GoogleMapsNote } from "./google-maps-note"

interface MapSelectorProps {
  className?: string
}

export function MapSelector({ className = "" }: MapSelectorProps) {
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

  return (
    <div className={className}>
      {hasApiKey === false && <GoogleMapsNote />}

      <Tabs defaultValue="standard" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="standard">Standard View</TabsTrigger>
          <TabsTrigger value="satellite">Satellite View</TabsTrigger>
          <TabsTrigger value="enhanced">Interactive Map</TabsTrigger>
        </TabsList>
        <TabsContent value="standard">
          <ServiceAreaMap />
        </TabsContent>
        <TabsContent value="satellite">
          <OverheadMap />
        </TabsContent>
        <TabsContent value="enhanced">
          <EnhancedMap />
        </TabsContent>
      </Tabs>
    </div>
  )
}
