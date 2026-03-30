"use client";

import Script from "next/script";

interface CalendlyWidgetProps {
  url: string;
  height?: number;
  className?: string;
}

export function CalendlyWidget({ url, height = 700, className }: CalendlyWidgetProps) {
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
