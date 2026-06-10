import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { aiTools } from '@/services/aiTools';
import { z } from 'zod';
import { withRateLimit } from '@/lib/api-middleware';
import { rateLimits, getClientIP } from '@/lib/rate-limit';
import { type NextRequest } from 'next/server';

export const maxDuration = 30;

// The client uses @ai-sdk/react useChat, which sends UIMessages ({ role, parts }).
// Validate the envelope (role + message count) without over-constraining parts.
const ChatRequestSchema = z.object({
    messages: z
        .array(z.object({ role: z.enum(['user', 'assistant', 'system']) }).passthrough())
        .min(1)
        .max(50),
});

export async function POST(req: NextRequest) {
    return withRateLimit(req, rateLimits.chat, async () => {
        try {
            const body = await req.json();
            const { messages } = ChatRequestSchema.parse(body);

            const result = streamText({
                model: google('gemini-2.0-flash'),
                system: `You are the AI assistant for Digital Helper, a web design and AI automation agency in Richland, WA serving Tri-Cities service businesses (HVAC, plumbing, landscaping, restaurants, etc.).

    About Digital Helper:
    - Owner: Mars, based in Richland, WA
    - Phone: (509) 987-5060
    - Email: business@digital-helper.com
    - Website: https://digital-helper.com
    - Serving: Richland, Kennewick, Pasco, West Richland, and surrounding Tri-Cities area

    Services & Pricing:
    - AI Chatbot System: $97/mo + $297 setup (Starter) or $197/mo + $497 setup (Growth). Handles lead capture, FAQ, appointment booking 24/7.
    - Next.js Web Design: Custom fast websites built on Next.js (not WordPress). Part of monthly plans.
    - Hyper-Local SEO: Dominate Tri-Cities search results for your trade/service.
    - Lead Generation: Conversion-optimized funnels that turn visitors into booked calls.
    - Reputation Management: Automated 5-star Google review collection.

    Key differentiators:
    - AI answers leads at 2am when the owner is asleep — 62% of calls go unanswered after hours
    - Next.js sites load faster and rank better than WordPress
    - Local: Mars lives and works in Tri-Cities, not a national agency
    - No long-term contracts, 14-day money-back guarantee

    Your job: Help visitors understand how AI and web design can get them more booked jobs. Be friendly, direct, and Tri-Cities-local in tone. When someone asks about pricing, use the comparePlans or generateQuote tools. When someone wants to book a call, use the scheduleCall tool. When someone gives you their website URL, use analyzeWebsite.`,
                messages: await convertToModelMessages(messages as unknown as UIMessage[]),
                tools: aiTools,
            });

            return result.toUIMessageStreamResponse();
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
    });
}
