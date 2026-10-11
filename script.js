(function () {
  "use strict";

  var S = window.SITE;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function norm(s) { return s.toLowerCase().replace(/[^a-z0-9#+.]/g, ""); }
  function flash(node) {
    node.classList.remove("flash");
    void node.offsetWidth;
    node.classList.add("flash");
    setTimeout(function () { node.classList.remove("flash"); }, 1600);
  }
  function scrollToEl(node, block) { node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: block || "center" }); }
  var ARROW = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var CHEV = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  var openSearch = function () {};
  var copyEmail = function () {};
  var openProject = function () {};
  var selectExp = function () {};

  /* ---------- Reveal on scroll ---------- */
  var revealIO = null;
  if ("IntersectionObserver" in window) {
    revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  }
  function reveal(node) {
    node.classList.add("reveal");
    if (revealIO) revealIO.observe(node); else node.classList.add("in");
  }
  $$(".reveal").forEach(function (n) { if (revealIO) revealIO.observe(n); else n.classList.add("in"); });

  /* ---------- Ambient: spotlight, cursor glow, magnetic buttons ---------- */
  document.addEventListener("pointermove", function (e) {
    var g = e.target.closest && e.target.closest(".glass, .pcard");
    if (g) {
      var r = g.getBoundingClientRect();
      g.style.setProperty("--mx", (e.clientX - r.left) + "px");
      g.style.setProperty("--my", (e.clientY - r.top) + "px");
    }
  }, { passive: true });

  if (canHover && !reduce) {
    var glow = $("#cursorGlow"), gx = -999, gy = -999, tx = 0, ty = 0, graf = 0;
    document.addEventListener("pointermove", function (e) {
      tx = e.clientX; ty = e.clientY;
      glow.classList.add("on");
      if (!graf) graf = requestAnimationFrame(glowLoop);
    }, { passive: true });
    document.addEventListener("pointerleave", function () { glow.classList.remove("on"); });
    var glowLoop = function () {
      gx += (tx - gx) * 0.14; gy += (ty - gy) * 0.14;
      glow.style.transform = "translate3d(" + gx.toFixed(1) + "px," + gy.toFixed(1) + "px,0)";
      graf = (Math.abs(tx - gx) + Math.abs(ty - gy) > 0.5) ? requestAnimationFrame(glowLoop) : 0;
    };

    $$(".magnetic").forEach(function (b) {
      b.style.transition = "transform 0.25s ease-out, box-shadow 0.3s, background 0.3s, border-color 0.3s, color 0.3s";
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        b.style.transform = "translate(" + (dx * 0.18).toFixed(1) + "px," + (dy * 0.28).toFixed(1) + "px)";
      });
      b.addEventListener("pointerleave", function () { b.style.transform = ""; });
    });

    var hv = $("#heroVisual"), tilt = $("#tilt");
    hv.addEventListener("pointermove", function (e) {
      var r = hv.getBoundingClientRect();
      var nx = ((e.clientX - r.left) / r.width) * 2 - 1, ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      tilt.style.setProperty("--ry", (nx * 9).toFixed(2) + "deg");
      tilt.style.setProperty("--rx", (-ny * 7).toFixed(2) + "deg");
      tilt.style.setProperty("--px", nx.toFixed(3));
      tilt.style.setProperty("--py", ny.toFixed(3));
    });
    hv.addEventListener("pointerleave", function () {
      ["--ry", "--rx", "--px", "--py"].forEach(function (v) { tilt.style.setProperty(v, "0"); });
      tilt.style.setProperty("--ry", "0deg"); tilt.style.setProperty("--rx", "0deg");
    });
  }

  /* ---------- Navigation ---------- */
  var navLinks = $("#navLinks"), menuBtn = $("#menuBtn"), progress = $("#progress"), pill = $("#navPill");
  var links = $$("a", navLinks);
  var ticking = false;
  function onScroll() {
    ticking = false;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = "scaleX(" + (max > 0 ? Math.min(1, window.scrollY / max) : 0).toFixed(4) + ")";
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  function activeLink() { return links.filter(function (a) { return a.getAttribute("aria-current") === "true"; })[0] || null; }
  function movePill(a) {
    if (!a || !a.offsetWidth || getComputedStyle(pill).display === "none") { pill.style.opacity = "0"; return; }
    pill.style.width = a.offsetWidth + "px";
    pill.style.height = a.offsetHeight + "px";
    pill.style.transform = "translate(" + a.offsetLeft + "px," + a.offsetTop + "px)";
    pill.style.opacity = "1";
  }
  links.forEach(function (a) {
    a.addEventListener("mouseenter", function () { movePill(a); });
    a.addEventListener("focus", function () { movePill(a); });
    a.addEventListener("click", function () { navLinks.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); });
  });
  navLinks.addEventListener("mouseleave", function () { movePill(activeLink()); });
  window.addEventListener("resize", function () { movePill(activeLink()); });
  menuBtn.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  if ("IntersectionObserver" in window) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.setAttribute("aria-current", a.getAttribute("href") === "#" + en.target.id ? "true" : "false"); });
        movePill(activeLink());
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ["top", "about", "experience", "projects", "skills", "contact"].forEach(function (id) { var n = document.getElementById(id); if (n) navIO.observe(n); });
  }

  /* ---------- Hero: typed phrases ---------- */
  (function typed() {
    var node = $("#typed"), words = S.phrases || [];
    if (!node || !words.length) return;
    if (reduce) { node.textContent = words[0]; return; }
    var w = 0, c = 0, del = false;
    function step() {
      var word = words[w];
      if (!del) {
        c++; node.textContent = word.slice(0, c);
        if (c === word.length) { del = true; setTimeout(step, 1900); return; }
        setTimeout(step, 68);
      } else {
        c--; node.textContent = word.slice(0, c);
        if (c === 0) { del = false; w = (w + 1) % words.length; setTimeout(step, 320); return; }
        setTimeout(step, 34);
      }
    }
    setTimeout(step, 1000);
  })();

  /* ---------- Skills strip ---------- */
  (function marquee() {
    var track = $("#marquee");
    if (!track || !S.marquee) return;
    [0, 1].forEach(function () { S.marquee.forEach(function (t) { track.appendChild(el("span", "mi", t)); }); });
  })();

  /* ---------- About: counters and clock ---------- */
  (function about() {
    var total = 0;
    S.skills.forEach(function (g) { total += g.items.length; });
    $("#skillCount").setAttribute("data-count", String(total));
    var nums = $$(".num[data-count]");
    function setNum(n, v) { var d = parseInt(n.getAttribute("data-dec") || "0", 10); n.textContent = v.toFixed(d); }
    function count(n) {
      var target = parseFloat(n.getAttribute("data-count"));
      if (reduce) { setNum(n, target); return; }
      var start = null, dur = 1400;
      function f(t) {
        if (start === null) start = t;
        var p = Math.min(1, (t - start) / dur), e = 1 - Math.pow(1 - p, 3);
        setNum(n, target * e);
        if (p < 1) requestAnimationFrame(f);
      }
      requestAnimationFrame(f);
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { count(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.6 });
      nums.forEach(function (n) { io.observe(n); });
    } else { nums.forEach(count); }

    var clock = $("#clock");
    function tick() {
      try { clock.textContent = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }); }
      catch (e) { clock.textContent = "--:--"; }
    }
    tick(); setInterval(tick, 20000);
  })();

  /* ---------- Experience timeline ---------- */
  var tlEl = $("#timeline");
  var expItems = [];
  S.experience.forEach(function (e, i) {
    var li = el("li", "tl-item");
    li.id = "exp-" + e.id;
    var card = el("div", "tl-card glass");
    card.setAttribute("data-open", i === 0 ? "true" : "false");
    var head = el("button", "tl-head");
    head.type = "button";
    head.setAttribute("aria-expanded", i === 0 ? "true" : "false");
    head.setAttribute("aria-controls", "tl-body-" + e.id);
    var left = el("span");
    left.appendChild(el("span", "tl-title", e.tab));
    left.appendChild(el("span", "tl-org", e.org));
    var right = el("span", "tl-right");
    right.appendChild(el("span", "tl-when", e.when));
    var ch = el("span", "chev"); ch.innerHTML = CHEV;
    right.appendChild(ch);
    head.appendChild(left); head.appendChild(right);
    var sum = el("p", "tl-sum", e.summary);
    var body = el("div", "tl-body"); body.id = "tl-body-" + e.id;
    var inner = el("div", "tl-inner");
    var pad = el("div", "tl-pad");
    var ul = el("ul", "points");
    e.points.forEach(function (p) { ul.appendChild(el("li", "", p)); });
    pad.appendChild(ul);
    if (e.tags.length) {
      var tg = el("ul", "tags"); tg.setAttribute("aria-label", "Technologies");
      e.tags.forEach(function (t) { tg.appendChild(el("li", "", t)); });
      pad.appendChild(tg);
    }
    inner.appendChild(pad); body.appendChild(inner);
    card.appendChild(head); card.appendChild(sum); card.appendChild(body);
    li.appendChild(card);
    tlEl.appendChild(li);
    reveal(li);
    head.addEventListener("click", function () {
      var open = card.getAttribute("data-open") === "true";
      card.setAttribute("data-open", open ? "false" : "true");
      head.setAttribute("aria-expanded", open ? "false" : "true");
    });
    expItems.push({ li: li, card: card, head: head });
  });
  selectExp = function (i) {
    var it = expItems[i];
    it.card.setAttribute("data-open", "true");
    it.head.setAttribute("aria-expanded", "true");
  };
  (function timelineProgress() {
    var tk = false;
    function update() {
      tk = false;
      var mark = window.innerHeight * 0.6;
      var b = tlEl.getBoundingClientRect();
      tlEl.style.setProperty("--p", Math.min(1, Math.max(0, (mark - b.top) / b.height)).toFixed(4));
      expItems.forEach(function (it) { it.li.classList.toggle("reached", it.li.getBoundingClientRect().top < mark); });
    }
    window.addEventListener("scroll", function () { if (!tk) { tk = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  })();

  /* ---------- Projects ---------- */
  var P = S.projects;
  var pgrid = $("#pgrid");
  var pcards = [];
  P.forEach(function (p, i) {
    var card = el("article", "pcard");
    var media = el("div", "pc-media");
    var img = el("img");
    img.src = p.image; img.alt = p.alt; img.width = 1312; img.height = 736;
    if (i > 0) img.loading = "lazy";
    media.appendChild(img);
    card.appendChild(media);
    card.appendChild(el("div", "pc-shade"));
    card.appendChild(el("div", "pc-spot"));
    var body = el("div", "pc-body");
    body.appendChild(el("span", "pc-when", p.when));
    body.appendChild(el("h3", "", p.name));
    body.appendChild(el("p", "pc-kind", p.kind));
    body.appendChild(el("p", "pc-sum", p.summary));
    var foot = el("div", "pc-foot");
    var tg = el("ul", "tags");
    p.tags.slice(0, 4).forEach(function (t) { tg.appendChild(el("li", "", t)); });
    var arrow = el("button", "pc-arrow");
    arrow.type = "button";
    arrow.setAttribute("aria-label", "View details for " + p.name);
    arrow.innerHTML = ARROW;
    foot.appendChild(tg); foot.appendChild(arrow);
    body.appendChild(foot);
    card.appendChild(body);
    card.addEventListener("click", function () { openProject(i); });
    reveal(card);
    card.style.setProperty("--d", (i * 0.08) + "s");
    pgrid.appendChild(card);
    pcards.push(card);
  });

  var pd = $("#projectDialog"), pdBody = $("#pdBody"), pdIndex = 0;
  function renderProject() {
    var p = P[pdIndex];
    pdBody.textContent = "";
    var fig = el("div", "pd-img");
    var img = el("img"); img.src = p.image; img.alt = p.alt;
    fig.appendChild(img);
    var body = el("div", "pd-body");
    body.appendChild(el("span", "pc-when", p.when));
    body.appendChild(el("h3", "", p.name));
    body.appendChild(el("p", "pd-sum", p.summary));
    body.appendChild(el("p", "pd-sub", "What I built"));
    var ul = el("ul", "points");
    p.points.forEach(function (t) { ul.appendChild(el("li", "", t)); });
    body.appendChild(ul);
    var tg = el("ul", "tags"); tg.setAttribute("aria-label", "Technologies");
    p.tags.forEach(function (t) { tg.appendChild(el("li", "", t)); });
    body.appendChild(tg);
    var link = el("p", "pd-link");
    if (p.repo) {
      var a = el("a", "", "View the code on GitHub");
      a.href = p.repo; a.target = "_blank"; a.rel = "noopener";
      link.appendChild(a);
    } else { link.textContent = "Repository coming soon."; }
    body.appendChild(link);
    var foot = el("div", "pd-nav");
    var prev = el("button", "btn btn-glass", "Previous: " + P[(pdIndex - 1 + P.length) % P.length].name);
    var next = el("button", "btn btn-glass", "Next: " + P[(pdIndex + 1) % P.length].name);
    prev.type = next.type = "button";
    prev.addEventListener("click", function () { pdIndex = (pdIndex - 1 + P.length) % P.length; renderProject(); pd.scrollTop = 0; });
    next.addEventListener("click", function () { pdIndex = (pdIndex + 1) % P.length; renderProject(); pd.scrollTop = 0; });
    foot.appendChild(prev); foot.appendChild(next);
    pdBody.appendChild(fig); pdBody.appendChild(body); pdBody.appendChild(foot);
  }
  openProject = function (i) {
    pdIndex = ((i % P.length) + P.length) % P.length;
    renderProject();
    if (typeof pd.showModal === "function") { if (!pd.open) pd.showModal(); } else pd.setAttribute("open", "");
    document.body.style.overflow = "hidden";
    pd.scrollTop = 0;
  };
  pd.addEventListener("close", function () { document.body.style.overflow = ""; });
  $("#pdClose").addEventListener("click", function () { pd.close(); });
  pd.addEventListener("click", function (e) { if (e.target === pd) pd.close(); });

  /* ---------- Skills explorer ---------- */
  var linkables = [];
  S.experience.forEach(function (e, i) { linkables.push({ kind: "exp", i: i, ref: e.ref, skills: e.skills, node: expItems[i].li }); });
  S.projects.forEach(function (p, i) { linkables.push({ kind: "project", i: i, ref: p.name, skills: p.skills, node: pcards[i] }); });
  linkables.forEach(function (l) { l.set = {}; l.skills.forEach(function (s) { l.set[norm(s)] = true; }); });

  var catsEl = $("#cats"), cloud = $("#skillCloud"), usage = $("#usage");
  var catBtns = [];
  var cats = ["All"].concat(S.skills.map(function (g) { return g.name; }));
  function itemsFor(i) {
    if (i === 0) { var all = []; S.skills.forEach(function (g) { g.items.forEach(function (x) { all.push(x); }); }); return all; }
    return S.skills[i - 1].items;
  }
  function tabKeys(e, tabs, i, select) {
    var n = tabs.length, next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next !== null) { e.preventDefault(); select(next, true); }
  }
  cats.forEach(function (name, i) {
    var b = el("button", "cat");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", "false");
    b.tabIndex = -1;
    b.appendChild(el("span", "", name));
    b.appendChild(el("span", "cat-n", String(itemsFor(i).length)));
    b.addEventListener("click", function () { selectCat(i, false); });
    b.addEventListener("keydown", function (e) { tabKeys(e, catBtns, i, selectCat); });
    catsEl.appendChild(b);
    catBtns.push(b);
  });
  function setUsage(parts, hits) {
    usage.textContent = "";
    var t = el("span", "usage-text");
    parts.forEach(function (p) {
      if (typeof p === "string") t.appendChild(document.createTextNode(p));
      else t.appendChild(el("strong", "", p.strong));
    });
    usage.appendChild(t);
    (hits || []).forEach(function (l) {
      var b = el("button", "usage-link", l.ref);
      b.type = "button";
      b.addEventListener("click", function () { goToLink(l); });
      usage.appendChild(b);
    });
  }
  function clearLinks() { linkables.forEach(function (l) { l.node.classList.remove("is-linked"); }); }
  function goToLink(l) {
    if (l.kind === "exp") { selectExp(l.i); scrollToEl(l.node); flash(l.node.firstChild); }
    else { openProject(l.i); }
  }
  function selectCat(i, focus) {
    catBtns.forEach(function (t, j) { t.setAttribute("aria-selected", String(j === i)); t.tabIndex = j === i ? 0 : -1; });
    cloud.textContent = "";
    clearLinks();
    setUsage(["Nothing selected yet."]);
    itemsFor(i).forEach(function (name, k) {
      var li = el("li");
      var b = el("button", "skill", name);
      b.type = "button";
      b.setAttribute("aria-pressed", "false");
      var n = norm(name);
      if (linkables.some(function (l) { return l.set[n]; })) b.classList.add("has-usage");
      if (!reduce) { b.classList.add("pop"); b.style.animationDelay = (k * 16) + "ms"; }
      b.addEventListener("click", function () { pickSkill(b, name); });
      li.appendChild(b);
      cloud.appendChild(li);
    });
    if (focus) catBtns[i].focus();
  }
  function pickSkill(btn, name) {
    var was = btn.getAttribute("aria-pressed") === "true";
    $$(".skill", cloud).forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
    clearLinks();
    if (was) { setUsage(["Nothing selected yet."]); return; }
    btn.setAttribute("aria-pressed", "true");
    var n = norm(name);
    var hits = linkables.filter(function (l) { return l.set[n]; });
    hits.forEach(function (l) { l.node.classList.add("is-linked"); });
    if (!hits.length) { setUsage([{ strong: name }, " is on my résumé, but it isn't tied to a specific role or project on this page."]); return; }
    setUsage([{ strong: name }, " appears in:"], hits);
  }
  selectCat(0, false);

  /* ---------- Contact ---------- */
  (function contact() {
    var btn = $("#copyBtn"), status = $("#copyStatus"), timer = null;
    function flashLabel(label, msg) {
      btn.textContent = label; status.textContent = msg;
      clearTimeout(timer);
      timer = setTimeout(function () { btn.textContent = "Copy email"; status.textContent = ""; }, 2000);
    }
    function fallback() {
      try {
        var ta = document.createElement("textarea");
        ta.value = S.email; ta.setAttribute("readonly", "");
        ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        var ok = document.execCommand("copy");
        document.body.removeChild(ta);
        if (ok) flashLabel("Copied", "Email address copied"); else flashLabel("Copy failed", "Copy failed. Select the address and copy it manually.");
      } catch (e) { flashLabel("Copy failed", "Copy failed. Select the address and copy it manually."); }
    }
    copyEmail = function () {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(S.email).then(function () { flashLabel("Copied", "Email address copied"); }, fallback);
      else fallback();
    };
    btn.addEventListener("click", copyEmail);

    var form = $("#contactForm"), note = $("#formNote");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#cfName").value.trim(), from = $("#cfEmail").value.trim(), msg = $("#cfMsg").value.trim();
      var field = $("#cfMsg").closest(".field");
      if (!msg) {
        field.classList.add("invalid");
        note.textContent = "Write a short message first, then try again.";
        $("#cfMsg").focus();
        return;
      }
      field.classList.remove("invalid");
      var body = msg + (name || from ? "\n\n" + [name, from].filter(Boolean).join(", ") : "");
      window.location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent("Hello from your portfolio") + "&body=" + encodeURIComponent(body);
      note.textContent = "Opening your email app. If nothing opens, write to " + S.email + ".";
    });
    $("#cfMsg").addEventListener("input", function () { $("#cfMsg").closest(".field").classList.remove("invalid"); });
  })();

  /* ---------- Command palette: actions + search ---------- */
  (function palette() {
    var dlg = $("#searchDialog"), input = $("#q"), resultsEl = $("#results"), suggestEl = $("#suggest");
    var resumeLink = $("[data-resume]");
    var STOP = {};
    "the a an and or of to in on for with my me i is are do you what how where did have has using use about does can".split(" ").forEach(function (w) { STOP[w] = true; });
    var ALIAS = {
      auth: ["authentication", "authorization", "azure"], db: ["database", "sql"], database: ["sql", "postgresql", "mongodb"], databases: ["sql", "postgresql", "mongodb"],
      rag: ["retrieval", "augmented"], ai: ["llm", "rag", "agentic"], search: ["elasticsearch", "semantic", "retrieval"], vector: ["embedding", "pgvector", "chromadb"],
      cloud: ["azure", "docker"], api: ["rest", "apis"], backend: ["api", "fastapi", "node", "express", "nestjs"], frontend: ["react", "next", "angular"],
      agent: ["agentic"], agents: ["agentic"], docs: ["document"], documents: ["document", "pdf", "docx"], nodejs: ["node", "js"], nextjs: ["next", "js"], dotnet: ["net"],
      email: ["email", "contact"], contact: ["email", "contact"], degree: ["computer", "science", "chandigarh"], college: ["chandigarh", "university"], education: ["chandigarh", "university", "cgpa"]
    };
    var SUGGEST = ["Elasticsearch", "RAG", "Authentication", "Docker", "Python", ".NET", "Education"];

    function jump(hash) { var n = $(hash); if (n) scrollToEl(n, "start"); }
    var ACTIONS = [
      { label: "Go to About", hint: "", run: function () { jump("#about"); } },
      { label: "Go to Experience", hint: "", run: function () { jump("#experience"); } },
      { label: "Go to Projects", hint: "", run: function () { jump("#projects"); } },
      { label: "Go to Skills", hint: "", run: function () { jump("#skills"); } },
      { label: "Go to Contact", hint: "", run: function () { jump("#contact"); } },
      { label: "Copy email address", hint: "Action", run: function () { copyEmail(); } },
      { label: "Open LinkedIn", hint: "Opens a new tab", run: function () { window.open(S.linkedin, "_blank", "noopener"); } },
      { label: "Open GitHub", hint: "Opens a new tab", run: function () { window.open(S.github, "_blank", "noopener"); } }
    ];
    if (resumeLink) ACTIONS.splice(5, 0, { label: "Download résumé", hint: "Action", run: function () { resumeLink.click(); } });

    function stem(w) {
      if (w.length > 4 && /ies$/.test(w)) return w.replace(/ies$/, "y");
      if (w.length > 3 && /s$/.test(w) && !/ss$/.test(w)) return w.slice(0, -1);
      return w;
    }
    function tokenize(s) { return (s.toLowerCase().match(/[a-z0-9#+]+/g) || []); }

    var chunks = [];
    function add(text, source, target) {
      text = (text || "").replace(/\s+/g, " ").trim();
      if (!text) return;
      var counts = {};
      tokenize(text).map(stem).forEach(function (s) { counts[s] = (counts[s] || 0) + 1; });
      var src = {};
      tokenize(source).forEach(function (s) { src[stem(s)] = true; });
      chunks.push({ text: text, source: source, target: target, counts: counts, src: src });
    }
    $$("[data-source]").forEach(function (sec) {
      $$(".chunk", sec).forEach(function (c) { add(c.textContent, sec.getAttribute("data-source"), { type: "dom", el: c }); });
    });
    add("Email: " + S.email, "Contact", { type: "dom", el: $("#emailLink") });
    S.experience.forEach(function (e, i) {
      var src = "Experience: " + e.tab, t = { type: "exp", i: i };
      add(e.tab + ", " + e.org + ". " + e.when + ".", src, t);
      add(e.summary, src, t);
      e.points.forEach(function (p) { add(p, src, t); });
      if (e.tags.length) add(e.tags.join(", "), src, t);
    });
    P.forEach(function (p, i) {
      var src = "Projects: " + p.name, t = { type: "project", i: i };
      add(p.name + ", " + p.kind + ". " + p.when + ".", src, t);
      add(p.summary, src, t);
      p.points.forEach(function (x) { add(x, src, t); });
      add(p.tags.join(", "), src, t);
    });
    S.skills.forEach(function (g, gi) { add(g.name + ": " + g.items.join(", "), "Skills: " + g.name, { type: "skills", cat: gi + 1 }); });

    var df = {};
    chunks.forEach(function (c) { Object.keys(c.counts).forEach(function (s) { df[s] = (df[s] || 0) + 1; }); });
    function idf(s) { return Math.log(1 + chunks.length / (df[s] || 0.5)); }
    function queryStems(q) {
      var set = {};
      tokenize(q).forEach(function (t) {
        if (t.length < 2 || STOP[t]) return;
        set[stem(t)] = true;
        (ALIAS[t] || []).forEach(function (a) { set[stem(a)] = true; });
      });
      return Object.keys(set);
    }
    function run(q) {
      var qs = queryStems(q);
      if (!qs.length) return { qs: qs, hits: [] };
      var hits = chunks.map(function (c) {
        var score = 0, matched = 0;
        qs.forEach(function (s) {
          var tf = c.counts[s] || 0;
          if (tf) { score += idf(s) * (1 + Math.log(tf)); matched++; }
          if (c.src[s]) score += idf(s) * 0.8;
        });
        if (!score) return null;
        return { c: c, score: score * (0.5 + 0.5 * (matched / qs.length)) };
      }).filter(Boolean).sort(function (a, b) { return b.score - a.score; }).slice(0, 6);
      return { qs: qs, hits: hits };
    }
    function highlightInto(node, text, qs) {
      var set = {};
      qs.forEach(function (s) { set[s] = true; });
      var re = /[A-Za-z0-9#+]+/g, last = 0, m;
      while ((m = re.exec(text))) {
        if (m.index > last) node.appendChild(document.createTextNode(text.slice(last, m.index)));
        if (set[stem(m[0].toLowerCase())]) node.appendChild(el("mark", "", m[0]));
        else node.appendChild(document.createTextNode(m[0]));
        last = m.index + m[0].length;
      }
      if (last < text.length) node.appendChild(document.createTextNode(text.slice(last)));
    }
    function go(t) {
      dlg.close();
      setTimeout(function () {
        if (t.type === "exp") { selectExp(t.i); scrollToEl(expItems[t.i].li); flash(expItems[t.i].card); }
        else if (t.type === "project") { openProject(t.i); }
        else if (t.type === "skills") { selectCat(t.cat, false); scrollToEl($("#skillCloud")); flash($(".explorer")); }
        else { scrollToEl(t.el); flash(t.el); }
      }, 60);
    }
    function actionRow(a) {
      var li = el("li");
      var b = el("button", "result action");
      b.type = "button";
      b.appendChild(el("span", "result-text", a.label));
      if (a.hint) b.appendChild(el("span", "action-hint", a.hint));
      b.addEventListener("click", function () { dlg.close(); setTimeout(a.run, 60); });
      li.appendChild(b);
      return li;
    }
    function render() {
      var q = input.value.trim();
      resultsEl.textContent = "";
      if (!q) {
        suggestEl.hidden = false;
        resultsEl.appendChild(el("li", "group", "Jump to"));
        ACTIONS.forEach(function (a) { resultsEl.appendChild(actionRow(a)); });
        return;
      }
      var ql = q.toLowerCase();
      var acts = ACTIONS.filter(function (a) { return a.label.toLowerCase().indexOf(ql) > -1; }).slice(0, 3);
      var r = run(q);
      if (!acts.length && !r.hits.length) {
        resultsEl.appendChild(el("li", "palette-msg", "No match for \u201C" + q + "\u201D. Try Elasticsearch, RAG, Docker or Python."));
        suggestEl.hidden = false;
        return;
      }
      suggestEl.hidden = true;
      if (acts.length) {
        resultsEl.appendChild(el("li", "group", "Actions"));
        acts.forEach(function (a) { resultsEl.appendChild(actionRow(a)); });
      }
      if (r.hits.length) {
        resultsEl.appendChild(el("li", "group", "Matches"));
        r.hits.forEach(function (h) {
          var li = el("li");
          var b = el("button", "result");
          b.type = "button";
          b.appendChild(el("span", "result-source", h.c.source));
          var tx = el("span", "result-text");
          highlightInto(tx, h.c.text, r.qs);
          b.appendChild(tx);
          b.addEventListener("click", function () { go(h.c.target); });
          li.appendChild(b);
          resultsEl.appendChild(li);
        });
      }
    }
    SUGGEST.forEach(function (s) {
      var c = el("button", "chip", s);
      c.type = "button";
      c.addEventListener("click", function () { input.value = s; render(); input.focus(); });
      suggestEl.appendChild(c);
    });
    openSearch = function (prefill) {
      if (typeof dlg.showModal === "function") { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute("open", "");
      input.value = typeof prefill === "string" ? prefill : "";
      render();
      input.focus();
    };
    $("#openSearch").addEventListener("click", function () { openSearch(); });
    $$("[data-q]").forEach(function (b) { b.addEventListener("click", function () { openSearch(b.getAttribute("data-q")); }); });
    $("#closeSearch").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    input.addEventListener("input", render);
    input.addEventListener("keydown", function (e) {
      var first = $(".result", resultsEl);
      if (e.key === "ArrowDown" && first) { e.preventDefault(); first.focus(); }
      else if (e.key === "Enter" && first) { e.preventDefault(); first.click(); }
    });
    resultsEl.addEventListener("keydown", function (e) {
      var items = $$(".result", resultsEl), i = items.indexOf(document.activeElement);
      if (i < 0) return;
      if (e.key === "ArrowDown") { e.preventDefault(); (items[i + 1] || items[i]).focus(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (i === 0) input.focus(); else items[i - 1].focus(); }
    });
    document.addEventListener("keydown", function (e) {
      var tag = (document.activeElement && document.activeElement.tagName) || "";
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
      else if (e.key === "/" && !dlg.open && !pd.open && tag !== "INPUT" && tag !== "TEXTAREA") { e.preventDefault(); openSearch(); }
    });
    if (/Mac|iPhone|iPad/.test(navigator.platform || "")) { var k = $("#openSearch kbd"); if (k) k.textContent = "\u2318 K"; }
  })();
})();
