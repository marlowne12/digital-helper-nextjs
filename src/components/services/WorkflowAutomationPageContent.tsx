"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Workflow, CheckCircle2, ArrowRight, XCircle, GitMerge, Zap, Database } from 'lucide-react'
import { BreadcrumbV2 } from '@/components/v2/BreadcrumbV2'
import { PayForResultsBlock } from '@/components/v2/PayForResultsBlock'

const painPoints = [
    {
        title: "Manual Data Entry Hell",
        desc: "Your team spends hours copying data between apps. Every manual step is a chance for error—and a waste of skilled labor."
    },
    {
        title: "Disconnected Software Stack",
        desc: "Your CRM, email, calendar, and invoicing don't talk to each other. That gap costs you time, money, and leads."
    },
    {
        title: "Zapier Hits Its Limits",
        desc: "Simple tools can't handle complex logic. If you need multi-step conditional workflows, you need n8n—not a no-code toy."
    },
    {
        title: "No Visibility Into Operations",
        desc: "Without automated logging and reporting, you're flying blind. You can't improve what you can't measure."
    }
]

const automations = [
    "Auto-booking from SMS/Email into your calendar",
    "CRM Opportunity Stage Syncing across tools",
    "Automated Review Request Timing post-job",
    "Inventory & Appointment Availability Sync",
    "Lead Data Enrichment with social & company info",
    "Slack/Email Alerts for high-priority pipeline events"
]

export function WorkflowAutomationPageContent() {
    return (
        <main className="min-h-screen bg-[#0a0a0f] overflow-hidden">
            {/* Background glows */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 relative">

                {/* Breadcrumb */}
                <BreadcrumbV2 items={[
                    { label: 'Services', href: '/services' },
                    { label: 'AI Automation', href: '/services/ai-automation' },
                    { label: 'Workflow Automation', href: '/services/ai-automation/workflow-automation' },
                ]} />

                {/* 1. Hero */}
                <div className="max-w-4xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 uppercase tracking-wider">
                            n8n Workflow Automation
                        </span>
                        <h1
                            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Connect Your <br />
                            <span className="text-indigo-300">Entire Business.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                            We connect your entire business stack—CRM, email, Slack, Sheets—to eliminate manual data entry and save you 10+ hours every week using custom n8n workflows.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                            >
                                Automate My Workflows
                            </Link>
                            <Link
                                href="/services/ai-automation"
                                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold rounded-xl border border-white/10 hover:bg-white/5 text-white transition-colors"
                            >
                                View All AI Services
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* 2. Pain Points */}
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

                {/* 3. Feature Cards */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2
                            className="text-3xl md:text-5xl font-bold text-white mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            What We Build For You
                        </h2>
                        <p className="text-zinc-500">Custom automation logic that scales with your business.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
                                <Workflow className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Custom n8n Logic</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">Complex multi-step bridges between apps that Zapier can&apos;t handle—conditional logic, error handling, and retry mechanisms included.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
                                <Database className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Data Enrichment</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">Automatically add social profiles, company intel, and contact data to every new lead the moment they enter your CRM.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
                                <GitMerge className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Cross-Platform Sync</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">Keep your CRM, calendar, invoicing, and communication tools in perfect sync—no manual updates, no missed handoffs.</p>
                        </div>
                    </div>
                </section>

                {/* 4. Popular Automations */}
                <section className="mb-32">
                    <div className="bg-white/5 backdrop-blur-sm p-12 rounded-[2rem] border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[80px] -mr-32 -mt-32" />
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2
                                    className="text-3xl font-bold text-white mb-4"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    Popular Automations
                                </h2>
                                <p className="text-zinc-400 mb-8 leading-relaxed">
                                    These are the workflows our clients use most to reclaim their time and cut operational overhead.
                                </p>
                                <div className="space-y-4">
                                    {automations.map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 text-zinc-300">
                                            <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                                            <span className="font-medium text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                    <span className="text-3xl font-bold text-white block mb-1">10+</span>
                                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Hours Saved Per Week</span>
                                </div>
                                <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                    <span className="text-3xl font-bold text-white block mb-1">100%</span>
                                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Custom-Built for Your Stack</span>
                                </div>
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0">
                                        <Zap className="w-5 h-5 text-indigo-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">Self-Hosted on n8n</h4>
                                        <p className="text-xs text-zinc-400">No per-task fees. Your workflows run on your infrastructure.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pay-For-Results Block */}
                <PayForResultsBlock ctaLabel="Get a Free Audit" />

                {/* 5. Final CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center bg-indigo-600/5 border border-indigo-500/10 p-16 rounded-[3rem] relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-indigo-600/10 blur-[80px]" />
                    <h2
                        className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Stop Paying Your Team to Do Robot Work.
                    </h2>
                    <p className="text-zinc-400 mb-12 max-w-2xl mx-auto text-xl relative z-10 leading-relaxed">
                        Let&apos;s map your current workflows and show you exactly where automation can save you 10+ hours a week—starting this month.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-3 h-16 px-12 text-xl font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                        >
                            Automate My Workflows
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </motion.div>

            </div>
        </main>
    )
}
