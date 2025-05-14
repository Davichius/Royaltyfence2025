"use client"

import { useState } from "react"
import { Check } from "lucide-react"

interface FenceType {
  id: string
  name: string
  description: string
  price: string
  features: string[]
}

export function FenceTypeSelector({ onSelect }: { onSelect: (type: string) => void }) {
  const [selected, setSelected] = useState<string>("aluminum")

  const fenceTypes: FenceType[] = [
    {
      id: "aluminum",
      name: "Hurricane-Grade Aluminum",
      description: "Our most popular option for Florida homes",
      price: "$45-65 per linear foot",
      features: ["150+ MPH wind rating", "Lifetime warranty", "Zero maintenance", "Salt-air resistant"],
    },
    {
      id: "vinyl",
      name: "Storm-Shield Vinyl",
      description: "Perfect for privacy and storm protection",
      price: "$35-55 per linear foot",
      features: ["130+ MPH wind rating", "30-year warranty", "Low maintenance", "UV resistant"],
    },
    {
      id: "chainlink",
      name: "Reinforced Chain Link",
      description: "Economical and extremely durable",
      price: "$25-40 per linear foot",
      features: ["140+ MPH wind rating", "20-year warranty", "Virtually indestructible", "Pet-friendly"],
    },
    {
      id: "ornamental",
      name: "Decorative Iron",
      description: "Elegant and extremely durable",
      price: "$55-75 per linear foot",
      features: ["150+ MPH wind rating", "25-year warranty", "Minimal maintenance", "Rust-resistant coating"],
    },
  ]

  const handleSelect = (id: string) => {
    setSelected(id)
    onSelect(id)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#1e3a8a]">Select Fence Type</h3>
      <div className="grid grid-cols-1 gap-3">
        {fenceTypes.map((type) => (
          <div
            key={type.id}
            className={`border rounded-lg p-3 cursor-pointer transition-colors ${
              selected === type.id ? "border-[#1e3a8a] bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleSelect(type.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{type.name}</h4>
                <p className="text-sm text-gray-600">{type.description}</p>
                <p className="text-sm font-medium text-[#1e3a8a] mt-1">{type.price}</p>
              </div>
              {selected === type.id && (
                <div className="h-5 w-5 rounded-full bg-[#1e3a8a] flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1">
              {type.features.map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
