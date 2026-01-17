"use client"

import React, { useState, useEffect } from 'react';
import { Check, Sparkles, Loader2 } from 'lucide-react';
import { PricingTier, PricingData } from '@/types';

export const Pricing: React.FC = () => {
    const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPricing = async () => {
            try {
                const response = await fetch('/api/pricing');
                if (!response.ok) throw new Error('Failed to fetch pricing');
                const data: PricingData = await response.json();
                setPricingTiers(data.tiers);
            } catch (err) {
                console.error('Pricing Fetch Error:', err);
                setError('Could not load dynamic pricing. Falling back to default packages.');
                // Fallback static data
                setPricingTiers([
                    {
                        id: "web-design",
                        name: "Web Design",
                        price: 1999,
                        period: "one-time",
                        features: [
                            "Custom 5-Page Website",
                            "Mobile-First Responsive Design",
                            "Basic SEO Optimization",
                            "Contact Form Integration",
                            "Google Analytics Setup",
                            "1 Month Support"
                        ],
                        cta: "Get Started",
                        highlighted: false
                    },
                    {
                        id: "growth-package",
                        name: "Growth Package",
                        price: 3999,
                        period: "one-time",
                        features: [
                            "10-Page Custom Website",
                            "Advanced SEO & Schema",
                            "AI Chatbot Integration",
                            "Blog Setup (3 Posts)",
                            "Google Business Optimization",
                            "Email Marketing Setup",
                            "3 Months Support"
                        ],
                        cta: "Most Popular",
                        highlighted: true
                    },
                    {
                        id: "ai-automation",
                        name: "AI Systems",
                        price: 997,
                        period: "month",
                        features: [
                            "24/7 AI Sales Agent",
                            "Automated Lead Gen",
                            "CRM Integration",
                            "Review Management",
                            "Missed Call Text Back",
                            "Weekly Performance Reports",
                            "Dedicated Account Manager"
                        ],
                        cta: "Automate Now",
                        highlighted: false
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchPricing();
    }, []);

    return (
        <section className="py-24 pt-32 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 relative overflow-hidden min-h-screen">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCIpLz48L3N2Zz4=')] opacity-30" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300 text-sm font-medium">Simple, Transparent Pricing</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                            Choose Your Package
                        </span>
                    </h2>

                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        One-time investment. Lifetime results. Pick the package that fits your business needs.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                        <p className="text-slate-400">Loading dynamic packages...</p>
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="mb-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-300 text-sm text-center max-w-lg mx-auto">
                                {error}
                            </div>
                        )}
                        {/* Pricing Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {pricingTiers.map((tier, index) => (
                                <div
                                    key={tier.id}
                                    className={`
                relative p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 group
                ${tier.highlighted
                                            ? 'bg-gradient-to-b from-purple-900/40 to-slate-900/40 border-purple-500/50 shadow-2xl shadow-purple-500/20'
                                            : 'bg-slate-900/40 border-slate-800 hover:border-purple-500/30'
                                        }
              `}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Highlighted badge */}
                                    {tier.highlighted && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <div className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm font-bold">
                                                Most Popular
                                            </div>
                                        </div>
                                    )}

                                    {/* Tier name */}
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                                                ${tier.price.toLocaleString()}
                                            </span>
                                            <span className="text-slate-500">{tier.period === 'one-time' ? 'one-time' : `/${tier.period}`}</span>
                                        </div>
                                    </div>

                                    {/* Features list */}
                                    <ul className="space-y-4 mb-8">
                                        {tier.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className={`mt-0.5 p-1 rounded-full ${tier.highlighted ? 'bg-purple-500/20' : 'bg-slate-800'}`}>
                                                    <Check className={`w-4 h-4 ${tier.highlighted ? 'text-purple-400' : 'text-slate-400'}`} />
                                                </div>
                                                <span className="text-slate-300 text-sm leading-relaxed">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <button
                                        className={`
                  w-full py-4 px-6 rounded-xl font-bold transition-all duration-300
                  ${tier.highlighted
                                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70'
                                                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                                            }
                `}
                                    >
                                        {tier.cta}
                                    </button>

                                    {/* Hover effect overlay */}
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-slate-400 mb-4">Need a custom solution?</p>
                    <button className="px-8 py-3 rounded-lg border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-colors">
                        Contact Us for Enterprise Pricing
                    </button>
                </div>
            </div>
        </section>
    );
};
