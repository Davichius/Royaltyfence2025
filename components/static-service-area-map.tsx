import { OptimizedImage } from "@/components/optimized-image"
import { getSizeAttribute } from "@/lib/image-optimization"
import { MapPin } from "lucide-react"

export function StaticServiceAreaMap() {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      {/* Static Map Background */}
      <div className="aspect-[16/9] relative">
        <OptimizedImage
          src="/placeholder.svg?height=600&width=1200&text=Southwest+Volusia+Service+Area"
          alt="Southwest Volusia Service Area Map"
          fill
          sizes={getSizeAttribute("full")}
          className="object-cover"
        />

        {/* Service Area Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
            {/* Simplified service area polygon */}
            <polygon
              points="400,200 600,150 800,200 850,350 700,450 500,400 350,300"
              fill="rgba(255,0,0,0.1)"
              stroke="red"
              strokeWidth="3"
              strokeDasharray="10,5"
            />

            {/* Service location markers */}
            <circle cx="500" cy="250" r="10" fill="#1E3A8A" stroke="white" strokeWidth="2" />
            <text x="520" y="255" fill="white" fontWeight="bold" fontSize="14">
              DeLand
            </text>

            <circle cx="650" cy="300" r="10" fill="#1E3A8A" stroke="white" strokeWidth="2" />
            <text x="670" y="305" fill="white" fontWeight="bold" fontSize="14">
              Orange City
            </text>

            <circle cx="750" cy="350" r="10" fill="#1E3A8A" stroke="white" strokeWidth="2" />
            <text x="770" y="355" fill="white" fontWeight="bold" fontSize="14">
              Deltona
            </text>
          </svg>
        </div>
      </div>

      {/* Map Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-2 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-yellow-400" />
            Southwest Volusia Service Area
          </h3>
          <p className="text-white/90 max-w-2xl">
            Royalty Fence proudly serves all of Southwest Volusia County including DeLand, Orange City, Deltona, DeBary,
            Lake Helen, and surrounding areas.
          </p>
        </div>
      </div>
    </div>
  )
}
