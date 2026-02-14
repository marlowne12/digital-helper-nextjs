import { PricingData, PricingTier } from '@/types';

const defaultTiers: PricingTier[] = [
    {
        id: 'starter',
        name: 'Web Design',
        price: 1999,
        period: 'one-time',
        features: [
            '5-page responsive website',
            'Mobile-first design',
            'Basic SEO optimization',
            'Contact form integration',
            '30 days support'
        ],
        cta: 'Get Started'
    },
    {
        id: 'professional',
        name: 'Growth Package',
        price: 3999,
        period: 'one-time',
        features: [
            'Up to 10 pages',
            'Custom design & branding',
            'Advanced SEO optimization',
            'Google Business integration',
            'AI chatbot integration',
            'Analytics dashboard',
            '90 days support'
        ],
        highlighted: true,
        cta: 'Most Popular'
    },
    {
        id: 'enterprise',
        name: 'AI Systems',
        price: 997,
        period: 'month',
        features: [
            '24/7 AI Sales Agent',
            'Automated Lead Gen',
            'CRM Integration',
            'Review Management',
            'Missed Call Text Back',
            'Weekly Performance Reports',
            'Dedicated Account Manager'
        ],
        cta: 'Automate Now'
    }
];

export const getPricingTiers = (theme?: string): PricingData => {
    const customizedTiers = defaultTiers.map(tier => ({
        ...tier,
        highlighted: theme === 'purple' ? tier.highlighted : tier.id === 'professional'
    }));

    return {
        tiers: customizedTiers,
        currency: 'USD',
        disclaimer: 'All prices are subject to change. Custom packages available.'
    };
};
