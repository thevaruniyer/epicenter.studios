"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];
const TRIGGER = { once: true, margin: "0px 0px -18% 0px" };

/* The +/− indicator from the reference: a fixed horizontal bar plus a vertical
   bar that collapses to nothing when the panel is open. */
function PlusMinus({ open }) {
  return (
    <span className="relative ml-6 block h-[14px] w-[14px] shrink-0">
      <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-paper" />
      <span
        className={`absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-paper transition-transform duration-300 ${
          open ? "scale-y-0" : "scale-y-100"
        }`}
      />
    </span>
  );
}

function Accordion({ title, items, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-white/15">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-[clamp(18px,2vw,26px)] font-medium tracking-tight text-paper transition-colors group-hover:text-accent">
          {title}
        </span>
        <PlusMinus open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease }}
            className="overflow-hidden"
          >
            <ul className="pb-7">
              {items.map((it, i) => (
                <li
                  key={i}
                  className="text-[clamp(15px,1.5vw,19px)] font-light leading-[1.7] text-paper/85"
                >
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AboutPerson({
  eyebrow = "Who?",
  headlineTop,
  headlineItalic,
  bio,
  goodAt = [],
  suckAt = [],
  image,
  imageAlt,
  imageSide = "right", // "right" | "left"
  objectPosition = "center",
}) {
  const imageLeft = imageSide === "left";

  const TextBlock = (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={TRIGGER}
      transition={{ duration: 0.7, ease }}
      className={`order-2 ${imageLeft ? "md:order-2" : "md:order-1"}`}
    >
      <p className="mb-5 text-[11px] uppercase tracking-[0.34em] text-faint">
        {eyebrow}
      </p>

      <h2 className="text-[clamp(34px,5vw,68px)] font-black leading-[0.98] tracking-tightest text-paper">
        {headlineTop}
        <br />
        <span className="font-serif font-semibold italic text-accent">
          {headlineItalic}
        </span>
      </h2>

      <p className="mt-8 max-w-[46ch] text-[clamp(15px,1.7vw,20px)] font-light leading-[1.55] text-paper/85">
        {bio}
      </p>

      <div className="mt-10">
        <Accordion title="Stuff I'm good at." items={goodAt} defaultOpen />
        <Accordion title="Stuff I suck at." items={suckAt} />
        <div className="border-t border-white/15" />
      </div>
    </motion.div>
  );

  const ImageBlock = (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={TRIGGER}
      transition={{ duration: 0.8, ease }}
      className={`order-1 ${imageLeft ? "md:order-1" : "md:order-2"}`}
    >
      <div className="relative w-full overflow-hidden rounded-xl bg-[#141414] ring-1 ring-white/15">
        <div className="aspect-[4/5] w-full">
          <img
            src={image}
            alt={imageAlt}
            style={{ objectPosition }}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="border-t border-white/5 px-6 py-[12vh] md:px-10">
      <div className="mx-auto grid max-w-[1300px] grid-cols-1 items-center gap-x-12 gap-y-10 md:grid-cols-2 lg:gap-x-20">
        {TextBlock}
        {ImageBlock}
      </div>
    </section>
  );
}
