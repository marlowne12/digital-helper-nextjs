"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Check, 
    X, 
    Clock, 
    DollarSign, 
    Zap,
    Users,
    Bot,
    Building2,
    Wrench
} from 'lucide-react';

interface ComparisonRow {
    feature: string;
    digitalHelper: string | boolean;
    agency: string | boolean;
    diy: string | boolean;
    highlight?: boolean;
}

const comparisons: ComparisonRow[] = [
    {
        feature: "24/7 Lead Response",
        digitalHelper: true,
        agency: "Typically 9-5 only",
        diy: false,
        highlight: true
    },
    {
        feature: "Response Time",
        digitalHelper: "Under 30 seconds",
        agency: "Hours to days",
        diy: "When you're available",
        highlight: true
    },
    {
        feature: "Monthly Cost",
        digitalHelper: "Starting at $297/mo",
        agency: "$2,000-$10,000+/mo",
        diy: "Your time (priceless)"
    },
    {
        feature: "Setup Time",
        digitalHelper: "Live in 48 hours",
        agency: "2-4 weeks minimum",
        diy: "Weeks of learning"
    },
    {
        feature: "No Long-Term Contracts",
        digitalHelper: true,
        agency: false,
        diy: "N/A"
    },
    {
        feature: "AI Chatbot Included",
        digitalHelper: true,
        agency: "$500+/mo extra",
        diy: "Complex to build"
    },
    {
        feature: "Local SEO Optimization",
        digitalHelper: true,
        agency: true,
        diy: "Steep learning curve"
    },
    {
        feature: "Performance Dashboard",
        digitalHelper: true,
        agency: "Often extra",
        diy: false
    },
    {
        feature: "Missed Lead Recovery",
        digitalHelper: true,
        agency: false,
        diy: false,
        highlight: true
    },
    {
        feature: "Works While You Sleep",
        digitalHelper: true,
        agency: false,
        diy: false,
        highlight: true
    }
];

function ValueCell({ value, isDigitalHelper = false }: { value: string | boolean, isDigitalHelper?: boolean }) {
    if (typeof value === 'boolean') {
        return value ? (
            <div className={`flex items-center justify-center gap-1 ${isDigitalHelper ? 'text-green-400' : 'text-green-500/70'}`}>
                <Check className="w-5 h-5" />
                {isDigitalHelper && <span className="text-xs font-semibold">YES</span>}
            </div>
        ) : (
            <div className="flex items-center justify-center text-red-400/60">
                <X className="w-5 h-5" />
            </div>
        );
    }
    
    return (
        <span className={`text-sm ${isDigitalHelper ? 'text-white font-medium' : 'text-slate-400'}`}>
            {value}
        </span>
    );
}

export function CompetitorComparison() {
    return (
        <section className="py-20 bg-slate-950">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2 mb-4"
                    >
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400 text-sm font-semibold">Why Choose Us</span>
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                    >
                        The Smarter Alternative to <br />
                        <span className="text-gradient">Expensive Agencies or DIY Chaos</span>
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg"
                    >
                        Traditional agencies charge thousands but don't work nights. DIY wastes your 
                        valuable time. Digital Helper gives you enterprise-level AI automation at a 
                        fraction of the cost.
                    </motion.p>
                </div>

                {/* Comparison Cards (Mobile) */}
                <div className="md:hidden space-y-6">
                    {/* Digital Helper Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-cyan-500/10 to-green-500/10 border-2 border-cyan-500/30 rounded-2xl p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-green-500 rounded-xl flex items-center justify-center">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Digital Helper</h3>
                                <p className="text-cyan-400 text-sm">AI-Powered • 24/7</p>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            {comparisons.map((row, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-slate-800/50 last:border-0">
                                    <span className="text-slate-300 text-sm">{row.feature}</span>
                                    <ValueCell value={row.digitalHelper} isDigitalHelper />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Other Options Summary */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Building2 className="w-5 h-5 text-slate-500" />
                                <h4 className="text-slate-400 font-semibold text-sm">Traditional Agency</h4>
                            </div>
                            <ul className="space-y-2 text-xs text-slate-500">
                                <li className="flex items-center gap-1"><X className="w-3 h-3 text-red-400" /> $2-10K/month</li>
                                <li className="flex items-center gap-1"><X className="w-3 h-3 text-red-400" /> 9-5 only</li>
                                <li className="flex items-center gap-1"><X className="w-3 h-3 text-red-400" /> Long contracts</li>
                            </ul>
                        </div>
                        
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Wrench className="w-5 h-5 text-slate-500" />
                                <h4 className="text-slate-400 font-semibold text-sm">DIY</h4>
                            </div>
                            <ul className="space-y-2 text-xs text-slate-500">
                                <li className="flex items-center gap-1"><X className="w-3 h-3 text-red-400" /> Weeks to learn</li>
                                <li className="flex items-center gap-1"><X className="w-3 h-3 text-red-400" /> No automation</li>
                                <li className="flex items-center gap-1"><X className="w-3 h-3 text-red-400" /> Constant upkeep</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Comparison Table (Desktop) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="hidden md:block"
                >
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-800">
                                    <th className="text-left p-6 text-slate-400 font-medium">Feature</th>
                                    <th className="p-6 text-center">
                                        <div className="inline-flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                                <Bot className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-white font-bold">Digital Helper</span>
                                            <span className="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">Best Value</span>
                                        </div>
                                    </th>
                                    <th className="p-6 text-center">
                                        <div className="inline-flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">
                                                <Building2 className="w-6 h-6 text-slate-400" />
                                            </div>
                                            <span className="text-slate-400 font-medium">Traditional Agency</span>
                                        </div>
                                    </th>
                                    <th className="p-6 text-center">
                                        <div className="inline-flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">
                                                <Wrench className="w-6 h-6 text-slate-400" />
                                            </div>
                                            <span className="text-slate-400 font-medium">DIY</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisons.map((row, i) => (
                                    <tr 
                                        key={i} 
                                        className={`border-b border-slate-800/50 last:border-0 ${row.highlight ? 'bg-cyan-500/5' : ''}`}
                                    >
                                        <td className="p-4 pl-6">
                                            <span className={`${row.highlight ? 'text-white font-medium' : 'text-slate-300'}`}>
                                                {row.feature}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center bg-cyan-500/5">
                                            <ValueCell value={row.digitalHelper} isDigitalHelper />
                                        </td>
                                        <td className="p-4 text-center">
                                            <ValueCell value={row.agency} />
                                        </td>
                                        <td className="p-4 text-center">
                                            <ValueCell value={row.diy} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a 
                            href="/pricing" 
                            className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-slate-200 transition-colors shadow-lg"
                        >
                            <DollarSign className="w-4 h-4" />
                            See Pricing
                        </a>
                        <a 
                            href="/contact" 
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-green-500 text-white font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20"
                        >
                            <Clock className="w-4 h-4" />
                            Book Free Strategy Call
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default CompetitorComparison;
