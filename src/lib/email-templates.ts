
export interface ReportData {
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

export function generateReportEmailHTML(data: ReportData): string {
    const { businessName, score, issues, recommendations, profile } = data;

    // Helper to get color based on score
    const getScoreColor = (s: number) => {
        if (s >= 80) return '#22c55e'; // Green
        if (s >= 50) return '#eab308'; // Yellow
        return '#ef4444'; // Red
    };

    const scoreColor = getScoreColor(score || 0);
    const scoreVal = score || 0;

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reputation Audit for ${businessName}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
        .score-circle { width: 80px; height: 80px; background-color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 20px auto 0; font-size: 28px; font-weight: bold; color: ${scoreColor}; border: 4px solid ${scoreColor}; }
        .content { padding: 30px; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
        .issue-item { background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 12px; margin-bottom: 10px; color: #991b1b; border-radius: 4px; }
        .rec-item { background-color: #f3f4f6; padding: 15px; margin-bottom: 10px; border-radius: 6px; }
        .rec-high { border-left: 4px solid #ef4444; }
        .rec-medium { border-left: 4px solid #eab308; }
        .rec-low { border-left: 4px solid #22c55e; }
        .rec-badge { display: inline-block; padding: 2px 8px; font-size: 12px; font-weight: 600; border-radius: 12px; margin-bottom: 5px; text-transform: uppercase; }
        .badge-high { background-color: #fee2e2; color: #991b1b; }
        .badge-medium { background-color: #fef9c3; color: #854d0e; }
        .badge-low { background-color: #dcfce7; color: #166534; }
        .footer { background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; }
        .cta-button { display: inline-block; background-color: #4f46e5; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 20px; }
        .business-meta { text-align: center; color: #6b7280; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div className="container">
        <div className="header">
            <h1>Reputation Audit Report</h1>
            <div className="score-circle">${scoreVal}</div>
            <p style="margin-top: 10px; margin-bottom: 0px; opacity: 0.9;">Overall Reputation Score</p>
        </div>
        
        <div className="content">
            <div className="business-meta">
                <h2 style="margin: 0; color: #111827;">${businessName}</h2>
                ${profile?.rating ? `<p>Google Rating: ${profile.rating} ⭐ (${profile.reviewCount} reviews)</p>` : ''}
            </div>

            ${issues && issues.length > 0 ? `
            <div className="section">
                <div className="section-title">Critical Issues Found</div>
                ${issues.map(issue => `
                    <div className="issue-item">
                        <strong>⚠️ Issue Detected:</strong> ${issue}
                    </div>
                `).join('')}
            </div>
            ` : ''}

            ${recommendations && recommendations.length > 0 ? `
            <div className="section">
                <div className="section-title">Recommended Actions</div>
                ${recommendations.map(rec => `
                    <div className="rec-item rec-${rec.priority}">
                        <div className="rec-badge badge-${rec.priority}">${rec.priority} Priority</div>
                        <div style="color: #374151;">${rec.action}</div>
                    </div>
                `).join('')}
            </div>
            ` : ''}

            <div style="text-align: center;">
                <p>Ready to improve your score? We can help you implement these fixes.</p>
                <a href="https://digital-helper.com/contact?audit=${encodeURIComponent(businessName)}" className="cta-button">Claim Your Free Consultation</a>
            </div>
        </div>

        <div className="footer">
            <p>&copy; ${new Date().getFullYear()} Digital Helper. All rights reserved.</p>
            <p>123 Marketing Lane, Digital City, DC 10101</p>
        </div>
    </div>
</body>
</html>
    `;
}

export type TemplateType = 'default' | 'audit' | 'seo';

export function generateEmail(lead: { name: string }, template: TemplateType = 'default') {
    let subject = '';
    let body = '';

    // Attempt to be personal, handle business names like "ABC Plumbing" -> "Team at ABC Plumbing" or just "Hi"
    const name = lead.name || 'there';

    switch (template) {
        case 'audit':
            subject = `Quick question about ${name}'s online presence`;
            body = `Hi Team at ${name},\n\nI was browsing for local businesses and noticed a few things on your Google Business Profile that might be costing you customers.\n\nWe recently helped a similar business in your area increase their calls by 40% with a few simple tweaks.\n\nWould you be open to a quick 5-minute video audit showing exactly what I found? No obligation.\n\nBest,\nDigital Helper Team`;
            break;
        case 'seo':
            subject = `Your local ranking for ${name}`;
            body = `Hi Team at ${name},\n\nI noticed you're not showing up in the top 3 map results for some key local searches in your area.\n\nWe specialize in helping local businesses dominate the map pack.\n\nAre you taking on new customers right now?\n\nBest,\nDigital Helper Team`;
            break;
        default:
            subject = `Partnership opportunity with ${name}`;
            body = `Hi Team at ${name},\n\nI'm reaching out because I see a lot of potential for ${name} to grow online.\n\nWe help local businesses automate their lead generation and reputation management.\n\nWould you be open to a quick chat about how we could help you get more qualified leads?\n\nBest,\nDigital Helper Team`;
    }

    return { subject, body };
}
