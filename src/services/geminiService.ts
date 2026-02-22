/**
 * Gemini AI Service - Client-side API wrapper
 * 
 * Sprint 12: Now calls /api/case-study endpoint instead of direct Gemini API
 * The server-side endpoint handles AI generation via OpenRouter
 * 
 * @deprecated Direct usage deprecated - use /api/case-study endpoint instead
 *             Kept for backwards compatibility and utility functions
 */

export interface CaseStudyText {
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string[];
}

export interface CaseStudyData extends CaseStudyText {
    imageUrl: string;
}

export interface GenerationResult {
    success: boolean;
    data?: CaseStudyData;
    error?: string;
}

/**
 * Generate a complete case study via the API
 * Calls /api/case-study which uses OpenRouter for AI generation
 */
export async function generateCaseStudy(industry: string): Promise<GenerationResult> {
    try {
        const response = await fetch('/api/case-study', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ industry })
        });

        const result = await response.json();
        
        if (!result.success) {
            return {
                success: false,
                error: result.error || 'Generation failed'
            };
        }

        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Network error'
        };
    }
}

/**
 * @deprecated Use generateCaseStudy() instead
 * Legacy API - maintained for backwards compatibility
 */
export const geminiService = {
    async generateCaseStudyText(industry: string): Promise<CaseStudyText> {
        const result = await generateCaseStudy(industry);
        if (!result.success || !result.data) {
            throw new Error(result.error || 'Generation failed');
        }
        const { imageUrl, ...text } = result.data;
        return text;
    },

    async generateCaseStudyImage(industry: string): Promise<string> {
        const result = await generateCaseStudy(industry);
        if (!result.success || !result.data) {
            // Fallback to placeholder
            const seed = industry.toLowerCase().replace(/\s+/g, '-');
            return `https://picsum.photos/seed/${seed}/800/600`;
        }
        return result.data.imageUrl;
    }
};

export type { CaseStudyData as CaseStudy };
