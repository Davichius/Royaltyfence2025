"use client"

import { Check } from "lucide-react"
import Image from "next/image"

export function StormTimeline() {
  const timelineEvents = [
    {
      year: 2017,
      storm: "Hurricane Irma",
      category: "Cat 4",
      windSpeed: "130 mph",
      description:
        "All 37 Royalty Fence installations in Volusia County remained intact with zero structural failures.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      year: 2019,
      storm: "Hurricane Dorian",
      category: "Cat 5",
      windSpeed: "185 mph",
      description: "Our reinforced post system prevented any fence failures across 112 installations.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      year: 2022,
      storm: "Hurricane Ian",
      category: "Cat 4",
      windSpeed: "155 mph",
      description: "98.7% of our fences survived with no damage, compared to 62% failure rate of standard fences.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-royal-blue"></div>

        {timelineEvents.map((event, index) => (
          <div
            key={index}
            className={`relative mb-16 ${index % 2 === 0 ? "md:ml-auto md:pl-12 md:pr-0" : "md:mr-auto md:pr-12 md:pl-0"} md:w-1/2 pl-12`}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-auto md:right-auto md:-translate-x-1/2 top-0 w-8 h-8 rounded-full bg-royal-blue border-4 border-white shadow-lg flex items-center justify-center z-10">
              <Check className="h-4 w-4 text-white" />
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={`Damage from ${event.storm}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <div className="text-royal-gold font-bold text-2xl">{event.year}</div>
                    <h3 className="text-xl font-bold">{event.storm}</h3>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between mb-4">
                  <div className="bg-royal-blue/10 text-royal-blue px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </div>
                  <div className="bg-royal-gold/10 text-royal-gold px-3 py-1 rounded-full text-sm font-medium">
                    {event.windSpeed}
                  </div>
                </div>

                <p className="text-gray-700">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
