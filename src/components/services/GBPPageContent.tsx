"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, ShieldCheck, Map, ArrowRight, XCircle, Camera } from 'lucide-react'
import { BreadcrumbV2 } from '@/components/v2/BreadcrumbV2'
import { PayForResultsBlock } from '@/components/v2/PayForResultsBlock'

const painPoints = [
    {
        title: "Incomplete Profile",
        desc: "Missing hours, photos, or categories? Google ranks complete profiles higher. An incomplete GBP is an invisible business."
    },
    {
        title: "Zero Reviews Strategy",
        desc: "Reviews are the #1 local ranking factor. If you're not actively generating them, you're losing to businesses that are."
    },
    {
        title: "Unanswered Q&As",
        desc: "Google lets anyone answer questions on your profile—including your competitors. We control your narrative proactively."
    },
    {
        title: "Stale Content",
        desc: "A GBP with no posts or updates signals an inactive business. Regular posting tells Google you're open and relevant."
    }
]

const fundamentals = [
    {
        t: "Profile Verification & Setup",
        d: "We handle the multi-step verification process to ensure your listing is official and fully claimed."
    },
    {
        t: "Weekly Google Posts",
        d: "Consistent updates tell Google your business is active and relevant, boosting your local ranking signals."
    },
    {
        t: "Question & Answer Management",
        d: "We seed your profile with your own Q&As and monitor for competitor interference."
    },
    {
        t: "Photo Optimization",
        d: "High-quality, geotagged photos of your work, team, and location to maximize profile engagement."
    },
    {
        t: "Review Generation System",
        d: "Automated SMS/email requests sent after every job to capture 5-star reviews at peak satisfaction."
    },
    {
        t: "Map Pack Ranking Strategy",
        d: "Strategic category and attribute selection combined with proximity signals to bypass competitors."
    }
]

export function GBPPageContent() {
    return (
        <main className="min-h-screen bg-[#0a0a0f] overflow-hidden">

            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 relative">

                {/* Breadcrumb */}
                <BreadcrumbV2 items={[
                    { label: 'Services', href: '/services' },
                    { label: 'SEO', href: '/services/seo' },
                    { label: 'Google Business Profile', href: '/services/seo/google-business-profile' },
                ]} />

                {/* 1. Hero */}
                <div className="max-w-4xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 uppercase tracking-wider">
                            Google Business Profile Mastery
                        </span>
                        <h1
                            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Dominate the <br />
                            <span className="text-indigo-300">Google Map Pack.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                            Your Google Business Profile is often the first thing customers see. We optimize every aspect—from categories and descriptions to posts and reviews—to ensure you show up in the top 3.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                            >
                                Optimize My Profile
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
                            What We Manage For You
                        </h2>
                        <p className="text-zinc-500">Total profile ownership so you can focus on running your business.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-charcoal p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
                                <Star className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Review Management</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">Automated systems to capture 5-star reviews and craft professional, SEO-rich responses to every review.</p>
                        </div>
                        <div className="bg-charcoal p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
                                <Map className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Map Pack Ranking</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">Strategic category and attribute selection to bypass competition and land your business in the top 3 results.</p>
                        </div>
                        <div className="bg-charcoal p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
                                <Camera className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Photo Optimization</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">High-quality, geotagged photos of your work and team that drive engagement and signal an active business.</p>
                        </div>
                    </div>
                </section>

                {/* 4. GBP Fundamentals */}
                <section className="mb-32">
                    <div className="bg-charcoal p-12 rounded-[2rem] border border-white/10 relative overflow-hidden">
                        <h2
                            className="text-3xl font-bold text-white mb-10"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            GBP Fundamentals We Handle
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {fundamentals.map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                    <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-white font-bold text-sm mb-1">{item.t}</h4>
                                        <p className="text-zinc-400 text-sm leading-relaxed">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Stats */}
                <section className="mb-32">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 text-center">
                            <span className="text-4xl font-bold text-white block mb-2">70%</span>
                            <span className="text-sm text-zinc-500 uppercase tracking-widest">Of local clicks go to Map Pack top 3</span>
                        </div>
                        <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 text-center">
                            <span className="text-4xl font-bold text-white block mb-2">+9%</span>
                            <span className="text-sm text-zinc-500 uppercase tracking-widest">Revenue per 1-star rating increase</span>
                        </div>
                        <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 text-center">
                            <span className="text-4xl font-bold text-white block mb-2">2.7x</span>
                            <span className="text-sm text-zinc-500 uppercase tracking-widest">More reputable with complete profile</span>
                        </div>
                    </div>
                </section>

                {/* Pay-For-Results Block */}
                <PayForResultsBlock ctaLabel="Get a Free Audit" />

                {/* 6. Final CTA */}
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
                        Be the Business Richland Calls First.
                    </h2>
                    <p className="text-zinc-400 mb-12 max-w-2xl mx-auto text-xl relative z-10 leading-relaxed">
                        Let&apos;s do a free GBP audit and show you exactly what&apos;s holding you out of the Map Pack—and how to fix it fast.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-3 h-16 px-12 text-xl font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                        >
                            Optimize My Profile
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </motion.div>

            </div>
        </main>
    )
}
