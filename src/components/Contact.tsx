"use client"

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            // In production, replace with actual API endpoint
            await new Promise(resolve => setTimeout(resolve, 1500));
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden" id="contact" aria-label="Contact Us">
            {/* Background Decor */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Transform</span> Your Online Presence?
                            </h2>
                            <p className="text-slate-400 mb-8 text-lg">
                                We&apos;re Richland&apos;s local digital experts. Let&apos;s chat about your goals and how we can help you grow.
                            </p>

                            <div className="space-y-6">
                                <a href="tel:+15095550123" className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Call Us</p>
                                        <span className="text-white font-semibold group-hover:text-cyan-400 transition-colors">(509) 555-0123</span>
                                    </div>
                                </a>

                                <a href="mailto:hello@digitalhelper.com" className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Email Us</p>
                                        <span className="text-white font-semibold group-hover:text-purple-400 transition-colors">hello@digitalhelper.com</span>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Location</p>
                                        <p className="text-white font-semibold">Richland, WA (Serving Tri-Cities)</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Response Time</p>
                                        <p className="text-white font-semibold">Within 24 hours</p>
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
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="contact-name" className="block text-sm font-medium text-slate-400 mb-2">Name *</label>
                                                <Input
                                                    id="contact-name"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="Your Name"
                                                    className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-cyan-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="contact-email" className="block text-sm font-medium text-slate-400 mb-2">Email *</label>
                                                <Input
                                                    id="contact-email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="john@example.com"
                                                    className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-cyan-500"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-400 mb-2">Phone</label>
                                            <Input
                                                id="contact-phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="(509) 555-0000"
                                                className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-cyan-500"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="contact-service" className="block text-sm font-medium text-slate-400 mb-2">Service Interested In</label>
                                                <select
                                                    id="contact-service"
                                                    value={formData.service}
                                                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                                    className="w-full h-10 rounded-md bg-slate-950/50 border border-slate-700 text-white px-3 text-sm focus:ring-cyan-500 focus:ring-1 focus:outline-none"
                                                >
                                                    <option value="">Select a service</option>
                                                    <option value="web-design">Web Design</option>
                                                    <option value="seo">Local SEO</option>
                                                    <option value="ai-automation">AI Automation</option>
                                                    <option value="full-package">Full Package</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="contact-budget" className="block text-sm font-medium text-slate-400 mb-2">Project Budget</label>
                                                <select
                                                    id="contact-budget"
                                                    value={formData.budget}
                                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                                    className="w-full h-10 rounded-md bg-slate-950/50 border border-slate-700 text-white px-3 text-sm focus:ring-cyan-500 focus:ring-1 focus:outline-none"
                                                >
                                                    <option value="">Select budget range</option>
                                                    <option value="under-2k">Under $2,000</option>
                                                    <option value="2k-5k">$2,000 - $5,000</option>
                                                    <option value="5k-10k">$5,000 - $10,000</option>
                                                    <option value="10k+">$10,000+</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="contact-message" className="block text-sm font-medium text-slate-400 mb-2">Tell us about your project *</label>
                                            <Textarea
                                                id="contact-message"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="What are your goals? What problems are you facing?"
                                                className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-cyan-500 min-h-[100px]"
                                                required
                                            />
                                        </div>

                                        {status === 'error' && (
                                            <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly.</p>
                                        )}

                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold h-12 text-lg shadow-lg shadow-cyan-500/20"
                                            disabled={status === 'sending'}
                                        >
                                            {status === 'sending' ? 'Sending...' : 'Get Your Free Consultation'}
                                        </Button>
                                        <p className="text-xs text-slate-500 text-center">No commitment required. We respond within 24 hours.</p>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};
