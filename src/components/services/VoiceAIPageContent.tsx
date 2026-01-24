"use client"

import React from 'react'
import { ServicePageLayout } from '@/components/services/ServicePageLayout'
import { motion } from 'framer-motion'
import { Phone, Mic, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function VoiceAIPageContent() {
    return (
        <ServicePageLayout
            breadcrumbs={[
                { label: 'Services', href: '/services' },
                { label: 'AI Automation', href: '/services/ai-automation' },
                { label: 'Voice AI', href: '/services/ai-automation/voice-ai' }
            ]}
        >
            <div className="max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-5xl font-bold text-white mb-6">AI Voice Agents & Automated Reception</h1>
                    <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
                        Never miss a call again. Our AI voice agents sound human, understand context, and can manage your inbound calls 24/7.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="glass p-8 rounded-2xl border-white/5">
                            <Phone className="w-10 h-10 text-accent-secondary mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Missed Call Text-Back</h3>
                            <p className="text-zinc-500 text-sm">If you don&apos;t answer, our AI instantly texts the lead to start the conversation.</p>
                        </div>
                        <div className="glass p-8 rounded-2xl border-white/5">
                            <Mic className="w-10 h-10 text-accent-primary mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Automated Booking</h3>
                            <p className="text-zinc-500 text-sm">Customers can book service calls or appointments entirely by voice with our AI.</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-8">Voice AI Features</h2>
                    <ul className="space-y-4 mb-16 text-zinc-300">
                        <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent-primary" /> Natural-Sounding Synthetic Voices</li>
                        <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent-primary" /> Real-time Speech-to-Text Transcription</li>
                        <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent-primary" /> Intelligent Call Routing to Human Reps</li>
                        <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent-primary" /> CRM Automated Call Summaries</li>
                    </ul>

                    <Button asChild className="btn-primary h-14 px-8 text-lg">
                        <Link href="/contact" className="flex items-center gap-2">
                            Set Up Voice AI
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </ServicePageLayout>
    )
}
