import Link from "next/link";
import { ContactForm } from "../ContactForm";

export function ContactPage() {
  return (
    <div className="dh dh-page" id="main">
        <section className="page-hero">
          <div className="wrap">
            <h1>Book a free <em className="nw">30-minute</em> diagnostic.</h1>
            <p className="hero-lede">We look at how customers find you, what happens after they reach out, and where jobs slip away. You leave with one clear first step, whether or not we work together.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/booking">Pick a time <span className="arr" aria-hidden="true">↗</span></Link>
              <a className="btn btn-ghost" href="tel:+15099875060">Call (509) 987-5060</a>
            </div>
          </div>
        </section>

        <section className="paper band">
          <div className="wrap contact">
            <div>
              <h2>Other ways to reach me.</h2>
              <p>I reply within one business day, usually much sooner.</p>
              <div className="ways">
                <div className="way"><div><b>Book online</b><span>Pick any open 30-minute slot</span></div><Link className="link" href="/booking">Open the calendar <span aria-hidden="true">↗</span></Link></div>
                <div className="way"><div><b>Call or text</b><span>(509) 987-5060</span></div><a className="link" href="tel:+15099875060">Call now <span aria-hidden="true">↗</span></a></div>
                <div className="way"><div><b>Email</b><span>business@digital-helper.com</span></div><a className="link" href="mailto:business@digital-helper.com">Send an email <span aria-hidden="true">↗</span></a></div>
              </div>
              <ul className="agenda" aria-label="What we cover on the call">
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>How customers find you today</span></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>What happens after someone calls or fills a form</span></li>
                <li><svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg><span>The one change that would bring in the most jobs</span></li>
              </ul>
            </div>
            <ContactForm />
          </div>
        </section>
    </div>
  );
}
