import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutPerson from "@/components/AboutPerson";

export const metadata = {
  title: "About Epicenter Studios",
  description:
    "The people behind Epicenter Studios. Two people, one point of view.",
};

// Shared styling for inline links inside the bios.
const LINK =
  "text-paper underline decoration-white/30 underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent";

const Unfiltered = () => (
  <a
    href="https://www.instagram.com/epicenter.unfiltered/"
    target="_blank"
    rel="noopener noreferrer"
    className={LINK}
  >
    epicenter.unfiltered
  </a>
);

const Edmo = () => (
  <a
    href="https://edmo.education"
    target="_blank"
    rel="noopener noreferrer"
    className={LINK}
  >
    edmo.education
  </a>
);

const VARUN = {
  eyebrow: "Who?",
  headlineTop: "Disruption is the point.",
  headlineItalic: "Not the side effect.",
  bio: (
    <>
      I&rsquo;m Varun. I study math and philosophy at Berkeley, and I&rsquo;ve
      been chasing startups since a sixth-grade Shark Tank binge. I turned{" "}
      <Unfiltered /> into one of India&rsquo;s largest student newsrooms, then
      ran point as founder&rsquo;s associate at <Edmo />. I don&rsquo;t inherit
      answers. I take the system apart, ask why it ever worked, and rebuild the
      half that doesn&rsquo;t. Conviction over consensus. The climb over the
      summit. I&rsquo;d sooner bet the house on a vision than ship another
      &lsquo;me too&rsquo;.
    </>
  ),
  goodAt: [
    "AI & LLMs",
    "Brand strategy",
    "Building 0 to 1",
    "Conviction",
    "Copywriting",
    "First principles",
    "Pitching",
    "Storytelling",
    "Taking systems apart",
  ],
  suckAt: [
    "Accepting \u201cgood enough\u201d",
    "Caring once I\u2019ve won",
    "Letting a loss go",
    "LinkedIn bios",
    "Sitting still",
    "Small talk",
    "Taking the safe bet",
  ],
  image: "/assets/varun.jpg",
  imageAlt: "Varun",
  imageSide: "right",
  objectPosition: "center 28%",
};

const AARNAV = {
  eyebrow: "Who?",
  headlineTop: "Relentless.",
  headlineItalic: "Bridge builder by instinct.",
  bio: (
    <>
      I&rsquo;m Aarnav, an economist at heart and a bridge builder by habit. I
      co-founded <Unfiltered /> and turned idle scrolling into one of
      Bangalore&rsquo;s largest student newsrooms, then shaped learning that
      adapts to the student as founder&rsquo;s associate at <Edmo />. I think
      from first principles and steal like an artist, dragging proven ideas
      across disciplines until they fit. Economics is how I read people: why
      they choose what they choose, and why those choices ripple. I find the
      disconnect, then build the bridge.
    </>
  ),
  goodAt: [
    "Behavioural economics",
    "Bridge building",
    "Connecting ideas",
    "First principles",
    "Interviewing",
    "Iteration",
    "Research papers",
    "Stealing like an artist",
  ],
  suckAt: [
    "Calling a draft finished",
    "Closing browser tabs",
    "Following the safe plan",
    "Putting my phone down",
    "Short answers",
    "Small talk that isn\u2019t economics",
    "Taking things at face value",
  ],
  image: "/assets/aarnav.jpg",
  imageAlt: "Aarnav",
  imageSide: "left",
  objectPosition: "center",
};

export default function AboutPage() {
  return (
    <main className="bg-ink">
      <Header />

      {/* Intro band */}
      <section className="px-6 pb-[6vh] pt-[20vh] md:px-10 md:pt-[24vh]">
        <div className="mx-auto max-w-[1300px]">
          <p className="mb-6 text-[11px] uppercase tracking-[0.34em] text-faint">
            About
          </p>
          <h1 className="text-[clamp(40px,7vw,104px)] font-black leading-[0.95] tracking-tightest text-paper">
            Two people.
            <br />
            <span className="font-serif font-semibold italic text-accent">
              One point of view.
            </span>
          </h1>
          <p className="mt-8 max-w-[52ch] text-[clamp(16px,2vw,24px)] font-light leading-[1.5] text-paper/80">
            No bureaucracy. No design by committee. Just two stubborn people who
            care about the work, and the receipts to prove it.
          </p>
        </div>
      </section>

      <AboutPerson {...VARUN} />
      <AboutPerson {...AARNAV} />

      <Footer />
    </main>
  );
}
