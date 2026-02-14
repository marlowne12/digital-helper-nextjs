import { describe, it, expect } from 'vitest';
import { getPricingTiers } from './pricingService';

describe('pricingService', () => {
    it('should return default tiers', () => {
        const data = getPricingTiers();
        expect(data.tiers).toHaveLength(3);
        expect(data.currency).toBe('USD');
    });

    it('should highlight the professional plan by default', () => {
        const data = getPricingTiers();
        const prof = data.tiers.find(t => t.id === 'professional');
        expect(prof?.highlighted).toBe(true);
    });

    it('should handle custom themes', () => {
        const data = getPricingTiers('purple');
        expect(data.tiers).toBeDefined();
        // The current logic in pricingService.ts:
        // highlighted: theme === 'purple' ? tier.highlighted : tier.id === 'professional'
        // Since defaultTiers has highlighted: true for professional, it should still be true.
        const prof = data.tiers.find(t => t.id === 'professional');
        expect(prof?.highlighted).toBe(true);
    });
});
