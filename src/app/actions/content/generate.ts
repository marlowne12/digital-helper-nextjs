'use server';

/**
 * AI-Powered Content Generation Server Actions
 *
 * This module provides server actions for generating content variants using
 * Google Gemini AI via the Vercel AI SDK. It generates three distinct content
 * styles for each request:
 * - Variant 1: SEO-focused (keyword-heavy, structured, search-optimized)
 * - Variant 2: Story-driven (engaging, conversational, narrative)
 * - Variant 3: Problem-solution (pain-point oriented, actionable)
 */

import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';
import type {
    ContentItem,
    ContentRequest,
    ContentVariant,
    GeneratedContent,
    ContentType,
    VariantStyle,
} from '@/types/content';
import {
    createContentItem,
    saveVariants,
    slugify,
    calculateReadingTime,
    calculateSEOScore,
    updateSelectedVariant,
} from '@/lib/google-sheets';

// Initialize Google Generative AI
const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

// ============================================================
// ZOD SCHEMAS FOR STRUCTURED OUTPUT
// ============================================================

/**
 * Schema for blog post content generation
 */
const blogContentSchema = z.object({
    title: z.string().describe('SEO-optimized title (50-60 characters)'),
    slug: z.string().describe('URL-friendly slug'),
    content: z.string().describe('Full markdown content with headings, bullet points, and examples'),
    excerpt: z.string().describe('Compelling 1-2 sentence summary (150-160 characters)'),
    metaTitle: z.string().describe('SEO meta title (50-60 characters)'),
    metaDescription: z.string().describe('SEO meta description (150-160 characters)'),
    wordCount: z.number().describe('Approximate word count'),
    headingCount: z.number().describe('Number of headings in the content'),
});

/**
 * Schema for service page content generation
 */
const servicePageSchema = z.object({
    title: z.string().describe('Service page title'),
    slug: z.string().describe('URL-friendly slug'),
    heroTitle: z.string().describe('Hero section headline'),
    heroDescription: z.string().describe('Hero section description'),
    painPoints: z.array(z.string()).min(3).max(6).describe('Customer pain points'),
    deliverables: z.array(z.string()).min(5).max(10).describe('What we deliver'),
    benefits: z.array(z.string()).min(4).max(8).describe('Key benefits'),
    pricing: z.array(z.object({
        tier: z.string(),
        price: z.string(),
        features: z.array(z.string()),
    })).min(2).max(4).describe('Pricing tiers'),
    faqs: z.array(z.object({
        question: z.string(),
        answer: z.string(),
    })).min(3).max(6).describe('Frequently asked questions'),
    metaTitle: z.string().describe('SEO meta title'),
    metaDescription: z.string().describe('SEO meta description'),
    content: z.string().describe('Full markdown content for the page'),
});

/**
 * Schema for location page content generation
 */
const locationPageSchema = z.object({
    title: z.string().describe('Location page title'),
    slug: z.string().describe('URL-friendly slug'),
    city: z.string().describe('City name'),
    state: z.string().describe('State abbreviation'),
    heroTitle: z.string().describe('Hero section headline'),
    heroDescription: z.string().describe('Hero section description'),
    services: z.array(z.string()).min(4).max(8).describe('Services offered in this location'),
    testimonials: z.array(z.object({
        text: z.string(),
        author: z.string(),
        business: z.string(),
    })).min(2).max(4).describe('Customer testimonials from this location'),
    localSEO: z.object({
        primaryKeyword: z.string(),
        secondaryKeywords: z.array(z.string()).min(3).max(6),
    }),
    metaTitle: z.string().describe('SEO meta title'),
    metaDescription: z.string().describe('SEO meta description'),
    content: z.string().describe('Full markdown content for the page'),
});

// ============================================================
// PROMPT TEMPLATES
// ============================================================

/**
 * Build the base context for content generation
 */
