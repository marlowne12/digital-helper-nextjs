# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture Overview

This is a **Next.js 16** marketing site for a web design agency ("Digital Helper") with AI-powered features. Uses the App Router with React 19, TypeScript, and Tailwind CSS v4.

### Key Architectural Patterns

**Server Actions (`src/app/actions/`)**: AI-powered backend logic using Vercel AI SDK with Google Gemini:
- `analyze.ts` - Website scraping (cheerio) + AI analysis (generateObject/generateText)
- `gbp.ts` - Google Places API integration for business profile data
- `lead-finder.ts` - Batch lead discovery

**API Routes (`src/app/api/`)**: Streaming chat and service endpoints:
- `chat/route.ts` - AI chat widget with tool calling (generateQuote, scheduleCall, analyzeWebsite)
- Uses `@ai-sdk/google` with `streamText` for streaming responses

**Type System**:
- `src/types/index.ts` - Core app types (ChatMessage, CaseStudy, SEOAnalysisResult, etc.)
- `src/types/reputation.ts` - GBP/reputation audit types (GBPProfile, AuditResult, SwotAnalysis)

**Validation**: Zod schemas in `src/lib/validators.ts` for API inputs

### UI Component Structure

**Layout**: Root layout (`src/app/layout.tsx`) includes Navbar, Footer, ChatWidget, and Contact section on all pages. Uses Syne (headings) and DM Sans (body) fonts.

**Service Pages**: Use shared `ServicePageLayout` component with sticky sidebar navigation (`src/components/services/`).

**UI Primitives**: Radix UI + shadcn/ui patterns in `src/components/ui/` (button, card, sheet, accordion, etc.)

**Animations**: Framer Motion for page transitions; custom CSS animations defined in `globals.css` (float, blob, shimmer, glow-pulse).

### Design System

Dark-mode-first with "Electric Midnight" theme:
- Background: `--color-background-primary: #0a0a0f`
- Accent gradient: teal (#00d4aa) → blue (#0ea5e9) → cyan (#06b6d4)
- Glass morphism utilities: `.glass`, `.glass-hover`
- Gradient text: `.text-gradient`, `.bg-accent-gradient`

### Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json)

### Environment Variables Required

- `GOOGLE_PLACES_API_KEY` - For Google Business Profile lookups
- `GOOGLE_GENERATIVE_AI_API_KEY` - For Gemini AI features (via @ai-sdk/google)

### Redirects

Legacy routes are redirected in `next.config.ts` (e.g., `/seo` → `/services/seo`, `/booking` → `/contact`).
