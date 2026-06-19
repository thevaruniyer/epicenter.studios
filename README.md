# Epicenter Studios — Website

A single-page scrollytelling site for **epicenter.studios**, built with Next.js
and designed to host on Vercel. Black throughout, Satoshi only, #fdfdfd text.

## The scroll flow

1. **Hero** — the manifesto ("By the end of the week, your client will have seen
   a hundred pitches…"), with *Anything but forgettable* in italics. Fades and
   scales out as you scroll.
2. **Slide 2** — "Design with a point of view." with floating sunburst marks and
   a **typewriter subtitle** that cycles through the studio's ideals.
3. **Zoom** — the feature asset at the bottom of slide 2 **scales up to fill the
   screen** as you scroll (one continuous pinned scene).
4. **Studio statement** — "We are Epicenter Studios…", revealed line by line.
5. **Recent work** — an offset editorial grid. Each image **zooms on hover**, and
   **all images motion-blur as you scroll** (blur is driven by scroll velocity).
6. **Closing quote** — Mike Markkula's *Impute* quote, with attribution.
7. **Footer** — the `epicenter.studios` long logo + contact.

## Tech stack

- **Next.js 14** (App Router) — first-class Vercel support
- **Tailwind CSS** — styling
- **Framer Motion** — scroll-linked animation (zoom, fades, reveals, motion blur)
- **Lenis** — smooth scrolling, synced to Framer Motion's frame loop

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Build / preview production:

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. In Vercel: **New Project → Import** the repo.
3. Framework preset auto-detects **Next.js**. No env vars needed.
4. Deploy. That's it.

Or from the CLI:

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

## Fonts — Satoshi

The site uses **Satoshi** (free for commercial use), loaded from Fontshare's CDN
in `app/layout.jsx`:

```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@1,300,400,500,700,900&display=swap" rel="stylesheet">
```

**Hanken Grotesk** is bundled in `/public/fonts` as a near-identical fallback so
the layout still renders correctly if the CDN is ever blocked (and in offline
previews). The font stack is `"Satoshi", "Hanken Grotesk", system-ui, sans-serif`,
so Satoshi always wins when available.

To **self-host Satoshi** instead of the CDN: drop the Satoshi `.woff2` files into
`/public/fonts`, add matching `@font-face` blocks in `app/globals.css` (family
name `Satoshi`), and remove the Fontshare `<link>`.

## Swapping in your real assets

All imagery currently uses **placeholders** so you can tune the effects first.

- **Work grid images** — replace `public/assets/work-1.jpg … work-6.jpg`. Titles,
  years and descriptions live in `components/RecentWork.jsx` (the `WORK` array).
  Each card's column span / aspect ratio is set there too (`className`, `ratio`).
- **The zoom feature image** — replace `public/assets/feature.jpg` (used in
  `components/ManifestoScene.jsx`).
- **Sunburst marks** (`sunburst-mark.svg`, `sunburst-hero.svg`) and the long logo
  (`logo-long.png`) are your real brand assets — already in place.

Keep new images roughly the same aspect ratios for the cleanest layout, or adjust
the `ratio` / `className` values per card.

## Tuning the effects

- **Motion blur strength** — `lib/useScrollBlur.js`, the `max` argument (default 7)
  and the `/ 350` divisor (higher = less sensitive).
- **Hover zoom** — `components/WorkCard.jsx`, the `group-hover:scale-110` class.
- **Zoom-to-fullscreen pacing** — `components/ManifestoScene.jsx`, the
  `useTransform` ranges (e.g. `featScale`). The section height (`h-[320vh]`)
  controls how much scroll the zoom takes.
- **Typewriter phrases / speed** — `components/ManifestoScene.jsx` (`IDEALS`) and
  `components/TypingSubtitle.jsx` (`typeSpeed`, `deleteSpeed`, `hold`).
- **Smooth-scroll feel** — `components/SmoothScroll.jsx` (`duration`, easing).

## A note on dependencies

Pinned to **Next 14.2.35** (latest 14.2.x). Two npm-audit advisories remain whose
only fix is the Next 16 major (a breaking upgrade); they concern self-hosted DoS
vectors and the image optimizer's `remotePatterns`, neither of which this static
marketing site uses, and Vercel patches its platform layer regardless. Upgrade to
Next 16 later if you want them fully cleared.

## Structure

```
app/
  layout.jsx        # Satoshi CDN, metadata, smooth-scroll wrapper
  page.jsx          # assembles the flow
  globals.css       # fonts, base styles, caret animation
components/
  SmoothScroll.jsx  # Lenis ↔ Framer Motion
  Header.jsx        # sunburst logo + menu
  Hero.jsx          # manifesto
  ManifestoScene.jsx# slide 2 + typing subtitle + zoom-to-fullscreen
  TypingSubtitle.jsx
  StudioStatement.jsx
  RecentWork.jsx / WorkCard.jsx
  ClosingQuote.jsx
  Footer.jsx
lib/
  useScrollBlur.js  # scroll-velocity → blur
public/
  assets/           # sunbursts, long logo, placeholder images
  fonts/            # Hanken Grotesk fallback woff2
```
