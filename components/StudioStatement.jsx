"use client";

import { motion } from "framer-motion";

// One flowing statement. Lights up word-by-word the moment it enters view,
// on its own quick timeline — NOT tied to continued scrolling, and triggered
// as soon as the block reaches the viewport (not after scrolling deep into it).
const BODY =
  "We are Epicenter Studios, an independent design and creative studio. We believe brands need a point of view, not just a logo. Founder-led and craft-driven, because the best work comes from small, sharp teams who give a damn. No bureaucracy, no design-by-committee, just clearer thinking, tighter execution, and brands people actually remember.";

const WORDS = BODY.split(" ");

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.014, delayChildren: 0 },
  },
};
const word = {
  hidden: { opacity: 0.14 },
  show: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

// Trigger when the element crosses into the middle of the viewport — i.e. right
// as you scroll to it. The negative bottom margin makes it fire a touch before
// the block is centered, so the cascade reads as "lights up on arrival".
const TRIGGER = { once: true, margin: "0px 0px -30% 0px" };

export default function StudioStatement() {
  return (
    <section id="studio" className="relative bg-ink px-6 py-[24vh] md:px-10">
      <div className="mx-auto max-w-[1100px]">
        <p className="mb-8 text-[11px] uppercase tracking-[0.34em] text-faint md:mb-10">
          The Studio
        </p>

        <motion.h3
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={TRIGGER}
          className="text-[clamp(22px,3.6vw,46px)] font-medium leading-[1.32] tracking-tight text-paper"
        >
          {WORDS.map((w, i) => (
            <motion.span key={i} variants={word} className="inline">
              {w}{" "}
            </motion.span>
          ))}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0.14 }}
          whileInView={{ opacity: 1 }}
          viewport={TRIGGER}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 text-[clamp(19px,2.8vw,34px)] font-bold tracking-tight text-paper md:mt-12"
        >
          Fighting for attention. Making the forgettable,{" "}
          <span className="italic text-accent">unforgettable.</span>
        </motion.p>
      </div>
    </section>
  );
}
