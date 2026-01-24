import { NextRequest, NextResponse } from 'next/server';
import { getPricingTiers } from '@/services/pricingService';
import { pricingRequestSchema } from '@/lib/validators';

export async function GET() {
    const pricingData = getPricingTiers();
    return NextResponse.json(pricingData);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate input
        const result = pricingRequestSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid request', details: result.error.format() },
                { status: 400 }
            );
        }

        const { theme } = result.data;
        const pricingData = getPricingTiers(theme);

        return NextResponse.json(pricingData);
    } catch {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
