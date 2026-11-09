import type { Metadata } from "next";
import { BUSINESS_INFO } from "@/lib/business-info";

export const metadata: Metadata = {
  title: "Book a Free 30-Minute Diagnostic",
  description:
    "Pick a time for a free 30-minute diagnostic with digital Helper. We look at how customers find you and where jobs slip away, and you leave with one clear next step.",
  alternates: { canonical: "https://digital-helper.com/booking" },
};

export default function BookingPage() {
  return (
    <div className="dh dh-page" id="main">
      <section className="page-hero">
        <div className="wrap">
          <h1>
            Pick a time for your <em className="nw">free diagnostic.</em>
          </h1>
          <p className="hero-lede">
            Thirty minutes on how customers find you, what happens after they reach out, and where jobs slip away. You
            leave with one clear first step, whether or not we work together.
          </p>
        </div>
      </section>
      <section className="paper band booking-band">
        <div className="wrap">
          <div className="booking-frame">
            <iframe
              src={BUSINESS_INFO.bookingEmbedUrl}
              title="Book a free 30-minute diagnostic with digital Helper"
              loading="lazy"
            />
          </div>
          <p className="booking-alt">
            Calendar not loading?{" "}
            <a className="link" href={BUSINESS_INFO.bookingUrl} target="_blank" rel="noopener noreferrer">
              Open it in Google Calendar <span aria-hidden="true">↗</span>
            </a>{" "}
            or call <a href={BUSINESS_INFO.phoneHref}>{BUSINESS_INFO.phone}</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
