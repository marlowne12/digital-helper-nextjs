"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Cpu,
    MessageSquare,
    ArrowRight,
    CheckCircle2,
    Bot,
    Workflow
} from 'lucide-react'
import { Button } from "@/components/ui/button"

const tools = [
    {
        icon: <Bot className="w-6 h-6 text-accent-purple" />,
        title: "24/7 AI Receptionist",
        description: "Our AI agents answer customer questions and book appointments while you sleep. Never miss a lead again."
    },
    {
        icon: <Workflow className="w-6 h-6 text-accent-indigo" />,
        title: "Workflow Automation",
        description: "We connect your tools (CRM, Email, Slack) so data flows automatically. Say goodbye to manual entry."
    },
    {
        icon: <MessageSquare className="w-6 h-6 text-accent-blue" />,
        title: "Sentiment Scoring",
        description: "Identify high-value leads automatically based on their language, priorities, and urgency."
    }
]

export default function AIAutomationPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-background-primary overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">

                {/* Hero Section */}
                <div className="max-w-4xl mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-accent-purple text-sm font-medium mb-6">
                            Next-Gen Business Operations
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                            Buy Back Your <br />
                            <span className="text-gradient">Freedom with AI.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                            Stop wasting hours on repetitive administrative tasks. We build custom AI systems that qualify leads, schedule calls, and handle customer support 24/7.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button asChild className="btn-primary h-14 px-8 text-lg">
                                <Link href="/contact">Book an Automation Audit</Link>
                            </Button>
                            <Button asChild variant="outline" className="btn-secondary h-14 px-8 text-lg">
                                <Link href="/pricing">View Packages</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Tools Grid */}
                <section className="mb-32">
                    <div className="grid md:grid-cols-3 gap-8">
                        {tools.map((tool, index) => (
                            <motion.div
                                key={tool.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass p-8 group hover:border-accent-purple/20 transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {tool.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{tool.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {tool.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* The Value Section */}
                <section className="mb-32">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="glass p-1 rounded-[2.5rem] relative group overflow-hidden">
                            <div className="absolute inset-0 bg-accent-gradient opacity-10 blur-3xl rotate-12" />
                            <div className="relative z-10 p-12 space-y-8">
                                <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                                    <Cpu className="w-10 h-10 text-accent-purple" />
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 glass rounded-xl border-accent-purple/20">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Efficiency GAIN</span>
                                            <span className="text-green-500 font-bold">+65%</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "65%" }}
                                                className="h-full bg-accent-gradient"
                                                transition={{ duration: 1, delay: 0.5 }}
                                            />
                                        </div>
                                    </div>
                                    <div className="p-4 glass rounded-xl border-white/5">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-zinc-500 uppercase font-bold tracking-widest">LEAD RESPONSE TIME</span>
                                            <span className="text-accent-blue font-bold">&lt; 1 min</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "95%" }}
                                                className="h-full bg-accent-blue"
                                                transition={{ duration: 1, delay: 0.7 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                                Your Digital <br />
                                <span className="text-gradient">Workforce.</span>
                            </h2>
                            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                                We don&apos;t just &apos;install&apos; software. We architect intelligence. Our systems learn your business, qualify your leads, and handle the grunt work so you can lead.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { title: "Custom n8n Workflows", desc: "Complex logic that bridges all your business apps into one seamless system." },
                                    { title: "Voice & Chat Agents", desc: "Natural language processing that feels human but works at machine speed." },
                                    { title: "Predictive Analytics", desc: "Know which customers will close before you even talk to them." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="mt-1">
                                            <CheckCircle2 className="w-5 h-5 text-accent-purple" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">{item.title}</h4>
                                            <p className="text-zinc-500 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-accent-indigo/5 border border-accent-indigo/10 p-16 rounded-[3rem]"
                >
                    <h2 className="text-4xl font-bold text-white mb-6">Automate or Be Automated.</h2>
                    <p className="text-zinc-400 mb-10 max-w-xl mx-auto text-lg">
                        The era of manual data entry is over. Let&apos;s build a system that scales your business without adding headcount.
                    </p>
                    <Button asChild className="btn-primary h-14 px-12 text-lg">
                        <Link href="/contact" className="flex items-center gap-2">
                            Book Your AI Audit
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </main>
    )
}
