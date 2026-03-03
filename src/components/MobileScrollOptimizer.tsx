"use client"

import React from 'react'
import { usePathname } from 'next/navigation'

/**
 * MobileScrollOptimizer
 * 
 * Provides mobile-specific optimizations:
 * - Prevents overscroll bounce on iOS
 * - Adds momentum scrolling
 * - Handles viewport height issues (100vh bug on mobile)
 * - Sets up CSS custom property for true viewport height
 */
export function MobileScrollOptimizer() {
    const pathname = usePathname()

    React.useEffect(() => {
        // Set real viewport height (fixes iOS 100vh issue)
        const setVH = () => {
            const vh = window.innerHeight * 0.01
            document.documentElement.style.setProperty('--vh', `${vh}px`)
        }

        // Initial set
        setVH()

        // Update on resize and orientation change
        window.addEventListener('resize', setVH)
        window.addEventListener('orientationchange', setVH)

        // Add touch optimization classes to body
        document.body.classList.add('touch-optimized')

        return () => {
            window.removeEventListener('resize', setVH)
            window.removeEventListener('orientationchange', setVH)
            document.body.classList.remove('touch-optimized')
        }
    }, [])

    // Scroll to top on route change (mobile-friendly navigation)
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [pathname])

    // Add CSS for touch optimizations
    React.useEffect(() => {
        const style = document.createElement('style')
        style.id = 'mobile-scroll-optimizer'
        style.textContent = `
            /* Touch optimization for body */
            body.touch-optimized {
                /* Enable momentum scrolling on iOS */
                -webkit-overflow-scrolling: touch;
                /* Prevent pull-to-refresh on Chrome Android */
                overscroll-behavior-y: contain;
            }

            /* Full height that works on mobile */
            .h-screen-safe {
                height: 100vh;
                height: calc(var(--vh, 1vh) * 100);
            }

            .min-h-screen-safe {
                min-height: 100vh;
                min-height: calc(var(--vh, 1vh) * 100);
            }

            /* Smooth scrolling for scrollable containers */
            .scroll-smooth-mobile {
                -webkit-overflow-scrolling: touch;
                scroll-behavior: smooth;
            }

            /* Prevent text selection on interactive elements */
            .no-select {
                -webkit-user-select: none;
                user-select: none;
                -webkit-touch-callout: none;
            }

            /* Optimize touch targets */
            .touch-target {
                min-height: 48px;
                min-width: 48px;
            }

            /* Reduce motion for users who prefer it */
            @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
            }

            /* Optimize for slow connections */
            @media (prefers-reduced-data: reduce) {
                img, video {
                    content-visibility: auto;
                }
            }

            /* Account for bottom navigation bar */
            .pb-safe-nav {
                padding-bottom: 80px;
            }

            @media (min-width: 768px) {
                .pb-safe-nav {
                    padding-bottom: 0;
                }
            }
        `

        // Only add if not already present
        if (!document.getElementById('mobile-scroll-optimizer')) {
            document.head.appendChild(style)
        }

        return () => {
            const existingStyle = document.getElementById('mobile-scroll-optimizer')
            if (existingStyle) {
                existingStyle.remove()
            }
        }
    }, [])

    return null
}

/**
 * Hook to detect if user is on a mobile device
 */
export function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(
                window.matchMedia('(max-width: 767px)').matches ||
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0
            )
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return isMobile
}

/**
 * Hook to detect if user prefers reduced motion
 */
export function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)

    React.useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)

        const handler = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches)
        }

        mediaQuery.addEventListener('change', handler)
        return () => mediaQuery.removeEventListener('change', handler)
    }, [])

    return prefersReducedMotion
}

/**
 * Hook to get safe area insets (for notched devices)
 */
export function useSafeAreaInsets() {
    const [insets, setInsets] = React.useState({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    })

    React.useEffect(() => {
        const updateInsets = () => {
            const computedStyle = getComputedStyle(document.documentElement)
            setInsets({
                top: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-top)') || '0'),
                right: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-right)') || '0'),
                bottom: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
                left: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-left)') || '0')
            })
        }

        updateInsets()
        window.addEventListener('resize', updateInsets)
        return () => window.removeEventListener('resize', updateInsets)
    }, [])

    return insets
}
