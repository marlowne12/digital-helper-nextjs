import Link from "next/link";
import { CtaBand } from "../CtaBand";

export function PricingPage() {
  return (
    <div className="dh dh-page" id="main">
        <section className="page-hero">
          <div className="wrap">
            <h1>Clear prices.<br /><em>No surprises.</em></h1>
            <p className="hero-lede">Every project starts with a free 30-minute diagnostic. You get a fixed quote in writing before any work begins, and you see your new homepage before you pay anything.</p>
          </div>
        </section>

        <section className="band dark-band" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="plans">
              <article className="plan feature">
                <h2>Website Sprint</h2>
                <p className="kind">One-time project</p>
                <strong>$2,500<small>starting</small></strong>
                <p className="fit">A new website that turns visitors into calls. Best first step for most local trades.</p>
                <ul>
                  <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Conversion-first design and copy</span></li>
                  <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Live in 2 to 3 weeks</span></li>
                  <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Technical SEO, local schema and analytics</span></li>
                  <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Lead capture connected to follow-up</span></li>
                  <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Tap-to-call on every screen</span></li>
                  <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>You own the site and domain</span></li>
                </ul>
                <Link className="btn btn-primary" href="/contact?goal=website">Start with a website <span className="arr" aria-hidden="true">↗</span></Link>
              </article>
              <article className="plan">
                <h2>Growth System</h2>
                <p className="kind">Monthly partnership</p>
                <strong>$1,500<small>/month</small></strong>
                <p className="fit">Your website connected to steady local leads and organized follow-up.</p>
                <ul>
                  <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Google Business Profile managed weekly</span></li>
                  <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Review request routine after every job</span></li>
                  <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Outbound lists and email sequences</span></li>
                  <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Landing pages tuned monthly</span></li>
                  <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Website care and small updates</span></li>
                  <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Weekly readout in plain English</span></li>
                </ul>
                <Link className="btn btn-ghost" href="/contact?goal=leads">Plan my growth <span className="arr" aria-hidden="true">↗</span></Link>
              </article>
              <article className="plan">
                <h2>Full-Stack Partner</h2>
                <p className="kind">Monthly partnership</p>
                <strong>$3,500<small>/month</small></strong>
                <p className="fit">Website, lead generation and automation run as one system.</p>
                <ul>
                  <li className="plus">Everything in Growth System, plus</li>
                  <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Speed-to-lead replies in minutes</span></li>
                  <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Missed-call text back</span></li>
                  <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>CRM set up around how you work</span></li>
                  <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Email, calendar and billing connected</span></li>
                  <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Monthly strategy call</span></li>
                </ul>
                <Link className="btn btn-ghost" href="/contact?goal=automation">Map my system <span className="arr" aria-hidden="true">↗</span></Link>
              </article>
            </div>
          </div>
        </section>

        <section className="paper band">
          <div className="wrap deal">
            <div>
              <h2>Founding clients:<br /><em>$1,500</em> Website Sprint.</h2>
              <p>The first three Tri-Cities trades get the full Website Sprint at the founding price in exchange for a short case study. Once the three spots are gone, the price goes back to $2,500.</p>
            </div>
            <div>
              <ul>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Everything in the Website Sprint, nothing removed</span></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Free homepage mockup first, so you know what you&apos;re getting</span></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>Case study: your before-and-after numbers and permission to show the site</span></li>
              </ul>
              <Link className="btn btn-primary" href="/contact?goal=website">Claim a founding spot <span className="arr" aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>

        <section className="paper band" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="head">
              <div><h2>The fine print,<br />in plain English.</h2></div>
            </div>
            <div className="terms">
              <div><b>You own everything.</b><p>The website, domain, code, lists, accounts and automations are set up in your name.</p></div>
              <div><b>Work you can see, weekly.</b><p>You review working progress every week, not a slide deck at the end.</p></div>
              <div><b>Cancel with 30 days&apos; notice.</b><p>Monthly plans have no long contract. If it stops being worth it, you leave and keep what was built.</p></div>
              <div><b>Replies within one business day.</b><p>You talk to Marlon, the person doing the work, not a ticket queue.</p></div>
              <div><b>No setup fees.</b><p>The price you&apos;re quoted is the price you pay.</p></div>
              <div><b>Tool costs at cost.</b><p>Things like a CRM or texting service usually run $30 to $100 a month, billed straight to your accounts with no markup.</p></div>
            </div>
          </div>
        </section>

        <section className="paper band" style={{ paddingTop: "0" }}>
          <div className="wrap faq-layout">
            <div>
              <h2>Pricing questions.</h2>
              <Link className="link" href="/contact">Ask your own <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="faq">
              <details open><summary>Why “starting” prices?</summary><p>Starting prices cover the typical scope for a local trade. More pages, more locations or extra integrations cost more, and you&apos;ll see the exact number in writing before anything starts.</p></details>
              <details><summary>What if it doesn&apos;t work for me?</summary><p>You see your new homepage before you pay anything, so there are no surprises on the design. Monthly plans cancel with 30 days&apos; notice, and everything built stays yours.</p></details>
              <details><summary>Are there any setup fees?</summary><p>No. The only extra costs are the tools themselves, which are billed to your own accounts with no markup.</p></details>
              <details><summary>Can I start small?</summary><p>Yes. A Website Sprint is a good first step on its own. Add a monthly plan later, once the site is bringing in calls and you want more of them.</p></details>
            </div>
          </div>
        </section>

        <CtaBand heading={<>Find the right<br />starting point.</>} text={"Thirty minutes, free, no pressure. You leave knowing which plan fits, or whether you need one at all."} />
    </div>
  );
}
