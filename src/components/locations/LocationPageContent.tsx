"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight, CheckCircle2, Search, Star, Zap } from 'lucide-react'
import { BreadcrumbV2 } from '@/components/v2/BreadcrumbV2'

interface LocationContentProps {
    city: string;
    description: string;
    marketStats: { label: string; value: string }[];
    neighborhoods: string[];
}

const services = [
    {
        icon: <Search className="w-6 h-6 text-indigo-300" />,
        title: "Local SEO & Map Pack",
        desc: "Rank at the top of Google when customers in your city search for your services."
    },
    {
        icon: <Zap className="w-6 h-6 text-indigo-300" />,
        title: "High-Performance Websites",
        desc: "Fast, mobile-first sites built to convert local visitors into booked jobs."
    },
    {
        icon: <Star className="w-6 h-6 text-indigo-300" />,
        title: "Reputation Management",
        desc: "Automated review systems that keep your Google rating rising month over month."
    }
]

export function LocationPageContent({ city, description, marketStats, neighborhoods }: LocationContentProps) {
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
                    { label: 'Locations', href: '/locations' },
                    { label: city, href: `/locations/${city.toLowerCase().replace(/\s+/g, '-')}` },
                ]} />

                {/* 1. Hero */}
                <div className="max-w-4xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 uppercase tracking-wider">
                            Local Digital Partner | {city}, WA
                        </span>
                        <h1
                            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Web Design & SEO <br />
                            <span className="text-indigo-300">in {city}.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                            {description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                            >
                                Claim My Free Site Audit
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold rounded-xl border border-white/10 hover:bg-white/5 text-white transition-colors"
                            >
                                View Our Services
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* 2. Market Stats */}
                <section className="mb-32">
                    <div className="grid md:grid-cols-3 gap-6">
                        {marketStats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 text-center"
                            >
                                <span className="text-4xl font-bold text-white block mb-2">{stat.value}</span>
                                <span className="text-sm text-zinc-500 uppercase tracking-widest">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 3. Services we offer in this city */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2
                            className="text-3xl md:text-5xl font-bold text-white mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            How We Grow {city} Businesses
                        </h2>
                        <p className="text-zinc-500">The same playbook dominating Tri-Cities search results.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((svc, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
                                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
                                    {svc.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{svc.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{svc.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. Neighborhoods */}
                <section className="mb-32">
                    <div className="bg-white/5 backdrop-blur-sm p-12 rounded-[2rem] border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[80px] -mr-32 -mt-32" />
                        <h2
                            className="text-3xl font-bold text-white mb-10"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Serving All of {city}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {neighborhoods.map((n, i) => (
                                <div key={i} className="flex items-center gap-2 text-zinc-300">
                                    <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                                    <span className="text-sm">{n}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. CTA */}
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
                        Ready to Dominate {city}?
                    </h2>
                    <p className="text-zinc-400 mb-12 max-w-2xl mx-auto text-xl relative z-10 leading-relaxed">
                        We&apos;re a local Richland agency that understands the {city} market better than anyone. Let&apos;s build your advantage.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-3 h-16 px-12 text-xl font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                        >
                            Claim My Free Site Audit
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </motion.div>

            </div>
        </main>
    )
}
