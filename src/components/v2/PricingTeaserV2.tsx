"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  setup?: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  featured: boolean;
  badge?: string;
}

const TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "$97/mo",
    setup: "+ $297 setup",
    description: "Perfect for one location",
    features: [
      "AI chatbot widget",
      "FAQ training (up to 20 questions)",
      "Lead capture + email alerts",
      "Calendly booking integration",
      "Monthly performance report",
    ],
    cta: "Get Started",
    href: "/contact",
    featured: false,
  },
  {
    name: "Growth",
    price: "$197/mo",
    setup: "+ $497 setup",
    description: "Most popular for growing businesses",
    badge: "Most Popular",
    features: [
      "Everything in Starter",
      "Multi-channel (website + Facebook)",
      "Advanced lead qualification",
      "CRM integration",
      "Priority support",
      "Bi-weekly optimization",
    ],
    cta: "Get Started",
    href: "/contact",
    featured: true,
  },
  {
    name: "Agency",
    price: "Custom",
    description: "For agencies and multi-location businesses",
    features: [
      "Everything in Growth",
      "White-label option",
      "Multiple client locations",
      "Custom integrations",
      "Dedicated account manager",
    ],
    cta: "Book a Call",
    href: "/contact",
    featured: false,
  },
];

export function PricingTeaserV2() {
  return (
    <section className="py-24 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Simple, transparent pricing.
          </h2>
          <p className="text-zinc-400 text-lg">No hidden fees. No long-term contracts.</p>
        </motion.div>

        {/* Pricing cards — 3-column grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TIERS.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative flex flex-col p-5 sm:p-7 rounded-2xl border transition-all duration-300 ${
                tier.featured
                  ? "border-indigo-500/50 bg-gradient-to-b from-indigo-500/10 via-indigo-500/5 to-transparent shadow-xl shadow-indigo-500/10"
                  : "border-white/8 bg-white/[0.03] hover:border-white/[0.12] hover:bg-white/[0.05]"
              }`}
            >
              {/* Featured badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold whitespace-nowrap shadow-lg shadow-indigo-600/30">
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Tier name */}
              <p className={`text-sm font-semibold uppercase tracking-widest mb-4 ${tier.featured ? "text-indigo-400" : "text-zinc-500"}`}>
                {tier.name}
              </p>

              {/* Price */}
              <div className="mb-2">
                <span className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                  {tier.price}
                </span>
              </div>

              {/* Setup fee */}
              {tier.setup && (
                <p className="text-sm text-zinc-500 mb-3">{tier.setup}</p>
              )}

              {/* Description */}
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">{tier.description}</p>

              {/* Divider */}
              <div className={`h-px w-full mb-6 ${tier.featured ? "bg-indigo-500/20" : "bg-white/[0.06]"}`} />

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-8">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.featured ? "text-indigo-400" : "text-zinc-500"}`} />
                    <span className="text-sm text-zinc-300 leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={tier.href}
                className={`inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 min-h-[44px] rounded-xl font-semibold text-sm transition-all duration-200 group ${
                  tier.featured
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-lg hover:shadow-indigo-500/25"
                    : "border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/8 text-white"
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10 space-y-3"
        >
          <p className="text-sm text-zinc-500">
            All plans include a 14-day money-back guarantee.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            See full pricing details
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
