
(function () {
  var BASE = "";

  // Mobile menu
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.getElementById("main-nav");
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
  });

  // Goal selector (copy-deck §3: after-hours / website / seo)
  var goals = {
    "after-hours": { t: "Start with after-hours capture that books the job.", c: "When you\u2019re on a roof or in a truck, the phone still rings. We catch it, qualify it, and get it on the calendar \u2014 before they call the next name in Kennewick.", l: "Talk about after-hours booking " },
    website: { t: "Start with a site built for Tri-Cities trades.", c: "Fast, clear, mobile-first. Hours, service area, and a path to call or book \u2014 not a brochure that dies at midnight.", l: "Talk about the site " },
    seo: { t: "Start with local SEO that matches how people search here.", c: "Richland, Kennewick, Pasco. Google Business Profile, the queries your customers actually type, and a site that can rank for them.", l: "Talk about local SEO " }
  };
  document.querySelectorAll(".goals button").forEach(function (b) {
    b.addEventListener("click", function () {
      var g = b.dataset.goal;
      document.querySelectorAll(".goals button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      document.querySelectorAll(".card").forEach(function (c) { c.classList.toggle("on", c.dataset.service === g); });
      document.getElementById("goal-title").textContent = goals[g].t;
      document.getElementById("goal-copy").textContent = goals[g].c;
      var gl = document.getElementById("goal-link");
      gl.firstChild.nodeValue = goals[g].l;
      gl.href = BASE + "#contact"; gl.dataset.goal = g;
    });
  });

  // Workflow demo (illustrative \u2014 Ken Rivera / Rivera Landscaping is fictional)
  var stages = [
    { app: "Your website", label: "After-hours inquiry", title: "\u201cDo you do emergency AC in Pasco?\u201d", k1: "Source", v1: "Mobile site \u00b7 8:40pm", k2: "Next step", v2: "Route to after-hours book \u2192", foot: "A clear first step when nobody\u2019s at the shop.",
      kicker: "01 / Capture", h: "A clear first step when nobody\u2019s at the shop.", p: "The visitor sees hours, service area, and a book path that still works at night. Form grabs job type, address, and callback \u2014 not a dead contact form.", link: "Explore sites", href: "#card-capture" },
    { app: "Your CRM", label: "Job logged", title: "Ken Rivera \u00b7 Rivera Landscaping (Kennewick)", k1: "Interested in", v1: "Fall cleanup \u00b7 Kennewick", k2: "Owner", v2: "Assigned to you \u2192", foot: "Tagged and owned. Nothing dies in a voicemail.",
      kicker: "02 / Organize", h: "Tagged and owned. Nothing dies in a voicemail.", p: "Every inquiry lands as a contact with source, job type, and owner. No retyping from a missed call into a notebook.", link: "Explore after-hours booking", href: "#card-simplify" },
    { app: "Your phone + calendar", label: "Slot offered", title: "\u201cKen \u2014 Tuesday 7am works. Confirm?\u201d", k1: "Sent", v1: "Minutes after the inquiry", k2: "Next step", v2: "Job on the calendar \u2192", foot: "Warm follow-up. You approve anything that needs judgment.",
      kicker: "03 / Follow up", h: "Warm follow-up. You approve anything that needs judgment.", p: "A short reply and a booking link go out while they\u2019re still thinking about it. Routine messages can run; judgment stays with you.", link: "Explore after-hours booking", href: "#card-simplify" },
    { app: "Your weekly report", label: "This week", title: "Where the jobs came from", k1: "Top source", v1: "After-hours site form", k2: "Booked", v2: "Tracked automatically", foot: "Spend next month where it actually worked.",
      kicker: "04 / Measure", h: "Spend next month where it actually worked.", p: "Sources, response time, and booked jobs in one simple report \u2014 so you know whether SEO, the site, or after-hours capture earned the week.", link: "Explore local SEO", href: "#card-connect" }
  ];
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".steps [role=tab]"));
  var panel = document.getElementById("wf-panel");
  var win = document.getElementById("win");
  var statusEl = document.getElementById("wf-status");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var current = 0, timer = null;
  function set(id, v) { document.getElementById(id).textContent = v; }
  function show(i, focus) {
    current = i;
    var s = stages[i];
    tabs.forEach(function (t, n) {
      t.setAttribute("aria-selected", String(n === i));
      t.tabIndex = n === i ? 0 : -1;
    });
    if (focus) tabs[i].focus();
    panel.setAttribute("aria-labelledby", "tab-" + i);
    var apply = function () {
      set("w-app", s.app); set("w-label", s.label); set("w-title", s.title);
      set("w-k1", s.k1); set("w-v1", s.v1); set("w-k2", s.k2); set("w-v2", s.v2); set("w-foot", s.foot);
      set("s-kicker", s.kicker); set("s-title", s.h); set("s-copy", s.p);
      var l = document.getElementById("s-link");
      l.firstChild.nodeValue = s.link + " ";
      l.href = BASE + s.href;
      win.classList.remove("swap");
    };
    if (reduce) { apply(); } else { win.classList.add("swap"); setTimeout(apply, 180); }
  }
  function stop() { clearInterval(timer); timer = null; document.getElementById("wf-run").firstChild.nodeValue = "Run the after-hours example "; }
  tabs.forEach(function (t, n) {
    t.addEventListener("click", function () { stop(); show(n); statusEl.textContent = "Step " + (n + 1) + " of 4."; });
    t.addEventListener("keydown", function (e) {
      var k = e.key, next = null;
      if (k === "ArrowRight") next = (n + 1) % 4;
      if (k === "ArrowLeft") next = (n + 3) % 4;
      if (k === "Home") next = 0;
      if (k === "End") next = 3;
      if (next !== null) { e.preventDefault(); stop(); show(next, true); }
    });
  });
  document.getElementById("wf-run").addEventListener("click", function () {
    if (timer) { stop(); statusEl.textContent = "Paused on step " + (current + 1) + "."; return; }
    var btn = this;
    btn.firstChild.nodeValue = "Pause ";
    show(0); statusEl.textContent = "Step 1 of 4: the after-hours inquiry arrives.";
    var i = 0;
    timer = setInterval(function () {
      i++;
      if (i > 3) { stop(); statusEl.textContent = "From missed call to booked job \u2014 with you still on the tools."; return; }
      show(i); statusEl.textContent = "Step " + (i + 1) + " of 4.";
    }, 2800);
  });

  // Process nav follows scroll
  var phaseLinks = document.querySelectorAll(".phase-nav a");
  var chapters = Array.prototype.slice.call(document.querySelectorAll(".chapter"));
  function markPhase() {
    if (!chapters.length) return;
    var line = window.innerHeight * 0.35, idx = 0;
    chapters.forEach(function (c, i) { if (c.getBoundingClientRect().top <= line) idx = i; });
    var id = chapters[idx].id;
    phaseLinks.forEach(function (a) {
      if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "step");
      else a.removeAttribute("aria-current");
    });
  }
  var spyTick = false;
  window.addEventListener("scroll", function () {
    if (spyTick) return; spyTick = true;
    requestAnimationFrame(function () { spyTick = false; markPhase(); });
  }, { passive: true });
  window.addEventListener("resize", markPhase);
  markPhase();

  // Copy email
  document.getElementById("copy-mail").addEventListener("click", function () {
    var btn = this, text = document.getElementById("mail").textContent;
    function done() { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1600); }
    function fallback() {
      var r = document.createRange(); r.selectNodeContents(document.getElementById("mail"));
      var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
      btn.textContent = "Selected";
    }
    try { navigator.clipboard.writeText(text).then(done, fallback); } catch (e) { fallback(); }
  });

})();
