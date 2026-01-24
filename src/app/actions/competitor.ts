'use server';

import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

const competitorAnalysisSchema = z.object({
    business: z.object({
        name: z.string(),
        estimatedRating: z.number().min(1).max(5),
        strengths: z.array(z.string()),
        weaknesses: z.array(z.string()),
    }),
    competitors: z.array(z.object({
        name: z.string(),
        rating: z.number().min(1).max(5),
        reviewCount: z.number(),
        strengths: z.array(z.string()),
        weaknesses: z.array(z.string()),
        differentiator: z.string(),
    })),
    marketPosition: z.object({
        ranking: z.number().min(1).max(4),
        gap: z.string(),
        opportunity: z.string(),
    }),
    recommendations: z.array(z.object({
        priority: z.enum(['high', 'medium', 'low']),
        action: z.string(),
        impact: z.string(),
        effort: z.enum(['low', 'medium', 'high']),
    })),
    swotSummary: z.object({
        strengths: z.array(z.string()),
        weaknesses: z.array(z.string()),
        opportunities: z.array(z.string()),
        threats: z.array(z.string()),
    }),
});

export type CompetitorAnalysis = z.infer<typeof competitorAnalysisSchema>;

interface AnalyzeCompetitorsInput {
    businessName: string;
    industry: string;
    location: string;
    websiteUrl?: string;
}

interface CompetitorAnalysisResult {
    success: boolean;
    analysis?: CompetitorAnalysis;
    error?: string;
}

/**
 * Analyze a business against its top local competitors
 * Uses AI to generate insights based on available data
 */
export async function analyzeCompetitors(
    input: AnalyzeCompetitorsInput
): Promise<CompetitorAnalysisResult> {
    try {
        const { businessName, industry, location, websiteUrl } = input;

        const prompt = `
You are a local business market analyst. Analyze the competitive landscape for:

Business: ${businessName}
Industry: ${industry}
Location: ${location}
${websiteUrl ? `Website: ${websiteUrl}` : ''}

Based on your knowledge of typical businesses in this industry and location, provide:

1. An analysis of the target business
2. Analysis of 3 likely top competitors in the area
3. Market position assessment
4. Prioritized recommendations for improvement
5. SWOT summary

Be specific and actionable. Use realistic business names and data patterns typical for this market.
Focus on digital presence, online reputation, and local search visibility.

Important: Generate realistic but hypothetical competitor data. Include specific, actionable insights.
`;

        const { object } = await generateObject({
            model: google('gemini-1.5-flash'),
            schema: competitorAnalysisSchema,
            prompt,
        });

        return {
            success: true,
            analysis: object,
        };
    } catch (error) {
        console.error('[Competitor Analysis Error]', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to analyze competitors',
        };
    }
}

/**
 * Quick competitor comparison - lighter version for chat tool
 */
export async function getQuickCompetitorInsight(
    businessName: string,
    industry: string,
    location: string
): Promise<{
    competitors: string[];
    keyDifferentiators: string[];
    quickWin: string;
}> {
    try {
        const result = await generateObject({
            model: google('gemini-1.5-flash'),
            schema: z.object({
                competitors: z.array(z.string()).describe('Names of 3 likely top competitors'),
                keyDifferentiators: z.array(z.string()).describe('3 things that could differentiate this business'),
                quickWin: z.string().describe('One quick action to gain competitive advantage'),
            }),
            prompt: `For ${businessName} (${industry}) in ${location}, identify likely top 3 competitors, 3 potential differentiators, and one quick win strategy for competitive advantage. Be specific and actionable.`,
        });

        return result.object;
    } catch (error) {
        console.error('[Quick Competitor Insight Error]', error);
        return {
            competitors: ['Competitor data unavailable'],
            keyDifferentiators: ['Professional website', 'Strong reviews', 'Fast response times'],
            quickWin: 'Optimize your Google Business Profile with complete information and recent photos.',
        };
    }
}
