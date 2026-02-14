"use client"

import React from 'react'
import { ServicePageLayout } from '@/components/services/ServicePageLayout'
import { motion } from 'framer-motion'
import { Star, ShieldCheck, Map, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function GBPPageContent() {
    return (
        <ServicePageLayout
            breadcrumbs={[
                { label: 'Services', href: '/services' },
                { label: 'SEO', href: '/services/seo' },
                { label: 'GBP Optimization', href: '/services/seo/google-business-profile' }
            ]}
        >
            <div className="max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-5xl font-bold text-white mb-6">Google Business Profile (GMB) Mastery</h1>
                    <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
                        Your Google Business Profile is often the first thing customers see. We optimize every aspect—from categories and descriptions to posts and reviews—to ensure you dominate the Map Pack.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="glass p-8 rounded-2xl border-white/5">
                            <Star className="w-10 h-10 text-amber-500 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Review Management</h3>
                            <p className="text-zinc-500 text-sm">Automated systems to capture 5-star reviews and handle developer responses.</p>
                        </div>
                        <div className="glass p-8 rounded-2xl border-white/5">
                            <Map className="w-10 h-10 text-accent-primary mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Map Pack Ranking</h3>
                            <p className="text-zinc-500 text-sm">Strategic category and attribute selection to bypass competition in Richland.</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-8">GBP Fundamentals</h2>
                    <div className="space-y-4 mb-16">
                        {[
                            { t: "Profile Verification", d: "We handle the multi-step verification process to ensure your listing is official." },
                            { t: "Weekly Posting", d: "Consistent updates tell Google your business is active and relevant." },
                            { t: "Question & Answer Management", d: "Seizing the opportunity to answer customer FAQs directly on your profile." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                <ShieldCheck className="w-6 h-6 text-accent-primary shrink-0" />
                                <div>
                                    <h4 className="text-white font-bold">{item.t}</h4>
                                    <p className="text-zinc-400 text-sm">{item.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button asChild className="btn-primary h-14 px-8 text-lg">
                        <Link href="/contact" className="flex items-center gap-2">
                            Optimize My Profile
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </ServicePageLayout>
    )
}
