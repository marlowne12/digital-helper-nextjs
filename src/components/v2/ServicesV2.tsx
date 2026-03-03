"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bot, Globe, Search, Users, Star, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    icon: Bot,
    tag: "Featured",
    title: "AI Chatbot System",
    description:
      "A trained AI employee that answers leads, qualifies prospects, books appointments, and follows up — around the clock.",
    features: ["24/7 lead capture", "Calendly booking", "FAQ automation", "Instant email alerts"],
    href: "/services/ai-automation",
    featured: true,
  },
  {
    icon: Globe,
    tag: "Web",
    title: "Next.js Web Design",
    description: "Lightning-fast websites built for conversion. We ditch WordPress and build on Next.js for real performance.",
    features: ["95+ Lighthouse score", "Mobile-first", "Conversion-optimized", "SEO-ready"],
    href: "/services/web-design",
    featured: false,
  },
  {
    icon: Search,
    tag: "SEO",
    title: "Hyper-Local SEO",
    description: "Dominate Tri-Cities search results. Be the first business people find when they search in Richland.",
    features: ["Google Maps ranking", "Local citations", "Review strategy", "Monthly reporting"],
    href: "/services/seo",
    featured: false,
  },
  {
    icon: Users,
    tag: "Leads",
    title: "Lead Generation",
    description: "Conversion-optimized funnels that turn strangers into booked calls. We build the pipeline, you close the jobs.",
    features: ["Landing pages", "Ad management", "Lead nurture", "CRM setup"],
    href: "/services/lead-generation",
    featured: false,
  },
  {
    icon: Star,
    tag: "Reputation",
    title: "Reputation Management",
    description: "More 5-star reviews, automated. We make getting Google reviews effortless so your reputation sells for you.",
    features: ["Review automation", "Response templates", "GBP optimization", "Competitor tracking"],
    href: "/services/reputation-management",
    featured: false,
  },
];

export function ServicesV2() {
  const [featured, ...rest] = SERVICES;
  const FeaturedIcon = featured.icon;

  return (
    <section className="py-24 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Services</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
              Everything your business needs.<br />
              <span className="text-zinc-500">Nothing you don&apos;t.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors flex-shrink-0"
          >
            View all services <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Featured card — full width */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link href={featured.href} className="group block relative p-6 sm:p-8 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent hover:border-indigo-500/50 transition-all duration-300">
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold">
              Featured
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-4">
                  <FeaturedIcon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  {featured.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-4">{featured.description}</p>
                <span className="inline-flex items-center gap-1.5 text-indigo-400 text-sm font-medium group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {featured.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                    <span className="text-sm text-zinc-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Other services — 2×2 grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link href={service.href} className="group flex flex-col h-full p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-indigo-500/25 hover:bg-indigo-500/5 transition-all duration-300">
                  <div className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-zinc-300" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed flex-1">{service.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-500 group-hover:text-indigo-400 mt-4 transition-colors">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
