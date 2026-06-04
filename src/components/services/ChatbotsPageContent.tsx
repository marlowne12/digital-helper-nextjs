"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageSquare, Zap, CheckCircle2, ArrowRight, XCircle, Bot, Calendar, Globe } from 'lucide-react'
import { BreadcrumbV2 } from '@/components/v2/BreadcrumbV2'
import { PayForResultsBlock } from '@/components/v2/PayForResultsBlock'

const painPoints = [
    {
        title: "Leads Falling Through",
        desc: "Visitors land on your site at 11pm and leave because no one's there to answer. Every unanswered question is a lost sale."
    },
    {
        title: "Support Overload",
        desc: "Your team spends hours answering the same 10 questions. AI handles the routine so your people focus on high-value work."
    },
    {
        title: "Slow Response Times",
        desc: "In the Tri-Cities, the first business to respond wins. If you reply in hours, your competitor is getting that job."
    },
    {
        title: "No Qualification Filter",
        desc: "Talking to every tire-kicker wastes your time. AI pre-qualifies leads so you only engage with real buyers."
    }
]

const capabilities = [
    "Multi-lingual Support (English & Spanish)",
    "Direct Integration with Google Calendar",
    "Automated Handover to Human Staff",
    "Training on Your Specific Business Knowledge",
    "CRM Lead Capture & Auto-Tagging",
    "Website, Facebook & Instagram Deployment"
]

export function ChatbotsPageContent() {
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
                    { label: 'AI Chatbots', href: '/services/ai-automation/chatbots' },
                ]} />

                {/* 1. Hero */}
                <div className="max-w-4xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 uppercase tracking-wider">
                            24/7 Conversational AI
                        </span>
                        <h1
                            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            AI Chatbots That <br />
                            <span className="text-indigo-300">Never Clock Out.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                            Deploy 24/7 intelligent agents that qualify leads, book appointments, and answer customer FAQs without human intervention—on your website, Facebook, or Instagram.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                            >
                                Build My AI Agent
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
                            What Your AI Agent Does
                        </h2>
                        <p className="text-zinc-500">Two core functions that drive revenue while you sleep.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
                                <MessageSquare className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Lead Qualification</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">Ask the right questions to ensure your sales team only talks to &quot;hot&quot; prospects ready to buy.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
                                <Calendar className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Auto-Booking</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">Sync with your calendar so leads can book consultations or service calls directly in the chat window.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Instant Support</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">Solve 80% of routine customer issues instantly, reducing your support load and increasing satisfaction.</p>
                        </div>
                    </div>
                </section>

                {/* 4. Capabilities */}
                <section className="mb-32">
                    <div className="bg-white/5 backdrop-blur-sm p-12 rounded-[2rem] border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[80px] -mr-32 -mt-32" />
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2
                                    className="text-3xl font-bold text-white mb-4"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    AI Agent Capabilities
                                </h2>
                                <p className="text-zinc-400 mb-8 leading-relaxed">
                                    Every chatbot is trained on your business, your services, and your tone of voice—then deployed across your channels.
                                </p>
                                <div className="space-y-4">
                                    {capabilities.map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 text-zinc-300">
                                            <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                                            <span className="font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0">
                                        <Bot className="w-5 h-5 text-indigo-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">Trained on Your Business</h4>
                                        <p className="text-xs text-zinc-400">Knows your services, pricing, and policies by heart.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0">
                                        <Globe className="w-5 h-5 text-indigo-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">Omnichannel Deployment</h4>
                                        <p className="text-xs text-zinc-400">Website, Facebook Messenger, Instagram DMs.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0">
                                        <Zap className="w-5 h-5 text-indigo-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">Instant Handover</h4>
                                        <p className="text-xs text-zinc-400">Seamlessly escalates complex issues to your human team.</p>
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
                        Your Best Employee Never Sleeps.
                    </h2>
                    <p className="text-zinc-400 mb-12 max-w-2xl mx-auto text-xl relative z-10 leading-relaxed">
                        Let&apos;s build a chatbot trained on your business that captures leads and books jobs around the clock.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-3 h-16 px-12 text-xl font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                        >
                            Build My AI Agent
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </motion.div>

            </div>
        </main>
    )
}
