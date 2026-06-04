import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { validateUrl, normalizeUrl } from '@/lib/validation';
import { checkRateLimit } from '@/lib/ratelimit';
import { storeLead } from '@/app/actions/leads';

export interface AuditCheckResult {
  pass: boolean;
  label: string;
  detail?: string;
}

export interface SpeedCheck {
  score: number;
  label: string;
  loadTimeMs: number;
}

export interface SeoCheck {
  pass: boolean;
  label: string;
  details: { title: boolean; description: boolean; h1: boolean };
}

export interface AuditResult {
  url: string;
  score: number;
  checks: {
    mobile: AuditCheckResult;
    speed: SpeedCheck;
    seo: SeoCheck;
    ssl: AuditCheckResult;
    contactInfo: AuditCheckResult;
    aiReady: AuditCheckResult;
  };
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const rateLimit = await checkRateLimit(`audit:${ip}`);
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a moment.' },
      { status: 429 }
    );
  }

  let body: { url?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { url, email } = body;

  const urlValidation = validateUrl(url ?? '');
  if (!urlValidation.valid) {
    return NextResponse.json(
      { error: urlValidation.error ?? 'Invalid URL' },
      { status: 400 }
    );
  }

  const targetUrl = normalizeUrl(url!);

  // Fetch the website with 10s timeout
  const startTime = Date.now();
  let html = '';
  let statusCode = 0;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; DigitalHelperBot/1.0; +http://digital-helper.com)',
      },
    });
    clearTimeout(timeoutId);
    statusCode = response.status;
    html = await response.text();
  } catch {
    return NextResponse.json(
      { error: 'Could not reach the website. Please check the URL and try again.' },
      { status: 422 }
    );
  }
  const loadTimeMs = Date.now() - startTime;

  const $ = cheerio.load(html);

  // --- Mobile-Friendly ---
  const hasViewport = !!$('meta[name="viewport"]').attr('content');

  // --- Page Speed (load time proxy) ---
  let speedScore: number;
  if (loadTimeMs < 1000) speedScore = 95;
  else if (loadTimeMs < 2000) speedScore = 85;
  else if (loadTimeMs < 3000) speedScore = 70;
  else if (loadTimeMs < 5000) speedScore = 50;
  else speedScore = 25;
  const speedLabel =
    loadTimeMs < 2000 ? 'Fast' : loadTimeMs < 4000 ? 'Moderate' : 'Slow';

  // --- SEO Basics ---
  const titleText = $('title').text().trim();
  const metaDesc = $('meta[name="description"]').attr('content') ?? '';
  const h1Count = $('h1').length;
  const hasTitle = titleText.length > 0 && titleText.length <= 70;
  const hasDescription = metaDesc.length > 0 && metaDesc.length <= 165;
  const hasH1 = h1Count === 1;
  const seoPass = hasTitle && hasDescription && hasH1;
  const seoScore = (hasTitle ? 34 : 0) + (hasDescription ? 33 : 0) + (hasH1 ? 33 : 0);

  // --- SSL Certificate ---
  const isHttps = targetUrl.startsWith('https://');

  // --- Contact Info Visible ---
  const pageText = $.text();
  const hasPhone = /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(pageText);
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(pageText);
  const hasContactInfo = hasPhone || hasEmail;

  // --- AI Chatbot Ready ---
  const chatSignals = [
    'intercom', 'drift', 'crisp', 'tawk', 'livechat', 'zendesk',
    'hubspot', 'tidio', 'freshchat', 'chat-widget', 'chatbot',
    'zopim', 'olark', '__lc', 'liveagent', 'smartsupp',
  ];
  const htmlLower = html.toLowerCase();
  const hasAIChat = chatSignals.some((s) => htmlLower.includes(s));

  // --- Overall score (weighted) ---
  const overallScore = Math.round(
    (hasViewport ? 100 : 0) * 0.20 +
    speedScore * 0.20 +
    seoScore * 0.25 +
    (isHttps ? 100 : 0) * 0.20 +
    (hasContactInfo ? 100 : 0) * 0.10 +
    (hasAIChat ? 100 : 0) * 0.05
  );

  // Store lead if email provided
  if (email) {
    try {
      await storeLead({
        email,
        source: 'website_audit',
        metadata: {
          auditedUrl: targetUrl,
          score: overallScore,
          statusCode,
        },
      });
    } catch (e) {
      console.error('[audit] Lead storage error (non-fatal):', e);
    }
  }

  const result: AuditResult = {
    url: targetUrl,
    score: overallScore,
    checks: {
      mobile: {
        pass: hasViewport,
        label: hasViewport ? 'Mobile-Friendly' : 'Not Mobile-Friendly',
        detail: hasViewport
          ? 'Viewport meta tag detected'
          : 'Missing viewport meta tag — hurts mobile rankings',
      },
      speed: {
        score: speedScore,
        label: speedLabel,
        loadTimeMs,
      },
      seo: {
        pass: seoPass,
        label: seoPass ? 'SEO Basics Pass' : 'SEO Issues Found',
        details: { title: hasTitle, description: hasDescription, h1: hasH1 },
      },
      ssl: {
        pass: isHttps,
        label: isHttps ? 'SSL Certificate Valid' : 'No SSL / Not Secure',
        detail: isHttps
          ? 'HTTPS is active'
          : 'Site is served over HTTP — browsers flag it as insecure',
      },
      contactInfo: {
        pass: hasContactInfo,
        label: hasContactInfo ? 'Contact Info Visible' : 'Contact Info Missing',
        detail: hasContactInfo
          ? `${hasPhone ? 'Phone' : ''}${hasPhone && hasEmail ? ' & ' : ''}${hasEmail ? 'Email' : ''} found`
          : 'No phone number or email address detected on the page',
      },
      aiReady: {
        pass: hasAIChat,
        label: hasAIChat ? 'AI Chatbot Detected' : 'No AI Chatbot',
        detail: hasAIChat
          ? 'Live chat or chatbot widget detected'
          : 'No chat widget found — missing 24/7 lead capture',
      },
    },
  };

  return NextResponse.json(result);
}
