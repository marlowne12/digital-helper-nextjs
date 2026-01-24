export interface Review {
    id: string;
    author: string;
    rating: number;
    // Relative time string like "2 weeks ago"
    time: string;
    text: string;
    response?: string;
}

export interface GBPProfile {
    name: string;
    address: string;
    rating: number;
    totalReviews: number;
    website?: string;
    phone?: string;
    categories: string[];
    description?: string;
    isClaimed: boolean;
    reviews: Review[]; // specific field for a list of reviews
    photos?: string[];
}

export interface Recommendation {
    id: string;
    type: 'reply_review' | 'optimize_description' | 'add_photos' | 'keyword_gap' | 'general';
    title: string;
    description: string;
    impact: 'High' | 'Medium' | 'Low';
    status: 'pending' | 'completed';
    // Context data needed to execute the fix (e.g., review ID)
    context?: Record<string, unknown>;
}

export interface SwotAnalysis {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
}

export interface WebsiteAnalysis {
    title: string;
    metaDescription: string;
    h1: string;
    isMobileFriendly: boolean;
    loadTime: string;
    ssl: boolean;
    socials: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
        twitter?: string;
    };
    email?: string;
    issues: string[];
}

export interface AuditResult {
    score: number; // 0-100
    summary: string;
    swot: SwotAnalysis;
    recommendations: Recommendation[];
    websiteAnalysis?: WebsiteAnalysis;
}
