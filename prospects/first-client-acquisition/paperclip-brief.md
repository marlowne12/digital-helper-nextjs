# Paperclip Brief: Help Digital Helper Get Its First Client

## Mission

Help Digital Helper win its first paid client from a Tri-Cities local service business.

This is a revenue mission, not a general website improvement project.

## Business Context

- Business: Digital Helper
- Website: https://digital-helper.com
- Owner: Mars
- Phone: (509) 987-5060
- Market: Richland, Kennewick, Pasco, West Richland
- Services: web design, local SEO, AI automation, lead generation, reputation management
- Best first-client offer: free audit, then one $497 high-impact fix

## Agent Responsibilities

### Codex CEO

- Own the queue.
- Keep the work focused on first-client acquisition.
- Break work into small issues.
- Assign implementation tasks to Claude Code.
- Assign research/verification tasks to Hermes when available.

### Claude Code Engineer

- Improve only the site pieces that directly help first-client acquisition.
- Examples:
  - contact path verification
  - offer page
  - audit landing path
  - lead capture reliability
  - proposal or audit template generation
- Do not redesign the whole site unless explicitly assigned.

### Hermes Agent

- Verify prospects.
- Summarize Google/website weaknesses.
- Draft personalized audit notes.
- Prepare outreach context for Mars.
- This agent may be blocked until the Hermes VPS is connected to Paperclip.

## Initial Paperclip Issues To Create

1. Verify `digital-helper.com` and the contact path
   - Owner: Codex CEO or Claude Code
   - Output: clear pass/fail notes and any fixes needed

2. Score the first 10 prospects
   - Owner: Hermes when connected, otherwise Codex CEO
   - Source: `prospect-shortlist.md`
   - Output: 10 verified observations and a score from 1 to 5

3. Draft first-touch messages for top 5 prospects
   - Owner: Hermes or Codex CEO
   - Output: personalized email/call notes ready for Mars

4. Create a $497 starter-fix proposal template
   - Owner: Claude Code or Codex CEO
   - Output: reusable template for the first warm lead

5. Build or polish first-client offer path if needed
   - Owner: Claude Code
   - Output: only if the current site lacks a clear path to request the free audit

## Constraints

- Use `BUSINESS.md` as the source of truth.
- Do not change the phone number.
- Do not invent fake case studies, fake stats, or fake testimonials.
- Prioritize manual revenue activity before automation.
- Keep tasks small enough to finish in one Paperclip heartbeat.
