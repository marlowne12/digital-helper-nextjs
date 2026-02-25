"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import {
    X,
    Globe,
    Search,
    Bot,
    Users,
    Star,
    ChevronRight,
    ArrowRight,
    Phone,
    Mail,
    MapPin,
    Clock
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils'

const services = [
    {
        title: "Web Design",
        href: "/services/web-design",
        icon: <Globe className="w-5 h-5" />,
        color: "text-accent-primary",
        bgColor: "bg-accent-primary/10"
    },
    {
        title: "SEO & Local Search",
        href: "/services/seo",
        icon: <Search className="w-5 h-5" />,
        color: "text-accent-secondary",
        bgColor: "bg-accent-secondary/10"
    },
    {
        title: "AI Automation",
        href: "/services/ai-automation",
        icon: <Bot className="w-5 h-5" />,
        color: "text-accent-tertiary",
        bgColor: "bg-accent-tertiary/10"
    },
    {
        title: "Lead Generation",
        href: "/services/lead-generation",
        icon: <Users className="w-5 h-5" />,
        color: "text-sky-400",
        bgColor: "bg-sky-400/10"
    },
    {
        title: "Reputation Management",
        href: "/services/reputation-management",
        icon: <Star className="w-5 h-5" />,
        color: "text-amber-400",
        bgColor: "bg-amber-400/10"
    }
]

const quickLinks = [
    { href: "/case-studies", label: "Case Studies" },
    { href: "/blog", label: "Blog" },
    { href: "/resources", label: "Resources" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About Us" },
]

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const pathname = usePathname()
    const dragY = useMotionValue(0)
    const opacity = useTransform(dragY, [0, 200], [1, 0])
    
    // Close on path change
    React.useEffect(() => {
        if (isOpen) onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        if (info.velocity.y > 200 || info.offset.y > 100) {
            onClose()
        }
    }

    const isActive = (path: string) => pathname === path

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Menu Panel - Swipe down to close */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        style={{ opacity }}
                        drag="y"
                        dragConstraints={{ top: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        className="fixed inset-x-0 bottom-0 z-50 bg-background-primary border-t border-white/10 rounded-t-[2rem] max-h-[90vh] overflow-hidden"
                    >
                        {/* Drag Handle */}
                        <div className="flex justify-center pt-4 pb-2">
                            <div className="w-12 h-1.5 bg-white/20 rounded-full" />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-zinc-400" />
                        </button>

                        {/* Scrollable Content */}
                        <div className="overflow-y-auto max-h-[calc(90vh-60px)] pb-8 px-6">
                            {/* Services Section */}
                            <div className="mb-8">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
                                    Services
                                </h3>
                                <div className="space-y-2">
                                    {services.map((service, i) => (
                                        <motion.div
                                            key={service.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <Link
                                                href={service.href}
                                                className={cn(
                                                    "flex items-center gap-4 p-4 rounded-xl transition-all active:scale-[0.98]",
                                                    isActive(service.href)
                                                        ? "bg-white/10"
                                                        : "hover:bg-white/[0.05]"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-12 h-12 rounded-xl flex items-center justify-center",
                                                    service.bgColor
                                                )}>
                                                    <div className={service.color}>
                                                        {service.icon}
                                                    </div>
                                                </div>
                                                <span className="text-base font-semibold text-white flex-1">
                                                    {service.title}
                                                </span>
                                                <ChevronRight className="w-4 h-4 text-zinc-500" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="mb-8">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
                                    Quick Links
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {quickLinks.map((link, i) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + i * 0.03 }}
                                        >
                                            <Link
                                                href={link.href}
                                                className={cn(
                                                    "block p-4 rounded-xl text-center transition-all active:scale-[0.98]",
                                                    isActive(link.href)
                                                        ? "bg-white/10 text-white"
                                                        : "bg-white/[0.03] text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                                                )}
                                            >
                                                <span className="text-sm font-medium">{link.label}</span>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="mb-8 bg-white/[0.02] rounded-2xl p-4 border border-white/5">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
                                    Contact
                                </h3>
                                <div className="space-y-3">
                                    <a 
                                        href="tel:+15098768454" 
                                        className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors"
                                    >
                                        <Phone className="w-4 h-4 text-accent-primary" />
                                        <span className="text-sm">(509) 876-8454</span>
                                    </a>
                                    <a 
                                        href="mailto:business@digital-helper.com"
                                        className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors"
                                    >
                                        <Mail className="w-4 h-4 text-accent-secondary" />
                                        <span className="text-sm">business@digital-helper.com</span>
                                    </a>
                                    <div className="flex items-center gap-3 text-zinc-400">
                                        <MapPin className="w-4 h-4 text-accent-tertiary" />
                                        <span className="text-sm">Richland, WA</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-zinc-400">
                                        <Clock className="w-4 h-4 text-amber-400" />
                                        <span className="text-sm">AI available 24/7</span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Button 
                                    asChild 
                                    className="w-full h-14 text-lg font-bold bg-white text-black hover:bg-zinc-200 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                                >
                                    <Link href="/contact" className="flex items-center justify-center gap-2">
                                        Book a Free Call
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
