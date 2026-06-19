"use client";

// Client / project logos, in the studio's dark card language.
const LOGOS = [
  { src: "/assets/logo-unfiltered.jpg", alt: "Unfiltered" },
  { src: "/assets/logo-millionaires.jpg", alt: "The Millionaire's Podcast" },
  { src: "/assets/logo-olu.png", alt: "Olu" },
  { src: "/assets/logo-dormroom.png", alt: "The Dorm Room" },
  { src: "/assets/logo-bodhsara.jpg", alt: "Bodhsara" },
];

function LogoChip({ src, alt }) {
  return (
    <div className="mx-3 flex h-[120px] w-[220px] shrink-0 items-center justify-center rounded-xl border border-white/5 bg-[#141414] p-7">
      <img
        src={src}
        alt={alt}
        className="max-h-full max-w-full object-contain"
        loading="lazy"
      />
    </div>
  );
}

export default function LogoCarousel() {
  return (
    <section className="relative overflow-hidden bg-ink py-[12vh]">
      <div className="mx-auto mb-12 max-w-[1500px] px-6 md:px-10">
        <p className="text-center text-[11px] uppercase tracking-[0.3em] text-faint">
          Trusted by
        </p>
      </div>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent md:w-32" />

      {/* track holds two identical copies so the loop is seamless */}
      <div className="marquee-track flex w-max">
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <LogoChip key={i} src={logo.src} alt={logo.alt} />
        ))}
      </div>
    </section>
  );
}
