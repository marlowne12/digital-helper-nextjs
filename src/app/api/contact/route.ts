import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validators';
import fs from 'fs/promises';
import path from 'path';

// Contact form submission handler
export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Validate with Zod
        const result = contactFormSchema.safeParse(body);
        
        if (!result.success) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Validation failed',
                    details: result.error.flatten().fieldErrors 
                },
                { status: 400 }
            );
        }

        const data = result.data;

        // Check honeypot (spam protection)
        if (data.honeypot && data.honeypot.length > 0) {
            // Silently reject spam submissions
            return NextResponse.json({ success: true });
        }

        // Create lead object
        const lead = {
            id: crypto.randomUUID(),
            ...data,
            createdAt: new Date().toISOString(),
            source: 'website-contact-form',
            status: 'new',
        };

        // Save to local JSON file (for now - can integrate with CRM/n8n later)
        const leadsDir = path.join(process.cwd(), 'data', 'leads');
        const leadsFile = path.join(leadsDir, 'contact-submissions.json');

        try {
            await fs.mkdir(leadsDir, { recursive: true });
        } catch {
            // Directory may already exist
        }

        let existingLeads: unknown[] = [];
        try {
            const content = await fs.readFile(leadsFile, 'utf-8');
            existingLeads = JSON.parse(content);
        } catch {
            // File doesn't exist yet
        }

        existingLeads.push(lead);
        await fs.writeFile(leadsFile, JSON.stringify(existingLeads, null, 2));

        // TODO: Future integrations
        // - Send email notification via n8n
        // - Add to CRM (HubSpot, Pipedrive, etc.)
        // - Send Slack/Discord notification
        // - Trigger automated follow-up sequence

        return NextResponse.json({ 
            success: true,
            message: 'Thank you for reaching out! We\'ll get back to you within 24 hours.',
            leadId: lead.id
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Health check
export async function GET() {
    return NextResponse.json({ 
        status: 'ok', 
        endpoint: 'contact-form' 
    });
}
