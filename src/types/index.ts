export interface ServiceItem {
    title: string;
    description: string;
    icon: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model' | 'system';
    text: string;
    timestamp: Date;
}

export enum SendingStatus {
    IDLE = 'IDLE',
    SENDING = 'SENDING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
}

export interface PortfolioItem {
    id: number;
    title: string;
    category: string;
    imageUrl: string;
}

export type ViewState = 'HOME' | 'SEO' | 'WEBDESIGN' | 'AI_AGENCY' | 'CASE_STUDIES' | 'PRICING' | 'FEATURES';

export interface CaseStudy {
    id: string;
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string[];
    imageUrl?: string;
    isAiGenerated?: boolean;
}

export interface BusinessAuditResult {
    analysis: string;
    mapLink?: string;
    mapTitle?: string;
    heroImage?: string;
}

export interface SEOIssue {
    category: string;
    severity: 'critical' | 'warning' | 'good';
    title: string;
    description: string;
    impact: string;
}

export interface SEOAnalysisResult {
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

export interface PricingTier {
    id: string;
    name: string;
    price: number;
    period: string;
    features: string[];
    cta: string;
    highlighted?: boolean;
}

export interface PricingData {
    tiers: PricingTier[];
    currency: string;
    disclaimer: string;
}
