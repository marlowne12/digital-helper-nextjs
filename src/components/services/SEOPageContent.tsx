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
    Globe2
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ServicePageLayout } from '@/components/services/ServicePageLayout'
import { StatisticCard } from '@/components/services/StatisticCard'

const strategies = [
    {
        icon: <Search className="w-6 h-6 text-accent-purple" />,
        title: "Keyword Domination",
        description: "We don't just target 'Richland', we target the specific terms your customers are typing into Google right now."
    },
    {
        icon: <MapPin className="w-6 h-6 text-accent-indigo" />,
        title: "GMB Optimization",
        description: "Your Google Business Profile is your storefront. We optimize it to ensure you show up in the top 3 'Map Pack' results."
    },
    {
        icon: <TrendingUp className="w-6 h-6 text-accent-blue" />,
        title: "Authority Stacking",
        description: "We build high-quality local citations and backlinks that tell Google your business is the most trusted in the Tri-Cities."
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
            {/* Hero Section */}
            <div className="max-w-4xl mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-accent-purple text-sm font-medium mb-6">
                        Hyper-Local Visibility
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                        Be Seen First in <br />
                        <span className="text-gradient">The Tri-Cities.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                        If your business isn&apos;t on Page 1, you don&apos;t exist. We use advanced local SEO tactics to ensure Richland, Kennewick, and Pasco customers find you before your competition.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild className="btn-primary h-14 px-8 text-lg">
                            <Link href="/contact">Get a Free SEO Audit</Link>
                        </Button>
                        <Button asChild variant="outline" className="btn-secondary h-14 px-8 text-lg">
                            <Link href="/pricing">View Packages</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Statistics Section */}
            <section className="mb-24">
                <div className="grid md:grid-cols-2 gap-6">
                    <StatisticCard
                        value="46%"
                        label="Local Intent"
                        description="46% of all Google searches are seeking local information. If your local SEO is weak, you're missing half your market."
                        source="Google"
                        delay={0.2}
                    />
                    <StatisticCard
                        value="88%"
                        label="Conversion Rate"
                        description="88% of local searches on mobile result in a phone call or physical visit within 24 hours."
                        source="Nectafy"
                        delay={0.3}
                    />
                </div>
            </section>

            {/* Strategy Grid */}
            <section className="mb-24">
                <div className="grid md:grid-cols-3 gap-6">
                    {strategies.map((strategy, index) => (
                        <motion.div
                            key={strategy.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-8 group hover:border-accent-purple/20 transition-all rounded-2xl"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {strategy.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{strategy.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                {strategy.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Process/Map Pack Section */}
            <section className="mb-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                            The Google <br />
                            <span className="text-gradient">Map Pack.</span>
                        </h2>
                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                            70% of local leads come from the top 3 results on Google Maps. We focus on the metric that actually matters: getting your phone to ring.
                        </p>
                        <div className="space-y-6">
                            {[
                                { title: "Local Schema Markup", desc: "Code that helps Google understand your business location and services." },
                                { title: "Review Management", desc: "Systems that automatically capture and display 5-star reviews from your customers." },
                                { title: "Content Clusters", desc: "Blog posts and pages that build your authority in specific local niches." }
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
                    <div className="glass p-1 rounded-[2.5rem] relative group overflow-hidden">
                        <div className="absolute inset-0 bg-accent-gradient opacity-10 blur-3xl opacity-20" />
                        <div className="relative z-10 p-12 text-center space-y-8">
                            <Globe2 className="w-24 h-24 text-accent-purple mx-auto animate-float" />
                            <div className="space-y-4">
                                <div className="h-4 w-3/4 bg-white/5 rounded-full mx-auto" />
                                <div className="h-4 w-1/2 bg-white/5 rounded-full mx-auto opacity-50" />
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="h-20 glass rounded-xl flex items-center justify-center font-bold text-white">#1 Rank</div>
                                    <div className="h-20 glass rounded-xl flex items-center justify-center font-bold text-white">+240% Leads</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center bg-accent-blue/5 border border-accent-blue/10 p-12 rounded-[2.5rem]"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stop Being Invisible.</h2>
                <p className="text-zinc-400 mb-10 max-w-xl mx-auto text-lg">
                    Let&apos;s perform a deep-dive audit of your local SEO and build a plan to dominate your market.
                </p>
                <Button asChild className="btn-primary h-14 px-12 text-lg">
                    <Link href="/contact" className="flex items-center gap-2">
                        Get Your Free SEO Audit
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </Button>
            </motion.div>
        </ServicePageLayout>
    )
}
