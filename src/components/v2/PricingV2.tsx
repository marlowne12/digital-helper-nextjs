"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Loader2,
  Sparkles,
  Phone,
  Zap,
  Shield,
  Bot,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PricingTier, PricingData } from "@/types";

// ─────────────────────────────────────────────
// Fallback data (used when /api/pricing fails)
// ─────────────────────────────────────────────

const FALLBACK_TIERS: PricingTier[] = [
  {
    id: "web-design",
    name: "Web Transformation",
    price: 1999,
    period: "one-time",
    features: [
      "Custom Next.js Frontend",
      "Extreme Load Speed (<1s)",
      "Mobile-First Architecture",
      "Google Business Integration",
      "Core Web Vitals Optimized",
      "1 Month Priority Support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    id: "growth-package",
    name: "Empire Builder",
    price: 3999,
    period: "one-time",
    features: [
      "Full 10-Page Conversion Site",
      "Hyper-Local SEO Strategy",
      "AI Content Generation",
      "Lead Magnet System",
      "GMB Authority Stacking",
      "Review Generation Setup",
      "3 Months Strategy Support",
    ],
    cta: "Dominant Strategy",
    highlighted: true,
  },
  {
    id: "ai-automation",
    name: "AI Systems",
    price: 997,
    period: "month",
    features: [
      "24/7 AI Receptionist",
      "Automated Lead Scoring",
      "CRM & Email Workflows",
      "Missed Call Text Back",
      "Sentiment Recognition",
      "Weekly Growth Reports",
      "Dedicated Tech Lead",
    ],
    cta: "Automate Now",
    highlighted: false,
  },
];

// ─────────────────────────────────────────────
// Why Us — trust signals below pricing cards
// ─────────────────────────────────────────────

const TRUST_SIGNALS = [
  { icon: Shield, text: "No hidden fees. Ever." },
  { icon: Zap, text: "Live in 5–10 business days." },
  { icon: Bot, text: "Real results or we fix it." },
];

// ─────────────────────────────────────────────
// FAQ — pricing-specific questions
// ─────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: "Is the Web Transformation price really one-time?",
    answer:
      "Yes — $1,999 is a one-time investment. There are no monthly fees unless you add SEO or AI automation. After launch you own your site outright.",
  },
  {
    question: "What makes Empire Builder worth $3,999?",
    answer:
      "You're getting a full 10-page conversion site plus 3 months of hands-on SEO, GMB authority stacking, review generation setup, and AI content. Most agencies charge twice that for the SEO alone.",
  },
  {
    question: "Can I start with Web Transformation and upgrade later?",
    answer:
      "Absolutely. Many clients start with the site, see results, then add AI Systems on top. We'll credit a portion of your initial investment toward the upgrade.",
  },
  {
    question: "What does the AI Systems automation actually do day-to-day?",
    answer:
      "It answers every call and chat 24/7, qualifies leads, books appointments directly into your calendar, texts back missed calls automatically, and sends you a weekly report of every interaction.",
  },
  {
    question: "Do you require long-term contracts?",
    answer:
      "One-time packages are yours forever with no strings attached. The AI Systems plan is month-to-month — cancel any time with 30 days notice.",
  },
  {
    question: "Do you serve businesses outside the Tri-Cities?",
    answer:
      "Our roots are in Richland, Kennewick, and Pasco, but we work with local service businesses across the Pacific Northwest and beyond. Book a call and let's talk.",
  },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function PricingV2() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/pricing");
        if (!res.ok) throw new Error("pricing api failed");
        const data: PricingData = await res.json();
        setTiers(data.tiers);
      } catch {
        setTiers(FALLBACK_TIERS);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="bg-[#0a0a0f]">
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Pricing Cards ── */}
      <CardsSection tiers={tiers} loading={loading} />

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── Bottom CTA ── */}
      <CTASection />
    </div>
  );
}

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-violet-600/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent Pricing
          </div>

          {/* Headline */}
          <h1
            className="text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Invest once.{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
              Grow forever.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-400 text-lg leading-relaxed">
            No hidden fees. No retainer traps. Straightforward packages for
            Tri-Cities businesses ready to dominate their market.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Pricing Cards
// ─────────────────────────────────────────────

