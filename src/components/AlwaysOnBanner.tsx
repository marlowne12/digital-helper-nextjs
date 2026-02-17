"use client"

import React, { useState, useEffect } from 'react';
import { X, Bot, Clock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AlwaysOnBanner - 24/7 AI availability banner
 * Reinforces the key value prop from social media messaging
 * Shows current time with "AI is working" message
 * 
 * Created: Sprint 7 - Social Alignment
 */

interface AlwaysOnBannerProps {
    position?: 'top' | 'bottom';
    dismissible?: boolean;
    ctaLink?: string;
    ctaText?: string;
}

export function AlwaysOnBanner({ 
    position = 'top',
    dismissible = true,
    ctaLink = '#contact',
    ctaText = 'Get Your AI',
}: AlwaysOnBannerProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [currentTime, setCurrentTime] = useState<string>('');
    const [isAfterHours, setIsAfterHours] = useState(false);

    useEffect(() => {
        // Check if dismissed
        const dismissed = localStorage.getItem('always-on-banner-dismissed');
        if (dismissed) {
            const dismissedAt = new Date(dismissed);
            const hoursSince = (Date.now() - dismissedAt.getTime()) / (1000 * 60 * 60);
            // Show again after 24 hours
            if (hoursSince < 24) {
                setIsVisible(false);
            }
        }

        // Update time
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const timeStr = now.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
            setCurrentTime(timeStr);
            // "After hours" = before 8am or after 6pm
            setIsAfterHours(hours < 8 || hours >= 18);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        if (dismissible) {
            localStorage.setItem('always-on-banner-dismissed', new Date().toISOString());
        }
    };

    if (!isVisible) return null;

    const positionClasses = position === 'top' 
        ? 'top-0 pt-20' // Account for navbar
        : 'bottom-0';

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: position === 'top' ? -20 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: position === 'top' ? -20 : 20 }}
                className={`fixed left-0 right-0 z-40 ${positionClasses}`}
            >
                <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900 border-b border-cyan-500/20">
                    <div className="container mx-auto px-4 py-2.5">
                        <div className="flex items-center justify-center gap-4 text-sm">
                            {/* Pulsing indicator */}
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <Bot className="h-4 w-4 text-cyan-400" />
                            </div>

                            {/* Message */}
                            <div className="flex items-center gap-2 text-slate-300">
                                <span className="hidden sm:inline">It&apos;s</span>
                                <span className="font-mono font-semibold text-white flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {currentTime || '...'}
                                </span>
                                <span>—</span>
                                {isAfterHours ? (
                                    <span className="text-cyan-400 font-medium">
                                        Your AI is still taking leads while competitors sleep 💤
                                    </span>
                                ) : (
                                    <span className="text-cyan-400 font-medium">
                                        Your AI responds in 14 seconds. Can your team?
                                    </span>
                                )}
                            </div>

                            {/* CTA */}
                            <a 
                                href={ctaLink}
                                className="hidden md:flex items-center gap-1 text-xs font-semibold text-white bg-cyan-500/20 hover:bg-cyan-500/30 px-3 py-1 rounded-full transition-colors"
                            >
                                {ctaText}
                                <ArrowRight className="h-3 w-3" />
                            </a>

                            {/* Dismiss button */}
                            {dismissible && (
                                <button
                                    onClick={handleDismiss}
                                    className="p-1 text-slate-500 hover:text-slate-300 transition-colors ml-2"
                                    aria-label="Dismiss banner"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default AlwaysOnBanner;
