"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TouchCardProps {
    children: React.ReactNode
    /** Scale amount on press (default: 0.98) */
    pressScale?: number
    /** Enable haptic-like visual feedback */
    haptic?: boolean
    /** Disable touch effects */
    disabled?: boolean
    className?: string
    onClick?: () => void
    style?: React.CSSProperties
}

/**
 * TouchCard - A card component optimized for mobile touch interactions
 * 
 * Provides:
 * - Scale feedback on touch/press
 * - Smooth spring animations
 * - Minimum 48px touch targets
 * - Visual press state
 * 
 * Usage:
 * <TouchCard>
 *   <YourContent />
 * </TouchCard>
 */
export function TouchCard({
    children,
    className,
    pressScale = 0.98,
    haptic = true,
    disabled = false,
    onClick,
    style
}: TouchCardProps) {
    const [isPressed, setIsPressed] = React.useState(false)

    return (
        <motion.div
            whileTap={disabled ? {} : { scale: pressScale }}
            onTapStart={() => {
                if (!disabled) setIsPressed(true)
            }}
            onTap={() => {
                if (!disabled) setIsPressed(false)
            }}
            onTapCancel={() => setIsPressed(false)}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={onClick}
            style={style}
            className={cn(
                "relative select-none touch-manipulation",
                "min-h-[48px]",
                haptic && isPressed && "ring-2 ring-white/10 ring-inset",
                className
            )}
        >
            {children}
        </motion.div>
    )
}

interface TouchButtonProps {
    children: React.ReactNode
    variant?: "primary" | "secondary" | "ghost"
    size?: "sm" | "md" | "lg"
    className?: string
    disabled?: boolean
    onClick?: () => void
    type?: "button" | "submit" | "reset"
}

/**
 * TouchButton - A button optimized for mobile touch
 * Meets WCAG 2.1 minimum touch target size (48x48px)
 */
export function TouchButton({
    children,
    className,
    variant = "primary",
    size = "md",
    disabled,
    onClick,
    type = "button"
}: TouchButtonProps) {
    const variantStyles = {
        primary: "bg-white text-black hover:bg-zinc-200 active:bg-zinc-300",
        secondary: "bg-white/10 text-white hover:bg-white/20 active:bg-white/30 border border-white/10",
        ghost: "text-white hover:bg-white/10 active:bg-white/20"
    }

    const sizeStyles = {
        sm: "min-h-[48px] min-w-[48px] px-4 py-3 text-sm",
        md: "min-h-[48px] min-w-[48px] px-6 py-3 text-base",
        lg: "min-h-[56px] min-w-[56px] px-8 py-4 text-lg"
    }

    return (
        <motion.button
            type={type}
            whileTap={disabled ? {} : { scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            disabled={disabled}
            onClick={onClick}
            className={cn(
                "relative inline-flex items-center justify-center font-semibold rounded-xl",
                "select-none touch-manipulation",
                "transition-colors duration-150",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
        >
            {children}
        </motion.button>
    )
}

interface TouchLinkProps {
    children: React.ReactNode
    href: string
    className?: string
    external?: boolean
}

/**
 * TouchLink - An accessible link with touch feedback
 */
export function TouchLink({
    children,
    href,
    className,
    external = false
}: TouchLinkProps) {
    return (
        <motion.a
            href={href}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={cn(
                "inline-flex items-center justify-center",
                "min-h-[48px] min-w-[48px]",
                "select-none touch-manipulation",
                "active:opacity-80",
                className
            )}
        >
            {children}
        </motion.a>
    )
}

interface TouchRippleProps {
    children: React.ReactNode
    className?: string
}

/**
 * TouchRipple - Visual ripple effect container for touch interactions
 */
export function TouchRipple({ children, className }: TouchRippleProps) {
    const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([])
    const containerRef = React.useRef<HTMLDivElement>(null)

    const handleTouch = (e: React.TouchEvent | React.MouseEvent) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = 'touches' in e 
            ? e.touches[0].clientX - rect.left 
            : e.clientX - rect.left
        const y = 'touches' in e 
            ? e.touches[0].clientY - rect.top 
            : e.clientY - rect.top

        const id = Date.now()
        setRipples(prev => [...prev, { x, y, id }])

        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== id))
        }, 600)
    }

    return (
        <div
            ref={containerRef}
            onTouchStart={handleTouch}
            onMouseDown={handleTouch}
            className={cn("relative overflow-hidden", className)}
        >
            {children}
            {ripples.map(ripple => (
                <motion.span
                    key={ripple.id}
                    initial={{ scale: 0, opacity: 0.35 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute w-8 h-8 bg-white/30 rounded-full pointer-events-none"
                    style={{
                        left: ripple.x - 16,
                        top: ripple.y - 16
                    }}
                />
            ))}
        </div>
    )
}
