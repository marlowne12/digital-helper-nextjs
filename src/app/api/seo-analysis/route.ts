import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import axios from 'axios';
import * as cheerio from 'cheerio';
import { z } from 'zod';

const URLRequestSchema = z.object({
    url: z.string().url().refine((url) => {
        try {
            const parsed = new URL(url);
            return ['http:', 'https:'].includes(parsed.protocol);
        } catch {
            return false;
        }
    }, 'URL must be valid and use HTTP/HTTPS protocol')
});

const SYSTEM_INSTRUCTION = `
You are an expert SEO Auditor for "Digital Helper". 
Your task is to analyze raw website metadata and metrics and provide a professional, graded assessment.

Output Format: JSON only.
Structure:
{
  "grade": "A" | "B" | "C" | "D" | "F",
  "score": number (0-100),
  "summary": "Brief 2-sentence summary of the site's health.",
  "quickWins": [
    "Actionable tip 1",
    "Actionable tip 2",
    "Actionable tip 3"
  ]
}
`;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validatedData = URLRequestSchema.parse(body);
        const { url } = validatedData;

        let targetUrl = url;
        if (!targetUrl.startsWith('http')) {
            targetUrl = 'https://' + targetUrl;
        }

        const startTime = Date.now();
        const response = await axios.get(targetUrl, {
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; DigitalHelperBot/1.0; +http://digital-helper.com)'
            },
            validateStatus: (status) => status < 500
        });

        const endTime = Date.now();
        const $ = cheerio.load(response.data);

        const analysisContext = {
            url: targetUrl,
            statusCode: response.status,
            loadTimeMs: endTime - startTime,
            metrics: {
                title: { content: $('title').text().trim() },
                description: { content: $('meta[name="description"]').attr('content') || '' },
                headers: { h1Count: $('h1').length },
                mobile: { hasViewportCtx: !!$('meta[name="viewport"]').attr('content') },
                images: { total: $('img').length, withAlt: $('img[alt]').length },
                links: { total: $('a').length }
            }
        };

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
        }

        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Analyze this website data: ${JSON.stringify(analysisContext)}. System Instruction: ${SYSTEM_INSTRUCTION}`;

        const result = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
                responseMimeType: "application/json"
            }
        });

        let aiAnalysis = {};
        try {
            const text = result.text || "{}";
            // Clean common LLM formatting artifacts if necessary
            const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            aiAnalysis = JSON.parse(cleanedText);
        } catch (parseError) {
            console.error("[SEO AI Parse Error]", parseError);
            aiAnalysis = {
                grade: "C",
                score: 50,
                summary: "Analysis completed but detailed report generation failed.",
                quickWins: ["Review site structure manually", "Optimize images", "Improve page load speed"]
            };
        }

        return NextResponse.json({
            url: targetUrl,
            rawMetrics: analysisContext,
            aiAnalysis
        });

    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        const errorMessage = error.message || "Unknown error";
        console.error("SEO Audit Error:", errorMessage);

        const status = error.response?.status || 500;
        const detail = error.code === 'ECONNABORTED' ? "Request timed out during website scan." : errorMessage;

        return NextResponse.json({
            error: "Failed to scan website.",
            details: detail
        }, { status });
    }
}
