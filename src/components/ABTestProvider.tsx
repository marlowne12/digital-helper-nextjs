"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

/**
 * A/B Testing Provider
 * Simple variant assignment system for testing different component versions
 * 
 * Usage:
 * 1. Wrap your app with <ABTestProvider>
 * 2. Use useABTest('experiment-name') to get variant
 * 3. Configure experiments in EXPERIMENTS constant
 * 
 * Created: Sprint 7 - A/B Testing Infrastructure
 */

// Experiment configurations
interface ExperimentConfig {
    name: string;
    variants: string[];
    weights?: number[]; // Optional weights (default: equal distribution)
}

export const EXPERIMENTS: Record<string, ExperimentConfig> = {
    'hero-variant': {
        name: 'hero-variant',
        variants: ['original', 'ai-focused'],
        weights: [0.5, 0.5], // 50/50 split
    },
    'services-variant': {
        name: 'services-variant',
        variants: ['original', 'enhanced'],
        weights: [0.5, 0.5], // 50/50 split - test enhanced cards
    },
    // Add more experiments here as needed
};

interface ABTestContextValue {
    getVariant: (experimentName: string) => string;
    setVariant: (experimentName: string, variant: string) => void;
    trackEvent: (experimentName: string, eventName: string, data?: Record<string, unknown>) => void;
}

const ABTestContext = createContext<ABTestContextValue | null>(null);

// Utility to pick variant based on weights
function pickVariant(variants: string[], weights?: number[]): string {
    if (!weights || weights.length !== variants.length) {
        // Equal distribution
        return variants[Math.floor(Math.random() * variants.length)];
    }
    
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < variants.length; i++) {
        random -= weights[i];
        if (random <= 0) return variants[i];
    }
    
    return variants[variants.length - 1];
}

interface ABTestProviderProps {
    children: ReactNode;
}

export function ABTestProvider({ children }: ABTestProviderProps) {
    const [assignments, setAssignments] = useState<Record<string, string>>(() => {
        if (typeof window === 'undefined') return {};
        try {
            const stored = localStorage.getItem('ab-test-assignments');
            return stored ? (JSON.parse(stored) as Record<string, string>) : {};
        } catch {
            return {};
        }
    });
    const [isLoaded, setIsLoaded] = useState(() => typeof window !== 'undefined');

    // Persist assignments to localStorage
    useEffect(() => {
        if (isLoaded && Object.keys(assignments).length > 0) {
            try {
                localStorage.setItem('ab-test-assignments', JSON.stringify(assignments));
            } catch (e) {
                console.warn('Failed to save A/B test assignments:', e);
            }
        }
    }, [assignments, isLoaded]);

    const getVariant = (experimentName: string): string => {
        // Return existing assignment if present
        if (assignments[experimentName]) {
            return assignments[experimentName];
        }

        // Get experiment config
        const experiment = EXPERIMENTS[experimentName];
        if (!experiment) {
            console.warn(`Unknown experiment: ${experimentName}`);
            return 'control';
        }

        // Assign new variant
        const variant = pickVariant(experiment.variants, experiment.weights);
        setAssignments(prev => ({ ...prev, [experimentName]: variant }));
        
        // Track assignment event
        trackEvent(experimentName, 'assigned', { variant });
        
        return variant;
    };

    const setVariant = (experimentName: string, variant: string) => {
        setAssignments(prev => ({ ...prev, [experimentName]: variant }));
    };

    const trackEvent = (experimentName: string, eventName: string, data?: Record<string, unknown>) => {
        // Integration point for analytics
        // Supports: Vercel Analytics, PostHog, Mixpanel, etc.
        
        const eventData = {
            experiment: experimentName,
            variant: assignments[experimentName],
            event: eventName,
            timestamp: new Date().toISOString(),
            ...data,
        };

        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.log('[A/B Test Event]', eventData);
        }

        // Send to Vercel Analytics if available
        if (typeof window !== 'undefined' && 'va' in window) {
            (window as unknown as { va: (action: string, data: Record<string, unknown>) => void }).va('event', {
                name: `ab_${experimentName}_${eventName}`,
                ...eventData,
            });
        }

        // Future: Add PostHog, Mixpanel, etc.
    };

    return (
        <ABTestContext.Provider value={{ getVariant, setVariant, trackEvent }}>
            {children}
        </ABTestContext.Provider>
    );
}

// Hook to use A/B testing in components
export function useABTest(experimentName: string) {
    const context = useContext(ABTestContext);
    
    if (!context) {
        // Return default if not wrapped in provider (SSR safety)
        return {
            variant: EXPERIMENTS[experimentName]?.variants[0] || 'control',
            trackConversion: () => {},
            trackEvent: () => {},
        };
    }

    const variant = context.getVariant(experimentName);

    return {
        variant,
        trackConversion: (data?: Record<string, unknown>) => {
            context.trackEvent(experimentName, 'conversion', data);
        },
        trackEvent: (eventName: string, data?: Record<string, unknown>) => {
            context.trackEvent(experimentName, eventName, data);
        },
    };
}

// Component for A/B testing different JSX
interface ABTestProps {
    experiment: string;
    variants: Record<string, ReactNode>;
    fallback?: ReactNode;
}

export function ABTest({ experiment, variants, fallback }: ABTestProps) {
    const { variant } = useABTest(experiment);
    
    // Return the variant content or fallback
    return <>{variants[variant] || fallback || variants[Object.keys(variants)[0]]}</>;
}
