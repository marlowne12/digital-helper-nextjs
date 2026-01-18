import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WebsiteAudit } from "@/components/WebsiteAudit";
import { ProblemAgitation } from "@/components/ProblemAgitation";
import { HowItWorks } from "@/components/HowItWorks";
import { Stats } from "@/components/Stats";
import { FAQ } from "@/components/FAQ";
import { RecentWork } from "@/components/RecentWork";

export default function Home() {
  return (
    <main className="min-h-screen bg-background-primary">
      <Hero />
      <ProblemAgitation />
      <WebsiteAudit />
      <Services />
      <HowItWorks />
      <Stats />
      <RecentWork />
      <FAQ />
    </main>
  );
}
