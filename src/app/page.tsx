import type { Metadata } from "next";
import "./home-fonts.css";
import "./home.css";
import { HOME_BODY_HTML, HOME_JSON_LD } from "@/components/home/home-body";
import { HomeScript } from "@/components/home/HomeScript";

const TITLE = "Digital Helper | After-hours booking for Tri-Cities trades";
const DESCRIPTION =
  "Websites, local SEO, and AI after-hours booking for HVAC, plumbers, and landscapers in Richland, Kennewick, and Pasco. Operator-grade. Keep it moving.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "https://www.digital-helper.com/" },
  icons: { icon: [{ url: "/home/logo.svg", type: "image/svg+xml" }] },
  openGraph: {
    type: "website",
    url: "https://www.digital-helper.com/",
    title: "Digital Helper | Keep it moving.",
    description: "Sites, local SEO, and after-hours booking for Tri-Cities trades.",
    siteName: "Digital Helper",
  },
  twitter: {
    card: "summary",
    title: "Digital Helper | Keep it moving.",
    description: "Sites, local SEO, and after-hours booking for Tri-Cities trades.",
  },
  robots: { index: true, follow: true },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: HOME_JSON_LD }} />
      <div className="dh-home" dangerouslySetInnerHTML={{ __html: HOME_BODY_HTML }} />
      <HomeScript />
    </>
  );
}
