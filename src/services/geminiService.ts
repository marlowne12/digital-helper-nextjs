import { ChatMessage, CaseStudy, BusinessAuditResult, SEOAnalysisResult } from "@/types";

// Secure service that calls backend API endpoints instead of exposing API keys
class GeminiService {
    private apiBase: string;

    constructor() {
        // Use relative URLs - works in both development and production (Next.js rewrites)
        this.apiBase = '/api';
    }

    async sendMessage(history: ChatMessage[], newMessage: string): Promise<string> {
        try {
            const response = await fetch(`${this.apiBase}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ history, message: newMessage }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            return data.text || "I apologize, but I'm having trouble processing that right now.";
        } catch (error) {
            console.error("Chat API Error:", error);
            return "System malfunction. Please try again later or contact us directly via email.";
        }
    }

    async generateEmailDraft(topic: string, name: string): Promise<string> {
        try {
            const response = await fetch(`${this.apiBase}/email-draft`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic, name }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            return data.text || "";
        } catch (e) {
            console.error(e);
            return "Could not generate draft.";
        }
    }

    async analyzeBusinessWithMaps(businessName: string, location: string): Promise<BusinessAuditResult> {
        try {
            const response = await fetch(`${this.apiBase}/business-analysis`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ businessName, location }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            return {
                analysis: data.analysis,
                mapLink: data.mapLink,
                mapTitle: data.mapTitle
            };
        } catch (e) {
            console.error("Business Analysis Error", e);
            return { analysis: "Could not connect to Maps data at this time." };
        }
    }

    async generateCaseStudyText(industry: string): Promise<Omit<CaseStudy, 'id' | 'imageUrl'>> {
        try {
            const response = await fetch(`${this.apiBase}/generate-case-study`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ industry }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            return {
                client: data.client,
                industry: data.industry,
                challenge: data.challenge,
                solution: data.solution,
                results: data.results
            };
        } catch (e) {
            console.error("Case Study Text Error", e);
            throw new Error("Failed to generate case study text");
        }
    }

    async generateCaseStudyImage(industry: string): Promise<string> {
        try {
            const response = await fetch(`${this.apiBase}/generate-case-study`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ industry }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            return data.imageUrl || `https://picsum.photos/800/600?random=${Date.now()}`;
        } catch (e) {
            console.error("Case Study Image Error", e);
            return `https://picsum.photos/800/600?random=${Date.now()}`;
        }
    }

    async analyzeSEO(url: string): Promise<SEOAnalysisResult> {
        try {
            const response = await fetch(`${this.apiBase}/seo-analysis`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (e) {
            console.error("SEO Analysis Error", e);
            throw new Error("Failed to analyze website SEO");
        }
    }
}

export const geminiService = new GeminiService();
