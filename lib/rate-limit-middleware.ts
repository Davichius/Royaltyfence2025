import { type NextRequest, NextResponse } from "next/server"
import { apiUsageMonitor } from "./api-usage-monitor"

export function withRateLimit(
  handler: (request: NextRequest) => Promise<NextResponse> | NextResponse,
  limiter: any,
  keyGenerator: (request: NextRequest) => string = (req) => req.ip || "unknown",
) {
  return async function rateLimit(request: NextRequest) {
    const key = keyGenerator(request)
    const { limited, remaining, resetAt } = limiter.check(key)

    // Track API usage
    const endpoint = request.nextUrl.pathname
    apiUsageMonitor.track(endpoint, request.ip || "unknown")

    if (limited) {
      return new NextResponse(
        JSON.stringify({
          error: "Too many requests",
          message: "Rate limit exceeded. Please try again later.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": limiter.options.maxRequests.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": Math.ceil(resetAt / 1000).toString(),
            "Retry-After": Math.ceil((resetAt - Date.now()) / 1000).toString(),
          },
        },
      )
    }

    const response = await handler(request)

    // Add rate limit headers to the response
    response.headers.set("X-RateLimit-Limit", limiter.options.maxRequests.toString())
    response.headers.set("X-RateLimit-Remaining", remaining.toString())
    response.headers.set("X-RateLimit-Reset", Math.ceil(resetAt / 1000).toString())

    return response
  }
}
