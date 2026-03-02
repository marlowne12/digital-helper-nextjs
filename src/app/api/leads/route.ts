// GET /api/leads — retrieve all stored leads from Vercel KV
//
// SETUP:
// 1. Link a Vercel KV store to this project (Dashboard > Storage > KV)
// 2. Vercel auto-injects KV_REST_API_URL and KV_REST_API_TOKEN
// 3. Leads are stored by the contact form (api/contact/route.ts) and
//    the storeLead() server action (app/actions/leads.ts)
//
// NOTE: This endpoint has no auth guard — suitable for early-stage internal use.
// Add middleware-level auth before exposing this to the public internet.

import { kv } from '@vercel/kv';

export async function GET() {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
        return Response.json(
            { error: 'KV not configured. Set KV_REST_API_URL and KV_REST_API_TOKEN env vars.' },
            { status: 503 }
        );
    }

    try {
        // zrange with rev:true returns keys newest-first (highest score = most recent)
        const keys = await kv.zrange('leads:all', 0, -1, { rev: true });

        if (keys.length === 0) {
            return Response.json({ leads: [], total: 0 });
        }

        const leads = await Promise.all(
            (keys as string[]).map((k) => kv.get(k))
        );

        return Response.json({ leads, total: leads.length });
    } catch (error) {
        console.error('[api/leads] Failed to retrieve leads:', error);
        return Response.json(
            { error: 'Failed to retrieve leads' },
            { status: 500 }
        );
    }
}
