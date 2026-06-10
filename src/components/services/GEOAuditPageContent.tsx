"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Brain,
    Bot,
    CheckCircle2,
    FileSearch,
    ArrowRight,
    XCircle,
    LineChart,
    Wrench,
    Trophy,
    Sparkles
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ServicePageLayout } from '@/components/services/ServicePageLayout'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const painPoints = [
    {
        title: "Invisible in AI Answers",
        desc: "Customers are asking ChatGPT, Perplexity, and Gemini who to hire. If your brand never appears, those leads go somewhere else before they even touch Google."
    },
    {
        title: "Competitors Own the Citations",
        desc: "AI models keep citing the same better-structured, more authoritative pages. If that is not you, you are training the market to remember your competitors."
    },
    {
        title: "Your Site Misses AI Questions",
        desc: "Most business websites talk about themselves, not the exact questions buyers ask AI. That gap kills visibility in generated answers."
    },
    {
        title: "No GEO Tracking System",
        desc: "Without a repeatable GEO audit, you have no baseline, no score, and no way to prove whether AI visibility is improving month over month."
    }
]

const framework = [
    "Brand mention analysis across ChatGPT, Perplexity, and Gemini",
    "Citation source analysis to see which pages AI models trust",
    "Content gap analysis based on real buyer prompts",
    "Technical readiness review: schema, headings, freshness, authority",
    "Competitor comparison for share of AI answer visibility"
]

const fixes = [
    "Executive summary with GEO score (0 to 100)",
    "Prompt-by-prompt visibility report",
    "Competitor mention comparison",
    "Citation pattern analysis",
    "Prioritized 10-fix roadmap",
    "30-day and 90-day action plan"
]

const pricingTiers = [
    {
        name: "One-Time GEO Audit",
        price: "$99",
        period: "/audit",
        description: "Fast door-opener offer for cold outreach, referrals, and Upwork.",
        features: [
            "3 platform spot check",
            "GEO score and summary",
            "5 category findings",
            "Top 10 fixes",
            "PDF-ready deliverable"
        ],
        highlighted: false
    },
    {
        name: "Monthly GEO Monitoring",
        price: "$499",
        period: "/month",
        description: "Track improvements, catch losses early, and keep growing AI visibility.",
        features: [
            "Fresh monthly audit",
            "Score tracking over time",
            "New prompt set testing",
            "Content recommendations",
            "1-page executive summary"
        ],
        highlighted: true
    }
]

const faqs = [
    {
        q: "What is GEO?",
        a: "GEO stands for Generative Engine Optimization. It is the process of improving how often your brand appears in AI-generated answers and which pages models trust enough to cite."
    },
    {
        q: "Which AI platforms do you check?",
        a: "Our baseline audit checks ChatGPT, Perplexity, and Gemini using relevant buying-intent prompts tied to the client&apos;s services, location, and niche."
    },
    {
        q: "Is this just SEO with a new label?",
        a: "No. GEO overlaps with SEO, but the testing methodology is different. We evaluate prompt visibility, citations, answer framing, and AI trust signals, not just Google rankings."
    },
    {
        q: "How do you improve visibility after the audit?",
        a: "Usually through content expansion, stronger answer-first pages, better schema, clearer site structure, fresher authority signals, and competitor-aware topic coverage."
    }
]

