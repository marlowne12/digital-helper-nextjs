# 📧 Email Setup Guide - Resend Integration

## ✅ What's Been Implemented

1. **Email API Route**: `/api/send-audit-email`
2. **Beautiful HTML Email Template**: Grade badge, category breakdown, quick wins, detailed issues
3. **WebsiteAudit Integration**: Automatically sends email after user submits
4. **From Email**: `business@digital-helper.com`

---

## 🚀 Quick Setup (5 minutes)

### **Step 1: Sign Up for Resend (FREE)**

1. Go to: **https://resend.com/signup**
2. Sign up with your email
3. Verify your email address

**Free Tier Includes:**
- ✅ 100 emails/day
- ✅ 3,000 emails/month
- ✅ Perfect for getting started!

---

### **Step 2: Get Your API Key**

1. Once logged in, go to: **https://resend.com/api-keys**
2. Click **"Create API Key"**
3. Name it: `digital-helper-production`
4. Click **"Create"**
5. **COPY THE API KEY** (starts with `re_...`)

⚠️ **Important:** Save this key somewhere safe! You can only see it once.

---

### **Step 3: Add Domain (Required)**

Resend requires domain verification to send from `business@digital-helper.com`:

1. Go to: **https://resend.com/domains**
2. Click **"Add Domain"**
3. Enter: `digital-helper.com`
4. Add the DNS records Resend provides to your domain registrar:
   - **SPF Record** (TXT)
   - **DKIM Record** (TXT)
   - **DMARC Record** (TXT - optional but recommended)

**DNS Propagation:** Takes 5-30 minutes (sometimes up to 24 hours)

**Temporary Testing (No Domain Yet):**
- Use `onboarding@resend.dev` as the `from` address
- Emails will only send to YOUR verified email
- Change to `business@digital-helper.com` after domain verification

---

### **Step 4: Add API Key to Your Project**

1. Open your `.env.local` file
2. Add this line:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```
3. Save the file

**Example `.env.local`:**
```env
GEMINI_API_KEY=your_gemini_key_here
RESEND_API_KEY=re_1234567890abcdef...
```

---

### **Step 5: Update Vercel Environment Variables**

If deploying to Vercel:

1. Go to: **https://vercel.com/dashboard**
2. Select your project
3. Go to: **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_your_api_key_here`
   - **Environment**: Production, Preview, Development (all)
5. Click **"Save"**
6. **Redeploy** your site for changes to take effect

---

## 🧪 Testing the Email System

### **Test 1: Local Testing**

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000`

3. Use the Website Audit tool:
   - Enter a URL (e.g., `https://google.com`)
   - Wait for results to load
   - When email gate appears, enter your email
   - Check console for: `✅ Email sent successfully`

4. Check your inbox!

---

### **Test 2: Verify Email Content**

Your email should include:
- ✅ Grade badge (colored circle with A-F grade)
- ✅ Overall score (0-100)
- ✅ Summary paragraph
- ✅ 4 category scores (Performance, SEO, Mobile, Security)
- ✅ Quick wins list with checkmarks
- ✅ Detailed issues breakdown by category
- ✅ CTA button to schedule consultation
- ✅ Professional footer with Digital Helper branding

---

## 📋 Email Template Customization

### **Change Email Content**

Edit: `src/app/api/send-audit-email/route.ts`

**1. Update Subject Line:**
```typescript
subject: `Your Website Audit Results - Grade ${auditResults.grade} (${auditResults.score}/100)`,
```

**2. Change From Name:**
```typescript
from: 'Digital Helper <business@digital-helper.com>',
// Or: 'John from Digital Helper <business@digital-helper.com>'
```

**3. Add CC/BCC:**
```typescript
cc: ['team@digital-helper.com'],
bcc: ['archive@digital-helper.com'],
```

**4. Modify HTML Template:**
Search for `function generateAuditEmailHtml` and edit the HTML.

---

## 🎨 Email Design

The email template uses:
- **Responsive design** (works on mobile + desktop)
- **Dark theme** (matches your website)
- **Gradient backgrounds** (professional look)
- **Color-coded grades** (Green A/B, Yellow C, Red D/F)
- **Clear CTA button** (Schedule Free Consultation)

**Preview Example:**

