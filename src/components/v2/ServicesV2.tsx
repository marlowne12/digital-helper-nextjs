"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bot, Globe, Search, Users, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    icon: Bot,
    tag: "AI Systems",
    title: "AI Chatbot System",
    description:
      "A trained digital employee that handles leads, qualifies inquiries, schedules jobs, and automates follow-ups around the clock.",
    features: ["24/7 autonomous engagement", "Integrated calendar sync", "FAQ & support automation", "Instant CRM integrations"],
    href: "/ai-agency",
    colorClass: "from-[#ff8964]/20 via-[#ff8964]/5 to-transparent border-[#ff8964]/30 hover:border-[#ff8964]/50",
    iconBg: "bg-[#ff8964]/10 border-[#ff8964]/20 text-[#ff8964]",
    featured: true,
  },
  {
    icon: Globe,
    tag: "Development",
    title: "Next.js Web Design",
    description: "Lightning-fast, search-optimized web applications built for optimal conversion. We bypass legacy templates for absolute performance.",
    features: ["Lighthouse scores (95+)", "Dynamic layouts", "Conversion triggers"],
    href: "/web-design",
    colorClass: "bg-white/[0.02] border-white/5 hover:border-[#ff8964]/20 hover:bg-white/[0.04]",
    iconBg: "bg-white/[0.04] border-white/10 text-white/70 group-hover/link:text-[#ff8964]",
    featured: false,
  },
  {
    icon: Search,
    tag: "Search",
    title: "Hyper-Local SEO",
    description: "Dominate search results in the Tri-Cities area. Be the first local provider clients see when they search in Richland and Kennewick.",
    features: ["Google Maps optimization", "Structured citation audits", "Review campaign setup"],
    href: "/seo",
    colorClass: "bg-white/[0.02] border-white/5 hover:border-[#ff8964]/20 hover:bg-white/[0.04]",
    iconBg: "bg-white/[0.04] border-white/10 text-white/70 group-hover/link:text-[#ff8964]",
    featured: false,
  },
  {
    icon: Users,
    tag: "Growth",
    title: "Lead Generation",
    description: "High-performance funnel systems designed to capture customer interest and convert clicks into booked business calls.",
    features: ["Landing page funnels", "Custom outreach flows", "Pipeline integrations"],
    href: "/services/lead-generation",
    colorClass: "bg-white/[0.02] border-white/5 hover:border-[#ff8964]/20 hover:bg-white/[0.04]",
    iconBg: "bg-white/[0.04] border-white/10 text-white/70 group-hover/link:text-[#ff8964]",
    featured: false,
  },
  {
    icon: Star,
    tag: "Authority",
    title: "Reputation Manager",
    description: "Build digital trust automatically. Effortlessly gather 5-star Google reviews from customers using automated sms/email triggers.",
    features: ["Feedback workflows", "Review acquisition metrics", "Competitor indexing"],
    href: "/services/reputation-management",
    colorClass: "bg-white/[0.02] border-white/5 hover:border-[#ff8964]/20 hover:bg-white/[0.04]",
    iconBg: "bg-white/[0.04] border-white/10 text-white/70 group-hover/link:text-[#ff8964]",
    featured: false,
  },
];

export function ServicesV2() {
  const [featured, ...rest] = SERVICES;
  const FeaturedIcon = featured.icon;

  return (
    <section className="overflow-hidden bg-[#090a0c] text-white py-24 md:py-32 border-t border-white/10 relative">
      <div className="max-w-[80rem] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="agency-eyebrow inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#ff8964] mb-6 border border-[#ff8964]/20 bg-[#ff8964]/5">
              Service Ecosystem
            </div>
            <h2 className="text-4xl md:text-5xl font-normal leading-tight tracking-tighter text-white text-balance">
              Engineered for conversion.
              <br />
              <span className="text-[#95979e]">Free from complexity.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-[#ff8964] transition-colors"
          >
            Explore all capabilities
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Featured full-width Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <Link 
            href={featured.href} 
            className={cn(
              "group/link block relative p-6 sm:p-8 rounded-[20px] border transition-all duration-500",
              featured.colorClass
            )}
          >
            {/* Top border sweep highlight */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ff8964]/40 to-transparent"></div>
            
            <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-[#ff8964]/10 border border-[#ff8964]/20 text-[#ff8964] text-[10px] uppercase font-bold tracking-wider">
              {featured.tag}
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6 border", featured.iconBg)}>
                  <FeaturedIcon className="w-6 h-6" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4 tracking-tight leading-none">
                  {featured.title}
                </h3>
                
                <p className="text-[#95979e] leading-relaxed font-light text-base mb-6">
                  {featured.description}
                </p>
                
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white group-hover/link:text-[#ff8964] transition-colors">
                  Learn more about AI agents
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </span>
              </div>

              {/* Staggered Features list inside card */}
              <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {featured.features.map((feat) => (
                  <div 
                    key={feat} 
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 group-hover/link:border-white/10 transition-colors duration-500"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff8964] flex-shrink-0" />
                    <span className="text-xs text-zinc-300 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Staggered 4-Column Row Layout (No Bento Bento Grid) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((srv, i) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full"
              >
                <Link 
                  href={srv.href} 
                  className={cn(
                    "group/link flex flex-col h-full p-6 rounded-[20px] border transition-all duration-300",
                    srv.colorClass
                  )}
                >
                  <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mb-6 border transition-colors duration-300", srv.iconBg)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-2">
                    {srv.tag}
                  </span>
                  
                  <h3 className="font-semibold text-white text-base mb-2 tracking-tight">
                    {srv.title}
                  </h3>
                  
                  <p className="text-sm text-[#95979e] leading-relaxed font-light flex-grow">
                    {srv.description}
                  </p>
                  
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 group-hover/link:text-[#ff8964] mt-6 transition-colors duration-300">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
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