function buildBaseContext(request: ContentRequest): string {
    const parts: string[] = [];

    parts.push(`CONTENT TYPE: ${request.type.toUpperCase()}`);
    parts.push(`TOPIC: ${request.topic}`);
    parts.push(`KEYWORDS: ${request.keywords.join(', ')}`);

    if (request.location) {
        parts.push(`LOCATION: ${request.location}`);
    }

    if (request.targetAudience) {
        parts.push(`TARGET AUDIENCE: ${request.targetAudience}`);
    }

    if (request.tone) {
        parts.push(`TONE: ${request.tone}`);
    }

    if (request.targetLength) {
        parts.push(`TARGET LENGTH: ${request.targetLength} words`);
    }

    if (request.additionalContext) {
        parts.push(`ADDITIONAL CONTEXT: ${request.additionalContext}`);
    }

    return parts.join('\n');
}

/**
 * Generate SEO-focused variant prompt
 *
 * Characteristics:
 * - Keyword-heavy but natural
 * - Structured with clear headings (H1, H2, H3)
 * - Search-optimized with meta tags
 * - Lists and bullet points for readability
 * - Focus on answering search intent
 */
function buildSEOFocusedPrompt(request: ContentRequest): string {
    const baseContext = buildBaseContext(request);

    return `
You are an expert SEO copywriter specializing in ${request.type} content for Digital Helper, a web design and digital marketing agency.

${baseContext}

TASK: Write an SEO-optimized ${request.type} that targets search intent and ranks well on Google.

REQUIREMENTS:
1. Include the primary keyword "${request.keywords[0]}" naturally in the first 100 words
2. Use all provided keywords naturally throughout the content
3. Structure with H1, H2, H3 headings for easy scanning
4. Include bullet lists where appropriate
5. Write meta title (50-60 chars) and meta description (150-160 chars)
6. Target word count: ${request.targetLength || 800}
7. Include internal link suggestions (using [link text](relative/path) format)
8. End with a clear call-to-action

SEO BEST PRACTICES:
- Use short paragraphs (2-3 sentences)
- Include transition words for readability
- Add statistics or data points where relevant
- Optimize for featured snippets (clear definitions, lists)
- Include a compelling excerpt that encourages clicks

OUTPUT FORMAT: Provide all fields in the specified schema.
`;
}

/**
 * Generate story-driven variant prompt
 *
 * Characteristics:
 * - Narrative and conversational
 * - Engaging hook to draw readers in
 * - Real-world examples and anecdotes
 * - Personal tone that builds connection
 * - Focus on emotional resonance
 */
function buildStoryDrivenPrompt(request: ContentRequest): string {
    const baseContext = buildBaseContext(request);

    return `
You are a master storyteller and brand voice expert for Digital Helper, a web design and digital marketing agency.

${baseContext}

TASK: Write a compelling, story-driven ${request.type} that engages readers emotionally and builds trust.

REQUIREMENTS:
1. Start with a hook that grabs attention (story, surprising stat, or relatable scenario)
2. Use conversational language (write like you're talking to a friend)
3. Include real-world examples or mini-case studies
4. Show empathy for the reader's situation
5. Use rhetorical questions to engage the reader
6. Create an emotional connection
7. End with an inspiring conclusion and clear CTA
8. Target word count: ${request.targetLength || 800}
9. Write meta title and description that intrigue curiosity

STORYTELLING ELEMENTS TO INCLUDE:
- "Imagine..." or "Picture this..." scenarios
- Before/after contrasts
- Relatable pain points
- Human moments and emotions
- Unexpected insights
- Conversational transitions

AVOID:
- Generic corporate language
- Jargon without explanation
- Lists without context
- Dry, factual writing

OUTPUT FORMAT: Provide all fields in the specified schema.
`;
}

/**
 * Generate problem-solution variant prompt
 *
 * Characteristics:
 * - Pain-point oriented
 * - Clear problem identification
 * - Actionable solutions
 * - Step-by-step guidance
 * - Focus on practical value
 */
