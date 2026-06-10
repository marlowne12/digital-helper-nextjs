"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, CheckCircle2, ArrowRight, XCircle, TrendingUp, Link2 as LinkIcon } from 'lucide-react'
import { BreadcrumbV2 } from '@/components/v2/BreadcrumbV2'
import { PayForResultsBlock } from '@/components/v2/PayForResultsBlock'

const painPoints = [
    {
        title: "Invisible on Google Maps",
        desc: "97% of people look up local businesses online. If you're not showing up in the Map Pack, you don't exist to them."
    },
    {
        title: "Buried Below Competitors",
        desc: "Your competitor three blocks away is ranking above you. That's not luck—it's local SEO signals you haven't built yet."
    },
    {
        title: "No Neighborhood Presence",
        desc: "Generic SEO doesn't win local. You need hyper-local content targeting 'HVAC Kennewick' and 'plumber Pasco WA' specifically."
    },
    {
        title: "Inconsistent Citations",
        desc: "Wrong address on Yelp, old phone on YellowPages. Google sees conflicting data and punishes your ranking for it."
    }
]

const stats = [
    "97% of people learn about local businesses online before visiting.",
    "88% of local mobile searches lead to a call or visit within 24 hours.",
    "18% of local smartphone searches result in a purchase within the same day."
]

const deliverables = [
    "Geofenced Keyword Targeting (City + Neighborhood)",
    "Local Citation Building Across 100+ Directories",
    "NAP Consistency Audit & Correction",
    "Google Business Profile Optimization",
    "Hyperlocal Landing Page Creation",
    "Monthly Local Ranking Reports"
]

export function LocalSEOPageContent() {
    return (
        <main className="min-h-screen bg-[#0a0a0f] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 relative">

                {/* Breadcrumb */}
                <BreadcrumbV2 items={[
                    { label: 'Services', href: '/services' },
                    { label: 'SEO', href: '/services/seo' },
                    { label: 'Local SEO', href: '/services/seo/local-seo' },
                ]} />

                {/* 1. Hero */}
                <div className="max-w-4xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 uppercase tracking-wider">
                            Hyper-Local Search Domination
                        </span>
                        <h1
                            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Own Your City&apos;s <br />
                            <span className="text-indigo-300">Search Results.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                            We optimize your business to be the top choice in Richland, Kennewick, and Pasco. Our local SEO strategy targets intent-based geographical searches that drive calls and physical traffic.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                            >
                                Get Your Local SEO Plan
                            </Link>
                            <Link
                                href="/services/seo"
                                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold rounded-xl border border-white/10 hover:bg-white/5 text-white transition-colors"
                            >
                                View All SEO Services
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
                            Our Local SEO Approach
                        </h2>
                        <p className="text-zinc-500">Three pillars that push you to the top of local results.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-charcoal p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
                                <MapPin className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Geofenced Optimization</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">Targeting neighborhood-specific keywords like &quot;web design north richland&quot; or &quot;plumber kennewick wa&quot; for maximum local relevance.</p>
                        </div>
                        <div className="bg-charcoal p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
                                <LinkIcon className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Citation Building</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">Ensuring your NAP (Name, Address, Phone) is consistent across 100+ local directories to signal authority to Google.</p>
                        </div>
                        <div className="bg-charcoal p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
                                <TrendingUp className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Local Content Clusters</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">City-specific landing pages and blog content that establish you as the authority in every Tri-Cities neighborhood.</p>
                        </div>
                    </div>
                </section>

                {/* 4. Stats + Deliverables */}
                <section className="mb-32">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="bg-charcoal p-10 rounded-[2rem] border border-white/10">
                            <h2
                                className="text-2xl font-bold text-white mb-8"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Why Local SEO?
                            </h2>
                            <div className="space-y-6">
                                {stats.map((item, i) => (
                                    <div key={i} className="flex gap-4 items-start text-zinc-300">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                        <span className="text-sm leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-charcoal p-10 rounded-[2rem] border border-white/10 relative overflow-hidden">
                            <h2
                                className="text-2xl font-bold text-white mb-8"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Monthly Deliverables
                            </h2>
                            <div className="space-y-4">
                                {deliverables.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-zinc-300">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                                        <span className="font-medium text-sm">{item}</span>
                                    </div>
                                ))}
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
                    className="text-center bg-charcoal border border-steel/30 p-16 rounded-[3rem] relative overflow-hidden"
                >
                    <h2
                        className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Be the Business Richland Finds First.
                    </h2>
                    <p className="text-zinc-400 mb-12 max-w-2xl mx-auto text-xl relative z-10 leading-relaxed">
                        Let&apos;s audit your current local presence and build a roadmap to Page 1 in the Tri-Cities market.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-3 h-16 px-12 text-xl font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                        >
                            Get Your Local SEO Plan
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </motion.div>

            </div>
        </main>
    )
}
