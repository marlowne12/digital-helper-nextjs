"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'

const locations = [
    { name: "Richland", href: "/locations/richland", desc: "The atomic heart of the Tri-Cities. Specialized in high-tech and service businesses." },
    { name: "Kennewick", href: "/locations/kennewick", desc: "The commercial hub. Perfect for retail, healthcare, and storefront businesses." },
    { name: "Pasco", href: "/locations/pasco", desc: "The fastest growing city. Ideal for industrial, logistics, and emerging brands." },
    { name: "West Richland", href: "/locations/west-richland", desc: "The residential expansion. Helping local specialists reach the growing community." }
]

export function LocationsContent() {
    return (
        <main className="min-h-screen bg-[#0a0a0f] overflow-hidden">
            {/* Background glows */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 relative">

                {/* Hero */}
                <div className="max-w-3xl mb-20 text-center mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 uppercase tracking-wider">
                            Tri-Cities Coverage
                        </span>
                        <h1
                            className="text-5xl md:text-7xl font-bold text-white mb-6"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Our <span className="text-indigo-300">Locations.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed">
                            We are proud to serve the entire Tri-Cities area. Find your city below to see how we help businesses in your neighborhood dominate.
                        </p>
                    </motion.div>
                </div>

                {/* Location Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    {locations.map((loc, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-charcoal p-10 rounded-3xl border border-steel/40 hover:border-indigo-500/30 transition-colors group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 flex items-center justify-center mb-6 group-hover:bg-indigo-600/30 transition-colors">
                                <MapPin className="w-7 h-7 text-indigo-300" />
                            </div>
                            <h2
                                className="text-3xl font-bold text-white mb-4"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                {loc.name}
                            </h2>
                            <p className="text-zinc-400 mb-8 leading-relaxed">{loc.desc}</p>
                            <Link
                                href={loc.href}
                                className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/10 hover:bg-white/5 text-white text-sm font-medium transition-all group/btn"
                            >
                                Explore {loc.name}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </main>
    )
}
