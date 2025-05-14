"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Loader2,
  MapPin,
  Trash2,
  Save,
  Undo,
  Download,
  List,
  ImageIcon,
  Check,
  X,
  AlertCircle,
  Info,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  saveFencePlan,
  getAllFencePlans,
  deleteFencePlan,
  uploadPropertyImage,
  type FencePlan,
} from "@/app/actions/fence-plans"

export function EnhancedFencePlanner() {
  // State for fence drawing
  const [address, setAddress] = useState("")
  const [planName, setPlanName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lines, setLines] = useState<Array<{ points: { x: number; y: number }[] }>>([])
  const [currentLine, setCurrentLine] = useState<{ x: number; y: number }[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [fenceType, setFenceType] = useState("aluminum")
  const [savedPlans, setSavedPlans] = useState<FencePlan[]>([])
  const [loadingSavedPlans, setLoadingSavedPlans] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<FencePlan | null>(null)
  const [propertyImage, setPropertyImage] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [savingPlan, setSavingPlan] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showLoadDialog, setShowLoadDialog] = useState(false)
  const [notes, setNotes] = useState("")
  const [activeTab, setActiveTab] = useState("draw")
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info"
    message: string
  } | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load saved plans on component mount
  useEffect(() => {
    loadSavedPlans()
  }, [])

  // Load saved plans from Redis
  const loadSavedPlans = async () => {
    setLoadingSavedPlans(true)
    try {
      const result = await getAllFencePlans()
      if (result.success) {
        setSavedPlans(result.plans)
      } else {
        showNotification("error", "Failed to load saved plans")
      }
    } catch (error) {
      console.error("Error loading saved plans:", error)
      showNotification("error", "Failed to load saved plans")
    } finally {
      setLoadingSavedPlans(false)
    }
  }

  // Show notification
  const showNotification = (type: "success" | "error" | "info", message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 5000)
  }

  // Simulate map loading
  useEffect(() => {
    // This would be replaced with actual map API initialization
    const timer = setTimeout(() => {
      setMapLoaded(true)
      setIsLoading(false)
      drawMap()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Draw map when property image changes
  useEffect(() => {
    if (mapLoaded) {
      drawMap()
    }
  }, [propertyImage, mapLoaded])

  // Redraw map when lines change
  useEffect(() => {
    if (mapLoaded) {
      drawMap()
    }
  }, [lines, currentLine, mapLoaded])

  const handleAddressSearch = () => {
    if (!address) return

    setIsLoading(true)
    // In a real implementation, this would call a geocoding API
    // and then center the map on the returned coordinates

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      // Map would be centered on the address
      showNotification("success", "Address found")
    }, 1000)
  }

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!mapLoaded || activeTab !== "draw") return

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
    if (!isDrawing || !mapLoaded || activeTab !== "draw") return

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
    if (!isDrawing || !mapLoaded || activeTab !== "draw") return

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

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw property image if available
    if (propertyImage) {
      const img = new Image()
      img.onload = () => {
        // Calculate scaling to fit the canvas while maintaining aspect ratio
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height)

        const scaledWidth = img.width * scale
        const scaledHeight = img.height * scale

        // Center the image on the canvas
        const x = (canvas.width - scaledWidth) / 2
        const y = (canvas.height - scaledHeight) / 2

        ctx.drawImage(img, x, y, scaledWidth, scaledHeight)

        // Draw all saved fence lines
        drawFenceLines(ctx)
      }
      img.crossOrigin = "anonymous"
      img.src = propertyImage
    } else {
      // Draw a default background
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

      // Draw all saved fence lines
      drawFenceLines(ctx)
    }
  }

  const drawFenceLines = (ctx: CanvasRenderingContext2D) => {
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

  const handleUndo = () => {
    setLines((prev) => prev.slice(0, -1))
  }

  const handleClear = () => {
    setLines([])
  }

  const handleSavePlan = async () => {
    if (!planName) {
      showNotification("error", "Please enter a plan name")
      return
    }

    setSavingPlan(true)
    try {
      const plan = {
        name: planName,
        address,
        lines,
        imageUrl: propertyImage || undefined,
        estimatedLength: calculateFenceLength(),
        fenceType,
        userId: "anonymous", // In a real app, this would be the user's ID
      }

      const result = await saveFencePlan(plan)

      if (result.success) {
        showNotification("success", "Fence plan saved successfully")
        setShowSaveDialog(false)
        loadSavedPlans()
      } else {
        showNotification("error", "Failed to save fence plan")
      }
    } catch (error) {
      console.error("Error saving fence plan:", error)
      showNotification("error", "Failed to save fence plan")
    } finally {
      setSavingPlan(false)
    }
  }

  const handleLoadPlan = (plan: FencePlan) => {
    setLines(plan.lines)
    setAddress(plan.address)
    setPlanName(plan.name)
    setFenceType(plan.fenceType || "aluminum")
    setPropertyImage(plan.imageUrl || null)
    setSelectedPlan(plan)
    setShowLoadDialog(false)
    showNotification("success", `Loaded plan: ${plan.name}`)
  }

  const handleDeletePlan = async (id: string) => {
    if (!confirm("Are you sure you want to delete this plan?")) return

    try {
      const result = await deleteFencePlan(id)

      if (result.success) {
        showNotification("success", "Fence plan deleted successfully")
        loadSavedPlans()

        // If the deleted plan is the currently selected plan, reset the selection
        if (selectedPlan && selectedPlan.id === id) {
          setSelectedPlan(null)
        }
      } else {
        showNotification("error", "Failed to delete fence plan")
      }
    } catch (error) {
      console.error("Error deleting fence plan:", error)
      showNotification("error", "Failed to delete fence plan")
    }
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const result = await uploadPropertyImage(formData)

      if (result.success) {
        setPropertyImage(result.url)
        showNotification("success", "Property image uploaded successfully")
      } else {
        showNotification("error", "Failed to upload property image")
      }
    } catch (error) {
      console.error("Error uploading property image:", error)
      showNotification("error", "Failed to upload property image")
    } finally {
      setUploadingImage(false)
    }
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

  const handleSubmit = () => {
    // In a real implementation, this would send the fence design to your server
    alert("Your fence plan has been submitted! Our team will contact you with a quote based on your design.")
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 bg-[#1e3a8a] text-white">
        <h2 className="text-2xl font-bold">Enhanced Fence Planner</h2>
        <p className="text-sm opacity-90">Draw lines on the map to show where you want your fence</p>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`p-3 mx-6 mt-4 rounded-md flex items-center gap-2 ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : notification.type === "error"
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
          }`}
        >
          {notification.type === "success" ? (
            <Check className="h-5 w-5" />
          ) : notification.type === "error" ? (
            <AlertCircle className="h-5 w-5" />
          ) : (
            <Info className="h-5 w-5" />
          )}
          <p>{notification.message}</p>
          <button onClick={() => setNotification(null)} className="ml-auto" aria-label="Dismiss notification">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

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
          <div className="flex flex-col gap-2">
            <Label htmlFor="fence-type">Fence Type</Label>
            <Select value={fenceType} onValueChange={setFenceType}>
              <SelectTrigger id="fence-type">
                <SelectValue placeholder="Select fence type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aluminum">Aluminum</SelectItem>
                <SelectItem value="vinyl">Vinyl</SelectItem>
                <SelectItem value="wood">Wood</SelectItem>
                <SelectItem value="chainlink">Chain Link</SelectItem>
                <SelectItem value="ornamental">Ornamental</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Instructions:</p>
            <ol className="text-sm text-gray-600 space-y-2 list-decimal pl-4">
              <li>Enter your address to find your property</li>
              <li>Upload a property image (optional)</li>
              <li>Click and drag on the map to draw lines where you want your fence</li>
              <li>Draw multiple lines if needed</li>
              <li>Use the undo button to remove the last line</li>
              <li>Save your plan to access it later</li>
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
              variant="outline"
              onClick={() => setShowSaveDialog(true)}
              disabled={lines.length === 0}
              className="w-full justify-start"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Plan
            </Button>

            <Button variant="outline" onClick={() => setShowLoadDialog(true)} className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" />
              Load Saved Plan
            </Button>

            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full justify-start"
              disabled={uploadingImage}
            >
              {uploadingImage ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ImageIcon className="mr-2 h-4 w-4" />
              )}
              Upload Property Image
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleUploadImage} accept="image/*" className="hidden" />

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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="draw">Draw Fence</TabsTrigger>
              <TabsTrigger value="view">View Plan</TabsTrigger>
            </TabsList>
          </Tabs>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#1e3a8a]" />
                <p className="mt-2 text-sm text-gray-600">Loading map...</p>
              </div>
            </div>
          )}

          <div className="relative">
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

            {activeTab === "view" && selectedPlan && (
              <div className="absolute top-4 left-4 right-4 bg-white/90 p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-lg text-[#1e3a8a]">{selectedPlan.name}</h3>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div>
                    <span className="font-medium">Address:</span> {selectedPlan.address}
                  </div>
                  <div>
                    <span className="font-medium">Length:</span> {selectedPlan.estimatedLength} ft
                  </div>
                  <div>
                    <span className="font-medium">Fence Type:</span> {selectedPlan.fenceType || "Not specified"}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(selectedPlan.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Plan Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Fence Plan</DialogTitle>
            <DialogDescription>Give your fence plan a name so you can easily find it later.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="plan-name">Plan Name</Label>
              <Input
                id="plan-name"
                placeholder="e.g., Backyard Fence"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan-notes">Notes (Optional)</Label>
              <Textarea
                id="plan-notes"
                placeholder="Add any notes about this fence plan..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePlan} disabled={!planName || savingPlan} className="bg-[#1e3a8a]">
              {savingPlan ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Plan"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load Plan Dialog */}
      <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Load Saved Fence Plan</DialogTitle>
            <DialogDescription>Select a previously saved fence plan to continue working on it.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {loadingSavedPlans ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-[#1e3a8a]" />
              </div>
            ) : savedPlans.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No saved plans found.</p>
                <p className="text-sm text-gray-400 mt-2">Draw a fence plan and save it to see it here.</p>
              </div>
            ) : (
              <div className="grid gap-4 max-h-[400px] overflow-y-auto pr-2">
                {savedPlans.map((plan) => (
                  <Card key={plan.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <CardDescription>
                        {plan.address || "No address"} • {new Date(plan.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium">Length:</span> {plan.estimatedLength} ft
                        </div>
                        <div>
                          <span className="font-medium">Type:</span> {plan.fenceType || "Not specified"}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                      <Button size="sm" onClick={() => handleLoadPlan(plan)} className="bg-[#1e3a8a]">
                        <Download className="h-4 w-4 mr-1" />
                        Load
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoadDialog(false)}>
              Cancel
            </Button>
            <Button onClick={loadSavedPlans} disabled={loadingSavedPlans} variant="outline">
              {loadingSavedPlans ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <List className="mr-2 h-4 w-4" />
                  Refresh Plans
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="p-6 bg-gray-50 border-t">
        <p className="text-sm text-gray-500">
          <strong>Note:</strong> For the most accurate quote, please be as precise as possible when drawing your fence
          lines. Our team will review your plan and contact you with a detailed quote.
        </p>
      </div>
    </div>
  )
}
