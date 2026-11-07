import Link from "next/link";
import { CtaBand } from "../CtaBand";

export function AboutPage() {
  return (
    <div className="dh dh-page" id="main">
        <section className="page-hero">
          <div className="wrap about-hero">
            <div>
              <h1>Hi, I&apos;m <em>Marlon.</em></h1>
              <p className="hero-lede">I run digital Helper from Richland. I build websites, Google profiles and the follow-up systems behind them for Tri-Cities trades, and I&apos;m the person you talk to from the first call to the last update.</p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/contact">Book a free diagnostic <span className="arr" aria-hidden="true">↗</span></Link>
                <a className="btn btn-ghost" href="tel:+15099875060">Call (509) 987-5060</a>
              </div>
            </div>
            <div className="photo" role="img" aria-label="Photo of Marlon coming soon"><span aria-hidden="true">M</span><p>Your photo goes here. A real face is the strongest trust signal on this page.</p></div>
          </div>
        </section>

        <section className="paper band">
          <div className="wrap story-grid">
            <h2>Why digital Helper exists.</h2>
            <div className="story">
              <p>Good local businesses lose jobs every day to competitors who simply answered faster or had a clearer website. The work is often better. The phone just went to voicemail, the form went to an inbox nobody checked, or the Google profile still had last year&apos;s hours.</p>
              <p>None of that needs a big agency to fix. It needs someone who understands how a trade business actually runs, builds the website and the follow-up as one system, and explains it in plain English.</p>
              <p>That&apos;s what I do. One person, local, accountable. You&apos;ll always know what I&apos;m working on, what it costs and what&apos;s next.</p>
            </div>
          </div>
        </section>

        <section className="paper band" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="head">
              <div><h2>How I work.</h2></div>
              <p>The same four promises on every project, big or small.</p>
            </div>
            <div className="terms">
              <div><b>Local.</b><p>Based in Richland and focused on the Tri-Cities. I know the towns your customers search for.</p></div>
              <div><b>One person, start to finish.</b><p>No account managers or handoffs. The person you meet is the person who builds it.</p></div>
              <div><b>Plain English.</b><p>Weekly updates you can read in two minutes, with no jargon and no padding.</p></div>
              <div><b>You own everything.</b><p>Your site, domain, accounts and data stay in your name, whether we keep working together or not.</p></div>
            </div>
          </div>
        </section>

        <CtaBand heading={<>Let&apos;s talk about<br />your business.</>} text={"Bring the bottleneck. Leave with a clearer plan. A free 30-minute diagnostic, no pressure."} />
    </div>
  );
}
