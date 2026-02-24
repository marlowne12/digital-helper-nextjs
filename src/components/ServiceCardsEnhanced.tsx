"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Globe,
    Search,
    Bot,
    Users,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    TrendingUp,
    Clock,
    DollarSign,
    Star,
    Zap,
    Phone,
    ChevronDown,
    Play,
    Target,
    AlertTriangle,
    Sparkles
} from 'lucide-react'

interface ServiceMetric {
    value: string
    label: string
    icon: React.ElementType
}

interface ServiceData {
    id: string
    icon: React.ElementType
    title: string
    tagline: string
    problem: string
    solution: string
    href: string
    color: 'purple' | 'blue' | 'green' | 'orange' | 'cyan'
    metrics: ServiceMetric[]
    features: string[]
    testimonial?: {
        quote: string
        author: string
        business: string
        result: string
    }
    priceHint: string
    popular?: boolean
}

const services: ServiceData[] = [
    {
        id: 'web-design',
        icon: Globe,
        title: "High-Performance Websites",
        tagline: "Lightning-fast sites that convert",
        problem: "Your website takes 5+ seconds to load. 53% of visitors leave. Every second costs you customers.",
        solution: "We build Next.js sites that load in under 1 second. Mobile-first, SEO-optimized, designed to convert visitors into leads.",
        href: "/services/web-design",
        color: 'purple',
        metrics: [
            { value: "0.8s", label: "Avg Load Time", icon: Clock },
            { value: "400%", label: "More Mobile Calls", icon: Phone },
            { value: "347%", label: "Lead Increase", icon: TrendingUp }
        ],
        features: [
            "Next.js/React Performance",
            "Mobile-First Design",
            "Built-in SEO",
            "Click-to-Call CTAs",
            "Analytics Dashboard"
        ],
        testimonial: {
            quote: "Our old site took 8 seconds to load. Now it's instant. Calls doubled.",
            author: "Ryan M.",
            business: "Columbia Basin Plumbing",
            result: "+400% mobile calls"
        },
        priceHint: "Starting at $2,500",
        popular: true
    },
    {
        id: 'seo',
        icon: Search,
        title: "Hyper-Local SEO",
        tagline: "Dominate Tri-Cities search results",
        problem: "When locals search for your service, they find your competitors first. You're invisible on Google Maps.",
        solution: "We optimize your Google Business Profile, build local citations, and create content that ranks for the searches that matter in your area.",
        href: "/services/seo",
        color: 'blue',
        metrics: [
            { value: "#1", label: "Ranking Achieved", icon: Target },
            { value: "312%", label: "Organic Traffic", icon: TrendingUp },
            { value: "45", label: "Avg New Leads/Mo", icon: Users }
        ],
        features: [
            "Google Business Profile",
            "Local Citation Building",
            "Keyword Strategy",
            "Review Generation",
            "Monthly Reporting"
        ],
        testimonial: {
            quote: "We went from page 3 to #1 for 'Richland plumber' in 4 months.",
            author: "Mike T.",
            business: "Desert Plumbing",
            result: "#1 Google ranking"
        },
        priceHint: "Starting at $800/mo",
        popular: true
    },
    {
        id: 'ai-automation',
        icon: Bot,
        title: "24/7 AI Automation",
        tagline: "Never miss a lead again",
        problem: "78% of customers choose the first business to respond. You can't answer calls at 3am. Your competitors' AI can.",
        solution: "AI chatbots and voice agents that respond in 14 seconds, qualify leads, and book appointments — while you sleep.",
        href: "/services/ai-automation",
        color: 'green',
        metrics: [
            { value: "14s", label: "Response Time", icon: Clock },
            { value: "24/7", label: "Availability", icon: Zap },
            { value: "$127K", label: "Added Revenue", icon: DollarSign }
        ],
        features: [
            "AI Chat Assistant",
            "Voice AI Receptionist",
            "Lead Qualification",
            "Auto Scheduling",
            "CRM Integration"
        ],
        testimonial: {
            quote: "Zero missed leads during peak season. The AI handles everything overnight.",
            author: "Sarah K.",
            business: "Desert Comfort HVAC",
            result: "$127K new revenue"
        },
        priceHint: "Starting at $500/mo",
        popular: true
    },
    {
        id: 'lead-generation',
        icon: Users,
        title: "Pay-Per-Lead Generation",
        tagline: "Only pay for results",
        problem: "You're paying for ads with no guarantees. Marketing agencies take your money whether they get results or not.",
        solution: "We deliver qualified, exclusive leads directly to you. Only pay for leads that meet your criteria. Zero risk.",
        href: "/services/lead-generation",
        color: 'orange',
        metrics: [
            { value: "50+", label: "Leads/Month", icon: Users },
            { value: "0", label: "Upfront Risk", icon: ShieldCheck },
            { value: "85%", label: "Qualification Rate", icon: Target }
        ],
        features: [
            "Exclusive Leads",
            "Pre-Qualified Prospects",
            "Real-Time Delivery",
            "Quality Guarantee",
            "Performance Tracking"
        ],
        priceHint: "Pay per qualified lead"
    },
    {
        id: 'reputation',
        icon: ShieldCheck,
        title: "Reputation Management",
        tagline: "Build trust automatically",
        problem: "Bad reviews hurt more than no reviews. You don't have time to monitor and respond to every platform.",
        solution: "AI monitors all review platforms, responds professionally within minutes, and helps you collect more 5-star reviews.",
        href: "/services/reputation-management",
        color: 'cyan',
        metrics: [
            { value: "4.9", label: "Avg Rating Achieved", icon: Star },
            { value: "200+", label: "Auto Responses/Mo", icon: Bot },
            { value: "3x", label: "More Reviews", icon: TrendingUp }
        ],
        features: [
            "Multi-Platform Monitoring",
            "AI Response Generator",
            "Review Request Automation",
            "Competitor Tracking",
            "Sentiment Analysis"
        ],
        testimonial: {
            quote: "Went from 4.2 to 4.9 stars. The AI responses are better than what I'd write.",
            author: "Chris L.",
            business: "Kennewick Auto Repair",
            result: "4.2 → 4.9 stars"
        },
        priceHint: "Starting at $300/mo"
    }
]

