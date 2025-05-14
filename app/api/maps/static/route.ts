import { type NextRequest, NextResponse } from "next/server"
import { mapStaticLimiter } from "@/lib/rate-limiter"
import { withRateLimit } from "@/lib/rate-limit-middleware"

async function handler(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const center = searchParams.get("center") || "28.9478,-81.2987"
  const zoom = searchParams.get("zoom") || "11"
  const size = searchParams.get("size") || "600x400"
  const maptype = searchParams.get("maptype") || "roadmap"
  const markers = searchParams.get("markers") || ""
  const path = searchParams.get("path") || ""

  // Only proceed if we have an API key
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 })
  }

  // Create the Google Static Maps URL with our server-side API key
  let staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${zoom}&size=${size}&maptype=${maptype}&key=${process.env.GOOGLE_MAPS_API_KEY}`

  if (markers) {
    staticMapUrl += `&markers=${markers}`
  }

  if (path) {
    staticMapUrl += `&path=${path}`
  }

  // Redirect to the Google Static Maps URL
  return NextResponse.redirect(staticMapUrl)
}

export const GET = withRateLimit(handler, mapStaticLimiter)
