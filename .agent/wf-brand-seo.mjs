export const meta = {
  name: 'brand-seo-finish',
  description: 'Operator-grade brand consistency + anti-slop cleanup across all 54 routes, NAP normalization, and metadata gap-fill, then verify the build',
  phases: [
    { title: 'NAP' },
    { title: 'Brand' },
    { title: 'Verify' },
  ],
}

// ---------------------------------------------------------------------------
// Shared context every agent needs. Repo lives in WSL; file edits via Edit/Write
// work on the UNC path, but ANY node/npm command MUST be wrapped in:
//   wsl.exe -d Ubuntu bash -lc 'cd /home/mars/digital-helper-source && <cmd>'
// ---------------------------------------------------------------------------
const BRAND_CANON = `
BRAND CANON (BINDING — complete the rollout, do NOT invent a new identity):
- Palette: Operator Black #0E0F11, Signal Amber #E89A3C (max ONE accent per surface),
  Arterial Red #B83A2C (light-mode/alerts only), Charcoal #2A2C30, Steel #5C6066,
  Mist #A4A8AE, Warm Bone #F2EFE9 (light base). Prefer existing CSS tokens/utility
  classes in globals.css over raw hex.
- Type: Geist Mono for display/headlines, Geist for body. Wordmark ALL CAPS +0.08em.
- Personality: calm authority, senior engineer at a small friendly firm.
- ANTI-SLOP — FORBIDDEN, remove on sight and replace with the operator-grade equivalent:
  * gradient text (bg-clip-text + text-transparent on text) -> solid token color
  * glassmorphism (backdrop-blur on cards/panels) -> solid Charcoal/Operator-Black surface with a 1px Steel/Charcoal border
  * glow shadows (shadow-[0_0_...], colored/amber glow, drop-shadow glows) -> flat or a single subtle neutral shadow
  * marquees, decorative status dots, fake "trusted by" logos, em-dash spam, section-number eyebrows
- NAP source of truth is src/lib/business-info.ts (BUSINESS_INFO). Phone (509) 987-5060,
  email business@digital-helper.com. NEVER hardcode NAP — import BUSINESS_INFO.
`

const RULES = `
HARD RULES:
- Edit ONLY files inside your assigned scope below. Do NOT edit any file outside it.
- NEVER touch global chrome (owned elsewhere): src/components/Navbar.tsx,
  src/components/Footer.tsx, src/app/layout.tsx, src/app/globals.css,
  src/components/ChatWidget.tsx, src/components/StructuredData.tsx,
  src/app/sitemap.ts, src/app/robots.ts, next.config.ts, package.json,
  src/lib/business-info.ts.
- Apply only HIGH-CONFIDENCE, mechanical fixes (anti-slop class swaps, NAP via
  BUSINESS_INFO import, missing metadata). For anything subjective (layout/copy
  redesign, ambiguous restyle), DO NOT edit — record it under "deferred".
- Do not run npm/build. Keep changes surgical. Preserve all functionality.
- Return ONLY the StructuredOutput object (it is data, not a message).
`

const REPORT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['area', 'filesEdited', 'deferred', 'summary'],
  properties: {
    area: { type: 'string' },
    filesEdited: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['path', 'change'],
        properties: {
          path: { type: 'string' },
          change: { type: 'string', description: 'one-line description of what was fixed' },
        },
      },
    },
    deferred: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['path', 'issue', 'severity', 'why'],
        properties: {
          path: { type: 'string' },
          issue: { type: 'string' },
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          why: { type: 'string', description: 'why it needs a human / visual decision' },
        },
      },
    },
    summary: { type: 'string' },
  },
}

