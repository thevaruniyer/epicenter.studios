"use client";

import {
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

/**
 * Returns a CSS `filter` motion template that blurs proportionally to how
 * fast the page is scrolling, then eases back to crisp when scrolling stops.
 * Used to give every image a motion-blur streak during fast scrolls.
 */
export default function useScrollBlur(max = 7) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  // Smooth the raw velocity so the blur doesn't jitter
  const smooth = useSpring(velocity, {
    damping: 50,
    stiffness: 350,
    mass: 0.4,
  });

  // Map |velocity| (px/s) to a blur radius, clamped at `max`
  const blur = useTransform(smooth, (v) => {
    const px = Math.min(max, Math.abs(v) / 350);
    return Math.round(px * 100) / 100;
  });

  return useMotionTemplate`blur(${blur}px)`;
}