function buildProblemSolutionPrompt(request: ContentRequest): string {
    const baseContext = buildBaseContext(request);

    return `
You are a problem-solving expert and consultant for Digital Helper, a web design and digital marketing agency.

${baseContext}

TASK: Write a practical, problem-solution ${request.type} that helps readers overcome specific challenges.

REQUIREMENTS:
1. Clearly identify the core problem early in the content
2. Explain WHY the problem exists (root causes)
3. Provide concrete, actionable solutions
4. Use step-by-step formats where appropriate
5. Include "Do this, not that" comparisons
6. Add troubleshooting tips for common mistakes
7. Make solutions feel achievable (not overwhelming)
8. Target word count: ${request.targetLength || 800}
9. Write meta title and description that promise a solution

PROBLEM-SOLUTION STRUCTURE:
1. The Problem: What's going wrong and why it matters
2. The Impact: Consequences of not solving it
3. The Solution: Your step-by-step answer
4. Implementation: How to apply it
5. Results: What to expect

FOCUS ON:
- Practical tips the reader can use TODAY
- Clear warnings about pitfalls
- Priority (what to do first)
- Quick wins vs. long-term solutions
- Expert insights that save time/money

OUTPUT FORMAT: Provide all fields in the specified schema.
`;
}

// ============================================================
// CONTENT GENERATION FUNCTIONS
// ============================================================

/**
 * Generate a blog post variant
 */
async function generateBlogVariant(
    request: ContentRequest,
    variantStyle: VariantStyle
): Promise<GeneratedContent> {
    let prompt: string;

    switch (variantStyle) {
        case 'seo-focused':
            prompt = buildSEOFocusedPrompt(request);
            break;
        case 'story-driven':
            prompt = buildStoryDrivenPrompt(request);
            break;
        case 'problem-solution':
            prompt = buildProblemSolutionPrompt(request);
            break;
    }

    const { object } = await generateObject({
        model: google('gemini-1.5-flash'),
        schema: blogContentSchema,
        prompt,
    });

    // Calculate word count if not provided
    const wordCount = object.wordCount || object.content.split(/\s+/).length;

    // Calculate SEO score
    const seoScore = calculateSEOScore(object.content, object.metaTitle, object.metaDescription);

    // Calculate reading time
    const readingTime = calculateReadingTime(wordCount);

    return {
        title: object.title,
        slug: object.slug || slugify(object.title),
        content: object.content,
        excerpt: object.excerpt,
        metaTitle: object.metaTitle,
        metaDescription: object.metaDescription,
        readingTime,
        wordCount,
        seoScore,
    };
}

/**
 * Generate a service page variant
 */
async function generateServiceVariant(
    request: ContentRequest,
    variantStyle: VariantStyle
): Promise<GeneratedContent> {
    let prompt: string;

    switch (variantStyle) {
        case 'seo-focused':
            prompt = buildSEOFocusedPrompt(request);
            break;
        case 'story-driven':
            prompt = buildStoryDrivenPrompt(request);
            break;
        case 'problem-solution':
            prompt = buildProblemSolutionPrompt(request);
            break;
    }

    const { object } = await generateObject({
        model: google('gemini-1.5-flash'),
        schema: servicePageSchema,
        prompt,
    });

    const wordCount = object.content.split(/\s+/).length;
    const seoScore = calculateSEOScore(object.content, object.metaTitle, object.metaDescription);
    const readingTime = calculateReadingTime(wordCount);

    return {
        title: object.title,
        slug: object.slug || slugify(object.title),
        content: object.content,
        excerpt: object.heroDescription,
        metaTitle: object.metaTitle,
        metaDescription: object.metaDescription,
        readingTime,
        wordCount,
        seoScore,
    };
}

/**
 * Generate a location page variant
 */
