/**
 * Rate Limiter Utility
 *
 * @description Token bucket rate limiter for managing Riot Games API rate limits
 * @author [Trevor Tippery]
 * @created 2025-11-09
 * @notes Implementation approach developed with assistance from Claude AI (Anthropic)
 */

/**
 * Token bucket rate limiter for Riot API
 * Handles both rate limits:
 * - 20 requests per 1 second
 * - 100 requests per 2 minutes
 */
class RateLimiter {
  constructor() {
    // Short-term: 20 requests per second
    this.shortLimit = 20;
    this.shortWindow = 1000;
    this.shortTokens = this.shortLimit;
    this.shortLastRefill = Date.now();

    // Long-term: 100 requests per 2 minutes
    this.longLimit = 100;
    this.longWindow = 120000;
    this.longTokens = this.longLimit;
    this.longLastRefill = Date.now();
  }

  refillTokens() {
    const now = Date.now();

    // Refill short-term bucket
    const shortElapsed = now - this.shortLastRefill;
    if (shortElapsed >= this.shortWindow) {
      this.shortTokens = this.shortLimit;
      this.shortLastRefill = now;
    }

    // Refill long-term bucket
    const longElapsed = now - this.longLastRefill;
    if (longElapsed >= this.longWindow) {
      this.longTokens = this.longLimit;
      this.longLastRefill = now;
    }
  }

  async acquire() {
    while (true) {
      this.refillTokens();

      if (this.shortTokens > 0 && this.longTokens > 0) {
        this.shortTokens--;
        this.longTokens--;
        return;
      }

      // Calculate wait time for next available token
      const shortWait = this.shortTokens <= 0
        ? this.shortWindow - (Date.now() - this.shortLastRefill)
        : 0;
      const longWait = this.longTokens <= 0
        ? this.longWindow - (Date.now() - this.longLastRefill)
        : 0;

      const waitTime = Math.max(shortWait, longWait, 100);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  // Optional: Check if tokens are available without acquiring
  canAcquire() {
    this.refillTokens();
    return this.shortTokens > 0 && this.longTokens > 0;
  }

  // Optional: Get current token counts for debugging
  getStatus() {
    this.refillTokens();
    return {
      short: {
        available: this.shortTokens,
        limit: this.shortLimit,
        nextRefill: this.shortLastRefill + this.shortWindow - Date.now()
      },
      long: {
        available: this.longTokens,
        limit: this.longLimit,
        nextRefill: this.longLastRefill + this.longWindow - Date.now()
      }
    };
  }
}

// Export singleton instance
export const riotRateLimiter = new RateLimiter();