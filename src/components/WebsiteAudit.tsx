"use client"

import React, { useState } from 'react';
import { Search, MapPin, ArrowRight, CheckCircle, AlertTriangle, Mail, Lock } from 'lucide-react';
import { geminiService } from '@/services/geminiService';
import { BusinessAuditResult } from '@/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export const WebsiteAudit: React.FC = () => {
    const [businessName, setBusinessName] = useState('');
    const [location, setLocation] = useState('Richland, WA'); // Default location
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<BusinessAuditResult | null>(null);
    const [emailCaptured, setEmailCaptured] = useState(false);
    const [capturingEmail, setCapturingEmail] = useState(false);

    const handleAudit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const data = await geminiService.analyzeBusinessWithMaps(businessName, location);
            setResult(data);
            // Simulate lead storage
            // Assuming 'data' is the relevant lead data to log here
            console.log("LEAD CAPTURED (Website Audit):", { businessName, location, auditResult: data });
            console.log("NOTIFICATION SENT TO: digitalhelperwebsite@gmail.com");
        } catch (error) {
            console.error("Audit failed", error);
            setResult({ analysis: "Could not complete audit. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCapturingEmail(true);

        // Simulate lead storage (e.g., sending to an API or CRM)
        console.log("Lead Captured:", {
            email,
            businessName,
            location,
            timestamp: new Date().toISOString()
        });

        // In a real app, you'd fetch /api/leads or similar here
        setTimeout(() => {
            setEmailCaptured(true);
            setCapturingEmail(false);
        }, 1000);
    };

    return (
        <section className="py-24 bg-slate-900 relative" id="audit">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-6 tracking-wide uppercase border border-cyan-500/20">
                        <Search size={12} /> Free Business Analysis
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Is Your Website <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Helping or Hurting?</span>
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Enter your business name to get a free AI-powered audit of your online presence in the Tri-Cities.
                    </p>
                </div>

                <Card className="max-w-2xl mx-auto bg-slate-950/50 border-slate-800 backdrop-blur-sm p-2 mb-12 shadow-2xl shadow-cyan-900/10">
                    <CardContent className="p-4">
                        <form onSubmit={handleAudit} className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                <Input
                                    type="text"
                                    placeholder="Business Name (e.g. Uptown Coffee)"
                                    className="w-full pl-12 h-12 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="md:w-1/3 relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                <Input
                                    type="text"
                                    placeholder="City"
                                    className="w-full pl-12 h-12 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-12 px-8 bg-cyan-500 hover:bg-cyan-600 text-black font-bold text-base shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)]"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                        Analy...
                                    </div>
                                ) : (
                                    "Audit Now"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {result && (
                    <div className="max-w-3xl mx-auto animate-fade-in-up relative">
                        <Card className={`bg-slate-800/50 border-slate-700 overflow-hidden ${!emailCaptured ? 'min-h-[400px]' : ''}`}>
                            <div className="h-2 bg-gradient-to-r from-cyan-400 to-purple-500"></div>
                            <CardContent className="p-8">
                                {!emailCaptured ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="w-16 h-16 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mb-6">
                                            <Lock size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4">Your Report is Ready!</h3>
                                        <p className="text-slate-400 mb-8 max-w-sm">
                                            We&apos;ve analyzed <strong>{businessName}</strong>. Enter your email below to unlock the full AI-powered analysis and recommendations.
                                        </p>
                                        <form onSubmit={handleEmailSubmit} className="w-full max-w-sm flex flex-col gap-4">
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                                <Input
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    className="w-full pl-12 h-12 bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={capturingEmail}
                                                className="h-12 bg-cyan-500 hover:bg-cyan-600 text-black font-bold text-base shadow-lg shadow-cyan-500/20"
                                            >
                                                {capturingEmail ? "Unlocking..." : "View My Free Report"}
                                            </Button>
                                            <p className="text-[10px] text-slate-500 mt-2">
                                                By clicking, you agree to receive digital marketing insights. Unsubscribe anytime.
                                            </p>
                                        </form>
                                    </div>
                                ) : (
                                    <div className="animate-reveal">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
                                                <CheckCircle size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-1">Analysis Complete for {businessName}</h3>
                                                <p className="text-slate-400 text-sm">Generated by Digital Helper AI</p>
                                            </div>
                                        </div>
                                        <div className="prose prose-invert max-w-none text-slate-300">
                                            <div className="whitespace-pre-wrap leading-relaxed">
                                                {result.analysis}
                                            </div>
                                        </div>

                                        {result.mapLink && (
                                            <div className="mt-6 pt-6 border-t border-slate-700">
                                                <p className="text-sm text-slate-400 mb-2 flex items-center gap-2">
                                                    <MapPin size={16} /> found on Google Maps:
                                                </p>
                                                <a
                                                    href={result.mapLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-cyan-400 hover:underline flex items-center gap-1"
                                                >
                                                    {result.mapTitle || "View Listing"} <ArrowRight size={14} />
                                                </a>
                                            </div>
                                        )}

                                        <div className="mt-8 p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                                <div className="flex gap-4 items-start">
                                                    <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400 shrink-0">
                                                        <AlertTriangle size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white font-bold mb-1">Want to fix these issues?</h4>
                                                        <p className="text-slate-400 text-sm">
                                                            Many {location} businesses miss out on 40% of traffic due to poor mobile optimization.
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    asChild
                                                    className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold h-12 px-8 shrink-0 shadow-lg shadow-cyan-500/20"
                                                >
                                                    <a href="/booking">
                                                        Book a Free Consult <ArrowRight size={18} className="ml-2" />
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </section>
    );
};
