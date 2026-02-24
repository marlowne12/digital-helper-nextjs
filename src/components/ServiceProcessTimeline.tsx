"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    Phone,
    FileSearch,
    Lightbulb,
    Rocket,
    TrendingUp,
    CheckCircle2,
    ArrowRight,
    Calendar,
    Clock
} from 'lucide-react'

const steps = [
    {
        number: "01",
        icon: Phone,
        title: "Discovery Call",
        duration: "15 min",
        description: "We learn about your business, current challenges, and growth goals. No sales pitch — just a conversation.",
        deliverables: [
            "Understand your business model",
            "Identify pain points",
            "Discuss budget & timeline"
        ],
        color: "purple"
    },
    {
        number: "02",
        icon: FileSearch,
        title: "Free Audit",
        duration: "24-48 hrs",
        description: "We analyze your current digital presence — website, SEO, reviews, competitors — and find the quick wins.",
        deliverables: [
            "Website speed & UX audit",
            "SEO opportunity analysis",
            "Competitor comparison"
        ],
        color: "blue"
    },
    {
        number: "03",
        icon: Lightbulb,
        title: "Strategy Proposal",
        duration: "1 week",
        description: "You get a clear roadmap: what we'll do, how long it takes, what it costs, and the ROI you can expect.",
        deliverables: [
            "Custom growth strategy",
            "Timeline & milestones",
            "Transparent pricing"
        ],
        color: "cyan"
    },
    {
        number: "04",
        icon: Rocket,
        title: "Build & Launch",
        duration: "2-4 weeks",
        description: "We build your digital systems with weekly updates. You stay in the loop without the micromanagement.",
        deliverables: [
            "Iterative development",
            "Weekly progress reports",
            "Beta testing & refinement"
        ],
        color: "green"
    },
    {
        number: "05",
        icon: TrendingUp,
        title: "Growth & Optimize",
        duration: "Ongoing",
        description: "We don't disappear after launch. Monthly reporting, continuous optimization, and a partner who answers the phone.",
        deliverables: [
            "Monthly analytics reports",
            "Continuous improvements",
            "Dedicated support"
        ],
        color: "orange"
    }
]

const colorMap = {
    purple: {
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30',
        text: 'text-purple-400',
        line: 'bg-purple-500'
    },
    blue: {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        line: 'bg-blue-500'
    },
    cyan: {
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30',
        text: 'text-cyan-400',
        line: 'bg-cyan-500'
    },
    green: {
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
        text: 'text-green-400',
        line: 'bg-green-500'
    },
    orange: {
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30',
        text: 'text-orange-400',
        line: 'bg-orange-500'
    }
}

function TimelineStep({ step, index }: { step: typeof steps[0]; index: number }) {
    const colors = colorMap[step.color as keyof typeof colorMap]
    const Icon = step.icon
    const isLast = index === steps.length - 1

    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="relative"
        >
            {/* Connection Line */}
            {!isLast && (
                <div className="hidden lg:block absolute left-1/2 top-full w-0.5 h-8 -translate-x-1/2">
                    <div className={`w-full h-full ${colors.line} opacity-30`} />
                </div>
            )}

            <div className={`
                relative p-6 lg:p-8 rounded-2xl
                bg-zinc-900/50 backdrop-blur-sm
                border ${colors.border}
                transition-all duration-300
                hover:scale-[1.02] hover:shadow-xl
            `}>
                {/* Step Number Badge */}
                <div className="absolute -top-3 -left-3 lg:top-4 lg:left-4">
                    <div className={`
                        w-10 h-10 rounded-full ${colors.bg} ${colors.border} border
                        flex items-center justify-center
                        text-sm font-bold ${colors.text}
                    `}>
                        {step.number}
                    </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs text-zinc-400">
                        <Clock className="w-3 h-3" />
                        {step.duration}
                    </div>
                </div>

                <div className="lg:pl-8 pt-4 lg:pt-0">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-white">
                            {step.title}
                        </h3>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-400 mb-4 leading-relaxed">
                        {step.description}
                    </p>

                    {/* Deliverables */}
                    <ul className="space-y-2">
                        {step.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-zinc-300">
                                <CheckCircle2 className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    )
}

export function ServiceProcessTimeline() {
    return (
        <section className="relative py-24 lg:py-32 bg-background-primary overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6">
                            <Calendar className="w-4 h-4" />
                            Our Process
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            From First Call to{' '}
                            <span className="text-gradient">First Results</span>
                        </h2>
                        <p className="text-lg text-zinc-400">
                            A simple, transparent process with no surprises. Most clients see measurable results within 30 days.
                        </p>
                    </motion.div>
                </div>

                {/* Timeline */}
                <div className="max-w-3xl mx-auto space-y-8">
                    {steps.map((step, index) => (
                        <TimelineStep key={step.number} step={step} index={index} />
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            Ready to Start Step 1?
                        </h3>
                        <p className="text-zinc-400 mb-6">
                            15 minutes. No obligation. Just see if we're a good fit.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25"
                        >
                            <Phone className="w-5 h-5" />
                            Book Your Free Call
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
