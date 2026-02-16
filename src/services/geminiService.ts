/**
 * Gemini AI Service for Case Study Generation
 * 
 * This is a stub service - in production, connect to Gemini API
 * Set GEMINI_API_KEY environment variable to enable
 */

interface CaseStudyText {
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string[];
}

// Sample generated content for demo purposes
const sampleResponses: Record<string, CaseStudyText> = {
    default: {
        client: "Local Business Example",
        industry: "Professional Services",
        challenge: "Their outdated website wasn't bringing in any leads. Customers couldn't find their services online, and competitors were ranking higher.",
        solution: "We built a modern, fast-loading website with clear calls-to-action, integrated booking, and local SEO optimization.",
        results: [
            "300% increase in website leads",
            "First page Google ranking",
            "45% reduction in bounce rate"
        ]
    }
};

export const geminiService = {
    /**
     * Generate case study text content
     * In production: calls Gemini API to generate custom content
     */
    async generateCaseStudyText(industry: string): Promise<CaseStudyText> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In production, this would call the Gemini API
        // For now, return customized sample content
        return {
            client: `${industry} Success Story`,
            industry: industry,
            challenge: `This ${industry.toLowerCase()} business was struggling with an outdated online presence. Their website was slow, not mobile-friendly, and they weren't appearing in local search results.`,
            solution: `We designed a custom website optimized for ${industry.toLowerCase()} businesses, with integrated booking, customer reviews, and local SEO targeting their service area.`,
            results: [
                `200% increase in ${industry.toLowerCase()} inquiries`,
                `Top 3 Google ranking for local searches`,
                `Mobile traffic up 400%`
            ]
        };
    },

    /**
     * Generate case study image
     * In production: calls Imagen/DALL-E to generate custom imagery
     */
    async generateCaseStudyImage(industry: string): Promise<string> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Return a placeholder image - in production, this would generate AI imagery
        const seed = industry.toLowerCase().replace(/\s+/g, '-');
        return `https://picsum.photos/seed/${seed}/800/600`;
    }
};

export type { CaseStudyText };
