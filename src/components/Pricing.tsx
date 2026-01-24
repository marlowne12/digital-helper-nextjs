"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles, Loader2, ArrowRight } from 'lucide-react'
import { PricingTier, PricingData } from '@/types'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Pricing() {
    const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([])
    const [loading, setLoading] = useState(true)
    const [, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPricing = async () => {
            try {
                const response = await fetch('/api/pricing')
                if (!response.ok) throw new Error('Failed to fetch pricing')
                const data: PricingData = await response.json()
                setPricingTiers(data.tiers)
            } catch (err) {
                console.error('Pricing Fetch Error:', err)
                setError('Could not load dynamic pricing. Falling back to default packages.')
                setPricingTiers([
                    {
                        id: "web-design",
                        name: "Web Transformation",
                        price: 1999,
                        period: "one-time",
                        features: [
                            "Custom Next.js Frontend",
                            "Extreme Load Speed (<1s)",
                            "Mobile-First Architecture",
                            "Google Business Integration",
                            "Core Web Vitals Optimized",
                            "1 Month Priority Support"
                        ],
                        cta: "Get Started",
                        highlighted: false
                    },
                    {
                        id: "growth-package",
                        name: "Empire Builder",
                        price: 3999,
                        period: "one-time",
                        features: [
                            "Full 10-Page Conversion Site",
                            "Hyper-Local SEO Strategy",
                            "AI Content Generation",
                            "Lead Magnet System",
                            "GMB Authority Stacking",
                            "Review Generation Setup",
                            "3 Months Strategy Support"
                        ],
                        cta: "Dominant Strategy",
                        highlighted: true
                    },
                    {
                        id: "ai-automation",
                        name: "AI Systems",
                        price: 997,
                        period: "month",
                        features: [
                            "24/7 AI Receptionist",
                            "Automated Lead Scoring",
                            "CRM & Email Workflows",
                            "Missed Call Text Back",
                            "Sentiment Recognition",
                            "Weekly Growth Reports",
                            "Dedicated Tech Lead"
                        ],
                        cta: "Automate Now",
                        highlighted: false
                    }
                ])
            } finally {
                setLoading(false)
            }
        }

        fetchPricing()
    }, [])

    return (
        <section className="py-24 bg-background-primary relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent-secondary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        Pick Your Weapon
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Investment Packages</h2>
                    <p className="text-zinc-400 text-lg">Transparent pricing for Tri-Cities businesses ready to scale.</p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader2 className="w-12 h-12 text-accent-primary animate-spin mb-4" />
                        <p className="text-zinc-500 font-medium">Fetching the latest rates...</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pricingTiers.map((tier, index) => (
                            <motion.div
                                key={tier.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`glass p-10 rounded-[2.5rem] flex flex-col relative group transition-all duration-500 ${tier.highlighted ? 'border-accent-primary/30 shadow-glow-md' : 'hover:border-white/10'}`}
                            >
                                {tier.highlighted && (
                                    <div className="absolute top-0 right-10 -translate-y-1/2 bg-accent-gradient px-4 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-white">${tier.price.toLocaleString()}</span>
                                        <span className="text-zinc-500 text-sm font-medium">
                                            {tier.period === 'one-time' ? '' : `/${tier.period}`}
                                        </span>
                                    </div>
                                    {tier.period === 'one-time' && <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-tighter mt-1">One-Time Investment</div>}
                                </div>

                                <ul className="space-y-4 mb-10 border-t border-white/[0.05] pt-8 flex-1">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-zinc-400">
                                            <div className="w-5 h-5 rounded-full bg-accent-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="w-3 h-3 text-accent-primary" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    asChild
                                    className={`h-14 rounded-2xl font-bold text-lg group ${tier.highlighted ? 'btn-primary' : 'btn-secondary'}`}
                                >
                                    <Link href="/contact" className="flex items-center gap-2">
                                        {tier.cta}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
