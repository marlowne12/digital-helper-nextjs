/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from '@react-pdf/renderer'

// Brand colors
const colors = {
  primary: '#06b6d4', // cyan-500
  secondary: '#3b82f6', // blue-500
  accent: '#8b5cf6', // violet-500
  dark: '#0f172a', // slate-900
  text: '#334155', // slate-700
  muted: '#64748b', // slate-500
  light: '#f1f5f9', // slate-100
  success: '#10b981', // emerald-500
  warning: '#f59e0b', // amber-500
  white: '#ffffff',
}

// Shared styles
const baseStyles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: colors.white,
    fontFamily: 'Helvetica',
  },
  coverPage: {
    padding: 0,
    backgroundColor: colors.dark,
  },
  coverContent: {
    flex: 1,
    padding: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 15,
  },
  coverSubtitle: {
    fontSize: 18,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 40,
  },
  coverBadge: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 30,
  },
  coverBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  coverFooter: {
    position: 'absolute',
    bottom: 60,
    left: 60,
    right: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coverLogo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  coverUrl: {
    fontSize: 12,
    color: colors.muted,
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 11,
    color: colors.muted,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 15,
    marginTop: 25,
  },
  paragraph: {
    fontSize: 11,
    color: colors.text,
    lineHeight: 1.6,
    marginBottom: 12,
  },
  bulletList: {
    marginLeft: 15,
    marginBottom: 15,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    backgroundColor: colors.primary,
    borderRadius: 3,
    marginRight: 10,
    marginTop: 4,
  },
  bulletText: {
    flex: 1,
    fontSize: 11,
    color: colors.text,
    lineHeight: 1.5,
  },
  statBox: {
    backgroundColor: colors.light,
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 15,
  },
  statLabel: {
    flex: 1,
    fontSize: 12,
    color: colors.text,
  },
  tipBox: {
    backgroundColor: '#fef3c7',
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    padding: 15,
    marginVertical: 15,
    borderRadius: 4,
  },
  tipTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 5,
  },
  tipText: {
    fontSize: 10,
    color: '#78350f',
    lineHeight: 1.5,
  },
  ctaBox: {
    backgroundColor: colors.dark,
    padding: 25,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 11,
    color: colors.muted,
    marginBottom: 15,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 6,
  },
  ctaButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 9,
    color: colors.muted,
  },
  pageNumber: {
    fontSize: 9,
    color: colors.muted,
  },
  checklistItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
  },
  checklistText: {
    flex: 1,
  },
  checklistTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 3,
  },
  checklistDescription: {
    fontSize: 10,
    color: colors.muted,
    lineHeight: 1.4,
  },
  scoreCard: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  scoreCardLeft: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  scoreCardRight: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  scoreCardTitle: {
    fontSize: 10,
    color: colors.muted,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  scoreCardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  scoreCardLabel: {
    fontSize: 10,
    color: colors.text,
    marginTop: 3,
  },
})

