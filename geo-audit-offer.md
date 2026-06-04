# GEO Audit Offer Plan

## Goal
Add a new productized service offer for Generative Engine Optimization (GEO) to the Digital Helper site, plus the internal assets needed to sell and deliver it.

## Requested Outcome
Done when the branch contains:
- A dedicated GEO Audit & Optimization service page on the existing site
- Supporting framework docs for delivery
- Sample audit scaffolding for portfolio creation
- Outreach assets for selling the offer
- Changes isolated to a feature branch

## Scope
### In Scope
- Add `/services/geo-audit`
- Add GEO to service navigation and services index
- Create a productized offer page with pricing, framework, deliverables, FAQs, and CTA
- Create internal delivery documentation for the 5-part GEO audit framework
- Create 3 sample audit templates/placeholders
- Create cold outreach templates and a simple prospecting workflow doc

### Out of Scope
- Building a full self-serve GEO SaaS tool
- Integrating real AI APIs for automated scoring
- Publishing outreach publicly
- Sending outreach automatically

## Assumptions
- This should live on the existing Digital Helper marketing site in this workspace
- Work should remain isolated on `feat/geo-audit-offer`
- Initial version should optimize for speed to market, not full automation

## Constraints
- Preserve existing site structure and styling patterns
- Avoid risky edits to unrelated features
- Keep the offer easy to understand for cold outreach and Upwork leads

## Deliverables
1. GEO service page
2. Services listing update
3. Service sidebar update
4. GEO framework document
5. Three sample audit files
6. Outreach email/DM templates
7. Optional case study draft scaffold

## File Plan
### Site files
- `src/app/services/geo-audit/page.tsx`
- `src/components/services/GEOAuditPageContent.tsx`
- `src/app/services/ServicesPageContent.tsx`
- `src/components/services/ServiceNavSidebar.tsx`

### Internal docs/assets
- `docs/GEO_AUDIT_FRAMEWORK.md`
- `docs/GEO_DELIVERY_CHECKLIST.md`
- `outreach/geo-cold-outreach.md`
- `outreach/geo-upwork-proposal.md`
- `work/geo-case-study-template.md`
- `work/geo-sample-audit-1.md`
- `work/geo-sample-audit-2.md`
- `work/geo-sample-audit-3.md`

## Task Breakdown

### Task 1: Formalize offer positioning
- **Priority:** P0
- **Depends on:** none
- **Input:** User brief and existing service positioning
- **Output:** Finalized offer structure, pricing, CTA language, and deliverables
- **Verify:** Offer language is consistent across page and docs

### Task 2: Create GEO service route
- **Priority:** P0
- **Depends on:** Task 1
- **Input:** Existing service page patterns
- **Output:** New Next.js route for `/services/geo-audit`
- **Verify:** Route file exists and exports metadata + page component correctly

### Task 3: Build GEO service page content
- **Priority:** P0
- **Depends on:** Task 1
- **Input:** Approved offer structure
- **Output:** Reusable `GEOAuditPageContent` component matching existing design system
- **Verify:** Component renders all major sections: hero, framework, pricing, FAQs, CTA

### Task 4: Add GEO to services discovery paths
- **Priority:** P0
- **Depends on:** Task 2, Task 3
- **Input:** Existing service index and sidebar
- **Output:** GEO appears in services grid and service nav sidebar
- **Verify:** Links point to `/services/geo-audit`

### Task 5: Create delivery framework documentation
- **Priority:** P1
- **Depends on:** Task 1
- **Input:** 5-part GEO audit methodology from user brief
- **Output:** Internal framework and checklist docs
- **Verify:** Docs cover mentions, citations, content gaps, technical readiness, competitors

### Task 6: Create sample audit scaffolding
- **Priority:** P1
- **Depends on:** Task 5
- **Input:** GEO rubric and delivery framework
- **Output:** Three reusable sample audit templates/placeholders
- **Verify:** Each sample includes executive summary, score, findings, and 10 fixes sections

### Task 7: Create outreach assets
- **Priority:** P1
- **Depends on:** Task 1, Task 5
- **Input:** Offer pricing and outreach strategy
- **Output:** Cold outreach and Upwork templates
- **Verify:** Templates reference the $99 audit and $499 monthly monitoring offer clearly

### Task 8: Validate implementation
- **Priority:** P1
- **Depends on:** Tasks 2-7
- **Input:** Updated code and docs
- **Output:** Build/type validation results
- **Verify:** Relevant files exist and project passes at least targeted sanity checks

## Recommended Order
1. Finalize positioning
2. Add route and page
3. Wire service discovery links
4. Create framework docs
5. Create sample audit scaffolding
6. Create outreach assets
7. Validate

## Risks
- GEO messaging could sound vague if not tied to concrete deliverables
- Service page could overpromise if wording implies guaranteed AI visibility
- Existing repo already has many unrelated uncommitted changes, so edits must stay tightly scoped

## Rollback Strategy
- Keep all changes on `feat/geo-audit-offer`
- Revert only GEO-specific files if needed
- Do not modify unrelated pages beyond service discovery links unless necessary

## Success Criteria
- The offer is visible as a first-class service on the site
- A prospect can understand the service in under 30 seconds
- Delivery docs make the audit repeatable
- Outreach templates are ready to use without major rewriting
- Main branch remains untouched unless merged later
