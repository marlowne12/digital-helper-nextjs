"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mic, CheckCircle2, ArrowRight, XCircle, Clock, PhoneCall, FileText } from 'lucide-react'
import { BreadcrumbV2 } from '@/components/v2/BreadcrumbV2'
import { PayForResultsBlock } from '@/components/v2/PayForResultsBlock'

const painPoints = [
    {
        title: "Missed Calls = Lost Revenue",
        desc: "Every unanswered call is a lead going to your competitor. Most local businesses miss 30% of inbound calls during peak hours."
    },
    {
        title: "After-Hours Dead Zone",
        desc: "Customers call when it's convenient for them—often evenings and weekends. Your voice AI answers 24/7, no exceptions."
    },
    {
        title: "Receptionist Costs",
        desc: "A full-time receptionist costs $35,000+/year. AI voice handles the same volume for a fraction of the monthly cost."
    },
    {
        title: "Slow Callback Loops",
        desc: "Phone tag kills deals. AI instantly texts back any missed caller to keep them engaged before they move on."
    }
]

const features = [
    "Natural-Sounding Synthetic Voices",
    "Real-time Speech-to-Text Transcription",
    "Intelligent Call Routing to Human Reps",
    "CRM Automated Call Summaries",
    "Missed Call SMS Text-Back System",
    "Appointment Booking via Voice"
]

export function VoiceAIPageContent() {
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
                    { label: 'Voice AI', href: '/services/ai-automation/voice-ai' },
                ]} />

                {/* 1. Hero */}
                <div className="max-w-4xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 uppercase tracking-wider">
                            AI Voice Agents
                        </span>
                        <h1
                            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Never Miss <br />
                            <span className="text-indigo-300">Another Call.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                            Our AI voice agents sound human, understand context, and can manage your inbound calls 24/7—booking appointments, answering questions, and routing urgent calls to your team.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                            >
                                Set Up Voice AI
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
                            How Voice AI Works For You
                        </h2>
                        <p className="text-zinc-500">Two core systems that keep your pipeline moving 24/7.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
                                <PhoneCall className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Missed Call Text-Back</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">If you don&apos;t answer, our AI instantly texts the lead to start the conversation and keep them engaged.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
                                <Mic className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Automated Booking</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">Customers can book service calls or appointments entirely by voice, directly synced to your calendar.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
                                <Clock className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">24/7 Reception</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">Handle after-hours calls with a professional AI voice that knows your business and never puts leads on hold.</p>
                        </div>
                    </div>
                </section>

                {/* 4. Features List */}
                <section className="mb-32">
                    <div className="bg-white/5 backdrop-blur-sm p-12 rounded-[2rem] border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[80px] -mr-32 -mt-32" />
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2
                                    className="text-3xl font-bold text-white mb-4"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    Voice AI Features
                                </h2>
                                <p className="text-zinc-400 mb-8 leading-relaxed">
                                    Every voice agent is trained on your business, handles calls naturally, and logs everything automatically to your CRM.
                                </p>
                                <div className="space-y-4">
                                    {features.map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 text-zinc-300">
                                            <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                                            <span className="font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                    <span className="text-3xl font-bold text-white block mb-1">30%</span>
                                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Avg Missed Calls Recovered</span>
                                </div>
                                <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                    <span className="text-3xl font-bold text-white block mb-1">&lt; 60s</span>
                                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Text-Back Response Time</span>
                                </div>
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0">
                                        <FileText className="w-5 h-5 text-indigo-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">Auto Call Summaries</h4>
                                        <p className="text-xs text-zinc-400">Every call transcribed and logged to your CRM automatically.</p>
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
                        Stop Losing Jobs to Voicemail.
                    </h2>
                    <p className="text-zinc-400 mb-12 max-w-2xl mx-auto text-xl relative z-10 leading-relaxed">
                        Let&apos;s set up a voice AI that answers, qualifies, and books leads around the clock—for less than hiring a part-time receptionist.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-3 h-16 px-12 text-xl font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                        >
                            Set Up Voice AI
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </motion.div>

            </div>
        </main>
    )
}
