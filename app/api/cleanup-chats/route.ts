import { NextResponse } from "next/server"
import { cleanupOldChatHistories } from "@/lib/blob-storage"

// Check if required environment variables are set
const CLEANUP_API_KEY = process.env.CLEANUP_API_KEY
if (!CLEANUP_API_KEY) {
  console.error("CLEANUP_API_KEY is not set. The chat history cleanup endpoint will not be secure.")
}

// This route can be triggered by a cron job or manually
export async function POST(req: Request) {
  try {
    // Check for authorization
    const authHeader = req.headers.get("authorization")
    if (!CLEANUP_API_KEY || authHeader !== `Bearer ${CLEANUP_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const result = await cleanupOldChatHistories()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in cleanup:", error)
    return NextResponse.json({ error: "Failed to clean up chat histories" }, { status: 500 })
  }
}
