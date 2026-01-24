import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface StatisticCardProps {
    value: string;
    label: string;
    description?: string;
    source?: string;
    delay?: number;
}

export function StatisticCard({ value, label, description, source, delay = 0 }: StatisticCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="glass p-6 rounded-2xl border border-white/5 relative group hover:border-accent-purple/20 transition-all duration-300"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <CheckCircle2 className="w-12 h-12 text-accent-purple" />
            </div>

            <div className="relative z-10">
                <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 mb-2 font-mono">
                    {value}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{label}</h3>

                {description && (
                    <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                        {description}
                    </p>
                )}

                {source && (
                    <div className="text-xs text-zinc-600 uppercase tracking-wider font-medium flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-accent-purple"></span>
                        Source: {source}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
