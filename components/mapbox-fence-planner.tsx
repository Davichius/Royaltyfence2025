"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, MapPin, Trash2, Undo, ArrowRight, Calendar, Clock } from "lucide-react"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { FenceTypeSelector } from "@/components/fence-type-selector"
import { PlannerProgress } from "@/components/planner-progress"

export function MapboxFencePlanner() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const draw = useRef<any>(null)
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [fenceLength, setFenceLength] = useState(0)
  const [mapboxLoaded, setMapboxLoaded] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [fenceType, setFenceType] = useState("aluminum")
  const [preferredDate, setPreferredDate] = useState("")
  const [preferredTime, setPreferredTime] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")

  // Add these state variables after the other useState declarations
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  // Load Mapbox GL JS and Mapbox Draw scripts dynamically
  useEffect(() => {
    if (typeof window !== "undefined" && !mapboxLoaded) {
      // Load Mapbox GL JS CSS
      const mapboxCss = document.createElement("link")
      mapboxCss.rel = "stylesheet"
      mapboxCss.href = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css"
      document.head.appendChild(mapboxCss)

      // Load Mapbox Draw CSS
      const mapboxDrawCss = document.createElement("link")
      mapboxDrawCss.rel = "stylesheet"
      mapboxDrawCss.href = "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.4.0/mapbox-gl-draw.css"
      document.head.appendChild(mapboxDrawCss)

      // Load Mapbox GL JS script
      const mapboxScript = document.createElement("script")
      mapboxScript.src = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"
      mapboxScript.async = true

      mapboxScript.onload = () => {
        // Load Mapbox Draw script after Mapbox GL JS is loaded
        const mapboxDrawScript = document.createElement("script")
        mapboxDrawScript.src = "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.4.0/mapbox-gl-draw.js"
        mapboxDrawScript.async = true

        mapboxDrawScript.onload = () => {
          setMapboxLoaded(true)
        }

        document.body.appendChild(mapboxDrawScript)
      }

      document.body.appendChild(mapboxScript)
    }
  }, [mapboxLoaded])

  // Initialize map once scripts are loaded
  useEffect(() => {
    if (mapboxLoaded && mapContainer.current && !map.current) {
      // Replace with your Mapbox access token
      // You'll need to sign up for a free Mapbox account to get a token
      const mapboxgl = (window as any).mapboxgl
      mapboxgl.accessToken =
        "pk.eyJ1Ijoicm95YWx0eWZlbmNlIiwiYSI6ImNtOTAwbGh0cjA5a3oyam9tcXJobndtbmgifQ.e5zVC8MctwOMFDloz8q_2w"

      // Initialize the map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [-81.3, 28.9], // Default to central Florida
        zoom: 15,
      })

      // Initialize the draw plugin
      const MapboxDraw = (window as any).MapboxDraw
      draw.current = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          line_string: true,
          trash: false,
        },
        styles: [
          // Line style
          {
            id: "gl-draw-line",
            type: "line",
            filter: ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-color": "#FF6B00",
              "line-width": 4,
            },
          },
          // Vertex point style
          {
            id: "gl-draw-point",
            type: "circle",
            filter: ["all", ["==", "$type", "Point"], ["==", "meta", "vertex"]],
            paint: {
              "circle-radius": 5,
              "circle-color": "#FF6B00",
            },
          },
        ],
      })

      // Add the draw plugin to the map
      map.current.addControl(draw.current)

      // Wait for map to load
      map.current.on("load", () => {
        setMapLoaded(true)
      })

      // Calculate fence length when a line is drawn or updated
      map.current.on("draw.create", updateFenceLength)
      map.current.on("draw.update", updateFenceLength)
      map.current.on("draw.delete", updateFenceLength)
    }

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [mapboxLoaded])

  // Function to update the fence length calculation
  const updateFenceLength = () => {
    if (!draw.current) return

    const data = draw.current.getAll()
    let totalLength = 0

    // Calculate length of all LineStrings
    if (data.features.length > 0) {
      data.features.forEach((feature: any) => {
        if (feature.geometry.type === "LineString") {
          // Get coordinates
          const coords = feature.geometry.coordinates

          // Calculate length
          for (let i = 0; i < coords.length - 1; i++) {
            const start = coords[i]
            const end = coords[i + 1]

            // Calculate distance between points (in meters)
            const distance = calculateDistance(start[1], start[0], end[1], end[0])
            totalLength += distance
          }
        }
      })
    }

    // Convert meters to feet (1 meter = 3.28084 feet)
    const lengthInFeet = Math.round(totalLength * 3.28084)
    setFenceLength(lengthInFeet)
  }

  // Haversine formula to calculate distance between two points on Earth
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3 // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lon2 - lon1) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    return distance
  }

  // Search for an address and fly to its location
  const handleAddressSearch = () => {
    if (!address || !map.current) return

    setIsLoading(true)

    // Use Mapbox Geocoding API to find the address
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${(window as any).mapboxgl.accessToken}&country=US&limit=1`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center

          // Fly to the location
          map.current.flyTo({
            center: [lng, lat],
            zoom: 18,
            essential: true,
          })
        } else {
          alert("Address not found. Please try a different address.")
        }
      })
      .catch((error) => {
        console.error("Error searching for address:", error)
        alert("Error searching for address. Please try again.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Clear all drawn lines
  const handleClear = () => {
    if (draw.current) {
      draw.current.deleteAll()
      setFenceLength(0)
    }
  }

  // Undo the last action
  const handleUndo = () => {
    if (draw.current) {
      const data = draw.current.getAll()
      if (data.features.length > 0) {
        // Remove the last feature
        data.features.pop()
        draw.current.set(data)
        updateFenceLength()
      }
    }
  }

  // Update the handleSubmit function to move to the next step
  const handleSubmit = () => {
    if (!draw.current) return

    const data = draw.current.getAll()
    if (data.features.length === 0) {
      alert("Please draw at least one fence line before submitting.")
      return
    }

    // Move to step 2
    setCurrentStep(2)
  }

  // Handle continuing to step 3
  const handleContinueToStep3 = () => {
    // Update the address in contact info
    setContactInfo((prev) => ({ ...prev, address: address }))

    // Move to step 3
    setCurrentStep(3)
  }

  // Add this new function for the final submission with contact info
  const handleFinalSubmit = () => {
    // Validate form
    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      alert("Please fill in all required fields.")
      return
    }

    // Get the GeoJSON data
    const fenceData = draw.current.getAll()

    // Create the submission data
    const submissionData = {
      fenceLines: fenceData,
      fenceLength: fenceLength,
      fenceType: fenceType,
      contactInfo: contactInfo,
      preferredDate: preferredDate,
      preferredTime: preferredTime,
      additionalNotes: additionalNotes,
      timestamp: new Date().toISOString(),
    }

    // Track conversion in Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        event_category: "form",
        event_action: "submit",
        event_label: "fence_planner",
        fence_type: fenceType,
        fence_length: fenceLength,
        value: calculateEstimatedPrice().min,
      })
    }

    setIsLoading(true)

    // Send to your server
    fetch("/api/submit-fence-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false)
        if (data.success) {
          // Show success message
          setShowContactForm(true)
        } else {
          alert("There was an error submitting your fence plan. Please try again.")
        }
      })
      .catch((error) => {
        setIsLoading(false)
        console.error("Error:", error)
        alert("There was an error submitting your fence plan. Please try again.")
      })
  }

  // Calculate estimated price
  const calculateEstimatedPrice = () => {
    if (fenceLength === 0) return { min: 0, max: 0 }

    let pricePerFoot = { min: 0, max: 0 }

    switch (fenceType) {
      case "aluminum":
        pricePerFoot = { min: 45, max: 65 }
        break
      case "vinyl":
        pricePerFoot = { min: 35, max: 55 }
        break
      case "chainlink":
        pricePerFoot = { min: 25, max: 40 }
        break
      case "wood":
        pricePerFoot = { min: 60, max: 80 }
        break
      case "ornamental":
        pricePerFoot = { min: 70, max: 90 }
        break
      case "decorative iron":
        pricePerFoot = { min: 80, max: 100 }
        break
      default:
        pricePerFoot = { min: 35, max: 55 }
    }

    return {
      min: Math.round(fenceLength * pricePerFoot.min),
      max: Math.round(fenceLength * pricePerFoot.max),
    }
  }

  const price = calculateEstimatedPrice()

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 bg-[#1e3a8a] text-white">
        <h2 className="text-2xl font-bold">Fence Planner</h2>
        <p className="text-sm opacity-90">Design your hurricane-proof fence in minutes</p>
      </div>

      <div className="p-6">
        <PlannerProgress step={currentStep} />
      </div>

      {currentStep === 1 && (
        <>
          <div className="px-6 pb-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button
                onClick={handleAddressSearch}
                disabled={isLoading || !address || !mapLoaded}
                className="bg-[#1e3a8a]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 h-4 w-4" />
                    Find Address
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-4">
              <div className="pt-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Instructions:</p>
                <ol className="text-sm text-gray-600 space-y-2 list-decimal pl-4">
                  <li>Enter your address to find your property</li>
                  <li>
                    Click the line tool <span className="inline-block w-4 h-4 bg-[#1e3a8a] rounded-sm"></span> to start
                    drawing
                  </li>
                  <li>Click on the map to add fence line points</li>
                  <li>Double-click to finish a line</li>
                  <li>Draw multiple lines if needed</li>
                  <li>Click "Continue" when finished</li>
                </ol>
              </div>

              {fenceLength > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p className="text-sm font-medium text-gray-700">Estimated Fence Length:</p>
                  <p className="text-2xl font-bold text-[#1e3a8a]">{fenceLength} ft</p>
                  <p className="text-xs text-gray-500 mt-1">
                    This is an approximate measurement. Final quote may vary based on site inspection.
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-2 pt-4">
                <Button variant="outline" onClick={handleUndo} disabled={!mapLoaded} className="w-full justify-start">
                  <Undo className="mr-2 h-4 w-4" />
                  Undo Last Action
                </Button>

                <Button variant="outline" onClick={handleClear} disabled={!mapLoaded} className="w-full justify-start">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All Lines
                </Button>

                <Button
                  onClick={handleSubmit}
                  disabled={!mapLoaded || fenceLength === 0}
                  className="w-full justify-start bg-[#1e3a8a] mt-2"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Continue
                </Button>
              </div>

              <div className="mt-6">
                <TestimonialCarousel />
              </div>
            </div>

            <div className="md:col-span-3 relative">
              {!mapboxLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#1e3a8a]" />
                    <p className="mt-2 text-sm text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}

              <div
                ref={mapContainer}
                className="w-full h-[500px] rounded-lg bg-gray-100"
                style={{ display: mapboxLoaded ? "block" : "none" }}
              />

              {mapboxLoaded && !mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#1e3a8a]" />
                    <p className="mt-2 text-sm text-gray-600">Initializing map...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <FenceTypeSelector onSelect={setFenceType} />

              <div className="mt-8">
                <Button onClick={handleContinueToStep3} className="w-full bg-[#1e3a8a]">
                  Continue to Contact Information
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-[#1e3a8a] mb-2">Your Fence Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fence Length:</span>
                    <span className="font-medium">{fenceLength} ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fence Type:</span>
                    <span className="font-medium capitalize">{fenceType.replace("-", " ")}</span>
                  </div>
                  <div className="border-t border-blue-200 my-2 pt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Cost:</span>
                      <span className="font-bold text-[#1e3a8a]">
                        ${price.min.toLocaleString()} - ${price.max.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Final price depends on property conditions and additional features
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <h3 className="text-lg font-semibold text-[#1e3a8a] mb-2">Limited Time Offer</h3>
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">Hurricane Season Special</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Book your installation before June 1st and receive $500 off your total project cost plus free
                      storm-readiness inspection for 5 years.
                    </p>
                  </div>
                </div>
              </div>

              <TestimonialCarousel />
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-[#1e3a8a] mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name*
                  </label>
                  <Input
                    type="text"
                    id="name"
                    className="w-full"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <Input
                    type="email"
                    id="email"
                    className="w-full"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone*
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    className="w-full"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <Input type="text" id="address" className="w-full" value={address} disabled />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date
                    </label>
                    <Input
                      type="date"
                      id="preferredDate"
                      className="w-full"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time
                    </label>
                    <Input
                      type="time"
                      id="preferredTime"
                      className="w-full"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <Textarea
                    id="notes"
                    className="w-full"
                    placeholder="Any special requirements or questions..."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleFinalSubmit}
                  disabled={isLoading || !contactInfo.name || !contactInfo.email || !contactInfo.phone}
                  className="w-full bg-[#1e3a8a] mt-4"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Quote Request"
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-[#1e3a8a] mb-2">Your Fence Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fence Length:</span>
                    <span className="font-medium">{fenceLength} ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fence Type:</span>
                    <span className="font-medium capitalize">{fenceType.replace("-", " ")}</span>
                  </div>
                  <div className="border-t border-blue-200 my-2 pt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Cost:</span>
                      <span className="font-bold text-[#1e3a8a]">
                        ${price.min.toLocaleString()} - ${price.max.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Final price depends on property conditions and additional features
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="text-lg font-semibold text-[#1e3a8a] mb-2">What Happens Next?</h3>
                <ol className="space-y-3 mt-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Quote Confirmation</p>
                      <p className="text-sm text-gray-600">
                        We'll review your plan and send a detailed quote within 24 hours
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Site Visit</p>
                      <p className="text-sm text-gray-600">
                        Our expert will visit your property to confirm measurements
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Installation</p>
                      <p className="text-sm text-gray-600">Most installations are completed in just 1-2 days</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <h3 className="text-lg font-semibold text-[#1e3a8a]">Fast-Track Installation</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Need your fence installed quickly? Ask about our expedited installation service when we call to
                  confirm your quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-[#1e3a8a] mb-2">Quote Request Submitted!</h3>
            <p className="text-center mb-6">
              Thank you for your request! We've received your fence plan and will contact you within 24 hours with your
              detailed quote.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-center">
                <strong>Your reference number:</strong> RF-
                {Math.floor(Math.random() * 10000)
                  .toString()
                  .padStart(4, "0")}
              </p>
            </div>
            <Button onClick={() => (window.location.href = "/")} className="w-full bg-[#1e3a8a]">
              Return to Homepage
            </Button>
          </div>
        </div>
      )}

      <div className="p-6 bg-gray-50 border-t">
        <p className="text-sm text-gray-500">
          <strong>Note:</strong> For the most accurate quote, please be as precise as possible when drawing your fence
          lines. Our team will review your plan and contact you with a detailed quote.
        </p>
      </div>
    </div>
  )
}
