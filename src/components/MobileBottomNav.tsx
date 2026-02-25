"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Home,
    Briefcase,
    Phone,
    Menu,
    DollarSign,
    Bot,
    X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
    href: string
    label: string
    icon: React.ReactNode
    activeColor: string
}

const navItems: NavItem[] = [
    {
        href: '/',
        label: 'Home',
        icon: <Home className="w-5 h-5" />,
        activeColor: 'text-accent-primary'
    },
    {
        href: '/services',
        label: 'Services',
        icon: <Bot className="w-5 h-5" />,
        activeColor: 'text-accent-secondary'
    },
    {
        href: '/pricing',
        label: 'Pricing',
        icon: <DollarSign className="w-5 h-5" />,
        activeColor: 'text-amber-400'
    },
    {
        href: '/contact',
        label: 'Contact',
        icon: <Phone className="w-5 h-5" />,
        activeColor: 'text-accent-tertiary'
    }
]

const moreItems = [
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/blog', label: 'Blog' },
    { href: '/resources', label: 'Resources' },
    { href: '/about', label: 'About' },
    { href: '/seo-research', label: 'SEO Tools' },
]

export function MobileBottomNav() {
    const pathname = usePathname()
    const [moreOpen, setMoreOpen] = React.useState(false)
    const [isVisible, setIsVisible] = React.useState(true)
    const [lastScrollY, setLastScrollY] = React.useState(0)

    // Hide on scroll down, show on scroll up
    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }
            
            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/'
        return pathname.startsWith(path)
    }

    return (
        <>
            {/* More Menu Overlay */}
            <AnimatePresence>
                {moreOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setMoreOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed bottom-20 left-4 right-4 bg-background-secondary border border-white/10 rounded-2xl p-4 z-50 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold text-white uppercase tracking-wider">
                                    More
                                </span>
                                <button 
                                    onClick={() => setMoreOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4 text-zinc-400" />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {moreItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMoreOpen(false)}
                                        className={cn(
                                            "flex items-center justify-center p-4 rounded-xl transition-all",
                                            isActive(item.href)
                                                ? "bg-white/10 text-white"
                                                : "bg-white/[0.03] text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                                        )}
                                    >
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Bottom Navigation Bar */}
            <motion.nav
                initial={{ y: 100 }}
                animate={{ y: isVisible ? 0 : 100 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
            >
                {/* Safe area background */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background-primary via-background-primary to-transparent pointer-events-none" />
                
                <div className="relative mx-2 mb-2 bg-background-secondary/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_-4px_30px_rgba(0,0,0,0.4)]">
                    <div className="flex items-center justify-around py-2">
                        {navItems.map((item) => {
                            const active = isActive(item.href)
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative flex flex-col items-center justify-center py-2 px-4 min-w-[64px] group"
                                >
                                    {/* Active indicator */}
                                    {active && (
                                        <motion.div
                                            layoutId="bottomNavIndicator"
                                            className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent-gradient rounded-full"
                                            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                                        />
                                    )}
                                    
                                    <motion.div
                                        whileTap={{ scale: 0.9 }}
                                        className={cn(
                                            "transition-colors",
                                            active ? item.activeColor : "text-zinc-500 group-hover:text-zinc-300"
                                        )}
                                    >
                                        {item.icon}
                                    </motion.div>
                                    
                                    <span className={cn(
                                        "text-[10px] font-medium mt-1 transition-colors",
                                        active ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                                    )}>
                                        {item.label}
                                    </span>
                                </Link>
                            )
                        })}
                        
                        {/* More Button */}
                        <button
                            onClick={() => setMoreOpen(!moreOpen)}
                            className="relative flex flex-col items-center justify-center py-2 px-4 min-w-[64px] group"
                        >
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                animate={{ rotate: moreOpen ? 180 : 0 }}
                                className={cn(
                                    "transition-colors",
                                    moreOpen ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                                )}
                            >
                                <Menu className="w-5 h-5" />
                            </motion.div>
                            <span className={cn(
                                "text-[10px] font-medium mt-1 transition-colors",
                                moreOpen ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                            )}>
                                More
                            </span>
                        </button>
                    </div>
                </div>
            </motion.nav>
        </>
    )
}
