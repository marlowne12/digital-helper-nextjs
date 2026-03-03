# Data Models — digital-helper-nextjs

> **Last Updated:** 2026-02-28 | **Source:** `src/types/`

---

## Core Domain Types (`src/types/index.ts`)

### `ServiceItem`
```typescript
interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}
```

### `ChatMessage`
```typescript
interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}
```

### `CaseStudy`
```typescript
interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  imageUrl?: string;
  isAiGenerated?: boolean;
}
```

### `BlogPost`
```typescript
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  image: string;
  featured: boolean;
}
```

### `PricingTier`
```typescript
interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

interface PricingData {
  tiers: PricingTier[];
  currency: string;
  disclaimer: string;
}
```

### `SEOAnalysisResult`
```typescript
interface SEOIssue {
  category: string;
  severity: 'critical' | 'warning' | 'good';
  title: string;
  description: string;
  impact: string;
}

interface SEOAnalysisResult {
  url: string;
  overallScore: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  categories: {
    performance: { score: number; issues: string[] };
    seo: { score: number; issues: string[] };
    mobile: { score: number; issues: string[] };
    security: { score: number; issues: string[] };
  };
  quickWins: SEOIssue[];
  totalIssues: number;
}
```

### `BusinessAuditResult`
```typescript
interface BusinessAuditResult {
  analysis: string;
  mapLink?: string;
  mapTitle?: string;
  heroImage?: string;
}
```

---

## Audit Types (`src/types/audit.types.ts`)

### Request/Response Types
```typescript
interface AuditRequest {
  url: string;
  email?: string;
}

interface AuditResponse {
  url: string;
  quickPreview: QuickPreview;
  fullResults?: AuditFullResult;
}
```

### `QuickPreview`
```typescript
interface QuickPreview {
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  score: number;     // 0-100
  topIssue: string;
  issueCount: number;
}
```

### `AuditFullResult`
```typescript
interface AuditIssue {
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'good';
  impact: string;
}

interface CategoryScore {
  score: number;     // 0-100
  status: 'good' | 'needs-work' | 'critical';
  issues: AuditIssue[];
}

interface AuditFullResult {
  url: string;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  score: number;     // 0-100
  summary: string;
  categories: {
    performance: CategoryScore;
    seo: CategoryScore;
    mobile: CategoryScore;
    security: CategoryScore;
  };
  quickWins: string[];
  totalIssues: number;
}
```

### Component State
```typescript
type AuditStep = 'input' | 'loading' | 'results';

interface AuditState {
  step: AuditStep;
  url: string;
  email: string;
  quickPreview: QuickPreview | null;
  fullResults: AuditFullResult | null;
  error: string | null;
  isLoading: boolean;
}
```

---

## Gemini Service Types (`src/services/geminiService.ts`)

```typescript
interface CaseStudyText {
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
}

interface CaseStudyData extends CaseStudyText {
  imageUrl: string;
}

interface GenerationResult {
  success: boolean;
  data?: CaseStudyData;
  error?: string;
}
```

---

## A/B Test Types (`src/components/ABTestProvider.tsx`)

```typescript
interface ExperimentConfig {
  name: string;
  variants: string[];
  weights?: number[];  // Optional; default: equal distribution
}

const EXPERIMENTS: Record<string, ExperimentConfig> = {
  'hero-variant': {
    name: 'hero-variant',
    variants: ['original', 'ai-focused'],
    weights: [0.5, 0.5],
  },
  'services-variant': {
    name: 'services-variant',
    variants: ['original', 'enhanced'],
    weights: [0.5, 0.5],
  },
};

interface ABTestContextValue {
  getVariant: (experimentName: string) => string;
  setVariant: (experimentName: string, variant: string) => void;
  trackEvent: (experimentName: string, eventName: string, data?: Record<string, unknown>) => void;
}
```

---

## Constants (`src/lib/constants.ts`)

```typescript
const SIZES = {
  button: {
    primary: 48,    // px height
    secondary: 40,
    compact: 36,
  },
  input: {
    standard: 48,
    compact: 40,
  },
  text: {
    base: 'text-base',
    small: 'text-sm',
    xs: 'text-xs',
  }
} as const;
```

---

## Validation Schemas (`src/lib/validators.ts`)

### Contact Form (Zod v4)
```typescript
// contactFormSchema (inferred from usage in /api/contact)
const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1),
  service: z.string().optional(),
  honeypot: z.string().optional(),  // Spam protection
})
```

---

## Lead Storage Schema

Contact submissions are saved to `data/leads/contact-submissions.json`:

```json
[
  {
    "id": "uuid-v4",
    "name": "John Smith",
    "email": "john@business.com",
    "phone": "509-555-1234",
    "message": "I need a new website",
    "service": "Web Design",
    "honeypot": "",
    "createdAt": "2026-02-28T10:00:00.000Z",
    "source": "website-contact-form",
    "status": "new"
  }
]
```

⚠️ **Warning:** This storage approach does not work on Vercel (ephemeral filesystem). Data is lost on each deployment. Must migrate to a database or external service.

---

## Navigation Data

### NavbarV2 — Static Data
```typescript
const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

const SERVICES_DROPDOWN = [
  { label: "AI Chatbot System", href: "/services/ai-automation" },
  { label: "Web Design", href: "/services/web-design" },
  { label: "Local SEO", href: "/services/seo" },
  { label: "Lead Generation", href: "/services/lead-generation" },
  { label: "Reputation Management", href: "/services/reputation-management" },
];
```

---

## Enum Values

```typescript
enum SendingStatus {
  IDLE = 'IDLE',
  SENDING = 'SENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

type ViewState = 'HOME' | 'SEO' | 'WEBDESIGN' | 'AI_AGENCY' | 'CASE_STUDIES' | 'PRICING' | 'FEATURES';

type AuditStep = 'input' | 'loading' | 'results';

// Severity levels
type Severity = 'critical' | 'warning' | 'good';

// Category status
type CategoryStatus = 'good' | 'needs-work' | 'critical';

// Grade scale
type Grade = 'A' | 'B' | 'C' | 'D' | 'F';
```
