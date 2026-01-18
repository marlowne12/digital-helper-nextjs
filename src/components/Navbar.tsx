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
    X
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const services = [
    {
        title: "Web Design & Development",
        href: "/services/web-design",
        icon: <Globe className="w-4 h-4" />,
        description: "Modern, fast sites that convert"
    },
    {
        title: "SEO & Local Search",
        href: "/services/seo",
        icon: <Search className="w-4 h-4" />,
        description: "Rank higher in Tri-Cities"
    },
    {
        title: "AI Automation",
        href: "/services/ai-automation",
        icon: <Bot className="w-4 h-4" />,
        description: "Workflows and chatbots"
    },
    {
        title: "Reputation Management",
        href: "/services/reputation-management",
        icon: <Bot className="w-4 h-4" />, // Using Bot icon or maybe MessageSquare/Star if imported
        description: "Audits & Review Control"
    },
    {
        title: "Lead Generation",
        href: "/services/lead-generation",
        icon: <Users className="w-4 h-4" />,
        description: "Pay for results, not ads"
    }
]

const mainLinks = [
    { href: "/work", label: "Work" },
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
        <nav className={cn(
            "fixed top-0 left-0 w-full z-50 transition-all duration-300",
            scrolled
                ? "bg-background-primary/80 backdrop-blur-xl border-b border-white/[0.08] h-16"
                : "bg-transparent h-24"
        )}>
            <div className="container mx-auto px-6 h-full flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tighter flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                    <div className="w-8 h-8 bg-accent-gradient rounded-lg shadow-glow-sm"></div>
                    <span className="text-white">DIGITAL HELPER</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {/* Services Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                    >
                        <button className={cn(
                            "flex items-center gap-1 transition-colors hover:text-white py-2",
                            pathname.startsWith("/services") ? "text-white font-bold" : "text-zinc-400"
                        )}>
                            Services <ChevronDown className={cn("w-4 h-4 transition-transform", isServicesOpen && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                            {isServicesOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 w-80 pt-4"
                                >
                                    <div className="glass p-4 grid gap-2">
                                        {services.map((service) => (
                                            <Link
                                                key={service.href}
                                                href={service.href}
                                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.05] transition-colors group"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-accent-purple/10 flex items-center justify-center text-accent-purple group-hover:bg-accent-purple/20 transition-colors">
                                                    {service.icon}
                                                </div>
                                                <div>
                                                    <div className="text-white block font-semibold">{service.title}</div>
                                                    <div className="text-zinc-500 text-xs">{service.description}</div>
                                                </div>
                                            </Link>
                                        ))}
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
                                "transition-colors hover:text-white",
                                isActive(link.href) ? "text-white font-bold" : "text-zinc-400"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <Button asChild className="btn-primary">
                        <Link href="/contact">Book a Call</Link>
                    </Button>
                </div>

                {/* Mobile Navigation Toggle */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/5">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-background-primary border-white/[0.08] text-white w-full sm:w-[350px]">
                            <SheetTitle className="sr-only">Menu</SheetTitle>
                            <div className="flex flex-col gap-8 mt-12 px-2">
                                {/* Mobile Services Accordion */}
                                <div className="space-y-4">
                                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">Services</div>
                                    <div className="grid gap-4">
                                        {services.map((service) => (
                                            <Link
                                                key={service.href}
                                                href={service.href}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center gap-4 group"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-accent-purple">
                                                    {service.icon}
                                                </div>
                                                <span className="text-lg font-medium text-zinc-300 group-hover:text-white transition-colors">{service.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <hr className="border-white/[0.08]" />

                                <div className="grid gap-6">
                                    {mainLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-2xl font-bold text-zinc-300 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>

                                <Button asChild className="btn-primary w-full h-14 text-lg mt-4">
                                    <Link href="/contact" onClick={() => setIsOpen(false)}>Book a Call</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}

