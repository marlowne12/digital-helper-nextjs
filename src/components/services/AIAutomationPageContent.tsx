"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Cpu,
    ArrowRight,
    CheckCircle2,
    Bot,
    Workflow,
    XCircle,
    Zap,
    Clock,
    Search,
    TrendingUp
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
        title: "Drowning in Admin",
        desc: "Spending hours on repetitive tasks that don&apos;t grow your business? Manual data entry is a silent killer of productivity."
    },
    {
        title: "Missed Leads",
        desc: "In the Tri-Cities, the first business to respond wins. If you&apos;re missing calls or taking hours to reply, you&apos;re losing money."
    },
    {
        title: "Staffing Limits",
        desc: "Can&apos;t afford to hire more employees but can&apos;t handle the workload? AI agents provide 24/7 support at a fraction of the cost."
    },
    {
        title: "Fragmented Systems",
        desc: "Tired of your tools not talking to each other? We build seamless bridges that move data automatically across your business."
    }
]

const deliverables = [
    "Custom AI Chatbots for Lead Qualification",
    "Automated Workflow Architecture (n8n/Zapier)",
    "AI Voice Agents for Phone Support",
    "CRM & Email Marketing Integration",
    "Automated Data Enrichment & Reporting",
    "24/7 System Monitoring & Maintenance"
]

const faqs = [
    {
        q: "Do I need to be a tech expert to use these systems?",
        a: "Not at all. We build everything to be user-friendly and handle all the technical implementation for you. You&apos;ll just see the results in your inbox or CRM."
    },
    {
        q: "What is n8n and why do you use it?",
        a: "n8n is a powerful, low-cost automation platform that allows us to build complex, custom logic that other tools can&apos;t handle. It gives you more flexibility and lower long-term costs."
    },
    {
        q: "Can AI really handle customer support?",
        a: "Yes! Modern AI models can handle 70-80% of routine questions with high accuracy, only passing the most complex or high-value issues to your human team."
    },
    {
        q: "How much time can I actually save?",
        a: "Most of our clients save 10 to 20 hours per week after automating their lead intake and administrative workflows. That&apos;s time you can put back into actual growth."
    }
]

