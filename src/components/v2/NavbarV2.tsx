"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

const SERVICES_DROPDOWN = [
  { label: "AI Chatbot System", href: "/ai-agency" },
  { label: "Web Design", href: "/web-design" },
  { label: "Local SEO", href: "/seo" },
  { label: "Lead Generation", href: "/services/lead-generation" },
  { label: "Reputation Management", href: "/services/reputation-management" },
];

export function NavbarV2() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesHovered, setServicesHovered] = useState(false);

  // iOS scroll lock — prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
              <span
                className="text-white text-xs font-bold tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                DH
              </span>
            </div>
            <span
              className="text-white font-bold text-sm tracking-widest uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Digital Helper
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Services with dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesHovered(true)}
              onMouseLeave={() => setServicesHovered(false)}
            >
              <button
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                Services
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    servicesHovered && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {servicesHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-white/10 bg-[#0f0f18]/95 backdrop-blur-md shadow-xl shadow-black/40 overflow-hidden"
                  >
                    {SERVICES_DROPDOWN.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors duration-150"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center px-5 py-2 min-h-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              Book a Demo
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Outside-click overlay — closes mobile menu when tapping outside */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-white/[0.08]"
          >
            <div className="px-6 py-4 space-y-1">
              {/* Services section */}
              <div className="pb-2">
                <p className="px-3 py-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Services
                </p>
                {SERVICES_DROPDOWN.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-3 min-h-[44px] rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-white/[0.08] pt-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-3 min-h-[44px] rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="pt-3 border-t border-white/[0.08]">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full px-5 py-3 min-h-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all duration-200"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
