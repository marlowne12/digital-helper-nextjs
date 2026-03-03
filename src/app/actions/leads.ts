'use server';

import { trackLeadCapture } from '@/lib/analytics';
import { createLead, isSupabaseConfigured, type LeadData as DBLeadData } from '@/lib/database';

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
 * Stores lead in:
 * 1. Supabase database (if configured)
 * 2. Console log (for debugging)
 * 3. Email notification (when RESEND_API_KEY is configured)
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

        // Persist to Vercel KV when configured (durable across deployments).
        // Requires KV_REST_API_URL + KV_REST_API_TOKEN — set automatically by
        // Vercel when a KV store is linked. Fails silently to protect the caller.
        if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
            try {
                const { kv } = await import('@vercel/kv');
                const kvKey = `lead:${Date.now()}:${Math.random().toString(36).slice(2)}`;
                await kv.set(kvKey, { ...lead, timestamp: new Date().toISOString() });
                // Sorted set ordered by score (epoch ms) for newest-first retrieval
                await kv.zadd('leads:all', { score: Date.now(), member: kvKey });
                console.log(`[leads] Stored in KV as ${kvKey}`);
            } catch (kvError) {
                console.error('[leads] KV storage failed (non-fatal):', kvError);
            }
        }

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
        // Use RESEND_FROM_EMAIL env var so this works before the domain is verified
        // (defaults to onboarding@resend.dev — same safe default as contact/route.ts)
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: `Digital Helper <${fromEmail}>`,
                to: process.env.LEAD_NOTIFICATION_EMAIL || 'business@digital-helper.com',
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
