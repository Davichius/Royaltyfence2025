// Simple in-memory API usage monitor
// For production, consider using a database or analytics service

type ApiUsageRecord = {
  endpoint: string
  count: number
  lastUsed: number
}

class ApiUsageMonitor {
  private usage: Map<string, ApiUsageRecord> = new Map()

  track(endpoint: string, ip: string): void {
    const key = `${endpoint}:${ip}`
    const now = Date.now()
    const record = this.usage.get(key)

    if (!record) {
      this.usage.set(key, { endpoint, count: 1, lastUsed: now })
      return
    }

    record.count += 1
    record.lastUsed = now
  }

  getUsage(): ApiUsageRecord[] {
    return Array.from(this.usage.values())
  }

  getEndpointUsage(endpoint: string): number {
    let total = 0
    for (const record of this.usage.values()) {
      if (record.endpoint === endpoint) {
        total += record.count
      }
    }
    return total
  }

  // Clean up records older than 30 days
  cleanup(): void {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
    for (const [key, record] of this.usage.entries()) {
      if (record.lastUsed < thirtyDaysAgo) {
        this.usage.delete(key)
      }
    }
  }
}

export const apiUsageMonitor = new ApiUsageMonitor()

// Clean up old records once a day
setInterval(() => apiUsageMonitor.cleanup(), 24 * 60 * 60 * 1000)
