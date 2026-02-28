import { Ratelimit } from '@upstash/ratelimit';
import type { Redis as RedisType } from '@upstash/redis';
import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis: RedisType | null = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Rate limit configurations
export const rateLimits = {
  // AI Chat: 10 requests per minute
  chat: redis ? new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'),
    analytics: true,
    prefix: 'ratelimit:chat',
  }) : null,

  // SEO Analysis: 5 requests per minute
  seoAnalysis: redis ? new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    analytics: true,
    prefix: 'ratelimit:seo',
  }) : null,

  // Business Analysis: 3 requests per minute
  businessAnalysis: redis ? new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 m'),
    analytics: true,
    prefix: 'ratelimit:business',
  }) : null,

  // Content Generation: 3 requests per hour
  contentGeneration: redis ? new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 h'),
    analytics: true,
    prefix: 'ratelimit:content',
  }) : null,

  // Lead Scraper: 10 requests per hour
  leadScraper: redis ? new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 h'),
    analytics: true,
    prefix: 'ratelimit:leads',
  }) : null,

  // General API: 100 requests per minute
  general: redis ? new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m'),
    analytics: true,
    prefix: 'ratelimit:general',
  }) : null,
};

// Check if rate limiting is configured
export function isRateLimitConfigured(): boolean {
  return !!redis;
}

// Get client IP from request
export function getClientIP(request: Request): string {
  // Check for Vercel headers first
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  // Check for real IP header
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Check for Cloudflare
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Fallback to a default (for local development)
  return '127.0.0.1';
}

// Rate limit check result
export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

// Check rate limit
export async function checkRateLimit(
  identifier: string,
  limiter: Ratelimit | null
): Promise<RateLimitResult> {
  if (!limiter) {
    // If not configured, allow all requests
    return {
      success: true,
      limit: Infinity,
      remaining: Infinity,
      reset: Date.now(),
    };
  }

  try {
    const result = await limiter.limit(identifier);
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    console.error('[RateLimit] Error checking rate limit:', error);
    // Fail open - allow request if rate limiter fails
    return {
      success: true,
      limit: Infinity,
      remaining: Infinity,
      reset: Date.now(),
    };
  }
}