// ==========================================
// THE 24/7 LEAD MACHINE GUIDE
// ==========================================
export function LeadMachineGuidePDF() {
  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={baseStyles.coverPage}>
        <View style={baseStyles.coverContent}>
          <View style={baseStyles.coverBadge}>
            <Text style={baseStyles.coverBadgeText}>Free Guide</Text>
          </View>
          <Text style={baseStyles.coverTitle}>The 24/7{'\n'}Lead Machine</Text>
          <Text style={baseStyles.coverSubtitle}>
            How AI Captures Leads While You Sleep
          </Text>
          <View style={baseStyles.coverFooter}>
            <Text style={baseStyles.coverLogo}>Digital Helper</Text>
            <Text style={baseStyles.coverUrl}>digital-helper.com</Text>
          </View>
        </View>
      </Page>

      {/* Page 1: The Problem */}
      <Page size="A4" style={baseStyles.page}>
        <View style={baseStyles.header}>
          <Text style={baseStyles.headerTitle}>The 3am Problem</Text>
          <Text style={baseStyles.headerSubtitle}>Why You're Losing Leads Every Night</Text>
        </View>

        <View style={baseStyles.statBox}>
          <Text style={baseStyles.statNumber}>78%</Text>
          <Text style={baseStyles.statLabel}>
            of customers choose the first business that responds to their inquiry
          </Text>
        </View>

        <Text style={baseStyles.paragraph}>
          Picture this: It's 3am. A homeowner's pipe just burst. They're panicking, searching for 
          a plumber on their phone. They find your business and fill out your contact form...
        </Text>

        <Text style={baseStyles.paragraph}>
          But you're asleep. You won't see that lead until morning. By then, they've already 
          called three other plumbers who answered their phone. You've lost a $500+ emergency job.
        </Text>

        <Text style={baseStyles.sectionTitle}>The Math Doesn't Lie</Text>

        <View style={baseStyles.bulletList}>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>Average response time for service businesses: 47 minutes</Text>
              {'\n'}That's during business hours. At night? Never.
            </Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>Lead decay rate: 10x</Text>
              {'\n'}Leads contacted within 5 minutes are 10x more likely to convert.
            </Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>After-hours leads: 40%+ of all inquiries</Text>
              {'\n'}Nearly half your leads come when you're not working.
            </Text>
          </View>
        </View>

        <View style={baseStyles.tipBox}>
          <Text style={baseStyles.tipTitle}>💡 Key Insight</Text>
          <Text style={baseStyles.tipText}>
            Your competitors aren't beating you with better service — they're beating you 
            with faster response times. The first to respond wins the job.
          </Text>
        </View>

        <View style={baseStyles.footer}>
          <Text style={baseStyles.footerText}>Digital Helper • digital-helper.com</Text>
          <Text style={baseStyles.pageNumber}>Page 1</Text>
        </View>
      </Page>

      {/* Page 2: The Solution */}
      <Page size="A4" style={baseStyles.page}>
        <View style={baseStyles.header}>
          <Text style={baseStyles.headerTitle}>The AI Advantage</Text>
          <Text style={baseStyles.headerSubtitle}>24/7 Response, Zero Extra Staff</Text>
        </View>

        <Text style={baseStyles.paragraph}>
          What if you could respond to every lead in 14 seconds — at 3am, on weekends, 
          on holidays? Not with a generic auto-reply, but with an intelligent conversation 
          that qualifies the lead and books the appointment?
        </Text>

        <Text style={baseStyles.sectionTitle}>How AI Lead Capture Works</Text>

        <View style={baseStyles.bulletList}>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>1. Instant Engagement</Text>
              {'\n'}AI chat widget engages visitors the moment they show buying intent.
            </Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>2. Smart Qualification</Text>
              {'\n'}Asks the right questions: service needed, location, urgency, budget signals.
            </Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>3. Appointment Booking</Text>
              {'\n'}Checks your calendar and books jobs automatically.
            </Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>4. Instant Notification</Text>
              {'\n'}You get a text alert with all lead details for high-priority jobs.
            </Text>
          </View>
        </View>

        <View style={baseStyles.statBox}>
          <Text style={baseStyles.statNumber}>14s</Text>
          <Text style={baseStyles.statLabel}>
            Average AI response time — vs. 47 minutes for businesses without AI
          </Text>
        </View>

        <Text style={baseStyles.sectionTitle}>Real Results: The $47K Case Study</Text>

        <Text style={baseStyles.paragraph}>
          Mike runs a 3-truck plumbing operation in Phoenix. Before AI, he was losing 
          60% of his after-hours leads. His team would call back in the morning, only 
          to hear "we already hired someone."
        </Text>

        <Text style={baseStyles.paragraph}>
          After implementing 24/7 AI lead capture:
        </Text>

        <View style={baseStyles.bulletList}>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>After-hours lead conversion: 12% → 68%</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>Average job value: $380</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>Additional monthly revenue: $3,900+</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>Annual impact: $47,000+ in captured leads</Text>
          </View>
        </View>

        <View style={baseStyles.footer}>
          <Text style={baseStyles.footerText}>Digital Helper • digital-helper.com</Text>
          <Text style={baseStyles.pageNumber}>Page 2</Text>
        </View>
      </Page>

      {/* Page 3: The Scripts */}
      <Page size="A4" style={baseStyles.page}>
        <View style={baseStyles.header}>
          <Text style={baseStyles.headerTitle}>The 3am Scripts</Text>
          <Text style={baseStyles.headerSubtitle}>Exact Messages That Convert Overnight Leads</Text>
        </View>

        <Text style={baseStyles.paragraph}>
          These aren't generic templates. These are the exact conversation flows that 
          convert panicked homeowners into booked appointments — automatically.
        </Text>

        <Text style={baseStyles.sectionTitle}>Script 1: Emergency Response</Text>
        <View style={{ backgroundColor: colors.light, padding: 15, borderRadius: 8, marginBottom: 15 }}>
          <Text style={{ fontSize: 10, color: colors.text, lineHeight: 1.6 }}>
            <Text style={{ fontWeight: 'bold' }}>AI:</Text> Hi! I see you have an emergency. 
            I'm the 24/7 assistant for [Business Name]. What's happening?{'\n\n'}
            <Text style={{ fontWeight: 'bold' }}>Customer:</Text> My kitchen is flooding!{'\n\n'}
            <Text style={{ fontWeight: 'bold' }}>AI:</Text> I'm sorry to hear that! Let me get 
            you help fast. Can you tell me your address? I'll check which of our technicians 
            is available for emergency dispatch.
          </Text>
        </View>

        <Text style={baseStyles.sectionTitle}>Script 2: Quote Request</Text>
        <View style={{ backgroundColor: colors.light, padding: 15, borderRadius: 8, marginBottom: 15 }}>
          <Text style={{ fontSize: 10, color: colors.text, lineHeight: 1.6 }}>
            <Text style={{ fontWeight: 'bold' }}>AI:</Text> Thanks for reaching out! I can 
            help you get a quote. What service are you looking for?{'\n\n'}
            <Text style={{ fontWeight: 'bold' }}>Customer:</Text> Need my AC checked before summer{'\n\n'}
            <Text style={{ fontWeight: 'bold' }}>AI:</Text> Smart thinking! Our AC tune-ups 
            typically run $89-129 and catch problems before they become expensive repairs. 
            What day works best for you? I have morning and afternoon slots available.
          </Text>
        </View>

        <Text style={baseStyles.sectionTitle}>Script 3: Competitor Comparison</Text>
        <View style={{ backgroundColor: colors.light, padding: 15, borderRadius: 8, marginBottom: 15 }}>
          <Text style={{ fontSize: 10, color: colors.text, lineHeight: 1.6 }}>
            <Text style={{ fontWeight: 'bold' }}>Customer:</Text> I'm getting quotes from a 
            few different companies{'\n\n'}
            <Text style={{ fontWeight: 'bold' }}>AI:</Text> That's a great approach! While 
            you compare, here's what sets us apart: 5-star rating with 127 reviews, 
            same-day service, and a 100% satisfaction guarantee. Would you like to 
            schedule a free in-home estimate?
          </Text>
        </View>

        <View style={baseStyles.tipBox}>
          <Text style={baseStyles.tipTitle}>💡 Pro Tip</Text>
          <Text style={baseStyles.tipText}>
            Notice how the AI never says "someone will call you back." Every response 
            moves toward booking or qualifying — there's no dead-end.
          </Text>
        </View>

        <View style={baseStyles.footer}>
          <Text style={baseStyles.footerText}>Digital Helper • digital-helper.com</Text>
          <Text style={baseStyles.pageNumber}>Page 3</Text>
        </View>
      </Page>

      {/* Page 4: Getting Started */}
      <Page size="A4" style={baseStyles.page}>
        <View style={baseStyles.header}>
          <Text style={baseStyles.headerTitle}>30-Minute Setup</Text>
          <Text style={baseStyles.headerSubtitle}>From Zero to 24/7 Lead Capture</Text>
        </View>

        <Text style={baseStyles.paragraph}>
          You don't need to be technical. You don't need to hire staff. Here's exactly 
          how to get your AI lead machine running this week:
        </Text>

        <Text style={baseStyles.sectionTitle}>Step 1: Gather Your Info (5 min)</Text>
        <View style={baseStyles.bulletList}>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>List of services you offer</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>Your service area (cities/zip codes)</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>Typical pricing ranges</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>Calendar/booking system access</Text>
          </View>
        </View>

        <Text style={baseStyles.sectionTitle}>Step 2: Configure Your AI (15 min)</Text>
        <View style={baseStyles.bulletList}>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>Set your business hours and emergency protocols</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>Customize conversation scripts with your pricing</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>Connect your calendar for auto-booking</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>Set up text notifications for hot leads</Text>
          </View>
        </View>

        <Text style={baseStyles.sectionTitle}>Step 3: Go Live (10 min)</Text>
        <View style={baseStyles.bulletList}>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>Add chat widget to your website (one line of code)</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>Test with a few sample conversations</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>You're live — AI is now capturing leads 24/7</Text>
          </View>
        </View>

        <View style={baseStyles.ctaBox}>
          <Text style={baseStyles.ctaTitle}>Ready to Stop Losing Leads?</Text>
          <Text style={baseStyles.ctaText}>
            We'll set up your entire 24/7 lead capture system — you just approve.
          </Text>
          <Link src="https://digital-helper.com/contact?utm_source=guide&utm_medium=pdf">
            <View style={baseStyles.ctaButton}>
              <Text style={baseStyles.ctaButtonText}>Book Free Strategy Call →</Text>
            </View>
          </Link>
        </View>

        <View style={baseStyles.footer}>
          <Text style={baseStyles.footerText}>Digital Helper • digital-helper.com • (509) 876-8454</Text>
          <Text style={baseStyles.pageNumber}>Page 4</Text>
        </View>
      </Page>
    </Document>
  )
}

