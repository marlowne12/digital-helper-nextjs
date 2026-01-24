'use server';

import { GBPProfile } from '@/types/reputation';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export interface Lead extends GBPProfile {
    placeId: string;
    leadScore: number;
    tier: 'hot' | 'warm' | 'cold' | 'poor_fit';
    opportunities: string[];
    email?: string; // Scraped or inferred
    photoUrl?: string; // Google Places Photo
}

export async function findLeads(query: string, location: string): Promise<Lead[]> {
    if (!GOOGLE_PLACES_API_KEY) {
        throw new Error("Missing GOOGLE_PLACES_API_KEY");
    }

    try {
        const fullQuery = `${query} in ${location}`;
        const searchUrl = 'https://places.googleapis.com/v1/places:searchText';

        // Field Mask: Request necessary fields including photos and displayName
        const fieldMask = [
            'places.name',
            'places.displayName',
            'places.formattedAddress',
            'places.rating',
            'places.userRatingCount',
            'places.websiteUri',
            'places.types',
            'places.nationalPhoneNumber',
            'places.photos'
        ].join(',');

        const response = await fetch(searchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
                'X-Goog-FieldMask': fieldMask
            },
            body: JSON.stringify({
                textQuery: fullQuery,
                maxResultCount: 20
            })
        });

        const data = await response.json();

        if (!data.places) return [];

        // Score each lead
        const leads: Lead[] = (data.places as unknown[]).map((place: unknown) => {
            const p = place as {
                name?: string;
                photos?: { name: string }[];
                displayName?: { text: string };
                formattedAddress?: string;
                rating?: number;
                userRatingCount?: number;
                websiteUri?: string;
                nationalPhoneNumber?: string;
                types?: string[];
                editorialSummary?: { text: string };
            };
            // Construct Photo URL if available
            let photoUrl = undefined;
            if (p.photos && p.photos.length > 0) {
                const photoName = p.photos[0].name;
                photoUrl = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&maxWidthPx=400&key=${GOOGLE_PLACES_API_KEY}`;
            }

            const profile: GBPProfile = {
                name: p.displayName?.text || "Unknown Business",
                address: p.formattedAddress || "",
                rating: p.rating || 0,
                totalReviews: p.userRatingCount || 0,
                website: p.websiteUri,
                phone: p.nationalPhoneNumber,
                categories: p.types ? p.types.map((t: string) => t.replace(/_/g, ' ')) : [],
                isClaimed: true, // assumption
                reviews: [],
                description: "",
                photos: photoUrl ? [photoUrl] : [] // Store in generic photos too
            };

            const scoring = calculateLeadScore(profile);

            return {
                ...profile,
                placeId: p.name || "", // "places/ID"
                photoUrl,
                ...scoring
            };
        });

        // Sort by score (descending)
        return leads.sort((a, b) => b.leadScore - a.leadScore);

    } catch (error) {
        console.error("Lead Finder Error:", error);
        throw new Error("Failed to search for leads.");
    }
}

function calculateLeadScore(profile: GBPProfile) {
    let score = 0;
    const opportunities: string[] = [];

    // 1. Review Count (Opportunity: Low reviews)
    if (profile.totalReviews < 5) {
        score += 30;
        opportunities.push("Very low review count (< 5)");
    } else if (profile.totalReviews < 10) {
        score += 20;
        opportunities.push("Low review count (< 10)");
    } else if (profile.totalReviews < 20) {
        score += 10;
        opportunities.push("Below average review count");
    }

    // 2. Rating (Opportunity: Low rating)
    if (profile.rating > 0) {
        if (profile.rating < 3.0) {
            score += 30;
            opportunities.push("Critical: Low rating (< 3.0 stars)");
        } else if (profile.rating < 4.0) {
            score += 20;
            opportunities.push("Poor rating (< 4.0 stars)");
        } else if (profile.rating < 4.5) {
            score += 10;
            opportunities.push("Room for rating improvement");
        }
    } else {
        // No rating often means new or inactive
        score += 15;
        opportunities.push("No ratings found");
    }

    // 3. Website (Opportunity: Missing)
    if (!profile.website) {
        score += 40;
        opportunities.push("Missing Website");
    }

    // 4. Phone (Opportunity: Missing contact info is bad for them, good for selling 'setup' but harder to contact)
    // Here we treat missing phone as 'Incomplete Profile' opportunity
    if (!profile.phone) {
        score += 10;
        opportunities.push("Missing Phone Number");
    }

    // Normalize Score 0-100
    // Max possible: 30(rev) + 30(rate) + 40(web) + 10(phone) = 110. Cap at 100.
    score = Math.min(100, score);

    // Determine Tier
    let tier: 'hot' | 'warm' | 'cold' | 'poor_fit' = 'poor_fit';
    if (score >= 70) tier = 'hot';
    else if (score >= 50) tier = 'warm';
    else if (score >= 30) tier = 'cold';

    return { leadScore: score, tier, opportunities };
}
