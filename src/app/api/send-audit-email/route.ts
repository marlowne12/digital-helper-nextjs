import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import type { AuditFullResult } from '@/types/audit.types';

// Lazy initialization to avoid build-time errors when API key is missing
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not configured');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export async function POST(req: NextRequest) {
  try {
    const { email, auditResults, websiteUrl } = await req.json();

    if (!email || !auditResults) {
      return NextResponse.json(
        { error: 'Email and audit results are required' },
        { status: 400 }
      );
    }

    // Generate email HTML
    const emailHtml = generateAuditEmailHtml(auditResults, websiteUrl);

    // Send email using Resend
    const resend = getResendClient();
    const data = await resend.emails.send({
      from: 'Digital Helper <business@digital-helper.com>',
      to: [email],
      subject: `Your Website Audit Results - Grade ${auditResults.grade} (${auditResults.score}/100)`,
      html: emailHtml,
      replyTo: 'business@digital-helper.com',
    });

    console.log('✅ Email sent successfully:', data);

    // Handle Resend v3+ response structure
    if (data.error) {
      throw new Error(data.error.message || 'Email sending failed');
    }

    return NextResponse.json({
      success: true,
      messageId: data.data?.id ?? 'sent',
      message: 'Audit report sent to your email',
    });

  } catch (error) {
    console.error('❌ Email sending failed:', error);

    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function generateAuditEmailHtml(results: AuditFullResult, websiteUrl: string): string {
  const gradeColor =
    results.grade === 'A' || results.grade === 'B' ? '#4ade80' :
    results.grade === 'C' ? '#facc15' : '#f87171';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Website Audit Results</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a; color: #e2e8f0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #ffffff; font-size: 28px; margin: 0 0 10px 0;">Digital Helper</h1>
      <p style="color: #94a3b8; margin: 0; font-size: 14px;">Tri-Cities Web Design & SEO Experts</p>
    </div>

    <!-- Main Content Card -->
    <div style="background: linear-gradient(to bottom, #1e293b, #0f172a); border-radius: 16px; padding: 32px; border: 1px solid #334155; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);">

      <!-- Grade Badge -->
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="display: inline-block; width: 120px; height: 120px; border-radius: 50%; border: 4px solid ${gradeColor}; background: rgba(${gradeColor === '#4ade80' ? '74, 222, 128' : gradeColor === '#facc15' ? '250, 204, 21' : '248, 113, 113'}, 0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto;">
          <span style="font-size: 64px; font-weight: bold; color: ${gradeColor};">${results.grade}</span>
        </div>
        <h2 style="color: #ffffff; margin: 20px 0 8px 0; font-size: 24px;">Website Audit Complete</h2>
        <p style="color: #94a3b8; margin: 0; font-size: 16px;">${websiteUrl}</p>
        <div style="margin-top: 16px;">
          <span style="font-size: 32px; font-weight: bold; color: #ffffff;">${results.score}/100</span>
          <span style="color: #64748b; font-size: 14px; margin-left: 8px;">Overall Score</span>
        </div>
      </div>

      <!-- Summary -->
      <div style="background: rgba(100, 116, 139, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #06b6d4;">
        <p style="color: #e2e8f0; margin: 0; line-height: 1.6; font-size: 14px;">${results.summary}</p>
      </div>

      <!-- Category Scores -->
      <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 16px 0;">Category Breakdown</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px;">
        ${Object.entries(results.categories).map(([key, category]) => {
          const categoryName = key.charAt(0).toUpperCase() + key.slice(1);
          const scoreColor = category.score >= 70 ? '#4ade80' : category.score >= 40 ? '#facc15' : '#f87171';

          return `
            <div style="background: rgba(30, 41, 59, 0.5); border-radius: 8px; padding: 16px; border: 1px solid #334155;">
              <div style="color: #94a3b8; font-size: 12px; text-transform: uppercase; margin-bottom: 8px;">${categoryName}</div>
              <div style="font-size: 24px; font-weight: bold; color: ${scoreColor};">${category.score}</div>
              <div style="color: #64748b; font-size: 11px;">${category.issues.length} issue${category.issues.length !== 1 ? 's' : ''} found</div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Quick Wins -->
      <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 16px 0;">🎯 Quick Wins</h3>
      <div style="background: rgba(251, 191, 36, 0.05); border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid rgba(251, 191, 36, 0.2);">
        ${results.quickWins.map(win => `
          <div style="display: flex; align-items: start; margin-bottom: 12px; color: #e2e8f0; font-size: 14px;">
            <span style="color: #06b6d4; margin-right: 8px; font-size: 16px;">✓</span>
            <span>${win}</span>
          </div>
        `).join('')}
      </div>

      <!-- Detailed Issues -->
      <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 16px 0;">🔍 Detailed Issues (${results.totalIssues} total)</h3>
      ${Object.entries(results.categories).map(([key, category]) => {
        if (category.issues.length === 0) return '';
        const categoryName = key.charAt(0).toUpperCase() + key.slice(1);

        return `
          <div style="margin-bottom: 20px;">
            <h4 style="color: #94a3b8; font-size: 14px; text-transform: uppercase; margin: 0 0 12px 0;">${categoryName}</h4>
            ${category.issues.map(issue => {
              const severityColor =
                issue.severity === 'critical' ? '#f87171' :
                issue.severity === 'warning' ? '#facc15' : '#4ade80';

              return `
                <div style="background: rgba(30, 41, 59, 0.3); border-radius: 8px; padding: 16px; margin-bottom: 8px; border-left: 3px solid ${severityColor};">
                  <div style="color: #ffffff; font-weight: 600; font-size: 14px; margin-bottom: 4px;">${issue.title}</div>
                  <div style="color: #94a3b8; font-size: 13px; margin-bottom: 4px;">${issue.description}</div>
                  <div style="color: #64748b; font-size: 12px; font-style: italic;">Impact: ${issue.impact}</div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }).join('')}

      <!-- CTA Button -->
      <div style="text-align: center; margin-top: 32px; padding-top: 32px; border-top: 1px solid #334155;">
        <h3 style="color: #ffffff; font-size: 20px; margin: 0 0 16px 0;">Ready to Fix These Issues?</h3>
        <p style="color: #94a3b8; margin: 0 0 24px 0; font-size: 14px;">Our team can implement all recommended improvements and boost your online presence in the Tri-Cities.</p>
        <a href="https://digital-helper.com/contact" style="display: inline-block; background: linear-gradient(to right, #06b6d4, #3b82f6); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);">Schedule Free Consultation</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #334155;">
      <p style="color: #64748b; font-size: 12px; margin: 0 0 8px 0;">
        Digital Helper - Tri-Cities Web Design & SEO<br>
        Serving Richland, Kennewick, and Pasco, WA
      </p>
      <p style="color: #475569; font-size: 11px; margin: 0;">
        <a href="https://digital-helper.com" style="color: #06b6d4; text-decoration: none;">digital-helper.com</a> |
        <a href="mailto:business@digital-helper.com" style="color: #06b6d4; text-decoration: none;">business@digital-helper.com</a>
      </p>
    </div>

  </div>
</body>
</html>
  `;
}
