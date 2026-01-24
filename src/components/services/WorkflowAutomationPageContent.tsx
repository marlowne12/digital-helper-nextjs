"use client"

import React from 'react'
import { ServicePageLayout } from '@/components/services/ServicePageLayout'
import { motion } from 'framer-motion'
import { Workflow, Cpu, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function WorkflowAutomationPageContent() {
    return (
        <ServicePageLayout
            breadcrumbs={[
                { label: 'Services', href: '/services' },
                { label: 'AI Automation', href: '/services/ai-automation' },
                { label: 'Workflows', href: '/services/ai-automation/workflow-automation' }
            ]}
        >
            <div className="max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-5xl font-bold text-white mb-6">n8n Workflow Automation</h1>
                    <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
                        We connect your entire business stack (CRM, Email, Slack, Sheets) to eliminate manual data entry and save you 10+ hours every week.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="glass p-8 rounded-2xl border-white/5">
                            <Workflow className="w-10 h-10 text-accent-indigo mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Custom n8n Logic</h3>
                            <p className="text-zinc-500 text-sm">Complex bridges between apps that Zapier can&apos;t handle.</p>
                        </div>
                        <div className="glass p-8 rounded-2xl border-white/5">
                            <Cpu className="w-10 h-10 text-accent-primary mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Data Enrichment</h3>
                            <p className="text-zinc-500 text-sm">Automatically add social profiles and company info to new leads.</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-8">Popular Automations</h2>
                    <ul className="space-y-4 mb-16 text-zinc-300">
                        <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent-primary" /> Auto-booking from SMS/Email</li>
                        <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent-primary" /> CRM Opportunity Stage Syncing</li>
                        <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent-primary" /> Automated Review Request Timing</li>
                        <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent-primary" /> Inventory/Appointment Availability Sync</li>
                    </ul>

                    <Button asChild className="btn-primary h-14 px-8 text-lg">
                        <Link href="/contact" className="flex items-center gap-2">
                            Automate My Workflows
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </ServicePageLayout>
    )
}
