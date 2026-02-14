"use client"

import React from 'react'
import { ServicePageLayout } from '@/components/services/ServicePageLayout'
import { motion } from 'framer-motion'
import { MessageSquare, Zap, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function ChatbotsPageContent() {
    return (
        <ServicePageLayout
            breadcrumbs={[
                { label: 'Services', href: '/services' },
                { label: 'AI Automation', href: '/services/ai-automation' },
                { label: 'AI Chatbots', href: '/services/ai-automation/chatbots' }
            ]}
        >
            <div className="max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-5xl font-bold text-white mb-6">AI Chatbots & Conversational Agents</h1>
                    <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
                        Deploy 24/7 intelligent agents that qualify leads, book appointments, and answer customer FAQs without human intervention.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="glass p-8 rounded-2xl border-white/5">
                            <MessageSquare className="w-10 h-10 text-accent-primary mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Lead Qualification</h3>
                            <p className="text-zinc-500 text-sm">Ask the right questions to ensure your sales team only talks to &quot;hot&quot; prospects.</p>
                        </div>
                        <div className="glass p-8 rounded-2xl border-white/5">
                            <Zap className="w-10 h-10 text-accent-tertiary mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Instant Support</h3>
                            <p className="text-zinc-500 text-sm">Solve 80% of routine customer issues instantly, reducing your support load.</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-8">AI Agent Capabilities</h2>
                    <ul className="space-y-4 mb-16 text-zinc-300">
                        <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent-primary" /> Multi-lingual Support (English & Spanish)</li>
                        <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent-primary" /> Direct Integration with Google Calendar</li>
                        <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent-primary" /> Automated Handover to Human Staff</li>
                        <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent-primary" /> Training on Your Specific Business Knowledge</li>
                    </ul>

                    <Button asChild className="btn-primary h-14 px-8 text-lg">
                        <Link href="/contact" className="flex items-center gap-2">
                            Build My AI Agent
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </ServicePageLayout>
    )
}
