"use client";

import Script from "next/script";
import { useEffect } from "react";

interface CalendlyWidgetProps {
  url: string;
  height?: number;
  className?: string;
}

export function CalendlyWidget({ url, height = 700, className }: CalendlyWidgetProps) {
  useEffect(() => {
    function handleCalendlyEvent(e: MessageEvent) {
      if (e.data?.event === "calendly.event_scheduled") {
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "calendly_booking", {
            event_category: "conversion",
            event_label: "consultation_booked",
          });
        }
      }
    }
    window.addEventListener("message", handleCalendlyEvent);
    return () => window.removeEventListener("message", handleCalendlyEvent);
  }, []);

  return (
    <>
      <div
        className={`calendly-inline-widget w-full ${className ?? ""}`}
        data-url={url}
        style={{ minWidth: "320px", height: `${height}px` }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
