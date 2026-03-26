import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);
  return (
    <button
      onClick={() => setDark(!dark)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 glass border border-white/10 hover:border-cyan/30 text-muted-foreground hover:text-foreground"
    >
      <Icon name={dark ? "Sun" : "Moon"} size={13} />
      {dark ? "Light" : "Dark"}
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-cyan/80 mb-4 px-3 py-1 rounded-full border border-cyan/20 bg-cyan/5">
      {children}
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass border-b border-white/5 shadow-2xl" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan to-violet flex items-center justify-center">
            <Icon name="Zap" size={14} className="text-background" />
          </div>
          <span className="font-manrope font-bold text-sm tracking-tight">AIVisibility</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          {["Features", "Reports", "Pricing", "Resources"].map((item) => (
            <a key={item} href="#" className="hover:text-foreground transition-colors duration-200">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="shimmer-btn text-xs font-semibold px-4 py-2 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan/20">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero-bg grid-pattern noise-bg relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-violet/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto animate-fade-in">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan/80 mb-6 px-4 py-2 rounded-full border border-cyan/20 bg-cyan/5 badge-glow">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          AI Search Readiness Platform
        </div>

        <h1 className="font-manrope text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
          Make Your Website{" "}
          <span className="gradient-text text-glow">Visible to AI Search</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Analyze how AI systems see your website, uncover what limits your visibility, and get a clear path to improving content, structure, and technical readiness for AI-driven discovery.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="shimmer-btn font-manrope font-bold text-sm px-8 py-3.5 rounded-full shadow-xl shadow-cyan/25 hover:scale-105 active:scale-95 transition-all duration-300 glow-cyan">
            Get Your Report
          </button>
          <button className="flex items-center gap-2 text-sm font-medium px-6 py-3.5 rounded-full border border-white/10 hover:border-cyan/30 hover:bg-cyan/5 transition-all duration-300 glass text-foreground">
            <Icon name="Play" size={14} className="text-cyan" />
            See How It Works
          </button>
        </div>

        <p className="mt-10 text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Built for teams adapting their websites for ChatGPT, Perplexity, Gemini, and other AI platforms
        </p>
      </div>

      <div className="relative mt-20 w-full max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <div className="gradient-border rounded-2xl overflow-hidden shadow-2xl shadow-black/50 float">
          <div className="glass border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="flex-1 ml-4 h-6 rounded-md bg-white/5 text-xs text-muted-foreground flex items-center px-3">
                aivisibility.io/dashboard
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-5">
              {[
                { label: "AI Visibility Score", value: "72", delta: "+14", color: "text-cyan" },
                { label: "Content Readiness", value: "58%", delta: "+8%", color: "text-violet" },
                { label: "Technical Issues", value: "12", delta: "-5", color: "text-green-400" },
              ].map(({ label, value, delta, color }) => (
                <div key={label} className="neo-card rounded-xl p-4">
                  <p className="text-xs text-muted-foreground mb-2">{label}</p>
                  <div className="flex items-end gap-2">
                    <span className={`font-manrope text-2xl font-bold ${color}`}>{value}</span>
                    <span className="text-xs text-green-400 mb-1">{delta}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="neo-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-muted-foreground">AI Readiness by Category</span>
                <span className="text-xs text-cyan">This week</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "Content Structure", pct: 78 },
                  { label: "Technical Setup", pct: 61 },
                  { label: "Schema & Entities", pct: 45 },
                  { label: "Competitor Signals", pct: 55 },
                ].map(({ label, pct }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-36">{label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-cyan to-violet" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs font-medium text-foreground w-8 text-right">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" style={{ top: "60%" }} />
      </div>
    </section>
  );
}

function Problem() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Label><Icon name="AlertTriangle" size={11} /> Why Now</Label>
          <h2 className="font-manrope text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
            Traditional SEO Is No Longer{" "}
            <span className="gradient-text">the Whole Picture</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            More users are turning to ChatGPT, Perplexity, Gemini, and other AI tools for answers. If your website is not structured, accessible, or understandable for AI systems, it may be overlooked entirely — even if your traditional SEO is in decent shape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: "EyeOff", title: "Your website may be invisible to AI even if your SEO is solid", color: "text-red-400", bg: "bg-red-500/5 border-red-500/15" },
            { icon: "ListChecks", title: "AI systems choose which sources to use in answers", color: "text-orange-400", bg: "bg-orange-500/5 border-orange-500/15" },
            { icon: "Users", title: "Competitors may be showing up where your brand does not", color: "text-yellow-400", bg: "bg-yellow-500/5 border-yellow-500/15" },
            { icon: "FileQuestion", title: "Without proper structure and access, your site is harder for AI to interpret", color: "text-violet", bg: "bg-violet/5 border-violet/15" },
          ].map(({ icon, title, color, bg }) => (
            <div key={title} className={`neo-card rounded-2xl p-6 border ${bg} transition-all duration-300 hover:scale-[1.02]`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${bg}`}>
                <Icon name={icon as "EyeOff"} size={18} className={color} />
              </div>
              <h3 className="font-manrope font-bold text-base">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutProduct() {
  const ref = useReveal();
  const steps = [
    { icon: "ScanSearch", title: "Analyze how AI systems interpret your website" },
    { icon: "AlertCircle", title: "Identify issues across content, structure, and technical setup" },
    { icon: "Wrench", title: "Turn insights into concrete improvements" },
  ];

  return (
    <section ref={ref} className="reveal py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 hero-bg opacity-50 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-14">
          <Label><Icon name="Box" size={11} /> Product</Label>
          <h2 className="font-manrope text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
            What the Product <span className="gradient-text">Does</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            This platform helps you understand how ready your website is for AI search, shows what may be limiting your visibility, and gives you a practical path to improvement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ icon, title }, i) => (
            <div key={icon} className="neo-card rounded-2xl p-6 text-center transition-all duration-300 hover:scale-[1.02]">
              <div className="relative inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan/10 to-violet/10 border border-cyan/20 items-center justify-center mb-5 mx-auto">
                <Icon name={icon as "ScanSearch"} size={22} className="text-cyan" />
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-br from-cyan to-violet flex items-center justify-center text-[9px] font-bold font-manrope text-background">
                  {i + 1}
                </span>
              </div>
              <p className="font-manrope font-bold text-sm leading-relaxed">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeAnalyze() {
  const ref = useReveal();
  const cards = [
    { icon: "Eye", title: "AI Visibility", desc: "Understand how discoverable your site is across AI-driven platforms and answer engines.", color: "from-cyan to-blue-500" },
    { icon: "FileText", title: "Content Quality", desc: "Evaluate whether your content is clear, useful, and easy for AI systems to understand and cite.", color: "from-violet to-pink-500" },
    { icon: "Database", title: "Structured Data", desc: "Check whether your schema and data structure help AI interpret your pages, entities, and key information.", color: "from-cyan to-green-400" },
    { icon: "Settings", title: "Technical Access", desc: "Make sure AI crawlers can access your site and that critical files and signals are properly configured.", color: "from-orange-400 to-yellow-400" },
    { icon: "Shield", title: "Brand Signals", desc: "Assess the trust and authority signals that help AI systems recognize and reference your brand.", color: "from-violet to-cyan" },
  ];

  return (
    <section ref={ref} className="reveal py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <Label><Icon name="Layers" size={11} /> Analysis</Label>
          <h2 className="font-manrope text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            What Shapes Your{" "}
            <span className="gradient-text">AI Visibility</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map(({ icon, title, desc, color }) => (
            <div key={title} className="neo-card gradient-border rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                <Icon name={icon as "Eye"} size={18} className="text-white" />
              </div>
              <h3 className="font-manrope font-bold text-base mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoreFeature() {
  const ref = useReveal();
  const points = [
    "AI visibility tracking across relevant topics and prompts",
    "Competitor comparison and niche context",
    "Identification of issues limiting citation and discoverability",
    "Clear priorities for improvement",
  ];

  return (
    <section ref={ref} className="reveal py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 hero-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <div className="gradient-border neo-card rounded-3xl p-10 md:p-14">
          <div className="text-center mb-10">
            <Label><Icon name="BarChart3" size={11} /> Core Feature</Label>
            <h2 className="font-manrope text-3xl md:text-4xl font-extrabold tracking-tight mb-5">
              See How AI Sees Your Website —{" "}
              <span className="gradient-text">and Where Competitors Outperform You</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Track your brand's AI visibility, uncover what limits your chances of being cited, and understand where competitors are gaining ground in the new search landscape.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-3 neo-card rounded-xl p-4 border border-cyan/10">
                <Icon name="CheckCircle2" size={16} className="text-cyan mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const featureData = [
  {
    icon: "FileText",
    title: "Make Content and Structure Easier for AI to Understand",
    text: "Optimize your pages so AI systems can better interpret meaning, entities, answers, and important business information across your website.",
    points: ["Content structure improvements", "Schema and JSON-LD support", "Clearer information formatting for AI interpretation", "Better preparation for AI citation"],
    color: "cyan" as const,
    delay: "0s",
  },
  {
    icon: "Settings",
    title: "Set Up the Technical Foundation for AI Access",
    text: "Manage the core files and signals that help AI crawlers access, interpret, and prioritize your website correctly.",
    points: ["robots.txt", "sitemap", "llms.txt", "AI Info Page"],
    color: "violet" as const,
    delay: "0.15s",
  },
  {
    icon: "ShoppingBag",
    title: "Prepare Product Data for AI Recommendations and Comparisons",
    text: "For e-commerce and catalog-based websites, improve how product information is structured so AI systems can use it in recommendations, comparisons, and product-related answers.",
    points: ["Better product data structure", "Clearer attributes and specifications", "Improved readiness for AI comparison use cases", "Support for AI-friendly product discovery"],
    color: "green" as const,
    delay: "0.3s",
  },
];

function FeatureCard({ icon, title, text, points, color, delay }: (typeof featureData)[0]) {
  const ref = useReveal();
  const cls = {
    cyan: { icon: "bg-cyan/10 border-cyan/20 text-cyan", check: "text-cyan", grad: "from-cyan/5" },
    violet: { icon: "bg-violet/10 border-violet/20 text-violet", check: "text-violet", grad: "from-violet/5" },
    green: { icon: "bg-green-400/10 border-green-400/20 text-green-400", check: "text-green-400", grad: "from-green-400/5" },
  }[color];

  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: delay }}>
      <div className={`neo-card gradient-border rounded-2xl p-8 bg-gradient-to-br ${cls.grad} to-transparent transition-all duration-300 hover:scale-[1.005]`}>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 ${cls.icon}`}>
              <Icon name={icon as "FileText"} size={20} />
            </div>
            <h3 className="font-manrope font-extrabold text-xl mb-3">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
          </div>
          <div className="md:w-64 flex-shrink-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">What's included</p>
            <ul className="space-y-2.5">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm">
                  <Icon name="Check" size={14} className={`mt-0.5 flex-shrink-0 ${cls.check}`} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportingFeatures() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 hero-bg opacity-30 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <Label><Icon name="Puzzle" size={11} /> Features</Label>
          <h2 className="font-manrope text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Features Built for{" "}
            <span className="gradient-text">AI Readiness</span>
          </h2>
        </div>
        <div className="space-y-6">
          {featureData.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Reports() {
  const ref = useReveal();
  const cards = [
    {
      title: "Short Report",
      label: "For a quick starting point",
      text: "A concise snapshot of your website's AI readiness, highlighting the most important issues and immediate recommendations.",
      items: ["Overall status overview", "Main risk areas", "Essential recommendations", "Clear next steps"],
      icon: "FileText",
      highlight: false,
      cta: "Get Short Report",
    },
    {
      title: "Detailed Report",
      label: "For deeper insight",
      text: "A more complete audit of your AI visibility, content clarity, structure, technical readiness, and competitive signals.",
      items: ["Expanded category-based evaluation", "Detailed issues and explanations", "Prioritized recommendations", "Broader visibility and readiness analysis"],
      icon: "BarChart3",
      highlight: true,
      cta: "Get Detailed Report",
    },
    {
      title: "Proposal",
      label: "For teams ready to move forward",
      text: "A strategic proposal with a detailed comparative niche analysis, competitor context, and recommended next steps for collaboration.",
      items: ["Comparative niche analysis", "Competitive landscape review", "Growth opportunities", "Recommended direction for implementation"],
      icon: "Presentation",
      highlight: false,
      cta: "Request Proposal",
    },
  ];

  return (
    <section ref={ref} className="reveal py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <Label><Icon name="BarChart3" size={11} /> Reports & Collaboration</Label>
          <h2 className="font-manrope text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Choose the Right{" "}
            <span className="gradient-text">Level of Analysis</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map(({ title, label, text, items, icon, highlight, cta }) => (
            <div
              key={title}
              className={`report-card neo-card rounded-2xl p-7 flex flex-col relative overflow-hidden ${
                highlight ? "border-cyan/30 bg-gradient-to-b from-cyan/5 to-transparent glow-cyan" : "hover:border-white/15"
              }`}
            >
              {highlight && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent" />}
              {highlight && (
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan/15 text-cyan border border-cyan/30">Popular</span>
                </div>
              )}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan/10 to-violet/10 border border-white/10 flex items-center justify-center mb-5">
                <Icon name={icon as "FileText"} size={18} className={highlight ? "text-cyan" : "text-muted-foreground"} />
              </div>
              <span className="text-xs text-muted-foreground mb-1">{label}</span>
              <h3 className="font-manrope font-extrabold text-xl mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-1">{text}</p>
              <ul className="space-y-2 mb-7">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <Icon name="CheckCircle2" size={14} className="text-cyan mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                highlight ? "shimmer-btn shadow-lg shadow-cyan/20 hover:scale-105" : "border border-white/10 hover:border-cyan/30 hover:bg-cyan/5 text-foreground"
              }`}>
                {cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const howSteps = [
  { icon: "Globe", title: "Submit your website for analysis" },
  { icon: "ScanSearch", title: "We assess AI visibility, content structure, technical setup, and supporting signals" },
  { icon: "FileCheck", title: "You receive a short or detailed report with findings and recommendations" },
  { icon: "Rocket", title: "If needed, move forward with a strategy proposal and implementation support" },
];

function StepCard({ icon, title, index }: { icon: string; title: string; index: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal text-center relative" style={{ transitionDelay: `${index * 0.12}s` }}>
      <div className="relative inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan/10 to-violet/10 border border-cyan/20 items-center justify-center mb-5 mx-auto">
        <Icon name={icon as "Globe"} size={22} className="text-cyan" />
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-br from-cyan to-violet flex items-center justify-center text-[9px] font-bold font-manrope text-background">
          {index + 1}
        </span>
      </div>
      <p className="font-manrope font-bold text-sm leading-relaxed max-w-[200px] mx-auto">{title}</p>
    </div>
  );
}

function HowItWorks() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-16">
          <Label><Icon name="GitBranch" size={11} /> Process</Label>
          <h2 className="font-manrope text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
          {howSteps.map((step, i) => (
            <StepCard key={step.icon} icon={step.icon} title={step.title} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoItsFor() {
  const ref = useReveal();
  const audiences = [
    { icon: "TrendingUp", title: "SEO and Growth Teams", desc: "Adapt your search strategy to AI-driven discovery", color: "cyan" },
    { icon: "Cpu", title: "SaaS Companies", desc: "Improve your chances of being surfaced and referenced in AI answers", color: "violet" },
    { icon: "ShoppingBag", title: "E-commerce and Retail Brands", desc: "Prepare products and category pages for AI recommendations", color: "green" },
    { icon: "Users", title: "Agencies and Digital Teams", desc: "Offer clients a new layer of visibility beyond traditional SEO", color: "cyan" },
    { icon: "Trophy", title: "Brands in Competitive Niches", desc: "Understand where AI visibility is being won or lost", color: "violet" },
  ];
  const colorMap: Record<string, string> = {
    cyan: "border-cyan/15 group-hover:border-cyan/30",
    violet: "border-violet/15 group-hover:border-violet/30",
    green: "border-green-400/15 group-hover:border-green-400/30",
  };
  const iconColor: Record<string, string> = {
    cyan: "text-cyan bg-cyan/10",
    violet: "text-violet bg-violet/10",
    green: "text-green-400 bg-green-400/10",
  };

  return (
    <section ref={ref} className="reveal py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <Label><Icon name="Users" size={11} /> Audience</Label>
          <h2 className="font-manrope text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Who It's <span className="gradient-text">For</span>
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {audiences.map(({ icon, title, desc, color }) => (
            <div key={title} className={`group neo-card rounded-2xl p-6 flex gap-4 items-start w-full md:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)] border ${colorMap[color]} transition-all duration-300 hover:scale-[1.02]`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColor[color]}`}>
                <Icon name={icon as "TrendingUp"} size={18} />
              </div>
              <div>
                <h3 className="font-manrope font-bold text-sm mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const ref = useReveal();
  const quotes = [
    { quote: "We gained a much clearer view of how AI systems interpret our website — and where we were being overlooked.", name: "Sarah K.", role: "Head of SEO, SaaS Platform", avatar: "SK" },
    { quote: "The analysis helped us uncover technical blockers and improve AI readiness much faster.", name: "Marcus L.", role: "Growth Lead, E-commerce Brand", avatar: "ML" },
  ];

  return (
    <section ref={ref} className="reveal py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 hero-bg opacity-40 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-14">
          <Label><Icon name="Quote" size={11} /> Testimonials</Label>
          <h2 className="font-manrope text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            What Teams <span className="gradient-text">Are Saying</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {quotes.map(({ quote, name, role, avatar }) => (
            <div key={name} className="gradient-border neo-card rounded-2xl p-8">
              <Icon name="Quote" size={28} className="text-cyan/30 mb-4" />
              <p className="text-base leading-relaxed mb-6 font-medium">"{quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan to-violet flex items-center justify-center text-xs font-bold font-manrope text-background">{avatar}</div>
                <div>
                  <p className="font-manrope font-bold text-sm">{name}</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const ref = useReveal();
  const partners = ["AlphaGrowth", "Vectorize", "DataLayer", "NeuralBase", "Cognify", "PeakSignal", "StructAI", "CrawlIndex"];
  return (
    <section ref={ref} className="reveal py-16 px-6 border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-10">
          Trusted by Forward-Looking Teams
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          {partners.map((p) => (
            <div key={p} className="neo-card rounded-xl px-5 py-2.5 text-sm font-manrope font-bold text-muted-foreground/50 hover:text-muted-foreground/80 hover:border-white/10 transition-all duration-300 cursor-default">{p}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full bg-gradient-to-br from-cyan/8 via-violet/5 to-green-400/5 blur-3xl" />
      </div>
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan/80 mb-6 px-4 py-2 rounded-full border border-cyan/20 bg-cyan/5 badge-glow">
          <Icon name="Zap" size={11} className="text-cyan" />
          Start Today
        </div>
        <h2 className="font-manrope text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Start with a Report —{" "}
          <span className="gradient-text">and See How Ready</span> Your Website Is for AI
        </h2>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
          Get a clear view of what may be limiting your AI visibility, uncover the most important issues, and choose the right next step — from a quick report to a deeper strategic engagement.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="shimmer-btn font-manrope font-bold text-sm px-10 py-4 rounded-full shadow-2xl shadow-cyan/25 hover:scale-105 active:scale-95 transition-all duration-300 glow-cyan">
            Get a Short Report
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold px-8 py-4 rounded-full border border-white/10 hover:border-cyan/30 hover:bg-cyan/5 transition-all duration-300 glass text-foreground">
            Request a Detailed Analysis
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: "Product", links: ["Overview", "Dashboard", "API Access", "Integrations", "Changelog"] },
    { title: "Features", links: ["Content Analysis", "Technical Audit", "Schema Review", "Competitor Signals", "Entity Mapping"] },
    { title: "Reports", links: ["Short Report", "Detailed Report", "Proposal", "Enterprise Audit", "White-label"] },
    { title: "Resources", links: ["Documentation", "Blog", "Use Cases", "Webinars", "AI Search Guide"] },
    { title: "Contact", links: ["Sales", "Support", "Partnership", "Press", "Careers"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Use", "Cookie Policy", "Security", "GDPR"] },
  ];

  return (
    <footer className="border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 mb-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan to-violet flex items-center justify-center">
                <Icon name="Zap" size={14} className="text-background" />
              </div>
              <span className="font-manrope font-extrabold text-sm">AIVisibility</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4 max-w-[180px]">
              The AI search readiness platform for forward-looking teams.
            </p>
            <div className="flex gap-3">
              {[{ name: "Twitter", icon: "Twitter" }, { name: "LinkedIn", icon: "Linkedin" }, { name: "GitHub", icon: "Github" }].map(({ name, icon }) => (
                <button key={name} className="w-8 h-8 rounded-lg border border-white/10 hover:border-cyan/30 flex items-center justify-center transition-all duration-200 hover:bg-cyan/5">
                  <Icon name={icon as "Twitter"} size={13} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
          {cols.map(({ title, links }) => (
            <div key={title}>
              <p className="font-manrope font-bold text-xs mb-4 text-foreground">{title}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2025 AIVisibility. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Built for AI-first discovery</p>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Problem />
      <AboutProduct />
      <WhatWeAnalyze />
      <CoreFeature />
      <SupportingFeatures />
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
