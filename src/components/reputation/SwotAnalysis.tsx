'use client';

import { SwotAnalysis as SwotType } from '@/types/reputation';
import { motion } from 'framer-motion';

interface SwotAnalysisProps {
    data: SwotType;
}

export default function SwotAnalysis({ data }: SwotAnalysisProps) {
    const categories = [
        { title: "Strengths", icon: "💪", color: "border-green-500", text: "text-green-500", bg: "bg-green-500/5", items: data.strengths },
        { title: "Weaknesses", icon: "📉", color: "border-red-500", text: "text-red-500", bg: "bg-red-500/5", items: data.weaknesses },
        { title: "Opportunities", icon: "🚀", color: "border-blue-500", text: "text-blue-500", bg: "bg-blue-500/5", items: data.opportunities },
        { title: "Threats", icon: "⚠️", color: "border-yellow-500", text: "text-yellow-500", bg: "bg-yellow-500/5", items: data.threats },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {categories.map((cat, idx) => (
                <motion.div
                    key={cat.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`glass p-5 rounded-xl border-l-4 ${cat.color} ${cat.bg} hover:bg-white/[0.03] transition-colors`}
                >
                    <div className={`flex items-center gap-2 font-bold text-lg mb-4 ${cat.text}`}>
                        <span>{cat.icon}</span> {cat.title}
                    </div>
                    <ul className="space-y-3">
                        {cat.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                                <span className={`mt-1.5 block h-1.5 w-1.5 rounded-full flex-shrink-0 ${cat.text.replace('text-', 'bg-')}`} />
                                <span className="leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </div>
    );
}
