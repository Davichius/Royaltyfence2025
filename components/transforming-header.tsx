"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, Phone, Clock } from "lucide-react"
import { SafeNextImage } from "./safe-next-image"

export function TransformingHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<{ days: number; hours: number }>({ days: 0, hours: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate and update the time remaining until June 15th
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date()
      const targetDate = new Date(now.getFullYear(), 5, 15) // Month is 0-indexed, so 5 = June

      // If the date has already passed this year, set it for next year
      if (now > targetDate) {
        targetDate.setFullYear(targetDate.getFullYear() + 1)
      }

      const timeDiff = targetDate.getTime() - now.getTime()

      // Convert to days and hours
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

      setTimeRemaining({ days, hours })
    }

    // Calculate immediately
    calculateTimeRemaining()

    // Then update every hour
    const interval = setInterval(calculateTimeRemaining, 1000 * 60 * 60)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="sticky top-0 z-50">
      {/* Emergency Alert Bar - Visible only when not scrolled */}
      <div
        className={`bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 text-sm fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "opacity-0 -translate-y-full" : "opacity-100"
        }`}
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 animate-pulse text-yellow-300" />
            <span className="font-medium text-base">
              <strong className="text-yellow-300">STORM WATCH:</strong> Free Volusia fence inspections through June 15th
            </span>
          </div>
          <Link
            href="/storm-watch"
            className="bg-white text-red-600 px-4 py-1.5 rounded-md font-semibold hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
          >
            Claim Offer →
          </Link>
        </div>
      </div>

      {/* Unified Header */}
      <header
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-gradient-to-r from-white to-gray-50 border-b border-gray-200"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <div className="relative h-[40px] w-[140px] md:h-[50px] md:w-[160px]">
              <SafeNextImage
                src="https://ielmooer5oi2a4tr.public.blob.vercel-storage.com/RoyaltyFence/RoyaltyFenceNewLogo-x8tQ373qeMO5i4Enr6ZbwTGPUSTVdx.png"
                alt="Royalty Fence Logo"
                width={160}
                height={64}
                className="object-contain"
                priority
                fallbackSrc="/placeholder.svg?height=64&width=160&text=Royalty+Fence"
              />
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* Storm Alert CTA - Only visible when scrolled */}
            {isScrolled && (
              <Link
                href="/storm-watch"
                className="flex items-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-1.5 rounded-md font-semibold text-xs transition-all duration-300 animate-fadeIn hover:scale-105 shadow-md animate-subtle-pulse"
              >
                <AlertTriangle className="h-3.5 w-3.5 mr-1.5 text-yellow-300" />
                <span>STORM WATCH</span>
                <div className="ml-2 flex items-center text-[10px] bg-white/20 px-1.5 py-0.5 rounded">
                  <Clock className="h-2.5 w-2.5 mr-0.5" />
                  <span>
                    {timeRemaining.days}d {timeRemaining.hours}h
                  </span>
                </div>
              </Link>
            )}

            <Link
              href="tel:3864798379"
              className="hidden md:flex items-center bg-gradient-to-r from-royal-gold to-yellow-600 hover:from-yellow-600 hover:to-royal-gold text-white px-5 py-2.5 rounded-md font-semibold text-sm transition-all shadow-md transform hover:scale-105"
            >
              <Phone className="h-4 w-4 mr-2" />
              (386) 479-8379
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}
