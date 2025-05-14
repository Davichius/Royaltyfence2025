"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { AlertTriangle, Wind, Clock, Shield, ArrowRight, Check, Info, Calendar } from "lucide-react"
import Link from "next/link"

export function StormCalculator() {
  const [fenceAge, setFenceAge] = useState(5)
  const [fenceType, setFenceType] = useState("vinyl")
  const [postDepth, setPostDepth] = useState(24)
  const [hasReinforcement, setHasReinforcement] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [userZipCode, setUserZipCode] = useState("")
  const [zipCodeError, setZipCodeError] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)

  const calculateRating = () => {
    // Base rating starts at 100
    let rating = 100

    // Deduct more points based on fence age - more aggressive degradation
    if (fenceAge > 10) {
      rating -= 60 // Was 40, increased to 60
    } else if (fenceAge > 5) {
      rating -= 40 // Was 20, increased to 40
    } else if (fenceAge > 2) {
      rating -= 25 // Was 10, increased to 25
    } else if (fenceAge > 0) {
      rating -= 10 // Added new tier for even new fences
    }

    // Adjust based on fence type - more realistic vulnerabilities
    if (fenceType === "chain") {
      rating -= 15 // Was 10, increased to 15
    } else if (fenceType === "aluminum") {
      rating -= 10 // Was 5, increased to 10
    } else if (fenceType === "wood") {
      rating -= 35 // Was 25, increased to 35
    } else if (fenceType === "vinyl") {
      rating -= 5 // Added small deduction for vinyl too
    }

    // Adjust based on post depth - more significant impact
    if (postDepth < 18) {
      rating -= 25 // Was 15, increased to 25
    } else if (postDepth < 24) {
      rating -= 15 // Was 5, increased to 15
    } else if (postDepth >= 30) {
      rating += 5 // Kept the same
    }

    // Bonus for reinforcement - kept the same
    if (hasReinforcement) {
      rating += 15
    }

    // Add a "competitor installation" penalty
    // This is implied by the user's comment about competitor installations
    rating -= 10 // Penalty for typical competitor installation practices

    // Cap the rating between 0 and 100
    return Math.max(0, Math.min(100, rating))
  }

  const getWindSpeed = (rating: number) => {
    if (rating >= 90) return "150+ mph"
    if (rating >= 80) return "120-150 mph" // Was 130-150
    if (rating >= 70) return "100-120 mph" // Was 110-130
    if (rating >= 60) return "80-100 mph" // Was 90-110
    if (rating >= 50) return "60-80 mph" // Was 70-90
    if (rating >= 40) return "40-60 mph" // Was 50-70
    return "< 40 mph" // Was < 50
  }

  const getRiskLevel = (rating: number) => {
    if (rating >= 85) return { level: "Low", color: "green" } // Was 80
    if (rating >= 70) return { level: "Moderate", color: "yellow" } // Was 60
    if (rating >= 50) return { level: "High", color: "orange" } // Was 40
    return { level: "Severe", color: "red" }
  }

  const handleCalculate = () => {
    // Validate zip code if entered
    if (userZipCode && !/^\d{5}$/.test(userZipCode)) {
      setZipCodeError("Please enter a valid 5-digit ZIP code")
      return
    }

    setZipCodeError("")
    setIsCalculating(true)

    // Simulate calculation time for better UX
    setTimeout(() => {
      setShowResults(true)
      setIsCalculating(false)
      setFormSubmitted(true)

      // Track the event (in a real app, this would be your analytics code)
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "calculator_used", {
          fence_age: fenceAge,
          fence_type: fenceType,
          post_depth: postDepth,
          has_reinforcement: hasReinforcement,
          rating: calculateRating(),
        })
      }
    }, 1500)
  }

  const rating = calculateRating()
  const windSpeed = getWindSpeed(rating)
  const risk = getRiskLevel(rating)

  // Function to get the color class based on risk level
  const getRiskColorClass = (riskColor: string) => {
    switch (riskColor) {
      case "green":
        return "bg-green-500"
      case "yellow":
        return "bg-yellow-500"
      case "orange":
        return "bg-orange-500"
      case "red":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Function to get the text color class based on risk level
  const getRiskTextClass = (riskColor: string) => {
    switch (riskColor) {
      case "green":
        return "text-green-700"
      case "yellow":
        return "text-yellow-700"
      case "orange":
        return "text-orange-700"
      case "red":
        return "text-red-700"
      default:
        return "text-gray-700"
    }
  }

  // Function to get the background color class based on risk level
  const getRiskBgClass = (riskColor: string) => {
    switch (riskColor) {
      case "green":
        return "bg-green-50"
      case "yellow":
        return "bg-yellow-50"
      case "orange":
        return "bg-orange-50"
      case "red":
        return "bg-red-50"
      default:
        return "bg-gray-50"
    }
  }

  // Function to get recommendations based on risk level
  const getRecommendations = (rating: number) => {
    if (rating >= 85) {
      return [
        "Your fence appears to be in good condition",
        "Consider a professional inspection before hurricane season",
        "Maintain regular cleaning to prevent deterioration",
      ]
    } else if (rating >= 70) {
      return [
        "Your fence may need reinforcement in key areas",
        "Schedule a professional inspection soon",
        "Consider upgrading vulnerable sections",
      ]
    } else if (rating >= 50) {
      return [
        "Your fence is at high risk of storm damage",
        "Immediate professional inspection recommended",
        "Reinforcement or replacement may be necessary",
      ]
    } else {
      return [
        "Your fence is unlikely to withstand strong winds",
        "Urgent professional assessment needed",
        "Replacement with hurricane-rated fencing recommended",
      ]
    }
  }

  return (
    <div className="max-w-4xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-royal-blue to-blue-800 text-white p-6">
        <h3 className="text-2xl font-bold flex items-center">
          <Wind className="mr-2 h-6 w-6" />
          Storm Readiness Calculator
        </h3>
        <p className="opacity-90">Answer a few questions about your current fence to see if it's hurricane-ready</p>
      </div>

      <div className="p-6 border-b">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">How old is your fence?</label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[fenceAge]}
                  min={0}
                  max={15}
                  step={1}
                  onValueChange={(value) => setFenceAge(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-center font-medium bg-gray-100 px-2 py-1 rounded-md">{fenceAge} years</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What type of fence do you have?</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { type: "vinyl", color: "emerald" },
                  { type: "chain", color: "amber" },
                  { type: "aluminum", color: "sky" },
                  { type: "wood", color: "rose" },
                ].map(({ type, color }) => (
                  <Button
                    key={type}
                    variant={fenceType === type ? "default" : "outline"}
                    className={
                      fenceType === type
                        ? `bg-gradient-to-r from-${color}-500 to-${color}-700 text-white shadow-lg border-2 border-${color}-300 transform scale-105 transition-all duration-200`
                        : `border-2 border-${color}-300 hover:border-${color}-500 hover:bg-${color}-50 text-${color}-700 hover:shadow-md transition-all duration-200`
                    }
                    onClick={() => setFenceType(type)}
                  >
                    <span className="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How deep are your fence posts? (inches)
              </label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[postDepth]}
                  min={12}
                  max={36}
                  step={6}
                  onValueChange={(value) => setPostDepth(value[0])}
                  className="flex-1"
                />
                <span className="w-16 text-center font-medium bg-gray-100 px-2 py-1 rounded-md">{postDepth}"</span>
              </div>
              <div className="mt-1 flex items-center text-xs text-gray-500">
                <Info className="h-3 w-3 mr-1" />
                <span>Not sure? Most standard installations are 24" deep</span>
              </div>
            </div>

            <div>
              <label className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasReinforcement}
                  onChange={(e) => setHasReinforcement(e.target.checked)}
                  className="rounded border-gray-300 text-royal-blue focus:ring-royal-blue mr-2"
                />
                <span className="font-medium">My fence has hurricane reinforcement</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your ZIP Code (optional)</label>
              <input
                type="text"
                value={userZipCode}
                onChange={(e) => setUserZipCode(e.target.value)}
                placeholder="32763"
                maxLength={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-blue focus:border-royal-blue"
              />
              {zipCodeError && <p className="mt-1 text-sm text-red-600">{zipCodeError}</p>}
              <div className="mt-1 flex items-center text-xs text-gray-500">
                <Info className="h-3 w-3 mr-1" />
                <span>For more accurate local storm risk assessment</span>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-md transform hover:scale-105 transition-transform"
              onClick={handleCalculate}
              disabled={isCalculating}
            >
              {isCalculating ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Calculating...
                </>
              ) : (
                "Calculate Storm Rating"
              )}
            </Button>
          </div>

          {showResults ? (
            <div className={`${getRiskBgClass(risk.color)} p-6 rounded-xl border border-gray-200 shadow-md`}>
              <div className="text-center mb-6">
                <h4 className="text-lg font-medium text-gray-700">Your Fence's Storm Rating</h4>
                <div className="relative w-40 h-40 mx-auto my-4">
                  <div className="absolute inset-0 rounded-full bg-gray-200 shadow-inner"></div>
                  <div
                    className={`absolute inset-0 rounded-full ${getRiskColorClass(risk.color)} shadow-lg`}
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin(rating * 0.06)}% ${50 - 50 * Math.cos(rating * 0.06)}%, 50% 50%)`,
                      transform: "rotate(-90deg)",
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-bold">{rating}</span>
                    <span className="text-sm text-gray-500">out of 100</span>
                  </div>
                </div>

                <div className={`font-bold text-xl mt-2 ${getRiskTextClass(risk.color)}`}>{risk.level} Risk</div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-medium">Wind Resistance:</span>
                  <span className="font-bold bg-royal-blue text-white px-3 py-1 rounded-full text-sm">{windSpeed}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-medium">Hurricane Category:</span>
                  <span className="font-bold bg-royal-blue text-white px-3 py-1 rounded-full text-sm">
                    {rating >= 80
                      ? "Up to Cat 4"
                      : rating >= 60
                        ? "Up to Cat 3"
                        : rating >= 40
                          ? "Up to Cat 1"
                          : "Not Hurricane Rated"}
                  </span>
                </div>

                <div className="mt-4">
                  <h5 className="font-medium text-gray-700 mb-2">Recommendations:</h5>
                  <ul className="space-y-2">
                    {getRecommendations(rating).map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div
                          className={`rounded-full ${getRiskBgClass(risk.color)} p-1 ${getRiskTextClass(risk.color)} mt-0.5 flex-shrink-0`}
                        >
                          {risk.color === "red" || risk.color === "orange" ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </div>
                        <span className="text-gray-700">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Button
                    className="w-full bg-gradient-to-r from-royal-blue to-blue-700 hover:from-blue-700 hover:to-royal-blue text-white shadow-md transform hover:scale-105 transition-transform"
                    asChild
                  >
                    <Link href="/free-inspection">
                      Get Free Storm Inspection
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <p className="text-center mt-3 text-sm text-gray-500">
                    No obligation • Professional assessment • Peace of mind
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-md">
              <h4 className="text-lg font-medium text-gray-700 mb-4">Why This Matters</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-800">Most fence damage occurs when wind speeds exceed your fence's rating</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <Clock className="h-5 w-5 text-royal-blue mt-1 flex-shrink-0" />
                  <p className="text-gray-800">The average fence loses 20% of its wind resistance after just 5 years</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                  <Shield className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-800">Our storm-proof fences maintain 95% of their rating for 25+ years</p>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                  <div className="flex items-center text-yellow-800 font-medium mb-2">
                    <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                    Did you know?
                  </div>
                  <p className="text-gray-700">
                    In 2022, over 60% of fence damage insurance claims in Volusia County were denied because the fences
                    weren't properly installed to code.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Conversion-focused footer - only show after form submission */}
      {formSubmitted && (
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="bg-royal-blue rounded-full p-2 mr-3">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-royal-blue">Want a professional opinion?</h4>
                <p className="text-sm text-gray-600">Our experts can verify your results on-site</p>
              </div>
            </div>

            <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold shadow-md" asChild>
              <Link href="/free-estimate">
                Schedule Free Inspection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
