import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
    try {
        const { businessName, location } = await req.json();

        if (!businessName || !location) {
            return NextResponse.json({ error: 'Business name and location are required' }, { status: 400 });
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
                    text: `Find the business "${businessName}" in "${location}".
                           1. Confirm you found it.
                           2. What is their address and current rating?
                           3. Summarize 2 recent reviews if available.
                           4. Create a brief "Website Concept" for them. Describe a modern hero section visual, color palette suggestion, and a specific feature they need (e.g. "Online Booking for dentists").`
                }]
            }],
            config: {
                tools: [{ googleSearch: {} }] as any
            }
        });

        const text = result.text || "Could not find business details.";

        let mapLink = "";
        let mapTitle = "";

        // Extract grounding metadata if available
        // Note: In some versions of unified SDK, it's result.candidates[0].groundingMetadata
        const candidates = (result as any).candidates;
        const groundingMetadata = candidates?.[0]?.groundingMetadata;

        if (groundingMetadata?.groundingChunks) {
            for (const chunk of groundingMetadata.groundingChunks) {
                if (chunk.web?.uri && (chunk.web.uri.includes('google.com/maps') || chunk.web.uri.includes('business.google.com'))) {
                    mapLink = chunk.web.uri;
                    mapTitle = chunk.web.title || "View on Google Maps";
                    break;
                }
            }
        }

        return NextResponse.json({
            analysis: text,
            mapLink,
            mapTitle
        });

    } catch (error) {
        console.error("Business analysis error:", error);
        return NextResponse.json({
            error: "Could not connect to Maps data at this time.",
            analysis: "Could not connect to Maps data at this time."
        }, { status: 500 });
    }
}
