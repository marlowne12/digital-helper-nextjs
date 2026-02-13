# Social Media Automation Plan

> Long-term solution for managing social media without manual browser interaction

---

## Current State (Problems)

1. **Browser relay is unreliable** — Chrome extension disconnects frequently
2. **No API access** — Can't programmatically update profiles or post content
3. **Manual process** — Every update requires logging in and clicking

---

## Target State (Solution)

### Option A: n8n + Social APIs (Recommended)

**Why:** We already have n8n infrastructure, APIs are reliable

| Platform | API | Capabilities |
|----------|-----|--------------|
| **Facebook** | Graph API | Post content, manage page, read insights |
| **LinkedIn** | Marketing API | Post updates, company page management |
| **Twitter/X** | API v2 | Post tweets, read mentions |
| **Instagram** | Graph API (via FB) | Post images, read comments |
| **Google Business** | Business Profile API | Post updates, respond to reviews |

**Setup Required:**
1. Create Facebook App → Get Page Access Token
2. Create LinkedIn App → Get OAuth tokens
3. Create n8n credentials for each platform
4. Build posting workflows

### Option B: Buffer/Hootsuite + MCP

**Why:** Unified interface, proven scheduling tools

1. Set up Buffer account
2. Connect all social profiles
3. Use Buffer API or build MCP wrapper
4. Schedule content programmatically

### Option C: Make.com / Zapier Webhooks

**Why:** No-code, visual workflows

1. Create Make.com account
2. Build social posting scenarios
3. Trigger via webhook from Claude/OpenClaw
4. Track in Google Sheets

---

## Recommended: n8n Implementation

### Phase 1: Facebook Posting (Week 1)

```
Workflow: facebook-post
Trigger: Webhook or Schedule
Steps:
1. Receive content (text, image URL)
2. Post to Facebook Page via Graph API
3. Log result to Google Sheets
4. Notify via Telegram
```

**Required:**
- Facebook Developer Account
- App with pages_manage_posts permission
- Page Access Token (never expires with proper setup)

### Phase 2: LinkedIn Posting (Week 2)

```
Workflow: linkedin-post
Trigger: Webhook or Schedule
Steps:
1. Receive content (text, image)
2. Upload media to LinkedIn
3. Create share via API
4. Log result
```

**Required:**
- LinkedIn Developer App
- OAuth 2.0 tokens
- Company page admin access

### Phase 3: Cross-Platform Scheduler (Week 3)

```
Workflow: social-scheduler
Trigger: Daily at 10am PT
Steps:
1. Read content from Google Sheet
2. Check which platforms need content
3. Post to each platform
4. Update sheet with status
5. Weekly summary report
```

---

## Google Sheets Integration

### Content Sheet Structure

| Column | Description |
|--------|-------------|
| ID | Unique identifier |
| Content | Post text |
| Image URL | Optional image |
| Platforms | facebook,linkedin,twitter |
| Scheduled Date | When to post |
| Status | draft/scheduled/posted/failed |
| Post URLs | Links to live posts |

### How It Works

1. Add content to Google Sheet
2. n8n workflow checks sheet on schedule
3. Posts content to specified platforms
4. Updates status and adds post URLs

---

## For Email Management

### Current: gogcli (Needs Reinstall)

```powershell
# Reinstall gogcli to new user path
# Download from: https://github.com/user/gogcli
# Install to: C:\Users\marlo\gogcli\
# Add to PATH: C:\Users\marlo\gogcli\bin
```

### Alternative: Google Workspace MCP

There's an MCP server for Google Workspace that could handle:
- Gmail (read/send)
- Calendar (read/create)
- Drive (read/write)
- Sheets (read/write)

Search: `npx @anthropic/mcp-google-workspace`

---

## Immediate Actions

### Today
- [x] Created SOCIAL-TASKS-TRACKER.md with all links and content
- [x] Created CONTENT-STRUCTURE.md for content source of truth
- [x] Created this automation plan

### This Week
- [ ] Reinstall gogcli for Google Sheets access
- [ ] Create Facebook Developer App
- [ ] Get Page Access Token
- [ ] Build first n8n posting workflow

### Next Week
- [ ] LinkedIn Developer App setup
- [ ] Cross-platform posting workflow
- [ ] Content calendar in Google Sheets

---

## Credentials Needed

| Platform | What's Needed | Where to Get |
|----------|--------------|--------------|
| Facebook | Page Access Token | developers.facebook.com |
| LinkedIn | OAuth tokens | linkedin.com/developers |
| Google | Service Account JSON | console.cloud.google.com |
| Twitter | API Key + Secret | developer.twitter.com |

---

**Created:** 2026-02-03 17:15 PT
**Status:** Planning