// ==========================================
// AI READINESS CHECKLIST
// ==========================================
export function AIReadinessChecklistPDF() {
  const checklistItems = [
    {
      title: 'Website with contact form',
      description: 'You have a website where customers can reach out (even a basic one counts).',
    },
    {
      title: 'Google Business Profile claimed',
      description: 'Your GBP is verified and you can respond to messages.',
    },
    {
      title: 'Defined service area',
      description: 'You know exactly which cities/zip codes you serve.',
    },
    {
      title: 'Service menu with pricing',
      description: 'You can provide at least ballpark pricing for common jobs.',
    },
    {
      title: 'Scheduling system',
      description: 'You have a calendar (even Google Calendar works) for booking.',
    },
    {
      title: 'Response time issues',
      description: 'You know you\'re losing leads to slow response times.',
    },
    {
      title: 'After-hours inquiries',
      description: 'You get leads outside business hours that go unanswered.',
    },
    {
      title: 'Repetitive questions',
      description: 'You answer the same questions (pricing, availability) repeatedly.',
    },
  ]

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={baseStyles.coverPage}>
        <View style={baseStyles.coverContent}>
          <View style={baseStyles.coverBadge}>
            <Text style={baseStyles.coverBadgeText}>Free Checklist</Text>
          </View>
          <Text style={baseStyles.coverTitle}>AI Readiness{'\n'}Checklist</Text>
          <Text style={baseStyles.coverSubtitle}>
            Is Your Business Ready for 24/7 AI?
          </Text>
          <View style={baseStyles.coverFooter}>
            <Text style={baseStyles.coverLogo}>Digital Helper</Text>
            <Text style={baseStyles.coverUrl}>digital-helper.com</Text>
          </View>
        </View>
      </Page>

      {/* Checklist Page */}
      <Page size="A4" style={baseStyles.page}>
        <View style={baseStyles.header}>
          <Text style={baseStyles.headerTitle}>Your 8-Point Checklist</Text>
          <Text style={baseStyles.headerSubtitle}>Check each item that applies to your business</Text>
        </View>

        <Text style={baseStyles.paragraph}>
          If you can check 5 or more boxes, you're ready for AI lead capture. 
          Less than 5? We can still help — but some prep work may be needed first.
        </Text>

        {checklistItems.map((item, index) => (
          <View key={index} style={baseStyles.checklistItem}>
            <View style={baseStyles.checkbox} />
            <View style={baseStyles.checklistText}>
              <Text style={baseStyles.checklistTitle}>{item.title}</Text>
              <Text style={baseStyles.checklistDescription}>{item.description}</Text>
            </View>
          </View>
        ))}

        <View style={baseStyles.tipBox}>
          <Text style={baseStyles.tipTitle}>💡 Your Score</Text>
          <Text style={baseStyles.tipText}>
            6-8 checks: You're an ideal fit for AI — you'll see results fast.{'\n'}
            4-5 checks: Good foundation — minor tweaks needed.{'\n'}
            0-3 checks: Let's build your foundation first.
          </Text>
        </View>

        <View style={baseStyles.ctaBox}>
          <Text style={baseStyles.ctaTitle}>Get Your Personalized AI Plan</Text>
          <Text style={baseStyles.ctaText}>
            Book a free 15-minute call and we'll review your checklist together.
          </Text>
          <Link src="https://digital-helper.com/contact?utm_source=checklist&utm_medium=pdf">
            <View style={baseStyles.ctaButton}>
              <Text style={baseStyles.ctaButtonText}>Book Free Call →</Text>
            </View>
          </Link>
        </View>

        <View style={baseStyles.footer}>
          <Text style={baseStyles.footerText}>Digital Helper • digital-helper.com • (509) 876-8454</Text>
          <Text style={baseStyles.pageNumber}>Page 1</Text>
        </View>
      </Page>
    </Document>
  )
}

