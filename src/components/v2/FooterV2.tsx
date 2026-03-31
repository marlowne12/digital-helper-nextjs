"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram } from "lucide-react";

const SERVICES_LINKS = [
  { label: "AI Chatbot", href: "/services/ai-automation" },
  { label: "Web Design", href: "/services/web-design" },
  { label: "Local SEO", href: "/services/seo" },
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
    <footer className="bg-[#0a0a0f] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">

          {/* Column 1 — Logo + tagline + social */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold tracking-tight">DH</span>
              </div>
              <span className="text-white font-bold text-sm tracking-widest uppercase">
                Digital Helper
              </span>
            </Link>

            <p className="text-sm text-zinc-500 leading-relaxed mb-6 max-w-xs">
              AI automation for service businesses.
            </p>

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Services */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
              Services
            </p>
            <ul className="space-y-2.5">
              {SERVICES_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
              Company
            </p>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
              Contact
            </p>
            <ul className="space-y-3">
              {CONTACT_INFO.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      className="flex items-start gap-2.5 text-sm text-zinc-500 hover:text-zinc-200 transition-colors duration-150 group"
                    >
                      <Icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-zinc-600 group-hover:text-indigo-400 transition-colors duration-150" />
                      <span>{label}</span>
                    </a>
                  ) : (
                    <div className="flex items-start gap-2.5 text-sm text-zinc-500">
                      <Icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-zinc-600" />
                      <span>{label}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            &copy; 2026 Digital Helper Agency
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-150"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-150"
            >
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
