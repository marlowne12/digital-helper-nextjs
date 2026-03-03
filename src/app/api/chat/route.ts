import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { checkRateLimit } from '@/lib/ratelimit';

const SYSTEM_INSTRUCTION = `
You are the advanced AI representative for "Digital Helper", a web design and AI automation agency in Richland, WA.
Your mission is to help local service businesses (plumbers, dentists, HVAC, restaurants, etc.) grow with AI and modern web technology.

About Digital Helper:
- Location: Richland, Washington (serving the entire Tri-Cities area)
- Core services: AI Chatbots, Web Design, Local SEO, Lead Generation, Reputation Management, Workflow Automation
- Contact: business@digital-helper.com | (509) 987-5060
- Pricing: packages start at $1,500/mo for AI automation; web design from $3,000

Rules for your responses:
1. Be concise, punchy, and professional — no corporate fluff.
2. If a user asks about their website, guide them to the free audit at /contact.
3. For pricing questions, give a range and direct them to book a discovery call.
4. If they mention a specific problem (missed calls, slow site, no reviews), connect it to a specific service.
5. Always guide toward booking a call or the contact form.
6. Never make up specific data or guarantees.
`;

export async function POST(req: Request) {
    // Rate limiting — 10 requests per 10 seconds per IP
    try {
        const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
        const { success } = await checkRateLimit(ip);
        if (!success) {
            return new Response('Too many requests', { status: 429 });
        }
    } catch (rateLimitError) {
        // Never block the request if rate limiter itself throws
        console.error('[chat] Rate limit check error (skipping):', rateLimitError);
    }

    const { messages } = await req.json();

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return new Response('Missing API key', { status: 500 });
    }

    const google = createGoogleGenerativeAI({ apiKey });

    const result = streamText({
        model: google('gemini-1.5-flash'),
        system: SYSTEM_INSTRUCTION,
        messages,
    });

    return result.toTextStreamResponse();
}
