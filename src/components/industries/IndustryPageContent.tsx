"use client"

import React from 'react'
import { IndustryPageLayout } from '@/components/industries/IndustryPageLayout'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface IndustryContentProps {
    industry: string;
    description: string;
    features: { title: string; desc: string; icon: React.ReactNode }[];
    benefits: string[];
}

export function IndustryPageContent({ industry, description, features, benefits }: IndustryContentProps) {
    return (
        <IndustryPageLayout
            breadcrumbs={[
                { label: 'Industries', href: '/industries' },
                { label: industry, href: `/industries/${industry.toLowerCase().replace(' & ', '-').replace(' ', '-')}` }
            ]}
        >
            <div className="max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent-secondary/10 border border-accent-secondary/20 text-accent-secondary text-sm font-medium mb-6 uppercase tracking-wider">
                        Tailored Solutions | {industry}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                        Digital Growth for <br />
                        <span className="text-gradient">{industry}.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
                        {description}
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-20">
                        {features.map((f, i) => (
                            <div key={i} className="glass p-8 rounded-2xl border-white/5 group hover:border-accent-secondary/20 transition-all">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent-secondary mb-6">
                                    {f.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-8">Why Work with Digital Helper?</h2>
                    <ul className="space-y-4 mb-20">
                        {benefits.map((benefit, i) => (
                            <li key={i} className="flex gap-4 items-center text-zinc-300">
                                <CheckCircle2 className="w-5 h-5 text-accent-secondary" />
                                {benefit}
                            </li>
                        ))}
                    </ul>

                    <div className="glass p-12 rounded-[2.5rem] border-white/5 relative overflow-hidden mb-20 text-center">
                        <div className="absolute inset-0 bg-accent-gradient opacity-10" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Ready to Scale your {industry} Business?</h2>
                        <p className="text-zinc-400 mb-10 max-w-xl mx-auto text-lg relative z-10">
                            We don&apos;t do generic. We build systems based on your specific industry challenges and goals.
                        </p>
                        <Button asChild className="btn-primary h-14 px-12 text-lg relative z-10 bg-accent-secondary hover:bg-accent-secondary/90 shadow-[0_0_30px_rgba(14,165,233,0.3)] border-none">
                            <Link href="/contact" className="flex items-center gap-2">
                                Book Your Industry Discovery Call
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </IndustryPageLayout>
    )
}
