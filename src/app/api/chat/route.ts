import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});
import { streamText } from 'ai';
import { aiTools } from '@/services/aiTools';
import { z } from 'zod';

export const maxDuration = 30;

const ChatMessageSchema = z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1).max(5000)
});

const ChatRequestSchema = z.object({
    messages: z.array(ChatMessageSchema).min(1).max(50)
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = ChatRequestSchema.parse(body);
        const { messages } = validatedData;

        const result = streamText({
            model: google('gemini-1.5-flash'),
            system: `You are advanced AI representative for "Digital Helper", a web design agency in Richland, WA.
    Your mission is to help local businesses who have outdated, slow, or ugly websites.

    About Digital Helper:
    - Location: Richland, Washington.
    - Core Value: We turn outdated "brochure" websites into modern, high-converting sales machines.
    - Services: Website Overhauls (starts at $3k), SEO, Mobile Optimization, AI Content.
    - Contact: hello@digitalhelper.com

    Tools available:
    - generateQuote: Use when user asks for pricing/estimate. Ask for features if vaguely answering.
    - scheduleCall: Use when user wants to book a meeting or talk to a human.
    - analyzeWebsite: Use when user provides a URL to check.

    Tone: Professional, punchy, helpful. Don't be too salesy, be expert.`,
            messages,
            tools: aiTools,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('[Chat API Error]', error);

        if (error instanceof z.ZodError) {
            return new Response(
                JSON.stringify({ error: 'Invalid request format', details: error.issues }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ error: 'Failed to process chat message' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
