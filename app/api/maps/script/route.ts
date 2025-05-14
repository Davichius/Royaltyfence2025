import { type NextRequest, NextResponse } from "next/server"
import { mapScriptLimiter } from "@/lib/rate-limiter"
import { withRateLimit } from "@/lib/rate-limit-middleware"

async function handler(request: NextRequest) {
  // Only proceed if we have an API key
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 })
  }

  // Redirect to the Google Maps JavaScript API with our server-side API key
  const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMap`

  return NextResponse.redirect(scriptUrl)
}

export const GET = withRateLimit(handler, mapScriptLimiter)
