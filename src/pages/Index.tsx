import { useEffect, useRef, useState, type ReactNode } from "react";
import Icon from "@/components/ui/icon";

/* ─── Hooks ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useStagger() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Primitives ─── */
function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan/80 px-3 py-1 rounded-full border border-cyan/15 bg-cyan/5">
      {children}
    </span>
  );
}

function SectionHead({ tag, title, text, center = true }: { tag: ReactNode; title: ReactNode; text?: string; center?: boolean }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal mb-16 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <div className="mb-4">{tag}</div>
      <h2 className="font-manrope text-[2.5rem] md:text-[3.25rem] font-extrabold leading-[1.1] tracking-tight mb-5">{title}</h2>
      {text && <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{text}</p>}
    </div>
  );
}

function Btn({ children, variant = "primary", className = "" }: { children: ReactNode; variant?: "primary" | "outline"; className?: string }) {
  return variant === "primary" ? (
    <button className={`shimmer-btn font-manrope font-bold text-sm px-7 py-3 rounded-full shadow-lg shadow-cyan/20 hover:scale-[1.04] active:scale-95 transition-transform duration-200 ${className}`}>
      {children}
    </button>
  ) : (
    <button className={`flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full border border-white/10 hover:border-cyan/25 hover:bg-cyan/5 glass transition-all duration-200 text-foreground ${className}`}>
      {children}
    </button>
  );
}

