import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
    title: "Contact Us | Get a Free Strategy Call",
    description: "Ready to grow your Tri-Cities business? Contact Digital Helper for a free strategy call. Web design, SEO, and AI automation experts in Richland, WA.",
    keywords: ["contact digital helper", "free strategy call tri-cities", "web design consultation richland", "seo consultation kennewick"],
    alternates: {
        canonical: "/contact",
    },
    openGraph: {
        title: "Contact Digital Helper | Free Strategy Call",
        description: "Book a free 15-minute strategy call to discuss your digital growth goals. No pressure, no obligations.",
        url: "https://digital-helper.com/contact",
        images: ["/og-image.png"],
    },
};

export default function ContactPage() {
    return <ContactContent />;
}
