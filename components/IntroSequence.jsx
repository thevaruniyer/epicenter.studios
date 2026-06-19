"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import FitText from "./FitText";
import TypingSubtitle from "./TypingSubtitle";

/*
  ONE continuous pinned timeline for the whole intro so every hand-off is a
  forced, scroll-locked animation (no section boundaries, no dead scrolling):

    wordmark  ->  manifesto copy (line by line)  ->  "design with a point of
    view" (centered, marks + typing)  ->  placeholder zoom to fullscreen

  Each phase is strictly sequenced: one element is fully gone before the next
  fades in, so there's never a half/half mid-state, and the gaps between phases
  are tight.
*/

// Manifesto copy, split into reveal lines (reading order).
const LINES = [
  <>
    By the end of the week, your client will have seen{" "}
    <span className="blur-word">a hundred pitches</span>.
  </>,
  <>
    A hundred decks with the same fonts, the same{" "}
    <span className="green-warp font-semibold">gradients</span>, the same safe
    bet.
  </>,
  <>Most of them built to avoid blame, not earn attention.</>,
  <>We&rsquo;re not here to tick boxes.</>,
  <>
    <span className="font-black tracking-tightest">
      epicenter<span className="text-accent">.studios</span>
    </span>{" "}
    is design that has a point of view.
  </>,
  <>Identities that hold. Decks that make people lean in.</>,
  <>We&rsquo;re not running from the brief. We&rsquo;re running straight at it.</>,
  <>Make it readable. Memorable.</>,
  <>
    <span className="font-serif font-semibold italic text-accent inline-block [transform:skewX(-7deg)]">
      Anything but forgettable.
    </span>
  </>,
];
const PARA_STARTS = new Set([3, 4, 7]);
const REVEAL_START = 0.11;
const REVEAL_END = 0.4;

const IDEALS = [
  "Design that argues for your brand.",
  "We make the safe option look expensive.",
  "Decks that close. Identities that compound.",
  "Craft is the strategy, not the garnish.",
  "If it could be ignored, we rebuilt it.",
  "Distinctive beats decorative. Every time.",
];

const FEATURE_IMAGES = [
  "/assets/placeholder_feature1.jpg",
  "/assets/placeholder_feature2.jpg",
];

function FloatingMark({ className, size, delay = 0, duration = 9, opacity = 0.5 }) {
  return (
    <motion.img
      src="/assets/sunburst-mark.svg"
      alt=""
      aria-hidden
      style={{ width: size, height: size, opacity }}
      className={`pointer-events-none absolute select-none ${className}`}
      animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Line({ children, progress, start, end, spaced }) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <motion.p
      style={{ opacity }}
      className={`text-[clamp(20px,3.4vw,40px)] font-medium leading-[1.28] tracking-tight text-paper ${
        spaced ? "mt-[0.7em]" : ""
      }`}
    >
      {children}
    </motion.p>
  );
}

