# Architecture — digital-helper-nextjs

> **Pattern:** Next.js App Router (RSC + Client Components)
> **Last Updated:** 2026-02-28

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Vercel Edge Network                      │
├─────────────────────────────────────────────────────────────────┤
│   Next.js 16 App Router                                         │
│                                                                 │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────────┐   │
│  │ React Server │   │ Client       │   │  API Routes      │   │
│  │ Components   │   │ Components   │   │  (Edge/Node)     │   │
│  │ (RSC)        │   │ "use client" │   │  /api/*          │   │
│  └──────────────┘   └──────────────┘   └──────────────────┘   │
│                               │                  │             │
│                      ┌────────┴─────┐   ┌────────┴────────┐   │
│                      │ ABTestProvider│   │  Server Actions  │   │
│                      │ (Context)    │   │  src/app/actions/│   │
│                      └─────────────┘   └─────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│   External Services                                             │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │  Gemini API  │  │  OpenRouter  │  │  Google Business │    │
│  │ (AI Features)│  │ (Case Study) │  │  Profile API     │    │
│  └──────────────┘  └──────────────┘  └──────────────────┘    │
│                                                                 │
│  ┌──────────────┐  ┌──────────────────────────────────────┐   │
│  │  Resend/SMTP │  │  Vercel Analytics / Edge Config       │   │
│  │  (Email)     │  │                                        │   │
│  └──────────────┘  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Routing Architecture

### App Router Layout Hierarchy

```
src/app/
├── layout.tsx              ← Root: fonts, dark mode, ABTestProvider, NavbarV2, FooterV2
│   ├── page.tsx            ← Homepage (all V2 components)
│   ├── about/page.tsx
│   ├── ai-agency/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   ├── [slug]/page.tsx
│   │   └── category/[category]/page.tsx
│   ├── booking/page.tsx
│   ├── case-studies/page.tsx
│   ├── contact/page.tsx
│   ├── dashboard/reputation/page.tsx
│   ├── features/page.tsx
│   ├── industries/
│   │   ├── page.tsx
│   │   ├── agriculture/page.tsx
│   │   ├── healthcare/page.tsx
│   │   ├── manufacturing/page.tsx
│   │   ├── retail-ecommerce/page.tsx
│   │   └── wineries/page.tsx
│   ├── locations/
│   │   ├── page.tsx
│   │   ├── kennewick/page.tsx
│   │   ├── pasco/page.tsx
│   │   ├── richland/page.tsx
│   │   └── west-richland/page.tsx
│   ├── pricing/page.tsx
│   ├── redesign/layout.tsx + page.tsx   ← V2 preview sandbox
│   ├── seo-research/page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   ├── ai-automation/
│   │   │   ├── page.tsx
│   │   │   ├── chatbots/page.tsx
│   │   │   ├── voice-ai/page.tsx
│   │   │   └── workflow-automation/page.tsx
│   │   ├── lead-generation/page.tsx
│   │   ├── reputation-management/ (with layout.tsx)
│   │   └── seo/
│   │       ├── page.tsx
│   │       ├── google-business-profile/page.tsx
│   │       └── local-seo/page.tsx
│   ├── tools/seo-audit/ (with layout.tsx)
│   ├── work/page.tsx + case-studies/page.tsx
│   └── api/                    ← Route Handlers
│       ├── chat/route.ts
│       ├── contact/route.ts
│       ├── website-audit/route.ts
│       └── [8 more endpoints]
```

---

## Component Architecture

### Layer 1: V2 Redesign (Active — Homepage)
```
src/components/v2/
├── NavbarV2.tsx          ← Sticky header, services dropdown, mobile menu
├── FooterV2.tsx          ← Footer with links
├── HeroV2.tsx            ← Hero: copy left + chat demo right
├── SocialProofBarV2.tsx  ← Trust bar
├── ProblemV2.tsx         ← Problem agitation section
├── ServicesV2.tsx        ← Services cards
├── HowItWorksV2.tsx      ← 3-step process
├── CaseStudiesV2.tsx     ← Case studies grid
├── PricingTeaserV2.tsx   ← Pricing preview
├── FAQV2.tsx             ← FAQ accordion
└── CTAV2.tsx             ← Final call to action
```

### Layer 2: Legacy V1 (Still Active — Inner Pages)
```
src/components/
├── Navbar.tsx, Footer.tsx, Hero.tsx, Services.tsx, etc.
```

### Layer 3: Feature Components (Cross-cutting)
```
src/components/
├── ABTestProvider.tsx       ← A/B test context + useABTest hook
├── ChatWidget.tsx           ← AI chat bubble (Gemini)
├── SocialProofToast.tsx     ← Floating notification
├── ExitIntentPopup.tsx      ← Exit intent modal
├── FloatingLeadMagnet.tsx   ← Floating CTA
├── ROICalculator.tsx        ← Interactive ROI calculator
└── StructuredData.tsx       ← JSON-LD schema injection
```

### Layer 4: Domain-Specific Components
```
src/components/
├── blog/                  ← Blog SearchBar
├── industries/            ← IndustryPageLayout, IndustryPageContent, IndustryNavSidebar
├── locations/             ← LocationPageLayout, LocationPageContent, LocationNavSidebar
├── reputation/            ← Full reputation dashboard components
├── seo-research/          ← SEO research UI components
└── services/              ← ServicePageLayout, ServiceNavSidebar, page content components
```

### Layer 5: UI Primitives (shadcn/ui)
```
src/components/ui/
├── accordion.tsx, avatar.tsx, badge.tsx, button.tsx
├── card.tsx, dropdown-menu.tsx, input.tsx, sheet.tsx
├── skeleton.tsx, textarea.tsx, toast.tsx, toaster.tsx
└── touch-card.tsx
```

---

## Data Flow

### AI Features Flow
```
User Input
  → Client Component (form/chat)
  → API Route (/api/*)
  → Validation (Zod)
  → Gemini AI (@google/genai or @ai-sdk/google)
  → Response → Client
```

### Contact Form Flow
```
User fills form
  → Client Component
  → POST /api/contact
  → Zod validation + honeypot check
  → Save to data/leads/contact-submissions.json
  → Return success
  [TODO: → n8n webhook → CRM → email notification]
```

### A/B Test Flow
```
layout.tsx wraps all children with ABTestProvider
  → ABTestProvider reads/writes localStorage assignments
  → Components call useABTest('experiment-name')
  → Returns variant string ('original' | 'ai-focused' | etc.)
  → Tracks events to Vercel Analytics
```

---

## Styling Architecture

### Tailwind v4 Pattern
- **No `tailwind.config.js`** — Tailwind v4 uses PostCSS
- **`globals.css`** — All theme config via `@theme inline { ... }`
- **Brand tokens:**
  - `--color-brand-dark: #0f172a`
  - `--color-brand-accent: #06b6d4`
  - `--color-brand-purple: #8b5cf6`
- **Background:** `bg-[#0a0a0f]` (near-black)
- **Animations:** `--animate-float`, `--animate-blob`, `--animate-shimmer`, etc.
- **Glass effect:** `.glass` utility class

### Font System
```css
--font-sans: var(--font-dm-sans)      /* Body text */
--font-heading: var(--font-syne)      /* Headings */
--font-mono: var(--font-geist-mono)   /* Code */
```
Used via inline style: `style={{ fontFamily: "var(--font-heading)" }}`

### Dark Mode
- `dark` class hardcoded on `<html>` element in `layout.tsx`
- `@custom-variant dark (&:is(.dark *))` in globals.css
- No light mode toggle — dark-only by design

---

## Critical Gotchas for AI Agents

1. **Tailwind v4** — No `tailwind.config.js`. Use `@theme` in globals.css for new tokens.
2. **`dark` class is hardcoded** — Don't use `prefers-color-scheme`. Use Tailwind `dark:` prefix with `.dark *` selector.
3. **Framer Motion v12** — Import from `framer-motion` (not `motion/react`)
4. **AI SDK v6** — `useChat`/`streamText` API changed from v4/v5. `@ai-sdk/google v3` not `v2`.
5. **Vitest not Jest** — Use `vi.fn()` not `jest.fn()`. Setup in `vitest.config.ts`.
6. **Zod v4** — Use `.safeParse()` at API boundaries, not `.parse()`.
7. **ABTestProvider** — Must wrap inside this; never create a provider that wraps outside it.
8. **`suppressHydrationWarning`** — Present on both `<html>` and `<body>`. Intentional. Do not remove.
9. **backdrop-blur-xl** — Requires parent `overflow-hidden` to function in most browsers.
10. **Path alias** — Always use `@/` (maps to `src/`). Never use relative imports like `../../`.
