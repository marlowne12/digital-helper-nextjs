# Initial Project Context Snapshot

Created: 2026-04-08
Purpose: seed source snapshot for the Digital Helper wiki.

## Business / site summary
- Brand: Digital Helper
- Primary domain: digital-helper.com
- Positioning: web design agency with AI-powered features and local SEO emphasis
- Geographic focus: Richland, WA and the Tri-Cities area
- Differentiator: practical AI features, not just generic chatbot claims
- Pricing guidance in project notes: approximately $1,999-$3,999

## Codebase summary
- Project name: `digital-helper-nextjs`
- Stack: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- AI integrations noted in project docs: Gemini / Google AI tooling
- Additional service and analytics integrations appear in dependencies and project notes

## Existing project memory already present
- `memory/glossary.md`
- `memory/keywords/hero-keywords.md`
- `memory/keywords/secondary-keywords.md`
- `memory/competitors/primary-competitors.md`
- `memory/content-calendar/active-calendar.md`
- `memory/reports/*`
- `memory/audits/*`

## AGENTS.md highlights
- Project includes a hot-cache style SEO memory summary
- Build commands documented: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npx tsc --noEmit`
- Notes mention server actions, API routes, shared types, validators, and a dark-mode-first design system
- Required environment variables include Google Places and Google Generative AI keys

## package.json highlights
- Key framework dependencies: `next`, `react`, `react-dom`
- UI and animation dependencies: Radix UI, Framer Motion
- AI and data dependencies: `ai`, `@ai-sdk/google`, `@google/genai`, `cheerio`, Supabase, Upstash
- Test tooling: Vitest, Testing Library, jsdom
