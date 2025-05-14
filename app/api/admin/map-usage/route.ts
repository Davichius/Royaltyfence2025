import { type NextRequest, NextResponse } from "next/server"
import { apiUsageMonitor } from "@/lib/api-usage-monitor"

// This should be properly secured in production
export async function GET(request: NextRequest) {
  // Simple admin check - in production, use proper authentication
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader.split(" ")[1] !== process.env.ADMIN_API_KEY) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  const usage = apiUsageMonitor.getUsage()
  const summary = {
    total: usage.reduce((sum, record) => sum + record.count, 0),
    byEndpoint: {
      "/api/maps/config": apiUsageMonitor.getEndpointUsage("/api/maps/config"),
      "/api/maps/embed": apiUsageMonitor.getEndpointUsage("/api/maps/embed"),
      "/api/maps/static": apiUsageMonitor.getEndpointUsage("/api/maps/static"),
      "/api/maps/script": apiUsageMonitor.getEndpointUsage("/api/maps/script"),
    },
  }

  return NextResponse.json({ usage, summary })
}
