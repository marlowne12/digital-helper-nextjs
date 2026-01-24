"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Search,
    MapPin,
    TrendingUp,
    ArrowRight,
    CheckCircle2,
    Link2 as LinkIcon,
    Zap,
    BarChart3,
    XCircle
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
        title: "Invisible to Local Customers",
        desc: "If you don't appear in the top 3 'Map Pack' results, you're missing out on 70% of local traffic in the Tri-Cities."
    },
    {
        title: "Competitors Outranking You",
        desc: "Seeing your competitors at the top while your business is buried on Page 2? That's revenue walking out your door."
    },
    {
        title: "The 'SEO Guru' Burn",
        desc: "Tried SEO before and got 'monthly reports' but zero new phone calls? We focus on rankings that actually convert."
    },
    {
        title: "Outdated GBP Data",
        desc: "Incorrect hours, zero reviews, or missing photos? Google de-prioritizes businesses with incomplete profiles."
    }
]

const deliverables = [
    "Google Business Profile (GBP) Full Optimization",
    "Local Citation Building & NAP Consistency",
    "On-Page Technical SEO Audit & Implementation",
    "Hyper-Local Keyword Targeting (City-Specific)",
    "High-Authority Local Backlink Strategy",
    "Monthly Transparent ROI & Ranking Reports"
]

const faqs = [
    {
        q: "How long does it take to see results?",
        a: "Local SEO is a marathon, not a sprint. While some improvements (like GBP optimization) show results in weeks, meaningful Page 1 rankings typically take 3 to 6 months depending on competition."
    },
    {
        q: "Will I rank #1 on Google?",
        a: "While no one can guaranteed #1 rankings (beware of anyone who does), our systems are designed to push you into the 'Map Pack' (top 3) where the vast majority of local leads originate."
    },
    {
        q: "Do you handle my Google Business Profile?",
        a: "Yes! We manage everything from initial verification and set-up to weekly posts, photo updates, and review monitoring to keep your profile active and favored by Google's algorithm."
    },
    {
        q: "What is a 'Local Citation'?",
        a: "A citation is any mention of your Name, Address, and Phone (NAP) on other websites like Yelp, YellowPages, or local chambers. Consistent citations are a critical ranking factor for local SEO."
    }
]

