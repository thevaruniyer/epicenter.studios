"use client";

import { motion } from "framer-motion";
import useScrollBlur from "@/lib/useScrollBlur";

export default function WorkCard({ item, blur, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={item.className}
    >
      <a href={item.href || "#"} className="group block">
        {/* image frame: clips the hover-zoom; motion blur applied here on scroll */}
        <motion.div
          style={{ filter: blur }}
          className="relative w-full overflow-hidden rounded-xl bg-[#141414]"
        >
          <div className={`w-full ${item.ratio}`}>
            <img
              src={item.src}
              alt={item.title}
              style={{ objectPosition: item.objectPosition || "center" }}
              className="h-full w-full scale-100 object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            />
          </div>
          {/* faint hover veil */}
          <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
        </motion.div>

        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h4 className="text-[clamp(18px,1.6vw,24px)] font-medium tracking-tight text-paper">
            {item.title}
          </h4>
          <span className="shrink-0 text-[11px] uppercase tracking-[0.2em] text-faint">
            {item.year}
          </span>
        </div>
        <p className="mt-1 text-sm font-light text-muted">{item.desc}</p>
      </a>
    </motion.div>
  );
}
