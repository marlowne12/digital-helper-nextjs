# Digital Helper — Agency Website

## Business
- **Site**: digital-helper.com
- **Owner**: Mars — (509) 987-5060
- **Theme**: Electric Midnight (dark theme)
- **Deployment**: Vercel
- **Positioning**: Web design, SEO, and AI automation for Tri-Cities service businesses

## Stack
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind v4, shadcn/ui, Framer Motion
- Vercel AI SDK, @ai-sdk/google, @google/genai
- Supabase (database), Upstash (rate limiting, Redis)
- @react-pdf/renderer (PDF generation)
- Vercel Analytics + Speed Insights

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build (run before committing)
- `npm run lint` — ESLint check
- `npm run test` — Vitest test suite
- `npm run test:watch` — Vitest in watch mode

## Conventions
- All components use TypeScript with strict types
- Use shadcn/ui components from @radix-ui primitives
- Use `clsx` + `tailwind-merge` for conditional classes
- Framer Motion for all animations
- Dark-first design: Electric Midnight theme
- Responsive-first: mobile breakpoint, then sm/md/lg
- No paid AI API keys in client-side code — use server-side routes with rate limiting
