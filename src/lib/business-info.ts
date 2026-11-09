/**
 * Centralized business information constants
 * Use these throughout the app to maintain NAP consistency (Name, Address, Phone)
 * Critical for local SEO - all instances must match exactly
 */

export const BUSINESS_INFO = {
  name: "Digital Helper",
  legalName: "Digital Helper Agency",

  // Contact
  phone: "(509) 987-5060",
  phoneHref: "tel:+15099875060",
  // Canonical site-facing email (NAP). Must be a monitored mailbox — see launch checklist.
  email: "business@digital-helper.com",
  emailHref: "mailto:business@digital-helper.com",
  // Google Calendar appointment schedule (replaced Calendly, Nov 2026)
  bookingUrl: "https://calendar.app.google/jauLpVwSWX16vYhi8",
  bookingEmbedUrl:
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1Zmyn43Jq0Hrds7APdOXP61IgrrlEQzvHeX965hSm4Qqpwg_LXLVLj8yhYlZjUyyvgIqi-98mj?gv=true",

  // Address
  address: {
    locality: "Richland",
    region: "WA",
    postalCode: "99352",
    country: "US",
    full: "Richland, WA 99352",
    display: "Richland, WA",
  },

  // Geo coordinates (Richland, WA)
  geo: {
    latitude: 46.2857,
    longitude: -119.2845,
  },

  // URLs
  urls: {
    website: "https://digital-helper.com",
    calendar: "https://calendar.app.google/jauLpVwSWX16vYhi8",
    googleMaps: "https://maps.app.goo.gl/zqStKbjf2iUg21Lg8",
    github: "https://github.com/marlowne12",
  },

  // Business hours
  hours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
    display: "Mon-Fri: 9AM - 6PM",
  },

  // Service area
  serviceArea: {
    primary: "Tri-Cities",
    cities: ["Richland", "Kennewick", "Pasco", "West Richland"],
    region: "Eastern Washington",
  },

  // Rating/Reviews (update these as real reviews come in)
  rating: {
    value: "4.9",
    count: "50",
    bestRating: "5",
  },

  // Price range
  priceRange: "$$",
} as const;

export type BusinessInfo = typeof BUSINESS_INFO;
