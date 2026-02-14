# Digital Helper Design System & Components

## Purpose
Reference document for AI assistants building UI components. Covers design tokens, component patterns, and implementation guidance.

---

## Design Tokens

### Color Palette (Dark Theme)

```css
/* Primary Colors */
--color-background-primary: #0a0a0f;      /* Main background */
--color-background-secondary: #0f1419;    /* Cards, sections */
--color-background-tertiary: #161b22;     /* Hover states */

/* Text */
--text-primary: #ffffff;                  /* Headings, important */
--text-secondary: #a1a1aa;                /* Body text (zinc-400) */
--text-muted: #71717a;                    /* Captions, labels */

/* Accent (Teal-Cyan-Sky Gradient) */
--color-accent-primary: #00d4aa;          /* Teal */
--color-accent-secondary: #0ea5e9;        /* Sky */
--color-accent-tertiary: #06b6d4;         /* Cyan */
--accent-gradient: linear-gradient(135deg, #00d4aa 0%, #0ea5e9 50%, #06b6d4 100%);

/* UI States */
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;
--info: #0ea5e9;

/* Effects */
--glow-teal: rgba(0, 212, 170, 0.15);
--glow-cyan: rgba(6, 182, 212, 0.15);
--card-border: rgba(255, 255, 255, 0.08);
--card-bg: rgba(255, 255, 255, 0.03);
```

### Tailwind Config Additions

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0a0a0f',
          secondary: '#0f1419',
          tertiary: '#161b22',
        },
        accent: {
          teal: '#00d4aa',
          sky: '#0ea5e9',
          cyan: '#06b6d4',
        }
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #00d4aa 0%, #0ea5e9 50%, #06b6d4 100%)',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(0, 212, 170, 0.15)',
        'glow-md': '0 0 40px rgba(0, 212, 170, 0.2)',
        'glow-lg': '0 0 60px rgba(0, 212, 170, 0.25)',
      }
    }
  }
}
```

---

## Typography

### Font Stack
```css
--font-display: 'Syne', -apple-system, BlinkMacSystemFont, sans-serif;       /* Headings */
--font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;       /* Body text */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

| Name | Size | Line Height | Weight | Usage |
|------|------|-------------|--------|-------|
| Hero | 64px / 4rem | 1.1 | 700 | Homepage hero only |
| H1 | 48px / 3rem | 1.2 | 700 | Page titles |
| H2 | 36px / 2.25rem | 1.3 | 600 | Section headers |
| H3 | 24px / 1.5rem | 1.4 | 600 | Card titles, subsections |
| H4 | 20px / 1.25rem | 1.5 | 600 | Small headers |
| Body | 16px / 1rem | 1.6 | 400 | Paragraphs |
| Body Large | 18px / 1.125rem | 1.6 | 400 | Lead paragraphs |
| Small | 14px / 0.875rem | 1.5 | 400 | Captions, labels |
| Tiny | 12px / 0.75rem | 1.4 | 500 | Badges, meta |

### Tailwind Classes

```jsx
// Hero
<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">

// H1
<h1 className="text-4xl md:text-5xl font-bold">

// H2
<h2 className="text-3xl md:text-4xl font-semibold">

// H3
<h3 className="text-xl md:text-2xl font-semibold">

// Body
<p className="text-base text-zinc-400 leading-relaxed">

// Body Large (lead)
<p className="text-lg text-zinc-300 leading-relaxed">

// Gradient text
<span className="text-gradient">
```

---

## Component Patterns

### Button

```jsx
// Primary Button
<button className="
  px-6 py-3 
  bg-accent-gradient 
  text-white font-medium 
  rounded-lg 
  hover:opacity-90 
  transition-all duration-200
  shadow-glow-sm hover:shadow-glow-md
">
  Book a Call
</button>

// Secondary Button
<button className="
  px-6 py-3 
  bg-white/5 
  text-white font-medium 
  rounded-lg 
  border border-white/10
  hover:bg-white/10 
  transition-all duration-200
">
  Learn More
</button>

// Ghost Button
<button className="
  px-4 py-2 
  text-zinc-400 
  hover:text-white 
  transition-colors
">
  View Details →
</button>
```

