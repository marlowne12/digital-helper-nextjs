'use server';

import { generateReportEmailHTML } from '@/lib/email-templates';

interface ReportData {
    businessName: string;
    location?: string;
    score?: number;
    profile?: {
        name?: string;
        rating?: number;
        reviewCount?: number;
    };
    issues?: string[];
    recommendations?: Array<{
        priority: 'high' | 'medium' | 'low';
        action: string;
    }>;
}

interface SendReportResult {
    success: boolean;
    message: string;
}

/**
 * Send reputation report via email using Resend
 */
export async function sendReportEmail(
    email: string,
    reportData: ReportData
): Promise<SendReportResult> {
    try {
        // Validate email
        if (!email || !email.includes('@')) {
            return {
                success: false,
                message: 'Invalid email address',
            };
        }

        // Check for Resend API key
        if (!process.env.RESEND_API_KEY) {
            console.log('[Email] No RESEND_API_KEY configured, simulating send');
            return {
                success: true,
                message: 'Report email scheduled (demo mode)',
            };
        }

        const emailHTML = generateReportEmailHTML(reportData);

        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Digital Helper <reports@digital-helper.com>',
                to: email,
                subject: `Your Reputation Audit Report: ${reportData.businessName}`,
                html: emailHTML,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[Email Send Error]', errorText);
            return {
                success: false,
                message: 'Failed to send email. Please try again.',
            };
        }

        return {
            success: true,
            message: 'Report sent successfully! Check your inbox.',
        };
    } catch (error) {
        console.error('[Send Report Error]', error);
        return {
            success: false,
            message: 'An error occurred while sending the report.',
        };
    }
}

/**
 * Schedule a follow-up email for leads
 */
export async function scheduleFollowUp(
    email: string,
    businessName: string
): Promise<SendReportResult> {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.log('[Email] Follow-up scheduled (demo mode)');
            return {
                success: true,
                message: 'Follow-up scheduled',
            };
        }

        // In production, you would use a job queue or Resend's scheduling feature
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Digital Helper <hello@digital-helper.com>',
                to: email,
                subject: `Quick question about ${businessName}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2>Hi there!</h2>
                        <p>I noticed you recently ran a reputation audit for <strong>${businessName}</strong>.</p>
                        <p>Did you have any questions about the results? I'd love to help you create a plan to improve your online presence.</p>
                        <p>Just reply to this email or <a href="https://digital-helper.com/contact">book a quick call</a> - I'm here to help!</p>
                        <p>Best,<br/>The Digital Helper Team</p>
                    </div>
                `,
            }),
        });

        return {
            success: response.ok,
            message: response.ok ? 'Follow-up scheduled' : 'Failed to schedule follow-up',
        };
    } catch (error) {
        console.error('[Schedule Follow-up Error]', error);
        return {
            success: false,
            message: 'Failed to schedule follow-up',
        };
    }
}
