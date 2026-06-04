# Component Inventory — digital-helper-nextjs

> **Last Updated:** 2026-02-28 | **Branch:** redesign-v2

---

## V2 Components (Redesign — Active on Homepage)

All V2 components are in `src/components/v2/`. They use the Electric Midnight dark theme, indigo-600 primary, Framer Motion animations, and Syne headings.

| Component | File | Type | Description | Status |
|-----------|------|------|-------------|--------|
| `NavbarV2` | `v2/NavbarV2.tsx` | Client | Sticky header, services dropdown, mobile hamburger | ✅ Active |
| `FooterV2` | `v2/FooterV2.tsx` | Client | Footer with links | ✅ Active |
| `HeroV2` | `v2/HeroV2.tsx` | Client | Split layout: headline + animated chat demo | ✅ Active |
| `SocialProofBarV2` | `v2/SocialProofBarV2.tsx` | Client | Scrolling trust bar | ✅ Active |
| `ProblemV2` | `v2/ProblemV2.tsx` | Client | Problem agitation section | ✅ Active |
| `ServicesV2` | `v2/ServicesV2.tsx` | Client | Service cards grid | ✅ Active |
| `HowItWorksV2` | `v2/HowItWorksV2.tsx` | Client | 3-step process | ✅ Active |
| `CaseStudiesV2` | `v2/CaseStudiesV2.tsx` | Client | Case studies grid | ✅ Active |
| `PricingTeaserV2` | `v2/PricingTeaserV2.tsx` | Client | Pricing preview | ✅ Active |
| `FAQV2` | `v2/FAQV2.tsx` | Client | FAQ accordion | ✅ Active |
| `CTAV2` | `v2/CTAV2.tsx` | Client | Final call-to-action | ✅ Active |

### V2 Component Design Patterns

All V2 components follow these conventions:

```tsx
"use client"

// Named export (not default)
export function ComponentNameV2() { ... }

// Framer Motion for animations
import { motion, AnimatePresence } from "framer-motion"

// Lucide for icons
import { IconName } from "lucide-react"

// Background: bg-[#0a0a0f] or bg-[#0f0f18]
// Primary: bg-indigo-600, hover:bg-indigo-500
// Text: text-white / text-zinc-400 / text-zinc-200
// Borders: border-white/10 or border-white/[0.08]
// Glass: bg-white/5 backdrop-blur-sm
```

### NavbarV2 Details
- **Sticky header** with `z-50 bg-[#0a0a0f]/90 backdrop-blur-md`
- **Services dropdown** on hover (5 items)
- **Desktop CTA:** "Book a Demo" → `/contact`
- **Mobile:** Hamburger → full-height animated drawer
- **Nav links:** Services (dropdown), Work, Pricing, About

### HeroV2 Details
- **Layout:** 2-column grid (lg+), stacked mobile
- **Left:** Badge → H1 → Subtitle → 2 CTAs → 3 stats
- **Right:** Animated AI chat demo mockup (3 messages, input bar, feature pills)
- **Background:** Mesh gradient (indigo + violet blobs) + subtle grid overlay
- **CTAs:** "Book a Free Demo" (primary) + "See Case Studies" (ghost)
- **Stats:** 24/7 Always on | <5s Response time | 3× More leads

---

## Legacy V1 Components (Active — Inner Pages)

These are in `src/components/` (root level). They use the old design system and need to be migrated or replaced.

