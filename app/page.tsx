"use client";

import { ArrowRight, Menu, ShieldCheck, Target, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const navItems = ["Approach", "Capabilities", "Insights", "Case Studies", "About"];

const questions = [
  "Sales have slowed.",
  "Where should we grow next?",
  "Should we enter a new market?",
  "Why are customers leaving?",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <main>
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#" className="brand">Strat IQ</a>
          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}>{item}</a>
            ))}
          </nav>
          <a href="#start" className="button button-gold desktop-cta">Start Discovery <ArrowRight size={17} /></a>
          <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
            <Menu size={22} />
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <p className="eyebrow">Business intelligence & growth advisory</p>
            <h1>Business decisions.<br /><span>Better informed.</span></h1>
            <p className="hero-copy">
              Strat IQ helps organisations answer important commercial questions through structured investigation,
              market intelligence, strategic recommendations and disciplined execution.
            </p>
            <div className="hero-actions">
              <a href="#start" className="button button-gold">Start Discovery <ArrowRight size={18} /></a>
              <a href="#approach" className="button button-outline">Explore Our Approach</a>
            </div>
            <div className="trust-grid">
              <TrustItem icon={<ShieldCheck size={19} />} title="Evidence-led" copy="Facts before opinion" />
              <TrustItem icon={<Target size={19} />} title="Structured thinking" copy="Clarity at every step" />
              <TrustItem icon={<Users size={19} />} title="Human judgement" copy="Experience where it matters" />
            </div>
          </motion.div>

          <DecisionWorkspace />
        </div>
      </section>

      <section className="section" id="approach">
        <div className="container">
          <p className="eyebrow dark">The decisions leaders face</p>
          <div className="section-heading">
            <h2>When experience alone is no longer enough.</h2>
            <p>We help leaders define the real question, test assumptions and make the next move with greater confidence.</p>
          </div>
          <div className="question-grid">
            {questions.map((question, index) => (
              <motion.article
                key={question}
                className={index === 0 ? "question-card featured" : "question-card"}
                whileHover={reduceMotion ? undefined : { y: -5 }}
              >
                <span>0{index + 1}</span>
                <h3>{question}</h3>
                <ArrowRight size={19} />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" id="start">
        <div className="container cta-inner">
          <p className="eyebrow">Start with the question</p>
          <h2>Bring us your biggest business question.</h2>
          <p>Every engagement begins by understanding the decision you need to make before recommending what happens next.</p>
          <a className="button button-gold" href="mailto:hello@stratiq.example">Start Discovery <ArrowRight size={18} /></a>
        </div>
      </section>
    </main>
  );
}

function TrustItem({ icon, title, copy }: { icon: React.ReactNode; title: string; copy: string }) {
  return <div className="trust-item">{icon}<div><strong>{title}</strong><span>{copy}</span></div></div>;
}

function DecisionWorkspace() {
  const reduceMotion = useReducedMotion();
  const cards = [
    ["Business question", "Why have enquiries declined over the last six months?"],
    ["Evidence collected", "Traffic down 18% · repeat customers stable"],
    ["Patterns emerging", "The decline is concentrated in top-of-funnel channels."],
    ["Recommended decision", "Improve search visibility before increasing advertising spend."],
  ];

  return (
    <div className="workspace">
      <div className="workspace-grid" />
      {cards.map(([title, copy], index) => (
        <motion.article
          key={title}
          className={`workspace-card card-${index + 1}`}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.12, duration: 0.55 }}
        >
          <span>{title}</span>
          <p>{copy}</p>
        </motion.article>
      ))}
    </div>
  );
}
