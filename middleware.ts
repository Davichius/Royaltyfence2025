import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get response
  const response = NextResponse.next()

  // Add security headers
  const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googleapis.com *.googletagmanager.com *.google-analytics.com *.clarity.ms;
    style-src 'self' 'unsafe-inline' *.googleapis.com;
    img-src 'self' data: blob: *.googleapis.com *.gstatic.com *.google-analytics.com *.doubleclick.net *.clarity.ms;
    font-src 'self' data: *.googleapis.com *.gstatic.com;
    connect-src 'self' *.vercel-analytics.com *.vercel.app *.googleapis.com *.google-analytics.com *.doubleclick.net *.clarity.ms *.facebook.com api-inference.huggingface.co;
    frame-src 'self' *.youtube.com *.google.com;
    frame-ancestors 'self';
    form-action 'self';
    base-uri 'self';
    object-src 'none';
  `

  // Add headers to response
  response.headers.set("Content-Security-Policy", ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim())
  response.headers.set("X-Frame-Options", "SAMEORIGIN")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  // Add additional security headers
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("X-DNS-Prefetch-Control", "on")

  // Cache control for static assets
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|gif|png|webp|svg|css|js)$/)) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable")
  }

  return response
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
}
