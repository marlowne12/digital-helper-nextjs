/**
 * Analytics helper functions for tracking user events
 *
 * This module provides a unified interface for tracking analytics events.
 * It integrates with Vercel Analytics and can be extended for other providers.
 */

// Event types for type safety
export type AnalyticsEvent =
    | 'page_view'
    | 'lead_captured'
    | 'audit_started'
    | 'audit_completed'
    | 'chat_opened'
    | 'chat_message_sent'
    | 'contact_form_submitted'
    | 'cta_clicked'
    | 'service_page_viewed'
    | 'blog_post_viewed'
    | 'exit_intent_shown'
    | 'exit_intent_converted'
    | 'proposal_generated'
    | 'report_exported';

interface EventProperties {
    [key: string]: string | number | boolean | undefined;
}

/**
 * Track a custom event
 * Integrates with Vercel Analytics when available
 */
export function trackEvent(event: AnalyticsEvent, properties?: EventProperties): void {
    // Vercel Analytics tracking
    if (typeof window !== 'undefined' && 'va' in window) {
        (window as { va: (cmd: string, eventName: string, props?: EventProperties) => void }).va('event', event, properties);
    }

    // Console logging in development
    if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics]', event, properties);
    }
}

/**
 * Track lead capture events
 */
export function trackLeadCapture(source: string, email?: string): void {
    trackEvent('lead_captured', {
        source,
        has_email: !!email,
        timestamp: new Date().toISOString(),
    });
}

/**
 * Track audit events
 */
export function trackAudit(action: 'started' | 'completed', businessName?: string): void {
    trackEvent(action === 'started' ? 'audit_started' : 'audit_completed', {
        business_name: businessName,
        timestamp: new Date().toISOString(),
    });
}

/**
 * Track CTA clicks
 */
export function trackCTAClick(ctaName: string, location: string): void {
    trackEvent('cta_clicked', {
        cta_name: ctaName,
        location,
        timestamp: new Date().toISOString(),
    });
}

/**
 * Track form submissions
 */
export function trackFormSubmission(formName: string, success: boolean): void {
    trackEvent('contact_form_submitted', {
        form_name: formName,
        success,
        timestamp: new Date().toISOString(),
    });
}

/**
 * Track chat interactions
 */
export function trackChatInteraction(action: 'opened' | 'message_sent', messageCount?: number): void {
    trackEvent(action === 'opened' ? 'chat_opened' : 'chat_message_sent', {
        message_count: messageCount,
        timestamp: new Date().toISOString(),
    });
}

/**
 * Track exit intent popup
 */
export function trackExitIntent(action: 'shown' | 'converted'): void {
    trackEvent(action === 'shown' ? 'exit_intent_shown' : 'exit_intent_converted', {
        timestamp: new Date().toISOString(),
    });
}

/**
 * Track service page views with service name
 */
export function trackServicePageView(serviceName: string): void {
    trackEvent('service_page_viewed', {
        service_name: serviceName,
        timestamp: new Date().toISOString(),
    });
}

/**
 * Track blog post views
 */
export function trackBlogPostView(slug: string, category: string): void {
    trackEvent('blog_post_viewed', {
        slug,
        category,
        timestamp: new Date().toISOString(),
    });
}

/**
 * Track proposal generation
 */
export function trackProposalGeneration(businessName: string): void {
    trackEvent('proposal_generated', {
        business_name: businessName,
        timestamp: new Date().toISOString(),
    });
}

/**
 * Track report exports
 */
export function trackReportExport(format: 'pdf' | 'email', businessName?: string): void {
    trackEvent('report_exported', {
        format,
        business_name: businessName,
        timestamp: new Date().toISOString(),
    });
}
