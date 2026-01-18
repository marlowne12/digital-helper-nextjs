"use client"

import Link from "next/link"
import {
    MapPin,
    Phone,
    Mail,
    Facebook,
    Linkedin,
    Instagram
} from "lucide-react"

const footerLinks = {
    services: [
        { label: "Web Design", href: "/services/web-design" },
        { label: "Local SEO", href: "/services/seo" },
        { label: "AI Automation", href: "/services/ai-automation" },
        { label: "Lead Generation", href: "/services/lead-generation" },
    ],
    company: [
        { label: "About Us", href: "/about" },
        { label: "Our Work", href: "/work" },
        { label: "Pricing", href: "/pricing" },
        { label: "Contact", href: "/contact" },
    ],
    legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
    ]
}

export function Footer() {
    return (
        <footer className="bg-background-primary border-t border-white/[0.08] pt-24 pb-12 overflow-hidden relative">
            {/* Gradient Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-accent-purple/5 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
                            <div className="w-8 h-8 bg-accent-gradient rounded-lg" />
                            <span className="text-white">DIGITAL HELPER</span>
                        </Link>
                        <p className="text-zinc-400 leading-relaxed text-sm">
                            High-performance websites and AI automation for Tri-Cities local businesses. Build for speed, scale, and results.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Linkedin, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Services</h4>
                        <ul className="space-y-4">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-zinc-400 hover:text-accent-purple transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-zinc-400 hover:text-white transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Get in Touch</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-zinc-400 text-sm">
                                <MapPin className="w-5 h-5 text-accent-purple shrink-0" />
                                <span>Richland, WA 99352 <br /> Tri-Cities Area</span>
                            </li>
                            <li className="flex gap-3 text-zinc-400 text-sm">
                                <Phone className="w-5 h-5 text-accent-indigo shrink-0" />
                                <a href="tel:+15095550123" className="hover:text-white transition-colors">
                                    (509) 555-0123
                                </a>
                            </li>
                            <li className="flex gap-3 text-zinc-400 text-sm">
                                <Mail className="w-5 h-5 text-accent-blue shrink-0" />
                                <a href="mailto:digitalhelperwebsite@gmail.com" className="hover:text-white transition-colors">
                                    digitalhelperwebsite@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/[0.08] flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-zinc-500 text-xs">
                        &copy; {new Date().getFullYear()} Digital Helper Agency. Richland, WA.
                    </p>
                    <div className="flex gap-8">
                        {footerLinks.legal.map((link) => (
                            <Link key={link.href} href={link.href} className="text-zinc-500 hover:text-white transition-colors text-xs">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
