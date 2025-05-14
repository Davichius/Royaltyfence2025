import { MapPin } from "lucide-react"

interface StaticMapFallbackProps {
  className?: string
}

export function StaticMapFallback({ className = "" }: StaticMapFallbackProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl shadow-xl ${className}`}>
      <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-50 to-blue-100">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%231e3a8a' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Service Area Visualization */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Service Area Polygon */}
          <path
            d="M30,30 L60,25 L80,40 L75,70 L50,80 L25,60 Z"
            fill="rgba(255,0,0,0.1)"
            stroke="#ff0000"
            strokeWidth="1.5"
            strokeDasharray="5,3"
            className="animate-pulse"
          />

          {/* Location Markers */}
          <g className="cursor-pointer">
            <circle cx="45" cy="40" r="2" fill="#1E3A8A" stroke="#fff" strokeWidth="0.5" />
            <text x="47" y="41" fontSize="3" fill="#1E3A8A" fontWeight="bold">
              DeLand
            </text>
          </g>

          <g className="cursor-pointer">
            <circle cx="60" cy="35" r="2" fill="#1E3A8A" stroke="#fff" strokeWidth="0.5" />
            <text x="62" y="36" fontSize="3" fill="#1E3A8A" fontWeight="bold">
              Orange City
            </text>
          </g>

          <g className="cursor-pointer">
            <circle cx="70" cy="55" r="2" fill="#1E3A8A" stroke="#fff" strokeWidth="0.5" />
            <text x="72" y="56" fontSize="3" fill="#1E3A8A" fontWeight="bold">
              Deltona
            </text>
          </g>
        </svg>
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
