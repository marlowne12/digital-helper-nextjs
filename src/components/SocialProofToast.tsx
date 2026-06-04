"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, CheckCircle2, Users, Calendar } from 'lucide-react';

// Realistic business names and data
const notifications = [
    {
        type: "signup",
        business: "Cascade Plumbing",
        city: "Kennewick",
        message: "just signed up for AI automation",
        timeAgo: "2 hours ago"
    },
    {
        type: "lead",
        business: "A local HVAC company",
        city: "Richland",
        message: "captured their 15th lead this week",
        timeAgo: "45 mins ago"
    },
    {
        type: "review",
        business: "Valley Roofing",
        city: "Pasco",
        message: "got 3 new 5-star reviews today",
        timeAgo: "1 hour ago"
    },
    {
        type: "booking",
        business: "A landscaping business",
        city: "West Richland",
        message: "AI scheduled 4 appointments overnight",
        timeAgo: "this morning"
    },
    {
        type: "signup",
        business: "Columbia Dental",
        city: "Prosser",
        message: "started their free trial",
        timeAgo: "3 hours ago"
    },
    {
        type: "lead",
        business: "An electrician",
        city: "Kennewick",
        message: "captured a lead at 3am",
        timeAgo: "early today"
    },
    {
        type: "review",
        business: "Quick Clean Services",
        city: "Pasco",
        message: "increased reviews by 47% this month",
        timeAgo: "ongoing"
    },
    {
        type: "booking",
        business: "A plumber",
        city: "Richland",
        message: "filled their schedule for next week",
        timeAgo: "yesterday"
    }
];

const iconMap = {
    signup: Users,
    lead: CheckCircle2,
    review: MapPin,
    booking: Calendar
};

const colorMap = {
    signup: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    lead: "text-green-400 bg-green-500/10 border-green-500/20",
    review: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    booking: "text-purple-400 bg-purple-500/10 border-purple-500/20"
};

interface ToastNotification {
    id: string;
    type: keyof typeof iconMap;
    business: string;
    city: string;
    message: string;
    timeAgo: string;
}

interface SocialProofToastProps {
    /** Delay before first toast in ms */
    initialDelay?: number;
    /** Interval between toasts in ms */
    interval?: number;
    /** How long each toast stays visible in ms */
    duration?: number;
    /** Position on screen */
    position?: "bottom-left" | "bottom-right";
}

export function SocialProofToast({
    initialDelay = 5000,
    interval = 25000,
    duration = 6000,
    position = "bottom-left"
}: SocialProofToastProps) {
    const [currentToast, setCurrentToast] = useState<ToastNotification | null>(null);
    const [dismissed, setDismissed] = useState(() => {
        if (typeof window === 'undefined') return false;
        return sessionStorage.getItem('socialProofDismissed') === 'true';
    });
    const [notificationIndex, setNotificationIndex] = useState(0);
    const [isClient] = useState(() => typeof window !== 'undefined');

    const showNextToast = useCallback(() => {
        if (dismissed) return;
        
        const notification = notifications[notificationIndex % notifications.length];
        const toast: ToastNotification = {
            id: `${Date.now()}-${notificationIndex}`,
            ...notification,
            type: notification.type as keyof typeof iconMap
        };
        
        setCurrentToast(toast);
        setNotificationIndex(prev => prev + 1);

        // Auto-hide after duration
        setTimeout(() => {
            setCurrentToast(null);
        }, duration);
    }, [notificationIndex, duration, dismissed]);

    useEffect(() => {
        if (!isClient || dismissed) return;

        // Initial delay
        const initialTimer = setTimeout(() => {
            showNextToast();
        }, initialDelay);

        // Recurring timer
        const recurringTimer = setInterval(() => {
            showNextToast();
        }, interval);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(recurringTimer);
        };
    }, [isClient, dismissed, initialDelay, interval, showNextToast]);

    const handleDismiss = () => {
        setCurrentToast(null);
        setDismissed(true);
        
        // Store dismissal in session storage
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('socialProofDismissed', 'true');
        }
    };


    if (!isClient || dismissed) return null;

    const positionClasses = position === "bottom-left" 
        ? "left-4 bottom-4" 
        : "right-4 bottom-4";

    return (
        <div className={`fixed ${positionClasses} z-50 max-w-sm`}>
            <AnimatePresence>
                {currentToast && (
                    <motion.div
                        key={currentToast.id}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
                    >
                        {/* Progress bar */}
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: duration / 1000, ease: "linear" }}
                            className="h-0.5 bg-gradient-to-r from-cyan-500 to-green-500"
                        />
                        
                        <div className="p-4">
                            <div className="flex items-start gap-3">
                                {/* Icon */}
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${colorMap[currentToast.type]}`}>
                                    {React.createElement(iconMap[currentToast.type], { className: "w-5 h-5" })}
                                </div>
                                
                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm font-medium">
                                        <span className="text-cyan-400">{currentToast.business}</span>
                                        {" "}in {currentToast.city}
                                    </p>
                                    <p className="text-slate-400 text-sm">
                                        {currentToast.message}
                                    </p>
                                    <p className="text-slate-500 text-xs mt-1">
                                        {currentToast.timeAgo}
                                    </p>
                                </div>
                                
                                {/* Dismiss button */}
                                <button
                                    onClick={handleDismiss}
                                    className="text-slate-500 hover:text-slate-300 transition-colors p-1"
                                    aria-label="Dismiss notifications"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default SocialProofToast;
