"use client";

import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Menu,
  X,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";

const navItems = ["Approach", "Capabilities", "Insights", "Case Studies", "About"];

const intelligenceItems = [
  {
    label: "Business question",
    value: "Why have qualified enquiries slowed?",
    tone: "question",
  },
  {
    label: "Observed signal",
    value: "Search-led enquiries are down 18% while referrals remain stable.",
    tone: "signal",
  },
  {
    label: "Knowledge gap",
    value: "Is visibility falling, or are more visitors abandoning the enquiry journey?",
    tone: "gap",
  },
  {
    label: "Decision brief",
    value: "Diagnose demand and conversion before increasing acquisition spend.",
    tone: "decision",
  },
] as const;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const visualY = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : 30]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (value) => setScrolled(value > 28));
    return unsubscribe;
  }, [scrollY]);

  return (
    <main>
      <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
        <div className="shell nav-shell">
          <a href="#top" className="brand" aria-label="Strat IQ home">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
            </span>
            <span>Strat IQ</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}>
                {item}
              </a>
            ))}
          </nav>

          <a href="#start" className="button button-primary desktop-cta">
            Start Discovery <ArrowRight size={16} strokeWidth={1.8} />
          </a>

          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        <motion.div
          className="mobile-panel"
          initial={false}
          animate={menuOpen ? "open" : "closed"}
          variants={{
            open: { height: "auto", opacity: 1 },
            closed: { height: 0, opacity: 0 },
          }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={() => setMenuOpen(false)}
              >
                {item} <ArrowDownRight size={17} />
              </a>
            ))}
            <a className="button button-primary" href="#start" onClick={() => setMenuOpen(false)}>
              Start Discovery <ArrowRight size={16} />
            </a>
          </nav>
        </motion.div>
      </header>

      <section className="hero" id="top">
        <div className="hero-noise" aria-hidden="true" />
        <div className="shell hero-layout">
          <motion.div
            className="hero-copy-wrap"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">
              <span /> Business intelligence & growth advisory
            </p>

            <h1>
              Business decisions.
              <br />
              <em>Better informed.</em>
            </h1>

            <p className="hero-copy">
              We help organisations investigate important commercial questions, understand what the evidence is saying,
              and decide what to do next.
            </p>

            <div className="hero-actions">
              <a href="#start" className="button button-primary">
                Start Discovery <ArrowRight size={17} strokeWidth={1.8} />
              </a>
              <a href="#approach" className="text-link">
                Explore our approach <ArrowDownRight size={17} strokeWidth={1.7} />
              </a>
            </div>

            <div className="trust-row" aria-label="Our working principles">
              {["Evidence-led", "Structured thinking", "Human judgement"].map((item) => (
                <span key={item}>
                  <Check size={14} strokeWidth={2} /> {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div className="hero-visual-wrap" style={{ y: visualY }}>
            <motion.div
              className="intelligence-canvas"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="canvas-meta">
                <span>Decision review</span>
                <span>Local growth assessment</span>
              </div>

              <div className="canvas-axis" aria-hidden="true">
                <span>Uncertainty</span>
                <span>Clarity</span>
              </div>

              <div className="intelligence-stack">
                {intelligenceItems.map((item, index) => (
                  <motion.article
                    key={item.label}
                    className={`intelligence-note note-${item.tone}`}
                    initial={reduceMotion ? false : { opacity: 0, x: 18, y: 12 }}
                    animate={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
                    transition={{
                      duration: 0.58,
                      delay: 0.34 + index * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={reduceMotion ? undefined : { x: -4 }}
                  >
                    <span className="note-index">0{index + 1}</span>
                    <div>
                      <span className="note-label">{item.label}</span>
                      <p>{item.value}</p>
                    </div>
                  </motion.article>
                ))}
              </div>

              <motion.div
                className="confidence-rule"
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={reduceMotion ? undefined : { scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span />
                <small>Evidence before action</small>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <div className="shell hero-footer">
          <span>Strat IQ / 01</span>
          <a href="#approach">
            Continue <ArrowDownRight size={16} />
          </a>
        </div>
      </section>

      <section className="sprint-placeholder" id="approach" aria-label="Next sprint placeholder">
        <div className="shell placeholder-inner">
          <p>Next sprint</p>
          <h2>The decisions leaders face.</h2>
        </div>
      </section>

      <div id="start" />
    </main>
  );
}
