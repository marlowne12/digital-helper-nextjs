import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import * as cheerio from 'cheerio';
import type { EnrichedLead, LeadScraperFilters, SocialMediaLinks } from '@/types/reputation';
import { leadScraperSchema } from '@/lib/validators';
import { withRateLimit } from '@/lib/api-middleware';
import { rateLimits } from '@/lib/rate-limit';

const GOOGLE_PLACES_SEARCH_URL = 'https://places.googleapis.com/v1/places:searchText';
const REQUEST_TIMEOUT = 10000; // 10 seconds per scrape

// Contact info scraping function
async function scrapeContactInfo(website: string): Promise<{ email?: string; socialMedia?: SocialMediaLinks }> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        const response = await fetch(website, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            return {};
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Extract email from mailto links
        let email = $('a[href^="mailto:"]').first().attr('href')?.replace('mailto:', '').trim();

        // Also try to find email in text content
        if (!email) {
            const emailRegex = /[\w.-]+@[\w.-]+\.\w{2,}/g;
            const bodyText = $('body').text();
            const matches = bodyText.match(emailRegex);
            if (matches) {
                // Filter out common non-contact emails
                const validEmails = matches.filter((e) =>
                    !e.includes('@example.') &&
                    !e.includes('@yourdomain.') &&
                    !e.includes('.png') &&
                    !e.includes('.jpg') &&
                    !e.includes('.svg')
                );
                if (validEmails.length > 0) {
                    email = validEmails[0];
                }
            }
        }

        // Extract social media links
        const socialMedia: SocialMediaLinks = {};

        const facebookLink = $('a[href*="facebook.com"]').not('[href*="facebook.com/sharer"]').not('[href*="facebook.com/plugins"]').first();
        if (facebookLink.length) {
            socialMedia.facebook = facebookLink.attr('href');
        }

        const instagramLink = $('a[href*="instagram.com"]').first();
        if (instagramLink.length) {
            socialMedia.instagram = instagramLink.attr('href');
        }

        const twitterLink = $('a[href*="twitter.com"], a[href*="x.com"]').first();
        if (twitterLink.length) {
            socialMedia.twitter = twitterLink.attr('href');
        }

        const linkedinLink = $('a[href*="linkedin.com"]').first();
        if (linkedinLink.length) {
            socialMedia.linkedin = linkedinLink.attr('href');
        }

        const youtubeLink = $('a[href*="youtube.com"], a[href*="youtu.be"]').first();
        if (youtubeLink.length) {
            socialMedia.youtube = youtubeLink.attr('href');
        }

        const tiktokLink = $('a[href*="tiktok.com"]').first();
        if (tiktokLink.length) {
            socialMedia.tiktok = tiktokLink.attr('href');
        }

        return { email: email || undefined, socialMedia: Object.keys(socialMedia).length > 0 ? socialMedia : undefined };
    } catch {
        return {};
    }
}

// Lead scoring function
function calculateLeadScore(
    website: string | undefined,
    rating: number,
    totalReviews: number,
    phone: string | undefined,
    filters: LeadScraperFilters
): { score: number; tier: 'hot' | 'warm' | 'cold' | 'poor_fit'; opportunities: string[] } {
    let score = 0;
    const opportunities: string[] = [];

    // Website scoring
    const hasWebsite = !!website;
    const hasSSL = website?.startsWith('https://') ?? false;

    if (!hasWebsite) {
        score += 40;
        opportunities.push('Missing Website (+40)');
    } else if (!hasSSL) {
        score += 25;
        opportunities.push('No SSL Certificate (+25)');
    }

    // Review count scoring
    if (totalReviews < 5) {
        score += 30;
        opportunities.push('Very low review count (< 5) (+30)');
    } else if (totalReviews < 10) {
        score += 20;
        opportunities.push('Low review count (< 10) (+20)');
    } else if (totalReviews < 20) {
        score += 10;
        opportunities.push('Below average review count (+10)');
    }

    // Rating scoring
    if (rating > 0) {
        if (rating < 3.0) {
            score += 30;
            opportunities.push('Critical: Low rating (< 3.0) (+30)');
        } else if (rating < 4.0) {
            score += 20;
            opportunities.push('Poor rating (< 4.0) (+20)');
        } else if (rating < 4.5) {
            score += 10;
            opportunities.push('Room for rating improvement (+10)');
        }
    } else {
        score += 15;
        opportunities.push('No ratings found (+15)');
    }

    // Phone scoring
    if (!phone) {
        score += 10;
        opportunities.push('Missing Phone Number (+10)');
    }

    // Normalize score to 0-100
    score = Math.min(100, score);

    // Determine tier
    let tier: 'hot' | 'warm' | 'cold' | 'poor_fit' = 'poor_fit';
    if (score >= 70) tier = 'hot';
    else if (score >= 50) tier = 'warm';
    else if (score >= 30) tier = 'cold';

    return { score, tier, opportunities };
}

