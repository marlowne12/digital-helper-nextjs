"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function Navbar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)

    const isActive = (path: string) => pathname === path

    const scrollToContact = () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
        setIsOpen(false)
    }

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/features", label: "Features", activeColor: "text-purple-400" },
        { href: "/pricing", label: "Pricing", activeColor: "text-pink-400" },
        { href: "/seo", label: "SEO Services", activeColor: "text-cyan-400" },
        { href: "/web-design", label: "Web Design", activeColor: "text-violet-400" },
        { href: "/ai-agency", label: "AI Agency", activeColor: "text-pink-400" },
        { href: "/case-studies", label: "Case Studies", activeColor: "text-green-400" },
    ]

    return (
        <nav className="fixed top-0 left-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold tracking-tighter flex items-center gap-2 hover:opacity-80 transition-opacity text-slate-200"
                >
                    <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-lg"></div>
                    DIGITAL HELPER
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "transition-colors hover:text-white",
                                isActive(link.href)
                                    ? cn("font-bold", link.activeColor || "text-white")
                                    : ""
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Button
                        asChild
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/30 border-0"
                    >
                        <Link href="/booking">Get in Touch</Link>
                    </Button>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-slate-950 border-slate-800 text-slate-200 w-[300px]">
                            <SheetTitle className="text-left text-slate-200 font-bold mb-6 flex items-center gap-2">
                                <div className="w-6 h-6 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-lg"></div>
                                Digital Helper
                            </SheetTitle>
                            <div className="flex flex-col gap-6 mt-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "text-lg font-medium transition-colors hover:text-white",
                                            isActive(link.href)
                                                ? cn("font-bold", link.activeColor || "text-white")
                                                : "text-slate-400"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Button
                                    onClick={scrollToContact}
                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold hover:from-purple-600 hover:to-pink-600 border-0"
                                >
                                    Get in Touch
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}
