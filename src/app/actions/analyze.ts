'use server';

import { generateObject, generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { AuditResult, GBPProfile } from '@/types/reputation';

// Define the schema for structured output
const schema = z.object({
    score: z.number().min(0).max(100),
    summary: z.string(),
    swot: z.object({
        strengths: z.array(z.string()),
        weaknesses: z.array(z.string()),
        opportunities: z.array(z.string()),
        threats: z.array(z.string())
    }),
    recommendations: z.array(z.object({
        id: z.string(),
        type: z.enum(['reply_review', 'optimize_description', 'add_photos', 'keyword_gap', 'general']),
        title: z.string(),
        description: z.string(),
        impact: z.enum(['High', 'Medium', 'Low']),
        status: z.enum(['pending', 'completed']),
        context: z.any().optional()
    }))
});

export async function analyzeProfile(profile: GBPProfile): Promise<AuditResult> {
    try {
        const prompt = `
      Analyze this Google Business Profile for reputation health.
      
      Business Name: ${profile.name}
      Rating: ${profile.rating} / 5
      Total Reviews: ${profile.totalReviews}
      Categories: ${profile.categories.join(', ')}
      Description: ${profile.description}
      
      Last 5 Reviews:
      ${profile.reviews.map(r => `- "${r.text}" (${r.rating} stars) by ${r.author}`).join('\n')}
      
      Tasks:
      1. Calculate a Health Score (0-100) based on rating, review volume, and sentiment.
      2. Perform a SWOT analysis.
      3. Generate actionable recommendations. specifically look for:
         - Unanswered negative reviews (create a 'reply_review' recommendation).
         - Missing or weak description (create 'optimize_description').
         - Low photo count (create 'add_photos').
         - Keyword gaps in description vs categories.
    `;

        const { object } = await generateObject({
            model: google('gemini-1.5-flash'), // Efficient & fast model
            schema: schema,
            prompt: prompt,
        });

        // Cast the Zod type back to our interface (they match structurally)
        return object as unknown as AuditResult;

    } catch (error) {
        console.error("AI Analysis Failed:", error);
        // Fallback or error handling
        throw new Error("Failed to analyze profile with AI.");
    }
}

export async function generateResponse(reviewId: string, authorName: string, sentiment: 'negative' | 'positive' = 'negative'): Promise<string[]> {
    const prompt = `
        Write 3 distinct, professional, and empathetic responses to a ${sentiment} Google Review from "${authorName}".
        
        Guidelines:
        - Keep it brief (under 50 words).
        - Address them by name.
        - If negative: Apologize, acknowledge issue, ask to take offline.
        - If positive: Thank them, mention a specific detail if possible.
        
        Return ONLY a JSON array of strings: ["Response 1", "Response 2", "Response 3"]
    `;

    const { object } = await generateObject({
        model: google('gemini-1.5-flash'),
        schema: z.object({ responses: z.array(z.string()) }),
        prompt: prompt,
    });

    return object.responses;
}

export async function optimizeDescription(currentDescription: string): Promise<string> {
    const { text } = await generateText({
        model: google('gemini-1.5-flash'),
        prompt: `
            Rewrite and optimize this Google Business Description for SEO. 
            Include relevant keywords for the industry, make it engaging, and keep it under 750 characters.
            
            Current Description: "${currentDescription}"
        `
    });

    return text;
}
