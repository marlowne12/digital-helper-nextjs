"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
    Menu,
    ChevronDown,
    Globe,
    Search,
    Bot,
    Users,
    X,
    Star
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const services = [
    {
        title: "Web Design & Development",
        href: "/services/web-design",
        icon: <Globe className="w-5 h-5 text-accent-primary" />,
        description: "Modern, fast sites that convert"
    },
    {
        title: "SEO & Local Search",
        href: "/services/seo",
        icon: <Search className="w-5 h-5 text-accent-secondary" />,
        description: "Rank higher in Tri-Cities"
    },
    {
        title: "AI Automation",
        href: "/services/ai-automation",
        icon: <Bot className="w-5 h-5 text-accent-tertiary" />,
        description: "Chatbots, workflows, voice AI"
    },
    {
        title: "Lead Generation",
        href: "/services/lead-generation",
        icon: <Users className="w-5 h-5 text-sky-400" />,
        description: "Pay only for qualified leads"
    },
    {
        title: "Reputation Management",
        href: "/services/reputation-management",
        icon: <Star className="w-5 h-5 text-amber-400" />,
        description: "More 5-star reviews on auto-pilot"
    }
]

const mainLinks = [
    { href: "/seo-research", label: "Keyword Research" },
    { href: "/work", label: "Work" },
    { href: "/blog", label: "Blog" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
]

export function Navbar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)
    const [isServicesOpen, setIsServicesOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isActive = (path: string) => pathname === path

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 pointer-events-none"
        >
            <motion.div
                className={cn(
                    "flex items-center justify-between px-2 transition-all duration-500 ease-out pointer-events-auto",
                    scrolled
                        ? "w-[90%] md:w-[700px] h-16 bg-background-secondary/95 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.7)]"
                        : "w-full container h-20 bg-transparent"
                )}
            >
                <Link
                    href="/"
                    className={cn(
                        "group flex items-center gap-3 hover:opacity-90 transition-opacity pl-2",
                        scrolled ? "pl-4" : ""
                    )}
                >
                    <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,212,170,0.5)]">
                        <div className="absolute inset-0 bg-accent-gradient"></div>
                        <div className="absolute inset-[1px] bg-background-primary rounded-xl flex items-center justify-center">
                            <span className="text-gradient font-display font-bold text-sm">DH</span>
                        </div>
                    </div>
                    <span className={cn(
                        "font-display font-bold tracking-tight text-white transition-opacity duration-300",
                        scrolled ? "hidden md:block opacity-0 group-hover:opacity-100 w-0 overflow-hidden group-hover:w-auto" : "text-lg md:text-xl"
                    )}>
                        DIGITAL HELPER
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1 bg-black/20 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
                    {/* Services Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                    >
                        <button className={cn(
                            "flex items-center gap-1.5 px-4 py-2 rounded-full transition-all text-sm font-medium hover:bg-white/10",
                            pathname.startsWith("/services") ? "text-white bg-white/10" : "text-zinc-300 hover:text-white"
                        )}>
                            Services
                            <ChevronDown className={cn(
                                "w-3 h-3 transition-transform duration-300",
                                isServicesOpen && "rotate-180"
                            )} />
                        </button>

                        <AnimatePresence>
                            {isServicesOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-80"
                                >
                                    <div className="glass border border-white/10 rounded-2xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl overflow-hidden">
                                        <div className="flex flex-col gap-1">
                                            {services.map((service) => (
                                                <Link
                                                    key={service.href}
                                                    href={service.href}
                                                    className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.08] transition-all"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                                                        {service.icon}
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-semibold text-xs group-hover:text-accent-primary transition-colors">
                                                            {service.title}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {mainLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "px-4 py-2 rounded-full transition-all text-sm font-medium relative hover:bg-white/10",
                                isActive(link.href) ? "text-white bg-white/10" : "text-zinc-300 hover:text-white"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className={cn("flex items-center gap-3", scrolled ? "pr-2" : "")}>
                    <Button asChild size="sm" className="hidden md:flex h-10 px-6 font-bold bg-white text-black hover:bg-zinc-200 transition-all rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        <Link href="/contact">Book Call</Link>
                    </Button>

                    {/* Mobile Toggle */}
                    <span className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-10 w-10">
                                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="top" className="h-screen bg-background-primary/98 backdrop-blur-xl border-none w-full">
                                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                                <div className="flex flex-col items-center justify-center h-full gap-8">
                                    <div className="flex flex-col items-center gap-6 w-full max-w-xs">
                                        <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Services</div>
                                        {services.map((service, i) => (
                                            <motion.div
                                                key={service.href}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="w-full"
                                            >
                                                <Link
                                                    href={service.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 w-full"
                                                >
                                                    {service.icon}
                                                    <span className="text-lg font-bold text-white">{service.title}</span>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        {mainLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="text-2xl font-bold text-zinc-400 hover:text-white"
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                    <Button asChild className="w-full max-w-xs h-14 text-lg font-bold rounded-full bg-white text-black">
                                        <Link href="/contact" onClick={() => setIsOpen(false)}>Book a Call</Link>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </span>
                </div>
            </motion.div>
        </motion.nav>
    )
}

