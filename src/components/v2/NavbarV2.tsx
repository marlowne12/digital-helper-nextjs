"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Bot, Globe, Search, Users, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Free Audit", href: "/audit" },
];

const SERVICES = [
  {
    label: "AI Chatbots",
    desc: "Intelligent systems trained on your company data.",
    href: "/ai-agency",
    icon: Bot,
    colorClass: "group-hover/item:border-orange-500/40 group-hover/item:bg-orange-500/10",
    iconColor: "text-[#ff8964]",
  },
  {
    label: "Web Design",
    desc: "Modern Next.js web applications that convert.",
    href: "/web-design",
    icon: Globe,
    colorClass: "group-hover/item:border-blue-500/40 group-hover/item:bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    label: "Local SEO",
    desc: "Rank at the top of local searches in Richland/Kennewick.",
    href: "/seo",
    icon: Search,
    colorClass: "group-hover/item:border-green-500/40 group-hover/item:bg-green-500/10",
    iconColor: "text-green-400",
  },
  {
    label: "Lead Generation",
    desc: "Custom landing pages and automated email outreach.",
    href: "/services/lead-generation",
    icon: Users,
    colorClass: "group-hover/item:border-purple-500/40 group-hover/item:bg-purple-500/10",
    iconColor: "text-purple-400",
  },
  {
    label: "Reputation Manager",
    desc: "Automate reviews acquisition and manage client feedback.",
    href: "/services/reputation-management",
    icon: ShieldAlert,
    colorClass: "group-hover/item:border-cyan-500/40 group-hover/item:bg-cyan-500/10",
    iconColor: "text-cyan-400",
  },
];

export function NavbarV2() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesHovered, setServicesHovered] = useState(false);

  // iOS scroll lock
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
    <header className="fixed z-50 border-white/10 border-b top-0 right-0 left-0 bg-[#090a0c]/70 backdrop-blur-lg">
      <div className="flex h-16 max-w-[80rem] mx-auto px-6 items-center justify-between w-full">
        
        {/* Brand/Logo Section */}
        <div className="flex items-center gap-6 lg:gap-10">
          <Link href="/" className="group flex items-center gap-2">
            <span className="agency-logo-mark flex items-center justify-center group-hover:scale-110 transition-all duration-300 text-xs font-bold text-white bg-gradient-to-br from-[#ff8964] via-orange-400 to-blue-500 w-8 h-8 rounded-xl relative">
              DH
            </span>
            <span className="agency-wordmark group-hover:text-white/90 transition-colors duration-300 text-lg font-semibold text-white tracking-tight">
              Digital Helper
            </span>
            <span className="hidden sm:inline text-[9px] uppercase tracking-[0.28em] text-[#797d86] ml-1 group-hover:text-gray-400 transition-colors duration-300">
              Studio
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.02] border border-white/5 rounded-full p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md transition-colors hover:bg-white/[0.04]">
            
            {/* Dropdown Toggle */}
            <div
              className="relative"
              onMouseEnter={() => setServicesHovered(true)}
              onMouseLeave={() => setServicesHovered(false)}
            >
              <button className="relative px-4 py-1.5 text-sm font-medium text-gray-400 hover:text-white transition-all rounded-full flex items-center gap-1 group">
                <span className="relative z-10 flex items-center gap-1">
                  Services
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-transform duration-300",
                      servicesHovered && "rotate-180"
                    )}
                  />
                </span>
                <div
                  className={cn(
                    "absolute inset-0 bg-white/10 rounded-full origin-center transition-all duration-300",
                    servicesHovered ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  )}
                />
              </button>

              <AnimatePresence>
                {servicesHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50"
                  >
                    <div className="w-[500px] bg-[#090a0d] border border-charcoal rounded-3xl p-3 shadow-[0_24px_48px_rgba(0,0,0,0.5)] grid grid-cols-2 gap-2 text-left relative overflow-hidden">
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      
                      {SERVICES.map((srv) => {
                        const IconComponent = srv.icon;
                        return (
                          <Link
                            key={srv.href}
                            href={srv.href}
                            className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all duration-300 group/item"
                          >
                            <div className={cn("w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 transition-all duration-300", srv.colorClass)}>
                              <IconComponent className={cn("w-5 h-5 transition-colors", srv.iconColor)} />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-medium text-sm mb-0.5 group-hover/item:text-white transition-colors">
                                {srv.label}
                              </h4>
                              <p className="text-gray-400 text-xs leading-normal font-light">
                                {srv.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Standard Links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-1.5 text-sm font-medium text-gray-400 hover:text-white transition-all rounded-full group"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 bg-white/10 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 rounded-full origin-center" />
              </Link>
            ))}
          </nav>
        </div>

        {/* CTA + Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/contact"
            className="group relative font-medium text-black bg-white rounded-full transition-all duration-300 hover:-translate-y-0.5 ml-2 border border-white/50 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm shrink-0"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-1.5">
              Start a project
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </Link>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-[#090a0c] relative z-40"
          >
            <div className="px-6 py-4 space-y-4">
              <div>
                <p className="px-3 py-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Services
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1">
                  {SERVICES.map((srv) => (
                    <Link
                      key={srv.href}
                      href={srv.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      <srv.icon className="w-4 h-4 text-[#ff8964]" />
                      {srv.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-3 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
