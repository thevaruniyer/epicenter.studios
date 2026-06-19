"use client";

import WorkCard from "./WorkCard";
import useScrollBlur from "@/lib/useScrollBlur";

/*
  Containers are sized so each row's two cards land at a similar height — no
  card ends up tiny next to a huge one, and there's no dead negative space:
    Row 1  landscape (col-7) + portrait poster (col-5)
    Row 2  square      (col-6) + square        (col-6)
    Row 3  square      (col-6) + portrait page (col-6, cropped to square)
  object-position keeps the important part of any cropped asset in frame.
*/
const WORK = [
  {
    title: "The Dorm Room",
    desc: "Brand identity & website",
    year: "2025",
    src: "/assets/the-dorm-room.png",
    ratio: "aspect-[5/4]",
    objectPosition: "center",
    className: "md:col-span-7",
    href: "#",
  },
  {
    title: "Badshah of Bollywood",
    desc: "Event creative & key art",
    year: "2025",
    src: "/assets/badshah.jpg",
    ratio: "aspect-[4/5]",
    objectPosition: "center",
    className: "md:col-span-5",
    href: "#",
  },
  {
    title: "Olu",
    desc: "Agentic AI · brand & web",
    year: "2025",
    src: "/assets/olu.png",
    ratio: "aspect-square",
    objectPosition: "center",
    className: "md:col-span-6",
    href: "#",
  },
  {
    title: "Dance of Democracy",
    desc: "Campaign identity & motion",
    year: "2025",
    src: "/assets/dance-1.jpg",
    ratio: "aspect-square",
    objectPosition: "center",
    className: "md:col-span-6",
    href: "#",
  },
  {
    title: "Dance of Democracy",
    desc: "Campaign — film & stills",
    year: "2025",
    src: "/assets/dance-2.jpg",
    ratio: "aspect-square",
    objectPosition: "center",
    className: "md:col-span-6",
    href: "#",
  },
  {
    title: "EDMO",
    desc: "Landing page · design & build",
    year: "2025",
    src: "/assets/edmo.png",
    ratio: "aspect-square",
    objectPosition: "top",
    className: "md:col-span-6",
    href: "#",
  },
];

export default function RecentWork() {
  const blur = useScrollBlur(7);

  return (
    <section id="work" className="relative bg-ink px-6 pb-[18vh] pt-[10vh] md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-14 flex items-end justify-between">
          <h3 className="text-[clamp(28px,4vw,60px)] font-black tracking-tightest text-paper">
            Recent work<span className="text-accent">.</span>
          </h3>
          <span className="hidden text-[11px] uppercase tracking-[0.3em] text-faint sm:block">
            Selected projects
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-x-8 gap-y-12 md:grid-cols-12">
          {WORK.map((item, i) => (
            <WorkCard key={`${item.title}-${i}`} item={item} blur={blur} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
