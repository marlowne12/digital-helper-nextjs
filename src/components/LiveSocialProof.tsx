"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MessageSquare, 
    Clock, 
    TrendingUp, 
    MapPin,
    CheckCircle,
    Zap,
    Users
} from 'lucide-react';

// Simulated recent activity data - would connect to real analytics in production
const businessTypes = [
    "HVAC company", "plumbing business", "roofing contractor", 
    "landscaping service", "dental practice", "auto repair shop",
    "cleaning service", "electrical contractor", "law firm"
];

const cities = [
    "Richland", "Kennewick", "Pasco", "West Richland", 
    "Prosser", "Benton City", "Hermiston"
];

const actions = [
    { action: "captured a lead", icon: MessageSquare, color: "text-green-400" },
    { action: "responded to inquiry", icon: Zap, color: "text-cyan-400" },
    { action: "scheduled appointment", icon: CheckCircle, color: "text-purple-400" },
    { action: "sent quote", icon: TrendingUp, color: "text-amber-400" }
];

interface ActivityItem {
    id: string;
    business: string;
    city: string;
    action: typeof actions[number];
    timeAgo: string;
    timestamp: number;
}

function generateActivity(): ActivityItem {
    const business = businessTypes[Math.floor(Math.random() * businessTypes.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const minutes = Math.floor(Math.random() * 15) + 1;
    
    return {
        id: Math.random().toString(36).substring(7),
        business,
        city,
        action,
        timeAgo: minutes === 1 ? "1 min ago" : `${minutes} mins ago`,
        timestamp: Date.now()
    };
}

interface LiveSocialProofProps {
    /** Compact mode for sidebar/widget placement */
    compact?: boolean;
    /** Maximum activities to show */
    maxItems?: number;
    /** Update interval in ms */
    interval?: number;
}

export function LiveSocialProof({ 
    compact = false, 
    maxItems = 4,
    interval = 8000 
}: LiveSocialProofProps) {
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [leadsToday, setLeadsToday] = useState(47);
    const [avgResponseTime, setAvgResponseTime] = useState(14);
    const [isClient, setIsClient] = useState(false);

    // Generate initial activities on client only
    useEffect(() => {
        setIsClient(true);
        const initial = Array.from({ length: maxItems }, generateActivity);
        setActivities(initial);
    }, [maxItems]);

    // Periodic activity updates
    useEffect(() => {
        if (!isClient) return;

        const activityInterval = setInterval(() => {
            const newActivity = generateActivity();
            newActivity.timeAgo = "just now";
            
            setActivities(prev => {
                const updated = [newActivity, ...prev.slice(0, maxItems - 1)];
                return updated;
            });
            
            // Occasionally bump the lead counter
            if (Math.random() > 0.5) {
                setLeadsToday(prev => prev + 1);
            }
            
            // Vary response time slightly
            setAvgResponseTime(prev => {
                const variance = Math.floor(Math.random() * 5) - 2;
                return Math.max(8, Math.min(20, prev + variance));
            });
        }, interval);

        return () => clearInterval(activityInterval);
    }, [isClient, interval, maxItems]);

    // Age the "just now" timestamps
    useEffect(() => {
        if (!isClient) return;
        
        const ageInterval = setInterval(() => {
            setActivities(prev => prev.map(activity => {
                if (activity.timeAgo === "just now") {
                    return { ...activity, timeAgo: "1 min ago" };
                }
                const match = activity.timeAgo.match(/(\d+) mins? ago/);
                if (match) {
                    const mins = parseInt(match[1]) + 1;
                    if (mins >= 15) {
                        return { ...activity, timeAgo: "15+ mins ago" };
                    }
                    return { ...activity, timeAgo: `${mins} mins ago` };
                }
                return activity;
            }));
        }, 60000);

        return () => clearInterval(ageInterval);
    }, [isClient]);

    if (!isClient) {
        return null; // SSR placeholder
    }

    if (compact) {
        return (
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Live Activity
                    </span>
                </div>
                
                <div className="space-y-2">
                    <AnimatePresence mode="popLayout">
                        {activities.slice(0, 3).map((activity) => (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex items-center gap-2 text-xs"
                            >
                                <activity.action.icon className={`w-3 h-3 ${activity.action.color}`} />
                                <span className="text-slate-300 truncate flex-1">
                                    {activity.city} {activity.business}
                                </span>
                                <span className="text-slate-500">{activity.timeAgo}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        );
    }

    return (
        <section className="py-12 bg-gradient-to-b from-slate-950 to-slate-900 border-y border-slate-800">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-green-400 text-sm font-semibold">Live Activity Feed</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        Right Now, AI is Working for <span className="text-gradient">Tri-Cities Businesses</span>
                    </h2>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <MessageSquare className="w-4 h-4 text-cyan-400" />
                            <span className="text-2xl md:text-3xl font-bold text-white">
                                <AnimatedCounter value={leadsToday} />
                            </span>
                        </div>
                        <p className="text-xs text-slate-400">Leads Today</p>
                    </div>
                    
                    <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-green-400" />
                            <span className="text-2xl md:text-3xl font-bold text-white">
                                {avgResponseTime}s
                            </span>
                        </div>
                        <p className="text-xs text-slate-400">Avg Response</p>
                    </div>
                    
                    <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Users className="w-4 h-4 text-purple-400" />
                            <span className="text-2xl md:text-3xl font-bold text-white">24/7</span>
                        </div>
                        <p className="text-xs text-slate-400">Always On</p>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-6">
                    <div className="space-y-3">
                        <AnimatePresence mode="popLayout">
                            {activities.map((activity, index) => (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                    transition={{ 
                                        type: "spring", 
                                        stiffness: 500, 
                                        damping: 30,
                                        delay: index * 0.05
                                    }}
                                    className="flex items-center gap-4 bg-slate-900/50 rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition-colors"
                                >
                                    {/* Icon */}
                                    <div className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700`}>
                                        <activity.action.icon className={`w-5 h-5 ${activity.action.color}`} />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium">
                                            A <span className="text-cyan-400">{activity.city}</span> {activity.business}
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            AI {activity.action.action}
                                        </p>
                                    </div>
                                    
                                    {/* Location & Time */}
                                    <div className="text-right flex-shrink-0">
                                        <div className="flex items-center gap-1 text-slate-500 text-sm">
                                            <MapPin className="w-3 h-3" />
                                            <span>{activity.city}, WA</span>
                                        </div>
                                        <p className={`text-xs ${activity.timeAgo === "just now" ? "text-green-400 font-semibold" : "text-slate-500"}`}>
                                            {activity.timeAgo}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-8">
                    <p className="text-slate-400 mb-4">
                        While you're reading this, your competitors' AI is capturing leads.
                    </p>
                    <a 
                        href="/contact" 
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-green-500 text-white font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20"
                    >
                        <Zap className="w-4 h-4" />
                        Get Your AI Working Tonight
                    </a>
                </div>
            </div>
        </section>
    );
}

// Animated counter component
function AnimatedCounter({ value }: { value: number }) {
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        if (displayValue === value) return;
        
        const diff = value - displayValue;
        const step = diff > 0 ? 1 : -1;
        const duration = 300;
        const steps = Math.abs(diff);
        const stepDuration = duration / steps;

        let current = displayValue;
        const timer = setInterval(() => {
            current += step;
            setDisplayValue(current);
            if (current === value) {
                clearInterval(timer);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [value, displayValue]);

    return <>{displayValue}</>;
}

export default LiveSocialProof;
