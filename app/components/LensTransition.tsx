"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const signalFragments = [
  { code: "OD", reading: "20 / 20", className: "fragment-od" },
  { code: "OS", reading: "20 / 25", className: "fragment-os" },
  { code: "SPH", reading: "+1.25", className: "fragment-sph" },
  { code: "AXIS", reading: "090°", className: "fragment-axis" },
];

const solutionSignals = ["Signal", "Direction", "Action"];

export default function LensTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const signalX = useTransform(
    scrollYProgress,
    [0, 0.16, 0.34, 0.46, 0.74, 0.9, 1],
    ["-120%", "-64%", "-18%", "0%", "0%", "64%", "120%"],
  );
  const signalScale = useTransform(scrollYProgress, [0, 0.2, 0.38, 0.46, 0.74, 0.9, 1], [0.8, 0.9, 1, 1, 1, 0.94, 0.78]);
  const signalOpacity = useTransform(scrollYProgress, [0, 0.12, 0.24, 0.46, 0.74, 0.88, 1], [0, 0.35, 1, 1, 1, 0.4, 0]);
  const signalFilter = useTransform(
    scrollYProgress,
    [0, 0.18, 0.38, 0.74, 0.9, 1],
    ["blur(12px)", "blur(7px)", "blur(0px)", "blur(0px)", "blur(5px)", "blur(10px)"],
  );
  const signalGap = useTransform(scrollYProgress, [0, 0.2, 0.38, 0.46, 0.74, 0.9, 1], [12, 18, 34, 46, 46, 22, 12]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.18, 0.44], [1, 0.92, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.44], [0, -28]);
  const solutionOpacity = useTransform(scrollYProgress, [0.76, 0.88, 0.96, 1], [0, 0.15, 1, 1]);
  const solutionY = useTransform(scrollYProgress, [0.76, 1], [22, 0]);
  const solutionScale = useTransform(scrollYProgress, [0.76, 1], [0.94, 1]);
  const focusOpacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.18, 0.7, 0.95]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["8%", "100%"]);

  return (
    <section className={`lens-transition ${reduced ? "is-reduced" : ""}`} ref={sectionRef} aria-labelledby="lens-transition-title">
      <div className="lens-sticky">
        <div className="page-wrap lens-layout">
          <motion.div className="lens-intro" style={reduced ? undefined : { opacity: introOpacity, y: introY }}>
            <p className="dot-label"><span aria-hidden="true" />See what matters</p>
            <h2 id="lens-transition-title">Find the signal.</h2>
            <p className="lens-intro-copy">
              The right decision is rarely hidden. It is usually buried beneath too many signals, assumptions and competing routes.
            </p>
            <p className="lens-scroll-hint"><span aria-hidden="true" />Scroll to focus</p>
          </motion.div>

          <div className="lens-stage">
            <motion.div
              className="lens-signal-layer"
              aria-hidden="true"
              style={
                reduced
                  ? undefined
                  : {
                      x: signalX,
                      scale: signalScale,
                      opacity: signalOpacity,
                      filter: signalFilter,
                      gap: signalGap,
                    }
              }
            >
              {signalFragments.map((fragment) => (
                <span className={`lens-fragment ${fragment.className}`} key={fragment.code}>
                  <span className="fragment-code">{fragment.code}</span>
                  <span className="fragment-reading">{fragment.reading}</span>
                </span>
              ))}
            </motion.div>

            <motion.div className="lens-focus-ring" aria-hidden="true" style={reduced ? undefined : { opacity: focusOpacity }} />

            <div className="monocular" aria-hidden="true">
              <span className="monocular-ring monocular-ring-outer" />
              <span className="monocular-ring monocular-ring-mid" />
              <span className="monocular-ring monocular-ring-inner" />
              <span className="monocular-glass" />
              <span className="monocular-reflection reflection-one" />
              <span className="monocular-reflection reflection-two" />
              <span className="monocular-mark monocular-mark-top">STRAT IQ / 01</span>
              <span className="monocular-mark monocular-mark-bottom">FOCUS / 01</span>
            </div>

            <div className="lens-solution-position">
              <motion.div
                className="lens-solution"
                style={
                  reduced
                    ? undefined
                    : { opacity: solutionOpacity, y: solutionY, scale: solutionScale }
                }
              >
                <h3>Clearer decisions.</h3>
                <p>Evidence arranged into a route you can explain, choose and act on.</p>
                <div className="solution-signals">
                  {solutionSignals.map((signal, index) => (
                    <span key={signal}>
                      <i aria-hidden="true">0{index + 1}</i>
                      {signal}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lens-progress">
              <span>UNFOCUSED</span>
              <span className="lens-progress-line"><motion.i style={reduced ? undefined : { width: progressWidth }} /></span>
              <span>DECISION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
