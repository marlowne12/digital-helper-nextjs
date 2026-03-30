"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Calendar,
    MessageSquare,
    Star,
    CheckCircle2,
} from 'lucide-react';
import { ContactForm } from "@/components/ContactForm";
import { CalendlyWidget } from "@/components/CalendlyWidget";

export const CONTACT_INFO = {
    email: 'business@digital-helper.com',
    phone: '(509) 876-8454',
    phoneRaw: '+15098768454',
    location: 'Richland, WA 99354',
    serviceArea: 'Serving Kennewick, Pasco, West Richland & the Tri-Cities',
    hours: 'Mon-Fri: 9AM - 6PM PST',
    calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/marlowne12/30min',
} as const;

const TRUST_SIGNALS = [
    "Response within 24 hours",
    "Free strategy consultation",
    "No pressure, no obligations",
    "Local Tri-Cities team",
] as const;

export function ContactContent() {
    return (
        <main className="min-h-screen bg-[#0a0a0f] overflow-hidden">
            {/* Background glows */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[5%] right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-600/8 blur-[120px]" />
                <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-violet-600/6 blur-[100px]" />
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">

                {/* Header */}
                <div className="max-w-3xl mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-6"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400" />
                        </span>
                        Let&apos;s Talk
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-6"
                    >
                        Let&apos;s Build Your{" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
                            Digital System.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-zinc-400 leading-relaxed mb-8"
                    >
                        Ready to automate your operations and scale your growth?
                        Choose the best way to connect below.
                    </motion.p>

                    {/* Trust signals */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap gap-3"
                    >
                        {TRUST_SIGNALS.map((signal, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5"
                            >
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                                <span className="text-sm text-zinc-300">{signal}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* Left — Booking & Info */}
                    <div className="space-y-8">

                        {/* Calendly embed */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Schedule a Free Consultation</h2>
                                    <p className="text-sm text-zinc-500">30 min · Free · No obligation</p>
                                </div>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                Book a 30-minute call to discuss your goals. No sales pitch,
                                just a clear plan for your success.
                            </p>
                            <div className="bg-white rounded-xl overflow-hidden">
                                <CalendlyWidget url={CONTACT_INFO.calendlyUrl} height={600} />
                            </div>
                        </motion.div>

                        {/* Contact info grid */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="grid sm:grid-cols-2 gap-4"
                        >
                            <a
                                href={`mailto:${CONTACT_INFO.email}`}
                                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 hover:border-indigo-500/30 hover:bg-white/8 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Mail className="w-4 h-4 text-indigo-400" />
                                    <span className="text-sm font-semibold text-white">Email</span>
                                </div>
                                <p className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                    {CONTACT_INFO.email}
                                </p>
                            </a>

                            <a
                                href={`tel:${CONTACT_INFO.phoneRaw}`}
                                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 hover:border-indigo-500/30 hover:bg-white/8 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Phone className="w-4 h-4 text-indigo-400" />
                                    <span className="text-sm font-semibold text-white">Phone</span>
                                </div>
                                <p className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                    {CONTACT_INFO.phone}
                                </p>
                            </a>

                            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-4 h-4 text-violet-400" />
                                    <span className="text-sm font-semibold text-white">Location</span>
                                </div>
                                <p className="text-sm text-zinc-400">{CONTACT_INFO.location}</p>
                                <p className="text-xs text-zinc-600 mt-1">{CONTACT_INFO.serviceArea}</p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="w-4 h-4 text-violet-400" />
                                    <span className="text-sm font-semibold text-white">Hours</span>
                                </div>
                                <p className="text-sm text-zinc-400">{CONTACT_INFO.hours}</p>
                            </div>
                        </motion.div>

                        {/* Review nudge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="rounded-2xl border border-yellow-500/15 bg-yellow-500/5 p-5"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm font-semibold text-white">Happy with our service?</span>
                            </div>
                            <p className="text-sm text-zinc-400">
                                Leave us a review on Google! Your feedback helps us grow and helps
                                other businesses find us.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right — Contact Form */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 lg:p-10"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-violet-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Send a Message</h2>
                                    <p className="text-sm text-zinc-500">We respond within 24 hours</p>
                                </div>
                            </div>
                            <ContactForm />
                        </motion.div>

                        {/* AI nudge */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 text-center"
                        >
                            <h4 className="text-sm font-semibold text-white mb-1">Need immediate help?</h4>
                            <p className="text-sm text-zinc-400">
                                Chat with our AI Assistant in the bottom right corner for
                                instant answers to common questions.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