| Component | File | Notes |
|-----------|------|-------|
| `Hero` | `Hero.tsx` | Original hero |
| `HeroAI` | `HeroAI.tsx` | AI-focused hero variant |
| `HeroAuditWidget` | `HeroAuditWidget.tsx` | Hero with embedded audit widget |
| `Navbar` | `Navbar.tsx` | Original navbar |
| `Footer` | `Footer.tsx` | Original footer |
| `Services` | `Services.tsx` | Original services section |
| `ServiceCardsEnhanced` | `ServiceCardsEnhanced.tsx` | Enhanced service cards |
| `ServicePricingTeaser` | `ServicePricingTeaser.tsx` | Pricing teaser |
| `ServiceProcessTimeline` | `ServiceProcessTimeline.tsx` | Process timeline |
| `FAQ` | `FAQ.tsx` | Original FAQ |
| `Features` | `Features.tsx` | Features section |
| `CaseStudies` | `CaseStudies.tsx` | Case studies section |
| `Pricing` | `Pricing.tsx` | Full pricing page |
| `Contact` | `Contact.tsx` | Contact section |
| `ContactForm` | `ContactForm.tsx` | Contact form |
| `HowItWorks` | `HowItWorks.tsx` | Original how it works |
| `ProblemAgitation` | `ProblemAgitation.tsx` | Original problem section |
| `Stats` | `Stats.tsx` | Stats/metrics section |
| `Testimonials` | `Testimonials.tsx` | Testimonials |
| `TestimonialsCarousel` | `TestimonialsCarousel.tsx` | Carousel testimonials |
| `TrustBar` | `TrustBar.tsx` | Trust logos bar |
| `RecentWork` | `RecentWork.tsx` | Recent work portfolio |
| `SEOService` | `SEOService.tsx` | SEO service component |
| `AIAgency` | `AIAgency.tsx` | AI agency component |
| `WebDesign` | `WebDesign.tsx` | Web design component |
| `WebsiteAudit` | `WebsiteAudit.tsx` | Audit widget |
| `AuditResults` | `AuditResults.tsx` | Audit results display |

---

## Feature / Cross-Cutting Components

| Component | File | Type | Description |
|-----------|------|------|-------------|
| `ABTestProvider` | `ABTestProvider.tsx` | Client Context | A/B test assignment + tracking |
| `ABTest` | `ABTestProvider.tsx` | Client | Render variant-based JSX |
| `ChatWidget` | `ChatWidget.tsx` | Client | Floating AI chat (Gemini) |
| `LazyChat` | `LazyChat.tsx` | Client | Lazy-loaded chat widget |
| `SocialProofToast` | `SocialProofToast.tsx` | Client | "Someone just booked" toast |
| `SocialProofTicker` | `SocialProofTicker.tsx` | Client | Ticker-style social proof |
| `LiveSocialProof` | `LiveSocialProof.tsx` | Client | Live social proof feed |
| `ExitIntentPopup` | `ExitIntentPopup.tsx` | Client | Exit intent modal (useExitIntent) |
| `FloatingLeadMagnet` | `FloatingLeadMagnet.tsx` | Client | Floating lead magnet offer |
| `LeadMagnet` | `LeadMagnet.tsx` | Client | Lead magnet section |
| `LeadMagnetModal` | `LeadMagnetModal.tsx` | Client | Lead magnet modal |
| `EmailGate` | `EmailGate.tsx` | Client | Email gate before download |
| `ROICalculator` | `ROICalculator.tsx` | Client | Interactive ROI calculator |
| `CompetitorComparison` | `CompetitorComparison.tsx` | Client | Competitor comparison table |
| `ProposalGenerator` | `ProposalGenerator.tsx` | Client | AI proposal generator |
| `StructuredData` | `StructuredData.tsx` | Server | JSON-LD schema injection |
| `RevealOnScroll` | `RevealOnScroll.tsx` | Client | Intersection observer wrapper |
| `PageLoader` | `PageLoader.tsx` | Client | Page loading state |
| `AlwaysOnBanner` | `AlwaysOnBanner.tsx` | Client | Top banner |
| `StickyCTA` | `StickyCTA.tsx` | Client | Sticky bottom CTA |
| `MobileBottomNav` | `MobileBottomNav.tsx` | Client | Mobile bottom navigation |
| `MobileCallButton` | `MobileCallButton.tsx` | Client | Click-to-call button |
| `MobileMenu` | `MobileMenu.tsx` | Client | Legacy mobile menu |
| `MobileScrollOptimizer` | `MobileScrollOptimizer.tsx` | Client | Scroll performance helper |

---

## Domain-Specific Components

### Blog
| Component | File | Purpose |
|-----------|------|---------|
| `SearchBar` | `blog/SearchBar.tsx` | Blog search input |

### Industries
| Component | File | Purpose |
|-----------|------|---------|
| `IndustryPageLayout` | `industries/IndustryPageLayout.tsx` | Industry page wrapper |
| `IndustryPageContent` | `industries/IndustryPageContent.tsx` | Industry content renderer |
| `IndustryNavSidebar` | `industries/IndustryNavSidebar.tsx` | Industry nav sidebar |

### Locations
| Component | File | Purpose |
|-----------|------|---------|
| `LocationPageLayout` | `locations/LocationPageLayout.tsx` | Location page wrapper |
| `LocationPageContent` | `locations/LocationPageContent.tsx` | Location content renderer |
| `LocationNavSidebar` | `locations/LocationNavSidebar.tsx` | Location nav sidebar |

