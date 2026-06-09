"use client"

import Link from "next/link"
import { Facebook, Linkedin, Instagram } from "lucide-react"
import { DigitalHelperLogo } from "@/brand"

const footerLinks = {
    services: [
        { label: "Web Design", href: "/services/web-design" },
        { label: "Local SEO", href: "/services/seo" },
        { label: "AI Automation", href: "/services/ai-automation" },
        { label: "Lead Generation", href: "/services/lead-generation" },
        { label: "Reputation Management", href: "/services/reputation-management" },
    ],
    company: [
        { label: "About Us", href: "/about" },
        { label: "Our Work", href: "/work" },
        { label: "Blog", href: "/blog" },
        { label: "Pricing", href: "/pricing" },
        { label: "Contact", href: "/contact" },
    ],
    areas: [
        { label: "Richland", href: "/locations/richland" },
        { label: "Kennewick", href: "/locations/kennewick" },
        { label: "Pasco", href: "/locations/pasco" },
        { label: "West Richland", href: "/locations/west-richland" },
    ],
    legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
    ]
}

const COLUMN_HEADING = "font-mono text-xs tracking-[0.18em] uppercase text-muted-foreground mb-5"
const NAV_LINK = "text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"

const socialLinks = [
    { Icon: Facebook, label: "Facebook", href: "https://facebook.com/idigitalhelper" },
    { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/106559060" },
    { Icon: Instagram, label: "Instagram", href: "https://instagram.com/idigitalhelper" },
]

export function Footer() {
    return (
        <footer
            className="border-t py-16 md:py-24"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--background)" }}
        >
            <div className="container mx-auto px-6">
                {/* Main grid: brand column + 3 link columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

                    {/* Brand column */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="inline-flex items-center" aria-label="Digital Helper home">
                            <DigitalHelperLogo
                                variant="dark"
                                markSize={36}
                                wordmarkFontSize={16}
                                gap={12}
                                showRule={false}
                            />
                        </Link>

                        <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--muted-foreground)" }}>
                            High-performance websites and AI automation for Tri-Cities local businesses. Built for speed, reliability, and results.
                        </p>

                        {/* Social icons: plain icon + hover color change, no pill, no glass */}
                        <div className="flex gap-5">
                            {socialLinks.map(({ Icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={`Digital Helper on ${label}`}
                                    className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                                >
                                    <Icon className="w-5 h-5" aria-hidden />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services column */}
                    <div>
                        <p className={COLUMN_HEADING}>Services</p>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={NAV_LINK}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company column */}
                    <div>
                        <p className={COLUMN_HEADING}>Company</p>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={NAV_LINK}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Areas Served column */}
                    <div>
                        <p className={COLUMN_HEADING}>Areas Served</p>
                        <ul className="space-y-3">
                            {footerLinks.areas.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={NAV_LINK}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom strip */}
                <div
                    className="pt-8 border-t flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    style={{ borderColor: "var(--border)" }}
                >
                    <p
                        className="font-mono text-xs"
                        style={{ color: "var(--muted-foreground)" }}
                    >
                        &copy; {new Date().getFullYear()} Digital Helper Agency. Richland, WA.
                    </p>

                    <div className="flex gap-6">
                        {footerLinks.legal.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
