"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { BreadcrumbV2 } from '@/components/v2/BreadcrumbV2'

interface IndustryContentProps {
    industry: string;
    description: string;
    features: { title: string; desc: string; icon: React.ReactNode }[];
    benefits: string[];
}

export function IndustryPageContent({ industry, description, features, benefits }: IndustryContentProps) {
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
                    { label: 'Industries', href: '/industries' },
                    { label: industry, href: `/industries/${industry.toLowerCase().replace(/\s+/g, '-')}` },
                ]} />

                {/* 1. Hero */}
                <div className="max-w-4xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 uppercase tracking-wider">
                            Tailored Solutions | {industry}
                        </span>
                        <h1
                            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Digital Growth for <br />
                            <span className="text-indigo-300">{industry}.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                            {description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                            >
                                Book Your Discovery Call
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold rounded-xl border border-white/10 hover:bg-white/5 text-white transition-colors"
                            >
                                View All Services
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* 2. Feature Cards */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2
                            className="text-3xl md:text-5xl font-bold text-white mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Built for {industry}
                        </h2>
                        <p className="text-zinc-500">Industry-specific systems, not generic templates.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6 text-indigo-300">
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 3. Benefits */}
                <section className="mb-32">
                    <div className="bg-white/5 backdrop-blur-sm p-12 rounded-[2rem] border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[80px] -mr-32 -mt-32" />
                        <h2
                            className="text-3xl font-bold text-white mb-10"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Why Work with Digital Helper?
                        </h2>
                        <div className="space-y-4">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-4 text-zinc-300">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                                    <span className="text-sm leading-relaxed">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. CTA */}
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
                        Ready to Scale Your {industry} Business?
                    </h2>
                    <p className="text-zinc-400 mb-12 max-w-2xl mx-auto text-xl relative z-10 leading-relaxed">
                        We don&apos;t do generic. We build systems based on your specific industry challenges and goals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-3 h-16 px-12 text-xl font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                        >
                            Book Your Industry Discovery Call
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </motion.div>

            </div>
        </main>
    )
}
