"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/business-info";
import {
  Globe,
  Search,
  Bot,
  Users,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  Zap,
  Clock,
  Shield,
  Star,
  Phone,
  TrendingUp,
} from "lucide-react";

// ─────────────────────────────────────────────
// Service data
// ─────────────────────────────────────────────

const SERVICES = [
  {
    icon: Globe,
    label: "Web Design",
    title: "High-Performance Websites",
    description:
      "Your site loads in under 1 second. Mobile-first, SEO-ready, built to turn visitors into booked calls.",
    href: "/services/web-design",
    stats: [
      { value: "0.8s", label: "Avg Load Time" },
      { value: "400%", label: "More Mobile Calls" },
    ],
    features: [
      "Next.js / React Architecture",
      "Core Web Vitals Optimized",
      "Mobile-First Design",
      "Built-in SEO Foundation",
      "Click-to-Call CTAs",
    ],
    priceHint: "From $1,999",
    featured: false,
  },
  {
    icon: Search,
    label: "Local SEO",
    title: "Hyper-Local SEO",
    description:
      "Rank #1 in Tri-Cities Google Maps and organic search. Your competitors won't know what hit them.",
    href: "/services/seo",
    stats: [
      { value: "312%", label: "Organic Traffic" },
      { value: "45", label: "New Leads/Month" },
    ],
    features: [
      "Google Business Profile",
      "Local Citation Building",
      "Review Generation",
      "Keyword Content Strategy",
      "Monthly Ranking Reports",
    ],
    priceHint: "From $799/mo",
    featured: false,
  },
  {
    icon: Bot,
    label: "AI Automation",
    title: "AI Systems",
    description:
      "24/7 AI receptionist, automated lead scoring, missed-call text-back. Your business never sleeps.",
    href: "/services/ai-automation",
    stats: [
      { value: "24/7", label: "AI Coverage" },
      { value: "89%", label: "Lead Capture Rate" },
    ],
    features: [
      "AI Chat Receptionist",
      "Missed Call Text-Back",
      "Automated Lead Scoring",
      "CRM & Email Workflows",
      "Weekly Growth Reports",
    ],
    priceHint: "From $997/mo",
    featured: true,
  },
  {
    icon: Users,
    label: "Lead Generation",
    title: "Lead Generation",
    description:
      "Multi-channel campaigns that fill your pipeline with qualified Tri-Cities prospects every month.",
    href: "/services/lead-generation",
    stats: [
      { value: "More", label: "Qualified leads" },
      { value: "60d", label: "To Full Pipeline" },
    ],
    features: [
      "Google Ads Management",
      "Facebook / Instagram Ads",
      "Landing Page Optimization",
      "Lead Magnet Creation",
      "Pipeline Tracking Dashboard",
    ],
    priceHint: "From $1,200/mo",
    featured: false,
  },
  {
    icon: ShieldCheck,
    label: "Reputation",
    title: "Reputation Management",
    description:
      "Build a 5-star presence on Google, Yelp, and Facebook. Turn happy clients into your best sales reps.",
    href: "/services/reputation-management",
    stats: [
      { value: "4.9★", label: "Avg Client Rating" },
      { value: "3×", label: "More Reviews/Month" },
    ],
    features: [
      "Review Request Automation",
      "Response Management",
      "Negative Review Strategy",
      "Multi-Platform Monitoring",
      "Monthly Reputation Report",
    ],
    priceHint: "From $499/mo",
    featured: false,
  },
];

const STATS = [
  { value: "Local", label: "Tri-Cities focused", icon: Users },
  { value: "Fast", label: "10-day avg launch", icon: TrendingUp },
  { value: "4.9/5", label: "Target client rating", icon: Star },
  { value: "10 days", label: "Avg launch time", icon: Clock },
];

const TRUST = [
  { icon: Shield, text: "No long-term contracts" },
  { icon: CheckCircle, text: "Results in 30 days or we fix it" },
  { icon: Zap, text: "Live within 10 business days" },
  { icon: Phone, text: "Real humans answer" },
];

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

