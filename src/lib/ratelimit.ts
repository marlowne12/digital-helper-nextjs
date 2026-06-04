// Rate limiting utility using Upstash Redis + @upstash/ratelimit
//
// SETUP:
// 1. Create a free Redis database at https://console.upstash.com/
//    OR link an existing Vercel KV store (it is Upstash Redis under the hood —
//    use the same UPSTASH_REDIS_REST_URL/TOKEN that Vercel KV provides).
// 2. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in your env.
//    On Vercel, these are auto-injected when a KV store is linked.
// 3. Run: npm install @upstash/ratelimit @upstash/redis
//
// NOTE: If these env vars are absent, checkRateLimit() returns success=true
// and logs a warning — endpoints continue to function without rate limiting.

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Lazy singleton — only instantiated when env vars are present.
let _ratelimit: Ratelimit | null = null;

function getRatelimit(): Ratelimit | null {
    if (_ratelimit) return _ratelimit;

    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
        return null;
    }

    _ratelimit = new Ratelimit({
        redis: Redis.fromEnv(),
        // Sliding window: 10 requests per 10 seconds per identifier (IP address)
        limiter: Ratelimit.slidingWindow(10, '10 s'),
        analytics: false,
    });

    return _ratelimit;
}

export interface RateLimitResult {
    success: boolean;
    remaining: number;
}

/**
 * Check whether the given identifier (typically the client IP) is within
 * the allowed request rate. If Upstash is not configured, always returns
 * success=true so endpoints remain functional during local dev / cold start.
 */
export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
    const limiter = getRatelimit();

    if (!limiter) {
        console.warn(
            '[ratelimit] Upstash not configured — rate limiting skipped. ' +
            'Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to enable.'
        );
        return { success: true, remaining: -1 };
    }

    try {
        const { success, remaining } = await limiter.limit(identifier);
        return { success, remaining };
    } catch (error) {
        // Upstash unreachable — fail open so the endpoint stays available
        console.error('[ratelimit] Redis error (failing open):', error);
        return { success: true, remaining: -1 };
    }
}
