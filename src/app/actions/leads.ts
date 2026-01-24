'use server';

import { trackLeadCapture } from '@/lib/analytics';

export interface LeadData {
    email: string;
    businessName?: string;
    location?: string;
    auditResult?: unknown;
    source: 'website_audit' | 'chat' | 'contact' | 'exit_intent' | 'newsletter';
    metadata?: Record<string, unknown>;
}

interface LeadResponse {
    success: boolean;
    message: string;
    leadId?: string;
}

/**
 * Store a lead in the system
 *
 * Current implementation:
 * - Logs to console (for development)
 * - Sends notification email (when RESEND_API_KEY is configured)
 * - Can be extended to store in database/CRM
 *
 * To integrate with a database:
 * - Prisma: await prisma.lead.create({ data: leadData })
 * - Vercel KV: await kv.set(`lead:${leadId}`, JSON.stringify(leadData))
 * - Supabase: await supabase.from('leads').insert(leadData)
 */
export async function storeLead(data: LeadData): Promise<LeadResponse> {
    try {
        const leadId = generateLeadId();
        const timestamp = new Date().toISOString();

        const lead = {
            id: leadId,
            ...data,
            createdAt: timestamp,
        };

        // Log lead for development/debugging
        console.log('[Lead Captured]', JSON.stringify(lead, null, 2));

        // Track analytics event
        if (typeof window !== 'undefined') {
            trackLeadCapture(data.source, data.email);
        }

        // Send notification email if Resend is configured
        if (process.env.RESEND_API_KEY) {
            await sendLeadNotification(lead);
        }

        // TODO: Store in database
        // Option 1: Vercel KV (simple key-value)
        // if (process.env.KV_REST_API_URL) {
        //     const { kv } = await import('@vercel/kv');
        //     await kv.set(`lead:${leadId}`, JSON.stringify(lead));
        //     await kv.lpush('leads:all', leadId);
        // }

        // Option 2: Prisma/Database
        // await prisma.lead.create({ data: lead });

        // Option 3: External CRM (HubSpot, Salesforce, etc.)
        // await pushToCRM(lead);

        return {
            success: true,
            message: 'Lead captured successfully',
            leadId,
        };
    } catch (error) {
        console.error('[Lead Storage Error]', error);
        return {
            success: false,
            message: 'Failed to store lead',
        };
    }
}

/**
 * Store audit lead with full audit data
 */
export async function storeAuditLead(data: {
    email: string;
    businessName: string;
    location: string;
    auditResult: unknown;
}): Promise<LeadResponse> {
    return storeLead({
        ...data,
        source: 'website_audit',
        metadata: {
            hasAuditResult: !!data.auditResult,
        },
    });
}

/**
 * Store chat lead
 */
export async function storeChatLead(data: {
    email: string;
    conversationSummary?: string;
    messageCount?: number;
}): Promise<LeadResponse> {
    return storeLead({
        email: data.email,
        source: 'chat',
        metadata: {
            messageCount: data.messageCount,
            conversationSummary: data.conversationSummary,
        },
    });
}

/**
 * Store exit intent lead
 */
export async function storeExitIntentLead(data: {
    email: string;
    pageUrl?: string;
}): Promise<LeadResponse> {
    return storeLead({
        email: data.email,
        source: 'exit_intent',
        metadata: {
            capturedOnPage: data.pageUrl,
        },
    });
}

/**
 * Store contact form lead
 */
export async function storeContactLead(data: {
    email: string;
    name?: string;
    phone?: string;
    message?: string;
    businessName?: string;
}): Promise<LeadResponse> {
    return storeLead({
        email: data.email,
        businessName: data.businessName,
        source: 'contact',
        metadata: {
            name: data.name,
            phone: data.phone,
            message: data.message,
        },
    });
}

// Helper functions

function generateLeadId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `lead_${timestamp}_${random}`;
}

async function sendLeadNotification(lead: Record<string, unknown>): Promise<void> {
    try {
        // Using Resend for email notifications
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Digital Helper <leads@digital-helper.com>',
                to: process.env.LEAD_NOTIFICATION_EMAIL || 'leads@digital-helper.com',
                subject: `New Lead: ${lead.source} - ${lead.email}`,
                html: `
                    <h2>New Lead Captured</h2>
                    <p><strong>Source:</strong> ${lead.source}</p>
                    <p><strong>Email:</strong> ${lead.email}</p>
                    ${lead.businessName ? `<p><strong>Business:</strong> ${lead.businessName}</p>` : ''}
                    ${lead.location ? `<p><strong>Location:</strong> ${lead.location}</p>` : ''}
                    <p><strong>Captured at:</strong> ${lead.createdAt}</p>
                    <hr />
                    <pre>${JSON.stringify(lead.metadata || {}, null, 2)}</pre>
                `,
            }),
        });

        if (!response.ok) {
            console.error('[Email Notification Failed]', await response.text());
        }
    } catch (error) {
        console.error('[Email Notification Error]', error);
    }
}
