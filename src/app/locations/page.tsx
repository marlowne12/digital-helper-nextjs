"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const locations = [
    { name: "Richland", href: "/locations/richland", desc: "The atomic heart of the Tri-Cities. Specialized in high-tech and service businesses." },
    { name: "Kennewick", href: "/locations/kennewick", desc: "The commercial hub. Perfect for retail, healthcare, and storefront businesses." },
    { name: "Pasco", href: "/locations/pasco", desc: "The fastest growing city. Ideal for industrial, logistics, and emerging brands." },
    { name: "West Richland", href: "/locations/west-richland", desc: "The residential expansion. Helping local specialists reach the growing community." }
]

export default function LocationsHub() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-background-primary relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-accent-primary/5 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mb-16 text-center mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Our <span className="text-gradient">Locations.</span></h1>
                    <p className="text-xl text-zinc-400">
                        We are proud to serve the entire Tri-Cities area. Find your city below to see how we help businesses in your neighborhood dominate.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {locations.map((loc, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-10 rounded-3xl border-white/5 group hover:border-accent-primary/20 transition-all"
                        >
                            <MapPin className="w-12 h-12 text-accent-primary mb-6" />
                            <h2 className="text-3xl font-bold text-white mb-4">{loc.name}</h2>
                            <p className="text-zinc-400 mb-8 leading-relaxed">{loc.desc}</p>
                            <Button asChild variant="outline" className="group/btn h-12 px-6 rounded-full border-white/10 hover:bg-white/5">
                                <Link href={loc.href} className="flex items-center gap-2">
                                    Explore {loc.name}
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                </Link>
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    )
}