const colorMap = {
    purple: {
        gradient: 'from-purple-500/20 via-purple-500/10 to-transparent',
        border: 'border-purple-500/30',
        hoverBorder: 'hover:border-purple-500/50',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        glow: 'shadow-purple-500/20',
        badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    },
    blue: {
        gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
        border: 'border-blue-500/30',
        hoverBorder: 'hover:border-blue-500/50',
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        glow: 'shadow-blue-500/20',
        badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    },
    green: {
        gradient: 'from-green-500/20 via-green-500/10 to-transparent',
        border: 'border-green-500/30',
        hoverBorder: 'hover:border-green-500/50',
        text: 'text-green-400',
        bg: 'bg-green-500/10',
        glow: 'shadow-green-500/20',
        badge: 'bg-green-500/20 text-green-300 border-green-500/30'
    },
    orange: {
        gradient: 'from-orange-500/20 via-orange-500/10 to-transparent',
        border: 'border-orange-500/30',
        hoverBorder: 'hover:border-orange-500/50',
        text: 'text-orange-400',
        bg: 'bg-orange-500/10',
        glow: 'shadow-orange-500/20',
        badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30'
    },
    cyan: {
        gradient: 'from-cyan-500/20 via-cyan-500/10 to-transparent',
        border: 'border-cyan-500/30',
        hoverBorder: 'hover:border-cyan-500/50',
        text: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        glow: 'shadow-cyan-500/20',
        badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
    }
}

