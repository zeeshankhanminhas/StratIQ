"use client";

import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const signalFragments = [
  { label: "market", className: "fragment-market" },
  { label: "assumption", className: "fragment-assumption" },
  { label: "signal", className: "fragment-signal" },
  { label: "choice", className: "fragment-choice" },
];

const solutionSignals = ["Signal", "Direction", "Action"];

function useSequentialWordMotion(progress: MotionValue<number>, range: [number, number, number, number]) {
  const [entryStart, entryEnd, exitStart, exitEnd] = range;

  return {
    x: useTransform(progress, [entryStart, entryEnd, exitStart, exitEnd], ["-120%", "0%", "0%", "120%"]),
    opacity: useTransform(progress, [entryStart, entryEnd, exitStart, exitEnd], [0, 1, 1, 0]),
    scale: useTransform(progress, [entryStart, entryEnd, exitStart, exitEnd], [0.86, 1, 1, 0.9]),
    filter: useTransform(
      progress,
      [entryStart, entryEnd, exitStart, exitEnd],
      ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"],
    ),
  };
}

export default function LensTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const marketMotion = useSequentialWordMotion(scrollYProgress, [0.03, 0.09, 0.22, 0.28]);
  const assumptionMotion = useSequentialWordMotion(scrollYProgress, [0.28, 0.34, 0.47, 0.53]);
  const signalMotion = useSequentialWordMotion(scrollYProgress, [0.53, 0.59, 0.72, 0.78]);
  const choiceMotion = useSequentialWordMotion(scrollYProgress, [0.78, 0.84, 0.94, 0.99]);
  const wordMotions = [marketMotion, assumptionMotion, signalMotion, choiceMotion];
  const introOpacity = useTransform(scrollYProgress, [0, 0.18, 0.44], [1, 0.92, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.44], [0, -28]);
  const solutionOpacity = useTransform(scrollYProgress, [0.94, 0.98, 1], [0, 0.2, 1]);
  const solutionY = useTransform(scrollYProgress, [0.94, 1], [22, 0]);
  const solutionScale = useTransform(scrollYProgress, [0.94, 1], [0.94, 1]);
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
            <div className="lens-signal-layer" aria-hidden="true">
              {signalFragments.map((fragment, index) => (
                <motion.span
                  className={`lens-fragment ${fragment.className}`}
                  key={fragment.label}
                  style={reduced ? undefined : wordMotions[index]}
                >
                  {fragment.label}
                </motion.span>
              ))}
            </div>

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
