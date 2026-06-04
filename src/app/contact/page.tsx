import type { Metadata } from "next";
import ContactPageContent from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact | Free Web Design Consultation Tri-Cities",
  description:
    "Get a free web design consultation for your Tri-Cities business. Book a strategy call or send us a message. Serving Richland, Kennewick, Pasco & West Richland WA.",
  keywords: [
    "free web design consultation tri-cities",
    "contact web designer richland",
    "seo consultation kennewick",
    "website quote tri-cities wa",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Digital Helper | Free Tri-Cities Web Design Consultation",
    description:
      "Book a free strategy call or send a message. Web design and SEO for Tri-Cities businesses.",
    url: "https://digital-helper.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
