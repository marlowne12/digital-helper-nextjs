import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
    try {
        const { topic, name } = await req.json();

        if (!topic || !name) {
            return NextResponse.json({ error: 'Topic and name are required' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
        }

        const ai = new GoogleGenAI({ apiKey });

        const result = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [{
                role: "user",
                parts: [{
                    text: `Write a short, professional inquiry email from ${name} about: ${topic}. Keep it under 50 words.`
                }]
            }]
        });

        const text = result.text || "";

        return NextResponse.json({
            text: text
        });
    } catch (error) {
        console.error("Email draft error:", error);
        return NextResponse.json({
            error: "Could not generate draft."
        }, { status: 500 });
    }
}
