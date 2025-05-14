import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // In a real application, you would check for authentication here
  // For now, we'll just add a simple check for a query parameter

  const url = new URL(request.url)

  // Check if the request is for the admin section
  if (url.pathname.startsWith("/admin")) {
    // In a real app, you would check for a valid session or token
    // For demo purposes, we'll allow access with a special query param
    const hasAccess = url.searchParams.get("access") === "royaltyfence"

    if (!hasAccess) {
      // Redirect to login or show an error
      return NextResponse.redirect(new URL("/?error=unauthorized", request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
}