### Card (Glassmorphism)

```jsx
<div className="
  relative 
  p-6 
  rounded-2xl 
  bg-white/[0.03] 
  backdrop-blur-xl 
  border border-white/[0.08]
  hover:border-white/[0.15]
  hover:bg-white/[0.05]
  transition-all duration-300
">
  {/* Optional glow effect on hover */}
  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  
  {/* Content */}
  <div className="relative z-10">
    <h3 className="text-xl font-semibold text-white mb-2">Card Title</h3>
    <p className="text-zinc-400">Card description goes here.</p>
  </div>
</div>
```

### Service Card

```jsx
<div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-accent-primary/30 transition-all duration-300">
  {/* Icon */}
  <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-4">
    <Icon className="w-6 h-6 text-accent-primary" />
  </div>
  
  {/* Content */}
  <h3 className="text-xl font-semibold text-white mb-2">Web Design</h3>
  <p className="text-zinc-400 mb-4">Modern, fast websites that convert visitors into customers.</p>
  
  {/* Link */}
  <a href="/services/web-design" className="text-accent-primary hover:text-accent-secondary font-medium inline-flex items-center gap-1">
    Learn More
    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
  </a>
</div>
```

### Testimonial Card

```jsx
<div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
  {/* Quote */}
  <p className="text-zinc-300 text-lg mb-6 leading-relaxed">
    "Digital Helper transformed our online presence. Our mobile traffic has doubled."
  </p>
  
  {/* Author */}
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-tertiary flex items-center justify-center text-white font-semibold">
      SJ
    </div>
    <div>
      <p className="text-white font-medium">Sarah Jenkins</p>
      <p className="text-zinc-500 text-sm">Owner, Tri-Cities Coffee Co.</p>
    </div>
  </div>
</div>
```

### Pricing Card

```jsx
<div className={`
  relative p-8 rounded-2xl 
  ${popular ? 'bg-gradient-to-b from-accent-primary/10 to-transparent border-accent-primary/30' : 'bg-white/[0.03] border-white/[0.08]'}
  border
`}>
  {/* Popular badge */}
  {popular && (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-gradient rounded-full text-sm font-medium text-white">
      Most Popular
    </div>
  )}
  
  {/* Plan name */}
  <h3 className="text-xl font-semibold text-white mb-2">Growth</h3>
  
  {/* Price */}
  <div className="mb-6">
    <span className="text-4xl font-bold text-white">$997</span>
    <span className="text-zinc-500">/month</span>
  </div>
  
  {/* Description */}
  <p className="text-zinc-400 mb-6">For businesses ready to scale their automation.</p>
  
  {/* Features */}
  <ul className="space-y-3 mb-8">
    <li className="flex items-center gap-3 text-zinc-300">
      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
      3 workflow automations
    </li>
    {/* ... more features */}
  </ul>
  
  {/* CTA */}
  <button className="w-full py-3 bg-accent-gradient text-white font-medium rounded-lg">
    Get Started
  </button>
</div>
```

### Input Field

```jsx
<div className="space-y-2">
  <label className="text-sm font-medium text-zinc-300">Email</label>
  <input 
    type="email"
    className="
      w-full px-4 py-3 
      bg-white/[0.05] 
      border border-white/[0.1]
      rounded-lg
      text-white
      placeholder:text-zinc-500
      focus:border-accent-primary/50 
      focus:ring-2 focus:ring-accent-primary/20
      outline-none
      transition-all
    "
    placeholder="you@example.com"
  />
</div>
```

### Badge/Tag

```jsx
// Status badge
<span className="px-3 py-1 text-xs font-medium rounded-full bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
  AI Powered
</span>

// Service tag
<span className="px-2 py-1 text-xs font-medium rounded bg-white/[0.05] text-zinc-400">
  SEO
</span>
```

---

## Section Patterns

### Hero Section

