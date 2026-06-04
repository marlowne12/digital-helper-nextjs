import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

// Lazy initialization of Resend to avoid build-time errors
let resend: Resend | null = null
const getResend = () => {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

interface LeadMagnetRequest {
  email: string
  name?: string
  businessName?: string
  variant: 'guide' | 'checklist' | 'audit'
  source?: string
}

// Dynamic PDF URLs - served from /api/downloads/[slug]
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://digital-helper.com'

const LEAD_MAGNET_CONTENT = {
  guide: {
    subject: '🚀 Your 24/7 Lead Machine Guide is Here!',
    title: 'The 24/7 Lead Machine',
    downloadUrl: `${BASE_URL}/api/downloads/24-7-lead-machine-guide.pdf`,
    preview: 'How AI captures leads while you sleep',
  },
  checklist: {
    subject: '✅ Your AI Readiness Checklist is Here!',
    title: 'AI Readiness Checklist',
    downloadUrl: `${BASE_URL}/api/downloads/ai-readiness-checklist.pdf`,
    preview: 'Is your business ready for 24/7 AI?',
  },
  audit: {
    subject: '⏱️ Your Response Time Audit is Ready!',
    title: 'Response Time Audit',
    downloadUrl: `${BASE_URL}/api/downloads/response-time-audit.pdf`,
    preview: 'How fast are you losing leads?',
  },
}

function generateLeadMagnetEmail(data: {
  name?: string
  variant: 'guide' | 'checklist' | 'audit'
}): string {
  const { name, variant } = data
  const content = LEAD_MAGNET_CONTENT[variant]
  const firstName = name?.split(' ')[0] || 'there'

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.title}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #334155; margin: 0; padding: 0; background-color: #f1f5f9; }
    .wrapper { max-width: 600px; margin: 0 auto; padding: 20px; }
    .container { background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%); padding: 40px 30px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px; }
    .content { padding: 40px 30px; }
    .download-box { background: linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%); border: 2px solid #06b6d4; border-radius: 12px; padding: 30px; text-align: center; margin: 20px 0; }
    .download-btn { display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white !important; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px; margin: 15px 0; box-shadow: 0 4px 14px rgba(6, 182, 212, 0.4); }
    .download-btn:hover { background: linear-gradient(135deg, #0891b2 0%, #2563eb 100%); }
    .stat-row { display: flex; justify-content: space-around; margin: 30px 0; padding: 20px; background: #f8fafc; border-radius: 12px; }
    .stat { text-align: center; }
    .stat-number { font-size: 32px; font-weight: 700; color: #06b6d4; }
    .stat-label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
    .cta-section { background: #1e293b; border-radius: 12px; padding: 30px; margin-top: 30px; text-align: center; }
    .cta-section h3 { color: white; margin: 0 0 10px; }
    .cta-section p { color: #94a3b8; margin: 0 0 20px; }
    .cta-btn { display: inline-block; background: white; color: #1e293b !important; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    .footer { padding: 30px; text-align: center; color: #64748b; font-size: 14px; }
    .footer a { color: #06b6d4; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>📥 ${content.title}</h1>
        <p>${content.preview}</p>
      </div>
      
      <div class="content">
        <p>Hey ${firstName}! 👋</p>
        
        <p>Thanks for downloading <strong>${content.title}</strong>. Your free resource is ready!</p>
        
        <div class="download-box">
          <p style="margin: 0 0 15px; font-weight: 600; color: #0f172a;">Click below to download your guide:</p>
          <a href="${content.downloadUrl}" class="download-btn">
            ⬇️ Download Now
          </a>
          <p style="margin: 15px 0 0; font-size: 14px; color: #64748b;">
            Link not working? Copy this URL: ${content.downloadUrl}
          </p>
        </div>

        ${variant === 'guide' ? `
        <p>Here's what you'll discover inside:</p>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
              <strong>📊 The 78% Rule</strong><br>
              <span style="color: #64748b; font-size: 14px;">Why the first responder wins almost every time</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
              <strong>⚡ 30-Minute Setup</strong><br>
              <span style="color: #64748b; font-size: 14px;">Step-by-step AI chat implementation</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
              <strong>💰 $47K Case Study</strong><br>
              <span style="color: #64748b; font-size: 14px;">How one plumber added $47K in revenue</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0;">
              <strong>🌙 3am Scripts</strong><br>
              <span style="color: #64748b; font-size: 14px;">The exact messages that convert overnight leads</span>
            </td>
          </tr>
        </table>

        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 25px 0; border-radius: 0 8px 8px 0;">
          <strong style="color: #92400e;">💡 Pro Tip:</strong>
          <span style="color: #78350f;"> Start with Chapter 2 — it's the quickest win most businesses miss.</span>
        </div>
        ` : ''}
        
        <div class="cta-section">
          <h3>Ready to Set Up Your 24/7 Lead Machine?</h3>
          <p>We'll handle everything — you just approve the setup.</p>
          <a href="https://digital-helper.com/contact?utm_source=lead_magnet&utm_medium=email&utm_campaign=${variant}" class="cta-btn">
            Book Free Strategy Call
          </a>
        </div>
      </div>
      
      <div class="footer">
        <p>
          <strong>Digital Helper</strong><br>
          AI-Powered Marketing for Local Service Businesses
        </p>
        <p>
          <a href="https://digital-helper.com">Website</a> • 
          <a href="mailto:business@digital-helper.com">Email Us</a> • 
          (509) 876-8454
        </p>
        <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
          You're receiving this because you downloaded ${content.title}.<br>
          <a href="https://digital-helper.com/unsubscribe" style="color: #94a3b8;">Unsubscribe</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `
}

async function storeLeadMagnetLead(data: LeadMagnetRequest) {
  const leadsDir = path.join(process.cwd(), 'data', 'leads', 'lead-magnets')
  
  try {
    await mkdir(leadsDir, { recursive: true })
  } catch {
    // Directory might already exist
  }

  const timestamp = new Date().toISOString()
  const filename = `${timestamp.replace(/[:.]/g, '-')}_${data.email.replace(/[@.]/g, '_')}.json`
  const filepath = path.join(leadsDir, filename)

  const leadData = {
    ...data,
    timestamp,
    ip: 'redacted', // Would come from request headers in production
    userAgent: 'redacted', // Would come from request headers
  }

  await writeFile(filepath, JSON.stringify(leadData, null, 2))

  return { success: true, filepath }
}

export async function POST(request: Request) {
  try {
    const body: LeadMagnetRequest = await request.json()

    // Validate required fields
    if (!body.email || !body.email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!body.variant || !['guide', 'checklist', 'audit'].includes(body.variant)) {
      return NextResponse.json(
        { success: false, error: 'Invalid variant' },
        { status: 400 }
      )
    }

    // Store the lead
    await storeLeadMagnetLead(body)

    // Send the email with Resend
    const resendClient = getResend()
    const content = LEAD_MAGNET_CONTENT[body.variant]

    if (resendClient) {
      try {
        await resendClient.emails.send({
          from: 'Digital Helper <hello@digital-helper.com>',
          to: body.email,
          subject: content.subject,
          html: generateLeadMagnetEmail({
            name: body.name,
            variant: body.variant,
          }),
        })
      } catch (emailError) {
        console.error('Failed to send email:', emailError)
        // Don't fail the request if email fails - lead is already stored
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Lead magnet sent successfully',
      downloadUrl: content.downloadUrl,
    })
  } catch (error) {
    console.error('Lead magnet API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
