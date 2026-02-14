"use client";

import { useState, useEffect } from 'react';
import { CheckCircle2, TrendingUp, Users, Award } from 'lucide-react';

type SocialProofItem = {
  text: string;
  icon: React.ElementType;
  company: string;
};

const socialProofs: SocialProofItem[] = [
  {
    text: "Just partnered with",
    icon: CheckCircle2,
    company: "Tri-Cities HVAC Services"
  },
  {
    text: "Website launched for",
    icon: TrendingUp,
    company: "Pacific Northwest Dentistry"
  },
  {
    text: "Automation system for",
    icon: Users,
    company: "Richland Property Management"
  },
  {
    text: "SEO optimization for",
    icon: Award,
    company: "Columbia River Tours"
  },
  {
    text: "New client onboarded:",
    icon: CheckCircle2,
    company: "Kennewick Legal Group"
  },
  {
    text: "Lead generation for",
    icon: TrendingUp,
    company: "Pasco Construction Co."
  }
];

export function SocialProofTicker() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNext = () => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev: number) => (prev + 1) % socialProofs.length);
        setIsVisible(true);
      }, 500);
    };

    const timer = setInterval(showNext, 5000);
    const initialTimeout = setTimeout(() => setIsVisible(true), 100);

    return () => {
      clearInterval(timer);
      clearTimeout(initialTimeout);
    };
  }, []);

  const currentProof = socialProofs[currentIndex];
  const Icon = currentProof.icon;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm" role="status" aria-live="polite" aria-atomic="true">
      <div
        className={`glass border border-white/10 rounded-2xl p-4 flex items-center gap-3 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-zinc-400">
            {currentProof.text}
          </p>
          <p className="text-sm font-semibold text-white truncate">
            {currentProof.company}
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-zinc-500 hover:text-white transition-colors shrink-0"
          aria-label="Dismiss notification"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
