"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

// Work, Studio, Contact, then About. Hash links resolve to sections on the
// homepage; About is its own route. Contact points to the real contact details
// in the footer (#contact), not the closing quote.
const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Drive the header background opacity directly from scroll position with a
  // motion value, no React state toggling, so it never flickers.
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.7]);
  const blurAmount = useTransform(scrollY, [0, 80], [0, 10]);
  const backdrop = useTransform(blurAmount, (b) => `blur(${b}px)`);

  const pathname = usePathname();
  const router = useRouter();

  const handleNav = (e, href) => {
    e.preventDefault();
    setOpen(false);

    // Route links (e.g. /about) — just navigate.
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }

    // Hash links — smooth-scroll if we're already on the homepage, otherwise
    // go home and let the browser resolve the anchor.
    if (pathname === "/") {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/" + href);
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <motion.div
          style={{ opacity: bgOpacity, backdropFilter: backdrop }}
          className="absolute inset-0 bg-ink"
        />
        <div className="relative mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 md:px-10">
          <a
            href="#top"
            onClick={(e) => handleNav(e, "#top")}
            className="flex items-center gap-3"
          >
            <img
              src="/assets/sunburst-mark.svg"
              alt="Epicenter Studios"
              className="h-8 w-8 md:h-9 md:w-9"
            />
            <span className="text-[15px] font-bold tracking-tight text-paper">
              epicenter<span className="text-accent">.studios</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                className="text-sm text-paper/80 transition-colors hover:text-paper"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`block h-[2px] w-6 bg-paper transition-all duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-paper transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-paper transition-all duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink md:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.08 * i + 0.1, duration: 0.5 }}
                className="text-5xl font-black tracking-tightest text-paper transition-colors hover:text-accent"
              >
                {l.label}.
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
