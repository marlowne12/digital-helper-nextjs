import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "../CtaBand";

export function WorkPage() {
  return (
    <div className="dh dh-page" id="main">
        <section className="page-hero">
          <div className="wrap">
            <h1>Built for the <em>first five seconds.</em></h1>
            <p className="hero-lede">digital Helper is new, so instead of borrowed logos, here are sample sites I designed for the kinds of Tri-Cities trades I work with. The business names are made up. The design decisions are exactly what your site would get.</p>
          </div>
        </section>

        <section className="paper band">
          <div className="wrap work">
              <article className="work-row">
                <figure className="shot"><div className="frame"><Image src="/work-shots/ridgeline.webp" width="960" height="600" alt="Homepage of the Ridgeline Heating &amp; Air sample site" loading="lazy" /></div></figure>
                <div className="work-copy">
                  <h2>Ridgeline Heating &amp; Air</h2>
                  <p className="meta">HVAC · Tri-Cities · <b>Sample design, fictional business</b></p>
                  <p>A call-first homepage for a company whose customers usually find it with no heat or no AC. The emergency line, years in business and credentials are all visible before the first scroll.</p>
                  <ul>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>24/7 emergency number in the hero and the header</span></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Trust proof up front: years serving the area, licensing, local reviews</span></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Call and quote buttons side by side</span></li>
                  </ul>
                </div>
              </article>
              <article className="work-row">
                <figure className="shot"><div className="frame"><Image src="/work-shots/sagebrush.webp" width="960" height="600" alt="Homepage of the Sagebrush Landscaping sample site" loading="lazy" /></div></figure>
                <div className="work-copy">
                  <h2>Sagebrush Landscaping</h2>
                  <p className="meta">Landscaping · Tri-Cities · <b>Sample design, fictional business</b></p>
                  <p>Two clear paths for two very different buyers, homeowners and commercial properties, with a free estimate one tap away and room for real before-and-after project photos.</p>
                  <ul>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Residential and commercial paths from the first screen</span></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Phone number and free estimate on every page</span></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Gallery built for before-and-after photos</span></li>
                  </ul>
                </div>
              </article>
              <article className="work-row">
                <figure className="shot"><div className="frame"><Image src="/work-shots/ironwood.webp" width="960" height="600" alt="Homepage of the Ironwood Pest Control sample site" loading="lazy" /></div></figure>
                <div className="work-copy">
                  <h2>Ironwood Pest Control</h2>
                  <p className="meta">Pest control · Tri-Cities · <b>Sample design, fictional business</b></p>
                  <p>Family-owned, pet-safe positioning for homeowners who worry about what&apos;s being sprayed around their kids and pets, with a first-treatment offer above the fold.</p>
                  <ul>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Pet-safe, family-owned message in the headline area</span></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>First-treatment offer visible without scrolling</span></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Call button in the brand color, quote form one tap away</span></li>
                  </ul>
                </div>
              </article>
          </div>
        </section>

        <section className="band dark-band">
          <div className="wrap founding">
            <div>
              <h2>Be one of the first three.</h2>
              <p>I&apos;m looking for three Tri-Cities trades to become real case studies. You get a full Website Sprint at the founding price. I get a result I can show the next customer.</p>
            </div>
            <div>
              <ul>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span><b>$1,500</b> Website Sprint, normally from $2,500</span></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>See your new homepage before you pay anything</span></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>In return: a short case study with your before-and-after numbers</span></li>
              </ul>
              <Link className="btn btn-primary" href="/contact?goal=website">Claim a founding spot <span className="arr" aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>

        <CtaBand heading={<>Want to see yours<br />before you pay?</>} text={"Tell me your business and I'll send a free homepage mockup. If you like it, we talk. If not, you keep the ideas."} />
    </div>
  );
}
