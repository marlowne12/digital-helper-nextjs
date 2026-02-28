import { type NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP, rateLimits, type RateLimitResult } from './rate-limit';

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  rateLimit?: {
    limit: number;
    remaining: number;
    reset: number;
  };
}

export function createErrorResponse(
  message: string,
  status: number = 500,
  rateLimit?: RateLimitResult
): NextResponse {
  const response: APIResponse = {
    success: false,
    error: message,
  };

  if (rateLimit) {
    response.rateLimit = {
      limit: rateLimit.limit,
      remaining: rateLimit.remaining,
      reset: rateLimit.reset,
    };
  }

  const headers: Record<string, string> = {};
  if (rateLimit) {
    headers['X-RateLimit-Limit'] = String(rateLimit.limit);
    headers['X-RateLimit-Remaining'] = String(rateLimit.remaining);
    headers['X-RateLimit-Reset'] = String(rateLimit.reset);
    
    if (!rateLimit.success) {
      headers['Retry-After'] = String(Math.ceil((rateLimit.reset - Date.now()) / 1000));
    }
  }

  return NextResponse.json(response, { 
    status,
    headers,
  });
}

export function createSuccessResponse<T>(
  data: T,
  rateLimit?: RateLimitResult
): NextResponse {
  const response: APIResponse<T> = {
    success: true,
    data,
  };

  if (rateLimit) {
    response.rateLimit = {
      limit: rateLimit.limit,
      remaining: rateLimit.remaining,
      reset: rateLimit.reset,
    };
  }

  const headers: Record<string, string> = {};
  if (rateLimit) {
    headers['X-RateLimit-Limit'] = String(rateLimit.limit);
    headers['X-RateLimit-Remaining'] = String(rateLimit.remaining);
    headers['X-RateLimit-Reset'] = String(rateLimit.reset);
  }

  return NextResponse.json(response, { headers });
}

export async function withRateLimit(
  request: NextRequest,
  limiter: typeof rateLimits.chat,
  handler: () => Promise<Response>
): Promise<Response> {
  const identifier = getClientIP(request);
  
  if (!limiter) {
    // Rate limiting not configured, proceed without check
    return handler();
  }

  const result = await checkRateLimit(identifier, limiter);

  if (!result.success) {
    console.warn(`[RateLimit] Rate limit exceeded for ${identifier}`);
    return createErrorResponse(
      'Rate limit exceeded. Please try again later.',
      429,
      result
    );
  }

  try {
    const response = await handler();
    
    // Add rate limit headers to successful response
    response.headers.set('X-RateLimit-Limit', String(result.limit));
    response.headers.set('X-RateLimit-Remaining', String(result.remaining));
    response.headers.set('X-RateLimit-Reset', String(result.reset));
    
    return response;
  } catch (error) {
    console.error('[API] Handler error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      500,
      result
    );
  }
}