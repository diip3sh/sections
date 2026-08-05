---
name: design-to-code
description: >
  Execution playbook for implementing a new section in this repository from three Figma
  frames (desktop, tablet, mobile) plus one or more OriginKit components. Use whenever the
  prompt supplies Figma links + a target folder + OriginKit component names, or asks to
  build/implement a section. Follow every phase in order.
---

# design-to-code

An **execution playbook**. Run the phases in order. Do not write JSX before Phase 3 is done.

`CLAUDE.md` is authoritative on _what_ each rule is; this file on _when and how_ to apply it.
Where this file gives a decision table, **use the table — do not re-derive the decision.**

## Expected input

```
Desktop Figma:          <url>
Tablet Figma:           <url>
Mobile Figma:           <url>
Target Folder:          app/section-N
OriginKit Component(s): <names>
```

Ask only if a Figma link is missing (two frames cannot determine a responsive rule) or if the
design contains a **mask group** (Phase 1). Everything else is already decided below.

---

## Phase 0 — Repository understanding

**Never build before searching.**

1. `ls app/` — confirm the target folder is free. If it exists you are extending: read it all.
2. Read the three canonical references end to end. They are the standard:
   - `app/section-29/component/ui/` — grid patterns, dot bands, card composition, glow washes,
     measured canvas art.
   - `app/section-28/component/ui/` — fluid rule geometry, canvas masking, arc marquee,
     measure-then-mount, breakpoint re-pitching.
   - `app/section-30/components/ui/section-30-hero.tsx` — the cleanest minimal section root.
3. Read `app/globals.css` in full. You must know which keyframes, fonts and breakpoints exist
   before inventing any.
4. Grep for whatever the design appears to need:
   ```bash
   find app -path '*section-[123]*' -name '*.tsx' -print0 \
     | xargs -0 grep -l 'marquee\|mask-image\|blur-\[\|mix-blend\|radial-gradient\|ResizeObserver'
   ```

Output: a list of files to reuse or copy, and a list of effects to build fresh.

---

## Phase 1 — Analyse Figma

Load `/figma-design-to-code` first — **mandatory before `get_design_context`.**

Per frame, mobile → tablet → desktop:

1. `get_metadata` — node tree and frame dimensions.
2. `get_screenshot` — what it actually looks like.
3. `get_design_context` — measurements, fills, effects.

