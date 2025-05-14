"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, MapPin, Trash2, Save, Undo } from "lucide-react"

export function SimpleFencePlanner() {
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lines, setLines] = useState<Array<{ points: { x: number; y: number }[] }>>([])
  const [currentLine, setCurrentLine] = useState<{ x: number; y: number }[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Simulate map loading
  useEffect(() => {
    // This would be replaced with actual map API initialization
    const timer = setTimeout(() => {
      setMapLoaded(true)
      setIsLoading(false)

      // Draw a sample satellite image on the canvas
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext("2d")
        if (ctx) {
          // Create a simple representation of a satellite view
          ctx.fillStyle = "#7CFC00" // Green for grass/yards
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Draw a "house"
          ctx.fillStyle = "#8B4513"
          ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 40, 100, 80)

          // Draw a "road"
          ctx.fillStyle = "#808080"
          ctx.fillRect(0, canvas.height - 30, canvas.width, 30)

          // Draw a "driveway"
          ctx.fillStyle = "#A9A9A9"
          ctx.fillRect(canvas.width / 2, canvas.height / 2 + 40, 20, canvas.height / 2 - 70)
        }
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleAddressSearch = () => {
    if (!address) return

    setIsLoading(true)
    // In a real implementation, this would call a geocoding API
    // and then center the map on the returned coordinates

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      // Map would be centered on the address
    }, 1000)
  }

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!mapLoaded) return

    setIsDrawing(true)
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setCurrentLine([{ x, y }])
    }
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !mapLoaded) return

    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setCurrentLine((prev) => [...prev, { x, y }])

      // Redraw everything
      drawMap()
    }
  }

  const handleCanvasMouseUp = () => {
    if (!isDrawing || !mapLoaded) return

    setIsDrawing(false)
    if (currentLine.length > 1) {
      setLines((prev) => [
        ...prev,
        {
          points: currentLine,
        },
      ])
      setCurrentLine([])
    }
  }

  const drawMap = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear and redraw the map
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Redraw the simulated map background
    ctx.fillStyle = "#7CFC00"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw a "house"
    ctx.fillStyle = "#8B4513"
    ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 40, 100, 80)

    // Draw a "road"
    ctx.fillStyle = "#808080"
    ctx.fillRect(0, canvas.height - 30, canvas.width, 30)

    // Draw a "driveway"
    ctx.fillStyle = "#A9A9A9"
    ctx.fillRect(canvas.width / 2, canvas.height / 2 + 40, 20, canvas.height / 2 - 70)

    // Draw all saved fence lines
    lines.forEach((line) => {
      if (line.points.length < 2) return

      ctx.beginPath()
      ctx.moveTo(line.points[0].x, line.points[0].y)

      for (let i = 1; i < line.points.length; i++) {
        ctx.lineTo(line.points[i].x, line.points[i].y)
      }

      ctx.strokeStyle = "#FF6B00" // Orange color for fence lines
      ctx.lineWidth = 5
      ctx.stroke()
    })

    // Draw the current line being drawn
    if (currentLine.length > 1) {
      ctx.beginPath()
      ctx.moveTo(currentLine[0].x, currentLine[0].y)

      for (let i = 1; i < currentLine.length; i++) {
        ctx.lineTo(currentLine[i].x, currentLine[i].y)
      }

      ctx.strokeStyle = "#FF6B00"
      ctx.lineWidth = 5
      ctx.stroke()
    }
  }

  useEffect(() => {
    if (mapLoaded) {
      drawMap()
    }
  }, [lines, currentLine, mapLoaded])

  const handleUndo = () => {
    setLines((prev) => prev.slice(0, -1))
  }

  const handleClear = () => {
    setLines([])
  }

  const handleSubmit = () => {
    // In a real implementation, this would send the fence design to your server
    alert("Your fence plan has been submitted! Our team will contact you with a quote based on your design.")
  }

  const calculateFenceLength = () => {
    let totalLength = 0

    lines.forEach((line) => {
      if (line.points.length < 2) return

      for (let i = 1; i < line.points.length; i++) {
        const dx = line.points[i].x - line.points[i - 1].x
        const dy = line.points[i].y - line.points[i - 1].y
        totalLength += Math.sqrt(dx * dx + dy * dy)
      }
    })

    // Convert pixels to feet (this would need calibration in a real implementation)
    const feetPerPixel = 0.5
    return Math.round(totalLength * feetPerPixel)
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 bg-[#1e3a8a] text-white">
        <h2 className="text-2xl font-bold">Fence Planner</h2>
        <p className="text-sm opacity-90">Draw lines on the map to show where you want your fence</p>
      </div>

      <div className="p-6 border-b">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full"
            />
          </div>
          <Button onClick={handleAddressSearch} disabled={isLoading || !address} className="bg-[#1e3a8a]">
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
              <li>Click and drag on the map to draw lines where you want your fence</li>
              <li>Draw multiple lines if needed</li>
              <li>Use the undo button to remove the last line</li>
              <li>Click "Submit Plan" when finished</li>
            </ol>
          </div>

          {lines.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p className="text-sm font-medium text-gray-700">Estimated Fence Length:</p>
              <p className="text-2xl font-bold text-[#1e3a8a]">{calculateFenceLength()} ft</p>
              <p className="text-xs text-gray-500 mt-1">
                This is an approximate measurement. Final quote may vary based on site inspection.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2 pt-4">
            <Button
              variant="outline"
              onClick={handleUndo}
              disabled={lines.length === 0}
              className="w-full justify-start"
            >
              <Undo className="mr-2 h-4 w-4" />
              Undo Last Line
            </Button>

            <Button
              variant="outline"
              onClick={handleClear}
              disabled={lines.length === 0}
              className="w-full justify-start"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All Lines
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={lines.length === 0}
              className="w-full justify-start bg-[#1e3a8a] mt-2"
            >
              <Save className="mr-2 h-4 w-4" />
              Submit Plan & Get Quote
            </Button>
          </div>
        </div>

        <div className="md:col-span-3 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#1e3a8a]" />
                <p className="mt-2 text-sm text-gray-600">Loading map...</p>
              </div>
            </div>
          )}

          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="w-full h-[500px] border rounded-lg bg-gray-100 cursor-crosshair"
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
          />

          {!mapLoaded && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center p-6">
                <p className="text-lg font-medium text-gray-700">Enter your address to load the map</p>
                <p className="text-sm text-gray-500 mt-2">You'll be able to draw your fence once the map loads</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
