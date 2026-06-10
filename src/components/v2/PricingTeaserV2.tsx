"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";

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
    description: "Perfect for one local office.",
    features: [
      "AI chatbot website widget",
      "FAQ training (up to 20 topics)",
      "Lead capture with email alerts",
      "Integrated booking links",
      "Monthly delivery report",
    ],
    cta: "Get Started",
    href: "/contact",
    featured: false,
  },
  {
    name: "Growth",
    price: "$197/mo",
    setup: "+ $497 setup",
    description: "Most popular for growing service teams.",
    badge: "Most Popular",
    features: [
      "Everything in Starter",
      "Multi-channel (website + social)",
      "Advanced lead qualification flows",
      "Direct CRM & Resend triggers",
      "Priority system updates",
      "Bi-weekly model tuning",
    ],
    cta: "Get Started",
    href: "/contact",
    featured: true,
  },
  {
    name: "Agency",
    price: "Custom",
    description: "Multi-location operations and networks.",
    features: [
      "Everything in Growth",
      "White-label client reporting",
      "Multi-branch pipeline tracking",
      "Custom integrations",
      "Dedicated system engineer",
    ],
    cta: "Book a kickoff",
    href: "/contact",
    featured: false,
  },
];

export function PricingTeaserV2() {
  return (
    <section className="relative overflow-hidden bg-[#f4f5f8] py-24 md:py-32 font-sans text-gray-900">
      {/* Top boundary separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gray-200"></div>

      <div className="max-w-[80rem] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - 40% Width - Brand Context */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-gray-600 mb-6 border border-gray-300 bg-white">
              Operations Capital
            </div>
            
            <h2 className="text-4xl md:text-5xl font-normal leading-tight text-gray-900 tracking-tighter mb-6 text-balance">
              Simple, transparent
              <br />
              <span className="text-zinc-500">plans. No surprises.</span>
            </h2>
            
            <p className="text-gray-600 leading-relaxed font-light text-base mb-8">
              Choose the automation tier that matches your monthly lead volume and client operations. No long-term commitments, no licensing fees — just clear pricing for high-performance builds.
            </p>

            <Link 
              href="/pricing" 
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-900 hover:text-zinc-600 transition-colors"
            >
              See complete plans breakdown
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right Column - 60% Width - Pricing Grid Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 lg:grid-cols-1 gap-6">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`relative p-6 sm:p-8 rounded-[20px] border transition-all duration-300 ${
                  tier.featured
                    ? "border-[#ff8964]/40 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.06),0_1px_3px_rgba(255,137,100,0.08)]"
                    : "border-gray-200 bg-white/60 hover:border-gray-300 hover:bg-white"
                }`}
              >
                {/* Popular badge */}
                {tier.badge && (
                  <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff8964]/10 border border-[#ff8964]/20 text-[#ff8964] text-[10px] uppercase font-bold tracking-wider">
                    <Star className="w-3 h-3 fill-current" />
                    {tier.badge}
                  </div>
                )}

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1 block">
                      Plan Level
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                      {tier.name}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-gray-900 tracking-tight">
                      {tier.price}
                    </span>
                    {tier.setup && (
                      <span className="text-xs text-zinc-500 font-light">
                        {tier.setup}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 text-sm font-light leading-relaxed mb-6">
                  {tier.description}
                </p>

                {/* Features Checklist */}
                <ul className="grid sm:grid-cols-2 gap-3 mb-8 border-t border-gray-100 pt-6">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#ff8964] shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700 leading-snug font-light">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className={`inline-flex items-center justify-center gap-2 w-full px-5 py-3 min-h-[44px] rounded-xl font-semibold text-xs uppercase tracking-wider transition-all duration-300 ${
                    tier.featured
                      ? "bg-gradient-to-r from-[#ff8964] to-orange-400 text-white hover:opacity-90 shadow-md"
                      : "border border-gray-300 hover:border-gray-400 bg-transparent text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
