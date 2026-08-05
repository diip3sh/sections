/**
 * The sparkle field around the orb — Figma `Group 2147241511`
 * (mobile 2371:1758, iPad 2371:2509, desktop 2371:3276).
 *
 * Figma holds it as 672 individually placed vectors, each about 1 to 2px. That
 * is a scatter, not a drawing: exporting it would ship 672 nodes to reproduce
 * noise. It is regenerated here from a seeded PRNG instead, so the positions
 * are fixed (server and client render the same markup) while the whole field
 * is one constant to tune.
 *
 * Two tiles rather than one, at sizes with no small common multiple, so the
 * repeat never lines up inside the box and the field reads as random.
 *
 * Density and falloff come off the desktop render, measured against distance
 * from the orb centre: about 30 specks per 10,000px in the ring just outside
 * the rim, a third of that one ring further out, and nothing past roughly
 * 300px. The mask below traces that — which is also why the field needs no
 * per-breakpoint density: the orb is 280px at every frame, so the falloff is
 * the same number of pixels every time.
 */

/** Mulberry32 — same seed, same field, on both sides of the render. */
const seeded = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const dotTile = (
  width: number,
  height: number,
  count: number,
  seed: number,
) => {
  const random = seeded(seed);
  let dots = "";
  for (let index = 0; index < count; index += 1) {
    const x = (random() * width).toFixed(1);
    const y = (random() * height).toFixed(1);
    const r = (0.45 + random() * 0.55).toFixed(2);
    const opacity = (0.45 + random() * 0.55).toFixed(2);
    dots += `<circle cx="${x}" cy="${y}" r="${r}" fill="white" fill-opacity="${opacity}"/>`;
  }
  return `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${dots}</svg>`,
  )}")`;
};

const DUST_TILES = [
  dotTile(157, 111, 26, 20240117),
  dotTile(236, 167, 34, 91827364),
].join(", ");

const DUST_SIZES = "157px 111px, 236px 167px";

/** Opaque to ~170px out, half gone by ~245, nothing past 420. */
const DUST_MASK =
  "radial-gradient(circle 420px at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%," +
  " rgba(0,0,0,0.55) 58%, rgba(0,0,0,0.18) 76%, transparent 100%)";

export const StarDust = ({ className = "" }: { className?: string }) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute left-1/2 h-[444px] w-[471px] -translate-x-1/2 -translate-y-1/2 desktop-sm:h-[466px] desktop-sm:w-[972px] ${className}`}
    style={{
      backgroundImage: DUST_TILES,
      backgroundSize: DUST_SIZES,
      maskImage: DUST_MASK,
      WebkitMaskImage: DUST_MASK,
    }}
  />
);
