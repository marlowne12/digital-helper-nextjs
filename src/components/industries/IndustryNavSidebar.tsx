"use client";

import React from'react';
import Link from'next/link';
import { usePathname } from'next/navigation';
import { motion } from'framer-motion';
import {
  Stethoscope,
  Factory,
  Sprout,
  ShoppingBag,
  Wine
} from'lucide-react';

const industries = [
  {
    title:"Healthcare",
    href:"/industries/healthcare",
    icon: <Stethoscope className="w-4 h-4"/>
  },
  {
    title:"Manufacturing",
    href:"/industries/manufacturing",
    icon: <Factory className="w-4 h-4"/>
  },
  {
    title:"Agriculture",
    href:"/industries/agriculture",
    icon: <Sprout className="w-4 h-4"/>
  },
  {
    title:"Retail & E-commerce",
    href:"/industries/retail-ecommerce",
    icon: <ShoppingBag className="w-4 h-4"/>
  },
  {
    title:"Wineries",
    href:"/industries/wineries",
    icon: <Wine className="w-4 h-4"/>
  }
];

export function IndustryNavSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-full sticky top-32 self-start space-y-8">
      <div className="bg-charcoal border border-steel/30 p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-white mb-6 px-2">Industries</h3>
        <nav className="space-y-2">
          {industries.map((industry) => {
            const isActive = pathname === industry.href;

            return (
              <Link
                key={industry.href}
                href={industry.href}
                className="block group"
              >
                <div className={`
                  relative flex items-center justify-between p-3 rounded-xl transition-all duration-300
                  ${isActive
                    ?'bg-charcoal text-white border border-signal-amber/30'
                    :'text-zinc-400 hover:text-white hover:bg-charcoal border border-transparent'
                  }
                `}>
                  <div className="flex items-center gap-3">
                    <span className={`
                      p-2 rounded-lg transition-colors
                      ${isActive ?'bg-operator-black text-signal-amber':'bg-charcoal text-zinc-500 group-hover:text-white'}
                    `}>
                      {industry.icon}
                    </span>
                    <span className="font-medium text-sm">{industry.title}</span>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeIndustryIndicator"
                      className="absolute left-0 w-1 h-6 bg-signal-amber rounded-r-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="bg-charcoal border border-steel/30 p-6 rounded-2xl relative overflow-hidden group">
        <div className="relative z-10">
          <h4 className="text-xl font-bold text-white mb-2">Industry Solutions</h4>
          <p className="text-sm text-zinc-400 mb-6">
            Looking for a specialized strategy for your specific business model?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center w-full py-3 px-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors gap-2 text-sm"
          >
            Talk to an Expert
          </Link>
        </div>
      </div>
    </aside>
  );
}
