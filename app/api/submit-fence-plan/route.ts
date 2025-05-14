import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This is a test/development version of the API route
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Log the form submission for testing purposes
    console.log("Fence plan submission received:", data)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For testing, we'll just return success
    // In production, you would:
    // 1. Validate the data
    // 2. Save to a database
    // 3. Send email notifications
    // 4. Integrate with CRM systems

    return NextResponse.json({
      success: true,
      message: "Fence plan submitted successfully",
      data: {
        referenceNumber: `RF-${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`,
        estimatedResponseTime: "24 hours",
      },
    })
  } catch (error) {
    console.error("Error processing fence plan submission:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process fence plan submission. Please try again.",
      },
      { status: 500 },
    )
  }
}
