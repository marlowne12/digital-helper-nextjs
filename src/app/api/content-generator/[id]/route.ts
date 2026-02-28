/**
 * Content Item API Routes
 *
 * GET /api/content-generator/[id] - Get a single content item with variants
 */

import { NextRequest, NextResponse } from 'next/server';
import { getContentItem } from '@/lib/google-sheets';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const contentItem = await getContentItem(id);

        if (!contentItem) {
            return NextResponse.json(
                { error: 'Content item not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(contentItem);
    } catch (error) {
        console.error('[API] Failed to fetch content item:', error);
        return NextResponse.json(
            { error: 'Failed to fetch content item' },
            { status: 500 }
        );
    }
}
