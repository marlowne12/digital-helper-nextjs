"use client";

import { motion } from "framer-motion";

const PROOF = [
  { metric: "+42%", label: "more calls", client: "Richland HVAC Pros" },
  { metric: "12hrs", label: "saved per week", client: "Tri-Cities Law Firm" },
  { metric: "5k+", label: "new monthly visitors", client: "Modern Cafe Richland" },
  { metric: "Top 3", label: "Google Maps ranking", client: "TC Real Estate" },
];

export function SocialProofBarV2() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-y border-white/8 bg-white/2 py-4"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-white/8">
          {PROOF.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center lg:px-8 py-1">
              <div className="flex items-baseline gap-1.5 mb-0.5">
                <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.metric}
                </span>
                <span className="text-sm text-zinc-400">{item.label}</span>
              </div>
              <span className="text-xs text-zinc-600">{item.client}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