export function AIAutomationPageContent() {
    return (
        <ServicePageLayout
            breadcrumbs={[
                { label: 'Services', href: '/services' },
                { label: 'AI Automation', href: '/services/ai-automation' }
            ]}
        >
            {/* 1. Hero Section */}
            <div className="max-w-4xl mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent-tertiary/10 border border-accent-tertiary/20 text-accent-tertiary text-sm font-medium mb-6 uppercase tracking-wider">
                        Next-Gen Business Operations
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                        Buy Back Your <br />
                        <span className="text-gradient">Freedom with AI.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                        Stop wasting hours on repetitive tasks. We build custom AI systems that qualify leads, schedule calls, and handle customer support 24/7 so your business works while you sleep.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild className="btn-primary h-14 px-8 text-lg bg-accent-tertiary hover:bg-accent-tertiary/90 shadow-[0_0_20px_rgba(6,182,212,0.3)] border-none">
                            <Link href="/contact">Book Your AI Audit</Link>
                        </Button>
                        <Button asChild variant="outline" className="btn-secondary h-14 px-8 text-lg border-white/10 hover:bg-white/5">
                            <Link href="/pricing">View Packages</Link>
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
                            Your <span className="text-gradient">Digital Workforce.</span>
                        </h2>
                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                            We don&apos;t just &apos;install&apos; software. We architect intelligence. Our systems learn your business, qualify your leads, and handle the grunt work so you can focus on leading.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                <span className="text-3xl font-bold text-white block mb-1">65%</span>
                                <span className="text-xs text-zinc-500 uppercase tracking-widest">Efficiency Gain</span>
                            </div>
                            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                <span className="text-3xl font-bold text-white block mb-1">&lt; 1m</span>
                                <span className="text-xs text-zinc-500 uppercase tracking-widest">Lead Response Time</span>
                            </div>
                        </div>
                    </div>
                    <div className="glass p-8 rounded-3xl border border-accent-tertiary/20 bg-accent-tertiary/5">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-accent-tertiary/20 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-accent-tertiary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Intelligent Chatbots</h4>
                                    <p className="text-xs text-zinc-400">24/7 lead capture and qualification.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                                    <Workflow className="w-5 h-5 text-accent-primary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">n8n Custom Flows</h4>
                                    <p className="text-xs text-zinc-400">Automate any task across any software.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-accent-secondary/20 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-accent-secondary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Time Retrieval</h4>
                                    <p className="text-xs text-zinc-400">Buying back 10+ hours of your week.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Process Section */}
            <section className="mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">The Automation Path</h2>
                    <p className="text-zinc-500">How we turn repetitive tasks into efficient systems.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: 'Audit', icon: <Search className="w-5 h-5" />, desc: 'Identifying tasks that are eating your time.' },
                        { title: 'Architect', icon: <Cpu className="w-5 h-5" />, desc: 'Designing the logic and data connections.' },
                        { title: 'Automate', icon: <Zap className="w-5 h-5" />, desc: 'Building and testing your new digital workforce.' },
                        { title: 'Amplify', icon: <TrendingUp className="w-5 h-5" />, desc: 'Continuous optimization and scaling ROI.' }
                    ].map((step, i) => (
                        <div key={i} className="relative group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-tertiary mb-6 transition-all group-hover:scale-110 group-hover:bg-accent-tertiary group-hover:text-black">
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
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent-tertiary/5 blur-[80px] -mr-32 -mt-32" />
                    <h2 className="text-3xl font-bold text-white mb-10">AI Work-Orders</h2>
                    <div className="grid md:grid-cols-2 gap-y-6 gap-x-12">
                        {deliverables.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 text-zinc-300">
                                <CheckCircle2 className="w-5 h-5 text-accent-tertiary flex-shrink-0" />
                                <span className="font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Pricing Preview */}
            <section className="mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Investment Roadmaps</h2>
                    <p className="text-zinc-500">Scalable intelligence for growing Tri-Cities brands.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="glass p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-2">The Starter Agent</h3>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-white">$497</span>
                            <span className="text-zinc-500 text-sm">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="text-sm text-zinc-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-600" /> 1 High-Impact Automation</li>
                            <li className="text-sm text-zinc-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-600" /> Basic Lead-Capture Chatbot</li>
                            <li className="text-sm text-zinc-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-600" /> Managed System Hosting</li>
                        </ul>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/contact">Get Started</Link>
                        </Button>
                    </div>
                    <div className="glass p-8 rounded-3xl border border-accent-tertiary/30 bg-accent-tertiary/5 relative flex flex-col">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-gradient text-black font-bold text-xs rounded-full uppercase tracking-tighter">Growth</div>
                        <h3 className="text-xl font-bold text-white mb-2">The Full Workforce</h3>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-white">$997</span>
                            <span className="text-zinc-500 text-sm">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="text-sm text-zinc-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-tertiary" /> 3+ Custom Workflow Automations</li>
                            <li className="text-sm text-zinc-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-tertiary" /> Advanced AI Support Agent</li>
                            <li className="text-sm text-zinc-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-tertiary" /> Priority Build Support</li>
                        </ul>
                        <Button asChild className="btn-primary border-none text-white bg-accent-tertiary shadow-[0_0_30px_rgba(6,182,212,0.3)] w-full">
                            <Link href="/contact">Start Automating</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* 8. FAQ Section */}
            <section className="mb-32">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">AI Questions</h2>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border border-white/5 bg-white/[0.01] rounded-2xl px-6 py-2 overflow-hidden">
                                <AccordionTrigger className="text-white hover:text-accent-tertiary text-left font-bold text-lg hover:no-underline">
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
                className="text-center bg-accent-tertiary/5 border border-accent-tertiary/10 p-16 rounded-[3rem] relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-accent-gradient opacity-5" />
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Stop Doing $10/hr Work.</h2>
                <p className="text-zinc-400 mb-12 max-w-2xl mx-auto text-xl relative z-10 leading-relaxed">
                    Most Richland business owners spend 40% of their time on tasks AI can handle today. Let&apos;s get that time back.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                    <Button asChild className="btn-primary h-16 px-12 text-xl bg-accent-tertiary hover:bg-accent-tertiary/90 shadow-[0_0_40px_rgba(6,182,212,0.4)] border-none">
                        <Link href="/contact" className="flex items-center gap-3">
                            Claim Your AI Audit
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </ServicePageLayout>
    )
}
