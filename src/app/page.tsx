import { Hero } from "@/components/Hero";
import { HeroAI } from "@/components/HeroAI";
import { TrustBar } from "@/components/TrustBar";
import { ProblemAgitation } from "@/components/ProblemAgitation";
import { WebsiteAudit } from "@/components/WebsiteAudit";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { Stats } from "@/components/Stats";
import { ROICalculator } from "@/components/ROICalculator";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { RecentWork } from "@/components/RecentWork";
import { FAQ } from "@/components/FAQ";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { ABTest } from "@/components/ABTestProvider";
import { AlwaysOnBanner } from "@/components/AlwaysOnBanner";
import { LeadMagnet } from "@/components/LeadMagnet";
import { FloatingLeadMagnet } from "@/components/FloatingLeadMagnet";
import { LiveSocialProof } from "@/components/LiveSocialProof";
import { SocialProofToast } from "@/components/SocialProofToast";
import { CompetitorComparison } from "@/components/CompetitorComparison";
import { StickyCTA, FloatingCTAButton } from "@/components/StickyCTA";

/**
 * Homepage with A/B tested Hero variants
 * 
 * Experiment: hero-variant
 * - original: Website modernization messaging
 * - ai-focused: AI automation messaging (aligned with social launch)
 * 
 * Sprint 7: Social Alignment
 * Sprint 10: Live Social Proof + Competitor Comparison
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

      {/* Live Social Proof - creates urgency */}
      <LiveSocialProof />

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

      {/* Competitor Comparison - why us */}
      <RevealOnScroll>
        <CompetitorComparison />
      </RevealOnScroll>

      <RevealOnScroll>
        <Stats />
      </RevealOnScroll>

      <RevealOnScroll>
        <div id="roi-calculator">
          <ROICalculator />
        </div>
      </RevealOnScroll>

      {/* Testimonials Carousel - Social Proof */}
      <TestimonialsCarousel />

      <RevealOnScroll>
        <RecentWork />
      </RevealOnScroll>

      <RevealOnScroll>
        <FAQ />
      </RevealOnScroll>

      {/* Lead Magnet Section - before footer */}
      <RevealOnScroll>
        <LeadMagnet />
      </RevealOnScroll>

      {/* Floating Lead Magnet CTA */}
      <FloatingLeadMagnet />

      {/* Social Proof Toast Notifications */}
      <SocialProofToast />

      {/* Sticky CTAs - Mobile bar + Desktop floating button */}
      <StickyCTA />
      <FloatingCTAButton />
    </>
  );
}
