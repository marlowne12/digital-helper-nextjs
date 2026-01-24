"use client"

import React from 'react'
import { ServicePageLayout } from '@/components/services/ServicePageLayout'
import { motion } from 'framer-motion'
import { MapPin, Search, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function LocalSEOPageContent() {
    return (
        <ServicePageLayout
            breadcrumbs={[
                { label: 'Services', href: '/services' },
                { label: 'SEO', href: '/services/seo' },
                { label: 'Local SEO', href: '/services/seo/local-seo' }
            ]}
        >
            <div className="max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-5xl font-bold text-white mb-6">Local SEO Domination</h1>
                    <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
                        We optimize your business to be the top choice in Richland, Kennewick, and Pasco. Our local SEO strategy focuses on intent-based geographical searches that drive physical traffic and calls.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="glass p-8 rounded-2xl border-white/5">
                            <MapPin className="w-10 h-10 text-accent-primary mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Geofenced Optimization</h3>
                            <p className="text-zinc-500 text-sm">Targeting neighborhood-specific keywords like &quot;web design north richland&quot; or &quot;plumber kennewick wa&quot;.</p>
                        </div>
                        <div className="glass p-8 rounded-2xl border-white/5">
                            <Search className="w-10 h-10 text-accent-secondary mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Citation Building</h3>
                            <p className="text-zinc-500 text-sm">Ensuring your NAP (Name, Address, Phone) is consistent across 100+ local directories.</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-8">Why Local SEO?</h2>
                    <ul className="space-y-4 mb-16">
                        {[
                            "97% of people learn more about a local company online than anywhere else.",
                            "88% of searches for local businesses on a mobile device either call or visit the business within 24 hours.",
                            "18% of local smartphone searches led to a purchase within a day."
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4 items-center text-zinc-300">
                                <CheckCircle2 className="w-5 h-5 text-accent-primary" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <Button asChild className="btn-primary h-14 px-8 text-lg">
                        <Link href="/contact" className="flex items-center gap-2">
                            Get Your Local SEO Plan
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </ServicePageLayout>
    )
}