// Filter matching function
function matchesFilters(
    lead: Pick<EnrichedLead, 'website' | 'sslStatus' | 'totalReviews' | 'rating'>,
    filters: LeadScraperFilters
): boolean {
    if (filters.noWebsite && lead.website) return false;
    if (filters.noSSL && lead.sslStatus !== 'insecure' && lead.sslStatus !== 'none') return false;
    if (filters.lowReviews && lead.totalReviews >= 10) return false;
    if (filters.poorRating && lead.rating >= 4.0) return false;
    return true;
}

// Generate GBP Profile URL
function generateGBPProfileUrl(placeId: string): string {
    const cleanId = placeId.replace('places/', '');
    return `https://search.google.com/local/writereview?placeid=${cleanId}`;
}

// Determine SSL status
function getSSLStatus(website: string | undefined): 'secure' | 'insecure' | 'none' {
    if (!website) return 'none';
    return website.startsWith('https://') ? 'secure' : 'insecure';
}

export async function POST(req: NextRequest) {
    return withRateLimit(req, rateLimits.leadScraper, async () => {
        try {
            const body = await req.json();
            const validatedData = leadScraperSchema.parse(body);

        const { apiKey, query, location, maxResults, filters } = validatedData;

        const allLeads: EnrichedLead[] = [];
        let nextPageToken: string | undefined = undefined;
        let hasMoreResults = true;

        // Pagination: fetch in batches of 20 until maxResults reached
        while (allLeads.length < maxResults && hasMoreResults) {
            const placesResponse: Response = await fetch(GOOGLE_PLACES_SEARCH_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': apiKey,
                    'X-Goog-FieldMask': [
                        'places.name',
                        'places.displayName',
                        'places.formattedAddress',
                        'places.rating',
                        'places.userRatingCount',
                        'places.websiteUri',
                        'places.types',
                        'places.nationalPhoneNumber',
                        'places.photos',
                    ].join(','),
                },
                body: JSON.stringify({
                    textQuery: `${query} in ${location}`,
                    maxResultCount: Math.min(20, maxResults - allLeads.length),
                    pageToken: nextPageToken,
                }),
            });

            if (!placesResponse.ok) {
                const errorData = await placesResponse.json().catch(() => ({}));
                return NextResponse.json(
                    {
                        error: 'Google Places API request failed',
                        details: errorData.error?.message || placesResponse.statusText,
                    },
                    { status: placesResponse.status }
                );
            }

            const data: { places?: unknown[]; nextPageToken?: string } = await placesResponse.json();

            if (!data.places || data.places.length === 0) {
                hasMoreResults = false;
                break;
            }

            // Process each place
            const processedLeads = await Promise.all(
                (data.places as unknown[]).map(async (place: unknown) => {
                    const p = place as {
                        name?: string;
                        displayName?: { text: string };
                        formattedAddress?: string;
                        rating?: number;
                        userRatingCount?: number;
                        websiteUri?: string;
                        nationalPhoneNumber?: string;
                        types?: string[];
                        photos?: { name: string }[];
                    };

                    const placeId = p.name || '';
                    const website = p.websiteUri;
                    const rating = p.rating || 0;
                    const totalReviews = p.userRatingCount || 0;
                    const phone = p.nationalPhoneNumber;

                    // Check SSL status
                    const sslStatus = getSSLStatus(website);

                    // Scrape contact info if website exists
                    let contactEmail: string | undefined;
                    let socialMedia: SocialMediaLinks | undefined;

                    if (website) {
                        const contactInfo = await scrapeContactInfo(website);
                        contactEmail = contactInfo.email;
                        socialMedia = contactInfo.socialMedia;
                    }

                    // Calculate lead score
                    const scoring = calculateLeadScore(website, rating, totalReviews, phone, filters);

                    // Generate photo URL if available
                    let photoUrl: string | undefined;
                    if (p.photos && p.photos.length > 0) {
                        const photoName = p.photos[0].name;
                        photoUrl = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&maxWidthPx=400&key=${apiKey}`;
                    }

                    const lead: EnrichedLead = {
                        placeId,
                        name: p.displayName?.text || 'Unknown Business',
                        address: p.formattedAddress || '',
                        phone,
                        website,
                        rating,
                        totalReviews,
                        categories: p.types ? p.types.map((t) => t.replace(/_/g, ' ')) : [],
                        gbpProfileUrl: generateGBPProfileUrl(placeId),
                        contactEmail,
                        socialMedia,
                        sslStatus,
                        websiteExists: !!website,
                        leadScore: scoring.score,
                        tier: scoring.tier,
                        opportunities: scoring.opportunities,
                        photoUrl,
                    };

                    return lead;
                })
            );

            // Apply filters and add to results
            const filteredLeads = processedLeads.filter((lead) => matchesFilters(lead, filters));
            allLeads.push(...filteredLeads);

            // Check for more pages
            nextPageToken = data.nextPageToken;
            if (!nextPageToken) {
                hasMoreResults = false;
            }
        }

        // Sort by lead score (descending)
        allLeads.sort((a, b) => b.leadScore - a.leadScore);

        // Return up to maxResults
        const returnLeads = allLeads.slice(0, maxResults);

        return NextResponse.json({
            leads: returnLeads,
            totalFound: allLeads.length,
            hasMore: allLeads.length > maxResults,
        });
    } catch (error: unknown) {
        console.error('Lead Scraper API Error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to fetch leads', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
        }
    });
}