async function generateLocationVariant(
    request: ContentRequest,
    variantStyle: VariantStyle
): Promise<GeneratedContent> {
    let prompt: string;

    switch (variantStyle) {
        case 'seo-focused':
            prompt = buildSEOFocusedPrompt(request);
            break;
        case 'story-driven':
            prompt = buildStoryDrivenPrompt(request);
            break;
        case 'problem-solution':
            prompt = buildProblemSolutionPrompt(request);
            break;
    }

    const { object } = await generateObject({
        model: google('gemini-1.5-flash'),
        schema: locationPageSchema,
        prompt,
    });

    const wordCount = object.content.split(/\s+/).length;
    const seoScore = calculateSEOScore(object.content, object.metaTitle, object.metaDescription);
    const readingTime = calculateReadingTime(wordCount);

    return {
        title: object.title,
        slug: object.slug || slugify(object.title),
        content: object.content,
        excerpt: object.heroDescription,
        metaTitle: object.metaTitle,
        metaDescription: object.metaDescription,
        readingTime,
        wordCount,
        seoScore,
    };
}

/**
 * Generate all three content variants in parallel
 */
async function generateAllVariants(
    request: ContentRequest
): Promise<Record<VariantStyle, GeneratedContent>> {
    const variantStyles: VariantStyle[] = ['seo-focused', 'story-driven', 'problem-solution'];

    // Generate variants in parallel for efficiency
    const results = await Promise.allSettled(
        variantStyles.map((style) => {
            switch (request.type) {
                case 'blog':
                    return generateBlogVariant(request, style);
                case 'service':
                    return generateServiceVariant(request, style);
                case 'location':
                    return generateLocationVariant(request, style);
                default:
                    return generateBlogVariant(request, style);
            }
        })
    );

    const getReason = (r: PromiseSettledResult<GeneratedContent>): GeneratedContent =>
        r.status === 'rejected' ? (r.reason as GeneratedContent) : r.value;
    const variants: Record<VariantStyle, GeneratedContent> = {
        'seo-focused': results[0].status === 'fulfilled' ? results[0].value : getReason(results[0]),
        'story-driven': results[1].status === 'fulfilled' ? results[1].value : getReason(results[1]),
        'problem-solution': results[2].status === 'fulfilled' ? results[2].value : getReason(results[2]),
    };

    return variants;
}

/**
 * Convert generated content to ContentVariant
 */
function toContentVariant(
    generated: GeneratedContent,
    itemId: string,
    variantNumber: 1 | 2 | 3,
    variantStyle: VariantStyle
): ContentVariant {
    return {
        id: `var_${Date.now()}_${variantNumber}_${Math.random().toString(36).substring(2, 9)}`,
        contentItemId: itemId,
        variantNumber,
        title: generated.title,
        slug: generated.slug,
        content: generated.content,
        excerpt: generated.excerpt,
        metaTitle: generated.metaTitle,
        metaDescription: generated.metaDescription,
        readingTime: generated.readingTime,
        variantStyle,
        wordCount: generated.wordCount,
        seoScore: generated.seoScore,
        createdAt: new Date(),
        isSelected: false,
    };
}

// ============================================================
// MAIN SERVER ACTION
// ============================================================

/**
 * Generate content variants for a given content request
 *
 * This is the main server action that:
 * 1. Validates the content request
 * 2. Generates three AI content variants in parallel
 * 3. Creates a content item in Google Sheets
 * 4. Saves all variants to Google Sheets
 * 5. Returns the complete content item with variants
 *
 * @param request - The content generation request
 * @returns The created ContentItem with all generated variants
 *
 * @example
 * ```ts
 * const result = await generateContentVariants({
 *   type: 'blog',
 *   topic: 'Local SEO tips for small businesses',
 *   keywords: ['local SEO', 'small business', 'Google Maps'],
 *   targetAudience: 'Small business owners',
 *   tone: 'professional',
 *   targetLength: 1000
 * });
 * ```
 */
