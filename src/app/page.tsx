import { Hero } from "@/components/Hero";
import { HeroAI } from "@/components/HeroAI";
import { TrustBar } from "@/components/TrustBar";
import { ProblemAgitation } from "@/components/ProblemAgitation";
import { WebsiteAudit } from "@/components/WebsiteAudit";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { Stats } from "@/components/Stats";
import { ROICalculator } from "@/components/ROICalculator";
import { Testimonials } from "@/components/Testimonials";
import { RecentWork } from "@/components/RecentWork";
import { FAQ } from "@/components/FAQ";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { ABTest } from "@/components/ABTestProvider";
import { AlwaysOnBanner } from "@/components/AlwaysOnBanner";

/**
 * Homepage with A/B tested Hero variants
 * 
 * Experiment: hero-variant
 * - original: Website modernization messaging
 * - ai-focused: AI automation messaging (aligned with social launch)
 * 
 * Sprint 7: Social Alignment
 */
export default function Home() {
  return (
    <>
      {/* 24/7 AI Banner - reinforces social messaging */}
      <AlwaysOnBanner />

      {/* A/B Test: Hero variants */}
      <ABTest 
        experiment="hero-variant"
        variants={{
          'original': <Hero />,
          'ai-focused': <HeroAI />,
        }}
      />

      <TrustBar />

      <RevealOnScroll>
        <ProblemAgitation />
      </RevealOnScroll>

      <RevealOnScroll>
        <WebsiteAudit />
      </RevealOnScroll>

      <RevealOnScroll>
        <Services />
      </RevealOnScroll>

      <RevealOnScroll>
        <HowItWorks />
      </RevealOnScroll>

      <RevealOnScroll>
        <Stats />
      </RevealOnScroll>

      <RevealOnScroll>
        <div id="roi-calculator">
          <ROICalculator />
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <Testimonials />
      </RevealOnScroll>

      <RevealOnScroll>
        <RecentWork />
      </RevealOnScroll>

      <RevealOnScroll>
        <FAQ />
      </RevealOnScroll>
    </>
  );
}
