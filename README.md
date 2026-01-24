# Digital Helper

Modern web design, SEO, and AI automation agency serving the Tri-Cities, WA area.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, TypeScript, Tailwind CSS v4
- **Animation:** Framer Motion
- **Components:** Radix UI + shadcn/ui
- **AI:** Vercel AI SDK with Google Gemini
- **Hosting:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── services/          # Service pages
│   ├── blog/              # Blog pages
│   └── ...
├── components/            # React components
│   ├── ui/               # shadcn/ui primitives
│   ├── services/         # Service-specific components
│   └── ...
├── lib/                   # Utilities and helpers
└── types/                 # TypeScript types
```

## Environment Variables

Create a `.env.local` file with:

```env
GOOGLE_PLACES_API_KEY=your_key_here
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

## Documentation

- `CLAUDE.md` - Technical reference for AI coding assistants
- `BUSINESS.md` - Business context and service definitions
- `DESIGN_SYSTEM.md` - Design tokens and component patterns
- `tri-cities-keyword-opportunities.md` - SEO keyword research

## License

Private - All rights reserved.
