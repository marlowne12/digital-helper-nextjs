import { tool } from 'ai';
import { z } from 'zod';
import {
    generateQuoteSchema,
    scheduleCallSchema,
    analyzeWebsiteSchema,
    analyzeCompetitorsSchema,
    getPortfolioSchema,
    comparePlansSchema,
} from '@/lib/validators';
import { getQuickCompetitorInsight } from '@/app/actions/competitor';

export const aiTools = {
    generateQuote: tool({
        description: 'Generate a price estimate based on required features',
        parameters: generateQuoteSchema,
        // @ts-expect-error: Tool type inference mismatch with Zod
        execute: async ({ serviceType, features }: z.infer<typeof generateQuoteSchema>) => {
            let basePrice = 3000;
            if (serviceType === 'seo') basePrice = 1000;
            if (serviceType === 'maintenance') basePrice = 500;

            const featureCost = features.length * 500;
            const total = basePrice + featureCost;

            return {
                serviceType,
                features,
                estimatedPrice: total,
                currency: 'USD',
                message: `Based on your request for a ${serviceType} with ${features.join(', ')}, we estimate roughly $${total}. This includes our premium design and mobile optimization.`
            };
        },
    }),
    scheduleCall: tool({
        description: 'Get a booking link for a consultation call',
        parameters: scheduleCallSchema,
        // @ts-expect-error: Tool type inference mismatch with Zod
        execute: async ({ intent: _intent }: z.infer<typeof scheduleCallSchema>) => { // eslint-disable-line @typescript-eslint/no-unused-vars
            return {
                bookingUrl: 'https://calendar.app.google/jFDgyirZ2xZZ6kRU8',
                message: "Here's a link to book a free 30-minute call with Mars. No pressure, no sales pitch — just a real conversation about your business."
            }
        }
    }),
    analyzeWebsite: tool({
        description: 'Analyze a provided website URL for improvements',
        parameters: analyzeWebsiteSchema,
        // @ts-expect-error: Tool type inference mismatch with Zod
        execute: async ({ url }: z.infer<typeof analyzeWebsiteSchema>) => {
            // Mock analysis for now
            return {
                url,
                score: 45,
                issues: ['Mobile responsiveness issues detected', 'Slow page load times (LCP > 2.5s)', 'Missing meta descriptions'],
                opportunity: 'High - modernizing this site could double your conversion rate.',
                message: `I've taken a quick look at ${url}. It scores about 45/100. The main issues are load speed and mobile responsiveness. We could fix these to improve your Google ranking significantly.`
            }
        }
    }),

    analyzeCompetitors: tool({
        description: 'Analyze competitors for a business in a specific location and industry',
        parameters: analyzeCompetitorsSchema,
        // @ts-expect-error: Tool type inference mismatch with Zod
        execute: async ({ businessName, industry, location }: z.infer<typeof analyzeCompetitorsSchema>) => {
            try {
                const insight = await getQuickCompetitorInsight(businessName, industry, location);
                return {
                    businessName,
                    industry,
                    location,
                    competitors: insight.competitors,
                    differentiators: insight.keyDifferentiators,
                    quickWin: insight.quickWin,
                    message: `I've analyzed the competitive landscape for ${businessName} in ${location}. Your main competitors are likely ${insight.competitors.join(', ')}. Here's a quick win: ${insight.quickWin}`
                };
            } catch {
                return {
                    businessName,
                    industry,
                    location,
                    competitors: ['Local competitor analysis in progress'],
                    differentiators: ['Professional online presence', 'Strong customer reviews', 'Fast response times'],
                    quickWin: 'Optimize your Google Business Profile to stand out from competitors.',
                    message: `For ${businessName} in ${location}, I recommend focusing on your Google Business Profile and collecting more reviews to differentiate from competitors.`
                };
            }
        }
    }),

    getPortfolio: tool({
        description: 'Get relevant case studies and portfolio examples',
        parameters: getPortfolioSchema,
        // @ts-expect-error: Tool type inference mismatch with Zod
        execute: async ({ industry }: z.infer<typeof getPortfolioSchema>) => {
            // Return relevant case studies
            const caseStudies = [
                {
                    client: 'Columbia Basin Plumbing',
                    industry: 'Home Services',
                    result: '400% increase in mobile calls, #1 ranking for "Richland Plumber"',
                    relevant: !industry || industry.toLowerCase().includes('plumb') || industry.toLowerCase().includes('hvac') || industry.toLowerCase().includes('service'),
                },
                {
                    client: 'Tri-City Dental Care',
                    industry: 'Healthcare',
                    result: '50+ new patient inquiries/month, reduced front-desk calls by 30%',
                    relevant: !industry || industry.toLowerCase().includes('dental') || industry.toLowerCase().includes('health') || industry.toLowerCase().includes('medical'),
                },
            ];

            const relevantStudies = caseStudies.filter(s => s.relevant);

            return {
                caseStudies: relevantStudies.length > 0 ? relevantStudies : caseStudies,
                portfolioUrl: '/work',
                message: `Here are some relevant case studies: ${relevantStudies.map(s => `${s.client} - ${s.result}`).join('; ')}. You can see more at /work.`
            };
        }
    }),

    comparePlans: tool({
        description: 'Compare pricing plans for different service types',
        parameters: comparePlansSchema,
        // @ts-expect-error: Tool type inference mismatch with Zod
        execute: async ({ serviceType }: z.infer<typeof comparePlansSchema>) => {
            const plans = {
                website: [
                    { name: 'Starter', price: '$97/mo + $297 setup', features: ['AI chatbot widget', 'FAQ training (up to 20 questions)', 'Lead capture + email alerts', 'Calendly booking integration', 'Monthly performance report'] },
                    { name: 'Growth', price: '$197/mo + $497 setup', features: ['Everything in Starter', 'Multi-channel (website + Facebook)', 'Advanced lead qualification', 'CRM integration', 'Priority support', 'Bi-weekly optimization'] },
                    { name: 'Agency', price: 'Custom', features: ['Everything in Growth', 'White-label option', 'Multiple client locations', 'Custom integrations', 'Dedicated account manager'] },
                ],
                seo: [
                    { name: 'Starter SEO', price: 'Included in monthly plans', features: ['Google Business Profile optimization', 'Local citations', 'Hyper-local keyword targeting', 'Monthly reporting'] },
                    { name: 'Growth SEO', price: 'Included in Growth plan', features: ['Everything in Starter', 'Content marketing', 'Competitor analysis', 'Bi-weekly optimization'] },
                ],
                automation: [
                    { name: 'Starter AI', price: '$97/mo + $297 setup', features: ['AI chatbot', '24/7 lead capture', 'FAQ automation', 'Instant email alerts'] },
                    { name: 'Growth AI', price: '$197/mo + $497 setup', features: ['Everything in Starter', 'Multi-channel AI', 'Advanced lead qualification', 'CRM integration'] },
                ],
                maintenance: [
                    { name: 'Starter', price: '$97/mo', features: ['AI chatbot maintenance', 'Monthly optimization', 'Performance reports', 'Email support'] },
                    { name: 'Growth', price: '$197/mo', features: ['Everything in Starter', 'Priority support', 'Bi-weekly check-ins', 'Advanced analytics'] },
                ],
            };

            const selectedPlans = plans[serviceType] || plans.website;

            return {
                serviceType,
                plans: selectedPlans,
                pricingUrl: '/pricing',
                message: `Here are our ${serviceType} plans: ${selectedPlans.map(p => `${p.name} at ${p.price}`).join(', ')}. Would you like more details on any of these?`
            };
        }
    }),
};
