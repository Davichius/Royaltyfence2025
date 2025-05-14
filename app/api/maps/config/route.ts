import { type NextRequest, NextResponse } from "next/server"
import { mapConfigLimiter } from "@/lib/rate-limiter"
import { withRateLimit } from "@/lib/rate-limit-middleware"

async function handler(request: NextRequest) {
  // Only return minimal information needed by the client
  // The actual API key stays on the server
  return NextResponse.json({
    hasApiKey: !!process.env.GOOGLE_MAPS_API_KEY,
  })
}

export const GET = withRateLimit(handler, mapConfigLimiter)
