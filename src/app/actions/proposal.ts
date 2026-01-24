'use server';

import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});
import { generateObject } from 'ai';
import { z } from 'zod';

const proposalSchema = z.object({
    executiveSummary: z.string().describe('2-3 sentence overview of the proposal'),
    businessOverview: z.object({
        name: z.string(),
        industry: z.string(),
        currentChallenges: z.array(z.string()),
    }),
    auditFindings: z.object({
        criticalIssues: z.array(z.object({
            issue: z.string(),
            impact: z.string(),
            urgency: z.enum(['high', 'medium', 'low']),
        })),
        opportunities: z.array(z.string()),
        competitiveGaps: z.array(z.string()),
    }),
    proposedSolution: z.object({
        overview: z.string(),
        phases: z.array(z.object({
            name: z.string(),
            description: z.string(),
            deliverables: z.array(z.string()),
            timeline: z.string(),
        })),
        technologies: z.array(z.string()),
    }),
    investment: z.object({
        totalEstimate: z.string(),
        breakdown: z.array(z.object({
            item: z.string(),
            cost: z.string(),
        })),
        paymentTerms: z.string(),
        roi: z.string(),
    }),
    timeline: z.object({
        totalDuration: z.string(),
        milestones: z.array(z.object({
            name: z.string(),
            week: z.string(),
        })),
    }),
    nextSteps: z.array(z.object({
        step: z.number(),
        action: z.string(),
    })),
    guarantee: z.string().describe('Service guarantee or risk reversal'),
});

export type Proposal = z.infer<typeof proposalSchema>;

interface GenerateProposalInput {
    businessName: string;
    industry: string;
    location: string;
    auditResult?: {
        score?: number;
        issues?: string[];
        opportunities?: string[];
    };
    services: ('website' | 'seo' | 'automation' | 'reputation')[];
    budget?: 'starter' | 'professional' | 'enterprise';
    notes?: string;
}

interface ProposalResult {
    success: boolean;
    proposal?: Proposal;
    error?: string;
}

/**
 * Generate a customized service proposal based on audit results
 */
export async function generateProposal(
    input: GenerateProposalInput
): Promise<ProposalResult> {
    try {
        const {
            businessName,
            industry,
            location,
            auditResult,
            services,
            budget = 'professional',
            notes,
        } = input;

        const budgetRanges = {
            starter: '$2,500 - $5,000',
            professional: '$5,000 - $15,000',
            enterprise: '$15,000 - $50,000+',
        };

        const prompt = `
Generate a professional service proposal for:

Business: ${businessName}
Industry: ${industry}
Location: ${location}
Services Requested: ${services.join(', ')}
Budget Range: ${budgetRanges[budget]}

${auditResult ? `
Audit Results:
- Score: ${auditResult.score || 'N/A'}/100
- Issues: ${auditResult.issues?.join(', ') || 'Standard improvements needed'}
- Opportunities: ${auditResult.opportunities?.join(', ') || 'Growth potential identified'}
` : ''}

${notes ? `Additional Notes: ${notes}` : ''}

Create a compelling, professional proposal that:
1. Addresses their specific pain points
2. Proposes clear solutions with deliverables
3. Includes realistic pricing and timeline
4. Shows ROI potential
5. Creates urgency without being pushy

Be specific and actionable. Use realistic timelines and pricing.
`;

        const { object } = await generateObject({
            model: google('gemini-1.5-flash'),
            schema: proposalSchema,
            prompt,
        });

        return {
            success: true,
            proposal: object,
        };
    } catch (error) {
        console.error('[Proposal Generation Error]', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to generate proposal',
        };
    }
}

/**
 * Quick proposal summary for email or preview
 */
export async function generateQuickProposalSummary(
    businessName: string,
    services: string[]
): Promise<string> {
    try {
        const { object } = await generateObject({
            model: google('gemini-1.5-flash'),
            schema: z.object({
                summary: z.string().describe('2-3 sentence proposal summary'),
                estimatedInvestment: z.string(),
                keyBenefit: z.string(),
            }),
            prompt: `Generate a quick proposal summary for ${businessName} requesting ${services.join(', ')} services. Be concise and compelling.`,
        });

        return `${object.summary} Estimated investment: ${object.estimatedInvestment}. Key benefit: ${object.keyBenefit}`;
    } catch {
        return `Custom ${services.join(' and ')} solution tailored for ${businessName}. Contact us for detailed pricing.`;
    }
}
