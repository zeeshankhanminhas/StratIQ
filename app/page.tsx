"use client";

import { ArrowDownRight, ArrowRight, Check, Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const nav = ["About", "Capabilities", "Approach", "Insights", "Contact"];

const capabilities = [
  {
    number: "01",
    eyebrow: "Market intelligence",
    title: "See the market before you commit to the move.",
    copy: "We investigate demand, customers, competitors and commercial signals to build a reliable picture of where opportunity exists—and where it does not.",
    visual: "market",
  },
  {
    number: "02",
    eyebrow: "Strategic direction",
    title: "Turn evidence into a decision people can act on.",
    copy: "We make options, assumptions, risks and trade-offs visible, then shape the strongest direction into an executive-ready recommendation.",
    visual: "strategy",
  },
  {
    number: "03",
    eyebrow: "Growth execution",
    title: "Carry the decision through to measurable action.",
    copy: "When implementation is required, we translate strategy into sequenced work across positioning, digital presence, campaigns, marketplaces and measurement.",
    visual: "execution",
  },
];

const approach = [
  ["01", "Clarify the decision", "We define the question, desired outcome, constraints and what must be true for the decision to succeed."],
  ["02", "Investigate the evidence", "We gather market, customer, competitor and performance signals while separating facts from assumptions."],
  ["03", "Choose the next move", "We evaluate credible options, expose trade-offs and recommend a practical direction with clear accountability."],
];

const proof = [
  "Facts separated from assumptions",
  "Knowledge gaps made visible",
  "Risks and trade-offs documented",
  "Recommendations linked to action",
];

const outcomes = [
  ["Growth questions clarified", "18"],
  ["Priority opportunities surfaced", "12"],
  ["Decision pathways built", "09"],
  ["Average clarity score", "92%"],
];

const insights = [
  ["Market entry · 8 min", "The hidden cost of entering a market too early"],
  ["Customer intelligence · 6 min", "What customers say—and what their behaviour reveals"],
  ["Execution · 7 min", "Why growth plans fail after the strategy deck"],
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.78, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main id="top">
      <header className={scrolled ? "header is-scrolled" : "header"}>
        <div className="shell nav-shell">
          <a className="logo" href="#top"><span className="logo-mark">S</span><span>Strat IQ</span></a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
          </nav>
          <a className="nav-cta" href="#contact">Start Discovery <ArrowDownRight size={17} /></a>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
        </div>
        {open && (
          <motion.nav className="mobile-nav" initial={reduce ? false : { opacity: 0, y: -10 }} animate={reduce ? undefined : { opacity: 1, y: 0 }}>
            {nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}</a>)}
          </motion.nav>
        )}
      </header>

      <section className="hero">
        <div className="shell hero-copy">
          <motion.p className="kicker" initial={reduce ? false : { opacity: 0, y: 18 }} animate={reduce ? undefined : { opacity: 1, y: 0 }}>Business intelligence & growth advisory</motion.p>
          <motion.h1 initial={reduce ? false : { opacity: 0, y: 24 }} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={{ delay: .08, duration: .8 }}>
            Business questions.<br /><span>Clearly answered.</span>
          </motion.h1>
          <motion.div className="hero-meta" initial={reduce ? false : { opacity: 0, y: 22 }} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={{ delay: .16, duration: .8 }}>
            <p>We help organisations understand markets, evaluate opportunities and move important commercial decisions from uncertainty to action.</p>
            <a href="#capabilities">See our capabilities <ArrowDownRight size={20} /></a>
          </motion.div>
        </div>

        <motion.div className="hero-poster shell" initial={reduce ? false : { opacity: 0, scale: .985 }} animate={reduce ? undefined : { opacity: 1, scale: 1 }} transition={{ delay: .2, duration: 1 }}>
          <div className="poster-grid" />
          <div className="poster-heading"><span>Decision brief / 01</span><h2>Why have enquiries slowed while repeat business remains stable?</h2></div>
          <div className="poster-note note-one"><small>Observed signal</small><strong>Website enquiries −18%</strong><p>The decline is concentrated among first-time visitors.</p></div>
          <div className="poster-note note-two"><small>Known</small><strong>Repeat customers remain stable</strong><p>Service satisfaction is unlikely to be the primary issue.</p></div>
          <div className="poster-note note-three"><small>Decision</small><strong>Improve visibility before increasing spend</strong><p>Prioritise search and enquiry conversion first.</p></div>
        </motion.div>
      </section>

      <section className="manifesto section" id="about">
        <div className="shell two-col-intro">
          <Reveal><p className="eyebrow">Just to clarify</p></Reveal>
          <Reveal delay={.08}><h2>Important business decisions deserve more than instinct, fragmented data and familiar answers.</h2></Reveal>
        </div>
      </section>

      <section className="editorial-block section-small">
        <div className="shell editorial-grid">
          <Reveal className="editorial-visual visual-a"><span>Market signal</span><span>Customer evidence</span><span>Commercial risk</span><i /></Reveal>
          <Reveal className="editorial-copy" delay={.08}><p className="eyebrow">Clarity before commitment</p><h3>We investigate before we recommend.</h3><p>Growth questions are rarely solved by one report or one campaign. We build a structured picture of the market, customer, competition and internal reality before deciding what should happen next.</p></Reveal>
        </div>
      </section>

      <section className="editorial-block section-small">
        <div className="shell editorial-grid reverse">
          <Reveal className="editorial-copy"><p className="eyebrow">From intelligence to action</p><h3>The recommendation is only useful when it changes the next move.</h3><p>We connect evidence to strategy, execution and measurement so insights do not disappear into a presentation. Every engagement produces a decision, a roadmap and visible accountability.</p></Reveal>
          <Reveal className="editorial-visual visual-b" delay={.08}><div>Evidence</div><div>Options</div><div>Decision</div></Reveal>
        </div>
      </section>

      <section className="capabilities section" id="capabilities">
        <div className="shell two-col-intro">
          <Reveal><p className="eyebrow">Our capabilities</p></Reveal>
          <Reveal delay={.08}><h2>From understanding the market to implementing the next move.</h2></Reveal>
        </div>
        <div className="shell capability-list">
          {capabilities.map((item, index) => (
            <article className="capability-row" key={item.number}>
              <Reveal className="capability-index"><strong>{item.number}</strong><span>{item.eyebrow}</span></Reveal>
              <Reveal className="capability-text" delay={.05}><h3>{item.title}</h3><p>{item.copy}</p><a href="#contact">Discuss this capability <ArrowDownRight size={18} /></a></Reveal>
              <Reveal className={`capability-art ${item.visual}`} delay={.1}><span>0{index + 1}</span><i /><i /><i /></Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="statement-band"><div className="shell statement-stack"><Reveal><p>Ask better.</p></Reveal><Reveal delay={.08}><p>Investigate deeper.</p></Reveal><Reveal delay={.16}><p>Move with confidence.</p></Reveal></div></section>

      <section className="approach section" id="approach">
        <div className="shell two-col-intro inverse"><Reveal><p className="eyebrow">Our approach</p></Reveal><Reveal delay={.08}><h2>A disciplined path from uncertainty to action.</h2></Reveal></div>
        <div className="shell approach-list">
          {approach.map(([number, title, copy], index) => <Reveal className="approach-row" key={number} delay={index * .07}><span>{number}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
        </div>
      </section>

      <section className="proof section">
        <div className="shell proof-grid">
          <Reveal className="proof-art"><div /><div /><strong>IQ</strong></Reveal>
          <Reveal className="proof-copy" delay={.08}><p className="eyebrow">Evidence changes the conversation</p><h2>Recommendations become stronger when assumptions are visible.</h2><div className="proof-list">{proof.map((item) => <span key={item}><Check size={18} />{item}</span>)}</div></Reveal>
        </div>
      </section>

      <section className="numbers section">
        <div className="shell two-col-intro"><Reveal><p className="eyebrow">By the numbers</p></Reveal><Reveal delay={.08}><h2>Useful intelligence should create visible movement.</h2></Reveal></div>
        <div className="shell numbers-grid">{outcomes.map(([label, value], index) => <Reveal className="number" key={label} delay={index * .06}><span>{label}</span><strong>{value}</strong></Reveal>)}</div>
      </section>

      <section className="insights section" id="insights">
        <div className="shell two-col-intro"><Reveal><p className="eyebrow">Featured intelligence</p></Reveal><Reveal delay={.08}><h2>Ideas for leaders making the next decision.</h2></Reveal></div>
        <div className="shell insight-list">{insights.map(([meta, title], index) => <Reveal className="insight-row" key={title} delay={index * .06}><span>0{index + 1}</span><div><small>{meta}</small><h3>{title}</h3></div><ArrowDownRight size={28} /></Reveal>)}</div>
      </section>

      <section className="contact section" id="contact">
        <div className="shell contact-grid"><Reveal><p className="eyebrow">Contact</p><h2>Bring us the decision you need to make.</h2></Reveal><Reveal className="contact-card" delay={.08}><p>Tell us what is changing, what feels uncertain and what decision is waiting. We will begin by clarifying the question.</p><a href="mailto:hello@stratiq.example">hello@stratiq.example <ArrowRight size={22} /></a></Reveal></div>
      </section>

      <footer><div className="shell footer-grid"><a className="logo" href="#top"><span className="logo-mark">S</span><span>Strat IQ</span></a><p>Business intelligence & growth advisory.</p><a href="#top">Back to top ↑</a></div></footer>
    </main>
  );
}