Record per frame: frame size + node ID (these go in the root's block comment); which nodes
have auto-layout (→ flex) vs. genuine absolute decoration; content hierarchy; spacing **and
grid pitch**; type (family/size/leading/tracking/weight/opacity); background effects;
decorative layers; motion (if animated, call `get_motion_context` and load
`/figma-implement-motion`).

Then **diff the three frames**, resolving every element with this table:

| Observed change               | Implementation                                                          |
| ----------------------------- | ----------------------------------------------------------------------- |
| moves                         | different `top`/margin per breakpoint                                   |
| resizes                       | different size classes                                                  |
| re-pitches                    | different `gap` / `grid-cols` — **never a scale factor**                |
| reflows                       | `flex-col` → `flex-row`, or `desktop-sm:contents` to dissolve a wrapper |
| disappears                    | `hidden desktop-sm:block` (or inverse)                                  |
| leaves flow                   | `desktop-sm:absolute`                                                   |
| appears                       | rendered only above a breakpoint                                        |
| several values share a recipe | CSS vars: `[--cell:32px] ipad:[--cell:52px]`                            |
| scales continuously           | `clamp(min, Nvw, max)`                                                  |
| is a canvas/JS numeric prop   | **breakpoint-tier hook** (Phase 6)                                      |

**Do not begin coding yet.**

### Assets

Download only what Phase 5 proves CSS/SVG cannot reproduce.

```bash
mkdir -p public/section-N
curl -sL -o public/section-N/<role>.svg "<figma asset url>"
```

Name by role (`menu.svg`, `logo-mark.svg`, `arrow.svg`), never Figma's export name.

**If the source contains a mask group, stop and confirm the approach**, presenting these four
with a recommendation:
(a) rebuild as a CSS/SVG pattern; (b) **invert it** — make the blobs the mask rather than the
masked content (the only option that works when the content is a canvas, see
`section-28/dot-halo.tsx`); (c) drop the mask and let the shape bleed; (d) ship the export.

---

## Phase 2 — Locate OriginKit components

### Step 1 — is it already vendored?

```bash
find app -path '*originkit*' -name '*<name>*'
```

Already in the repo (copy the **newest** section's copy — it carries the accumulated fixes):

`ascii-reveal` 29 · `reactive-lines` 30 · `character-waves` 25 · `particle-sphere` 26 ·
`svg-particle` 24, 27 · `sticker-peel` 17, 28 · `pixel-card` 15, 16, 17, 19, 28 ·
`text-ring` 16, 17 · `curved-marquee` 17, 28 · `focus-reveal` 16, 20 ·
`gallery-tunnel` 12, 20 · `ring-gallery` 13 · `globe` 23 · `star-dust` 19, 22 ·
`starburst` 19 · `wave-arcs` 22 · `tetris` 21 · `prism-grid` 16 · `pulse-line` 14 ·
`spiral-image` 15 · `liquid-distortion` 18 · `electric-line` 19 · `rolling-text` 19, 22

### Step 2 — otherwise fetch it

```
mcp__claude_ai_Originkit__search        { query: "<name>" }
mcp__claude_ai_Originkit__get_component { name, stack: "nextjs", styling: "tailwind", typescript: true }
```

Write to `app/section-N/components/originkit/<kebab-name>.tsx`, keeping the header comment
(`// <Name> — Originkit` + which props the preview set). Add `"use client"` if it uses
hooks/canvas; `// @ts-nocheck` only if upstream genuinely won't typecheck.

### Step 3 — read the whole file, then answer three questions

| Question                                      | Where to look                                         |
| --------------------------------------------- | ----------------------------------------------------- |
| Does it fill its parent, or need explicit px? | how `width`/`height`/`style` are consumed             |
| Does it measure itself?                       | `ResizeObserver` / `clientWidth` inside the component |
| Which props are geometry vs. appearance?      | geometry props drive Phase 6's tier hook              |

### Step 4 — decide the integration, from this table

| Situation                              | Action                                                                                                      |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Props alone reproduce the design       | Use it directly in the section root                                                                         |
| Needs per-breakpoint **numeric** props | Wrap; drive with a breakpoint-tier hook                                                                     |
| Needs px dimensions inside a fluid box | Wrap; measure-then-mount (Phase 4)                                                                          |
| Needs geometry derived from its box    | Wrap; compute in the wrapper (`columns = round(w / PITCH)`)                                                 |
| Needs Figma's oversized crop           | Wrap; absolute art inside an `overflow-hidden` box                                                          |
| Effect impossible from outside         | **Only then** add an _optional_ prop with a behaviour-preserving default, and note it in the header comment |

**Never** rewrite it, inline it into a `ui/` file, or move it out of `originkit/`.
The showcased component stays the primary implementation — build the section around it.

---

## Phase 3 — Implementation planning

Write the plan before any JSX. It must answer all eight:

1. **Container** — `<main>` colour; stage `max-w-*` per breakpoint; height model, including
   **where surplus height goes** when the viewport is taller than the desktop frame (Phase 4).
2. **Layout skeleton** — the flex/grid tree top to bottom, display mode named per node.
   _Every_ intended `absolute` needs a one-line justification here.
3. **Content** — heading levels, nav structure, CTAs, repeated data → `SCREAMING_SNAKE`
   module constants.
4. **Component placement** — where each OriginKit component sits, its size, its z-layer.
5. **Background layers** — paint order bottom to top, each with its `z-*`.
6. **Decorative layers** — what each is anchored to (**the layout, not the frame**).
7. **Animations** — which reuse `globals.css` keyframes; which entrance pattern (Phase 7).
8. **Responsive** — the Phase 1 table resolved to concrete classes.

Then scaffold:

```
app/section-N/
  page.tsx
  components/
    ui/section-N-<purpose>.tsx
    ui/<part>.tsx …
    originkit/<component>.tsx
```

`page.tsx` — copy exactly:

```tsx
import type { Metadata } from "next";

import { SectionNHero } from "./components/ui/section-N-hero";

export const metadata: Metadata = {
  title: "<Brand> — <Headline>",
  description: "<the section's subheading, verbatim>",
};

const SectionN = () => <SectionNHero />;

export default SectionN;
```

**Split a part out of the root when** it exceeds ~80 lines, is reused, needs `"use client"`
while the root doesn't, or is a self-contained decorative system (grid, backdrop, marquee).
Otherwise keep it in the root — `section-30` is one file for a reason.

---

## Phase 4 — Layout

Skeleton only: structure and spacing. No decoration, no motion.

Start from the shell:

```tsx
<main className="relative w-full overflow-hidden bg-[#hex]">
  <div className="relative h-[MOB_H] ipad:h-[TAB_H] desktop-sm:h-[DESK_H] desktop-sm:min-h-dvh">
    <div className="relative mx-auto w-full max-w-[MOBILE] ipad:max-w-[TABLET] desktop-sm:max-w-[DESKTOP]">
      {/* backgrounds */}
      {/* content: relative z-10 flex flex-col */}
    </div>
  </div>
</main>
```

### Height — decide it, don't inherit it

`desktop-sm:min-h-dvh` is in the shell above on purpose. Desktop frames here are 800–900px
tall and laptops are 900–1200, so a section pinned to its frame height ends mid-screen with
bare page below it. **Figma's height is the floor.** Then answer, out loud, in Phase 3:
_where does the surplus height go?_ Take the answer from the table in
[CLAUDE.md → Height](../../../CLAUDE.md) — pin the bottom band with
`desktop-sm:top-auto desktop-sm:bottom-[Npx]`, and hang the middle band's blocks off its
centre with `desktop-sm:top-[calc(50%-Npx)] desktop-sm:-translate-y-1/2`. Never absolute y.

Skip it only when the section is not the first on the page. Stacked frames need nothing.

### Layout decision table

| Figma node                                       | Build as                                      |
| ------------------------------------------------ | --------------------------------------------- |
| Auto-layout vertical                             | `flex flex-col gap-[Npx]`                     |
| Auto-layout horizontal                           | `flex items-center gap-[Npx]`                 |
| Auto-layout with `space-between`                 | `flex justify-between`                        |
| Rows **and** columns of content                  | `grid grid-cols-N`                            |
| Mobile wrapper that vanishes into a desktop grid | `desktop-sm:contents` on the wrapper          |
| Centred overlay                                  | `absolute left-1/2 -translate-x-1/2`          |
| Decoration on grid-cell coordinates              | `grid` sized to the rule pitch                |
| Decoration on a rule intersection                | `absolute` at `calc()` rule position          |
| Art overflowing its measured box                 | `absolute` inside an `overflow-hidden` box    |
| Anything else Figma reports as absolute          | **flow** — re-check before making it absolute |

### Fluid rule geometry

When decoration sits on a grid rule inside a fluid stage:

```ts
const CELL = "(100% - 126px) / 13";
const rule = (k: number) => `calc(63px + ${k} * ${CELL})`;
const cellCentre = (k: number) => `calc(63px + ${k} * ${CELL} + (${CELL}) / 2)`;
```

**Tailwind constraint:** only literal class strings in the source get compiled. Computed
geometry must go through `style={{ … }}`; anything shared across breakpoints stays a literal
class.

### Re-base absolute coordinates

Figma's y is measured from the frame. Subtract the block's own offset so the numbers survive
changes above them: _"the mobile frame places it at y382 … so each Figma y is the original
minus that"_ (`section-27/neural-diagram.tsx`).

### Measure-then-mount (canvas/WebGL in a fluid box)

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
  <div ref={hostRef} className="aspect-[W/H] w-full ipad:w-[Npx]">
    {width > 0 && <Component imageWidth={width} … />}
  </div>
);
```

Non-negotiable: reserve with `aspect-[w/h]`; **`Math.round` the width** (a fractional width
can crash the WebGL renderer process — see `section-28/sticker-tile.tsx`); gate on
`width > 0`; scale native-tuned props by `width / NATIVE_SIZE`; derive counts from a fixed
pitch; `key={geometry}` to remount when geometry changes.

**Checkpoint:** does the skeleton hold at 402, 600, 744, 1000, 1280, 1440, 1920 — and at
1440x811 _and_ 1440x1200, with no bare page below the section at either height?

---

## Phase 5 — Backgrounds

Classify each layer, then take the recipe. Preference: **CSS → inline SVG → data-URI tile →
image asset.** Ship an image only as the last row allows, and say why in a comment.

| Figma shows                                      | Recipe                                                                                                             |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Linear gradient                                  | `bg-linear-to-b from-… to-…`; multi-stop → `style={{ backgroundImage }}` as a `*_FILL` constant                    |
| Radial / mesh gradient                           | `style={{ backgroundImage: "radial-gradient(ellipse S at X Y, …)" }}`                                              |
| Ellipse + layer blur                             | absolute div, `rounded-[50%] bg-[#hex] blur-[Npx]`                                                                 |
| Glow / spotlight                                 | as above + `mix-blend-screen` (on dark) or `mix-blend-plus-lighter` (additive)                                     |
| Repeating rules ("grid")                         | flex row/col of 1px `<span>`s — `justify-between` if fluid, fixed `gap` if pitched                                 |
| Engraved rule                                    | `bg-[#e0e0e0] shadow-[0px_1px_0px_0px_#ffffff]`                                                                    |
| Dot field                                        | inline SVG data-URI tile + per-breakpoint `background-size`                                                        |
| Dashed rail / hatch / ticks                      | `repeating-linear-gradient` stack driven by `[--cell]` vars                                                        |
| Filled grid cells                                | `grid` sized to the rule pitch, cells placed with `col-start-*`/`row-start-*`                                      |
| Noise / grain                                    | tiled PNG + `background-size` + `opacity` + `mix-blend-overlay`/`screen`                                           |
| Glass surface                                    | `border-white/10` + `backdrop-blur-[25px]` + `bg-linear-to-b from-white/0 from-50% to-white/30` + `*_SHEEN` radial |
| Gradient border ring                             | `@property` angle + conic gradient + `mask-composite: exclude` (already in `globals.css`)                          |
| Inset bevel / hairline                           | `shadow-[inset_…]` on an `aria-hidden` span with `rounded-[inherit]`                                               |
| Fade-out edge                                    | `mask-image` **+ `-webkit-mask-image`**                                                                            |
| Two-axis fade                                    | two gradients + `maskComposite: "intersect"` / `WebkitMaskComposite: "source-in"`                                  |
| Blurred shape as a mask                          | radial-gradient stops from `alpha ≈ Phi((R − d) / sigma)` — see `dot-halo.tsx`                                     |
| Backdrop filter                                  | `backdrop-blur-[Npx]` on an absolute overlay                                                                       |
| Per-breakpoint background art                    | `<picture>` + `<source media="(min-width: 1280px)">`                                                               |
| Conic rig / `foreignObject` / photographic light | **last resort:** PNG export + `mix-blend-screen`, with a comment saying why                                        |

Rules:

- Every decorative layer: `aria-hidden`, `pointer-events-none`, explicit `z-*`.
- z-scale: `z-0` backdrop · `z-[1]`–`z-[5]` pattern · `z-10` content · `z-20` copy over
  decoration · `z-30` nav and art painted over everything. Add `isolate` to the root when
  blend modes must not escape.
- **A blurred ellipse sized for 1440 fails at 1920.** Either size it from the section
  (`w-[calc(100%+298px)]`) or cut the fade into the pattern with a mask. Often both.
- Prefer sizing a wash off the _stage_, not a fixed px, whenever it must reach the edges.

---

## Phase 6 — Responsive

**Never implement desktop first and retrofit.** Write all three breakpoints in one pass,
element by element, from the Phase 1 table.

Base = mobile · `ipad:` = tablet · `desktop-sm:` = desktop. Add `wide-lg:` / `full-hd:` /
`ultrawide:` only if the design keeps scaling past 1440; otherwise cap the stage there.

### The mechanism decision

> **CSS-expressible → Tailwind variant. Canvas geometry (a prop read in JS) → media query in
> JS.** `section-28/dot-halo.tsx`: _"Both are canvas geometry, not CSS, so they switch on a
> media query here rather than a Tailwind variant."_

Breakpoint-tier hook — copy this shape:

```ts
/** Matches `--breakpoint-ipad` / `--breakpoint-desktop-sm` in globals.css */
const IPAD_MIN = 768;
const DESKTOP_SM_MIN = 1280;
type Tier = "mobile" | "ipad" | "desktop";

const CONFIG = {
  mobile: { size: 5, fade: 88 },
  ipad: { size: 6, fade: 96 },
  desktop: { size: 10, fade: 100 },
} as const satisfies Record<Tier, Config>;

const [tier, setTier] = useState<Tier>("mobile");
useEffect(() => {
  const tablet = window.matchMedia(`(min-width: ${IPAD_MIN}px)`);
  const desktop = window.matchMedia(`(min-width: ${DESKTOP_SM_MIN}px)`);
  const sync = () =>
    setTier(desktop.matches ? "desktop" : tablet.matches ? "ipad" : "mobile");
  sync();
  tablet.addEventListener("change", sync);
  desktop.addEventListener("change", sync);
  return () => {
    tablet.removeEventListener("change", sync);
    desktop.removeEventListener("change", sync);
  };
}, []);
```

Use `matchMedia`, not `resize` — it fires only on threshold crossings. Extract to
`use-<thing>.ts` when reused or when the config table is long; inline otherwise.

Verify at **402, 430, 600, 744, 834, 1024, 1280, 1440, 1920, 2560.** No horizontal overflow.

---

## Phase 7 — Motion

### Constants

```ts
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const; // house standard — use this
```

CSS transitions are **always `duration-200 ease-out`**. Never write bare `ease` — it is not a
Tailwind v4 utility and compiles to nothing (sections 12–23 contain 93 such dead classes).
Hover always gated: `[@media(hover:hover)_and_(pointer:fine)]:hover:…`.

### Entrance pattern decision

| Situation                            | Pattern                                                                                                                                                            |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A handful of elements                | **`reveal(delay)` helper** — local fn returning `{initial, animate, transition}`, short-circuited on reduced motion. `section-13`, `section-16`.                   |
| A whole column, uniform stagger      | **`Reveal` / `RevealGroup`** — copy `section-25/component/ui/reveal.tsx` verbatim.                                                                                 |
| Heavy visual must land before the UI | **Phased state machine** — `RevealPhase` union advanced by `onAnimationComplete`; every stage forced to the last under reduced motion. `section-19`, `section-22`. |
| Ambient, always-on                   | **CSS keyframe** from `globals.css` via its `animate-*` utility.                                                                                                   |

Existing keyframes: `hero-reveal`, `section-rise`, `trusted-marquee`, `logo-marquee`,
`page-reveal`, `phone-slide-up`, `social-slide-up`, `phone-flip-in-x`, `shine-infinite`,
`logo-orbit`, `globe-orbit`, `ring-rotate`, `tunnel-drift`, `tunnel-fade-in`,
`section-18-glow`. **Reuse before adding.** Vary per instance with inline
`style={{ animationDuration, animationDirection, animationDelay }}` rather than a new
keyframe. Any new keyframe ships with its `prefers-reduced-motion` override in the same edit.

### Marquee recipe

Two identical halves in one `w-max` flex track, `translateX(-50%)`,
`will-change-transform` on the track only, duplicate half `aria-hidden`, edges faded with
`EDGE_MASK`. **Repeat each half enough times to exceed the widest viewport** or the loop gaps
before snapping.

### Rules

- `transform` / `opacity` / `filter` only. Never layout properties.
- `useReducedMotion()` gates every `motion/react` entrance.

---

## Phase 8 — Polish

- [ ] **Typography** — family, size, leading, tracking, weight, opacity match all three
      frames; line breaks land where Figma breaks them; `text-balance` / `text-pretty` applied.
- [ ] **Spacing** — every gap and padding traced to a Figma number, not rounded to the scale.
- [ ] **Radius** — exact per breakpoint; nested radii use `rounded-[inherit]`.
- [ ] **Shadow / glow** — full multi-layer strings; bevels on `aria-hidden` overlay spans.
- [ ] **Alignment** — checked optically against the screenshot, not just numerically.
- [ ] **Overflow** — `overflow-hidden` on every clipping stage; no horizontal scroll anywhere.
- [ ] **Component sizing** — canvases re-measure on resize; widths rounded; `width > 0` gate.
- [ ] **Responsive** — all ten widths re-checked after polish.
- [ ] **Motion** — `ease-out` not `ease`; `EASE_OUT` for JS; reduced-motion path exercised.
- [ ] **Accessibility** — landmarks; heading order; `<button type="button">`;
      `aria-label` on icon-only controls; `aria-hidden` + `pointer-events-none` + `alt=""` on
      every decorative node; duplicated marquee halves `aria-hidden`;
      `focus-visible:outline-2 focus-visible:outline-offset-2`; `min-h-11` targets;
      `active:scale-[0.97] motion-reduce:active:scale-100`.
- [ ] **Comments** — root names all three frames and node IDs; every deviation justified;
      every load-bearing pixel/round explained.
- [ ] **Hygiene** — no dead code, no commented-out blocks, no `any`, no unused props, statics
      hoisted, `"use client"` on the smallest subtree, named exports from `ui/`.

```bash
npx tsc --noEmit
npx prettier --write app/section-N
```

---

## Phase 9 — Final verification

1. `get_screenshot` for each of the three frames again.
2. Compare at each frame's own width. Screenshot the running page if a browser tool is
   available (`http://localhost:3000/section-N` — **do not start or kill the dev server**;
   if it isn't running, ask).
3. List every mismatch, fix, repeat until parity.
4. Check in-between widths (600, 1000, 1920). Parity at three widths is not parity.
5. Check a **taller viewport** than the desktop frame — 1440x1200 as well as 1440x811. The
   section must fill it, with no bare page below and no hole above the fold.
6. Report done. State explicitly anything that could not be matched, and why.

---

## Pattern index

Where a working implementation already lives. **Reuse rather than invent.**
Paths are shorthand: real path is `app/section-N/components/ui/…` (12–18, 21, 30) or
`app/section-N/component/ui/…` (19–20, 22–29).

### Section archetypes

| Pattern                                   | Reference                            |
| ----------------------------------------- | ------------------------------------ |
| Centred hero (badge → h1 → sub → CTA row) | `section-24-hero`, `section-28-hero` |
| Left copy + right visual                  | `section-30-hero`, `section-25-hero` |
| Hero around a centred generative visual   | `section-19-hero`, `section-27-hero` |
| Hero over a photographic composite        | `section-26-hero`                    |
| Feature / "why" grid section              | `section-29-why`                     |
| Card panel inside a bordered frame        | `section-23-hero`                    |
| Email-capture hero                        | `section-22-hero`                    |
| Footer (brand + link columns + socials)   | `section-21/footer`                  |

### Layout & structure

| Pattern                                                 | Reference                                                 |
| ------------------------------------------------------- | --------------------------------------------------------- |
| Capped stage over bleeding backdrop                     | `section-28-hero`, `section-30-hero`                      |
| Explicit Figma frame heights                            | `section-30-hero`, `section-26-hero`                      |
| Fluid rule geometry (`rule(k)` / `cellCentre(k)`)       | `section-28-hero`, `section-28/dot-halo`                  |
| Mobile wrapper dissolved into desktop grid (`contents`) | `section-29-why`                                          |
| Two-column desktop split from mobile stack              | `section-25-hero`                                         |
| Flow on mobile → absolute on desktop                    | `section-30-hero` (chat bubbles)                          |
| Re-based absolute coordinates                           | `section-27/neural-diagram`                               |
| Geometry held as `Box` data, swapped by CSS vars        | `section-27/neural-diagram`                               |
| `order` to re-sequence a flex stack per breakpoint      | `section-13/hero-content`                                 |
| Nav: wordmark + centre links + actions + hamburger      | `section-30-hero`, `section-27-hero`, `section-19/navbar` |
| Pill nav with baked radial sheen                        | `section-26-hero`                                         |

### Components

| Pattern                                           | Reference                                                     |
| ------------------------------------------------- | ------------------------------------------------------------- |
| `Button` variant contract                         | `section-19/button`, `section-20/button`, `section-15/button` |
| Expanding-chip hover button                       | `section-18/button`                                           |
| `Navbar` contract                                 | `section-12/navbar`, `section-14/navbar`, `section-19/navbar` |
| Two-layer plate (tray + inset card + drop-shadow) | `section-29/cards`                                            |
| Glass card                                        | `section-26/recommendation-card`                              |
| Dashboard mock card                               | `section-25/dashboard-card`                                   |
| Animated gradient-border card / input             | `globals.css` `.card-orbit-border` / `.form-glow-border`      |
| Peelable sticker tile (measure-then-mount)        | `section-28/sticker-tile`                                     |
| Corner ticks / bracket corners                    | `section-24-hero`, `section-25-hero`                          |
| Arrow icon nudging on group hover                 | `section-24-hero`, `section-25-hero`                          |

### Backgrounds & decoration

| Pattern                                         | Reference                                                    |
| ----------------------------------------------- | ------------------------------------------------------------ |
| Ruled grid, fluid `justify-between`             | `section-28/grid-pattern`                                    |
| Ruled grid, fixed pitch + fade mask             | `section-29/grid-pattern`                                    |
| Filled grid cells on the rule pitch             | `section-29/corner-blocks`                                   |
| Dotted edge bands from an SVG tile              | `section-29/edge-dot-bands`                                  |
| Dashed rail: hatch + rules + ticks via CSS vars | `section-24/grid-rail`                                       |
| Markers on rule intersections                   | `section-28-hero`                                            |
| Blurred wash erasing a grid                     | `section-29-why`, `section-28-hero`                          |
| Radial ambience + dust overlay                  | `section-23-hero`                                            |
| Layered baked light plates                      | `section-26/backdrop`                                        |
| Inline SVG glow with `feGaussianBlur`           | `section-26/mask-group`                                      |
| Rotated oversized repeating texture             | `section-13/textured-background`                             |
| Percentage-of-frame coordinates                 | `section-13/textured-background`                             |
| `<picture>` per-breakpoint background           | `section-17/grid-background`                                 |
| Noise / grain strip                             | `section-25-hero`, `section-27-hero`                         |
| Textured edge channels                          | `section-27-hero`                                            |
| Vertical frame rails                            | `section-30-hero`, `section-24/grid-rail`, `section-25-hero` |
| Bottom bloom + backdrop-filter haze             | `section-26-hero`                                            |
| Full-page gradient background component         | `section-18/glow-background`                                 |
| `clamp()` fluid ring sizing                     | `section-15/concentric-rings`                                |

### Masks

| Pattern                                       | Reference                                          |
| --------------------------------------------- | -------------------------------------------------- |
| Vertical feather into the page                | `section-24-hero`, `section-26-hero` (`HAND_MASK`) |
| Two-axis feather (`maskComposite: intersect`) | `section-23-hero`, `section-24-hero`               |
| Fade cut into a repeating pattern             | `section-29/grid-pattern`                          |
| Blurred shapes converted to gradient stops    | `section-28/dot-halo`                              |
| Inverted mask (blobs mask a canvas)           | `section-28/dot-halo`                              |
| Cursor-following hole in an overlay           | `section-26/orb`                                   |
| Breakpoint-specific radial cutout             | `section-18/glow-background`                       |
| `mask-radial-*` utilities                     | `section-19-hero`                                  |
| SVG-file mask on a logo                       | `section-26-hero`                                  |

### Motion

| Pattern                                          | Reference                                            |
| ------------------------------------------------ | ---------------------------------------------------- |
| `reveal(delay)` helper                           | `section-13/hero-content`, `section-16/hero-content` |
| `Reveal` / `RevealGroup` stagger                 | `section-25/reveal`, `section-24/reveal`             |
| Phased state-machine hero                        | `section-19-hero`, `section-22-hero`                 |
| Seamless logo marquee (list)                     | `section-27/logo-marquee`                            |
| Seamless logo marquee (single wide SVG)          | `section-26/logo-marquee`                            |
| Multi-row marquee, alternating direction, masked | `section-23-hero`                                    |
| Arc marquee with derived radius                  | `section-28/marquee-band`                            |
| Per-item breathing glow with offset delays       | `section-23-hero` (`getGlowStyle`)                   |
| Rolling / character-stagger headline             | `section-19/originkit/rolling-text`                  |
| `motion-safe:animate-*` on a CSS keyframe        | `section-15/concentric-rings`                        |

---

## Anti-patterns

- Implementing desktop and retrofitting mobile.
- Copying Figma's absolute x/y for content nodes, or leaving them frame-based.
- Shipping a flattened export when a CSS/SVG pattern reproduces it.
- Deriving tablet from mobile by a multiplier.
- Hard-coding a 1440-only pixel inside a fluid stage.
- Pinning a hero to Figma's frame height with no `min-h-dvh` floor — it ends mid-laptop and
  shows bare page below. Equally: adding the floor but leaving every block top-anchored, so
  the band that belongs on the fold strands itself halfway up.
- Rewriting, inlining, or recreating an OriginKit component.
- Switching a **canvas** numeric prop with a Tailwind variant (it can't work) — or switching a
  **CSS** value with a JS media query (wasteful).
- Passing a fractional width to a WebGL component.
- Mounting a canvas before its box is measured, or without an `aspect-*` reserve.
- `resize` listeners where `matchMedia` would do.
- Writing bare `ease` — it compiles to nothing. Use `ease-out`.
- Adding a keyframe without a reduced-motion override.
- `mask-image` without its `-webkit-mask-image` twin.
- Ungated `hover:` styles.
- `sm:` / `md:` / `lg:` / `xl:`.
- Introducing `cn()` / `clsx` / a token palette.
- `export default` from a `ui/` file.
- Committing without a block comment naming the Figma frames.