```jsx
<section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 via-transparent to-transparent" />
  
  {/* Grid pattern (optional) */}
  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
  
  {/* Content */}
  <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
    {/* Badge */}
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] mb-8">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      <span className="text-sm text-zinc-400">Serving Tri-Cities Businesses</span>
    </div>
    
    {/* Headline */}
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
      Transform Your Business with{' '}
      <span className="bg-gradient-to-r from-accent-primary via-indigo-400 to-blue-400 bg-clip-text text-transparent">
        Intelligent Automation
      </span>
    </h1>
    
    {/* Subheadline */}
    <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
      We build AI-powered systems that generate leads, automate workflows, and scale your operations.
    </p>
    
    {/* CTAs */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="px-8 py-4 bg-accent-gradient text-white font-medium rounded-lg shadow-glow-sm hover:shadow-glow-md transition-all">
        Get Started
      </button>
      <button className="px-8 py-4 bg-white/[0.05] text-white font-medium rounded-lg border border-white/[0.1] hover:bg-white/[0.1] transition-all">
        View Our Work
      </button>
    </div>
  </div>
</section>
```

### Section Container

```jsx
<section className="py-20 md:py-32">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Services Built for Growth
      </h2>
      <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
        Tailored solutions to help your business thrive in the digital age.
      </p>
    </div>
    
    {/* Content grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Cards go here */}
    </div>
  </div>
</section>
```

### CTA Section

```jsx
<section className="py-20 relative overflow-hidden">
  {/* Gradient background */}
  <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 via-accent-secondary/10 to-accent-tertiary/10" />
  
  <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
      Ready to Transform Your Business?
    </h2>
    <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
      Book a free strategy call and discover how automation can save you time and generate more leads.
    </p>
    <button className="px-8 py-4 bg-accent-gradient text-white font-medium rounded-lg shadow-glow-md hover:shadow-glow-lg transition-all">
      Book a Free Call
    </button>
  </div>
</section>
```

---

## Animation Patterns

### Framer Motion Variants

```jsx
// Fade up on scroll
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Scale on hover
const cardVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
};
```

### CSS Animations

```css
/* Glow pulse */
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 170, 0.15); }
  50% { box-shadow: 0 0 40px rgba(0, 212, 170, 0.25); }
}

.animate-glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}

/* Gradient shift */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}
```

---

## Responsive Breakpoints

```css
/* Tailwind defaults */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Common Patterns

```jsx
// Container max widths
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Grid responsiveness
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

// Text scaling
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">

// Hide/show
<div className="hidden md:block">   {/* Show on tablet+ */}
<div className="block md:hidden">   {/* Show on mobile only */}

// Spacing scaling
<section className="py-12 md:py-20 lg:py-32">
```

---

## Icon Usage

### Lucide Icons (Recommended)

```jsx
import { 
  ArrowRight, Check, X, Menu, ChevronDown,
  Globe, Search, Zap, Bot, Users, BarChart3,
  Phone, Mail, MapPin, Calendar, Clock
} from 'lucide-react';

// Standard size
<Globe className="w-5 h-5" />

// With color
<Check className="w-5 h-5 text-green-500" />

// In button
<button className="inline-flex items-center gap-2">
  Learn More <ArrowRight className="w-4 h-4" />
</button>
```

### Service Icons
| Service | Icon |
|---------|------|
| Web Design | `Globe`, `Layout`, `Monitor` |
| SEO | `Search`, `TrendingUp`, `BarChart3` |
| AI Automation | `Bot`, `Zap`, `Workflow` |
| Lead Generation | `Users`, `Target`, `Inbox` |

---

## Spacing System

Use Tailwind's default spacing scale consistently:

| Class | Size | Usage |
|-------|------|-------|
| `gap-2` / `p-2` | 8px | Tight spacing (badges, tags) |
| `gap-4` / `p-4` | 16px | Default element spacing |
| `gap-6` / `p-6` | 24px | Card padding |
| `gap-8` / `p-8` | 32px | Section internal spacing |
| `py-12` | 48px | Small section padding |
| `py-20` | 80px | Standard section padding |
| `py-32` | 128px | Large section padding |

---

## Z-Index Scale

```css
--z-background: -10;
--z-default: 0;
--z-card: 10;
--z-dropdown: 20;
--z-sticky: 30;
--z-modal-backdrop: 40;
--z-modal: 50;
--z-tooltip: 60;
```

Tailwind classes: `z-0`, `z-10`, `z-20`, `z-30`, `z-40`, `z-50`