export async function generateContentVariants(request: ContentRequest): Promise<ContentItem> {
    try {
        // Validate required fields
        if (!request.type) {
            throw new Error('Content type is required');
        }
        if (!request.topic) {
            throw new Error('Topic is required');
        }
        if (!request.keywords || request.keywords.length === 0) {
            throw new Error('At least one keyword is required');
        }

        // Validate content type
        const validTypes: ContentType[] = ['blog', 'service', 'location'];
        if (!validTypes.includes(request.type)) {
            throw new Error(`Invalid content type. Must be one of: ${validTypes.join(', ')}`);
        }

        console.log(`[Content Generation] Starting generation for ${request.type}: ${request.topic}`);

        // Generate all three variants in parallel
        const generatedVariants = await generateAllVariants(request);

        // Create base slug from topic
        const baseSlug = slugify(request.topic);

        // Create content item first (to get the ID)
        const itemId = await createContentItem({
            type: request.type,
            slug: baseSlug,
            title: request.topic,
            status: 'draft',
            metadata: {
                keywords: request.keywords,
                location: request.location,
                targetAudience: request.targetAudience,
                tone: request.tone,
                targetLength: request.targetLength,
            },
        });

        // Convert generated variants to ContentVariant objects
        const variants: ContentVariant[] = [
            toContentVariant(generatedVariants['seo-focused'], itemId, 1, 'seo-focused'),
            toContentVariant(generatedVariants['story-driven'], itemId, 2, 'story-driven'),
            toContentVariant(generatedVariants['problem-solution'], itemId, 3, 'problem-solution'),
        ];

        // Save all variants to Google Sheets
        await saveVariants(itemId, variants);

        // Select the SEO-focused variant as the default selected one
        await updateSelectedVariant(itemId, variants[0].id);

        console.log(`[Content Generation] Successfully generated ${variants.length} variants for item ${itemId}`);

        // Return the complete content item with variants
        return {
            id: itemId,
            type: request.type,
            slug: baseSlug,
            title: request.topic,
            status: 'reviewing',
            variants,
            selectedVariantId: variants[0].id,
            metadata: {
                keywords: request.keywords,
                location: request.location,
                targetAudience: request.targetAudience,
                tone: request.tone,
                targetLength: request.targetLength,
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    } catch (error) {
        console.error('[Content Generation] Error:', error);
        throw new Error(`Failed to generate content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Re-generate a specific variant for an existing content item
 *
 * @param itemId - The content item ID
 * @param variantStyle - The style of variant to regenerate
 * @param additionalContext - Optional additional context for regeneration
 * @returns The updated ContentVariant
 */
export async function regenerateVariant(
    itemId: string,
    variantStyle: VariantStyle,
    additionalContext?: string
): Promise<ContentVariant> {
    try {
        // This would require fetching the original content item
        // For now, we'll provide a simplified implementation
        const { getContentItem } = await import('@/lib/google-sheets');
        const item = await getContentItem(itemId);

        if (!item) {
            throw new Error(`Content item ${itemId} not found`);
        }

        // Create a new content request based on the item
        const request: ContentRequest = {
            type: item.type,
            topic: item.title,
            keywords: item.metadata.keywords,
            location: item.metadata.location,
            targetAudience: item.metadata.targetAudience,
            tone: item.metadata.tone,
            targetLength: item.metadata.targetLength,
            additionalContext,
        };

        // Generate the specific variant
        let generated: GeneratedContent;
        switch (item.type) {
            case 'blog':
                generated = await generateBlogVariant(request, variantStyle);
                break;
            case 'service':
                generated = await generateServiceVariant(request, variantStyle);
                break;
            case 'location':
                generated = await generateLocationVariant(request, variantStyle);
                break;
        }

        // Determine the variant number based on style
        const variantNumber: 1 | 2 | 3 =
            variantStyle === 'seo-focused' ? 1 : variantStyle === 'story-driven' ? 2 : 3;

        // Create the variant
        const variant = toContentVariant(generated, itemId, variantNumber, variantStyle);

        // Save the new variant
        await saveVariants(itemId, [variant]);

        return variant;
    } catch (error) {
        console.error('[Content Generation] Error regenerating variant:', error);
        throw new Error(`Failed to regenerate variant: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