export function GEOAuditPageContent() {
    return (
        <ServicePageLayout
            breadcrumbs={[
                { label: 'Services', href: '/services' },
                { label: 'GEO Audit & Optimization', href: '/services/geo-audit' }
            ]}
        >
            <div className="max-w-4xl mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-sm font-medium mb-6 uppercase tracking-wider">
                        Generative Engine Optimization
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                        Get Found in <br />
                        <span className="text-gradient">AI Answers.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-3xl mb-10 leading-relaxed">
                        We audit how often ChatGPT, Perplexity, and Gemini mention your brand, which sources they trust, and what to fix so your company shows up more often in buyer-facing AI responses.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild className="btn-primary h-14 px-8 text-lg border-none bg-accent-primary hover:bg-accent-primary/90">
                            <Link href="/contact">Book a GEO Audit</Link>
                        </Button>
                        <Button asChild variant="outline" className="btn-secondary h-14 px-8 text-lg border-white/10 hover:bg-white/5">
                            <Link href="/pricing">See Pricing</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>

            <section className="mb-32">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {painPoints.map((point, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl"
                        >
                            <XCircle className="w-8 h-8 text-red-500/50 mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">{point.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">{point.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="mb-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                            SEO for the <span className="text-gradient">AI Layer.</span>
                        </h2>
                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                            GEO sits one step upstream from search. We test what AI assistants say about your brand, then build the content and authority signals that make you more likely to be surfaced and cited.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                <span className="text-3xl font-bold text-white block mb-1">3</span>
                                <span className="text-xs text-zinc-500 uppercase tracking-widest">AI Platforms Tested</span>
                            </div>
                            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                <span className="text-3xl font-bold text-white block mb-1">10</span>
                                <span className="text-xs text-zinc-500 uppercase tracking-widest">Prioritized Fixes Included</span>
                            </div>
                        </div>
                    </div>
                    <div className="glass p-8 rounded-3xl border border-accent-primary/20 bg-accent-primary/5">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-accent-primary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Prompt Testing</h4>
                                    <p className="text-xs text-zinc-400">Check real buying-intent queries across major AI platforms.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-accent-secondary/20 flex items-center justify-center">
                                    <FileSearch className="w-5 h-5 text-accent-secondary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Citation Analysis</h4>
                                    <p className="text-xs text-zinc-400">See which pages keep getting cited and why they win trust.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-accent-tertiary/20 flex items-center justify-center">
                                    <Wrench className="w-5 h-5 text-accent-tertiary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Fix Roadmap</h4>
                                    <p className="text-xs text-zinc-400">Turn findings into a concrete 30-day and 90-day improvement plan.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">The 5-Part GEO Audit Framework</h2>
                    <p className="text-zinc-500">A repeatable system you can sell, deliver, and track over time.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {[
                        { title: 'Mentions', icon: <Brain />, desc: 'How often your brand appears in AI answers.' },
                        { title: 'Citations', icon: <FileSearch />, desc: 'What pages AI tools trust enough to cite.' },
                        { title: 'Gaps', icon: <Sparkles />, desc: 'Questions customers ask that your site does not answer.' },
                        { title: 'Readiness', icon: <Wrench />, desc: 'Technical and authority signals that support AI visibility.' },
                        { title: 'Competitors', icon: <Trophy />, desc: 'Who appears instead of you and how often they win.' }
                    ].map((step, i) => (
                        <div key={i} className="relative group rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-primary mb-6 transition-all group-hover:scale-110 group-hover:bg-accent-primary group-hover:text-black">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-zinc-400 text-sm">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-32">
                <div className="bg-charcoal p-12 rounded-[2rem] border border-steel/30 relative overflow-hidden">
                    <h2 className="text-3xl font-bold text-white mb-10">What the Audit Covers</h2>
                    <div className="grid md:grid-cols-2 gap-y-6 gap-x-12 mb-12">
                        {framework.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 text-zinc-300">
                                <CheckCircle2 className="w-5 h-5 text-accent-primary flex-shrink-0" />
                                <span className="font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className="rounded-2xl border border-accent-primary/20 bg-accent-primary/5 p-6">
                        <h3 className="text-xl font-bold text-white mb-6">Deliverables</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {fixes.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-zinc-300 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-accent-primary flex-shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Simple Pricing, Easy Upsell</h2>
                    <p className="text-zinc-500">Use the audit to open the door, then convert winners into monthly monitoring.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {pricingTiers.map((tier) => (
                        <div key={tier.name} className={`glass p-8 rounded-3xl transition-all flex flex-col ${tier.highlighted ? 'border border-accent-primary/30 bg-accent-primary/5 relative' : 'border border-white/5'}`}>
                            {tier.highlighted && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-gradient text-black font-bold text-xs rounded-full uppercase tracking-tighter">
                                    Best Margin
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-white">{tier.price}</span>
                                <span className="text-zinc-500 text-sm">{tier.period}</span>
                            </div>
                            <p className="text-zinc-400 text-sm mb-6">{tier.description}</p>
                            <ul className="space-y-3 mb-8 flex-grow">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="text-sm text-zinc-300 flex items-center gap-2">
                                        <CheckCircle2 className={`w-4 h-4 ${tier.highlighted ? 'text-accent-primary' : 'text-zinc-600'}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Button asChild className={tier.highlighted ? 'w-full btn-primary border-none bg-accent-primary text-black hover:bg-accent-primary/90' : 'w-full'} variant={tier.highlighted ? 'default' : 'outline'}>
                                <Link href="/contact">Start This Offer</Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-20">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Common Questions</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            This is a strong cold-outreach and Upwork offer because the result is easy to understand: either the brand shows up in AI answers or it does not.
                        </p>
                    </div>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border border-white/5 rounded-2xl px-6 bg-white/[0.02]">
                                <AccordionTrigger className="text-left text-white hover:no-underline">{faq.q}</AccordionTrigger>
                                <AccordionContent className="text-zinc-400 leading-relaxed">{faq.a}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            <section className="rounded-[2rem] border border-accent-primary/20 bg-accent-primary/5 p-10 md:p-12">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 text-accent-primary text-sm font-semibold uppercase tracking-wider mb-4">
                        <LineChart className="w-4 h-4" />
                        New Revenue Stream
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Sell GEO now, productize later.
                    </h2>
                    <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                        Start with manual audits, build three sample reports, close one-time projects at $99, and move the best-fit clients into a $499 monthly monitoring retainer.
                    </p>
                    <Button asChild className="btn-primary h-14 px-8 text-lg border-none bg-white text-black hover:bg-zinc-200">
                        <Link href="/contact">
                            Launch This Offer <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                </div>
            </section>
        </ServicePageLayout>
    )
}
