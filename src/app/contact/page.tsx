"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    Calendar,
    MessageSquare
} from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            alert("Message received! We'll get back to you within 24 hours.");
        }, 1500);
    };

    return (
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
                            Ready to automate your operations and scale your growth? Choose the best way to connect below.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Left Side: Booking & Info */}
                    <div className="space-y-12">
                        <div className="glass p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Calendar className="w-6 h-6 text-accent-primary" />
                                <h2 className="text-2xl font-bold text-white">Schedule a Strategy Call</h2>
                            </div>
                            <p className="text-zinc-400 mb-8 leading-relaxed">
                                Book a 15-minute call to discuss your goals. No sales pitch, just a clear plan for your success.
                            </p>

                            {/* Google Calendar Embed */}
                            <div className="bg-white rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-video lg:aspect-square">
                                <iframe
                                    src="https://calendar.app.google/jFDgyirZ2xZZ6kRU8"
                                    style={{ border: 0 }}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                ></iframe>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { icon: <Mail className="w-5 h-5" />, label: "Email", value: "digitalhelperwebsite@gmail.com" },
                                { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "(509) 987-5060" },
                                { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "Richland, WA" },
                                { icon: <Clock className="w-5 h-5" />, label: "Hours", value: "Mon-Fri: 9AM - 6PM" }
                            ].map((item, i) => (
                                <div key={i} className="glass p-6 text-sm">
                                    <div className="flex items-center gap-3 text-accent-primary mb-2">
                                        {item.icon}
                                        <span className="font-semibold">{item.label}</span>
                                    </div>
                                    <p className="text-zinc-300">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="space-y-8">
                        <div className="glass p-10">
                            <div className="flex items-center gap-3 mb-8">
                                <MessageSquare className="w-6 h-6 text-accent-secondary" />
                                <h2 className="text-2xl font-bold text-white">Send a Message</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">FullName</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white outline-none focus:border-accent-primary/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="john@company.com"
                                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white outline-none focus:border-accent-primary/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">How can we help?</label>
                                    <select className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white outline-none focus:border-accent-primary/50 transition-colors appearance-none">
                                        <option className="bg-slate-900">Web Design & Development</option>
                                        <option className="bg-slate-900">SEO & Local Search</option>
                                        <option className="bg-slate-900">AI Automation</option>
                                        <option className="bg-slate-900">Lead Generation</option>
                                        <option className="bg-slate-900">Custom Solution</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        placeholder="Tell us about your project or goals..."
                                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white outline-none focus:border-accent-primary/50 transition-colors resize-none"
                                    ></textarea>
                                </div>

                                <Button
                                    disabled={isSubmitting}
                                    className="btn-primary w-full h-14 text-lg"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                    {!isSubmitting && <Send className="w-5 h-5 ml-2" />}
                                </Button>
                            </form>
                        </div>

                        <div className="glass p-8 text-center bg-accent-primary/5 border-accent-primary/10">
                            <h4 className="text-lg font-bold text-white mb-2">Need immediate help?</h4>
                            <p className="text-zinc-400 text-sm">
                                Chat with our AI Assistant in the bottom right corner for instant answers to common questions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