// ===========================================================================
// PHASE 1 — NAP normalization (single agent, runs alone before brand edits)
// ===========================================================================
phase('NAP')
const napFiles = [
  'src/app/services/ServicesContent.tsx',
  'src/app/api/lead-magnet/route.ts',
  'src/app/contact/ContactContent.tsx',
  'src/app/contact/ContactPageContent.tsx',
  'src/components/v2/CTAV2.tsx',
  'src/components/ContactForm.tsx',
  'src/components/ExitIntentPopup.tsx',
  'src/components/MobileCallButton.tsx',
  'src/components/FounderSection.tsx',
  'src/lib/pdf/lead-magnet-templates.tsx',
]
const napReport = await agent(
  `You are normalizing NAP (Name/Address/Phone) consistency for a local-SEO site.
${BRAND_CANON}

TASK: In EACH of these files, replace hardcoded contact info with the single source of truth.
Files (edit only these): ${napFiles.join(', ')}

The source of truth is src/lib/business-info.ts which exports BUSINESS_INFO with:
  phone "(509) 987-5060", phoneHref "tel:+15099875060",
  email "business@digital-helper.com", emailHref "mailto:business@digital-helper.com".

For each file:
- Replace any hardcoded phone "(509) 876-8454" / "509-876-8454" / "+15098768454" / "8768454"
  with BUSINESS_INFO.phone (display) or BUSINESS_INFO.phoneHref (tel: links).
- Replace any hardcoded email "digitalhelperwebsite@gmail.com" or other email with
  BUSINESS_INFO.email / BUSINESS_INFO.emailHref.
- Add \`import { BUSINESS_INFO } from '@/lib/business-info'\` if not present.
- For files that are React-PDF templates or API routes, still import BUSINESS_INFO and use its values.
- If a file has NO hardcoded NAP after inspection, leave it untouched and note it.
Read each file first. Make surgical edits. Do not change layout or copy beyond the NAP values.
${RULES}`,
  { label: 'nap-normalize', phase: 'NAP', schema: REPORT_SCHEMA }
)

// ===========================================================================
// PHASE 2 — Brand consistency + anti-slop + metadata, per disjoint area
// ===========================================================================
phase('Brand')
const AREAS = [
  {
    key: 'services',
    scope: 'src/app/web-design/**, src/app/seo/**, src/app/ai-agency/**, src/app/services/** (all sub-pages), src/components/services/**',
    extra: 'These are the core money pages. Ensure each canonical page (/web-design, /seo, /ai-agency) is operator-grade.',
  },
  {
    key: 'locations',
    scope: 'src/app/richland-wa/**, src/app/kennewick-wa/**, src/app/pasco-wa/**, src/app/locations/** (index + west-richland), src/components/locations/**',
    extra: 'Local SEO pages. Keep city-specific copy. The *-wa pages are canonical; /locations/{richland,kennewick,pasco} now 301-redirect away so do not invest there.',
  },
  {
    key: 'industries',
    scope: 'src/app/industries/** (index + agriculture, healthcare, manufacturing, retail-ecommerce, wineries), src/components/industries/**',
    extra: '',
  },
  {
    key: 'marketing',
    scope: 'src/app/about/**, src/app/pricing/**, src/app/case-studies/**, src/app/work/**, src/app/features/**, src/app/resources/**, src/app/demo/**, src/app/booking/**, src/components/reputation/**',
    extra: 'Trust + conversion pages.',
  },
  {
    key: 'blog-home',
    scope: 'src/app/page.tsx (home), src/app/blog/** (index, [slug], category), src/components/blog/**, src/components/landing/**',
    extra: 'Home page is the flagship. The home page (src/app/page.tsx) and src/app/blog/page.tsx currently lack a metadata export — add a unique title/description/canonical (home canonical "/"). Blog landing/section components must be operator-grade.',
  },
  {
    key: 'tools-contact',
    scope: 'src/app/contact/page.tsx, src/app/audit/**, src/app/tools/** (index, lead-scraper, seo-audit), src/app/seo-research/**, src/components/tools/**, src/components/seo-research/**',
    extra: 'IMPORTANT: do NOT edit src/app/contact/ContactContent.tsx or ContactPageContent.tsx (owned by NAP phase). Pages missing metadata that you SHOULD add unique title/description/canonical to: src/app/audit, src/app/tools/seo-audit, src/app/seo-research. Leave the admin pages alone.',
  },
  {
    key: 'v2-shared',
    scope: 'src/components/v2/** (HeroV2, ServicesV2, PricingV2, PricingTeaserV2, ProblemV2, FAQV2, CaseStudiesV2, HowItWorksV2, QuickLeadCaptureV2, SocialProofBarV2, PayForResultsBlock, BreadcrumbV2, NavbarV2, FooterV2)',
    extra: 'These are shared section components reused across pages — the biggest anti-slop surface (gradient text, backdrop-blur, glow). Do NOT touch the real Navbar.tsx/Footer.tsx in src/components root. NavbarV2/FooterV2 here are separate.',
  },
]

