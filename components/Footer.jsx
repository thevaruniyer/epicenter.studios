"use client";

export default function Footer() {
  const toTop = (e) => {
    e.preventDefault();
    const el = document.querySelector("#top");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="border-t border-white/10 bg-ink px-6 py-16 md:px-10">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <div>
          {/* Wordmark typed out in Satoshi, studios in cadmium green */}
          <p className="text-[clamp(28px,3.4vw,46px)] font-black tracking-tightest text-paper">
            epicenter<span className="text-accent">.studios</span>
          </p>
          <p className="mt-6 max-w-[34ch] text-sm font-light leading-relaxed text-muted">
            Design with a point of view. Identities that hold, decks that make
            people lean in, anything but forgettable.
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-faint">
              Contact
            </p>
            <a
              href="mailto:epicenterresponses@gmail.com"
              className="block text-sm text-paper transition-colors hover:text-accent"
            >
              epicenterresponses@gmail.com
            </a>
            <a
              href="tel:+916366509553"
              className="mt-1 block text-sm text-paper transition-colors hover:text-accent"
            >
              +91 63665 09553
            </a>
            <a
              href="tel:+917259022220"
              className="mt-1 block text-sm text-paper transition-colors hover:text-accent"
            >
              +91 72590 22220
            </a>
          </div>

          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-faint">
              Studio
            </p>
            <p className="text-sm text-paper">Bengaluru, IN</p>
            <p className="mt-1 text-sm text-muted">Built to be seen.</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1500px] items-center justify-end border-t border-white/5 pt-6">
        <a
          href="#top"
          onClick={toTop}
          className="text-[11px] uppercase tracking-[0.28em] text-faint transition-colors hover:text-paper"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
