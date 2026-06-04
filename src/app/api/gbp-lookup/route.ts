import { z } from 'zod';
import { checkRateLimit } from '@/lib/ratelimit';

const RequestSchema = z.object({
    query: z.string().min(1).max(200),
});

export async function POST(req: Request) {
    try {
        const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
        const { success } = await checkRateLimit(ip);
        if (!success) {
            return new Response('Too many requests', { status: 429 });
        }
    } catch {
        // fail open
    }

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return new Response('Invalid JSON', { status: 400 });
    }

    const parsed = RequestSchema.safeParse(body);
    if (!parsed.success) {
        return Response.json({ error: 'Invalid request' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
        return Response.json({ error: 'Places API not configured' }, { status: 500 });
    }

    try {
        const searchRes = await fetch('https://places.googleapis.com/v1/places:searchText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'places.name,places.nationalPhoneNumber,places.types,places.editorialSummary',
            },
            body: JSON.stringify({ textQuery: parsed.data.query, maxResultCount: 1 }),
        });

        const data = await searchRes.json();
        const place = data.places?.[0];

        if (!place) {
            return Response.json({ error: 'No business found' }, { status: 404 });
        }

        return Response.json({
            phone: place.nationalPhoneNumber ?? null,
            description: place.editorialSummary?.text ?? null,
            categories: place.types
                ? (place.types as string[]).slice(0, 6).map((t) => t.replace(/_/g, ' '))
                : [],
        });
    } catch (err) {
        console.error('[gbp-lookup]', err);
        return Response.json({ error: 'Lookup failed' }, { status: 500 });
    }
}