export function ServicesContent() {
  return (
    <div className="bg-[#0a0a0f]">
      <HeroSection />
      <StatsBar />
      <ServicesGrid />
      <TrustSection />
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <Zap className="w-3.5 h-3.5" />
            Growth Services
          </div>

          <h1
            className="text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Services that{" "}
            <span className="text-signal-amber">
              actually work.
            </span>
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed mb-8">
            No fluff. No vanity metrics. Every service is designed to solve a
            specific problem costing you money — and deliver measurable results
            in 30 days or less.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 group"
            >
              Book a free strategy call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/[0.08] text-white font-semibold transition-all duration-200"
            >
              Explore services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Stats bar
// ─────────────────────────────────────────────

function StatsBar() {
  return (
    <section className="border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ value, label, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-600/15 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <p
                  className="text-xl font-bold text-white leading-none"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {value}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Services grid
// ─────────────────────────────────────────────

function ServicesGrid() {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            What we do
          </p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Pick your growth lever.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.href} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  svc,
  index,
}: {
  svc: (typeof SERVICES)[0];
  index: number;
}) {
  const Icon = svc.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`relative flex flex-col p-7 rounded-2xl border transition-all duration-300 group ${
        svc.featured
          ? "border-indigo-500/50 bg-gradient-to-b from-indigo-500/10 via-indigo-500/5 to-transparent"
          : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.14] hover:bg-white/[0.05]"
      }`}
    >
      {svc.featured && (
        <div className="absolute -top-3 left-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30">
            Most Popular
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-5">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            svc.featured
              ? "bg-indigo-600/25 border border-indigo-500/30"
              : "bg-white/5 border border-white/10"
          }`}
        >
          <Icon
            className={`w-5 h-5 ${svc.featured ? "text-indigo-400" : "text-zinc-400"}`}
          />
        </div>
        <span
          className={`text-xs font-semibold uppercase tracking-widest ${
            svc.featured ? "text-indigo-400" : "text-zinc-500"
          }`}
        >
          {svc.label}
        </span>
      </div>

      <h3
        className="text-xl font-bold text-white mb-2"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {svc.title}
      </h3>
      <p className="text-sm text-zinc-400 leading-relaxed mb-5">
        {svc.description}
      </p>

      <div className="flex gap-6 mb-5">
        {svc.stats.map((s) => (
          <div key={s.label}>
            <p
              className={`text-lg font-bold ${svc.featured ? "text-indigo-300" : "text-white"}`}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {s.value}
            </p>
            <p className="text-xs text-zinc-600">{s.label}</p>
          </div>
        ))}
      </div>

      <div
        className={`h-px w-full mb-5 ${svc.featured ? "bg-indigo-500/20" : "bg-white/[0.06]"}`}
      />

      <ul className="space-y-2.5 flex-1 mb-6">
        {svc.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <CheckCircle
              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                svc.featured ? "text-indigo-400" : "text-zinc-600"
              }`}
            />
            <span className="text-sm text-zinc-300">{f}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">{svc.priceHint}</span>
        <Link
          href={svc.href}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 ${
            svc.featured
              ? "text-indigo-300 hover:text-indigo-200"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Learn more
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Trust signals
// ─────────────────────────────────────────────

function TrustSection() {
  return (
    <section className="border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-14">
          {TRUST.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-zinc-500 text-sm">
              <Icon className="w-4 h-4 text-indigo-500/70" />
              {text}
            </div>
          ))}
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
          <div className="absolute inset-0 bg-indigo-600/5 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Ready to start?
            </p>
            <h2
              className="text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Stop losing leads to competitors.
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
              Most clients are live within 10 business days. Book a free call and
              we&apos;ll build your custom growth plan — no pitch, no pressure.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/25 group"
              >
                Book your free call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/[0.08] text-white font-semibold transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                {BUSINESS_INFO.phone}
              </Link>
            </div>
            <p className="mt-6 text-xs text-zinc-600">15-minute call. No commitment.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