function CardsSection({
  tiers,
  loading,
}: {
  tiers: PricingTier[];
  loading: boolean;
}) {
  const activeTiers = tiers.length ? tiers : FALLBACK_TIERS;

  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mb-4" />
            <p className="text-zinc-500 text-sm">Loading packages…</p>
          </div>
        ) : (
          <>
            {/* Cards grid */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {activeTiers.map((tier, i) => (
                <PricingCard key={tier.id} tier={tier} index={i} />
              ))}
            </div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap justify-center items-center gap-8"
            >
              {TRUST_SIGNALS.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-zinc-500 text-sm"
                >
                  <Icon className="w-4 h-4 text-indigo-500/70" />
                  {text}
                </div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Single Pricing Card
// ─────────────────────────────────────────────

function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const featured = tier.highlighted;
  const priceLabel =
    tier.period === "one-time"
      ? `$${tier.price.toLocaleString()}`
      : `$${tier.price.toLocaleString()}/mo`;
  const periodLabel =
    tier.period === "one-time" ? "One-time investment" : "Per month";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative flex flex-col p-7 rounded-2xl border transition-all duration-300 ${
        featured
          ? "border-indigo-500/50 bg-gradient-to-b from-indigo-500/10 via-indigo-500/5 to-transparent shadow-xl shadow-indigo-500/10"
          : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.14] hover:bg-white/[0.05]"
      }`}
    >
      {/* Most Popular badge */}
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold whitespace-nowrap shadow-lg shadow-indigo-600/30">
            Most Popular
          </span>
        </div>
      )}

      {/* Tier name */}
      <p
        className={`text-xs font-semibold uppercase tracking-widest mb-4 ${
          featured ? "text-indigo-400" : "text-zinc-500"
        }`}
      >
        {tier.name}
      </p>

      {/* Price */}
      <div className="mb-1">
        <span
          className="text-4xl font-bold text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {priceLabel}
        </span>
      </div>
      <p className="text-xs text-zinc-600 uppercase tracking-wider mb-5">
        {periodLabel}
      </p>

      {/* Divider */}
      <div
        className={`h-px w-full mb-6 ${
          featured ? "bg-indigo-500/20" : "bg-white/[0.06]"
        }`}
      />

      {/* Features */}
      <ul className="space-y-3 flex-1 mb-8">
        {tier.features.map((feature, j) => (
          <li key={j} className="flex items-start gap-2.5">
            <CheckCircle
              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                featured ? "text-indigo-400" : "text-zinc-500"
              }`}
            />
            <span className="text-sm text-zinc-300 leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/contact"
        className={`inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 group ${
          featured
            ? "bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-lg hover:shadow-indigo-500/25"
            : "border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/[0.08] text-white"
        }`}
      >
        {tier.cta}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────

function FAQSection() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Common questions.{" "}
            <span className="text-zinc-500">Straight answers.</span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          {/* Accordion — 2/3 width */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-white/[0.08] last:border-b-0"
                >
                  <AccordionTrigger className="py-5 text-base font-medium text-white hover:no-underline hover:text-indigo-300 transition-colors text-left [&[data-state=open]]:text-indigo-300">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <p className="text-zinc-400 leading-relaxed text-sm">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* CTA Card — 1/3 width */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="lg:col-span-1"
          >
            <div className="relative p-7 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent sticky top-8">
              <div className="absolute inset-0 rounded-2xl bg-indigo-600/5 blur-xl" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-5">
                  <Phone className="w-5 h-5 text-indigo-400" />
                </div>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Still have questions?
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  We&apos;ll walk you through exactly what&apos;s right for your
                  business — no pressure, no pitch.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 group"
                >
                  Book a free 30-min call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <p className="text-xs text-zinc-600 text-center mt-4">
                  No commitment required
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Bottom CTA
// ─────────────────────────────────────────────

function CTASection() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent overflow-hidden p-12 text-center"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-indigo-600/5 blur-3xl" />

          <div className="relative z-10">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Ready to start?
            </p>
            <h2
              className="text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Your competitors aren&apos;t waiting.
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
              Most clients are live within 10 business days. Book a free call
              today and we&apos;ll build your custom growth plan.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/25 group"
              >
                Book your free call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/[0.08] text-white font-semibold text-base transition-all duration-200"
              >
                Browse services
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
