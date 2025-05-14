"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  name: string
  location: string
  text: string
  rating: number
}

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)

  const testimonials: Testimonial[] = [
    {
      name: "Michael Rodriguez",
      location: "Orange City",
      text: "The fence planner tool made it so easy to visualize exactly what I needed. Royalty Fence matched my design perfectly and the installation was completed in just one day!",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      location: "DeBary",
      text: "After Hurricane Ian destroyed our fence, we used the planner to design a new one. The quote was accurate and the fence withstood this year's storms without a scratch.",
      rating: 5,
    },
    {
      name: "David Martinez",
      location: "Deltona",
      text: "I was skeptical about planning my fence online, but this tool was incredibly accurate. The final installation matched my design exactly, and the price was exactly as quoted.",
      rating: 4,
    },
  ]

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 8000)
    return () => clearInterval(interval)
  }, [current])

  return (
    <div className="relative bg-white rounded-lg shadow-md p-6 overflow-hidden">
      <h3 className="text-xl font-bold text-[#1e3a8a] mb-4">What Our Customers Say</h3>

      <div className="relative h-[180px]">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <p className="italic text-gray-700 mb-4">"{testimonial.text}"</p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[#1e3a8a] font-bold">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <Button variant="outline" size="icon" onClick={prev} className="h-8 w-8 rounded-full">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button variant="outline" size="icon" onClick={next} className="h-8 w-8 rounded-full">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  )
}
