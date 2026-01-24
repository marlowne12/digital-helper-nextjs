'use server';

import { GBPProfile } from '@/types/reputation';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export async function fetchGBPData(urlOrName: string): Promise<GBPProfile> {
    if (!GOOGLE_PLACES_API_KEY) {
        throw new Error("Missing GOOGLE_PLACES_API_KEY environment variable");
    }

    try {
        // 1. Find the Place ID
        const searchUrl = 'https://places.googleapis.com/v1/places:searchText';
        const searchBody = {
            textQuery: urlOrName,
            maxResultCount: 1
        };

        const searchResponse = await fetch(searchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
                'X-Goog-FieldMask': 'places.name,places.id,places.formattedAddress'
            },
            body: JSON.stringify(searchBody)
        });

        const searchData = await searchResponse.json();

        if (!searchData.places || searchData.places.length === 0) {
            throw new Error("No business found. Please try a more specific name or address.");
        }

        const placeId = searchData.places[0].name; // Format: "places/PLACE_ID"

        // 2. Fetch Place Details
        const detailsUrl = `https://places.googleapis.com/v1/${placeId}`;
        const fieldMask = [
            'name',
            'formattedAddress',
            'rating',
            'userRatingCount',
            'websiteUri',
            'nationalPhoneNumber',
            'types',
            'editorialSummary',
            'reviews',
            'photos'
        ].join(',');

        const detailsResponse = await fetch(`${detailsUrl}?languageCode=en`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
                'X-Goog-FieldMask': fieldMask
            }
        });

        const place = await detailsResponse.json();

        // 3. Map to GBPProfile
        return {
            name: place.name?.displayName?.text || place.name || urlOrName, // Handle displayName object if strictly typed
            address: place.formattedAddress || "Address not available",
            rating: place.rating || 0,
            totalReviews: place.userRatingCount || 0,
            website: place.websiteUri,
            phone: place.nationalPhoneNumber,
            categories: place.types ? place.types.map((t: string) => t.replace(/_/g, ' ')) : [],
            description: place.editorialSummary?.text || "No description available.",
            isClaimed: true, // API doesn't explicitly expose this easily, defaulting to true for now
            reviews: (place.reviews || []).map((r: unknown) => ({
                id: (r as { name?: string }).name || Math.random().toString(),
                author: (r as { authorAttribution?: { displayName: string } }).authorAttribution?.displayName || "Anonymous",
                rating: (r as { rating: number }).rating,
                time: (r as { relativePublishTimeDescription: string }).relativePublishTimeDescription || "Recently",
                text: (r as { text?: { text: string } }).text?.text || (r as { text?: string }).text || "",
                response: (r as { authorReply?: { text: { text: string } } }).authorReply?.text?.text || (r as { originalText?: { text: string } }).originalText?.text
            })),
            photos: (place.photos || []).map((p: unknown) => (p as { name: string }).name)
        };

    } catch (error) {
        console.error("Error fetching GBP data:", error);
        throw error;
    }
}
