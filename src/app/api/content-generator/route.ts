/**
 * Content Generator API Routes
 *
 * GET /api/content-generator - List all content items
 * POST /api/content-generator - Generate new content variants
 */

import { NextRequest, NextResponse } from 'next/server';
import { listContentItems } from '@/lib/google-sheets';
import { generateContentVariants } from '@/app/actions/content/generate';
import type { ContentRequest } from '@/types/content';
import { withRateLimit } from '@/lib/api-middleware';
import { rateLimits } from '@/lib/rate-limit';

export async function GET() {
    try {
        const items = await listContentItems();
        return NextResponse.json({ items });
    } catch (error) {
        console.error('[API] Failed to list content items:', error);
        return NextResponse.json(
            { error: 'Failed to fetch content items' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    return withRateLimit(request, rateLimits.contentGeneration, async () => {
        try {
            const body = await request.json() as ContentRequest;

            // Validate required fields
            if (!body.type) {
                return NextResponse.json(
                    { error: 'Content type is required' },
                    { status: 400 }
                );
            }
            if (!body.topic) {
                return NextResponse.json(
                    { error: 'Topic is required' },
                    { status: 400 }
                );
            }
            if (!body.keywords || body.keywords.length === 0) {
                return NextResponse.json(
                    { error: 'At least one keyword is required' },
                    { status: 400 }
                );
            }

            // Generate content variants
            const contentItem = await generateContentVariants(body);

            return NextResponse.json({
                contentItem,
                id: contentItem.id,
            }, { status: 201 });
        } catch (error) {
            console.error('[API] Failed to generate content:', error);
            return NextResponse.json(
                {
                    error: error instanceof Error ? error.message : 'Failed to generate content'
                },
                { status: 500 }
            );
        }
    });
}
