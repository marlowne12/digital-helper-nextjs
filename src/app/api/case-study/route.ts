import { NextRequest, NextResponse } from 'next/server';

/**
 * AI-Powered Case Study Generator API
 * Sprint 12: Connects to OpenRouter for Gemini/GPT-4 text generation
 * 
 * POST /api/case-study
 * Body: { industry: string }
 * Returns: { client, industry, challenge, solution, results[], imageUrl }
 */

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const TEXT_MODEL = process.env.AI_TEXT_MODEL || 'google/gemini-2.0-flash-001';

interface CaseStudyData {
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string[];
    imageUrl: string;
}

// Generate case study text using OpenRouter
async function generateCaseStudyText(industry: string): Promise<Omit<CaseStudyData, 'imageUrl'>> {
    const prompt = `You are a marketing copywriter for Digital Helper, a web design and AI automation agency for local service businesses in the Tri-Cities area (Richland, Kennewick, Pasco, WA).

Generate a realistic, compelling case study for a ${industry} business. The case study should feel authentic and specific.

Return ONLY valid JSON with this exact structure:
{
    "client": "A realistic business name for a ${industry} in Washington state",
    "industry": "${industry}",
    "challenge": "2-3 sentences describing their specific pain points before working with us. Focus on outdated website, no online presence, losing leads to competitors, poor mobile experience, or slow response times.",
    "solution": "2-3 sentences about what Digital Helper built for them. Include specific technologies like React/Next.js websites, AI chatbots, automated booking, local SEO, Google Business Profile optimization, or reputation management.",
    "results": ["Specific metric 1 (e.g., '350% increase in website leads')", "Specific metric 2 (e.g., '#1 ranking for local searches')", "Specific metric 3 (e.g., 'Response time reduced from 4 hours to 14 seconds')"]
}

Make results metrics specific and impressive but realistic. Use percentages, rankings, and time savings. Focus on ROI and business impact.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'https://digital-helper.com',
            'X-Title': 'Digital Helper Case Study Generator'
        },
        body: JSON.stringify({
            model: TEXT_MODEL,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.8,
            max_tokens: 1000,
            response_format: { type: 'json_object' }
        })
    });

    if (!response.ok) {
        const error = await response.text();
        console.error('OpenRouter API error:', error);
        throw new Error(`AI generation failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
        throw new Error('No content returned from AI');
    }

    // Parse JSON response
    try {
        const parsed = JSON.parse(content);
        return {
            client: parsed.client || `${industry} Success Story`,
            industry: parsed.industry || industry,
            challenge: parsed.challenge || 'Business needed a modern web presence.',
            solution: parsed.solution || 'We built a custom solution.',
            results: Array.isArray(parsed.results) ? parsed.results : ['Improved online presence', 'More leads', 'Better conversions']
        };
    } catch (parseError) {
        console.error('JSON parse error:', parseError, 'Content:', content);
        // Return fallback if JSON parsing fails
        return {
            client: `${industry} Success Story`,
            industry,
            challenge: `This ${industry.toLowerCase()} business was struggling with outdated technology and losing customers to competitors with better online presence.`,
            solution: `Digital Helper designed a modern, fast-loading website with AI-powered lead capture, automated booking, and local SEO optimization specifically for ${industry.toLowerCase()} businesses.`,
            results: [
                `250% increase in ${industry.toLowerCase()} inquiries`,
                'Top 3 Google ranking for local searches',
                'Response time reduced to under 30 seconds'
            ]
        };
    }
}

// Generate an image for the case study using DALL-E via OpenRouter
async function generateCaseStudyImage(industry: string, clientName: string): Promise<string> {
    // For now, use high-quality stock photos from Unsplash with industry-specific queries
    // DALL-E 3 via OpenRouter requires a different endpoint and higher cost
    // We'll use curated placeholder images that look professional
    
    const industrySeeds: Record<string, string[]> = {
        'restaurant': ['restaurant-interior', 'cafe-design', 'modern-restaurant'],
        'plumbing': ['modern-bathroom', 'kitchen-renovation', 'plumber-work'],
        'hvac': ['modern-home', 'home-comfort', 'hvac-system'],
        'dental': ['modern-dental', 'dental-office', 'healthcare-interior'],
        'legal': ['law-office', 'modern-office', 'professional-office'],
        'automotive': ['auto-shop', 'car-service', 'mechanic-garage'],
        'landscaping': ['beautiful-garden', 'landscape-design', 'outdoor-space'],
        'roofing': ['modern-house', 'roof-installation', 'home-exterior'],
        'electrical': ['modern-lighting', 'smart-home', 'electrical-work'],
        'cleaning': ['clean-office', 'spotless-home', 'cleaning-service'],
        'real estate': ['modern-home-exterior', 'luxury-house', 'real-estate'],
        'fitness': ['modern-gym', 'fitness-studio', 'workout-space'],
        'salon': ['modern-salon', 'beauty-spa', 'hair-salon'],
        'spa': ['spa-interior', 'wellness-center', 'relaxation'],
        'bakery': ['bakery-interior', 'artisan-bakery', 'fresh-bread'],
        'coffee shop': ['coffee-shop', 'cafe-interior', 'barista'],
    };

    // Find matching industry or use default
    const industryLower = industry.toLowerCase();
    let seeds = industrySeeds['restaurant']; // default

    for (const [key, value] of Object.entries(industrySeeds)) {
        if (industryLower.includes(key) || key.includes(industryLower)) {
            seeds = value;
            break;
        }
    }

    // Pick a random seed for variety
    const seed = seeds[Math.floor(Math.random() * seeds.length)];
    
    // Use picsum with a hash of the client name for consistency
    const hash = clientName.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    
    return `https://picsum.photos/seed/${seed}-${hash % 1000}/800/600`;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { industry } = body;

        if (!industry || typeof industry !== 'string') {
            return NextResponse.json(
                { success: false, error: 'Industry is required' },
                { status: 400 }
            );
        }

        if (!OPENROUTER_API_KEY) {
            console.error('OPENROUTER_API_KEY not configured');
            return NextResponse.json(
                { success: false, error: 'AI service not configured' },
                { status: 503 }
            );
        }

        // Generate text content
        const textData = await generateCaseStudyText(industry);

        // Generate image
        const imageUrl = await generateCaseStudyImage(industry, textData.client);

        const caseStudy: CaseStudyData = {
            ...textData,
            imageUrl
        };

        return NextResponse.json({
            success: true,
            data: caseStudy
        });

    } catch (error) {
        console.error('Case study generation error:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: error instanceof Error ? error.message : 'Generation failed'
            },
            { status: 500 }
        );
    }
}

// Health check
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        endpoint: 'case-study-generator',
        model: TEXT_MODEL,
        apiConfigured: !!OPENROUTER_API_KEY
    });
}
