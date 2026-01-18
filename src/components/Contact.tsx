"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Contact() {
    return (
        <section className="py-24 bg-background-primary relative overflow-hidden" id="contact">
            <div className="container mx-auto px-6 relative z-10">
                <div className="glass p-12 md:p-20 rounded-[3rem] border-white/[0.05] relative overflow-hidden">
                    {/* Decorative Glow */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-purple/10 blur-[100px] rounded-full" />

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                    Ready to <span className="text-gradient">Dominate</span> <br />
                                    the Local Market?
                                </h2>
                                <p className="text-zinc-400 text-lg max-w-md">
                                    We're Richland's local digital experts. Let's chat about your goals and how we can help you scale.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-zinc-400">
                                        <div className="w-10 h-10 rounded-xl glass bg-white/[0.03] flex items-center justify-center text-accent-purple">
                                            <Phone size={20} />
                                        </div>
                                        <span className="text-sm font-medium uppercase tracking-widest">Call Us</span>
                                    </div>
                                    <a href="tel:+15095550123" className="text-xl font-bold text-white hover:text-accent-purple transition-colors">
                                        (509) 555-0123
                                    </a>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-zinc-400">
                                        <div className="w-10 h-10 rounded-xl glass bg-white/[0.03] flex items-center justify-center text-accent-indigo">
                                            <Mail size={20} />
                                        </div>
                                        <span className="text-sm font-medium uppercase tracking-widest">Email Us</span>
                                    </div>
                                    <a href="mailto:digitalhelperwebsite@gmail.com" className="text-xl font-bold text-white hover:text-accent-indigo transition-colors break-all">
                                        digitalhelperwebsite@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 glass rounded-2xl border-white/[0.03] bg-white/[0.01]">
                                <MapPin className="text-accent-blue w-6 h-6 shrink-0" />
                                <div className="text-sm">
                                    <p className="text-white font-bold">Richland, WA 99352</p>
                                    <p className="text-zinc-500">Serving the entire Tri-Cities Area</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 lg:pl-12 lg:border-l border-white/[0.08]">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white">Start Your Transformation</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    Skip the back-and-forth. Book a discovery call directly onto our calendar and get a clear roadmap for your digital growth.
                                </p>
                                <div className="flex flex-col gap-4">
                                    <Button asChild className="btn-primary h-16 text-lg font-bold rounded-2xl group w-full">
                                        <Link href="/contact" className="flex items-center justify-center gap-3">
                                            Book Your Free Strategy Call
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                    <div className="flex items-center justify-center gap-4 text-zinc-500 text-xs uppercase tracking-widest font-bold mt-2">
                                        <div className="h-[1px] w-8 bg-zinc-800" />
                                        <span>Always Free & No Pressure</span>
                                        <div className="h-[1px] w-8 bg-zinc-800" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
