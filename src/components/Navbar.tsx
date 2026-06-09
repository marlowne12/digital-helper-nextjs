"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { DigitalHelperLogo } from "@/brand"

const services = [
    {
        title: "Web Design and Development",
        href: "/services/web-design",
        description: "Modern, fast sites that convert"
    },
    {
        title: "SEO and Local Search",
        href: "/services/seo",
        description: "Rank higher in Tri-Cities"
    },
    {
        title: "AI Automation",
        href: "/services/ai-automation",
        description: "Chatbots, workflows, voice AI"
    },
    {
        title: "Lead Generation",
        href: "/services/lead-generation",
        description: "Pay only for qualified leads"
    },
    {
        title: "Reputation Management",
        href: "/services/reputation-management",
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
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const [servicesOpen, setServicesOpen] = React.useState(false)
    const servicesRef = React.useRef<HTMLDivElement>(null)
    const servicesBtnRef = React.useRef<HTMLButtonElement>(null)

    // Close services dropdown on outside click
    React.useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
                setServicesOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Close mobile menu on route change
    React.useEffect(() => {
        setMobileOpen(false)
        setServicesOpen(false)
    }, [pathname])

    // Close services on Escape
    React.useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                if (servicesOpen) {
                    setServicesOpen(false)
                    servicesBtnRef.current?.focus()
                }
                if (mobileOpen) {
                    setMobileOpen(false)
                }
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [servicesOpen, mobileOpen])

    const isActive = (path: string) => pathname === path

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 border-b"
            style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
            }}
        >
            <nav
                className="container mx-auto px-4 flex items-center justify-between"
                style={{ height: "72px" }}
                aria-label="Main navigation"
            >
                {/* Brand lockup */}
                <Link href="/" aria-label="Digital Helper home">
                    <DigitalHelperLogo
                        variant="dark"
                        markSize={36}
                        wordmarkFontSize={16}
                        gap={12}
                        showRule={false}
                    />
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-1">
                    {/* Services disclosure */}
                    <div className="relative" ref={servicesRef}>
                        <button
                            ref={servicesBtnRef}
                            aria-expanded={servicesOpen}
                            aria-haspopup="true"
                            onClick={() => setServicesOpen((v) => !v)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault()
                                    setServicesOpen((v) => !v)
                                }
                            }}
                            className={cn(
                                "flex items-center gap-1 px-3 py-2 text-sm transition-colors",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded",
                                pathname.startsWith("/services")
                                    ? "text-[var(--foreground)]"
                                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                            )}
                            style={{ fontFamily: "var(--font-geist-mono)" }}
                        >
                            Services
                            <ChevronDown
                                className={cn(
                                    "w-3 h-3 transition-transform duration-200",
                                    servicesOpen && "rotate-180"
                                )}
                                aria-hidden="true"
                            />
                        </button>

                        {servicesOpen && (
                            <div
                                role="menu"
                                className="absolute top-full left-0 mt-1 w-72 rounded border py-1 z-50"
                                style={{
                                    backgroundColor: "var(--card)",
                                    borderColor: "var(--border)",
                                }}
                            >
                                {services.map((service) => (
                                    <Link
                                        key={service.href}
                                        href={service.href}
                                        role="menuitem"
                                        onClick={() => setServicesOpen(false)}
                                        className={cn(
                                            "block px-4 py-3 text-sm transition-colors",
                                            "hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:bg-[var(--muted)]",
                                            pathname === service.href
                                                ? "text-[var(--foreground)]"
                                                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                        )}
                                        style={{ fontFamily: "var(--font-geist-mono)" }}
                                    >
                                        <span className="block">{service.title}</span>
                                        <span
                                            className="block text-xs mt-0.5"
                                            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-geist-sans)" }}
                                        >
                                            {service.description}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {mainLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "px-3 py-2 text-sm transition-colors rounded",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                                isActive(link.href)
                                    ? "text-[var(--foreground)]"
                                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                            )}
                            style={{ fontFamily: "var(--font-geist-mono)" }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA + mobile toggle */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/booking"
                        className="btn-primary hidden md:inline-flex"
                    >
                        Book a Strategy Call
                    </Link>

                    <button
                        className={cn(
                            "md:hidden flex items-center justify-center w-10 h-10 rounded transition-colors",
                            "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                        )}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileOpen && (
                <div
                    className="md:hidden flex flex-col overflow-y-auto"
                    style={{
                        minHeight: "100dvh",
                        backgroundColor: "var(--background)",
                        borderTop: "1px solid var(--border)",
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mobile navigation"
                >
                    <div className="container mx-auto px-4 py-8 flex flex-col gap-1">
                        {/* Services section */}
                        <div
                            className="text-xs uppercase tracking-widest mb-2 mt-2"
                            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-geist-mono)" }}
                        >
                            Services
                        </div>
                        {services.map((service) => (
                            <Link
                                key={service.href}
                                href={service.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "block px-3 py-3 rounded text-sm transition-colors",
                                    "hover:bg-[var(--muted)]",
                                    pathname === service.href
                                        ? "text-[var(--foreground)]"
                                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                )}
                                style={{ fontFamily: "var(--font-geist-mono)" }}
                            >
                                {service.title}
                            </Link>
                        ))}

                        {/* Hairline */}
                        <div
                            className="my-4"
                            style={{ height: "1px", backgroundColor: "var(--border)" }}
                            aria-hidden="true"
                        />

                        {/* Main links */}
                        {mainLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "block px-3 py-3 rounded text-sm transition-colors",
                                    "hover:bg-[var(--muted)]",
                                    isActive(link.href)
                                        ? "text-[var(--foreground)]"
                                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                )}
                                style={{ fontFamily: "var(--font-geist-mono)" }}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* CTA */}
                        <div className="mt-6">
                            <Link
                                href="/booking"
                                onClick={() => setMobileOpen(false)}
                                className="btn-primary w-full flex justify-center"
                            >
                                Book a Strategy Call
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
