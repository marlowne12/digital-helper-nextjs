"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Target,
    BarChart3,
    CheckCircle2,
    ArrowRight,
    XCircle,
    Zap,
    ShieldCheck,
    Search,
    PenTool
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
        title: "Invisible to Prospects",
        desc: "Spending money on ads but not getting qualified leads? Clicks don't pay the bills; actual customers do."
    },
    {
        title: "Unpredictable Pipeline",
        desc: "Is your lead flow a roller coaster? We build automated systems that deliver a steady, predictable stream of prospects."
    },
    {
        title: "The Prospecting Drain",
        desc: "Spending hours on cold calls and LinkedIn outreach? Your time is better spent closing deals, not hunting them."
    },
    {
        title: "Poor Lead Quality",
        desc: "Tired of wasting time on leads that aren't ready to buy? Our AI filters for intent so you only talk to the best."
    }
]

const deliverables = [
    "Ideal Customer Profile (ICP) Identification",
    "Multi-Channel Automated Prospecting System",
    "AI-Driven Lead Qualification & Filtering",
    "CRM Integration & Automated Data Delivery",
    "Performance-Based Lead Generation (Pay-Per-Lead)",
    "Real-Time Pipeline Analytics Dashboard"
]

const industries = [
    { name: "HVAC & Plumbing", price: "$35 - $75" },
    { name: "Dental Practices", price: "$50 - $100" },
    { name: "Legal Services", price: "$75 - $150" },
    { name: "Real Estate Agents", price: "$25 - $50" },
    { name: "B2B Professional Services", price: "$50 - $100" }
]

const faqs = [
    {
        q: "How does the pay-per-lead model work?",
        a: "You only pay for leads that meet our agreed-upon qualification criteria. No monthly retainers, no management fees—just results."
    },
    {
        q: "What defines a 'qualified' lead?",
        a: "We work with you to define specific filters (location, budget, service type). If a lead doesn't match your criteria, you don't pay for it."
    },
    {
        q: "Do you use cold calling?",
        a: "We focus on digital prospecting and AI-driven outreach. Our systems find prospects when they are showing intent or matching your ideal customer profile."
    },
    {
        q: "Can I scale the lead flow up or down?",
        a: "Absolutely. Our systems are built to be flexible. If you have too many leads, we can pause or narrow the filters. If you need more, we can broaden the reach."
    }
]

