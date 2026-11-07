import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/business-info";
import { BrandMark } from "./BrandMark";

export function SiteFooter() {
  return (
    <div className="dh dh-chrome">
      <footer className="foot">
        <div className="wrap">
          <div className="foot-top">
            <div>
              <Link className="brand" href="/">
                <span className="brand-mark">
                  <BrandMark />
                </span>
                <span className="brand-name">
                  digital <b>Helper</b>
                  <i>.</i>
                </span>
              </Link>
              <p>
                Websites, Google profiles and follow-up systems
                <br />
                for Tri-Cities trades.
              </p>
            </div>
            <div className="foot-links">
              <div>
                <span className="label">Explore</span>
                <Link href="/services">Services</Link>
                <Link href="/work">Work</Link>
                <Link href="/pricing">Pricing</Link>
                <Link href="/about">About</Link>
                <Link href="/blog">Blog</Link>
              </div>
              <div>
                <span className="label">Areas we serve</span>
                <Link href="/richland-wa">Richland</Link>
                <Link href="/kennewick-wa">Kennewick</Link>
                <Link href="/pasco-wa">Pasco</Link>
                <Link href="/locations/west-richland">West Richland</Link>
              </div>
              <div>
                <span className="label">Get started</span>
                <Link href="/contact">Book a free diagnostic</Link>
                <a href={BUSINESS_INFO.phoneHref}>{BUSINESS_INFO.phone}</a>
                <a href="https://www.facebook.com/idigitalhelper" target="_blank" rel="noopener noreferrer">
                  Facebook ↗
                </a>
              </div>
            </div>
          </div>
          <div className="foot-bottom">
            <span>
              © {new Date().getFullYear()} digital Helper · Richland, WA · {BUSINESS_INFO.phone}
            </span>
            <span>
              <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
