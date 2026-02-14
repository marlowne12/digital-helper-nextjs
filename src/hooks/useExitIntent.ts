"use client"

import { useEffect, useState, useCallback } from 'react'

interface UseExitIntentOptions {
    /**
     * Delay before the exit intent can trigger (in ms)
     * Prevents triggering immediately on page load
     */
    delay?: number;
    /**
     * Cookie name to track if popup was already shown
     */
    cookieName?: string;
    /**
     * Days until cookie expires
     */
    cookieExpireDays?: number;
    /**
     * Whether to trigger on mobile back button press
     */
    triggerOnMobileBack?: boolean;
}

/**
 * Hook to detect exit intent behavior
 *
 * Desktop: Mouse leaves viewport toward top
 * Mobile: Configurable back button detection
 *
 * Uses localStorage to prevent showing popup multiple times
 */
export function useExitIntent(options: UseExitIntentOptions = {}) {
    const {
        delay = 3000,
        cookieName = 'dh_exit_intent_shown',
        cookieExpireDays = 7,
        triggerOnMobileBack = true,
    } = options;

    const [isTriggered, setIsTriggered] = useState(false);
    const [isReady, setIsReady] = useState(false);

    // Check if popup was already shown in this session/recently
    const wasAlreadyShown = useCallback((): boolean => {
        if (typeof window === 'undefined') return true;

        // Check localStorage for recent showing
        const lastShown = localStorage.getItem(cookieName);
        if (lastShown) {
            const lastShownDate = new Date(parseInt(lastShown, 10));
            const now = new Date();
            const daysSinceShown = (now.getTime() - lastShownDate.getTime()) / (1000 * 60 * 60 * 24);

            if (daysSinceShown < cookieExpireDays) {
                return true;
            }
        }

        return false;
    }, [cookieName, cookieExpireDays]);

    // Mark as shown
    const markAsShown = useCallback(() => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(cookieName, Date.now().toString());
    }, [cookieName]);

    // Reset trigger (e.g., for testing)
    const reset = useCallback(() => {
        setIsTriggered(false);
    }, []);

    // Clear stored state (show popup again)
    const clearStorage = useCallback(() => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(cookieName);
    }, [cookieName]);

    // Trigger handler
    const trigger = useCallback(() => {
        if (wasAlreadyShown()) return;
        if (!isReady) return;

        setIsTriggered(true);
        markAsShown();
    }, [wasAlreadyShown, isReady, markAsShown]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Delay before exit intent can trigger
        const readyTimer = setTimeout(() => {
            setIsReady(true);
        }, delay);

        // Desktop: Mouse leave detection
        const handleMouseLeave = (e: MouseEvent) => {
            // Only trigger when mouse leaves toward top of viewport
            if (e.clientY <= 0) {
                trigger();
            }
        };

        // Mobile: Back button / history navigation
        const handlePopState = () => {
            if (triggerOnMobileBack) {
                trigger();
            }
        };

        // Add event listeners
        document.addEventListener('mouseleave', handleMouseLeave);

        if (triggerOnMobileBack) {
            // Push a state so we can detect back button
            window.history.pushState({ exitIntent: true }, '');
            window.addEventListener('popstate', handlePopState);
        }

        return () => {
            clearTimeout(readyTimer);
            document.removeEventListener('mouseleave', handleMouseLeave);
            if (triggerOnMobileBack) {
                window.removeEventListener('popstate', handlePopState);
            }
        };
    }, [delay, trigger, triggerOnMobileBack]);

    return {
        isTriggered,
        reset,
        clearStorage,
        trigger, // Manual trigger for testing
    };
}
