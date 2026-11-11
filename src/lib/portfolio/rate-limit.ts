/**
 * Simple in-memory rate limiter for the contact endpoint.
 * Suitable for a single-instance deployment. For multi-instance setups,
 * use a shared store (Redis, KV, etc).
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 60_000; // 1 minute
const MAX_PER_WINDOW = 5;

const buckets = new Map<string, Bucket>();

// Light periodic cleanup so the map does not grow unbounded.
const CLEANUP_INTERVAL_MS = 5 * 60_000;
let lastCleanup = Date.now();

function cleanup(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterMs: number;
}

export function rateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  cleanup(now);

  const existing = buckets.get(identifier);
  if (!existing || existing.resetAt <= now) {
    buckets.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_PER_WINDOW - 1, retryAfterMs: WINDOW_MS };
  }

  existing.count += 1;
  if (existing.count > MAX_PER_WINDOW) {
    return {
      ok: false,
      remaining: 0,
      retryAfterMs: existing.resetAt - now,
    };
  }

  return {
    ok: true,
    remaining: MAX_PER_WINDOW - existing.count,
    retryAfterMs: existing.resetAt - now,
  };
}
