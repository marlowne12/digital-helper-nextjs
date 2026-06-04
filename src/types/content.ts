/**
 * Types for AI-Powered Content Generation System
 */

export type ContentType = 'blog' | 'service' | 'location';

export type ContentStatus = 'draft' | 'reviewing' | 'selected' | 'exported';

export type VariantStyle = 'seo-focused' | 'story-driven' | 'problem-solution';

export type ContentTone = 'professional' | 'casual' | 'urgent';

export interface ContentVariant {
  id: string;
  contentItemId: string;
  variantNumber: 1 | 2 | 3;
  title: string;
  slug: string;
  content: string; // Markdown content
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  readingTime: string;
  variantStyle: VariantStyle;
  wordCount: number;
  seoScore: number; // 0-100
  createdAt: Date;
  isSelected: boolean;
}

export interface ContentItem {
  id: string;
  type: ContentType;
  slug: string;
  title: string;
  status: ContentStatus;
  variants: ContentVariant[];
  selectedVariantId?: string;
  metadata: {
    keywords: string[];
    location?: string;
    targetAudience?: string;
    tone?: ContentTone;
    targetLength?: number;
  };
  createdAt: Date;
  updatedAt: Date;
  exportedAt?: Date;
  exportPath?: string;
}

export interface ContentRequest {
  type: ContentType;
  topic: string;
  keywords: string[];
  location?: string;
  targetAudience?: string;
  tone?: ContentTone;
  targetLength?: number;
  additionalContext?: string;
}

export interface ExportResult {
  success: boolean;
  path: string;
  gitCommit?: string;
  error?: string;
}

export interface GeneratedContent {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  readingTime: string;
  wordCount: number;
  seoScore: number;
}

// For service page generation
export interface ServicePageContent {
  title: string;
  slug: string;
  heroTitle: string;
  heroDescription: string;
  painPoints: string[];
  deliverables: string[];
  benefits: string[];
  pricing: {
    tier: string;
    price: string;
    features: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  metaTitle: string;
  metaDescription: string;
  content?: string; // Full markdown content for the page
}

// For location page generation
export interface LocationPageContent {
  title: string;
  slug: string;
  city: string;
  state: string;
  heroTitle: string;
  heroDescription: string;
  services: string[];
  testimonials: {
    text: string;
    author: string;
    business: string;
  }[];
  localSEO: {
    primaryKeyword: string;
    secondaryKeywords: string[];
  };
  metaTitle: string;
  metaDescription: string;
  content?: string; // Full markdown content for the page
}
