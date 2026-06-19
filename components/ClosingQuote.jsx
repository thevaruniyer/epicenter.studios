"use client";

import { motion } from "framer-motion";

// Staged reveal that fires the moment the quote reaches the viewport (not after
// scrolling deep into it), on its own timeline. Heading -> body -> attribution
// cascade so the whole quote, including the attribution, lights up reliably.
const ease = [0.22, 1, 0.36, 1];
const TRIGGER = { once: true, margin: "0px 0px -25% 0px" };

export default function ClosingQuote() {
  return (
    <section
      id="quote"
      className="relative flex min-h-screen items-center bg-ink px-6 py-[20vh] md:px-10"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.p
          initial={{ opacity: 0.12 }}
          whileInView={{ opacity: 1 }}
          viewport={TRIGGER}
          transition={{ duration: 0.5, ease }}
          className="text-[clamp(26px,4.2vw,58px)] font-medium leading-[1.18] tracking-tight text-paper"
        >
          People <span className="italic text-accent">do</span> judge a book by
          its cover.
        </motion.p>

        <motion.p
          initial={{ opacity: 0.12 }}
          whileInView={{ opacity: 1 }}
          viewport={TRIGGER}
          transition={{ duration: 0.6, delay: 0.22, ease }}
          className="mt-6 max-w-[28ch] text-[clamp(19px,2.6vw,34px)] font-light leading-[1.32] tracking-tight text-paper/85 md:max-w-[40ch]"
        >
          We may have the best product, the highest quality, the most useful
          software; if we present them in a slipshod manner, they will be
          perceived as slipshod. If we present them in a creative, professional
          manner, we will <span className="italic text-accent">impute</span> the
          desired qualities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={TRIGGER}
          transition={{ duration: 0.5, delay: 0.5, ease }}
          className="mt-10 md:mt-12"
        >
          <div className="h-px w-12 bg-paper" />
          <p className="mt-5 text-base font-bold tracking-tight text-paper">
            Mike Markkula
          </p>
          <p className="text-sm font-light text-muted">January 3, 1977</p>
        </motion.div>
      </div>
    </section>
  );
}