const brandReports = await parallel(
  AREAS.map((a) => () =>
    agent(
      `You are doing an operator-grade brand-consistency + anti-slop pass on the "${a.key}" area of a Next.js 16 site for Digital Helper.
${BRAND_CANON}

YOUR EXCLUSIVE SCOPE (edit only files matching these globs):
${a.scope}
${a.extra ? 'AREA NOTES: ' + a.extra : ''}

PROCESS:
1. Grep your scope for anti-slop: "text-transparent"/"bg-clip-text" (gradient text),
   "backdrop-blur" (glassmorphism), "shadow-[0_0", "drop-shadow", amber/colored glow,
   "marquee", decorative status dots, fake trust logos, section-number eyebrows.
2. Read each offending file and fix HIGH-CONFIDENCE cases per the canon (gradient text -> solid
   token color; glass card -> solid Charcoal surface + 1px border; glow -> flat/subtle neutral).
3. Verify operator tokens/fonts are used (Geist Mono headers, Geist body). Fix obvious misuse.
4. Fill any metadata gaps noted in AREA NOTES (unique title/description + canonical).
5. Preserve all functionality, animations that are tasteful, layout structure, and copy.
   Anything subjective or risky -> record under "deferred", do not edit.
${RULES}`,
      { label: `brand:${a.key}`, phase: 'Brand', schema: REPORT_SCHEMA }
    )
  )
)

// ===========================================================================
// PHASE 3 — Verify gate (build + lint) via WSL
// ===========================================================================
phase('Verify')
const VERIFY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['buildPassed', 'lintErrors', 'details'],
  properties: {
    buildPassed: { type: 'boolean' },
    lintErrors: { type: 'number' },
    details: { type: 'string', description: 'first failing error(s) verbatim if any, else short OK note' },
  },
}
const verify = await agent(
  `Verify the build and lint of this Next.js project after a large brand/SEO edit pass.

CRITICAL: this repo is in WSL. You MUST run node/npm via:
  wsl.exe -d Ubuntu bash -lc 'cd /home/mars/digital-helper-source && <command>'
A bare \`npm run build\` fails (Windows cmd cannot use the UNC path).

Steps:
1. Run: wsl.exe -d Ubuntu bash -lc 'cd /home/mars/digital-helper-source && npm run build 2>&1 | tail -40'
   Capture whether it ends with success (exit 0, route table printed) or a "Failed to compile" type error.
2. Run: wsl.exe -d Ubuntu bash -lc 'cd /home/mars/digital-helper-source && npm run lint 2>&1 | tail -5'
   Count ESLint ERRORS (not warnings) from the "✖ N problems (E errors, W warnings)" line.
3. Report buildPassed (true/false), lintErrors (number), and details. If the build FAILED,
   include the exact file:line and error text so it can be fixed. Do NOT attempt to fix it yourself.`,
  { label: 'verify-build', phase: 'Verify', schema: VERIFY_SCHEMA }
)

return {
  nap: napReport,
  brand: brandReports.filter(Boolean),
  verify,
}
