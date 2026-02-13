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
    CheckCircle2
} from 'lucide-react';
import { ContactForm } from "@/components/ContactForm";

// Correct business contact information
const CONTACT_INFO = {
    email: 'business@digital-helper.com',
    phone: '(509) 876-8454',
    phoneRaw: '+15098768454',
    location: 'Richland, WA 99354',
    serviceArea: 'Serving Kennewick, Pasco, West Richland & the Tri-Cities',
    hours: 'Mon-Fri: 9AM - 6PM PST',
    calendarUrl: 'https://calendar.app.google/jFDgyirZ2xZZ6kRU8'
} as const;

// Schema markup for ContactPage
function ContactPageSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Digital Helper Agency",
        "description": "Get in touch with Digital Helper Agency for web design, SEO, and AI automation services in the Tri-Cities, WA.",
        "url": "https://digital-helper.com/contact",
        "mainEntity": {
            "@type": "LocalBusiness",
            "name": "Digital Helper Agency",
            "telephone": CONTACT_INFO.phoneRaw,
            "email": CONTACT_INFO.email,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Richland",
                "addressRegion": "WA",
                "postalCode": "99354",
                "addressCountry": "US"
            },
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
            },
            "areaServed": [
                { "@type": "City", "name": "Richland" },
                { "@type": "City", "name": "Kennewick" },
                { "@type": "City", "name": "Pasco" },
                { "@type": "City", "name": "West Richland" }
            ]
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

const TRUST_SIGNALS = [
    "Response within 24 hours",
    "Free strategy consultation",
    "No pressure, no obligations",
    "Local Tri-Cities team"
] as const;

export default function ContactPage() {
    return (
        <>
            <ContactPageSchema />
            <main className="min-h-screen pt-32 pb-20 bg-background-primary overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    {/* Header */}
                    <div className="max-w-3xl mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                                Let&apos;s Build Your <br />
                                <span className="text-gradient">Digital System.</span>
                            </h1>
                            <p className="text-xl text-zinc-400">
                                Ready to automate your operations and scale your growth? 
                                Choose the best way to connect below.
                            </p>
                        </motion.div>

                        {/* Trust Signals */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-wrap gap-4 mt-8"
                        >
                            {TRUST_SIGNALS.map((signal, i) => (
                                <div 
                                    key={i}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08]"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    <span className="text-sm text-zinc-300">{signal}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Left Side: Booking & Info */}
                        <div className="space-y-12">
                            {/* Calendar Booking */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="glass p-8"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                                        <Calendar className="w-6 h-6 text-accent-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Schedule a Strategy Call</h2>
                                        <p className="text-sm text-zinc-500">15 min • Free • No obligation</p>
                                    </div>
                                </div>
                                <p className="text-zinc-400 mb-8 leading-relaxed">
                                    Book a 15-minute call to discuss your goals. No sales pitch, 
                                    just a clear plan for your success.
                                </p>

                                {/* Google Calendar Embed */}
                                <div className="bg-white rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-video lg:aspect-square">
                                    <iframe
                                        src={CONTACT_INFO.calendarUrl}
                                        style={{ border: 0 }}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        title="Schedule a call with Digital Helper"
                                    />
                                </div>
                            </motion.div>

                            {/* Contact Info Cards */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="grid sm:grid-cols-2 gap-6"
                            >
                                <a 
                                    href={`mailto:${CONTACT_INFO.email}`}
                                    className="glass p-6 text-sm group hover:border-accent-primary/30 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3 text-accent-primary mb-2">
                                        <Mail className="w-5 h-5" />
                                        <span className="font-semibold">Email</span>
                                    </div>
                                    <p className="text-zinc-300 group-hover:text-white transition-colors">
                                        {CONTACT_INFO.email}
                                    </p>
                                </a>

                                <a 
                                    href={`tel:${CONTACT_INFO.phoneRaw}`}
                                    className="glass p-6 text-sm group hover:border-accent-primary/30 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3 text-accent-primary mb-2">
                                        <Phone className="w-5 h-5" />
                                        <span className="font-semibold">Phone</span>
                                    </div>
                                    <p className="text-zinc-300 group-hover:text-white transition-colors">
                                        {CONTACT_INFO.phone}
                                    </p>
                                </a>

                                <div className="glass p-6 text-sm">
                                    <div className="flex items-center gap-3 text-accent-secondary mb-2">
                                        <MapPin className="w-5 h-5" />
                                        <span className="font-semibold">Location</span>
                                    </div>
                                    <p className="text-zinc-300">{CONTACT_INFO.location}</p>
                                    <p className="text-xs text-zinc-500 mt-1">{CONTACT_INFO.serviceArea}</p>
                                </div>

                                <div className="glass p-6 text-sm">
                                    <div className="flex items-center gap-3 text-accent-secondary mb-2">
                                        <Clock className="w-5 h-5" />
                                        <span className="font-semibold">Hours</span>
                                    </div>
                                    <p className="text-zinc-300">{CONTACT_INFO.hours}</p>
                                </div>
                            </motion.div>

                            {/* Review CTA */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="glass p-6 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 border-yellow-500/10"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    <span className="font-semibold text-white">Happy with our service?</span>
                                </div>
                                <p className="text-sm text-zinc-400">
                                    Leave us a review on Google! Your feedback helps us grow and helps 
                                    other businesses find us.
                                </p>
                            </motion.div>
                        </div>

                        {/* Right Side: Contact Form */}
                        <div className="space-y-8">
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="glass p-10"
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-accent-secondary/10 flex items-center justify-center">
                                        <MessageSquare className="w-6 h-6 text-accent-secondary" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Send a Message</h2>
                                        <p className="text-sm text-zinc-500">We respond within 24 hours</p>
                                    </div>
                                </div>

                                <ContactForm />
                            </motion.div>

                            {/* AI Assistant CTA */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="glass p-8 text-center bg-accent-primary/5 border-accent-primary/10"
                            >
                                <h4 className="text-lg font-bold text-white mb-2">Need immediate help?</h4>
                                <p className="text-zinc-400 text-sm">
                                    Chat with our AI Assistant in the bottom right corner for 
                                    instant answers to common questions.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