### Reputation Dashboard
| Component | File | Purpose |
|-----------|------|---------|
| `ReputationDashboard` | `reputation/ReputationDashboard.tsx` | Main dashboard |
| `GbpSearch` | `reputation/GbpSearch.tsx` | Google Business Profile search |
| `SingleAudit` | `reputation/SingleAudit.tsx` | Single business audit |
| `CompetitorComparison` | `reputation/CompetitorComparison.tsx` | Competitor analysis |
| `LeadFinder` | `reputation/LeadFinder.tsx` | Find local leads |
| `HealthScore` | `reputation/HealthScore.tsx` | Reputation health score |
| `SwotAnalysis` | `reputation/SwotAnalysis.tsx` | SWOT analysis display |
| `ActionCard` | `reputation/ActionCard.tsx` | Action item card |
| `ExportButton` | `reputation/ExportButton.tsx` | Export data button |

### SEO Research
| Component | File | Purpose |
|-----------|------|---------|
| `SearchBar` | `seo-research/SearchBar.tsx` | Keyword search |
| `CategorySection` | `seo-research/CategorySection.tsx` | Keyword category |
| `InsightCard` | `seo-research/InsightCard.tsx` | Keyword insight card |
| `KeywordTable` | `seo-research/KeywordTable.tsx` | Keyword data table |
| `CopyButton` | `seo-research/CopyButton.tsx` | Copy to clipboard |
| `ImplementationTimeline` | `seo-research/ImplementationTimeline.tsx` | Implementation timeline |

### Services
| Component | File | Purpose |
|-----------|------|---------|
| `ServicePageLayout` | `services/ServicePageLayout.tsx` | Service page wrapper |
| `ServiceNavSidebar` | `services/ServiceNavSidebar.tsx` | Service nav sidebar |
| `Breadcrumbs` | `services/Breadcrumbs.tsx` | Breadcrumb navigation |
| `StatisticCard` | `services/StatisticCard.tsx` | Stat display card |
| `AIAutomationPageContent` | `services/AIAutomationPageContent.tsx` | AI automation page |
| `ChatbotsPageContent` | `services/ChatbotsPageContent.tsx` | Chatbots page |
| `GBPPageContent` | `services/GBPPageContent.tsx` | Google Business Profile page |
| `LeadGenerationPageContent` | `services/LeadGenerationPageContent.tsx` | Lead gen page |
| `LocalSEOPageContent` | `services/LocalSEOPageContent.tsx` | Local SEO page |
| `ReputationManagementPageContent` | `services/ReputationManagementPageContent.tsx` | Reputation page |
| `SEOPageContent` | `services/SEOPageContent.tsx` | SEO page |
| `VoiceAIPageContent` | `services/VoiceAIPageContent.tsx` | Voice AI page |
| `WebDesignPageContent` | `services/WebDesignPageContent.tsx` | Web design page |
| `WorkflowAutomationPageContent` | `services/WorkflowAutomationPageContent.tsx` | Workflow automation page |

---

## shadcn/ui Components (`src/components/ui/`)

| Component | Wrapper of |
|-----------|-----------|
| `accordion.tsx` | Radix Accordion |
| `avatar.tsx` | Radix Avatar |
| `badge.tsx` | Custom |
| `button.tsx` | Custom (class-variance-authority) |
| `card.tsx` | Custom |
| `dropdown-menu.tsx` | Radix Dropdown |
| `input.tsx` | Custom |
| `sheet.tsx` | Radix Dialog (slide-over) |
| `skeleton.tsx` | Custom |
| `textarea.tsx` | Custom |
| `toast.tsx` | Custom (use-toast) |
| `toaster.tsx` | Toast renderer |
| `touch-card.tsx` | Custom (touch-optimized) |

---

## A/B Test Experiments (Active)

| Experiment | Variants | Split | Notes |
|-----------|---------|-------|-------|
| `hero-variant` | `original`, `ai-focused` | 50/50 | Homepage hero |
| `services-variant` | `original`, `enhanced` | 50/50 | Services section |

Usage pattern:
```tsx
const { variant } = useABTest('hero-variant')
// or
<ABTest experiment="hero-variant" variants={{ original: <Comp />, 'ai-focused': <CompB /> }} />
```
