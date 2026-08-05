@AGENTS.md

# sections — global instructions

A Next.js gallery of standalone, pixel-faithful marketing sections. Each `app/section-N/`
route is one self-contained design implemented from three Figma frames (mobile, tablet,
desktop) and built around one or more **OriginKit** components.

**Sections 12–30 are the implementation standard.** Sections 1–11 and `app/Harsh/*` are
legacy — default Tailwind breakpoints, everything inlined in `page.tsx`. Never copy their
structure.

---

## Standing rules

- **Do not run or kill the dev server** unless explicitly instructed.
- **Never trust Figma absolute positioning.** Flex → grid → transforms → absolute, in that
  order. See [Layout rules](#layout-rules).
- **Always use the project breakpoints**: `ipad`, `desktop-sm`, `wide-lg`, `ultrawide`
  (plus `full-hd` where a design needs it). Never `sm:` / `md:` / `lg:` / `xl:`.
- **If the Figma source contains a mask group, confirm the integration approach with me
  before implementing it.** See [Masks](#masks).
- **Never rewrite an OriginKit component.** Configure it through props.
- Read `node_modules/next/dist/docs/` before using an unfamiliar Next.js API. This version
  has breaking changes relative to training data.

---

## Project philosophy

**Figma is the spec, not the source.** Every measurement is honoured; the *mechanism* is
re-derived. Figma flattens live effects into PNGs, expresses grids as 12,000 absolutely-
positioned rects, and bakes gradients into `foreignObject` SVGs. The job is the smallest
CSS/DOM structure that reproduces those pixels **and stays correct** when the viewport is
not exactly 402 / 744 / 1440.

Four principles, each visible throughout the repo:

1. **Re-derive, don't re-export.** `section-29/edge-dot-bands.tsx` replaces a 4 MB Figma
   mask-group SVG with one data-URI tile and three `background-size` values.
   `section-28/marquee-band.tsx` recovers a curve's radius from Figma's per-glyph rotations
   and drops Figma's two opaque clip discs entirely.
2. **Anchor to the thing, not to the frame.** A decoration on a grid rule is a function of
   the rule — `calc(63px + k * cell)` — never the 1440-only pixel Figma reports.
3. **Derive one number, not many.** When several values move together, express them from a
   single driver: `section-28/marquee-band.tsx` derives `curveAmount` and `fontSize` from
   band width alone; `section-29/ascii-art.tsx` derives `columns` from measured width at a
   fixed 1.57px character pitch.
4. **Explain the non-obvious in the file.** Every deviation from Figma's literal numbers
   carries a block comment naming the Figma node and the reason. This is the most
   distinctive convention here — match it.

Code quality bar: readable, composable, production-ready. No dead code, no commented-out
blocks, no `any`, no unused props.

> **Known dead code — do not imitate:** `app/section-21/components/ui/background.tsx` is an
> unimported raw Figma paste (`bg-lime-700`, duplicated blocks, default export). It is the
> exact anti-pattern this document exists to prevent.

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript strict |
| Styling | Tailwind CSS v4 — config lives in `app/globals.css` via `@theme inline` |
| Animation | `motion` v12 (`motion/react`) + CSS `@keyframes` in `globals.css` |
| 3D / canvas | `three`, plus hand-rolled canvas in OriginKit components |
| Data / misc | `d3-geo` (globe), `dialkit` |
| Fonts | `lib/fonts/font.ts` — next/font, exposed as `font-*` utilities |
| Icons | Per-section SVGs in `public/section-N/`. No icon library. |
| Package manager | pnpm |

No `cn()` / `clsx` / `tailwind-merge`, no shared UI library, no design-token palette. Class
names are composed with template literals. Keep it that way unless asked otherwise.

---

## Folder structure

```
app/
  globals.css                     # theme: breakpoints, fonts, keyframes, utility classes
  layout.tsx                      # font variables on <html>; body is a flex column
  section-N/
    page.tsx                      # metadata + one-line default export
    components/                   # ('component/' in 19–20, 22–29 — do not rename those)
      ui/
        section-N-hero.tsx        # section root; named export
        navbar.tsx  button.tsx    # repeated contracts — see Component rules
        hero-content.tsx          # copy + CTAs, split out when the root gets long
        <part>.tsx                # backdrop, cards, grid-pattern, stages, marquees…
        use-<thing>.ts            # breakpoint-tier hooks / data-only modules
      originkit/
        <component-name>.tsx      # vendored OriginKit source, default export
public/section-N/                 # all runtime assets for that section
```

`app/section-N/assets/` exists in sections 12–16 for Figma reference screenshots and
source art. Runtime assets always live in `public/section-N/`.

### Naming

| Thing | Convention |
| --- | --- |
| Folder | `section-N` |
| File | kebab-case; root is `section-N-<purpose>.tsx` (`-hero`, `-why`, `-footer`) |
| Component | PascalCase, **named export** from `ui/`. Default export **only** in `originkit/`. |
| Constant | `SCREAMING_SNAKE` at module scope, above the component, with its Figma node in a comment |
| Mask string | `*_MASK` — `HAND_MASK`, `FLAG_MASK`, `EDGE_MASK`, `BOLT_MASK`, `CORE_MASK` |
| Gradient fill | `*_FILL` / `*_SHEEN` — `PRIMARY_CTA_FILL`, `PILL_SHEEN`, `CARD_SHEEN` |
| Easing | `EASE_OUT` (house standard) or `EASE` |
| Link data | `NAV_LINKS`, `LINK_COLUMNS`, `SOCIAL_LINKS` |
| Tier breakpoint | `IPAD_MIN = 768`, `DESKTOP_SM_MIN = 1280`, `FULL_HD_MIN = 1920` |

### Imports & exports

- `@/*` maps to the repo root — use it for `lib/`; relative paths inside a section.
- Assets are referenced by absolute public path (`/section-30/menu.svg`), never imported.
- `page.tsx` is always:
  ```tsx
  import type { Metadata } from "next";
  import { SectionNHero } from "./components/ui/section-N-hero";

  export const metadata: Metadata = { title: "<Brand> — <Headline>", description: "<sub>" };

  const SectionN = () => <SectionNHero />;
  export default SectionN;
  ```
- `"use client"` goes on the **smallest** subtree that needs it. Pure-markup roots stay
  server components (sections 24, 27, 28, 29, 30).

---

## Component rules

- **Search before you build.** Nearly every primitive already exists in sections 12–30.
- **Never recreate an OriginKit component.** Vendor it into `originkit/` with its header
  comment intact and drive it entirely through props from a thin `ui/` wrapper.
- **The `ui/` wrapper owns geometry; the OriginKit component owns the effect.**
- **Compose over duplicate** (`section-29/cards.tsx`: `Plate` → `FeatureCard` / `WideCard`).
- **Extend, don't replace.** Add an optional prop with a behaviour-preserving default.

### The `Button` contract

Sections 12, 15, 18, 19, 20 each ship `ui/button.tsx` with the same shape. **Copy the
nearest one and restyle the variants** — do not invent a new API.

```tsx
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;   // "primary" | "secondary" | plus section-specific ("nav", "glass", "ghost")
  children: ReactNode;
};
// BASE_CLASS holds shared layout + a11y + interaction; variants layer colour on top.
export const Button = ({ variant = "primary", children, className = "", type = "button", ...props }) => …
```

`BASE_CLASS` always contains this exact interaction/a11y stack:

```
inline-flex items-center justify-center whitespace-nowrap cursor-pointer touch-manipulation
transition-[opacity,transform] duration-200 ease-out
[-webkit-tap-highlight-color:transparent]
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-<contrast>
active:scale-[0.97] motion-reduce:active:scale-100
[@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90
```

Inset bevels go on an `aria-hidden` overlay `<span>` with `rounded-[inherit]`, or a
`before:` pseudo-element. Both appear; the span is clearer and more common.

### The `Navbar` contract

Sections 12, 14, 17, 19 each ship `ui/navbar.tsx`:

```tsx
<nav aria-label="Primary" className="relative z-30 w-full">
  <div className="… desktop-sm:hidden">      {/* mobile + tablet: logo + hamburger */}
  <div className="hidden … desktop-sm:flex"> {/* desktop: logo + links + actions */}
</nav>
```

- Logo is `<a aria-label="<Brand> home">` wrapping an `aria-hidden` mark + wordmark.
- Links are `<ul>`/`<li>`/`<a>` carrying `min-h-11` and the same focus/hover stack.
- A `handleKeyDown(event, href)` helper activates hash links on Enter/Space.
- Hamburger: `<button type="button" aria-label="Open menu">` with `min-h-11 min-w-11`.

Sections 25–30 inline the nav in the section root instead. Both are acceptable — split it
out once the root exceeds ~250 lines.

---

## Layout rules

Order of preference, strictly:

1. **Flex** — the default for everything Figma gave auto-layout.
2. **Grid** — genuine two-dimensional content, or decoration that must land on grid-cell
   coordinates (`section-29/corner-blocks.tsx`).
3. **Transforms** — `-translate-x-1/2`, `rotate-*`, `scale-*`.
4. **Absolute** — last resort.

**Never trust Figma absolute positioning.** Figma reports absolute x/y for nodes that are
plainly a flow. Before writing an absolutely-positioned *content* node, ask: must it overlap
something, or sit outside its own measured box? If not, it is flow.

Absolute **is** correct for:
- Decoration Figma itself places absolutely — grids, washes, glows, dot bands, noise,
  rule-intersection markers.
- Art that must overflow the box it is measured by (`section-29/ascii-art.tsx`).
- One breakpoint taking an element out of flow (`section-30` chat bubbles are stacked on
  mobile/tablet, `desktop-sm:absolute` on desktop).

**When absolute coordinates are unavoidable, re-base them to their own block.** Figma's y is
measured from the frame; subtract the block's own offset so the numbers survive anything
above them changing (`section-27/neural-diagram.tsx`: "the mobile frame places it at y382 …
so each Figma y is the original minus that").

### Section shell

```tsx
<main className="relative w-full overflow-hidden bg-[#hex]">   {/* backdrop bleeds */}
  <div className="relative mx-auto w-full max-w-[402px] ipad:max-w-[744px] desktop-sm:max-w-[1440px]">
    {/* background layers — absolute, aria-hidden, pointer-events-none */}
    {/* content — flex column, z-indexed above */}
  </div>
</main>
```

Cap the **stage**, let the **backdrop** bleed. Capping preserves Figma's line breaks;
bleeding keeps gradients reaching the screen edges.

### Height — the frame height is a floor, not a height

**Height is a separate decision from width, and it is not either/or.** Desktop frames in this
project run 800–900px; real laptops are 900–1200. A hero pinned to its frame height therefore
ends mid-screen and shows bare `--background` grey below it. This has shipped wrong more than
once. Take Figma's height as the **minimum**:

```tsx
desktop-sm:h-[811px] desktop-sm:min-h-dvh
```

Then decide where the surplus goes — leaving this implicit is the actual bug, because the
default (everything top-anchored) strands the lower band off the fold:

| The frame's bottom edge is… | Do |
| --- | --- |
| dead space under the last content | nothing else — `min-h-dvh` alone is right |
| a band that reads as sitting on the fold (stats, logo strip, footer rule) | measure that band from the bottom: `desktop-sm:top-auto desktop-sm:bottom-[Npx]` |
| …and then everything between the two pinned bands | wrap it and hang each block off **that band's** centre at its Figma offset: `desktop-sm:top-[calc(50%-Npx)] desktop-sm:-translate-y-1/2` |

**Offsets, not absolute y.** `calc(50% - N)` reproduces Figma exactly at the frame height and
lets every block in the band drift by the same amount as it grows — absolute y does neither.
Derive `N` once: `N = bandCentre − figmaTop − blockHeight / 2`.

Two things that bite:

- Anything switched to a bottom offset must flip its centring transform as well —
  `-translate-y-1/2` → `desktop-sm:translate-y-1/2` — or a rule tick lands a full height off.
- A middle-band wrapper spanning the stage needs `pointer-events-none`, with
  `pointer-events-auto` on the interactive block inside, or it swallows nav clicks.

`section-31` is the worked example: nav band pinned top, stats + brand strip pinned bottom,
copy and visual centred in what is left. Stacked frames (mobile/tablet) are normally taller
than their viewport already and need none of this — apply it at `desktop-sm:` only.

Use explicit frame heights with no floor **only** when Figma's height is genuinely load-bearing
*and* the section is not the first thing on the page.

### z-index scale

Consistent across the repo — follow it rather than inventing values:

| Layer | z |
| --- | --- |
| Backdrop, ambience, washes | `z-0` |
| Pattern/decoration between backdrop and content | `z-[1]`–`z-[5]` |
| Primary content | `z-10` |
| Content that must sit over decoration (copy, cards) | `z-20` |
| Nav, and art painted over everything | `z-30` |

Add `isolate` to the section root when blend modes or stacking must not escape (18 files do).

---

## Responsive rules

**Desktop is not the source of truth.** Compare all three frames before writing JSX.

- Mobile-first: base = mobile, `ipad:` = tablet, `desktop-sm:` = desktop.
- **Designs re-pitch, they do not scale.** A tablet grid at 127px is not the phone's 73px
  times anything. Read each frame's own numbers.
- Prefer one element with breakpoint classes over three gated by `hidden`. Duplicate only
  when structures genuinely differ (mobile still vs. desktop particle field in `section-24`).
- When Figma nests the same content differently per frame, **flatten to one column with
  margins** rather than a wrapper that exists at one size only.
- Between capped breakpoints the stage is fluid. A raw pixel tuned for 1440 is wrong at 1300.

### The five responsive mechanisms

Pick by what is varying — this is a decision, not a preference:

| What varies | Mechanism | Reference |
| --- | --- | --- |
| Anything CSS can express | Tailwind breakpoint variants | everywhere |
| Several values sharing one recipe | CSS custom properties per breakpoint: `[--cell:32px] ipad:[--cell:52px]`, consumed by gradients/sizes | `section-24/grid-rail.tsx` |
| Continuous scaling between two bounds | `clamp(min, Nvw, max)` | `section-15/concentric-rings.tsx` |
| Figma coordinates inside a fixed frame | percentage of the frame: `${(x / FRAME_W) * 100}%` | `section-13/textured-background.tsx` |
| **Numeric props on a canvas/OriginKit component** | **JS breakpoint-tier hook** (below) | `section-12`, `18`, `19`, `22`, `28` |

**The rule:** if the value is CSS, use a Tailwind variant. If it is *canvas geometry* — a
prop the component reads in JS — it must switch on a media query in JS. `section-28/
dot-halo.tsx` states it outright: "Both are canvas geometry, not CSS, so they switch on a
media query here rather than a Tailwind variant."

### Breakpoint-tier hook

Seven files declare `IPAD_MIN = 768`, five `DESKTOP_SM_MIN = 1280`. The shape:

```ts
/** Matches `--breakpoint-ipad` / `--breakpoint-desktop-sm` in globals.css */
const IPAD_MIN = 768;
const DESKTOP_SM_MIN = 1280;
type Tier = "mobile" | "ipad" | "desktop";

const CONFIG = {
  mobile:  { size: 5,  fade: 88  },
  ipad:    { size: 6,  fade: 96  },
  desktop: { size: 10, fade: 100 },
} as const satisfies Record<Tier, Config>;
```

Two subscription styles exist. **Prefer `matchMedia`** — it fires only on threshold
crossings, where `resize` fires on every pixel:

```ts
const tablet = window.matchMedia(`(min-width: ${IPAD_MIN}px)`);
const desktop = window.matchMedia(`(min-width: ${DESKTOP_SM_MIN}px)`);
const sync = () => setTier(desktop.matches ? "desktop" : tablet.matches ? "ipad" : "mobile");
sync();
tablet.addEventListener("change", sync);
desktop.addEventListener("change", sync);
return () => { tablet.removeEventListener("change", sync); desktop.removeEventListener("change", sync); };
```

Extract to `use-<thing>.ts` when the hook is reused or the config table is long
(`section-12/use-tunnel-size.ts`, `section-22/use-wave-arcs-config.ts`); keep it inline
otherwise (`section-28/dot-halo.tsx`).

Breakpoints (`app/globals.css`): `android-sm` 360 · `iphone` 390 · `iphone-max` 430 ·
**`ipad` 768** · `ipad-air` 834 · `ipad-landscape` 1024 · **`desktop-sm` 1280** ·
`laptop` 1440 · `wide` 1536 · **`wide-lg` 1600** · `full-hd` 1920 · **`ultrawide` 2560**

---

## Sizing canvas & WebGL components

OriginKit canvas components need concrete pixel numbers; the layout around them is fluid.
The repo resolves this with **measure-then-mount**, and every rule below is load-bearing.

```tsx
const hostRef = useRef<HTMLDivElement>(null);
const [width, setWidth] = useState(0);

useEffect(() => {
  const host = hostRef.current;
  if (!host) return;
  setWidth(Math.round(host.getBoundingClientRect().width));
  const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
  observer.observe(host);
  return () => observer.disconnect();
}, []);

return (
  <div ref={hostRef} className="aspect-[72.72/72] w-full ipad:w-[92.92px] desktop-sm:w-[101px]">
    {width > 0 && <StickerPeeling imageWidth={width} … />}
  </div>
);
```

- **Reserve the box with `aspect-[w/h]`** so mounting causes no layout shift.
- **Round the measured width.** `section-28/sticker-tile.tsx`: StickerPeeling sizes its
  backing store as `round(width * 4 * devicePixelRatio)`; a fractional width can land on an
  odd pixel count and **crash the tab's renderer process**. Integers keep it a multiple of 4.
- **Gate on `width > 0`** — never mount at zero.
- **Scale props tuned for a native size** by `width / NATIVE_SIZE` (shadow offsets, radii).
- **Derive counts from a fixed pitch**, not a fixed count:
  `columns={Math.round(width / PITCH)}` (`section-29/ascii-art.tsx`).
- **Pad the canvas for scatter**: particles clip at the container, so widen the box by a
  factor and divide `scale` by the same factor (`section-27/neural-diagram.tsx`).
- **Remount on geometry change** with `key={pitch}` when a numeric prop rebuilds the field.

---

## Typography

- Fonts are utilities backed by CSS variables: `font-tight` (Inter Tight), `font-sans`
  (Inter), `font-instrument-serif`, `font-geist`, `font-geist-mono`, `font-canela-deck`,
  `font-helvetica-neue`, `font-switzer`, `font-lato`, `font-monda`, `font-dm-mono`,
  `font-outfit`, `font-audiowide`, and more. Full list in `globals.css` `@theme inline`.
- A missing font goes in `lib/fonts/font.ts` + `app/layout.tsx` + `@theme inline`. Do not
  import fonts inside a section (`section-21/footer.tsx` does — the exception, not the rule).
- **Type is transcribed exactly**: `text-[35px] leading-[1.1] tracking-[-1.4px]`, restated
  per breakpoint. `leading-[1.1]` for headlines, `1.4`/`1.5` for body, or Figma's literal px.
- Muted copy is `opacity-60` (sometimes `/70`, `/80`), not a second colour.
- `text-balance` on headlines (11 uses), `text-pretty` on paragraphs (21 uses).
- `whitespace-nowrap` where Figma holds a line; `<br />` (optionally `hidden ipad:block`)
  where Figma forces a break.

---

## Colour & spacing

- **Literal hex/rgba in arbitrary values** — `bg-[#17281e]`, `border-[rgba(241,230,219,0.12)]`.
  Use `white/10`-style alpha shorthands for neutral overlays.
- Extract repeated multi-stop gradients to a `*_FILL` / `*_SHEEN` constant with its Figma node.
- **Spacing transcribed in arbitrary px** (`gap-[32px] ipad:gap-[52px]`, `pt-[81px]`).
  Tailwind's scale is used only when it happens to land on the Figma number. Don't round.
- Radii, shadows, insets likewise: `rounded-[20px]`, full multi-layer shadow strings,
  `inset-[10%_0_7.5%_24.08%]`.

---

## Background rules

Order of preference: **CSS → inline SVG → data-URI tile → image asset.**

Ship an image only when the effect cannot be expressed otherwise, and say why in a comment
(`section-26/backdrop.tsx` is the model: Figma renders its conic rig through a
`foreignObject`, which browsers refuse to rasterise as a `background-image`).

| Effect | Recipe | Reference |
| --- | --- | --- |
| Ruled grid | flex row/col of 1px `<span>`s; `justify-between` (fluid) or fixed `gap` (pitched) | `section-28`, `section-29` `grid-pattern.tsx` |
| Engraved rule | `bg-[#e0e0e0] shadow-[0px_1px_0px_0px_#ffffff]` — the white offset is the bevel | `section-28/grid-pattern.tsx` |
| Dot field | inline SVG data-URI tile + `background-size` per breakpoint | `section-29/edge-dot-bands.tsx` |
| Dashed rail / hatch / ticks | `repeating-linear-gradient` stack driven by `[--cell]` vars | `section-24/grid-rail.tsx` |
| Markers on rules | coord array → absolute spans at `calc()` rule positions | `section-28-hero.tsx` |
| Blurred wash / glow | `rounded-[50%] bg-[#hex] blur-[26px]` on an absolute div | `section-29-why.tsx` |
| Radial ambience | inline `backgroundImage: radial-gradient(ellipse …)` | `section-23-hero.tsx` |
| Glass surface | `border-white/10` + `backdrop-blur-[25px]` + `bg-linear-to-b from-white/0 from-50% to-white/30` + `*_SHEEN` radial | `section-26/recommendation-card.tsx` |
| Noise / grain | tiled PNG + `background-size` + `opacity` + `mix-blend-*` | `section-25-hero.tsx`, `section-27-hero.tsx` |
| Baked light plate | PNG + `mix-blend-screen` (black drops out) | `section-26/backdrop.tsx` |
| Inline SVG glow | `<filter><feGaussianBlur>` sized relative to what it wraps | `section-26/mask-group.tsx` |
| Gradient border ring | `@property` angle + conic gradient + `mask-composite: exclude` | `globals.css` |
| Inset hairline / bevel | `shadow-[inset_…]` on an `aria-hidden` overlay span | `section-30-hero.tsx` |
| Per-breakpoint background art | `<picture>` + `<source media>` | `section-17/grid-background.tsx` |

Every decorative layer: `aria-hidden`, `pointer-events-none`, explicit `z-*`.
(180 `pointer-events-none` and 275 `aria-hidden` occurrences — this is universal.)

**Blend modes in use:** `screen` (20 — baked light on black), `multiply` (4 — shadow washes),
`plus-lighter` (3 — additive halos), `overlay` (3 — grain), `luminosity`, `color`,
`hard-light`, `color-burn`.

**Blurred ellipses do not survive width changes.** A wash sized for 1440 stops reaching the
edges at 1920 and narrows again lower down. Either size it from the section
(`w-[calc(100%+298px)]`) or cut the fade into the pattern itself with a mask —
`section-29/grid-pattern.tsx` documents why both are needed.

### Masks

Always write **both** the standard and `-webkit-` property:

```tsx
style={{ maskImage: MASK, WebkitMaskImage: MASK }}
"[mask-image:linear-gradient(...)] [-webkit-mask-image:linear-gradient(...)]"
```

- Feather into the page: `linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.5) 82%, transparent 100%)`.
- Marquee edge fade: `EDGE_MASK = "linear-gradient(to right, transparent 0, #000 10%, #000 90%, transparent 100%)"`.
- Two-axis feather: two gradients + `maskComposite: "intersect"` / `WebkitMaskComposite: "source-in"`.
- Tailwind v4 `mask-radial-*` utilities also in use (`section-19-hero.tsx`).
- **Blur-under-shape → radial-gradient stops.** A disc of radius R under a Gaussian of sigma
  has alpha ≈ `Phi((R − d) / sigma)`. `section-28/dot-halo.tsx` converts Figma's blurred
  circles into exactly these stop lists — the centre tops out just under 1 and the falloff
  runs well past the radius. Multiple mask layers composite additively.
- **Figma "Mask group": confirm the approach with me first.** Outcomes are (a) rebuild as a
  CSS/SVG pattern, (b) invert it — make the blobs the mask rather than the masked content,
  which is the only way that works when the content is a canvas, (c) drop the mask and let
  the shape bleed, (d) ship the export. A judgement call, not a default.

---

## Motion rules

### Easing — the house values

```ts
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;  // ease-out-cubic — 20 files, the standard
const EASE     = [0.22, 1, 0.36, 1] as const;        // ease-out-quint — Reveal only (24, 25)
```

Use `EASE_OUT` unless you are copying the `Reveal` component wholesale.

### CSS transitions

**Always `duration-200 ease-out`.**

> Sections 12–23 write `duration-200 ease` (93 occurrences). **Bare `ease` is not a Tailwind
> v4 utility and compiles to nothing** — verified against `tailwindcss@4.3.3`, which emits
> `.ease-out` but no `.ease`. Those declarations silently fall back to the browser default.
> Sections 24–30 use `ease-out` correctly (25 occurrences). **Write `ease-out`; do not
> propagate `ease`.**

300ms only for deliberately slower colour fades. Hover is always gated:

```
[@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90   // 97 uses, preferred
[@media(hover:hover)]:hover:bg-white/5                       // 32 uses, also accepted
```

### CSS keyframes — ambient, always-on motion

Defined in `globals.css`, exposed as `animate-*`: `hero-reveal`, `section-rise`,
`trusted-marquee`, `logo-marquee`, `page-reveal`, `phone-slide-up`, `social-slide-up`,
`phone-flip-in-x`, `shine-infinite`, `logo-orbit`, `globe-orbit`, `ring-rotate`,
`tunnel-drift`, `tunnel-fade-in`, `section-18-glow`.

**Reuse these before adding a new one. Any new keyframe needs its
`@media (prefers-reduced-motion: reduce)` override in the same edit.** Per-instance timing is
overridden inline (`style={{ animationDuration, animationDirection }}`), not with new
keyframes — `section-23-hero.tsx` runs four marquee rows off one `trusted-marquee`.

### `motion/react` — three entrance patterns

Pick by complexity:

1. **`reveal(delay)` helper** — simplest, for a handful of elements. A local function
   returning `{initial, animate, transition}`, short-circuited when reduced motion is on.
   Sections 13, 16.
   ```ts
   const reveal = (delay: number) => reduceMotion
     ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
     : { initial: { opacity: 0, y: 14, filter: "blur(4px)" },
         animate:  { opacity: 1, y: 0,  filter: "blur(0px)" },
         transition: { type: "tween" as const, duration: 0.45, ease: EASE_OUT, delay } };
   ```
2. **`Reveal` / `RevealGroup`** — variant-based stagger for a whole column. Copy
   `section-25/component/ui/reveal.tsx` verbatim. `EASE`, 0.9s, stagger 0.14,
   `y: 20 → 0` with `blur(6px) → blur(0px)`.
3. **Phased state machine** — when a heavy visual must land before the UI arrives. A
   `RevealPhase` union (`"visual" | "nav" | "headline" | "content"`), advanced by
   `onAnimationComplete`, with every stage forced to `"content"` under reduced motion.
   Sections 19, 22.

### Marquees

Two identical halves in one `w-max` flex track, `translateX(-50%)`, `will-change-transform`
on the track only. Duplicate half gets `aria-hidden`. **Repeat each half enough times to
exceed the widest viewport** or the loop shows a gap before snapping
(`section-23-hero.tsx` `HALF_REPEATS`). Edges fade with `EDGE_MASK`, not a clip.

### Rules

- Animate `transform`, `opacity`, `filter` only. Never layout properties.
- Every entrance gated by `useReducedMotion()`; every keyframe by a media query;
  `motion-reduce:` / `motion-safe:` variants for interaction-scale effects.

---

## Performance rules

- One element with breakpoint classes beats duplicated per-breakpoint subtrees.
- No wrapper that only holds a class its child could carry.
- Don't ship a 4 MB flattened SVG when a tile + `background-size` reproduces it.
- Canvas/WebGL components are client-only and pause off-screen (`IntersectionObserver` +
  `visibilitychange` — the vendored ones already do this; keep it when editing).
- Prefer `matchMedia` over `resize` listeners; `ResizeObserver` over per-render measurement.
- Hoist static arrays/objects/strings to module scope.
- Section roots stay server components; push `"use client"` to the leaf.
- Ship the cheap variant to mobile and gate the live one at `ipad:` (`section-24-hero.tsx`).

---

## Accessibility

- Landmarks: `<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<aside>`. `<h1>` in a
  hero, `<h2>` in a body section, `<h3>` for card titles.
- `<nav aria-label="Primary">`; links as `<ul>`/`<li>`/`<a>`; `<button type="button">`,
  never a styled div.
- `aria-label` on icon-only controls and on sections whose purpose isn't in the heading.
- **Every decorative node: `aria-hidden` + `pointer-events-none`**, decorative `<img>` gets
  `alt=""`. Meaningful art gets a real description (`section-29`'s ASCII art).
- Focus: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-<contrast>`.
- Touch: `min-h-11` (+ `min-w-11` for icon buttons), `touch-manipulation`,
  `[-webkit-tap-highlight-color:transparent]`.
- `active:scale-[0.97] motion-reduce:active:scale-100` on pressable controls.
- Duplicated marquee content is `aria-hidden`.

---

## Comment style

The most distinctive convention here. Match it.

- **Every section root and non-trivial part opens with a block comment** naming its Figma
  frames/node IDs and describing the layout strategy in prose.
- **Every deviation from Figma's numbers is justified inline** — not "changed to X" but *why*
  Figma's value fails at other widths.
- **Comment the load-bearing pixel.** If a `1px` inset or a `Math.round` is doing real work,
  say so and say what breaks without it.
- Prose, present tense, describing what the *design* does — not what the code does.

Read `app/section-29/component/ui/grid-pattern.tsx`,
`app/section-28/component/ui/marquee-band.tsx` and
`app/section-28/component/ui/sticker-tile.tsx` before writing your first comment.

---

## Definition of done

- All three Figma frames match at their reference widths **and** in between.
- No horizontal overflow from 320 to 2560.
- Reduced-motion path verified.
- Keyboard tab order and focus rings verified.
- `npx tsc --noEmit` clean; `npx prettier --write` on touched files.
- Every deviation from the design documented in a comment.

For the build procedure, invoke the **`design-to-code`** skill
(`.claude/skills/design-to-code/SKILL.md`).
