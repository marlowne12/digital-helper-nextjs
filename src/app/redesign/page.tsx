import { HeroV2 } from "@/components/v2/HeroV2";
import { SocialProofBarV2 } from "@/components/v2/SocialProofBarV2";
import { ProblemV2 } from "@/components/v2/ProblemV2";
import { ServicesV2 } from "@/components/v2/ServicesV2";
import { HowItWorksV2 } from "@/components/v2/HowItWorksV2";
import { CaseStudiesV2 } from "@/components/v2/CaseStudiesV2";
import { PricingTeaserV2 } from "@/components/v2/PricingTeaserV2";
import { FAQV2 } from "@/components/v2/FAQV2";
import { CTAV2 } from "@/components/v2/CTAV2";

/**
 * Redesign V2 Preview — visit /redesign to preview
 * Deploy: replace src/app/page.tsx content with this when ready
 */
export default function RedesignPreview() {
  return (
    <>
      <HeroV2 />
      <SocialProofBarV2 />
      <ProblemV2 />
      <ServicesV2 />
      <HowItWorksV2 />
      <CaseStudiesV2 />
      <PricingTeaserV2 />
      <FAQV2 />
      <CTAV2 />
    </>
  );
}
