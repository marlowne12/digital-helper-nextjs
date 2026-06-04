import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validators';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function POST(request: Request) {
    if (!NOTION_DATABASE_ID) {
        return NextResponse.json(
            { success: false, error: 'Notion database ID not configured' },
            { status: 500 }
        );
    }

    try {
        const body = await request.json();
        const result = contactFormSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: 'Validation failed', details: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const data = result.data;

        // Honeypot check
        if (data.honeypot && data.honeypot.length > 0) {
            return NextResponse.json({ success: true });
        }

        const serviceLabel = SERVICE_LABELS[data.service as keyof typeof SERVICE_LABELS] || data.service || 'General Inquiry';

        await notion.pages.create({
            parent: { database_id: NOTION_DATABASE_ID },
            properties: {
                'Name': { title: [{ text: { content: data.fullName } }] },
                'Email': { email: data.email },
                'Phone': { phone_number: data.phone || null },
                'Service Interested In': { select: { name: serviceLabel } },
                'Message': { rich_text: [{ text: { content: data.message || '' } }] },
                'Status': { select: { name: 'New Lead' } },
                'Source': { select: { name: 'Inbound' } },
            },
        });

        return NextResponse.json({ success: true, message: 'Lead submitted to Notion CRM' });
    } catch (error) {
        console.error('Notion API error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to submit lead to Notion CRM' },
            { status: 500 }
        );
    }
}

const SERVICE_LABELS = {
    'web-design': 'Web Design & Development',
    'seo': 'SEO & Local Search',
    'ai-automation': 'AI Automation',
    'lead-generation': 'Lead Generation',
    'reputation-management': 'Reputation Management',
    'custom': 'Custom Solution',
} as const;

// Health check
export async function GET() {
    return NextResponse.json({ status: 'ok', endpoint: 'notion-leads' });
}
