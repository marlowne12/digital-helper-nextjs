"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram } from "lucide-react";

const SERVICES_LINKS = [
  { label: "AI Chatbots", href: "/ai-agency" },
  { label: "Web Design", href: "/web-design" },
  { label: "Local SEO", href: "/seo" },
  { label: "Lead Generation", href: "/services/lead-generation" },
  { label: "Reputation Management", href: "/services/reputation-management" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Free Website Audit", href: "/audit" },
];

const AREAS_LINKS = [
  { label: "Richland, WA", href: "/richland-wa" },
  { label: "Kennewick, WA", href: "/kennewick-wa" },
  { label: "Pasco, WA", href: "/pasco-wa" },
  { label: "West Richland", href: "/locations/west-richland" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com/digitalhelperagency", icon: Facebook },
  { label: "LinkedIn", href: "https://linkedin.com/company/digital-helper", icon: Linkedin },
  { label: "Instagram", href: "https://instagram.com/digitalhelperagency", icon: Instagram },
];

const CONTACT_INFO = [
  { icon: Phone, label: "(509) 987-5060", href: "tel:+15099875060" },
  { icon: Mail, label: "business@digital-helper.com", href: "mailto:business@digital-helper.com" },
  { icon: MapPin, label: "Richland, WA", href: null },
];

export function FooterV2() {
  return (
    <footer className="bg-[#090a0c] border-t border-white/10 relative z-10">
      
      {/* Top border sweep highlight */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-[80rem] mx-auto px-6 pt-16 pb-8">
        
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          
          {/* Column 1 — Logo + Tagline + Social */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-2 mb-6">
              <span className="agency-logo-mark flex items-center justify-center shadow-orange-500/20 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,137,100,0.4)] transition-all duration-300 text-[10px] font-bold text-white bg-gradient-to-br from-[#ff8964] via-orange-400 to-blue-500 w-7 h-7 rounded-lg relative shadow-lg">
                DH
              </span>
              <span className="agency-wordmark group-hover:text-white/90 transition-colors duration-300 text-base font-semibold text-white tracking-tight">
                Digital Helper
              </span>
              <span className="text-[9px] uppercase tracking-[0.28em] text-[#797d86] ml-0.5">
                Studio
              </span>
            </Link>

            <p className="text-xs text-[#95979e] leading-relaxed mb-6 max-w-xs font-light">
              Premium systems engineering and conversion design for modern service businesses.
            </p>

            <div className="flex items-center gap-2.5">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-[#ff8964]/20 hover:bg-white/5 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Services */}
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-4">
              Services
            </p>
            <ul className="space-y-2.5">
              {SERVICES_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-[#95979e] hover:text-white transition-colors duration-200 font-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company & Locations */}
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-4">
              Company
            </p>
            <ul className="space-y-2.5 mb-6">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-[#95979e] hover:text-white transition-colors duration-200 font-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-4">
              Areas Served
            </p>
            <ul className="space-y-2.5">
              {AREAS_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-[#95979e] hover:text-white transition-colors duration-200 font-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-4">
              Contact
            </p>
            <ul className="space-y-3">
              {CONTACT_INFO.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      className="flex items-start gap-2.5 text-xs text-[#95979e] hover:text-white transition-colors duration-200 group font-light"
                    >
                      <Icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-zinc-600 group-hover:text-[#ff8964] transition-colors duration-200" />
                      <span>{label}</span>
                    </a>
                  ) : (
                    <div className="flex items-start gap-2.5 text-xs text-[#95979e] font-light">
                      <Icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-zinc-600" />
                      <span>{label}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-[#797d86] font-light">
            &copy; 2026 Digital Helper Studio. All rights reserved.
          </p>
          
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-[10px] text-[#797d86] hover:text-white transition-colors duration-200 font-light"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[10px] text-[#797d86] hover:text-white transition-colors duration-200 font-light"
            >
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
