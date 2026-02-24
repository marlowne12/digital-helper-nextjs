"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Check,
    ArrowRight,
    Zap,
    Star,
    Shield,
    Phone,
    Clock,
    Sparkles
} from 'lucide-react'

const tiers = [
    {
        name: "Starter",
        description: "For businesses just getting started online",
        price: "1,500",
        period: "one-time",
        highlight: false,
        features: [
            "5-page professional website",
            "Mobile-responsive design",
            "Basic SEO setup",
            "Contact form integration",
            "1 month support"
        ],
        cta: "Get Started",
        href: "/contact?tier=starter"
    },
    {
        name: "Growth",
        description: "For businesses ready to dominate locally",
        price: "800",
        period: "/month",
        highlight: true,
        badge: "Most Popular",
        features: [
            "Everything in Starter",
            "Monthly SEO optimization",
            "Google Business Profile",
            "Review management",
            "24/7 AI chat assistant",
            "Monthly analytics reports",
            "Priority support"
        ],
        cta: "Start Growing",
        href: "/contact?tier=growth"
    },
    {
        name: "Enterprise",
        description: "For high-volume, multi-location businesses",
        price: "Custom",
        period: "",
        highlight: false,
        features: [
            "Everything in Growth",
            "Custom integrations",
            "Multi-location support",
            "Advanced automation",
            "Dedicated account manager",
            "Custom reporting",
            "API access"
        ],
        cta: "Contact Sales",
        href: "/contact?tier=enterprise"
    }
]

const guarantees = [
    { icon: Shield, text: "30-day money-back guarantee" },
    { icon: Clock, text: "Results in 30 days or we work free" },
    { icon: Star, text: "No long-term contracts" },
    { icon: Phone, text: "Real humans answer the phone" }
]

export function ServicePricingTeaser() {
    return (
        <section className="relative py-24 lg:py-32 bg-zinc-950 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold mb-6">
                            <Zap className="w-4 h-4" />
                            Transparent Pricing
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Simple Pricing.{' '}
                            <span className="text-gradient">Real Results.</span>
                        </h2>
                        <p className="text-lg text-zinc-400">
                            No hidden fees. No confusing packages. Just pick your level and start growing.
                        </p>
                    </motion.div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`
                                relative p-6 lg:p-8 rounded-2xl
                                ${tier.highlight 
                                    ? 'bg-gradient-to-b from-purple-500/20 to-zinc-900/80 border-2 border-purple-500/40 shadow-xl shadow-purple-500/10' 
                                    : 'bg-zinc-900/50 border border-white/10'
                                }
                                ${tier.highlight ? 'md:-mt-4 md:mb-4 md:scale-105' : ''}
                            `}
                        >
                            {/* Badge */}
                            {tier.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-500 text-white text-xs font-bold shadow-lg">
                                        <Sparkles className="w-3 h-3" />
                                        {tier.badge}
                                    </div>
                                </div>
                            )}

                            {/* Tier Info */}
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                                <p className="text-sm text-zinc-400">{tier.description}</p>
                            </div>

                            {/* Price */}
                            <div className="text-center mb-6">
                                <div className="flex items-baseline justify-center gap-1">
                                    {tier.price !== "Custom" && <span className="text-2xl text-zinc-400">$</span>}
                                    <span className="text-5xl font-bold text-white">{tier.price}</span>
                                    <span className="text-zinc-400">{tier.period}</span>
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm text-zinc-300">
                                        <Check className={`w-4 h-4 flex-shrink-0 ${tier.highlight ? 'text-purple-400' : 'text-green-500'}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Link
                                href={tier.href}
                                className={`
                                    w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold
                                    transition-all duration-300
                                    ${tier.highlight 
                                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-105 shadow-lg shadow-purple-500/25' 
                                        : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                                    }
                                `}
                            >
                                {tier.cta}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Guarantees */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex flex-wrap justify-center gap-6 lg:gap-10"
                >
                    {guarantees.map((guarantee, index) => {
                        const Icon = guarantee.icon
                        return (
                            <div key={index} className="flex items-center gap-2 text-sm text-zinc-400">
                                <Icon className="w-4 h-4 text-green-500" />
                                {guarantee.text}
                            </div>
                        )
                    })}
                </motion.div>

                {/* Custom Quote CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-zinc-400 mb-4">
                        Need something specific? We build custom solutions too.
                    </p>
                    <Link
                        href="/pricing"
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                    >
                        View Full Pricing Details
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
