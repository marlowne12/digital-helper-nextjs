// --- Quick Preview (always returned) ---

export interface QuickPreview {
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  score: number; // 0-100
  topIssue: string;
  issueCount: number;
}

// --- Full Audit Results (returned only when email is provided) ---

export interface AuditIssue {
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'good';
  impact: string;
}

export interface CategoryScore {
  score: number; // 0-100
  status: 'good' | 'needs-work' | 'critical';
  issues: AuditIssue[];
}

export interface AuditFullResult {
  url: string;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  score: number;
  summary: string;
  categories: {
    performance: CategoryScore;
    seo: CategoryScore;
    mobile: CategoryScore;
    security: CategoryScore;
  };
  quickWins: string[];
  totalIssues: number;
}

// --- API Request/Response ---

export interface AuditRequest {
  url: string;
  email?: string;
}

export interface AuditResponse {
  url: string;
  quickPreview: QuickPreview;
  fullResults?: AuditFullResult;
}

export interface AuditErrorResponse {
  error: string;
  details?: string;
}

// --- Component State ---

export type AuditStep = 'input' | 'loading' | 'results';

export interface AuditState {
  step: AuditStep;
  url: string;
  email: string;
  quickPreview: QuickPreview | null;
  fullResults: AuditFullResult | null;
  error: string | null;
  isLoading: boolean;
}
