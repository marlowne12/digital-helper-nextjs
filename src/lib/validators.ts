import { z } from 'zod';

export const pricingRequestSchema = z.object({
    theme: z.string().optional(),
});

export const serviceTypeSchema = z.enum(['website', 'seo', 'automation', 'maintenance']);

export const generateQuoteSchema = z.object({
    serviceType: serviceTypeSchema,
    features: z.array(z.string()).min(1, 'At least one feature is required'),
});

export const scheduleCallSchema = z.object({
    intent: z.string().min(1, 'Intent is required'),
});

export const analyzeWebsiteSchema = z.object({
    url: z.string().url('Invalid URL format'),
});

export const analyzeCompetitorsSchema = z.object({
    businessName: z.string().min(1, 'Business name is required'),
    industry: z.string().min(1, 'Industry is required'),
    location: z.string().min(1, 'Location is required'),
});

export const getPortfolioSchema = z.object({
    industry: z.string().optional().describe('Industry to filter portfolio by'),
});

export const comparePlansSchema = z.object({
    serviceType: serviceTypeSchema,
});

export const leadScraperSchema = z.object({
    apiKey: z.string().min(1, 'API Key is required'),
    query: z.string().min(1, 'Query is required'),
    location: z.string().min(1, 'Location is required'),
    maxResults: z.number().int().min(1).max(60).default(20),
    filters: z.object({
        noWebsite: z.boolean().default(false),
        noSSL: z.boolean().default(false),
        lowReviews: z.boolean().default(false),
        poorRating: z.boolean().default(false),
    }).default({
        noWebsite: false,
        noSSL: false,
        lowReviews: false,
        poorRating: false,
    }),
});