export function LeadGenerationPageContent() {
    return (
        <ServicePageLayout
            breadcrumbs={[
                { label: 'Services', href: '/services' },
                { label: 'Lead Generation', href: '/services/lead-generation' }
            ]}
        >
            {/* 1. Hero Section */}
            <div className="max-w-4xl mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-sky-400/10 border border-sky-400/20 text-sky-400 text-sm font-medium mb-6 uppercase tracking-wider">
                        Performance-Based Growth
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                        Qualified Leads Delivered <br />
                        <span className="text-gradient">To Your Inbox.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                        Stop buying clicks and start buying results. We build automated prospecting systems that find, qualify, and deliver buyers directly to you—risk-free.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild className="btn-primary h-14 px-8 text-lg bg-sky-500 hover:bg-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.3)] border-none">
                            <Link href="/contact">Get a Lead Gen Quote</Link>
                        </Button>
                        <Button asChild variant="outline" className="btn-secondary h-14 px-8 text-lg border-white/10 hover:bg-white/5">
                            <Link href="/pricing">See Lead Pricing</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* 2. Pain Points Section */}
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

            {/* 3. Solution Section */}
            <section className="mb-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                            Predictable <span className="text-gradient">Lead Flow.</span>
                        </h2>
                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                            We don&apos;t believe in vanity metrics like &apos;reach&apos; or &apos;impressions&apos;. We focus on the only number that matters: how many qualified conversations are landing in your calendar.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                <span className="text-3xl font-bold text-white block mb-1">133%</span>
                                <span className="text-xs text-zinc-500 uppercase tracking-widest">Avg Revenue Growth</span>
                            </div>
                            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                <span className="text-3xl font-bold text-white block mb-1">ZERO</span>
                                <span className="text-xs text-zinc-500 uppercase tracking-widest">Financial Risk</span>
                            </div>
                        </div>
                    </div>
                    <div className="glass p-8 rounded-3xl border border-sky-400/20 bg-sky-400/5">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-sky-400/20 flex items-center justify-center">
                                    <Target className="w-5 h-5 text-sky-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Targeted Prospecting</h4>
                                    <p className="text-xs text-zinc-400">Finding only those who need your service now.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-accent-primary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Instant Qualification</h4>
                                    <p className="text-xs text-zinc-400">AI-driven filtering for quality and intent.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-accent-secondary/20 flex items-center justify-center">
                                    <BarChart3 className="w-5 h-5 text-accent-secondary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Direct ROI Tracking</h4>
                                    <p className="text-xs text-zinc-400">See exactly what every lead is worth.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Process Section */}
            <section className="mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">The Pipeline Factory</h2>
                    <p className="text-zinc-500">How we deliver consistent results in 4 steps.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: 'Identify', icon: <Search />, desc: 'Defining your ideal buyer profile and location.' },
                        { title: 'Build', icon: <PenTool className="w-5 h-5" />, desc: 'Setting up automated prospecting engines.' },
                        { title: 'Verify', icon: <ShieldCheck />, desc: 'Qualifying every lead for quality and intent.' },
                        { title: 'Deliver', icon: <ArrowRight />, desc: 'Leads land in your inbox or CRM ready to close.' }
                    ].map((step, i) => (
                        <div key={i} className="relative group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 mb-6 transition-all group-hover:scale-110 group-hover:bg-sky-400 group-hover:text-black">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-zinc-400 text-sm">{step.desc}</p>
                            {i < 3 && <div className="hidden lg:block absolute top-7 left-20 w-full h-[1px] bg-white/5" />}
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Deliverables Section */}
            <section className="mb-32">
                <div className="glass p-12 rounded-[2rem] border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/5 blur-[80px] -mr-32 -mt-32" />
                    <h2 className="text-3xl font-bold text-white mb-10">What You Get</h2>
                    <div className="grid md:grid-cols-2 gap-y-6 gap-x-12">
                        {deliverables.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 text-zinc-300">
                                <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                                <span className="font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Pricing Preview */}
            <section className="mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Investment by Industry</h2>
                    <p className="text-zinc-400">Scalable lead pricing based on your specific niche.</p>
                </div>
                <div className="glass overflow-hidden max-w-2xl mx-auto rounded-3xl border-white/5">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                                <th className="p-6 text-white font-bold flex items-center gap-2">
                                    <Target className="w-5 h-5 text-sky-400" />
                                    Industry
                                </th>
                                <th className="p-6 text-white font-bold text-right">Price per Lead</th>
                            </tr>
                        </thead>
                        <tbody>
                            {industries.map((industry, i) => (
                                <tr key={i} className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.01] transition-colors">
                                    <td className="p-6 text-zinc-300 font-medium">{industry.name}</td>
                                    <td className="p-6 text-right font-mono text-sky-400">{industry.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 8. FAQ Section */}
            <section className="mb-32">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">Lead Gen Questions</h2>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border border-white/5 bg-white/[0.01] rounded-2xl px-6 py-2 overflow-hidden">
                                <AccordionTrigger className="text-white hover:text-sky-400 text-left font-bold text-lg hover:no-underline">
                                    {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-zinc-400 text-base leading-relaxed pt-2 pb-6">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* 9. Final CTA */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center bg-sky-400/5 border border-sky-400/10 p-16 rounded-[3rem] relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-accent-gradient opacity-5" />
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Stop Chasing. Start Closing.</h2>
                <p className="text-zinc-400 mb-12 max-w-2xl mx-auto text-xl relative z-10 leading-relaxed">
                    Ready to get a predictable flow of qualified prospects? Let&apos;s discuss your targets and build your pipeline factory.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                    <Button asChild className="btn-primary h-16 px-12 text-xl bg-sky-500 hover:bg-sky-400 shadow-[0_0_40px_rgba(14,165,233,0.4)] border-none">
                        <Link href="/contact" className="flex items-center gap-3">
                            Check Your Availability
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </ServicePageLayout>
    )
}
