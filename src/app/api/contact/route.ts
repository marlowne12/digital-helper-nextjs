// SETUP: Enable Vercel KV storage
// 1. Go to Vercel Dashboard > Storage > Create KV Database
// 2. Link it to this project
// 3. Vercel auto-injects KV_REST_API_URL and KV_REST_API_TOKEN env vars
// 4. Run: npm install @vercel/kv

import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validators';
import { Resend } from 'resend';
import fs from 'fs/promises';
import path from 'path';

// Lazy-init Resend so the route doesn't crash when RESEND_API_KEY is absent
const getResend = () =>
    process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const NOTIFICATION_EMAIL =
    process.env.LEAD_NOTIFICATION_EMAIL || 'business@digital-helper.com';

// Use your verified Resend domain in production.
// While testing without a verified domain, Resend allows sending FROM
// onboarding@resend.dev but only TO the account's registered email.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

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
                    details: result.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const data = result.data;

        // Honeypot check (silently reject bots)
        if (data.honeypot && data.honeypot.length > 0) {
            return NextResponse.json({ success: true });
        }

        // Build the lead record
        const lead = {
            id: crypto.randomUUID(),
            ...data,
            createdAt: new Date().toISOString(),
            source: 'website-contact-form',
            status: 'new',
        };

        // ── 1. Persist to local JSON (dev only — Vercel FS is ephemeral) ────────
        // NOTE: This will silently fail in production serverless environments.
        // See P3-002: migrate to Vercel KV / Supabase / n8n webhook.
        try {
            const leadsDir = path.join(process.cwd(), 'data', 'leads');
            const leadsFile = path.join(leadsDir, 'contact-submissions.json');
            await fs.mkdir(leadsDir, { recursive: true });

            let existingLeads: unknown[] = [];
            try {
                const content = await fs.readFile(leadsFile, 'utf-8');
                existingLeads = JSON.parse(content);
            } catch {
                // File doesn't exist yet — start fresh
            }

            existingLeads.push(lead);
            await fs.writeFile(leadsFile, JSON.stringify(existingLeads, null, 2));
        } catch {
            // Expected to fail on Vercel — email notification is the primary record
            console.log('[contact] FS save skipped (serverless environment)');
        }

        // ── 2. Email notification via Resend ────────────────────────────────────
        const resend = getResend();
        if (resend) {
            try {
                await resend.emails.send({
                    from: `Digital Helper <${FROM_EMAIL}>`,
                    to: [NOTIFICATION_EMAIL],
                    replyTo: data.email,
                    subject: `🆕 New Lead: ${data.fullName} — ${SERVICE_LABELS[data.service as keyof typeof SERVICE_LABELS] ?? data.service ?? 'General Inquiry'}`,
                    html: buildLeadEmail(lead),
                });
                console.log(`[contact] Email notification sent for lead ${lead.id}`);
            } catch (emailError) {
                // Don't fail the user's submission if notification fails
                console.error('[contact] Email notification failed:', emailError);
            }
        } else {
            console.log('[contact] RESEND_API_KEY not set — skipping email notification');
        }

        // ── 3. Persist to Vercel KV (durable, survives deployments) ────────────
        // Requires KV_REST_API_URL + KV_REST_API_TOKEN env vars (set by Vercel
        // automatically when a KV store is linked to this project).
        if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
            try {
                const { kv } = await import('@vercel/kv');
                const leadId = `lead:${Date.now()}:${Math.random().toString(36).slice(2)}`;
                await kv.set(leadId, { ...lead, timestamp: new Date().toISOString() });
                // Sorted set keeps leads ordered by submission time for easy listing
                await kv.zadd('leads:all', { score: Date.now(), member: leadId });
                console.log(`[contact] Lead stored in KV as ${leadId}`);
            } catch (kvError) {
                // KV failure must NOT break form submission — email is the primary record
                console.error('[contact] KV storage failed (non-fatal):', kvError);
            }
        }

        return NextResponse.json({
            success: true,
            message: "Thank you for reaching out! We'll get back to you within 24 hours.",
            leadId: lead.id,
        });
    } catch (error) {
        console.error('[contact] Handler error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Health check
export async function GET() {
    return NextResponse.json({ status: 'ok', endpoint: 'contact-form' });
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const SERVICE_LABELS = {
    'web-design': '🎨 Web Design & Development',
    'seo': '📈 SEO & Local Search',
    'ai-automation': '🤖 AI Automation',
    'lead-generation': '🎯 Lead Generation',
    'reputation-management': '⭐ Reputation Management',
    'custom': '🔧 Custom Solution',
} as const;

const BUDGET_LABELS: Record<string, string> = {
    'under-1k': 'Under $1,000',
    '1k-3k': '$1,000 – $3,000',
    '3k-5k': '$3,000 – $5,000',
    '5k-10k': '$5,000 – $10,000',
    'over-10k': '$10,000+',
    'not-sure': 'Not sure yet',
};

const TIMELINE_LABELS: Record<string, string> = {
    'asap': 'ASAP – Urgent',
    '1-2-weeks': '1–2 Weeks',
    '1-month': 'Within 1 Month',
    '2-3-months': '2–3 Months',
    'flexible': 'Flexible',
};

function row(label: string, value: string | undefined | null, href?: string) {
    if (!value) return '';
    const cell = href
        ? `<a href="${href}" style="color:#4f46e5;text-decoration:none;">${value}</a>`
        : value;
    return `
        <tr>
            <td style="padding:8px 0;color:#6b7280;font-size:14px;width:120px;vertical-align:top;">${label}</td>
            <td style="padding:8px 0;color:#111827;font-size:14px;">${cell}</td>
        </tr>`;
}

function buildLeadEmail(lead: Record<string, unknown>): string {
    const service =
        SERVICE_LABELS[lead.service as keyof typeof SERVICE_LABELS] ??
        (lead.service as string) ??
        'Not specified';

    const budget = lead.budget ? (BUDGET_LABELS[lead.budget as string] ?? (lead.budget as string)) : null;
    const timeline = lead.timeline ? (TIMELINE_LABELS[lead.timeline as string] ?? (lead.timeline as string)) : null;
    const firstName = (lead.fullName as string).split(' ')[0];
    const safeMessage = (lead.message as string)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const submittedAt = new Date(lead.createdAt as string).toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        dateStyle: 'full',
        timeStyle: 'short',
    });

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>New Lead — Digital Helper</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);padding:28px 32px;">
            <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">🆕 New Lead — Digital Helper</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">${submittedAt} PST</p>
        </div>

        <!-- Contact Info -->
        <div style="padding:28px 32px 0;">
            <h2 style="margin:0 0 12px;font-size:15px;color:#111827;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Contact</h2>
            <table style="width:100%;border-collapse:collapse;">
                ${row('Name', lead.fullName as string)}
                ${row('Email', lead.email as string, `mailto:${lead.email}`)}
                ${row('Phone', lead.phone as string, `tel:${lead.phone}`)}
                ${row('Company', lead.company as string)}
                ${row('Website', lead.website as string, lead.website as string)}
            </table>
        </div>

        <hr style="border:none;border-top:1px solid #f3f4f6;margin:24px 32px 0;">

        <!-- Project Info -->
        <div style="padding:24px 32px 0;">
            <h2 style="margin:0 0 12px;font-size:15px;color:#111827;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Project</h2>
            <table style="width:100%;border-collapse:collapse;">
                ${row('Service', service)}
                ${row('Budget', budget)}
                ${row('Timeline', timeline)}
            </table>

            <!-- Message block -->
            <div style="margin-top:20px;padding:16px;background:#f9fafb;border-radius:8px;border-left:3px solid #4f46e5;">
                <p style="margin:0 0 8px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
                <p style="margin:0;color:#111827;font-size:14px;line-height:1.7;white-space:pre-wrap;">${safeMessage}</p>
            </div>
        </div>

        <!-- Reply CTA -->
        <div style="padding:24px 32px;text-align:center;">
            <a href="mailto:${lead.email}"
               style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;">
                Reply to ${firstName}
            </a>
        </div>

        <!-- Footer -->
        <div style="background:#f9fafb;padding:14px 32px;border-top:1px solid #f3f4f6;">
            <p style="margin:0;color:#9ca3af;font-size:11px;text-align:center;">
                Lead ID: ${lead.id as string} &nbsp;·&nbsp; Digital Helper &nbsp;·&nbsp;
                <a href="https://digital-helper.com" style="color:#9ca3af;">digital-helper.com</a>
            </p>
        </div>

    </div>
</body>
</html>`;
}
