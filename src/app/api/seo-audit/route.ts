import { NextRequest, NextResponse } from 'next/server';

/**
 * AI-Powered SEO Audit API
 * Sprint 15: Free SEO audit tool - lead generation + product demonstration
 * 
 * POST /api/seo-audit
 * Body: { url: string, email?: string }
 * Returns: SEO audit results with scores and recommendations
 */

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const TEXT_MODEL = process.env.AI_TEXT_MODEL || 'google/gemini-2.0-flash-001';

interface AuditCategory {
    name: string;
    score: number;
    maxScore: number;
    issues: {
        severity: 'critical' | 'warning' | 'info';
        title: string;
        description: string;
        fix: string;
    }[];
}

interface SEOAuditResult {
    url: string;
    overallScore: number;
    grade: string;
    summary: string;
    categories: AuditCategory[];
    quickWins: string[];
    auditedAt: string;
}

// Fetch and extract basic page content
async function fetchPageContent(url: string): Promise<{
    html: string;
    title: string;
    metaDescription: string;
    h1s: string[];
    h2s: string[];
    images: { src: string; alt: string }[];
    links: { href: string; text: string; isExternal: boolean }[];
    hasHttps: boolean;
    loadTime: number;
}> {
    const startTime = Date.now();
    
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; DigitalHelperBot/1.0; +https://digital-helper.com/bot)',
            },
            signal: AbortSignal.timeout(15000),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const html = await response.text();
        const loadTime = Date.now() - startTime;

        // Basic HTML parsing (simplified - production would use cheerio/jsdom)
        const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim() : '';

        const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                             html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
        const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';

        const h1Matches = html.matchAll(/<h1[^>]*>([^<]*)<\/h1>/gi);
        const h1s = [...h1Matches].map(m => m[1].trim()).filter(Boolean);

        const h2Matches = html.matchAll(/<h2[^>]*>([^<]*)<\/h2>/gi);
        const h2s = [...h2Matches].map(m => m[1].trim()).filter(Boolean).slice(0, 10);

        const imgMatches = html.matchAll(/<img[^>]*src=["']([^"']*)["'][^>]*(?:alt=["']([^"']*)["'])?/gi);
        const images = [...imgMatches].slice(0, 20).map(m => ({
            src: m[1] || '',
            alt: m[2] || ''
        }));

        const linkMatches = html.matchAll(/<a[^>]*href=["']([^"']*)["'][^>]*>([^<]*)<\/a>/gi);
        const baseUrl = new URL(url);
        const links = [...linkMatches].slice(0, 50).map(m => {
            const href = m[1] || '';
            const isExternal = href.startsWith('http') && !href.includes(baseUrl.hostname);
            return {
                href,
                text: m[2]?.trim() || '',
                isExternal
            };
        });

        return {
            html: html.slice(0, 50000), // Limit for AI context
            title,
            metaDescription,
            h1s,
            h2s,
            images,
            links,
            hasHttps: url.startsWith('https'),
            loadTime
        };
    } catch (error) {
        throw new Error(`Could not fetch ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

// Analyze page content with AI
async function analyzeWithAI(pageData: Awaited<ReturnType<typeof fetchPageContent>>, url: string): Promise<SEOAuditResult> {
    const prompt = `You are an expert SEO auditor. Analyze this webpage and provide a detailed SEO audit.

URL: ${url}
Title tag: "${pageData.title}"
Meta description: "${pageData.metaDescription}"
H1 tags: ${pageData.h1s.length > 0 ? pageData.h1s.join(', ') : 'NONE FOUND'}
H2 tags: ${pageData.h2s.length > 0 ? pageData.h2s.join(', ') : 'NONE FOUND'}
Images found: ${pageData.images.length} (${pageData.images.filter(i => !i.alt).length} missing alt text)
Internal links: ${pageData.links.filter(l => !l.isExternal).length}
External links: ${pageData.links.filter(l => l.isExternal).length}
HTTPS: ${pageData.hasHttps ? 'Yes' : 'NO - CRITICAL ISSUE'}
Load time: ${pageData.loadTime}ms

First 5000 chars of HTML:
${pageData.html.slice(0, 5000)}

Return ONLY valid JSON with this structure:
{
    "overallScore": <number 0-100>,
    "grade": "<A+, A, B, C, D, or F>",
    "summary": "<2-3 sentence executive summary of the site's SEO health>",
    "categories": [
        {
            "name": "On-Page SEO",
            "score": <0-25>,
            "maxScore": 25,
            "issues": [
                {
                    "severity": "critical|warning|info",
                    "title": "<issue title>",
                    "description": "<what's wrong>",
                    "fix": "<how to fix it>"
                }
            ]
        },
        {
            "name": "Technical SEO",
            "score": <0-25>,
            "maxScore": 25,
            "issues": [...]
        },
        {
            "name": "Content Quality",
            "score": <0-25>,
            "maxScore": 25,
            "issues": [...]
        },
        {
            "name": "User Experience",
            "score": <0-25>,
            "maxScore": 25,
            "issues": [...]
        }
    ],
    "quickWins": ["<3-5 easy fixes that would have the biggest impact>"]
}

Be specific and actionable. For local businesses, consider local SEO factors like NAP consistency, Google Business Profile mentions, and location-specific content. Be thorough but fair - find real issues, not imaginary ones.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'https://digital-helper.com',
            'X-Title': 'Digital Helper SEO Audit'
        },
        body: JSON.stringify({
            model: TEXT_MODEL,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3, // Lower temp for more consistent analysis
            max_tokens: 2500,
            response_format: { type: 'json_object' }
        })
    });

    if (!response.ok) {
        const error = await response.text();
        console.error('OpenRouter API error:', error);
        throw new Error(`AI analysis failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
        throw new Error('No analysis returned from AI');
    }

    try {
        const parsed = JSON.parse(content);
        return {
            url,
            overallScore: parsed.overallScore || 50,
            grade: parsed.grade || 'C',
            summary: parsed.summary || 'Analysis complete.',
            categories: parsed.categories || [],
            quickWins: parsed.quickWins || [],
            auditedAt: new Date().toISOString()
        };
    } catch (parseError) {
        console.error('JSON parse error:', parseError, 'Content:', content);
        throw new Error('Failed to parse AI analysis');
    }
}

// Save lead to file (optional email capture)
async function saveLead(url: string, email?: string) {
    if (!email) return;
    
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const leadsDir = path.join(process.cwd(), 'data', 'leads', 'seo-audits');
    await fs.mkdir(leadsDir, { recursive: true });
    
    const lead = {
        email,
        url,
        timestamp: new Date().toISOString(),
        source: 'seo-audit-tool'
    };
    
    const filename = `${Date.now()}-${email.replace(/[^a-z0-9]/gi, '-')}.json`;
    await fs.writeFile(
        path.join(leadsDir, filename),
        JSON.stringify(lead, null, 2)
    );
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        let { url } = body;
        const { email } = body;

        if (!url || typeof url !== 'string') {
            return NextResponse.json(
                { success: false, error: 'URL is required' },
                { status: 400 }
            );
        }

        // Normalize URL
        if (!url.startsWith('http')) {
            url = 'https://' + url;
        }

        // Validate URL format
        try {
            new URL(url);
        } catch {
            return NextResponse.json(
                { success: false, error: 'Invalid URL format' },
                { status: 400 }
            );
        }

        if (!OPENROUTER_API_KEY) {
            console.error('OPENROUTER_API_KEY not configured');
            return NextResponse.json(
                { success: false, error: 'AI service not configured' },
                { status: 503 }
            );
        }

        // Save lead if email provided
        if (email) {
            await saveLead(url, email);
        }

        // Fetch page content
        const pageData = await fetchPageContent(url);

        // Analyze with AI
        const audit = await analyzeWithAI(pageData, url);

        return NextResponse.json({
            success: true,
            data: audit
        });

    } catch (error) {
        console.error('SEO audit error:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: error instanceof Error ? error.message : 'Audit failed'
            },
            { status: 500 }
        );
    }
}

// Health check
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        endpoint: 'seo-audit',
        model: TEXT_MODEL,
        apiConfigured: !!OPENROUTER_API_KEY,
        version: '1.0.0'
    });
}
