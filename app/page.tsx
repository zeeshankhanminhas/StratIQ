"use client";

import { ArrowDownRight, ArrowRight, Check, Menu, Play, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const navItems = ["About", "Capabilities", "Approach", "Insights", "Contact"];

const capabilities = [
  {
    number: "01",
    label: "Market intelligence",
    title: "See the market as it is — not as you assume it is.",
    copy: "We investigate demand, customer behaviour, competitors and market movement to create a clearer commercial picture before resources are committed.",
    className: "market",
  },
  {
    number: "02",
    label: "Strategic direction",
    title: "Turn evidence into a decision people can act on.",
    copy: "We translate research into prioritised options, decision briefs and practical growth roadmaps with risks, assumptions and trade-offs made visible.",
    className: "strategy",
  },
  {
    number: "03",
    label: "Disciplined execution",
    title: "Carry the decision through to measurable action.",
    copy: "Where needed, we help implement the chosen path across positioning, digital presence, campaigns, marketplaces and performance measurement.",
    className: "execution",
  },
];

const approach = [
  ["01", "Understand the decision", "Define the real question, desired outcome, constraints and what must be true for the decision to succeed."],
  ["02", "Investigate the evidence", "Gather relevant market, customer, competitor and performance signals while separating facts from assumptions."],
  ["03", "Recommend the next move", "Evaluate credible options, expose trade-offs and recommend a direction that can be defended and implemented."],
];

const outcomes = [
  ["New opportunities identified", "12"],
  ["Priority customer segments", "04"],
  ["Decisions moved to action", "18"],
  ["Average engagement clarity", "92%"],
];

const insights = [
  ["Market entry · 8 min read", "The real cost of entering a market too early"],
  ["Customer intelligence · 6 min read", "What customers say — and what their behaviour reveals"],
  ["Execution · 7 min read", "Why growth plans fail after the strategy deck"],
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <header className={scrolled ? "site-header scrolled" : "site-header"}>
        <div className="container nav-shell">
          <a href="#top" className="brand" aria-label="Strat IQ home"><span className="brand-mark">S</span><span>Strat IQ</span></a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
          </nav>
          <a href="#contact" className="nav-cta">Start Discovery <ArrowDownRight size={17} /></a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && (
          <motion.nav className="mobile-nav" initial={reduce ? false : { opacity: 0, y: -8 }} animate={reduce ? undefined : { opacity: 1, y: 0 }}>
            {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          </motion.nav>
        )}
      </header>

      <section className="hero" id="top">
        <div className="container hero-inner">
          <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="hero-kicker">Business intelligence & growth advisory</p>
            <h1>Better questions.<span>Clearer decisions.</span></h1>
          </motion.div>
          <motion.div className="hero-bottom" initial={reduce ? false : { opacity: 0, y: 22 }} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.16 }}>
            <p>We help organisations understand markets, identify opportunities and move important commercial decisions from uncertainty to action.</p>
            <a href="#capabilities" className="text-link">Explore what we do <ArrowDownRight size={20} /></a>
          </motion.div>
        </div>

        <div className="container hero-media-wrap">
          <motion.div className="hero-media" initial={reduce ? false : { opacity: 0, scale: 0.985 }} animate={reduce ? undefined : { opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
            <div className="hero-media-grid" />
            <div className="hero-media-copy"><span>Decision brief / 01</span><h2>Why have enquiries slowed while repeat business remains stable?</h2></div>
            <div className="signal-card signal-card-one"><span>Observed signal</span><strong>Website enquiries −18%</strong><p>Decline concentrated in first-time visitors.</p></div>
            <div className="signal-card signal-card-two"><span>Known</span><strong>Repeat customers stable</strong><p>Service satisfaction is not the primary issue.</p></div>
            <div className="signal-card signal-card-three"><span>Decision</span><strong>Fix visibility before increasing spend</strong><p>Prioritise search and enquiry conversion first.</p></div>
            <button className="play-button" aria-label="Play overview video"><Play fill="currentColor" size={18} /><span>See how we think</span></button>
          </motion.div>
        </div>
      </section>

      <section className="manifesto section" id="about">
        <div className="container manifesto-grid"><Reveal><p className="eyebrow">Just to clarify</p></Reveal><Reveal delay={0.08}><h2>Important business decisions deserve more than instinct, fragmented data and familiar answers.</h2></Reveal></div>
      </section>

      <section className="split-story section-tight">
        <div className="container split-story-grid">
          <Reveal className="story-visual story-visual-one"><div className="story-orbit" /><div className="story-note note-a">Market signal</div><div className="story-note note-b">Customer evidence</div><div className="story-note note-c">Commercial risk</div></Reveal>
          <Reveal className="story-copy" delay={0.08}><p className="eyebrow">Clarity before commitment</p><h3>We investigate before we recommend.</h3><p>Growth questions are rarely solved by one report or one campaign. We build a structured picture of the market, customer, competition and internal reality before deciding what should happen next.</p></Reveal>
        </div>
      </section>

      <section className="split-story reverse section-tight">
        <div className="container split-story-grid">
          <Reveal className="story-copy"><p className="eyebrow">From intelligence to action</p><h3>The recommendation is only useful when it changes the next move.</h3><p>We connect evidence to strategy, execution and measurement so that insights do not disappear into a presentation. Every engagement produces a decision, a roadmap and visible accountability.</p></Reveal>
          <Reveal className="story-visual story-visual-two" delay={0.08}><div className="decision-block block-one">Evidence</div><div className="decision-block block-two">Options</div><div className="decision-block block-three">Decision</div></Reveal>
        </div>
      </section>

      <section className="capabilities section" id="capabilities">
        <div className="container section-intro"><Reveal><p className="eyebrow">Our capabilities</p></Reveal><Reveal delay={0.08}><h2>From understanding the market to implementing the next move.</h2></Reveal></div>
        <div className="container capability-list">
          {capabilities.map((item, index) => (
            <article className="capability-row" key={item.number}>
              <Reveal className="capability-number"><span>{item.number}</span><small>{item.label}</small></Reveal>
              <Reveal className="capability-copy" delay={0.05}><h3>{item.title}</h3><p>{item.copy}</p><a href="#contact" className="text-link dark-link">Discuss this capability <ArrowDownRight size={19} /></a></Reveal>
              <Reveal className={`capability-visual visual-${item.className}`} delay={0.1}><div className="visual-index">{String(index + 1).padStart(2, "0")}</div><div className="visual-line" /><div className="visual-panel panel-a" /><div className="visual-panel panel-b" /><div className="visual-panel panel-c" /></Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="statement-band"><div className="container statement-band-inner"><Reveal><p>Ask better.</p></Reveal><Reveal delay={0.08}><p>Investigate deeper.</p></Reveal><Reveal delay={0.16}><p>Move with confidence.</p></Reveal></div></section>

      <section className="approach section" id="approach">
        <div className="container section-intro light-intro"><Reveal><p className="eyebrow">Our approach</p></Reveal><Reveal delay={0.08}><h2>A disciplined path from uncertainty to action.</h2></Reveal></div>
        <div className="container approach-list">
          {approach.map(([number, title, copy], index) => <Reveal className="approach-row" key={number} delay={index * 0.07}><span className="approach-number">{number}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
        </div>
      </section>

      <section className="proof section">
        <div className="container proof-grid">
          <Reveal className="proof-visual"><div className="proof-ring ring-one" /><div className="proof-ring ring-two" /><div className="proof-center">IQ</div></Reveal>
          <Reveal className="proof-copy" delay={0.08}><p className="eyebrow">Evidence changes the conversation</p><h2>Recommendations become stronger when assumptions are visible.</h2><div className="proof-points"><div><Check size={18} /> Facts separated from assumptions</div><div><Check size={18} /> Knowledge gaps recorded</div><div><Check size={18} /> Risks and trade-offs made explicit</div><div><Check size={18} /> Decisions linked to measurable action</div></div></Reveal>
        </div>
      </section>

      <section className="numbers section">
        <div className="container numbers-intro"><Reveal><p className="eyebrow">By the numbers</p></Reveal><Reveal delay={0.08}><h2>Useful intelligence should create visible movement.</h2></Reveal></div>
        <div className="container numbers-grid">{outcomes.map(([label, value], index) => <Reveal className="number-card" key={label} delay={index * 0.06}><span>{label}</span><strong>{value}</strong></Reveal>)}</div>
      </section>

      <section className="insights section" id="insights">
        <div className="container section-intro"><Reveal><p className="eyebrow">Featured intelligence</p></Reveal><Reveal delay={0.08}><h2>Ideas for leaders making the next decision.</h2></Reveal></div>
        <div className="container insight-list">{insights.map(([meta, title], index) => <Reveal className="insight-row" key={title} delay={index * 0.06}><span>0{index + 1}</span><div><small>{meta}</small><h3>{title}</h3></div><ArrowDownRight size={28} /></Reveal>)}</div>
      </section>

      <section className="contact section" id="contact">
        <div className="container contact-grid"><Reveal><p className="eyebrow">Contact</p><h2>Bring us the decision you need to make.</h2></Reveal><Reveal className="contact-panel" delay={0.08}><p>Tell us what is changing, what feels uncertain and what decision is waiting. We will start by clarifying the question.</p><a href="mailto:hello@stratiq.example" className="contact-link">hello@stratiq.example <ArrowRight size={22} /></a></Reveal></div>
      </section>

      <footer><div className="container footer-grid"><div className="brand footer-brand"><span className="brand-mark">S</span><span>Strat IQ</span></div><p>Business intelligence & growth advisory.</p><a href="#top">Back to top ↑</a></div></footer>
    </main>
  );
}