// ==========================================
// RESPONSE TIME AUDIT
// ==========================================
export function ResponseTimeAuditPDF() {
  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={baseStyles.coverPage}>
        <View style={baseStyles.coverContent}>
          <View style={baseStyles.coverBadge}>
            <Text style={baseStyles.coverBadgeText}>Free Audit</Text>
          </View>
          <Text style={baseStyles.coverTitle}>Response Time{'\n'}Audit</Text>
          <Text style={baseStyles.coverSubtitle}>
            How Fast Are You Losing Leads?
          </Text>
          <View style={baseStyles.coverFooter}>
            <Text style={baseStyles.coverLogo}>Digital Helper</Text>
            <Text style={baseStyles.coverUrl}>digital-helper.com</Text>
          </View>
        </View>
      </Page>

      {/* Audit Page 1 */}
      <Page size="A4" style={baseStyles.page}>
        <View style={baseStyles.header}>
          <Text style={baseStyles.headerTitle}>The Response Time Calculator</Text>
          <Text style={baseStyles.headerSubtitle}>Calculate Your Lead Loss</Text>
        </View>

        <Text style={baseStyles.paragraph}>
          Use this worksheet to calculate exactly how much revenue you're losing 
          to slow response times. Fill in your numbers in the boxes.
        </Text>

        <Text style={baseStyles.sectionTitle}>Section 1: Your Current Numbers</Text>

        <View style={baseStyles.scoreCard}>
          <View style={baseStyles.scoreCardLeft}>
            <Text style={baseStyles.scoreCardTitle}>Monthly Leads</Text>
            <Text style={baseStyles.scoreCardValue}>____</Text>
            <Text style={baseStyles.scoreCardLabel}>Total inquiries per month</Text>
          </View>
          <View style={baseStyles.scoreCardRight}>
            <Text style={baseStyles.scoreCardTitle}>Average Response Time</Text>
            <Text style={baseStyles.scoreCardValue}>____</Text>
            <Text style={baseStyles.scoreCardLabel}>Hours to first response</Text>
          </View>
        </View>

        <View style={baseStyles.scoreCard}>
          <View style={baseStyles.scoreCardLeft}>
            <Text style={baseStyles.scoreCardTitle}>Current Close Rate</Text>
            <Text style={baseStyles.scoreCardValue}>____%</Text>
            <Text style={baseStyles.scoreCardLabel}>Leads that become jobs</Text>
          </View>
          <View style={baseStyles.scoreCardRight}>
            <Text style={baseStyles.scoreCardTitle}>Average Job Value</Text>
            <Text style={baseStyles.scoreCardValue}>$____</Text>
            <Text style={baseStyles.scoreCardLabel}>Revenue per job</Text>
          </View>
        </View>

        <Text style={baseStyles.sectionTitle}>Section 2: The Speed Impact</Text>

        <Text style={baseStyles.paragraph}>
          Research shows response time directly impacts conversion rates:
        </Text>

        <View style={{ marginVertical: 15 }}>
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            <View style={{ flex: 1, padding: 10, backgroundColor: '#10b981' }}>
              <Text style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}>Under 5 min</Text>
            </View>
            <View style={{ flex: 2, padding: 10, backgroundColor: colors.light }}>
              <Text style={{ fontSize: 11 }}>100% conversion potential (baseline)</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            <View style={{ flex: 1, padding: 10, backgroundColor: '#84cc16' }}>
              <Text style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}>5-30 min</Text>
            </View>
            <View style={{ flex: 2, padding: 10, backgroundColor: colors.light }}>
              <Text style={{ fontSize: 11 }}>80% of baseline conversion</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            <View style={{ flex: 1, padding: 10, backgroundColor: '#f59e0b' }}>
              <Text style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}>30-60 min</Text>
            </View>
            <View style={{ flex: 2, padding: 10, backgroundColor: colors.light }}>
              <Text style={{ fontSize: 11 }}>50% of baseline conversion</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            <View style={{ flex: 1, padding: 10, backgroundColor: '#ef4444' }}>
              <Text style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}>1+ hours</Text>
            </View>
            <View style={{ flex: 2, padding: 10, backgroundColor: colors.light }}>
              <Text style={{ fontSize: 11 }}>21% of baseline (you've lost 79%)</Text>
            </View>
          </View>
        </View>

        <View style={baseStyles.tipBox}>
          <Text style={baseStyles.tipTitle}>📊 Your Calculation</Text>
          <Text style={baseStyles.tipText}>
            If you respond in 2+ hours, you're converting at ~21% efficiency.{'\n'}
            That means: (Monthly Leads) × 0.79 × (Avg Job Value) = Monthly Loss{'\n\n'}
            Example: 50 leads × 0.79 × $350 = $13,825/month in lost revenue
          </Text>
        </View>

        <View style={baseStyles.footer}>
          <Text style={baseStyles.footerText}>Digital Helper • digital-helper.com</Text>
          <Text style={baseStyles.pageNumber}>Page 1</Text>
        </View>
      </Page>

      {/* Audit Page 2 */}
      <Page size="A4" style={baseStyles.page}>
        <View style={baseStyles.header}>
          <Text style={baseStyles.headerTitle}>Your Recovery Plan</Text>
          <Text style={baseStyles.headerSubtitle}>Steps to Capture Lost Revenue</Text>
        </View>

        <Text style={baseStyles.sectionTitle}>The AI Solution Impact</Text>

        <Text style={baseStyles.paragraph}>
          With AI responding in under 14 seconds, you recover 79%+ of currently lost leads.
        </Text>

        <View style={baseStyles.scoreCard}>
          <View style={baseStyles.scoreCardLeft}>
            <Text style={baseStyles.scoreCardTitle}>Current Conversion</Text>
            <Text style={baseStyles.scoreCardValue}>21%</Text>
            <Text style={baseStyles.scoreCardLabel}>With 1+ hour response</Text>
          </View>
          <View style={baseStyles.scoreCardRight}>
            <Text style={baseStyles.scoreCardTitle}>AI-Assisted</Text>
            <Text style={baseStyles.scoreCardValue}>100%</Text>
            <Text style={baseStyles.scoreCardLabel}>With 14-second response</Text>
          </View>
        </View>

        <Text style={baseStyles.sectionTitle}>Your 90-Day Recovery Timeline</Text>

        <View style={baseStyles.bulletList}>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>Days 1-7:</Text> AI setup and training on your business
            </Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>Days 8-30:</Text> Go live, monitor, optimize conversation flows
            </Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>Days 31-60:</Text> See 40-60% improvement in lead capture
            </Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <View style={baseStyles.bullet} />
            <Text style={baseStyles.bulletText}>
              <Text style={{ fontWeight: 'bold' }}>Days 61-90:</Text> Full optimization, 70%+ improvement typical
            </Text>
          </View>
        </View>

        <Text style={baseStyles.sectionTitle}>Your Numbers (Fill In)</Text>

        <View style={{ backgroundColor: colors.light, padding: 20, borderRadius: 8, marginBottom: 20 }}>
          <Text style={{ fontSize: 11, marginBottom: 10 }}>
            Current monthly revenue lost: $__________
          </Text>
          <Text style={{ fontSize: 11, marginBottom: 10 }}>
            70% recovery = $__________ additional monthly revenue
          </Text>
          <Text style={{ fontSize: 11, marginBottom: 10 }}>
            Annual impact = $__________ (monthly × 12)
          </Text>
        </View>

        <View style={baseStyles.ctaBox}>
          <Text style={baseStyles.ctaTitle}>Get Your Custom Audit</Text>
          <Text style={baseStyles.ctaText}>
            We'll analyze your actual response times and show you exactly what you're losing.
          </Text>
          <Link src="https://digital-helper.com/contact?utm_source=audit&utm_medium=pdf">
            <View style={baseStyles.ctaButton}>
              <Text style={baseStyles.ctaButtonText}>Request Free Audit →</Text>
            </View>
          </Link>
        </View>

        <View style={baseStyles.footer}>
          <Text style={baseStyles.footerText}>Digital Helper • digital-helper.com • (509) 876-8454</Text>
          <Text style={baseStyles.pageNumber}>Page 2</Text>
        </View>
      </Page>
    </Document>
  )
}

// Export mapping for dynamic generation
export const LEAD_MAGNET_PDFS = {
  guide: LeadMachineGuidePDF,
  checklist: AIReadinessChecklistPDF,
  audit: ResponseTimeAuditPDF,
}

export type LeadMagnetType = keyof typeof LEAD_MAGNET_PDFS
