"use client"

import { useEffect, useState } from "react"

export function InstallationSlots() {
  const [slots, setSlots] = useState(15)

  useEffect(() => {
    // Get last visit timestamp and slots from localStorage
    const lastVisitTime = Number.parseInt(localStorage.getItem("lastVisitTime") || "0")
    const savedSlots = Number.parseInt(localStorage.getItem("installationSlots") || "15")

    const currentTime = Date.now()
    localStorage.setItem("lastVisitTime", currentTime.toString())

    // If this is the first visit, just set the initial slots
    if (lastVisitTime === 0) {
      localStorage.setItem("installationSlots", "15")
      setSlots(15)
      return
    }

    // Calculate hours since last visit
    const hoursSinceLastVisit = (currentTime - lastVisitTime) / (1000 * 60 * 60)

    // Decrease slots based on time elapsed (1 slot per 4 hours, up to 3 slots per day)
    if (hoursSinceLastVisit >= 4) {
      // Calculate how many slots to decrease (1 per 4 hours, max 3)
      const decreaseAmount = Math.min(Math.floor(hoursSinceLastVisit / 4), 3)

      // Decrease slots but never below 1
      const newSlots = Math.max(1, savedSlots - decreaseAmount)
      localStorage.setItem("installationSlots", newSlots.toString())
      setSlots(newSlots)
    } else {
      setSlots(savedSlots)
    }
  }, [])

  return (
    <div className="text-2xl md:text-3xl font-bold mb-8">
      <strong className="text-royal-gold">Only {slots} installation slots</strong> remain before June deadlines
    </div>
  )
}
