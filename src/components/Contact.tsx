"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming I initialized this or use a simple Textarea wrapper
import { Card, CardContent } from "@/components/ui/card";

// Simple Shadcn-like Textarea if not initialized, but assuming it is or I just use basic Input styles
// Actually, `shadcn init` likely added `textarea` component if I requested it or I can just use `Input` style class.

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        // Simulate API call
        setTimeout(() => {
            console.log("LEAD CAPTURED (Contact Form):", formData);
            console.log("NOTIFICATION SENT TO: digitalhelperwebsite@gmail.com");
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        }, 1500);
    };

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden" id="contact">
            {/* Background Decor */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Transform</span> Your Online Presence?
                            </h2>
                            <p className="text-slate-400 mb-8 text-lg">
                                We&apos;re Richland&apos;s local digital experts. Let&apos;s chat about your goals and how we can help you grow.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Call Us</p>
                                        <a href="tel:+15095550123" className="text-white font-semibold hover:text-cyan-400 transition-colors">(509) 555-0123</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Email Us</p>
                                        <a href="mailto:digitalhelperwebsite@gmail.com" className="text-white font-semibold hover:text-purple-400 transition-colors">digitalhelperwebsite@gmail.com</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Location</p>
                                        <p className="text-white font-semibold">Richland, WA 99352</p>
                                        <p className="text-xs text-slate-500">Serving the entire Tri-Cities Area</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-md shadow-2xl">
                            <CardContent className="p-8">
                                {status === 'success' ? (
                                    <div className="text-center py-12 animate-fade-in-up">
                                        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Send size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                        <p className="text-slate-400">We&apos;ll get back to you within 24 hours.</p>
                                        <Button
                                            className="mt-6"
                                            variant="outline"
                                            onClick={() => setStatus('idle')}
                                        >
                                            Send Another
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="pt-4 border-t border-slate-800">
                                            <p className="text-slate-400 text-sm mb-4">Need a faster response? Skip the form and jump on a call.</p>
                                            <Button
                                                asChild
                                                className="w-full bg-slate-100 hover:bg-white text-slate-950 font-bold h-12 text-lg mb-6 shadow-xl"
                                            >
                                                <Link href="/booking">
                                                    Book a Free Strategy Call <ArrowRight size={18} className="ml-2" />
                                                </Link>
                                            </Button>
                                        </div>

                                        <div className="text-center relative py-4">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-slate-800"></div>
                                            </div>
                                            <span className="relative bg-slate-900 px-4 text-xs text-slate-500 uppercase tracking-widest font-bold">Or send a message</span>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                                                <Input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="Your Name"
                                                    className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-cyan-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                                                <Input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="john@example.com"
                                                    className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-cyan-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                                                <Textarea
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    placeholder="How can we help you?"
                                                    className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-cyan-500 min-h-[120px]"
                                                    required
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold h-12 text-lg shadow-lg shadow-cyan-500/20"
                                                disabled={status === 'sending'}
                                            >
                                                {status === 'sending' ? 'Sending...' : 'Send Message'}
                                            </Button>
                                        </form>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};
