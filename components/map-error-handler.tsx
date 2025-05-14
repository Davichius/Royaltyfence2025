"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AlertCircle, Clock } from "lucide-react"

interface MapErrorHandlerProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function MapErrorHandler({ children, fallback }: MapErrorHandlerProps) {
  const [error, setError] = useState<string | null>(null)
  const [retryAfter, setRetryAfter] = useState<number | null>(null)

  useEffect(() => {
    // Reset error state when component mounts
    setError(null)
    setRetryAfter(null)

    // Listen for rate limit errors from map components
    const handleRateLimitError = (event: CustomEvent) => {
      setError(event.detail.message)
      setRetryAfter(event.detail.retryAfter)
    }

    window.addEventListener("map-rate-limit-error" as any, handleRateLimitError)

    return () => {
      window.removeEventListener("map-rate-limit-error" as any, handleRateLimitError)
    }
  }, [])

  // If there's a rate limit error, show a message
  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
          <span className="font-medium">Rate limit exceeded</span>
        </div>
        <p className="mt-2">{error}</p>
        {retryAfter && (
          <div className="mt-2 flex items-center text-xs text-red-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>Please try again in {Math.ceil(retryAfter / 60)} minute(s)</span>
          </div>
        )}
      </div>
    )
  }

  // Otherwise, render the children
  return <>{children}</>
}
