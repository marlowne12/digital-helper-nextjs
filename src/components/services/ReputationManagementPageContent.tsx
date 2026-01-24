"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Star,
    ShieldCheck,
    ArrowRight,
    MessageSquare,
    Search,
    XCircle,
    CheckCircle2,
    Workflow
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
        title: "Review Stagnation",
        desc: "Haven't seen a new review in months? Customers assume you've closed shop or your quality has dipped."
    },
    {
        title: "The Silent Negative",
        desc: "One bad review can scare away dozens of leads. Do you have a plan to handle feedback before it hurts your bottom line?"
    },
    {
        title: "Response Delay",
        desc: "In the Tri-Cities, speed is trust. If you take days to respond to reviews, customers move to the next business."
    },
    {
        title: "Trust GAP",
        desc: "Is your business quality better than your star rating? We help your online presence reflect your actual excellence."
    }
]

const deliverables = [
    "AI-Powered Review Monitoring (24/7)",
    "Automated Review Generation System",
    "Smart Sentiment Analysis & Reporting",
    "Professional Review Response Drafting",
    "Negative Feedback Interception System",
    "Google Business Profile Review Integration"
]

const faqs = [
    {
        q: "Can you remove negative reviews?",
        a: "While we cannot directly 'delete' reviews (Google's policy), we help you bury them with fresh, positive feedback and provide a professional framework for responding that builds trust with future readers."
    },
    {
        q: "How do you 'automate' review requests?",
        a: "We integrate with your CRM or POS system to automatically send review requests via SMS or email immediately after a successful service, when satisfaction is highest."
    },
    {
        q: "Do I have to approve the AI responses?",
        a: "Yes, you have full control. You can choose to have the AI draft responses for your approval, or set specific parameters for automatic replies to 5-star reviews."
    },
    {
        q: "Is reputation management worth the monthly cost?",
        a: "A 1-star increase in rating can boost revenue by 5-9%. Our system pays for itself by capturing leads that would otherwise walk away due to a lower rating."
    }
]

export function ReputationManagementPageContent() {
    return (
        <ServicePageLayout
            breadcrumbs={[
                { label: 'Services', href: '/services' },
                { label: 'Reputation Management', href: '/services/reputation-management' }
            ]}
        >
            {/* 1. Hero Section */}
            <div className="max-w-4xl mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium mb-6 uppercase tracking-wider">
                        AI-Powered Trust Building
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                        Turn Reviews Into <br />
                        <span className="text-gradient">Revenue.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                        Your online reputation is your most valuable asset. We build systems that automatically monitor, analyze, and generate 5-star reviews to dominate your local market.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild className="btn-primary h-14 px-8 text-lg bg-amber-600 hover:bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)] border-none text-white">
                            <Link href="/contact">Start Your Free Audit</Link>
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
                            Trust Is The <span className="text-gradient">New Currency.</span>
                        </h2>
                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                            93% of customers read online reviews before buying. We don&apos;t just manage reviews&mdash;we build an automated feedback loop that continuously strengthens your brand authority.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                <span className="text-3xl font-bold text-white block mb-1">+9%</span>
                                <span className="text-xs text-zinc-500 uppercase tracking-widest">Revenue Per Star Increase</span>
                            </div>
                            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                <span className="text-3xl font-bold text-white block mb-1">24/7</span>
                                <span className="text-xs text-zinc-500 uppercase tracking-widest">Active Monitoring</span>
                            </div>
                        </div>
                    </div>
                    <div className="glass p-8 rounded-3xl border border-amber-500/20 bg-amber-500/5">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Smart Auto-Replies</h4>
                                    <p className="text-xs text-zinc-400">Contextual, professional responses to every review.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                                    <Star className="w-5 h-5 text-accent-primary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">5-Star Engines</h4>
                                    <p className="text-xs text-zinc-400">Capturing feedback when customer satisfaction is peak.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-accent-secondary/20 flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5 text-accent-secondary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Crisis Protection</h4>
                                    <p className="text-xs text-zinc-400">Identifying and resolving issues before they go public.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Process Section */}
            <section className="mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">The Reputation Roadmap</h2>
                    <p className="text-zinc-500">How we turn satisfied customers into vocal advocates.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: 'Audit', icon: <Search />, desc: 'Sentiment scanning and GBP health check.' },
                        { title: 'Connect', icon: <Workflow className="w-5 h-5" />, desc: 'Linking our system to your current customer flow.' },
                        { title: 'Capture', icon: <Star />, desc: 'Automating review requests post-service.' },
                        { title: 'Monitor', icon: <ShieldCheck />, desc: 'Ongoing protection and AI response handling.' }
                    ].map((step, i) => (
                        <div key={i} className="relative group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 mb-6 transition-all group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black">
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
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] -mr-32 -mt-32" />
                    <h2 className="text-3xl font-bold text-white mb-10">What You Get</h2>
                    <div className="grid md:grid-cols-2 gap-y-6 gap-x-12">
                        {deliverables.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 text-zinc-300">
                                <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                <span className="font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Pricing Preview */}
            <section className="mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Investment Plans</h2>
                    <p className="text-zinc-500">Protecting your brand as it scales in the Tri-Cities.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="glass p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-2">Essential Shield</h3>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-white">$249</span>
                            <span className="text-zinc-500 text-sm">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="text-sm text-zinc-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-600" /> Automated Review Requests</li>
                            <li className="text-sm text-zinc-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-600" /> Basic AI Response Drafting</li>
                            <li className="text-sm text-zinc-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-600" /> Weekly GBP Health Summary</li>
                        </ul>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/contact">Get Started</Link>
                        </Button>
                    </div>
                    <div className="glass p-8 rounded-3xl border border-amber-500/30 bg-amber-500/5 relative flex flex-col">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-gradient text-black font-bold text-xs rounded-full uppercase tracking-tighter">Growth</div>
                        <h3 className="text-xl font-bold text-white mb-2">Domination Pro</h3>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-white">$497</span>
                            <span className="text-zinc-500 text-sm">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="text-sm text-zinc-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Real-time Sentiment War-Room</li>
                            <li className="text-sm text-zinc-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Competitor Benchmarking</li>
                            <li className="text-sm text-zinc-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Deep GMB SEO Signal Stacking</li>
                        </ul>
                        <Button asChild className="btn-primary border-none text-white bg-amber-600 shadow-[0_0_30px_rgba(245,158,11,0.3)] w-full">
                            <Link href="/contact">Defend My Brand</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* 8. FAQ Section */}
            <section className="mb-32">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">Reputation Questions</h2>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border border-white/5 bg-white/[0.01] rounded-2xl px-6 py-2 overflow-hidden">
                                <AccordionTrigger className="text-white hover:text-amber-500 text-left font-bold text-lg hover:no-underline">
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
                className="text-center bg-amber-500/5 border border-amber-500/10 p-16 rounded-[3rem] relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-accent-gradient opacity-5" />
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Stop Letting One Star Kill Your ROI.</h2>
                <p className="text-zinc-400 mb-12 max-w-2xl mx-auto text-xl relative z-10 leading-relaxed">
                    Most Richland businesses have amazing service but an average star rating. Let&apos;s fix that GAP today.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                    <Button asChild className="btn-primary h-16 px-12 text-xl bg-amber-600 hover:bg-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.4)] border-none text-white">
                        <Link href="/contact" className="flex items-center gap-3">
                            Get Your Reputation Audit
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </ServicePageLayout>
    )
}
