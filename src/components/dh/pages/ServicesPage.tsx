import Link from "next/link";
import { CtaBand } from "../CtaBand";

export function ServicesPage() {
  return (
    <div className="dh dh-page" id="main">
        <section className="page-hero">
          <div className="wrap">
            <h1>Three services.<br /><em>One connected system.</em></h1>
            <p className="hero-lede">A website that turns visitors into calls, a steady way to reach new customers, and the follow-up that makes sure no job slips through. Start with one. Each piece connects to the next.</p>
            <nav className="jump" aria-label="Jump to a service">
              <a href="#web-design">Web design <span aria-hidden="true">↓</span></a>
              <a href="#lead-generation">Lead generation &amp; local SEO <span aria-hidden="true">↓</span></a>
              <a href="#automation">Software &amp; automation <span aria-hidden="true">↓</span></a>
            </nav>
          </div>
        </section>

        <section className="paper band" id="web-design">
          <div className="wrap svc">
            <div className="svc-copy">
              <h2>Web design that books jobs.</h2>
              <p>Most trade websites look fine and still lose the call. Yours will say what you do, where you work and how to reach you in the first five seconds, on a phone, in a truck, in bad light.</p>
              <p className="svc-price"><strong>$2,500</strong> Website Sprint, starting · founding clients $1,500</p>
              <Link className="btn btn-primary" href="/contact?goal=website">Get a free homepage mockup <span className="arr" aria-hidden="true">↗</span></Link><p className="svc-more"><Link className="link" href="/web-design">Web design in detail <span aria-hidden="true">↗</span></Link></p>
            </div>
            <ul className="svc-list">
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><div><b>Design and copy built to convert</b><p>Written around the jobs you want more of, with your service area, proof and phone number where people look first.</p></div></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><div><b>Live in 2 to 3 weeks</b><p>You review working pages every week instead of waiting for a big reveal.</p></div></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><div><b>Technical SEO and analytics</b><p>Fast pages, clean structure, local schema and tracking set up so you can see which pages bring in calls.</p></div></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><div><b>Lead capture connected to follow-up</b><p>Every form lands in one place with the details you need, ready for a fast reply.</p></div></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><div><b>Tap-to-call on every screen</b><p>The number is one thumb away on every page, because most of your customers are on a phone.</p></div></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><div><b>You own the site</b><p>The domain, the code and the accounts are in your name from day one.</p></div></li>
            </ul>
          </div>
        </section>

        <section className="band dark-band" id="lead-generation">
          <div className="wrap svc">
            <div className="svc-copy">
              <h2>Lead generation &amp; local SEO.</h2>
              <p>Show up when someone nearby searches for what you do, and reach the customers who aren&apos;t searching yet. One organized engine, reviewed with you every week.</p>
              <p className="svc-price"><strong>$1,500/mo</strong> Growth System, starting</p>
              <Link className="btn btn-primary" href="/contact?goal=leads">Plan my lead engine <span className="arr" aria-hidden="true">↗</span></Link><p className="svc-more"><Link className="link" href="/seo">Local SEO in detail <span aria-hidden="true">↗</span></Link></p>
            </div>
            <ul className="svc-list">
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><div><b>Google Business Profile, handled</b><p>Services, photos, hours and weekly posts kept current, so you show up in the map results for your area.</p></div></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><div><b>A simple review routine</b><p>A polite request after every finished job. No incentives, no gating, just a habit that keeps reviews coming.</p></div></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><div><b>Outbound lists and email sequences</b><p>The right property managers, builders or homeowners, with short, relevant messages and organized follow-up.</p></div></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><div><b>Landing pages tuned monthly</b><p>Pages for your best services and towns, adjusted each month based on what actually brings in calls.</p></div></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><div><b>A weekly readout</b><p>Calls, form fills, reviews and replies in plain English, with what we&apos;re changing next.</p></div></li>
            </ul>
          </div>
        </section>

        <section className="paper band" id="automation">
          <div className="wrap svc">
            <div className="svc-copy">
              <h2>Software &amp; automation.</h2>
              <p>The fastest reply usually wins the job. Automation answers in minutes, keeps every lead in one place, and takes the retyping off your plate, with you still in charge of anything that needs judgment.</p>
              <p className="svc-price"><strong>$3,500/mo</strong> Full-Stack Partner, starting</p>
              <Link className="btn btn-primary" href="/contact?goal=automation">Map my workflow <span className="arr" aria-hidden="true">↗</span></Link><p className="svc-more"><Link className="link" href="/ai-agency">Automation in detail <span aria-hidden="true">↗</span></Link></p>
            </div>
            <ul className="svc-list">
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><div><b>Speed-to-lead replies</b><p>A personal reply and a booking link go out minutes after someone reaches out, day or night.</p></div></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><div><b>Missed-call text back</b><p>Can&apos;t pick up on a roof or under a sink? The caller gets a text right away so they don&apos;t call the next company.</p></div></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><div><b>One CRM for every lead</b><p>Forms, calls and emails create one record with the source, the request and the next step.</p></div></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><div><b>Email, calendar and billing connected</b><p>Bookings, reminders, estimates and invoices hand off on their own, without copy and paste.</p></div></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><div><b>Everything from the Growth System</b><p>Full-Stack Partner includes your website care and lead generation, run as one system.</p></div></li>
            </ul>
          </div>
        </section>

        <section className="paper band" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="head">
              <div><h2>Why they work better together.</h2></div>
              <p>Each service is useful alone. Connected, every lead has a path from first search to booked job.</p>
            </div>
            <div className="loop">
              <div><b>Get found <span aria-hidden="true">→</span></b><p>Local SEO and outreach bring the right people to your site and your phone.</p></div>
              <div><b>Get the call <span aria-hidden="true">→</span></b><p>A clear website turns that visit into a call or a request with the details you need.</p></div>
              <div><b>Book the job</b><p>Fast, automatic follow-up books the visit before a competitor calls back.</p></div>
            </div>
          </div>
        </section>

        <CtaBand heading={<>Not sure where<br />to start?</>} text={"That's what the free 30-minute diagnostic is for. You leave with one clear first step, whether or not we work together."} />
    </div>
  );
}
