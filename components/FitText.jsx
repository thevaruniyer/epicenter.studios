"use client";

import { useRef, useState, useLayoutEffect, useCallback } from "react";

/*
  Scales its (single-line) children to exactly fill the parent width using a
  CSS transform — so the real font renders at its true proportions and simply
  scales as a unit. No glyph stretching, no viewBox rounding. Works identically
  from phone to ultrawide; re-fits on resize and once webfonts finish loading.
*/
export default function FitText({ children, className = "", baseFontSize = 200 }) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(0);
  const [height, setHeight] = useState(0);

  const fit = useCallback(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    // offsetWidth/Height are layout dimensions, unaffected by the transform.
    const innerW = inner.offsetWidth;
    const innerH = inner.offsetHeight;
    const wrapW = wrap.clientWidth;
    if (innerW > 0) {
      const s = wrapW / innerW;
      setScale(s);
      setHeight(innerH * s);
    }
  }, []);

  useLayoutEffect(() => {
    fit();
    const ro = new ResizeObserver(fit);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", fit);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fit);
    }
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [fit]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ width: "100%", height: height ? `${height}px` : undefined }}
    >
      <div
        ref={innerRef}
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          fontSize: `${baseFontSize}px`,
          transform: `scale(${scale || 0.0001})`,
          transformOrigin: "left top",
          // hide until first measure to avoid a one-frame oversized flash
          opacity: scale ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
