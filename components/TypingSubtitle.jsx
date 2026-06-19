"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Typewriter that types a phrase, holds, deletes, and advances to the next —
 * looping through the studio's guiding ideals.
 */
export default function TypingSubtitle({
  phrases = [],
  typeSpeed = 55,
  deleteSpeed = 28,
  hold = 1500,
  className = "",
}) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | holding | deleting
  const timer = useRef(null);

  useEffect(() => {
    const current = phrases[i % phrases.length] || "";

    if (phase === "typing") {
      if (text.length < current.length) {
        timer.current = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typeSpeed
        );
      } else {
        timer.current = setTimeout(() => setPhase("deleting"), hold);
      }
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timer.current = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deleteSpeed
        );
      } else {
        setPhase("typing");
        setI((v) => v + 1);
      }
    }

    return () => clearTimeout(timer.current);
  }, [text, phase, i, phrases, typeSpeed, deleteSpeed, hold]);

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="caret" />
    </span>
  );
}
