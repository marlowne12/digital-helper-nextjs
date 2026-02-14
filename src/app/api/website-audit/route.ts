import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { validateUrl, validateEmail, normalizeUrl } from '@/lib/validation';
import type { AuditRequest, AuditResponse, QuickPreview, AuditFullResult } from '@/types/audit.types';

const QUICK_PREVIEW_INSTRUCTION = `
You are an expert website auditor for "Digital Helper".
Analyze the raw website metadata and metrics provided and return a quick preview assessment.

Output Format: JSON only.
Structure:
{
  "grade": "A" | "B" | "C" | "D" | "F",
  "score": <number 0-100>,
  "topIssue": "<single most impactful issue found>",
  "issueCount": <total number of issues detected>
}

Grading scale:
- A: 90-100 (excellent)
- B: 70-89 (good, minor issues)
- C: 50-69 (needs work)
- D: 30-49 (significant problems)
- F: 0-29 (critical issues)

Be accurate and concise. The topIssue should be actionable.
`;

const FULL_AUDIT_INSTRUCTION = `
You are an expert website auditor for "Digital Helper".
Analyze the raw website metadata and metrics provided and return a comprehensive audit.

Output Format: JSON only.
Structure:
{
  "grade": "A" | "B" | "C" | "D" | "F",
  "score": <number 0-100>,
  "summary": "<2-3 sentence summary of overall website health>",
  "categories": {
    "performance": {
      "score": <number 0-100>,
      "status": "good" | "needs-work" | "critical",
      "issues": [
        {
          "title": "<issue title>",
          "description": "<what the issue is>",
          "severity": "critical" | "warning" | "good",
          "impact": "<how this affects the site>"
        }
      ]
    },
    "seo": {
      "score": <number 0-100>,
      "status": "good" | "needs-work" | "critical",
      "issues": [...]
    },
    "mobile": {
      "score": <number 0-100>,
      "status": "good" | "needs-work" | "critical",
      "issues": [...]
    },
    "security": {
      "score": <number 0-100>,
      "status": "good" | "needs-work" | "critical",
      "issues": [...]
    }
  },
  "quickWins": [
    "<actionable recommendation 1>",
    "<actionable recommendation 2>",
    "<actionable recommendation 3>"
  ],
  "totalIssues": <number>
}

Grading scale:
- A: 90-100 (excellent)
- B: 70-89 (good, minor issues)
- C: 50-69 (needs work)
- D: 30-49 (significant problems)
- F: 0-29 (critical issues)

Category status mapping:
- good: score >= 70
- needs-work: score 40-69
- critical: score < 40

Provide at least 2-3 issues per category. Be specific and actionable.
`;

export async function POST(req: NextRequest) {
  try {
    const body: AuditRequest = await req.json();
    const { url, email } = body;

    // Validate URL
    const urlValidation = validateUrl(url);
    if (!urlValidation.valid) {
      return NextResponse.json(
        { error: urlValidation.error || 'Invalid URL' },
        { status: 400 }
      );
    }

    // Validate email if provided
    if (email) {
      const emailValidation = validateEmail(email);
      if (!emailValidation.valid) {
        return NextResponse.json(
          { error: emailValidation.error || 'Invalid email' },
          { status: 400 }
        );
      }
    }

    const targetUrl = normalizeUrl(url);

    // Fetch the website
    const startTime = Date.now();
    let response;
    try {
      response = await axios.get(targetUrl, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; DigitalHelperBot/1.0; +http://digital-helper.com)',
        },
        validateStatus: (status) => status < 500,
      });
    } catch (fetchError: unknown) {
      const message = fetchError instanceof Error ? fetchError.message : 'Unknown error';
      return NextResponse.json(
        { error: 'Could not reach the website. Please check the URL and try again.', details: message },
        { status: 422 }
      );
    }
    const loadTimeMs = Date.now() - startTime;

    const $ = cheerio.load(response.data);

    // Gather website metrics
    const analysisContext = {
      url: targetUrl,
      statusCode: response.status,
      loadTimeMs,
      metrics: {
        title: { content: $('title').text().trim(), length: $('title').text().trim().length },
        description: {
          content: $('meta[name="description"]').attr('content') || '',
          length: ($('meta[name="description"]').attr('content') || '').length,
        },
        headers: {
          h1Count: $('h1').length,
          h2Count: $('h2').length,
          h3Count: $('h3').length,
        },
        mobile: {
          hasViewport: !!$('meta[name="viewport"]').attr('content'),
        },
        images: {
          total: $('img').length,
          withAlt: $('img[alt]').length,
          withoutAlt: $('img').length - $('img[alt]').length,
        },
        links: {
          total: $('a').length,
          internal: $(`a[href^="/"], a[href^="${targetUrl}"]`).length,
          external: $('a[href^="http"]').length - $(`a[href^="${targetUrl}"]`).length,
        },
        security: {
          isHttps: targetUrl.startsWith('https://'),
        },
        canonical: $('link[rel="canonical"]').attr('href') || null,
        robots: $('meta[name="robots"]').attr('content') || null,
        openGraph: {
          title: $('meta[property="og:title"]').attr('content') || null,
          description: $('meta[property="og:description"]').attr('content') || null,
          image: $('meta[property="og:image"]').attr('content') || null,
        },
        structuredData: $('script[type="application/ld+json"]').length > 0,
      },
    };

    // Gemini AI analysis
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Configuration Error' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const wantsFullResults = !!email;

    // Choose which instruction set based on whether email was provided
    const systemInstruction = wantsFullResults ? FULL_AUDIT_INSTRUCTION : QUICK_PREVIEW_INSTRUCTION;
    const prompt = `Analyze this website data:\n${JSON.stringify(analysisContext, null, 2)}`;

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const aiResponse = JSON.parse(result.text || '{}');

    // Build the response
    const auditResponse: AuditResponse = {
      url: targetUrl,
      quickPreview: wantsFullResults
        ? {
            grade: aiResponse.grade,
            score: aiResponse.score,
            topIssue: aiResponse.quickWins?.[0] || 'No major issues found',
            issueCount: aiResponse.totalIssues ?? 0,
          }
        : (aiResponse as QuickPreview),
    };

    if (wantsFullResults) {
      auditResponse.fullResults = aiResponse as AuditFullResult;
      auditResponse.fullResults.url = targetUrl;
    }

    return NextResponse.json(auditResponse);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Website Audit Error:', message);
    return NextResponse.json(
      { error: 'Failed to audit website.', details: message },
      { status: 500 }
    );
  }
}
