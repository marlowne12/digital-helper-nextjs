"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "./BrandMark";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="dh dh-chrome">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="wrap nav">
          <Link className="brand" href="/" aria-label="digital Helper home">
            <span className="brand-mark">
              <BrandMark />
            </span>
            <span className="brand-name">
              digital <b>Helper</b>
              <i>.</i>
            </span>
          </Link>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((o) => !o)}
          >
            Menu <i aria-hidden="true"></i>
          </button>
          <nav id="main-nav" aria-label="Main navigation" className={open ? "open" : undefined}>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link className="btn btn-primary" href="/contact" onClick={() => setOpen(false)}>
              Book a free diagnostic <span className="arr" aria-hidden="true">↗</span>
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}
