import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { WebsiteAudit } from '@/components/WebsiteAudit';
import { Services } from '@/components/Services';
import { Features } from '@/components/Features';
import { Testimonials } from '@/components/Testimonials';
import { RecentWork } from '@/components/RecentWork';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export default function Home() {
  return (
    <>
      <Hero />

      <TrustBar />

      <RevealOnScroll>
        <WebsiteAudit />
      </RevealOnScroll>

      <RevealOnScroll>
        <Services />
      </RevealOnScroll>

      <RevealOnScroll>
        <Features />
      </RevealOnScroll>

      <RevealOnScroll>
        <Testimonials />
      </RevealOnScroll>

      <RevealOnScroll>
        <RecentWork />
      </RevealOnScroll>
    </>
  );
}
