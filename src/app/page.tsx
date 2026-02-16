import { Hero } from "@/components/Hero";
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

export default function Home() {
  return (
    <>
      <Hero />

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
        <ROICalculator />
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
