import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/ratelimit';

const BusinessContextSchema = z.object({
    name: z.string().min(1).max(100),
    type: z.string().min(1).max(50),
    city: z.string().max(100).optional(),
    phone: z.string().max(30).optional(),
    hours: z.string().max(200).optional(),
    services: z.array(z.string().max(80)).max(20).optional(),
    description: z.string().max(500).optional(),
});

const RequestSchema = z.object({
    messages: z.array(
        z.object({
            role: z.enum(['user', 'assistant']),
            content: z.string().max(4000),
        })
    ).max(50),
    businessContext: BusinessContextSchema,
});

type BusinessContext = z.infer<typeof BusinessContextSchema>;

function buildSystemPrompt(ctx: BusinessContext): string {
    const servicesList = ctx.services?.length
        ? ctx.services.map((s) => `- ${s}`).join('\n')
        : '- (services not specified)';

    return `You are the AI assistant for ${ctx.name}, a ${ctx.type} business${ctx.city ? ` in ${ctx.city}` : ''}.

Your role is to help customers by answering questions, capturing contact information for leads, and scheduling consultations or appointments.

Business Details:
- Name: ${ctx.name}
- Type: ${ctx.type}${ctx.city ? `\n- Location: ${ctx.city}` : ''}${ctx.phone ? `\n- Phone: ${ctx.phone}` : ''}${ctx.hours ? `\n- Hours: ${ctx.hours}` : ''}
${ctx.description ? `- About: ${ctx.description}` : ''}

Services offered:
${servicesList}

Rules:
1. Be friendly, helpful, and concise — keep replies under 3 short paragraphs.
2. When someone needs a quote, collect their name, phone number, and describe the issue.
3. For appointments, offer to have the team call them back within 24 hours.
4. Always stay on-topic for this business; politely decline unrelated requests.
5. If asked something you don't know (exact pricing, availability), say you'll have the team follow up.
6. End responses with a helpful next-step offer when appropriate.
7. Never make up specific prices, guarantees, or availability.`;
}

export async function POST(req: Request) {
    try {
        const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
        const { success } = await checkRateLimit(ip);
        if (!success) {
            return new Response('Too many requests', { status: 429 });
        }
    } catch (rateLimitError) {
        console.error('[demo-chat] Rate limit check error (skipping):', rateLimitError);
    }

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return new Response('Invalid JSON', { status: 400 });
    }

    const parsed = RequestSchema.safeParse(body);
    if (!parsed.success) {
        return new Response(JSON.stringify({ error: 'Invalid request', details: parsed.error.flatten() }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { messages, businessContext } = parsed.data;

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return new Response('Missing API key', { status: 500 });
    }

    const google = createGoogleGenerativeAI({ apiKey });

    const result = streamText({
        model: google('gemini-1.5-flash'),
        system: buildSystemPrompt(businessContext),
        messages,
        maxTokens: 512,
    });

    return result.toTextStreamResponse();
}
