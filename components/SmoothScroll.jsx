"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { frame, cancelFrame } from "framer-motion";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Drive Lenis from Framer Motion's RAF so scroll-linked motion stays in sync
    function update(data) {
      lenis.raf(data.timestamp);
    }
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
