"use client";

import Link from "next/link";
import { CtaBand } from "../CtaBand";
import { useEffect, useRef } from "react";
import { wireHome } from "../home-behaviour";

export function HomePage() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => (root.current ? wireHome(root.current) : undefined), []);
  return (
    <div className="dh dh-page" id="main" ref={root}>
        <section className="hero" id="top">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <h1>More momentum.<br />Less <em>busywork.</em></h1>
              <p className="hero-lede">Your website, lead generation and automation, built and connected by one partner. The output of a marketing department, without hiring one.</p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/contact">Book a free 30-min diagnostic <span className="arr" aria-hidden="true">↗</span></Link>
                <a className="btn btn-ghost" href="#connected">See how it connects <span className="arr" aria-hidden="true">↓</span></a>
              </div>
              <ul className="promises" aria-label="What you can count on">
                <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg>You own everything we build</li>
                <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg>Working progress every week</li>
                <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg>Updates in plain English</li>
              </ul>
            </div>

            <div className="net" aria-label="The three connected digital Helper services">
              <svg className="net-lines" viewBox="0 0 550 480" fill="none" aria-hidden="true">
                <ellipse cx="275" cy="240" rx="204" ry="152" stroke="rgba(255,255,255,.07)"/>
                <ellipse cx="275" cy="240" rx="254" ry="196" stroke="rgba(255,255,255,.045)"/>
                <path className="flow l-web" d="M275 240V70"/>
                <path className="flow l-lead" d="M275 240 100 325"/>
                <path className="flow l-auto" d="M275 240 450 345"/>
                <circle cx="275" cy="240" r="100" stroke="rgba(162,245,108,.12)"/>
              </svg>
              <div className="hub">
                <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M25 10v27M25 22a10 10 0 1 0 0 5M25 26c0-9 12-9 12 0v11" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>One connected <br />growth system</span>
              </div>
              <Link className="node n-web" href="/services#web-design">
                <span className="node-icon"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="5" y="7" width="38" height="34" rx="5"/><path d="M5 17h38M12 12h1m5 0h1M13 26h16M13 33h10"/></svg></span>
                <span><small>Capture</small><b>Web design</b></span>
              </Link>
              <Link className="node n-lead" href="/services#lead-generation">
                <span className="node-icon"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="10"/><path d="m24 24 17-17M33 7h8v8"/></svg></span>
                <span><small>Connect</small><b>Lead generation</b></span>
              </Link>
              <Link className="node n-auto" href="/services#automation">
                <span className="node-icon"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="5" y="18" width="12" height="12" rx="3"/><rect x="31" y="5" width="12" height="12" rx="3"/><rect x="31" y="31" width="12" height="12" rx="3"/><path d="M17 24h6V11h8M23 24v13h8"/></svg></span>
                <span><small>Simplify</small><b>Automation</b></span>
              </Link>
              <p className="net-caption"><span className="dot"></span>Fewer handoffs. Better flow.</p>
            </div>
          </div>
        </section>

        <section className="paper band" id="find-your-fit">
          <div className="wrap">
            <div className="head">
              <div>
                <h2>A little help.<br />A lot more possibility.</h2>
              </div>
              <p>Start with the part that needs attention. Connect the rest when you&apos;re ready.</p>
            </div>
            <div className="goal-bar">
              <span className="label" id="goal-label">What&apos;s your next move?</span>
              <div className="goals" role="group" aria-labelledby="goal-label">
                <button type="button" aria-pressed="true" data-goal="website">Improve my website</button>
                <button type="button" aria-pressed="false" data-goal="leads">Find more customers</button>
                <button type="button" aria-pressed="false" data-goal="automation">Save my team time</button>
              </div>
            </div>
            <div className="goal-rec" aria-live="polite">
              <span aria-hidden="true">↳</span>
              <div><b id="goal-title">Start with a website that makes your value clear.</b><p id="goal-copy">Build a stronger first impression and a simpler path from visitor to inquiry.</p></div>
              <a className="link" id="goal-link" href="/contact?goal=website">Plan this project <span aria-hidden="true">↗</span></a>
            </div>
            <div className="cards filtered">
              <article className="card on" data-service="website">
                <svg className="card-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="5" y="7" width="38" height="34" rx="5"/><path d="M5 17h38M12 12h1m5 0h1M13 26h16M13 33h10"/></svg>
                <h3>Web design</h3>
                <p>A fast, distinctive website that explains your value, earns trust, and makes it easy for the right customer to get in touch.</p>
                <Link className="link" href="/services#web-design">Explore web design <span aria-hidden="true">↗</span></Link>
              </article>
              <article className="card" data-service="leads">
                <svg className="card-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="10"/><path d="m24 24 17-17M33 7h8v8"/></svg>
                <h3>Lead generation</h3>
                <p>Customer research, relevant messaging and follow-up in one organized lead engine. Know who to reach, what to say, and what happens next.</p>
                <Link className="link" href="/services#lead-generation">Explore lead generation <span aria-hidden="true">↗</span></Link>
              </article>
              <article className="card" data-service="automation">
                <svg className="card-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="5" y="18" width="12" height="12" rx="3"/><rect x="31" y="5" width="12" height="12" rx="3"/><rect x="31" y="31" width="12" height="12" rx="3"/><path d="M17 24h6V11h8M23 24v13h8"/></svg>
                <h3>Software &amp; automation</h3>
                <p>Replace manual handoffs with connected workflows. Your CRM, email, calendar and reporting, working the way your business actually works.</p>
                <Link className="link" href="/services#automation">Explore automation <span aria-hidden="true">↗</span></Link>
              </article>
            </div>
          </div>
        </section>

        <section className="band dark-band" id="connected">
          <div className="wrap">
            <div className="head">
              <div>
                <h2>Good pieces.<br /><span className="dim">A better whole.</span></h2>
              </div>
              <p>Follow one inquiry from first click to useful insight. Every step has a job. Every handoff has a home.</p>
            </div>
            <div className="demo">
              <div className="demo-top"><span><span className="dot"></span>A lead, connected</span><span className="label">Illustrative example</span></div>
              <div className="steps" role="tablist" aria-label="Lead workflow stages">
                <button role="tab" id="tab-0" aria-selected="true" aria-controls="wf-panel" data-stage="0">01 <span>Capture</span></button>
                <button role="tab" id="tab-1" aria-selected="false" aria-controls="wf-panel" tabIndex={-1} data-stage="1">02 <span>Organize</span></button>
                <button role="tab" id="tab-2" aria-selected="false" aria-controls="wf-panel" tabIndex={-1} data-stage="2">03 <span>Follow up</span></button>
                <button role="tab" id="tab-3" aria-selected="false" aria-controls="wf-panel" tabIndex={-1} data-stage="3">04 <span>Measure</span></button>
              </div>
              <div className="panel" id="wf-panel" role="tabpanel" aria-labelledby="tab-0" tabIndex={0}>
                <div className="window" id="win">
                  <div className="win-bar"><i></i><i></i><i></i><b id="w-app">Your website</b></div>
                  <div className="win-body">
                    <span className="win-label" id="w-label">New inquiry</span>
                    <h4 id="w-title">“Can you help with my website?”</h4>
                    <div className="rec"><span id="w-k1">Source</span><strong id="w-v1">Website project form</strong></div>
                    <div className="rec"><span id="w-k2">Next step</span><strong id="w-v2">Create a contact record →</strong></div>
                  </div>
                  <div className="win-foot" id="w-foot">A clear first step for your visitor.</div>
                </div>
                <div className="explain">
                  <h3 id="s-title">A website that opens the conversation.</h3>
                  <p id="s-copy">The visitor understands what you do and sends a relevant inquiry. The form collects the details you actually need, so the next step starts with context.</p>
                  <a className="link" id="s-link" href="/services#web-design">Explore web design <span aria-hidden="true">↗</span></a>
                </div>
              </div>
              <div className="demo-ctrl">
                <p id="wf-status" role="status">Choose any step, or run the whole example.</p>
                <button type="button" className="btn btn-ghost" id="wf-run">Run the example <span aria-hidden="true">▶</span></button>
              </div>
            </div>
          </div>
        </section>

        <section className="paper band" id="process">
          <div className="wrap process">
            <div className="process-side">
              <h2>Less mystery.<br />More progress.</h2>
              <div className="who">
                <span className="avatar" aria-hidden="true">M</span>
                <p><b>You work with Marlon,</b> the person who builds your system. No account managers, no handoffs between departments.</p>
              </div>
              <nav className="phase-nav" aria-label="Project phases">
                <a href="#phase-1" aria-current="step"><span>01</span>Diagnose</a>
                <a href="#phase-2"><span>02</span>Build</a>
                <a href="#phase-3"><span>03</span>Connect</a>
                <a href="#phase-4"><span>04</span>Improve</a>
              </nav>
            </div>
            <div>
              <article className="chapter" id="phase-1"><span>01</span><div><h3>Find the real bottleneck.</h3><p>Map how customers find you, what happens when they inquire, and where time gets lost. Then pick the most useful place to start.</p><p className="out">You leave with <b>A clear roadmap</b></p></div></article>
              <article className="chapter" id="phase-2"><span>02</span><div><h3>Make it real, in increments.</h3><p>Strategy becomes a working website, outreach engine or internal tool. Review live progress every week and make decisions while they&apos;re easy to change.</p><p className="out">You see <b>Working deliverables</b></p></div></article>
              <article className="chapter" id="phase-3"><span>03</span><div><h3>Close the gaps between tools.</h3><p>Connect forms, contact records, follow-ups and reporting. Keep a human review where judgment matters and automate the repeatable parts.</p><p className="out">You get <b>A connected workflow</b></p></div></article>
              <article className="chapter" id="phase-4"><span>04</span><div><h3>Learn. Adjust. Keep moving.</h3><p>Watch the signals that matter to your business. Improve the message, the path to inquiry and the workflow as you learn.</p><p className="out">You know <b>What to improve next</b></p></div></article>
            </div>
          </div>
        </section>

        <section className="band dark-band" id="pricing">
          <div className="wrap">
            <div className="head">
              <div>
                <h2>Know where you&apos;d start.</h2>
              </div>
              <p>Every engagement begins with the free diagnostic. Your exact quote depends on the scope we agree together.</p>
            </div>
            <div className="prices">
              <div className="price"><h3>Website Sprint</h3><p className="kind">One-time project</p><strong>$2,500<small>starting</small></strong><p>A fast site that explains your value and turns visitors into inquiries. Built in your name.</p></div>
              <div className="price"><h3>Growth System</h3><p className="kind">Monthly partnership</p><strong>$1,500<small>/month</small></strong><p>Your website connected to steady lead generation and organized follow-up.</p></div>
              <div className="price"><h3>Full-Stack Partner</h3><p className="kind">Monthly partnership</p><strong>$3,500<small>/month</small></strong><p>Website, lead generation and automation run as one system.</p></div>
            </div>
            <div className="price-foot">
              <p><b style={{ color: "var(--on-ink)" }}>Founding clients:</b> the first 3 Tri-Cities trades get the Website Sprint for $1,500 in exchange for a short case study. Not sure which plan fits? That&apos;s what the diagnostic call is for.</p>
              <Link className="link" href="/pricing">See full pricing <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>

        <section className="paper band">
          <div className="wrap faq-layout">
            <div>
              <h2>Good questions.<br />Straight answers.</h2>
              <Link className="link" href="/contact">Ask your own <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="faq">
              <details open><summary>What happens on the free diagnostic call?</summary><p>Thirty minutes on how customers find you, what happens after they inquire, and where time gets lost. You leave with a clear first step, whether or not you work with us.</p></details>
              <details><summary>I already have a website and some tools. Do I start over?</summary><p>No. We start from what you have, keep what works, and connect or replace only the parts that are holding you back.</p></details>
              <details><summary>Can I start with just one service?</summary><p>Yes. Start with your website, lead generation or one automation. Each piece is built to connect to the others later, so the first one stays useful as you grow.</p></details>
              <details><summary>Who owns the website and systems?</summary><p>You do. The site, code, lists, accounts and automations are set up in your name.</p></details>
              <details><summary>What does it cost?</summary><p>The Website Sprint starts at $2,500, and the first 3 Tri-Cities founding clients get it for $1,500. Growth System starts at $1,500 per month and Full-Stack Partner at $3,500 per month. Your quote depends on the scope we agree together.</p></details>
              <details><summary>Do I need to know how to code?</summary><p>No. Bring the business problem. We handle the technical work and explain decisions, progress and results in plain English.</p></details>
            </div>
          </div>
        </section>

        <CtaBand heading={<>What could work<br />better in your business?</>} text={"Bring the bottleneck. Leave with a clearer plan. A free 30-minute diagnostic, no pressure."} />
    </div>
  );
}