/* ─── Header ─── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass shadow-xl" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan to-violet flex items-center justify-center">
            <Icon name="Zap" size={13} className="text-background" />
          </div>
          <span className="font-manrope font-extrabold text-[15px] tracking-tight">AIVisibility</span>
        </div>

        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-muted-foreground">
          {["Product", "Features", "Reports", "Resources", "Contact"].map((t) => (
            <a key={t} href={`#${t.toLowerCase()}`} className="hover:text-foreground transition-colors">{t}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="w-8 h-8 rounded-full border border-white/8 hover:border-cyan/25 flex items-center justify-center transition-all text-muted-foreground hover:text-foreground"
          >
            <Icon name={dark ? "Sun" : "Moon"} size={14} />
          </button>
          <Btn className="hidden sm:inline-flex text-xs px-5 py-2.5">Get Your Report</Btn>
        </div>
      </div>
    </header>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="hero-bg noise-bg relative min-h-[100vh] flex flex-col items-center justify-center text-center px-6 pt-16 pb-8 overflow-hidden">
      <div className="shooting-stars">
        <span /><span /><span /><span /><span />
      </div>

      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-cyan/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/5 w-96 h-96 rounded-full bg-violet/4 blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto animate-fade-in">
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan/80 mb-7 px-4 py-2 rounded-full border border-cyan/15 bg-cyan/5 badge-glow">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          AI Search Readiness Platform
        </div>

        <h1 className="font-manrope text-[3.2rem] md:text-[4.5rem] font-extrabold leading-[1.05] tracking-tight mb-6">
          Make Your Website<br className="hidden md:block" />
          <span className="gradient-text text-glow">Show Up in AI Search</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Understand how AI platforms interpret your website, uncover what limits your visibility, and improve your chances of being cited in AI-generated answers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Btn>Get Your Report</Btn>
          <Btn variant="outline">
            <Icon name="Play" size={14} className="text-cyan" />
            See How It Works
          </Btn>
        </div>

        <p className="mt-10 text-xs text-muted-foreground/70 max-w-md mx-auto">
          Built for teams adapting their websites for ChatGPT, Perplexity, Gemini, and other AI platforms
        </p>
      </div>

      <div className="relative mt-16 w-full max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: "0.35s" }}>
        <div className="gradient-border rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
          <div className="glass rounded-2xl p-5 md:p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <div className="flex-1 ml-3 h-5 rounded bg-white/4 text-[11px] text-muted-foreground/50 flex items-center px-3 font-mono">
                app.aivisibility.io/dashboard
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { label: "Visibility Score", val: "72", delta: "+14", accent: "text-cyan", glow: true },
                { label: "Content Readiness", val: "58%", delta: "+8%", accent: "text-violet" },
                { label: "Schema Coverage", val: "34%", delta: "+12%", accent: "text-emerald" },
                { label: "Issues Found", val: "12", delta: "-5", accent: "text-orange-400" },
              ].map(({ label, val, delta, accent, glow }) => (
                <div key={label} className={`neo-card rounded-xl p-3.5 ${glow ? "pulse-glow" : ""}`}>
                  <p className="text-[10px] text-muted-foreground/60 mb-1.5 truncate">{label}</p>
                  <div className="flex items-end gap-1.5">
                    <span className={`font-manrope text-xl font-bold ${accent}`}>{val}</span>
                    <span className="text-[10px] text-green-400 mb-0.5">{delta}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-3 neo-card rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold text-muted-foreground/60">Readiness by Category</span>
                  <span className="text-[10px] text-cyan/60">This week</span>
                </div>
                {[
                  { l: "Content & Structure", p: 78 },
                  { l: "Technical Access", p: 61 },
                  { l: "Schema & Entities", p: 45 },
                  { l: "Brand Signals", p: 55 },
                  { l: "AI Crawler Setup", p: 38 },
                ].map(({ l, p }) => (
                  <div key={l} className="flex items-center gap-2.5 mb-2 last:mb-0">
                    <span className="text-[10px] text-muted-foreground/50 w-28 truncate">{l}</span>
                    <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-cyan to-violet transition-all duration-1000" style={{ width: `${p}%` }} />
                    </div>
                    <span className="text-[10px] font-medium w-7 text-right">{p}%</span>
                  </div>
                ))}
              </div>
              <div className="col-span-2 neo-card rounded-xl p-4">
                <span className="text-[11px] font-semibold text-muted-foreground/60 block mb-3">Top Issues</span>
                {["Missing schema on 8 pages", "robots.txt blocks AI bots", "No llms.txt detected", "Thin content on 4 URLs"].map((t, i) => (
                  <div key={t} className="flex items-start gap-2 mb-2 last:mb-0">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${i < 2 ? "bg-red-400" : "bg-yellow-400"}`} />
                    <span className="text-[10px] text-muted-foreground/60 leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" style={{ top: "55%" }} />
      </div>
    </section>
  );
}

/* ─── Problem — Split Layout ─── */
function Problem() {
  const ref = useReveal();
  const points = [
    { icon: "EyeOff", text: "Strong SEO does not guarantee AI visibility", color: "text-red-400", bg: "bg-red-500/8 border-red-500/15" },
    { icon: "ListChecks", text: "AI systems choose which sources to include in answers", color: "text-orange-400", bg: "bg-orange-500/8 border-orange-500/15" },
    { icon: "Users", text: "Competitors may appear where your brand does not", color: "text-yellow-400", bg: "bg-yellow-500/8 border-yellow-500/15" },
    { icon: "FileQuestion", text: "Poor structure and missing signals make your site harder to interpret", color: "text-violet", bg: "bg-violet/8 border-violet/15" },
  ];

  return (
    <section ref={ref} className="reveal py-28 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <Tag><Icon name="AlertTriangle" size={10} /> The Problem</Tag>
          <h2 className="font-manrope text-[2.5rem] md:text-[3rem] font-extrabold leading-[1.1] tracking-tight mt-4 mb-5">
            Your Website Might Be <span className="gradient-text">Invisible to AI</span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
            More people are discovering brands through AI tools, not just search engines. If your website is hard for AI systems to access, understand, or trust, it may never appear in the answers your audience sees.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {points.map(({ icon, text, color, bg }) => (
            <div key={text} className={`surface-card rounded-2xl p-5 border ${bg}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${bg}`}>
                <Icon name={icon as "EyeOff"} size={16} className={color} />
              </div>
              <p className="text-[13px] font-semibold leading-snug">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── What Impacts — Asymmetric with featured card ─── */
function WhatImpacts() {
  const ref = useStagger();
  const cats = [
    { icon: "Eye", title: "AI Visibility", desc: "See how discoverable your website is across AI-driven platforms and answer engines.", color: "from-cyan to-blue-500" },
    { icon: "FileText", title: "Content & Structure", desc: "Understand whether your content is clear, useful, and easy for AI systems to interpret.", color: "from-violet to-pink-500" },
    { icon: "Database", title: "Structured Data", desc: "Evaluate how well your schema and JSON-LD help AI understand your pages, entities, and key business information.", color: "from-cyan to-green-400" },
    { icon: "Settings", title: "Technical Access", desc: "Make sure AI crawlers can access your website and understand what matters most.", color: "from-orange-400 to-yellow-400" },
    { icon: "Shield", title: "Brand Signals", desc: "Assess the authority and trust signals that support recognition across AI ecosystems.", color: "from-violet to-cyan" },
  ];

  return (
    <section className="py-28 px-6 dot-grid relative" id="features">
      <div className="max-w-6xl mx-auto">
        <SectionHead
          tag={<Tag><Icon name="Layers" size={10} /> Analysis</Tag>}
          title={<>What Impacts <span className="gradient-text">AI Visibility</span></>}
          text="AI visibility depends on more than rankings. To understand why a website is or isn't showing up in AI answers, you need to look at content, technical access, structure, and trust signals together."
        />

        <div ref={ref} className="stagger-children grid md:grid-cols-12 gap-4">
          <div className="md:col-span-5 surface-card gradient-border rounded-2xl p-7 flex flex-col justify-between min-h-[220px]">
            <div>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cats[0].color} flex items-center justify-center mb-4`}>
                <Icon name={cats[0].icon as "Eye"} size={20} className="text-white" />
              </div>
              <h3 className="font-manrope font-bold text-lg mb-2">{cats[0].title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{cats[0].desc}</p>
            </div>
            <div className="mt-6 h-1 rounded-full bg-gradient-to-r from-cyan/30 to-transparent" />
          </div>

          <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
            {cats.slice(1).map(({ icon, title, desc, color }) => (
              <div key={title} className="surface-card rounded-2xl p-5">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                  <Icon name={icon as "FileText"} size={15} className="text-white" />
                </div>
                <h3 className="font-manrope font-bold text-sm mb-1.5">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Core Feature — Centered with metric cards ─── */
function CoreFeature() {
  const ref = useReveal();
  const points = [
    "Visibility tracking across relevant prompts and topics",
    "Competitor comparison within your niche",
    "Key blockers that reduce discoverability",
    "Clear priorities for improvement",
  ];

  return (
    <section ref={ref} className="reveal py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 hero-bg opacity-50 pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <div className="gradient-border neo-card rounded-3xl p-8 md:p-14">
          <div className="text-center mb-10">
            <Tag><Icon name="BarChart3" size={10} /> Core Pillar</Tag>
            <h2 className="font-manrope text-3xl md:text-[2.75rem] font-extrabold tracking-tight mt-4 mb-3">
              See Where You Stand <span className="gradient-text">in AI Search</span>
            </h2>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4">
              AI Visibility & Competitor Tracking
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Track your visibility across AI-driven experiences, understand where competitors are gaining ground, and uncover what reduces your chances of being cited.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5">
            {points.map((p) => (
              <div key={p} className="flex items-start gap-3 rounded-xl p-4 bg-white/[0.02] border border-white/5 hover:border-cyan/15 transition-colors">
                <Icon name="CheckCircle2" size={15} className="text-cyan mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Core Capabilities — Layered cards with highlight ─── */
const capabilitiesData = [
  {
    icon: "FileCode",
    pillar: "On-Site Pillar",
    title: "Content & Schema Optimization for AI",
    text: "Improve on-site content structure, schema, and JSON-based signals so AI systems can better understand and use your content.",
    points: ["Better content structure and page clarity", "Schema and JSON-LD support", "Stronger on-site organization", "Improved citation readiness"],
    accent: "cyan",
    featured: false,
  },
  {
    icon: "Radar",
    pillar: "Core Pillar",
    title: "AI Visibility & Competitor Tracking",
    text: "Monitor how visible your website and brand are across AI platforms and understand how your presence compares with competitors in your niche.",
    points: ["Cross-platform visibility monitoring", "Competitor benchmarking", "Prompt-based tracking", "Trend detection"],
    accent: "violet",
    featured: true,
  },
  {
    icon: "Bot",
    pillar: "Technical Setup",
    title: "AI Crawler Kit",
    text: "Set up the core files and technical signals that shape how AI crawlers access, read, and interpret your website.",
    points: ["robots.txt", "sitemap", "llms.txt", "AI Info Page"],
    accent: "emerald",
    featured: false,
  },
  {
    icon: "ShoppingBag",
    pillar: "Your Niche",
    title: "Product- and Store-Specific Enhancements",
    text: "Tailor product, store, and niche-specific content so AI systems can use them in comparisons, recommendations, and answer-driven discovery.",
    points: ["Stronger product data structure", "Clearer attributes", "Better comparison readiness", "AI-friendly discovery"],
    accent: "cyan",
    featured: false,
  },
];

function CapabilityCard({ cap }: { cap: typeof capabilitiesData[0] }) {
  const ref = useReveal();
  const accentMap: Record<string, { border: string; iconBg: string; check: string }> = {
    cyan: { border: "border-cyan/20", iconBg: "bg-cyan/10 text-cyan", check: "text-cyan" },
    violet: { border: "border-violet/20", iconBg: "bg-violet/10 text-violet", check: "text-violet" },
    emerald: { border: "border-emerald/20", iconBg: "bg-emerald/10 text-emerald", check: "text-emerald" },
  };
  const a = accentMap[cap.accent];

  return (
    <div
      ref={ref}
      className={`reveal surface-card rounded-2xl overflow-hidden ${cap.featured ? `border ${a.border} bg-gradient-to-r from-violet/[0.03] to-transparent` : ""}`}
    >
      <div className="flex flex-col lg:flex-row gap-6 p-6 md:p-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.iconBg}`}>
              <Icon name={cap.icon as "FileCode"} size={18} />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">{cap.pillar}</p>
              <h3 className="font-manrope font-bold text-base">{cap.title}</h3>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">{cap.text}</p>
        </div>
        <div className="lg:w-56 flex-shrink-0">
          <ul className="space-y-2">
            {cap.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-[13px]">
                <Icon name="Check" size={13} className={`mt-0.5 flex-shrink-0 ${a.check}`} />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {cap.featured && <div className="h-px bg-gradient-to-r from-transparent via-violet/30 to-transparent" />}
    </div>
  );
}

function CoreCapabilities() {
  return (
    <section className="py-28 px-6 relative" id="product">
      <div className="max-w-6xl mx-auto">
        <SectionHead
          tag={<Tag><Icon name="Cpu" size={10} /> Platform</Tag>}
          title={<>Core <span className="gradient-text">Capabilities</span></>}
          text="The platform combines AI visibility analysis, on-site optimization, technical AI crawler setup, and niche-specific enhancements to help websites become easier for AI systems to access, understand, and surface."
        />

        <div className="space-y-4">
          {capabilitiesData.map((cap) => (
            <CapabilityCard key={cap.title} cap={cap} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Reports — Comparison module ─── */
function Reports() {
  const ref = useStagger();
  const plans = [
    {
      title: "Short Report",
      label: "A fast starting point",
      text: "Get a concise snapshot of your website's AI readiness, including the most important issues and practical next steps.",
      items: ["Overall status overview", "Main risk areas", "Essential recommendations", "Clear next steps"],
      cta: "Get Short Report",
      highlight: false,
    },
    {
      title: "Detailed Report",
      label: "A deeper audit",
      text: "Take a closer look at your AI visibility, content clarity, structure, technical setup, and competitive landscape.",
      items: ["Expanded analysis by category", "Detailed issues and explanations", "Prioritized recommendations", "Broader readiness insights"],
      cta: "Get Detailed Report",
      highlight: true,
    },
    {
      title: "Proposal",
      label: "A path to implementation",
      text: "Move from analysis to action with a strategic proposal that includes niche context, competitor comparison, and recommended next steps.",
      items: ["Comparative niche analysis", "Competitive landscape review", "Growth opportunities", "Recommended direction for collaboration"],
      cta: "Request Proposal",
      highlight: false,
    },
  ];

  return (
    <section className="py-28 px-6" id="reports">
      <div className="max-w-6xl mx-auto">
        <SectionHead
          tag={<Tag><Icon name="BarChart3" size={10} /> Reports</Tag>}
          title={<>Choose the Right <span className="gradient-text">Level of Analysis</span></>}
        />

        <div ref={ref} className="stagger-children grid md:grid-cols-3 gap-5">
          {plans.map(({ title, label, text, items, cta, highlight }) => (
            <div
              key={title}
              className={`surface-card rounded-2xl p-6 flex flex-col relative overflow-hidden ${highlight ? "border-cyan/25 ring-1 ring-cyan/10 bg-gradient-to-b from-cyan/[0.03] to-transparent" : ""}`}
            >
              {highlight && <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />}
              {highlight && (
                <span className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full bg-cyan/10 text-cyan border border-cyan/20">
                  Most Popular
                </span>
              )}

              <span className="text-[11px] text-muted-foreground/50 mb-1">{label}</span>
              <h3 className="font-manrope font-extrabold text-xl mb-2">{title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-6 flex-1">{text}</p>

              <ul className="space-y-2 mb-6">
                {items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-[13px]">
                    <Icon name="CheckCircle2" size={13} className="text-cyan mt-0.5 flex-shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>

              {highlight ? (
                <Btn className="w-full justify-center text-xs">{cta}</Btn>
              ) : (
                <Btn variant="outline" className="w-full justify-center text-xs">{cta}</Btn>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works — Timeline ─── */
function HowItWorks() {
  const ref = useReveal();
  const steps = [
    { icon: "Globe", text: "Submit your website for analysis" },
    { icon: "ScanSearch", text: "We evaluate AI visibility, content structure, schema, technical setup, and supporting signals" },
    { icon: "FileCheck", text: "Receive a short or detailed report with findings and recommendations" },
    { icon: "Rocket", text: "Move forward with a proposal and implementation support if needed" },
  ];

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <SectionHead
          tag={<Tag><Icon name="GitBranch" size={10} /> Process</Tag>}
          title={<>How It <span className="gradient-text">Works</span></>}
        />

        <div ref={ref} className="reveal relative">
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-px">
            <div className="h-full bg-gradient-to-r from-cyan/30 via-violet/20 to-cyan/30 rounded-full" />
          </div>

          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map(({ icon, text }, i) => (
              <div key={icon} className="relative text-center">
                <div className="relative inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan/8 to-violet/8 border border-cyan/15 items-center justify-center mb-4 mx-auto">
                  <Icon name={icon as "Globe"} size={20} className="text-cyan" />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-cyan to-violet flex items-center justify-center text-[9px] font-bold font-manrope text-background">
                    {i + 1}
                  </span>
                </div>
                <p className="text-[13px] font-medium leading-relaxed max-w-[200px] mx-auto">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Who It's For ─── */
function WhoItsFor() {
  const ref = useStagger();
  const audiences = [
    { icon: "TrendingUp", title: "SEO & Growth Teams", desc: "Adapt your strategy for AI-driven discovery", accent: "cyan" },
    { icon: "Cpu", title: "SaaS Companies", desc: "Increase your chances of being surfaced in AI answers", accent: "violet" },
    { icon: "ShoppingBag", title: "E-commerce Brands", desc: "Prepare products and category pages for AI recommendations", accent: "emerald" },
    { icon: "Users", title: "Agencies & Digital Teams", desc: "Offer clients a new layer of visibility beyond traditional SEO", accent: "cyan" },
    { icon: "Trophy", title: "Brands in Competitive Niches", desc: "Understand where AI visibility is being won or lost", accent: "violet" },
  ];

  const accentCls: Record<string, string> = {
    cyan: "text-cyan bg-cyan/8",
    violet: "text-violet bg-violet/8",
    emerald: "text-emerald bg-emerald/8",
  };

  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHead
          tag={<Tag><Icon name="Users" size={10} /> Audience</Tag>}
          title={<>Who It's <span className="gradient-text">For</span></>}
        />

        <div ref={ref} className="stagger-children flex flex-wrap justify-center gap-4">
          {audiences.map(({ icon, title, desc, accent }) => (
            <div key={title} className="surface-card rounded-2xl p-5 flex items-start gap-4 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${accentCls[accent]}`}>
                <Icon name={icon as "TrendingUp"} size={17} />
              </div>
              <div>
                <h3 className="font-manrope font-bold text-sm mb-0.5">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials — Offset grid ─── */
function Testimonials() {
  const ref = useReveal();
  const quotes = [
    {
      text: "We finally got a clearer view of how AI platforms interpret our website — and where we were being overlooked.",
      name: "Sarah K.",
      role: "Head of SEO, SaaS Platform",
      avatar: "SK",
    },
    {
      text: "The analysis helped us identify technical blockers and prioritize improvements much faster.",
      name: "Marcus L.",
      role: "Growth Lead, E-commerce Brand",
      avatar: "ML",
    },
  ];

  return (
    <section ref={ref} className="reveal py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 hero-bg opacity-30 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <SectionHead
          tag={<Tag><Icon name="Quote" size={10} /> Testimonials</Tag>}
          title={<>What Teams <span className="gradient-text">Are Seeing</span></>}
        />

        <div className="grid md:grid-cols-2 gap-6">
          {quotes.map(({ text, name, role, avatar }, i) => (
            <div key={name} className={`gradient-border neo-card rounded-2xl p-7 ${i === 1 ? "md:mt-8" : ""}`}>
              <Icon name="Quote" size={24} className="text-cyan/20 mb-4" />
              <p className="text-[15px] leading-relaxed mb-6 font-medium">"{text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan to-violet flex items-center justify-center text-[10px] font-bold font-manrope text-background">
                  {avatar}
                </div>
                <div>
                  <p className="font-manrope font-bold text-sm">{name}</p>
                  <p className="text-[11px] text-muted-foreground">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Partners ─── */
function Partners() {
  const ref = useReveal();
  const names = ["AlphaGrowth", "Vectorize", "DataLayer", "NeuralBase", "Cognify", "PeakSignal", "StructAI", "CrawlIndex"];

  return (
    <section ref={ref} className="reveal py-16 px-6 border-y border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40 mb-8">
          Trusted by Forward-Looking Teams
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {names.map((n) => (
            <span key={n} className="px-5 py-2 rounded-xl border border-white/[0.04] text-[13px] font-manrope font-bold text-muted-foreground/30 hover:text-muted-foreground/60 hover:border-white/8 transition-all cursor-default">
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function FinalCTA() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-32 px-6 relative overflow-hidden">
      <div className="shooting-stars" style={{ opacity: 0.5 }}>
        <span /><span /><span /><span /><span />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[350px] rounded-full bg-gradient-to-br from-cyan/6 via-violet/4 to-emerald/3 blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative">
        <Tag><Icon name="Zap" size={10} className="text-cyan" /> Get Started</Tag>
        <h2 className="font-manrope text-4xl md:text-[3.5rem] font-extrabold tracking-tight mt-5 mb-5 leading-[1.1]">
          Start with a <span className="gradient-text">Report</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
          Get a clearer picture of what limits your AI visibility and choose the next step that fits your team — from a quick assessment to a deeper strategic engagement.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Btn className="px-9 py-3.5 shadow-xl shadow-cyan/20">Get a Short Report</Btn>
          <Btn variant="outline">
            Request a Detailed Analysis
            <Icon name="ArrowRight" size={14} />
          </Btn>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  const cols = [
    { title: "Product", links: ["Overview", "Dashboard", "API", "Integrations", "Changelog"] },
    { title: "Reports", links: ["Short Report", "Detailed Report", "Proposal", "Enterprise", "White-label"] },
    { title: "Resources", links: ["Documentation", "Blog", "Use Cases", "Webinars", "Guide"] },
    { title: "Company", links: ["About", "Contact", "Careers", "Press", "Partnership"] },
    { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Security", "GDPR"] },
  ];

  return (
    <footer className="border-t border-white/[0.04] py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan to-violet flex items-center justify-center">
                <Icon name="Zap" size={11} className="text-background" />
              </div>
              <span className="font-manrope font-extrabold text-[13px]">AIVisibility</span>
            </div>
            <p className="text-[11px] text-muted-foreground/50 leading-relaxed mb-4 max-w-[170px]">
              AI search readiness platform for forward-looking teams.
            </p>
            <div className="flex gap-2">
              {["Twitter", "Linkedin", "Github"].map((ic) => (
                <button key={ic} className="w-7 h-7 rounded-lg border border-white/[0.06] hover:border-cyan/20 flex items-center justify-center transition-all hover:bg-cyan/5">
                  <Icon name={ic as "Twitter"} size={12} className="text-muted-foreground/40" />
                </button>
              ))}
            </div>
          </div>

          {cols.map(({ title, links }) => (
            <div key={title}>
              <p className="font-manrope font-bold text-[11px] mb-4 text-foreground/80">{title}</p>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l}><a href="#" className="text-[11px] text-muted-foreground/40 hover:text-foreground/70 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.04] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-muted-foreground/30">© 2025 AIVisibility. All rights reserved.</p>
          <p className="text-[10px] text-muted-foreground/30">Built for AI-first discovery</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Header />
      <Hero />
      <Problem />
      <WhatImpacts />
      <CoreFeature />
      <CoreCapabilities />
      <Reports />
      <HowItWorks />
      <WhoItsFor />
      <Testimonials />
      <Partners />
      <FinalCTA />
      <Footer />
    </div>
  );
}