```
┌─────────────────────────────────────┐
│      Digital Helper                 │
│                                     │
│         [Grade Circle: C]           │
│      Website Audit Complete         │
│       example.com                   │
│         65/100                      │
│                                     │
│  Summary: The website demonstrates  │
│  average performance...             │
│                                     │
│  Category Breakdown:                │
│  [Performance: 75] [SEO: 50]       │
│  [Mobile: 40] [Security: 95]       │
│                                     │
│  🎯 Quick Wins                      │
│  ✓ Add viewport meta tag            │
│  ✓ Implement H1 heading             │
│  ✓ Add canonical URL                │
│                                     │
│  🔍 Detailed Issues (12 total)      │
│  ... (full breakdown by category)   │
│                                     │
│  [Schedule Free Consultation]       │
└─────────────────────────────────────┘
```

---

## 🔧 Troubleshooting

### **Email Not Sending**

1. **Check API Key:**
   ```bash
   # In terminal
   echo $RESEND_API_KEY  # Should show: re_...
   ```

2. **Check Console Logs:**
   - Look for: `✅ Email sent successfully`
   - Or error: `❌ Email sending failed:`

3. **Verify Domain:**
   - Go to: https://resend.com/domains
   - Status should be: ✅ **Verified**
   - If pending, wait for DNS propagation

4. **Check Resend Dashboard:**
   - https://resend.com/emails
   - See all sent emails + delivery status

---

### **Emails Going to Spam**

1. **Warm Up Your Domain:**
   - Send to friends/colleagues first
   - Ask them to mark as "Not Spam"
   - Gradually increase volume

2. **Check DNS Records:**
   - Ensure SPF, DKIM, DMARC are set up
   - Use: https://mxtoolbox.com to verify

3. **Improve Email Content:**
   - Avoid spam trigger words
   - Include unsubscribe link (if bulk sending)
   - Use real reply-to address

---

### **Rate Limiting**

**Free Tier Limits:**
- 100 emails/day
- 3,000 emails/month

**Solutions:**
1. **Upgrade to Pro:** $20/month for 50,000 emails
2. **Use different service:** SendGrid, AWS SES
3. **Queue emails:** Store in database, send later

---

## 📈 Monitoring Email Delivery

### **Resend Dashboard**

View all emails sent:
- **Delivered**: Email reached inbox
- **Bounced**: Email address invalid
- **Complained**: Marked as spam
- **Opened**: Recipient opened email (Pro plan)
- **Clicked**: Clicked CTA button (Pro plan)

**Access:** https://resend.com/emails

---

## 🔐 Security Best Practices

1. **Never commit `.env.local`** (already in `.gitignore`)
2. **Rotate API keys** every 90 days
3. **Use separate keys** for dev/staging/production
4. **Monitor usage** to detect abuse
5. **Rate limit** the API endpoint (add middleware)

---

## 💰 Cost Calculator

**Free Tier (Current):**
- 100 emails/day × 30 days = 3,000 emails/month
- Cost: **$0/month**

**Pro Plan ($20/month):**
- 50,000 emails/month
- Advanced analytics
- Priority support

**Volume Estimate:**
- 10 audits/day = 300 emails/month ✅ FREE
- 50 audits/day = 1,500 emails/month ✅ FREE
- 200 audits/day = 6,000 emails/month → Need Pro

---

## 🚀 Next Steps

### **Immediate (Required):**
- [ ] Sign up for Resend
- [ ] Get API key
- [ ] Add to `.env.local`
- [ ] Test email sending

### **Within 24 Hours:**
- [ ] Verify domain (digital-helper.com)
- [ ] Add DNS records
- [ ] Update Vercel env vars
- [ ] Test on production

### **Optional Enhancements:**
- [ ] Add email open tracking
- [ ] Send follow-up emails (drip campaign)
- [ ] Store emails in database
- [ ] Add unsubscribe link
- [ ] A/B test email templates

---

## 📞 Support

**Resend Documentation:**
- https://resend.com/docs

**Resend Support:**
- Email: support@resend.com
- Discord: https://resend.com/discord

**Need Help?**
If emails aren't sending, check:
1. Console logs for errors
2. Resend dashboard for delivery status
3. `.env.local` has correct API key

---

## ✅ You're All Set!

Once you complete Steps 1-5 above, your Website Audit Tool will:
1. Collect user email ✅
2. Send beautiful HTML email ✅
3. Include complete audit report ✅
4. CTA to schedule consultation ✅

**Total Setup Time: ~5 minutes** (+ DNS propagation time)

Happy emailing! 📧