function ServiceCard({ service, index }: { service: ServiceData; index: number }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const colors = colorMap[service.color]
    const Icon = service.icon

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`
                relative group rounded-2xl overflow-hidden
                bg-zinc-900/50 backdrop-blur-sm
                border ${colors.border} ${colors.hoverBorder}
                transition-all duration-500
                hover:shadow-xl hover:${colors.glow}
                ${service.popular ? 'ring-2 ring-yellow-500/30' : ''}
            `}
        >
            {/* Popular Badge */}
            {service.popular && (
                <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-semibold">
                        <Sparkles className="w-3 h-3" />
                        Most Popular
                    </div>
                </div>
            )}

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-50`} />

            <div className="relative p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                    <div className={`
                        w-14 h-14 rounded-xl ${colors.bg}
                        flex items-center justify-center
                        group-hover:scale-110 transition-transform duration-300
                    `}>
                        <Icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">
                            {service.title}
                        </h3>
                        <p className={`text-sm ${colors.text} font-medium`}>
                            {service.tagline}
                        </p>
                    </div>
                </div>

                {/* Problem Statement */}
                <div className="mb-4 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                    <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-300/90 leading-relaxed">
                            {service.problem}
                        </p>
                    </div>
                </div>

                {/* Solution Statement */}
                <div className="mb-6 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                    <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-green-300/90 leading-relaxed">
                            {service.solution}
                        </p>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {service.metrics.map((metric, idx) => {
                        const MetricIcon = metric.icon
                        return (
                            <div 
                                key={idx}
                                className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/5"
                            >
                                <MetricIcon className={`w-4 h-4 ${colors.text} mx-auto mb-1`} />
                                <div className="text-lg lg:text-xl font-bold text-white">
                                    {metric.value}
                                </div>
                                <div className="text-[10px] lg:text-xs text-zinc-500 uppercase tracking-wide">
                                    {metric.label}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Expandable Features */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors mb-4"
                >
                    <span className="text-sm font-medium text-zinc-300">
                        {isExpanded ? 'Hide Features' : 'View Features'}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <ul className="space-y-2 mb-4">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm text-zinc-300">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Testimonial (if exists) */}
                {service.testimonial && (
                    <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <p className="text-sm text-zinc-300 italic mb-2">
                            "{service.testimonial.quote}"
                        </p>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-zinc-500">
                                — {service.testimonial.author}, {service.testimonial.business}
                            </span>
                            <span className={`font-semibold ${colors.text}`}>
                                {service.testimonial.result}
                            </span>
                        </div>
                    </div>
                )}

                {/* Price Hint & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wide">Investment</div>
                        <div className="text-lg font-bold text-white">{service.priceHint}</div>
                    </div>
                    <Link
                        href={service.href}
                        className={`
                            inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                            ${colors.bg} ${colors.text} font-semibold text-sm
                            hover:scale-105 transition-all duration-300
                            border ${colors.border}
                        `}
                    >
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export function ServiceCardsEnhanced() {
    return (
        <section className="relative py-24 lg:py-32 bg-background-primary overflow-hidden" id="services-enhanced">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/3 rounded-full blur-[180px]" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <div className="max-w-3xl mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-sm font-semibold mb-6">
                            <Zap className="w-4 h-4" />
                            Growth Services
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Stop Losing Leads.<br />
                            <span className="text-gradient">Start Dominating.</span>
                        </h2>
                        <p className="text-lg lg:text-xl text-zinc-400 leading-relaxed">
                            Every service is designed to solve a specific problem that's costing you money. 
                            Real results from real Tri-Cities businesses.
                        </p>
                    </motion.div>
                </div>

                {/* Quick Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5"
                >
                    {[
                        { value: "50+", label: "Local Businesses Served" },
                        { value: "347%", label: "Average Lead Increase" },
                        { value: "14s", label: "Average Response Time" },
                        { value: "4.9/5", label: "Client Satisfaction" }
                    ].map((stat, idx) => (
                        <div key={idx} className="text-center">
                            <div className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</div>
                            <div className="text-xs lg:text-sm text-zinc-500">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25"
                        >
                            <Phone className="w-5 h-5" />
                            Get Your Free Strategy Call
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white font-semibold hover:bg-white/[0.08] transition-all duration-300"
                        >
                            View All Services
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <p className="mt-4 text-sm text-zinc-500">
                        No commitment. No sales pressure. Just a conversation about your growth.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
