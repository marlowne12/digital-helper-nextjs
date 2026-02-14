'use server';

import { generateObject, generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});
import { z } from 'zod';
import * as cheerio from 'cheerio';
import { AuditResult, GBPProfile, WebsiteAnalysis } from '@/types/reputation';

// Define the schema for structured output
const schema = z.object({
    score: z.number().min(0).max(100),
    summary: z.string(),
    swot: z.object({
        strengths: z.array(z.string()),
        weaknesses: z.array(z.string()),
        opportunities: z.array(z.string()),
        threats: z.array(z.string())
    }),
    recommendations: z.array(z.object({
        id: z.string(),
        type: z.enum(['reply_review', 'optimize_description', 'add_photos', 'keyword_gap', 'general']),
        title: z.string(),
        description: z.string(),
        impact: z.enum(['High', 'Medium', 'Low']),
        status: z.enum(['pending', 'completed']),
        context: z.any().optional()
    }))
});

export async function analyzeWebsite(url: string): Promise<WebsiteAnalysis | null> {
    try {
        const startTime = Date.now();
        // Add protocol if missing
        const targetUrl = url.startsWith('http') ? url : `https://${url}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            next: { revalidate: 3600 },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        const html = await response.text();
        const loadTime = `${Date.now() - startTime}ms`;
        const $ = cheerio.load(html);

        const title = $('title').text().trim();
        const metaDescription = $('meta[name="description"]').attr('content') || '';
        const h1 = $('h1').first().text().trim();
        const viewport = $('meta[name="viewport"]').attr('content');
        const isMobileFriendly = !!(viewport && viewport.includes('width=device-width'));
        const ssl = targetUrl.startsWith('https');

        // Extract Socials
        const socials: WebsiteAnalysis['socials'] = {};
        $('a[href]').each((_, el) => {
            const href = $(el).attr('href') || '';
            if (href.includes('facebook.com')) socials.facebook = href;
            if (href.includes('instagram.com')) socials.instagram = href;
            if (href.includes('linkedin.com')) socials.linkedin = href;
            if (href.includes('twitter.com') || href.includes('x.com')) socials.twitter = href;
        });

        // Extract Email (simple regex on body text)
        const emailMatch = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        const email = emailMatch ? emailMatch[0] : undefined;

        const issues: string[] = [];
        if (!title) issues.push("Missing Title Tag");
        if (title.length < 10) issues.push("Title Tag too short");
        if (!metaDescription) issues.push("Missing Meta Description");
        if (!h1) issues.push("Missing H1 Header");
        if (!isMobileFriendly) issues.push("Not Mobile Responsive");
        if (!ssl) issues.push("Website not secure (No SSL)");

        return {
            title: title || "Missing",
            metaDescription: metaDescription || "Missing",
            h1: h1 || "Missing",
            isMobileFriendly,
            loadTime,
            ssl,
            socials,
            email,
            issues
        };

    } catch (error) {
        console.error("Website Analysis Failed:", error);
        return null;
    }
}

export async function analyzeProfile(profile: GBPProfile): Promise<AuditResult> {
    try {
        // Run website analysis in parallel if URL exists
        let websiteAudit: WebsiteAnalysis | null = null;
        if (profile.website) {
            websiteAudit = await analyzeWebsite(profile.website);
        }

        const prompt = `
      Analyze this Google Business Profile AND their website (if data provided) for reputation health.
      
      GOOGLE BUSINESS PROFILE DATA:
      Business Name: ${profile.name}
      Rating: ${profile.rating} / 5
      Total Reviews: ${profile.totalReviews}
      Categories: ${profile.categories.join(', ')}
      Description: ${profile.description}
      Website Status: ${websiteAudit ? 'Scraped Successfully' : 'Not Scraped'}
      
      WEBSITE DATA (from scraper):
      Title: ${websiteAudit?.title || "N/A"}
      Meta Description: ${websiteAudit?.metaDescription || "N/A"}
      H1: ${websiteAudit?.h1 || "N/A"}
      Mobile Friendly: ${websiteAudit?.isMobileFriendly ? "Yes" : "No"}
      Website Issues: ${websiteAudit?.issues.join(', ') || "None"}

      Last 5 GMB Reviews:
      ${profile.reviews.map(r => `- "${r.text}" (${r.rating} stars) by ${r.author}`).join('\n')}
      
      Tasks:
      1. Calculate a Health Score (0-100) based on rating, review volume, and website SEO health (if available).
         - Deduct points for missing website basics (H1, meta description).
      2. Perform a SWOT analysis.
      3. Generate actionable recommendations. specifically look for:
         - Unanswered negative reviews (create a 'reply_review' recommendation).
         - Missing or weak description (create 'optimize_description').
         - Low photo count (create 'add_photos').
         - Keyword gaps in description vs categories.
         - **WEBSITE CRITICAL ISSUES** (New): If website metrics are bad, add a 'general' recommendation titled "Website SEO Fixes" detailing the missing H1 or meta description.
    `;

        const { object } = await generateObject({
            model: google('gemini-1.5-flash'), // Efficient & fast model
            schema: schema,
            prompt: prompt,
        });

        // Combine AI result with the hard data from scraper
        return {
            ...object,
            websiteAnalysis: websiteAudit || undefined
        } as AuditResult;

    } catch (error) {
        console.error("AI Analysis Failed:", error);
        // Fallback or error handling
        throw new Error("Failed to analyze profile with AI.");
    }
}

export async function generateResponse(reviewId: string, authorName: string, sentiment: 'negative' | 'positive' = 'negative'): Promise<string[]> {
    const prompt = `
        Write 3 distinct, professional, and empathetic responses to a ${sentiment} Google Review from "${authorName}".
        
        Guidelines:
        - Keep it brief (under 50 words).
        - Address them by name.
        - If negative: Apologize, acknowledge issue, ask to take offline.
        - If positive: Thank them, mention a specific detail if possible.
        
        Return ONLY a JSON array of strings: ["Response 1", "Response 2", "Response 3"]
    `;

    const { object } = await generateObject({
        model: google('gemini-1.5-flash'),
        schema: z.object({ responses: z.array(z.string()) }),
        prompt: prompt,
    });

    return object.responses;
}

export async function optimizeDescription(currentDescription: string): Promise<string> {
    const { text } = await generateText({
        model: google('gemini-1.5-flash'),
        prompt: `
            Rewrite and optimize this Google Business Description for SEO. 
            Include relevant keywords for the industry, make it engaging, and keep it under 750 characters.
            
            Current Description: "${currentDescription}"
        `
    });

    return text;
}
