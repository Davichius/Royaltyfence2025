import { list, del } from "@vercel/blob"

export async function cleanupOldChatHistories(olderThanDays = 30) {
  try {
    // List all chat history blobs
    const { blobs } = await list({ prefix: "chat-history-" })

    // Get the cutoff date
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays)

    // Filter blobs older than the cutoff date
    const oldBlobs = blobs.filter((blob) => new Date(blob.uploadedAt) < cutoffDate)

    // Delete old blobs
    for (const blob of oldBlobs) {
      await del(blob.url)
      console.log(`Deleted old chat history: ${blob.url}`)
    }

    return {
      success: true,
      deleted: oldBlobs.length,
      message: `Deleted ${oldBlobs.length} old chat histories`,
    }
  } catch (error) {
    console.error("Error cleaning up old chat histories:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
