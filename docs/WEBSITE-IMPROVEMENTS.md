# Website Improvement Tasks

> Breaking down improvements into manageable chunks for AntiGravity orchestration

---

## 🎯 Goals

1. **Social Media Alignment** — Website should match social profiles (branding, messaging)
2. **GEO Optimization** — AI visibility (show up in ChatGPT/Gemini answers)
3. **UI/UX Polish** — Modern, professional finish
4. **Content Updates** — Align with current service offerings
5. **Performance** — Maintain 90+ PageSpeed scores

---

## 📋 Task Breakdown

### Phase 1: Foundation (Do First)

#### Task 1.1: Audit Current State
- [x] Screenshot current homepage
- [x] List all pages and their status (45+ pages built)
- [ ] Check current Lighthouse scores
- [x] Document what needs updating

#### Task 1.2: Social Profile Alignment
- [x] Pull branding from Zoho/social profiles (business@digital-helper.com confirmed)
- [x] Ensure consistent:
  - Logo usage
  - Color scheme
  - Tagline ("We build systems that work while you sleep") ✅ Updated in Hero
  - Contact info (509-876-8454, business@digital-helper.com) ✅ In schema
- [x] Update Open Graph / social meta tags (already configured)

### Phase 2: GEO Optimization (AI Visibility)

#### Task 2.1: Structured Data Enhancement
- [x] Add comprehensive FAQ schema to all service pages:
  - ✅ Web Design (6 FAQs with schema)
  - ✅ SEO (6 FAQs with schema)
  - ✅ AI Automation (4 FAQs with schema)
  - ✅ Lead Generation (6 FAQs with schema)
  - ✅ Reputation Management (6 FAQs with schema)
- [x] Enhance LocalBusiness schema with:
  - All services offered ✅ Added hasOfferCatalog with 5 services
  - Price ranges ✅ ($$)
  - Service areas ✅ Added all 4 cities with proper City schema
  - Opening hours ✅ (Mon-Fri 9-6)
  - Email ✅ Added business@digital-helper.com
  - Founder ✅ Added Marlon McGuire
  - Description ✅ Added with tagline
- [ ] Add HowTo schema for process sections
- [ ] Add Service schema for each service page

#### Task 2.2: AI-Friendly Content
- [ ] Add clear Q&A sections that AI can parse
- [ ] Structure content in direct answer format
- [ ] Include "What we do" summaries at top of each page
- [ ] Add comparison tables (us vs competitors)

#### Task 2.3: Entity Optimization
- [ ] Ensure business name mentioned consistently
- [ ] Link to authoritative sources
- [ ] Include "About the owner" section
- [ ] Add testimonials with schema markup

### Phase 3: UI/UX Polish

#### Task 3.1: Homepage Refresh
- [x] Hero section: clearer value prop ✅ Updated tagline
- [x] Trust indicators: add ratings, reviews, badges ✅ Added TrustBar component
- [ ] Service cards: consistent styling (already good)
- [ ] CTA buttons: prominent, action-oriented

#### Task 3.2: Navigation & UX
- [ ] Floating navbar spacing
- [ ] Mobile menu optimization
- [ ] Smooth scroll behavior
- [ ] Loading states for AI features

#### Task 3.3: Design System Consistency
- [ ] Run ui-ux-pro-max to verify design choices
- [ ] Check light/dark mode contrast
- [ ] Verify all icons are SVG (no emoji)
- [ ] Ensure cursor-pointer on all clickable elements

### Phase 4: Content & SEO

#### Task 4.1: Service Page Updates
- [ ] Verify all service pages match BUSINESS.md
- [ ] Add/update pricing information
- [ ] Include case study links
- [ ] Refresh testimonials section

#### Task 4.2: Location Pages
- [x] Ensure all 4 cities have pages (Richland, Kennewick, Pasco, West Richland) ✅
- [x] Add local landmarks/references ✅ 24 landmarks added across 4 cities
- [x] City-specific FAQs with schema ✅ 16 FAQs total
- [x] City-specific LocalBusiness schema ✅
- [x] Services highlight section ✅
- [ ] Include local testimonials (future)

#### Task 4.3: Blog & Resources
- [x] Add recent blog posts to homepage ✅ RecentBlog component
- [ ] Create resources/guides section
- [ ] Link to lead magnets

### Phase 5: Technical Polish

#### Task 5.1: Performance
- [ ] Run Lighthouse audit
- [ ] Optimize images (WebP, proper sizing)
- [ ] Check bundle size
- [ ] Verify Core Web Vitals

#### Task 5.2: Accessibility
- [ ] Run accessibility audit
- [ ] Fix any ARIA issues
- [ ] Verify keyboard navigation
- [ ] Check color contrast

---

## 🚀 Execution Order

**Sprint 1 (Today):**
1. Task 1.1 - Audit
2. Task 1.2 - Social alignment
3. Task 3.1 - Homepage refresh

**Sprint 2 (This Week):**
4. Task 2.1 - Structured data
5. Task 2.2 - AI-friendly content
6. Task 3.2 - Navigation & UX

**Sprint 3 (Next Week):**
7. Task 4.1 - Service pages
8. Task 4.2 - Location pages
9. Task 5.1 - Performance

---

## 📝 Update Protocol

After each task:
1. Update this file (check off completed items)
2. Update CLAUDE.md with any new patterns
3. Commit changes with descriptive message
4. Run verification scripts

---

**Last Updated:** 2026-02-03
**Owner:** Max (via AntiGravity)
