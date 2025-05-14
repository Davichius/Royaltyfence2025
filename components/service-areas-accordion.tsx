"use client"

import { useState } from "react"
import { ChevronDown, MapPin } from "lucide-react"

export function ServiceAreasAccordion() {
  const [openArea, setOpenArea] = useState<string | null>("deland")

  const toggleArea = (area: string) => {
    setOpenArea(openArea === area ? null : area)
  }

  const areas = [
    {
      id: "deland",
      name: "DeLand",
      description:
        "As the county seat of Volusia County, DeLand is home to many historic properties and beautiful homes that deserve quality fencing solutions. Our team has completed over 150 fence installations in DeLand, including in Victoria Hills, College Arms, and downtown historic districts.",
      neighborhoods: ["Victoria Hills", "College Arms", "Downtown Historic District", "Glenwood", "Lake Winnemissett"],
    },
    {
      id: "orange-city",
      name: "Orange City",
      description:
        "Orange City residents trust Royalty Fence for storm-resistant vinyl fencing that withstands Florida's harsh weather. We've installed fences in neighborhoods throughout Orange City, including Blue Spring Reserve and Saxon Ridge.",
      neighborhoods: ["Blue Spring Reserve", "Saxon Ridge", "Grandview Heights", "Monastery Hills", "Summerhaven"],
    },
    {
      id: "deltona",
      name: "Deltona",
      description:
        "As Volusia County's largest city, Deltona homeowners rely on our expertise for durable, beautiful fences. We've completed numerous installations across Deltona neighborhoods, including Pine Ridge, Deltona Lakes, and Timbercrest.",
      neighborhoods: ["Pine Ridge", "Deltona Lakes", "Timbercrest", "Deltona Woods", "Saxon Boulevard Corridor"],
    },
    {
      id: "debary",
      name: "DeBary",
      description:
        "DeBary residents appreciate our attention to detail and storm-resistant fence designs. We've installed fences throughout DeBary, including in Glen Abbey, DeBary Golf & Country Club, and Summertrees.",
      neighborhoods: ["Glen Abbey", "DeBary Golf & Country Club", "Summertrees", "River Oaks", "Quail Lake"],
    },
  ]

  return (
    <section className="service-areas bg-gradient-to-br from-blue-50 to-white py-12 rounded-3xl shadow-lg border border-blue-100 hidden">
      <div className="text-center mb-12">
        <div className="inline-block bg-blue-100 text-royal-blue px-4 py-1 rounded-full text-sm font-bold mb-4 shadow-sm">
          SERVICE AREAS
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">Where We Install</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Royalty Fence proudly serves Southwest Volusia County with premium fence installation and repair services
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {areas.map((area) => (
          <div key={area.id} className="mb-4">
            <button
              onClick={() => toggleArea(area.id)}
              className={`w-full flex items-center justify-between p-5 rounded-xl text-left transition-all ${
                openArea === area.id
                  ? "bg-royal-blue text-white shadow-lg"
                  : "bg-white text-royal-blue border border-gray-200 hover:bg-blue-50"
              }`}
            >
              <div className="flex items-center">
                <MapPin className={`mr-3 h-5 w-5 ${openArea === area.id ? "text-yellow-300" : "text-royal-blue"}`} />
                <span className="text-xl font-bold">{area.name}</span>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${openArea === area.id ? "rotate-180" : ""}`} />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openArea === area.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-5 bg-white border-x border-b border-gray-200 rounded-b-xl">
                <p className="text-gray-700 mb-4">{area.description}</p>
                <div>
                  <h4 className="font-bold text-royal-blue mb-2">Neighborhoods we serve:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {area.neighborhoods.map((neighborhood) => (
                      <div key={neighborhood} className="flex items-center">
                        <div className="w-2 h-2 bg-royal-blue rounded-full mr-2"></div>
                        <span className="text-sm text-gray-700">{neighborhood}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
