"use client"

import React from 'react'
import { LocationPageLayout } from '@/components/locations/LocationPageLayout'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface LocationContentProps {
    city: string;
    description: string;
    marketStats: { label: string; value: string }[];
    neighborhoods: string[];
}

export function LocationPageContent({ city, description, marketStats, neighborhoods }: LocationContentProps) {
    return (
        <LocationPageLayout
            breadcrumbs={[
                { label: 'Locations', href: '/locations' },
                { label: city, href: `/locations/${city.toLowerCase().replace(' ', '-')}` }
            ]}
        >
            <div className="max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-sm font-medium mb-6 uppercase tracking-wider">
                        Local Digital Partner | {city}, WA
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                        Modern Web Design & <br />
                        <span className="text-gradient">SEO in {city}.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
                        {description}
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-20">
                        {marketStats.map((stat, i) => (
                            <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl text-center">
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-8">Serving All of {city}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 text-zinc-400">
                        {neighborhoods.map((n, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-accent-primary" />
                                <span className="text-sm">{n}</span>
                            </div>
                        ))}
                    </div>

                    <div className="glass p-12 rounded-[2.5rem] border-white/5 relative overflow-hidden mb-20 text-center">
                        <div className="absolute inset-0 bg-accent-gradient opacity-5" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Ready to Dominate {city}?</h2>
                        <p className="text-zinc-400 mb-10 max-w-xl mx-auto text-lg relative z-10">
                            We&apos;re a local Richland agency that understands the {city} market better than anyone. Let&apos;s build your advantage.
                        </p>
                        <Button asChild className="btn-primary h-14 px-12 text-lg relative z-10">
                            <Link href="/contact" className="flex items-center gap-2">
                                Claim My Free Site Audit
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </LocationPageLayout>
    )
}
