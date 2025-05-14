"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">Error</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Something went wrong</h2>
        <p className="text-gray-600 mb-8">
          We apologize for the inconvenience. Please try again or return to the home page.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => reset()}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <div className="pt-2">
            <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
