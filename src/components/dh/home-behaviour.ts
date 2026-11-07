/**
 * Interactive behaviour for the homepage (goal selector, workflow demo, phase nav).
 * Runs once on the server-rendered markup; returns a cleanup for React effects.
 */
type Stage = {
  app: string; label: string; title: string; k1: string; v1: string; k2: string; v2: string; foot: string;
  h: string; p: string; link: string; href: string;
};

const GOALS: Record<string, { t: string; c: string }> = {
  website: { t: "Start with a website that makes your value clear.", c: "Build a stronger first impression and a simpler path from visitor to inquiry." },
  leads: { t: "Start with a steady way to reach the right customers.", c: "Know who to contact and what to say, and track every follow-up in one place." },
  automation: { t: "Start by removing one repeated task.", c: "Connect your forms, CRM, email and calendar so routine handoffs happen on their own." },
};

const STAGES: Stage[] = [
  { app: "Your website", label: "New inquiry", title: "“Can you help with my website?”", k1: "Source", v1: "Website project form", k2: "Next step", v2: "Create a contact record →", foot: "A clear first step for your visitor.",
    h: "A website that opens the conversation.", p: "The visitor understands what you do and sends a relevant inquiry. The form collects the details you actually need, so the next step starts with context.", link: "Explore web design", href: "/services#web-design" },
  { app: "Your CRM", label: "Contact created", title: "Sam Rivera · Rivera Landscaping", k1: "Interested in", v1: "New website", k2: "Owner", v2: "Assigned to you →", foot: "Tagged and assigned. Nothing lost in an inbox.",
    h: "Every inquiry lands in one place.", p: "The form creates a contact record with the source, the request and an owner. Nobody retypes details from an email into a spreadsheet.", link: "Explore automation", href: "/services#automation" },
  { app: "Your email + calendar", label: "Follow-up sent", title: "“Thanks, Sam. Pick a time that suits you.”", k1: "Sent", v1: "Minutes after the inquiry", k2: "Next step", v2: "Discovery call booked →", foot: "A fast reply, with your review where it matters.",
    h: "A quick reply, without the scramble.", p: "A personal reply and a booking link go out right away. You approve the messages that need judgment, and the routine ones run on their own.", link: "Explore lead generation", href: "/services#lead-generation" },
  { app: "Your weekly report", label: "This week", title: "Where your inquiries came from", k1: "Top source", v1: "Website form", k2: "Inquiry to booked call", v2: "Tracked automatically", foot: "Decisions based on what's working.",
    h: "See what's bringing in work.", p: "Sources, response times and booked calls roll into one simple report, so you know where to spend next month's effort.", link: "Explore automation", href: "/services#automation" },
];

export function wireHome(root: HTMLElement): () => void {
  const ac = new AbortController();
  const on = <K extends keyof HTMLElementEventMap>(el: Element | null, type: K, fn: (e: HTMLElementEventMap[K]) => void) =>
    el?.addEventListener(type, fn as EventListener, { signal: ac.signal });
  const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel);
  const setText = (id: string, v: string) => { const el = root.querySelector("#" + id); if (el) el.textContent = v; };
  const timeouts: number[] = [];
  let timer: number | null = null;

  // Goal selector
  const goalButtons = Array.from(root.querySelectorAll<HTMLButtonElement>(".goals button"));
  goalButtons.forEach((b) =>
    on(b, "click", () => {
      const g = b.dataset.goal || "website";
      goalButtons.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      root.querySelectorAll<HTMLElement>(".card").forEach((c) => c.classList.toggle("on", c.dataset.service === g));
      setText("goal-title", GOALS[g].t);
      setText("goal-copy", GOALS[g].c);
      const link = $<HTMLAnchorElement>("#goal-link");
      if (link) link.href = "/contact?goal=" + g;
    }),
  );

  // Workflow demo
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>(".steps [role=tab]"));
  const panel = $("#wf-panel");
  const win = $("#win");
  const statusEl = $("#wf-status");
  const runBtn = $<HTMLButtonElement>("#wf-run");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;

  function show(i: number, focus = false) {
    current = i;
    const s = STAGES[i];
    tabs.forEach((t, n) => {
      t.setAttribute("aria-selected", String(n === i));
      t.tabIndex = n === i ? 0 : -1;
    });
    if (focus) tabs[i]?.focus();
    panel?.setAttribute("aria-labelledby", "tab-" + i);
    const apply = () => {
      setText("w-app", s.app); setText("w-label", s.label); setText("w-title", s.title);
      setText("w-k1", s.k1); setText("w-v1", s.v1); setText("w-k2", s.k2); setText("w-v2", s.v2); setText("w-foot", s.foot);
      setText("s-title", s.h); setText("s-copy", s.p);
      const l = $<HTMLAnchorElement>("#s-link");
      if (l) { if (l.firstChild) l.firstChild.nodeValue = s.link + " "; l.href = s.href; }
      win?.classList.remove("swap");
    };
    if (reduce) apply();
    else { win?.classList.add("swap"); timeouts.push(window.setTimeout(apply, 180)); }
  }
  function setRunLabel(t: string) { if (runBtn?.firstChild) runBtn.firstChild.nodeValue = t; }
  function stop() { if (timer) window.clearInterval(timer); timer = null; setRunLabel("Run the example "); }
  const status = (t: string) => { if (statusEl) statusEl.textContent = t; };

  tabs.forEach((t, n) => {
    on(t, "click", () => { stop(); show(n); status("Step " + (n + 1) + " of 4."); });
    on(t, "keydown", (e) => {
      const map: Record<string, number> = { ArrowRight: (n + 1) % 4, ArrowLeft: (n + 3) % 4, Home: 0, End: 3 };
      if (e.key in map) { e.preventDefault(); stop(); show(map[e.key], true); }
    });
  });
  on(runBtn, "click", () => {
    if (timer) { stop(); status("Paused on step " + (current + 1) + "."); return; }
    setRunLabel("Pause ");
    show(0); status("Step 1 of 4: the inquiry arrives.");
    let i = 0;
    timer = window.setInterval(() => {
      i++;
      if (i > 3) { stop(); status("From first click to a weekly report, with no manual handoffs."); return; }
      show(i); status("Step " + (i + 1) + " of 4.");
    }, 2800);
  });

  // Process nav follows scroll
  let io: IntersectionObserver | null = null;
  const phaseLinks = root.querySelectorAll(".phase-nav a");
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        phaseLinks.forEach((a) => {
          if (a.getAttribute("href") === "#" + en.target.id) a.setAttribute("aria-current", "step");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    root.querySelectorAll(".chapter").forEach((c) => io!.observe(c));
  }

  return () => {
    ac.abort();
    if (timer) window.clearInterval(timer);
    timeouts.forEach((t) => window.clearTimeout(t));
    io?.disconnect();
  };
}
