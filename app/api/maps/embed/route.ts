import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  // Get parameters from the request
  const center = searchParams.get("center") || "29.0280,-81.3036"
  const zoom = searchParams.get("zoom") || "11"
  const q = searchParams.get("q") || "Southwest+Volusia+County,FL"

  // Create the Google Maps embed URL with the API key from server environment
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${q}&center=${center}&zoom=${zoom}`

  // Redirect to the Google Maps embed URL
  return NextResponse.redirect(embedUrl)
}
