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
            // TODO: Replace NEXT_PUBLIC_CALENDLY_URL with real booking link in .env
            const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || null
            return {
                message: calendlyUrl
                    ? 'Book your call here: ' + calendlyUrl
                    : 'To schedule a call, please contact us directly at hello@digital-helper.com',
                url: calendlyUrl,
            }
        }
    }),
    analyzeWebsite: tool({
        description: 'Analyze a provided website URL for improvements',
        parameters: analyzeWebsiteSchema,
                // @ts-expect-error: Tool type inference mismatch with Zod
        execute: async ({ url }: z.infer<typeof analyzeWebsiteSchema>) => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
                const response = await fetch(baseUrl + '/api/seo-analysis', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url }),
                })

                if (!response.ok) throw new Error('API returned ' + response.status)

                const data = await response.json()
                return {
                    url,
                    score: data.overallScore ?? data.score ?? 0,
                    issues: data.quickWins ?? data.issues ?? [],
                    opportunity: data.summary ?? 'Analysis complete.',
                    disclaimer: undefined,
                }
            } catch (error) {
                return {
                    url,
                    score: null,
                    issues: [],
                    opportunity: null,
                    disclaimer: 'Live analysis unavailable. Contact us for a free manual audit.',
                }
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
                    { name: 'Starter', price: '$2,500', features: ['5-page website', 'Mobile responsive', 'Contact form', 'Basic SEO'] },
                    { name: 'Professional', price: '$5,000', features: ['10-page website', 'Custom design', 'Blog system', 'Advanced SEO', 'Analytics'] },
                    { name: 'Enterprise', price: '$10,000+', features: ['Unlimited pages', 'Custom features', 'E-commerce', 'Priority support'] },
                ],
                seo: [
                    { name: 'Local SEO', price: '$750/mo', features: ['Google Business Profile optimization', 'Local citations', 'Monthly reporting'] },
                    { name: 'Growth SEO', price: '$1,500/mo', features: ['Everything in Local', 'Content marketing', 'Link building', 'Competitor analysis'] },
                ],
                automation: [
                    { name: 'Starter', price: '$500 setup', features: ['AI chatbot', 'Basic automation', 'Email integration'] },
                    { name: 'Pro', price: '$1,500 setup', features: ['Custom AI agent', 'CRM integration', 'Advanced workflows'] },
                ],
                maintenance: [
                    { name: 'Basic', price: '$150/mo', features: ['Security updates', 'Weekly backups', 'Bug fixes'] },
                    { name: 'Premium', price: '$350/mo', features: ['Everything in Basic', 'Content updates', 'Performance optimization', 'Priority support'] },
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
