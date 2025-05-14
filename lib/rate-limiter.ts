// Simple in-memory rate limiter
// For production, consider using a distributed solution like Redis

type RateLimitRecord = {
  count: number
  resetAt: number
}

type RateLimitOptions = {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
}

class RateLimiter {
  private limits: Map<string, RateLimitRecord> = new Map()
  private options: RateLimitOptions

  constructor(options: RateLimitOptions) {
    this.options = options

    // Clean up expired records every minute
    setInterval(() => this.cleanup(), 60000)
  }

  check(key: string): { limited: boolean; remaining: number; resetAt: number } {
    const now = Date.now()
    const record = this.limits.get(key)

    // If no record exists or the window has expired, create a new record
    if (!record || record.resetAt <= now) {
      const resetAt = now + this.options.windowMs
      this.limits.set(key, { count: 1, resetAt })
      return { limited: false, remaining: this.options.maxRequests - 1, resetAt }
    }

    // If the request would exceed the limit, return limited
    if (record.count >= this.options.maxRequests) {
      return { limited: true, remaining: 0, resetAt: record.resetAt }
    }

    // Increment the count and return not limited
    record.count += 1
    return { limited: false, remaining: this.options.maxRequests - record.count, resetAt: record.resetAt }
  }

  private cleanup() {
    const now = Date.now()
    for (const [key, record] of this.limits.entries()) {
      if (record.resetAt <= now) {
        this.limits.delete(key)
      }
    }
  }
}

// Create rate limiters with different configurations
export const mapConfigLimiter = new RateLimiter({ windowMs: 60000, maxRequests: 20 }) // 20 requests per minute
export const mapEmbedLimiter = new RateLimiter({ windowMs: 60000, maxRequests: 10 }) // 10 requests per minute
export const mapStaticLimiter = new RateLimiter({ windowMs: 60000, maxRequests: 30 }) // 30 requests per minute
export const mapScriptLimiter = new RateLimiter({ windowMs: 60000, maxRequests: 5 }) // 5 requests per minute
