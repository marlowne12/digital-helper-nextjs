'use client';

import { motion } from 'framer-motion';

interface HealthScoreProps {
    score: number;
}

export default function HealthScore({ score }: HealthScoreProps) {
    const radius = 90;
    const stroke = 15;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    let color = 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]';
    let trackColor = 'text-red-900/30';
    if (score >= 50) {
        color = 'text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]';
        trackColor = 'text-yellow-900/30';
    }
    if (score >= 80) {
        color = 'text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]';
        trackColor = 'text-green-900/30';
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 glass rounded-2xl relative overflow-hidden">
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-widest flex items-center gap-2">
                Health Score
            </h3>
            <div className="relative flex items-center justify-center">
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="transform -rotate-90 origin-center"
                >
                    <circle
                        stroke="currentColor"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        className={`${trackColor}`}
                    />
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        stroke="currentColor"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        className={color}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className={`text-6xl font-bold text-white`}
                    >
                        {score}
                    </motion.span>
                    <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-2">
                        Excellent
                    </span>
                </div>
            </div>
            <div className="mt-8 flex justify-center w-full">
                <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1.5 }}
                        className={`h-full ${score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    />
                </div>
            </div>
        </div>
    );
}
