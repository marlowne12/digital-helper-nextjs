import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import axios from 'axios';
import * as cheerio from 'cheerio';

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
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

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

        const jsonResponse = JSON.parse(result.text || "{}");

        return NextResponse.json({
            url: targetUrl,
            rawMetrics: analysisContext,
            aiAnalysis: jsonResponse
        });

    } catch (error: any) {
        console.error("SEO Audit Error:", error.message);
        return NextResponse.json({
            error: "Failed to scan website.",
            details: error.message
        }, { status: 500 });
    }
}
