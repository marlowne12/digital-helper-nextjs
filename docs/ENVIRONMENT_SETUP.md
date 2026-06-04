# Environment Setup Guide

This document explains how to set up environment variables for the Digital Helper application.

## Required Variables

### Google AI
```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
```
Get from: https://makersuite.google.com/app/apikey

### Supabase Database
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```
Get from: https://app.supabase.com/project/_/settings/api

### Upstash Rate Limiting
```bash
UPSTASH_REDIS_REST_URL=https://your-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token
```
Get from: https://console.upstash.com/redis

## Optional Variables

### Google Places API
```bash
GOOGLE_PLACES_API_KEY=your_places_api_key
```
Get from: https://console.cloud.google.com/apis/library/places-backend.googleapis.com

### Google Sheets (Content CMS)
```bash
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Key Here\n-----END PRIVATE KEY-----"
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
```

### Email Notifications (Resend)
```bash
RESEND_API_KEY=re_your_api_key
LEAD_NOTIFICATION_EMAIL=leads@digital-helper.com
```
Get from: https://resend.com

### Admin Authentication
```bash
ADMIN_PASSWORD=your_secure_admin_password
```

### Calendly
```bash
CALENDLY_LINK=https://calendly.com/your-link
```

## Database Setup

### Supabase Tables

Run this SQL in your Supabase SQL editor:

```sql
-- Create leads table
CREATE TABLE leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    business_name TEXT,
    location TEXT,
    source TEXT CHECK (source IN ('website_audit', 'chat', 'contact', 'exit_intent', 'newsletter')),
    metadata JSONB,
    audit_result JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create content_items table
CREATE TABLE content_items (
    id TEXT PRIMARY KEY,
    type TEXT CHECK (type IN ('blog', 'service', 'location')),
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    status TEXT CHECK (status IN ('draft', 'reviewing', 'selected', 'exported')),
    selected_variant_id TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    exported_at TIMESTAMP WITH TIME ZONE,
    export_path TEXT
);

-- Create content_variants table
CREATE TABLE content_variants (
    id TEXT PRIMARY KEY,
    content_item_id TEXT REFERENCES content_items(id) ON DELETE CASCADE,
    variant_number INTEGER CHECK (variant_number IN (1, 2, 3)),
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    meta_title TEXT,
    meta_description TEXT,
    reading_time TEXT,
    variant_style TEXT CHECK (variant_style IN ('seo-focused', 'story-driven', 'problem-solution')),
    word_count INTEGER,
    seo_score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_selected BOOLEAN DEFAULT FALSE
);

-- Create export_logs table
CREATE TABLE export_logs (
    id TEXT PRIMARY KEY,
    item_id TEXT REFERENCES content_items(id),
    variant_id TEXT,
    export_path TEXT,
    exported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    git_commit TEXT
);

-- Create indexes
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_content_items_type ON content_items(type);
CREATE INDEX idx_content_variants_item_id ON content_variants(content_item_id);
```

## Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your API keys in `.env.local`

3. Start the development server:
   ```bash
   npm run dev
   ```

## Production Deployment

### Vercel
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Redeploy the application

### Security Checklist
- [ ] Never commit `.env.local` to git
- [ ] Use strong passwords for admin access
- [ ] Rotate API keys regularly
- [ ] Use service role keys only on server
- [ ] Enable Row Level Security in Supabase

## Troubleshooting

### Database connection issues
- Verify Supabase URL and keys are correct
- Check if IP is allowlisted in Supabase settings

### Rate limiting not working
- Verify Upstash credentials
- Check if Redis is accessible from server

### AI features not working
- Verify Gemini API key is valid
- Check API quota hasn't been exceeded

## Support

For issues with:
- **Supabase**: https://supabase.com/docs
- **Upstash**: https://docs.upstash.com/redis
- **Google AI**: https://ai.google.dev/docs
- **Vercel**: https://vercel.com/docs