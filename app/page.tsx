"use client";

import { ArrowDownRight, ArrowRight, Check, Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const navItems = ["About", "Capabilities", "Approach", "Insights", "Contact"];

const capabilities = [
  {
    index: "01",
    label: "Market intelligence",
    title: "Understand the market before committing resources.",
    copy: "We examine demand, customer behaviour, competitors and commercial signals to establish where opportunity exists, what is changing and what remains uncertain.",
    tone: "sand",
  },
  {
    index: "02",
    label: "Strategic direction",
    title: "Turn evidence into a defensible commercial decision.",
    copy: "We make assumptions, risks, options and trade-offs visible, then translate the strongest route into a clear recommendation and decision brief.",
    tone: "navy",
  },
  {
    index: "03",
    label: "Growth execution",
    title: "Carry the decision through to measurable action.",
    copy: "We convert strategy into a sequenced roadmap across positioning, digital presence, campaigns, marketplaces and performance measurement.",
    tone: "sage",
  },
];

const approach = [
  ["01", "Clarify", "Define the real decision, intended outcome, constraints and the evidence required to move forward."],
  ["02", "Investigate", "Gather market, customer, competitor and performance signals while separating facts from assumptions."],
  ["03", "Decide", "Evaluate credible options, expose trade-offs and recommend the strongest practical direction."],
  ["04", "Execute", "Translate the decision into accountable work, measurable outcomes and an adaptive roadmap."],
];

const insights = [
  ["Market entry", "The hidden cost of entering a market too early"],
  ["Customer intelligence", "What customers say—and what their behaviour reveals"],
  ["Execution", "Why growth plans fail after the strategy deck"],
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 36 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.78, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main id="top">
      <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
        <div className="wrap nav-wrap">
          <a className="brand" href="#top" aria-label="Strat IQ home"><span>S</span>Strat IQ</a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
          </nav>
          <a className="nav-action" href="#contact">Start discovery <ArrowDownRight size={17} /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <motion.nav className="mobile-nav" initial={reduced ? false : { opacity: 0, y: -10 }} animate={reduced ? undefined : { opacity: 1, y: 0 }}>
            {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          </motion.nav>
        )}
      </header>

      <section className="hero">
        <div className="wrap hero-copy">
          <motion.p className="kicker" initial={reduced ? false : { opacity: 0, y: 16 }} animate={reduced ? undefined : { opacity: 1, y: 0 }}>Business intelligence & growth advisory</motion.p>
          <motion.h1 initial={reduced ? false : { opacity: 0, y: 26 }} animate={reduced ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .82, delay: .08 }}>
            Better questions.<br /><em>Clearer decisions.</em>
          </motion.h1>
          <motion.div className="hero-footer" initial={reduced ? false : { opacity: 0, y: 22 }} animate={reduced ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .8, delay: .16 }}>
            <p>We help organisations understand markets, evaluate opportunities and move important commercial decisions from uncertainty to action.</p>
            <a href="#about">Explore our thinking <ArrowDownRight size={20} /></a>
          </motion.div>
        </div>

        <motion.div className="wrap hero-frame" initial={reduced ? false : { opacity: 0, scale: .985 }} animate={reduced ? undefined : { opacity: 1, scale: 1 }} transition={{ duration: 1, delay: .22 }}>
          <div className="hero-grid-lines" />
          <div className="hero-question"><span>Decision brief / 01</span><h2>Why have enquiries slowed while repeat business remains stable?</h2></div>
          <div className="evidence-card evidence-a"><small>Observed signal</small><strong>Website enquiries −18%</strong><p>The decline is concentrated among first-time visitors.</p></div>
          <div className="evidence-card evidence-b"><small>Known</small><strong>Repeat customers remain stable</strong><p>Service satisfaction is unlikely to be the primary issue.</p></div>
          <div className="evidence-card evidence-c"><small>Decision</small><strong>Improve visibility before increasing spend</strong><p>Prioritise search and enquiry conversion first.</p></div>
        </motion.div>
      </section>

      <section className="manifesto section" id="about">
        <div className="wrap intro-grid">
          <Reveal><p className="eyebrow">Our point of view</p></Reveal>
          <Reveal delay={.08}><h2>Important business decisions deserve more than instinct, fragmented data and familiar answers.</h2></Reveal>
        </div>
      </section>

      <section className="story section-compact">
        <div className="wrap story-grid">
          <Reveal className="story-art art-one"><i /><span>Market signal</span><span>Customer evidence</span><span>Commercial risk</span></Reveal>
          <Reveal className="story-copy" delay={.08}><p className="eyebrow">Clarity before commitment</p><h3>We investigate before we recommend.</h3><p>Growth questions are rarely solved by one report or one campaign. We build a structured picture of the market, customer, competition and internal reality before deciding what should happen next.</p></Reveal>
        </div>
      </section>

      <section className="story section-compact">
        <div className="wrap story-grid reverse">
          <Reveal className="story-copy"><p className="eyebrow">From intelligence to action</p><h3>A recommendation matters only when it changes the next move.</h3><p>We connect evidence to strategy, execution and measurement so insights do not disappear into a presentation. Every engagement creates a decision, roadmap and visible accountability.</p></Reveal>
          <Reveal className="story-art art-two" delay={.08}><div>Evidence</div><div>Options</div><div>Decision</div></Reveal>
        </div>
      </section>

      <section className="capabilities section" id="capabilities">
        <div className="wrap intro-grid">
          <Reveal><p className="eyebrow">Capabilities</p></Reveal>
          <Reveal delay={.08}><h2>From understanding the market to implementing the next move.</h2></Reveal>
        </div>
        <div className="wrap capability-list">
          {capabilities.map((item) => (
            <article className="capability-row" key={item.index}>
              <Reveal className="capability-meta"><strong>{item.index}</strong><span>{item.label}</span></Reveal>
              <Reveal className="capability-copy" delay={.05}><h3>{item.title}</h3><p>{item.copy}</p><a href="#contact">Discuss this capability <ArrowDownRight size={18} /></a></Reveal>
              <Reveal className={`capability-visual ${item.tone}`} delay={.1}><i /><i /><i /></Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="statement-band"><div className="wrap statement-stack"><Reveal><p>Ask better.</p></Reveal><Reveal delay={.08}><p>Investigate deeper.</p></Reveal><Reveal delay={.16}><p>Move with confidence.</p></Reveal></div></section>

      <section className="approach section" id="approach">
        <div className="wrap intro-grid inverse"><Reveal><p className="eyebrow">Approach</p></Reveal><Reveal delay={.08}><h2>A disciplined path from uncertainty to action.</h2></Reveal></div>
        <div className="wrap approach-list">
          {approach.map(([number, title, copy], index) => <Reveal className="approach-row" key={number} delay={index * .06}><span>{number}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
        </div>
      </section>

      <section className="proof section">
        <div className="wrap proof-grid">
          <Reveal className="proof-art"><div /><div /><strong>IQ</strong></Reveal>
          <Reveal className="proof-copy" delay={.08}><p className="eyebrow">Evidence changes the conversation</p><h2>Recommendations become stronger when assumptions are visible.</h2><div className="proof-list">{["Facts separated from assumptions", "Knowledge gaps made visible", "Risks and trade-offs documented", "Recommendations linked to action"].map((item) => <span key={item}><Check size={18} />{item}</span>)}</div></Reveal>
        </div>
      </section>

      <section className="insights section" id="insights">
        <div className="wrap intro-grid"><Reveal><p className="eyebrow">Featured intelligence</p></Reveal><Reveal delay={.08}><h2>Ideas for leaders making the next decision.</h2></Reveal></div>
        <div className="wrap insight-list">
          {insights.map(([meta, title], index) => <Reveal className="insight-row" key={title} delay={index * .06}><span>0{index + 1}</span><div><small>{meta}</small><h3>{title}</h3></div><ArrowDownRight size={28} /></Reveal>)}
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="wrap contact-grid">
          <Reveal><p className="eyebrow">Contact</p><h2>Bring us the decision you need to make.</h2></Reveal>
          <Reveal className="contact-panel" delay={.08}><p>Tell us what is changing, what feels uncertain and what decision is waiting. We will begin by clarifying the question.</p><a href="mailto:hello@stratiq.example">hello@stratiq.example <ArrowRight size={22} /></a></Reveal>
        </div>
      </section>

      <footer><div className="wrap footer-grid"><a className="brand" href="#top"><span>S</span>Strat IQ</a><p>Business intelligence & growth advisory.</p><a href="#top">Back to top ↑</a></div></footer>
    </main>
  );
}