export function SEOPageContent() {
    return (
        <ServicePageLayout
            breadcrumbs={[
                { label: 'Services', href: '/services' },
                { label: 'SEO & Local Search', href: '/services/seo' }
            ]}
        >
            {/* 1. Hero Section */}
            <div className="max-w-4xl mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent-secondary/10 border border-accent-secondary/20 text-accent-secondary text-sm font-medium mb-6 uppercase tracking-wider">
                        Hyper-Local Search Authority
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                        Dominate Local <br />
                        <span className="text-gradient">Search Results.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                        If your business isn&apos;t on Page 1, you don&apos;t exist in the Tri-Cities. We use proven local SEO strategies to ensure Richland, Kennewick, and Pasco customers find you first.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild className="btn-primary h-14 px-8 text-lg bg-accent-secondary hover:bg-accent-secondary/90 shadow-[0_0_20px_rgba(14,165,233,0.3)] border-none">
                            <Link href="/contact">Claim Your Free Audit</Link>
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
                            The <span className="text-gradient">Map Pack</span> Mastery.
                        </h2>
                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                            70% of local clicks go to the top 3 results on Google Maps. We don&apos;t just &apos;do SEO&apos;&mdash;we optimize every signal Google looks for to put you in the spotlight.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                <span className="text-3xl font-bold text-white block mb-1">46%</span>
                                <span className="text-xs text-zinc-500 uppercase tracking-widest">Of all Google Searches</span>
                            </div>
                            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                <span className="text-3xl font-bold text-white block mb-1">88%</span>
                                <span className="text-xs text-zinc-500 uppercase tracking-widest">Mobile Visit Potential</span>
                            </div>
                        </div>
                    </div>
                    <div className="glass p-8 rounded-3xl border border-accent-secondary/20 bg-accent-secondary/5">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-accent-secondary/20 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-accent-secondary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">GBP Optimization</h4>
                                    <p className="text-xs text-zinc-400">Total profile management for maximum local authority.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                                    <LinkIcon className="w-5 h-5 text-accent-primary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Citation Stacking</h4>
                                    <p className="text-xs text-zinc-400">Building trust across the entire local digital ecosystem.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-accent-tertiary/20 flex items-center justify-center">
                                    <BarChart3 className="w-5 h-5 text-accent-tertiary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">On-Page Signals</h4>
                                    <p className="text-xs text-zinc-400">Optimizing code and content for your specific city.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Process Section */}
            <section className="mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Our SEO Funnel</h2>
                    <p className="text-zinc-500">A systematic approach to owning your local market.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: 'Audit', icon: <Search />, desc: 'Deep-dive rankings and competitor GAP analysis.' },
                        { title: 'Optimize', icon: <Zap />, desc: 'Technical fixes and GBP profile overhaul.' },
                        { title: 'Amplify', icon: <TrendingUp />, desc: 'Citation building and local content creation.' },
                        { title: 'Report', icon: <BarChart3 />, desc: 'Monthly data-driven ROI and ranking tracking.' }
                    ].map((step, i) => (
                        <div key={i} className="relative group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-secondary mb-6 transition-all group-hover:scale-110 group-hover:bg-accent-secondary group-hover:text-black">
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
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent-secondary/5 blur-[80px] -mr-32 -mt-32" />
                    <h2 className="text-3xl font-bold text-white mb-10">Monthly Deliverables</h2>
                    <div className="grid md:grid-cols-2 gap-y-6 gap-x-12">
                        {deliverables.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 text-zinc-300">
                                <CheckCircle2 className="w-5 h-5 text-accent-secondary flex-shrink-0" />
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
                    <p className="text-zinc-500">Data-driven growth for every size of service business.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="glass p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-2">Local Foundation</h3>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-white">$750</span>
                            <span className="text-zinc-500 text-sm">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="text-sm text-zinc-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-600" /> GBP Management & Posting</li>
                            <li className="text-sm text-zinc-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-600" /> Basic Citation Building</li>
                            <li className="text-sm text-zinc-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-600" /> Quarterly Keyword Analysis</li>
                        </ul>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/contact">Get Started</Link>
                        </Button>
                    </div>
                    <div className="glass p-8 rounded-3xl border border-accent-secondary/30 bg-accent-secondary/5 relative flex flex-col">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-gradient text-black font-bold text-xs rounded-full uppercase tracking-tighter">Growth</div>
                        <h3 className="text-xl font-bold text-white mb-2">Market Dominator</h3>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-white">$1,500+</span>
                            <span className="text-zinc-500 text-sm">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="text-sm text-zinc-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-secondary" /> Aggressive Backlink Stacking</li>
                            <li className="text-sm text-zinc-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-secondary" /> Monthly Content Clusters</li>
                            <li className="text-sm text-zinc-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-secondary" /> Competitor Performance War</li>
                        </ul>
                        <Button asChild className="w-full btn-primary border-none text-white bg-accent-secondary shadow-[0_0_30px_rgba(14,165,233,0.3)]">
                            <Link href="/contact">Start Dominating</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* 8. FAQ Section */}
            <section className="mb-32">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">SEO Questions</h2>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border border-white/5 bg-white/[0.01] rounded-2xl px-6 py-2 overflow-hidden">
                                <AccordionTrigger className="text-white hover:text-accent-secondary text-left font-bold text-lg hover:no-underline">
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
                className="text-center bg-accent-secondary/5 border border-accent-secondary/10 p-16 rounded-[3rem] relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-accent-gradient opacity-5" />
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Stop Being Google&apos;s Best Kept Secret.</h2>
                <p className="text-zinc-400 mb-12 max-w-2xl mx-auto text-xl relative z-10 leading-relaxed">
                    Most Tri-Cities businesses are just a few signal changes away from Page 1. Let&apos;s find your gaps and fill them.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                    <Button asChild className="btn-primary h-16 px-12 text-xl bg-accent-secondary hover:bg-accent-secondary/90 shadow-[0_0_40px_rgba(14,165,233,0.4)] border-none">
                        <Link href="/contact" className="flex items-center gap-3">
                            Claim Your Free Audit
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </ServicePageLayout>
    )
}
