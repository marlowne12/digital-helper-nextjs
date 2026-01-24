"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Calendar, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { noiseTextureStyle } from '@/lib/utils'

export const CONTACT_BENEFITS = [
    "Free 30-min strategy call",
    "No-obligation consultation",
    "Custom growth roadmap"
] as const;

export function Contact() {
    return (
        <section className="py-32 bg-background-primary relative overflow-hidden" id="contact">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[150px]" />
                <div className="absolute inset-0 opacity-[0.015]" style={{
                    ...noiseTextureStyle,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '128px 128px'
                }} />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass border-2 border-white/10 p-8 md:p-16 lg:p-20 rounded-3xl relative overflow-hidden backdrop-blur-2xl"
                >
                    {/* Decorative Elements */}
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent-purple/20 blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-accent-blue/15 blur-[100px] rounded-full" />

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative">
                        {/* Left Column - Info */}
                        <div className="space-y-10">
                            <div className="space-y-6">
                                <div className="inline-block">
                                    <div className="px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-sm font-semibold backdrop-blur-sm inline-flex items-center gap-2">
                                        <Sparkles className="w-4 h-4" />
                                        Let&apos;s Work Together
                                    </div>
                                </div>
                                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                                    Ready to <br />
                                    <span className="text-gradient">Dominate</span> <br />
                                    Locally?
                                </h2>
                                <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
                                    We&apos;re Richland&apos;s local digital experts. Let&apos;s discuss your goals and build your digital growth strategy.
                                </p>
                            </div>

                            {/* Contact Methods */}
                            <div className="space-y-6">
                                <a
                                    href="tel:+15099875060"
                                    className="group flex items-center gap-5 p-5 rounded-2xl glass border border-white/5 hover:border-accent-purple/40 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-purple/5 border border-accent-purple/20 flex items-center justify-center text-accent-purple group-hover:scale-110 transition-transform">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Call Us</div>
                                        <div className="text-2xl font-display font-bold text-white group-hover:text-accent-purple transition-colors">
                                            (509) 987-5060
                                        </div>
                                    </div>
                                </a>

                                <a
                                    href="mailto:digitalhelperwebsite@gmail.com"
                                    className="group flex items-center gap-5 p-5 rounded-2xl glass border border-white/5 hover:border-accent-indigo/40 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-indigo/20 to-accent-indigo/5 border border-accent-indigo/20 flex items-center justify-center text-accent-indigo group-hover:scale-110 transition-transform">
                                        <Mail size={24} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Email Us</div>
                                        <div className="text-lg font-display font-bold text-white group-hover:text-accent-indigo transition-colors truncate">
                                            digitalhelperwebsite@gmail.com
                                        </div>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/5 bg-white/[0.02]">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 border border-accent-blue/20 flex items-center justify-center text-accent-blue shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Location</div>
                                        <p className="text-lg font-display font-bold text-white">Richland, WA 99352</p>
                                        <p className="text-sm text-zinc-500 mt-0.5">Serving the entire Tri-Cities</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - CTA */}
                        <div className="space-y-8 lg:pl-12 lg:border-l-2 border-white/10">
                            <div className="space-y-6">
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white">
                                    Start Your Digital Transformation
                                </h3>
                                <p className="text-lg text-zinc-400 leading-relaxed">
                                    Skip the back-and-forth. Book a discovery call directly on our calendar and get a clear, actionable roadmap for growth.
                                </p>

                                {/* Benefits List */}
                                <div className="space-y-3 py-6">
                                    {CONTACT_BENEFITS.map((benefit, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-white font-semibold">{benefit}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Primary CTA */}
                                <div className="space-y-6">
                                    <Button asChild className="w-full h-20 text-xl font-bold bg-gradient-to-r from-accent-purple via-accent-indigo to-accent-blue hover:opacity-90 transition-all duration-300 shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.4)] rounded-2xl group relative overflow-hidden">
                                        <Link href="/contact" className="flex items-center justify-center gap-3">
                                            <Calendar className="w-6 h-6" />
                                            Book Your Free Strategy Call
                                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>

                                    {/* Trust Signals */}
                                    <div className="flex items-center justify-center gap-4 text-zinc-500 text-xs uppercase tracking-widest font-bold">
                                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-zinc-700" />
                                        <span className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-accent-purple" />
                                            100% Free & No Pressure
                                        </span>
                                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-zinc-700" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
