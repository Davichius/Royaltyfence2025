import { Card } from "@/components/ui/card"

interface SimpleGoogleMapProps {
  width?: string
  height?: string
  className?: string
  title?: string
}

export default function SimpleGoogleMap({
  width = "100%",
  height = "400px",
  className = "",
  title = "Royalty Fence Service Areas in Southwest Volusia County",
}: SimpleGoogleMapProps) {
  // Center coordinates for Southwest Volusia County (between DeLand and Deltona)
  const center = "29.0280,-81.3036" // Latitude, Longitude

  return (
    <Card className={`overflow-hidden shadow-md ${className}`}>
      <iframe
        title={title}
        width={width}
        height={height}
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`/api/maps/embed?center=${center}&zoom=11&q=Southwest+Volusia+County,FL`}
        className="w-full"
      ></iframe>
    </Card>
  )
}
