import { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { WebsiteAudit } from '@/components/WebsiteAudit';
import { Services } from '@/components/Services';
import { Features } from '@/components/Features';
import { Testimonials } from '@/components/Testimonials';
import { RecentWork } from '@/components/RecentWork';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Modern Web Design in Richland, WA | Digital Helper',
  description: 'Digital Helper transforms outdated local business websites in Richland, WA into modern, high-converting sites. Web design, mobile optimization & AI-powered content for Tri-Cities businesses.',
  alternates: {
    canonical: 'https://digital-helper.com/',
  }
};

export default function Home() {
  return (
    <>
      <Hero />

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