export default function IntroSequence() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // 1. WORDMARK — fades + lifts away immediately on scroll.
  const markOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const markY = useTransform(scrollYProgress, [0, 0.06], [0, -50]);
  const scrollCue = useTransform(scrollYProgress, [0, 0.03], [1, 0]);

  // 2. COPY — fades in after the wordmark, lights up line by line, fades out.
  const copyOpacity = useTransform(
    scrollYProgress,
    [0.06, 0.1, 0.43, 0.47],
    [0, 1, 1, 0]
  );
  const copyY = useTransform(scrollYProgress, [0.06, 0.1], [20, 0]);

  // 3. DESIGN SLIDE — forced in right after the copy leaves (sequenced, no
  //    overlap), held, then out as the placeholder zooms.
  const designOpacity = useTransform(
    scrollYProgress,
    [0.47, 0.51, 0.6, 0.66],
    [0, 1, 1, 0]
  );
  const designY = useTransform(scrollYProgress, [0.47, 0.51, 0.66], [40, 0, -50]);
  const marksOpacity = useTransform(
    scrollYProgress,
    [0.47, 0.51, 0.6, 0.66],
    [0, 1, 1, 0]
  );

  // 4. PLACEHOLDER — appears low with the design slide, then zooms to fill.
  const featOpacity = useTransform(scrollYProgress, [0.47, 0.51], [0, 1]);
  const featScale = useTransform(scrollYProgress, [0.64, 0.96], [0.34, 1]);
  const featY = useTransform(scrollYProgress, [0.64, 0.96], ["36vh", "0vh"]);
  const featRadius = useTransform(scrollYProgress, [0.64, 0.92], [18, 0]);
  const featRadiusPx = useMotionTemplate`${featRadius}px`;
  const featBorder = useTransform(scrollYProgress, [0.64, 0.76], [1, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.64, 0.72, 0.9], [1, 1, 0]);

  const span = REVEAL_END - REVEAL_START;
  const n = LINES.length;

  return (
    <section ref={ref} id="top" className="relative h-[540vh] bg-ink">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* WORDMARK */}
        <motion.div
          style={{ opacity: markOpacity, y: markY }}
          className="absolute inset-x-0 bottom-0 px-6 pb-[6vh] md:px-10"
        >
          <FitText>
            <span
              style={{ fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 0.85 }}
            >
              <span style={{ color: "#fdfdfd" }}>epicenter</span>
              <span style={{ color: "#006b3c" }}>.studios</span>
            </span>
          </FitText>
        </motion.div>

        {/* MANIFESTO COPY */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="absolute inset-0 flex items-center"
        >
          <div className="mx-auto w-full max-w-[1180px] px-6 md:px-10">
            {LINES.map((line, i) => {
              const start = REVEAL_START + (i / n) * span;
              const end = start + (span / n) * 1.6;
              return (
                <Line
                  key={i}
                  progress={scrollYProgress}
                  start={start}
                  end={end}
                  spaced={PARA_STARTS.has(i)}
                >
                  {line}
                </Line>
              );
            })}
          </div>
        </motion.div>

        {/* FLOATING MARKS (design slide) */}
        <motion.div style={{ opacity: marksOpacity }} className="absolute inset-0">
          <FloatingMark className="left-[8%] top-[20%]" size={86} opacity={0.55} duration={10} />
          <FloatingMark className="right-[12%] top-[16%]" size={54} opacity={0.4} delay={1.2} duration={8} />
          <FloatingMark className="right-[20%] top-[46%]" size={120} opacity={0.6} delay={0.6} duration={11} />
          <FloatingMark className="left-[16%] top-[58%]" size={64} opacity={0.45} delay={1.8} duration={9} />
        </motion.div>

        {/* DESIGN WITH A POINT OF VIEW */}
        <motion.div
          style={{ opacity: designOpacity, y: designY }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-[clamp(34px,7vw,108px)] font-black leading-[0.95] tracking-tightest text-paper">
              Design with a<br />point of view<span className="text-accent">.</span>
            </h2>
            <p className="mt-7 min-h-[2.4em] max-w-[20ch] text-[clamp(16px,2.4vw,30px)] font-light leading-snug text-paper/90 sm:max-w-none">
              <TypingSubtitle phrases={IDEALS} />
            </p>
          </div>
        </motion.div>

        {/* PLACEHOLDER — two images flush, zooms to fullscreen */}
        <motion.div
          style={{ opacity: featOpacity, scale: featScale, y: featY }}
          className="absolute inset-0 z-20 flex items-center justify-center"
        >
          <motion.div
            style={{ borderRadius: featRadiusPx }}
            className="relative aspect-[16/10] h-screen max-h-screen w-screen overflow-hidden"
          >
            <div className="flex h-full w-full">
              {FEATURE_IMAGES.map((src, i) => (
                <div key={i} className="relative h-full flex-1 overflow-hidden">
                  <img src={src} alt={`Featured ${i + 1}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <motion.div
              style={{ opacity: featBorder }}
              className="pointer-events-none absolute inset-0 rounded-[18px] ring-1 ring-white/10"
            />
            <motion.div style={{ opacity: captionOpacity }} className="absolute bottom-6 left-6 z-10">
              <p className="text-xs uppercase tracking-[0.3em] text-paper/70">Featured</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* SCROLL CUE */}
        <motion.div
          style={{ opacity: scrollCue }}
          className="pointer-events-none absolute bottom-8 right-6 z-30 text-[11px] uppercase tracking-[0.3em] text-faint md:right-10"
        >
          Scroll
        </motion.div>
      </div>
    </section>
  );
}
