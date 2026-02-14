import { describe, it, expect } from 'vitest';
import {
    pricingRequestSchema,
    serviceTypeSchema,
    generateQuoteSchema,
    analyzeWebsiteSchema,
    analyzeCompetitorsSchema
} from './validators';

describe('validators', () => {
    describe('pricingRequestSchema', () => {
        it('should validate valid theme', () => {
            expect(pricingRequestSchema.safeParse({ theme: 'purple' }).success).toBe(true);
        });
        it('should validate empty object', () => {
            expect(pricingRequestSchema.safeParse({}).success).toBe(true);
        });
    });

    describe('serviceTypeSchema', () => {
        it('should validate valid service types', () => {
            expect(serviceTypeSchema.safeParse('website').success).toBe(true);
            expect(serviceTypeSchema.safeParse('seo').success).toBe(true);
            expect(serviceTypeSchema.safeParse('automation').success).toBe(true);
            expect(serviceTypeSchema.safeParse('maintenance').success).toBe(true);
        });
        it('should reject invalid service types', () => {
            expect(serviceTypeSchema.safeParse('invalid').success).toBe(false);
        });
    });

    describe('generateQuoteSchema', () => {
        it('should validate valid quote request', () => {
            const valid = { serviceType: 'website', features: ['blog'] };
            expect(generateQuoteSchema.safeParse(valid).success).toBe(true);
        });
        it('should reject missing features', () => {
            const invalid = { serviceType: 'website', features: [] };
            expect(generateQuoteSchema.safeParse(invalid).success).toBe(false);
        });
    });

    describe('analyzeWebsiteSchema', () => {
        it('should validate valid URL', () => {
            expect(analyzeWebsiteSchema.safeParse({ url: 'https://example.com' }).success).toBe(true);
        });
        it('should reject invalid URL', () => {
            expect(analyzeWebsiteSchema.safeParse({ url: 'not-a-url' }).success).toBe(false);
        });
    });

    describe('analyzeCompetitorsSchema', () => {
        it('should validate valid competitor request', () => {
            const valid = {
                businessName: 'My Business',
                industry: 'Tech',
                location: 'Richland'
            };
            expect(analyzeCompetitorsSchema.safeParse(valid).success).toBe(true);
        });
        it('should reject missing fields', () => {
            expect(analyzeCompetitorsSchema.safeParse({ businessName: 'Test' }).success).toBe(false);
        });
    });
});
