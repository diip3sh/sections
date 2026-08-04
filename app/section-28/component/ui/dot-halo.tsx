"use client";

import { useEffect, useState } from "react";

import PixelCard from "../originkit/pixel-card";

/**
 * Figma "Mask group" (1:1409 phone / 1:859 + 1:861 tablet) — the grainy dot
 * wash behind the creator tiles.
 *
 * Phone composes it as one mask over one group: a 500x500 alpha stencil of 4px
 * squares on a 12px pitch (1:1410), masking three #d9d9d9 circles under a 56px
 * blur (1:1411 / 1:1412 / 1:1413). Ported live rather than as a flat stencil —
 * PixelCard draws the same grid on a canvas, so each dot grows in and then
 * shimmers instead of sitting at a frozen random alpha. Figma's six discrete
 * alpha steps were a still frame of exactly this.
 *
 * The blobs become the mask instead of the masked content, which is the only
 * way round that works when the dots are a canvas. Each is a radial-gradient
 * whose stops trace the alpha profile of a disc of radius R under a Gaussian
 * of sigma — alpha at distance d is about Phi((R - d) / sigma), which is why
 * the centre tops out just under 1 and the falloff runs well past the radius.
 * Multiple mask layers composite as `add`, so they read as one field.
 *
 * Tablet re-cuts it rather than scaling: two patches instead of three (1:859
 * and 1:861), and a coarser grid — 5px squares on a 15px pitch. The patches are
 * pulled in from the rects Figma draws, since those bound the blur rather than
 * the visible field; measured against the tablet render the dots die out around
 * y1030 and never reach the headline. Both are canvas geometry, not CSS, so
 * they switch on a media query here rather than a Tailwind variant.
 */

const TABLET_QUERY = "(min-width: 768px)";

/** Figma's texture pitch and square size, per breakpoint, in frame pixels. */
const GRID = {
  phone: { pitch: 12, dot: 4 },
  tablet: { pitch: 15, dot: 5 },
};

/** Phone — three circles: r100 at (54,645), r100 22px inside the right edge at
 *  y687, and r111 centred at y890, mostly below the frame. sigma 56. */
const PHONE_MASK = [
  "radial-gradient(circle 280px at 54px 645px, rgba(0,0,0,0.963) 0%, rgba(0,0,0,0.894) 10.7%, rgba(0,0,0,0.762) 21.4%, rgba(0,0,0,0.571) 32.1%, rgba(0,0,0,0.5) 35.7%, rgba(0,0,0,0.296) 46.4%, rgba(0,0,0,0.142) 57.1%, rgba(0,0,0,0.037) 71.4%, transparent 100%)",
  "radial-gradient(circle 280px at calc(100% - 22px) 687px, rgba(0,0,0,0.963) 0%, rgba(0,0,0,0.894) 10.7%, rgba(0,0,0,0.762) 21.4%, rgba(0,0,0,0.571) 32.1%, rgba(0,0,0,0.5) 35.7%, rgba(0,0,0,0.296) 46.4%, rgba(0,0,0,0.142) 57.1%, rgba(0,0,0,0.037) 71.4%, transparent 100%)",
  "radial-gradient(circle 290px at 50% 890px, rgba(0,0,0,0.976) 0%, rgba(0,0,0,0.898) 13.8%, rgba(0,0,0,0.71) 27.6%, rgba(0,0,0,0.5) 38.3%, rgba(0,0,0,0.243) 51.7%, rgba(0,0,0,0.079) 65.5%, rgba(0,0,0,0.011) 82.8%, transparent 100%)",
].join(", ");

/** Tablet — r200 at (230,850) and r130 94px inside the right edge at y884.
 *  sigma 60. Tighter than the phone blobs relative to the frame: the tablet
 *  field is concentrated under the buttons and tile row and dies out well
 *  before the headline, where the phone one still carries. */
const TABLET_MASK = [
  "radial-gradient(circle 380px at 230px 850px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.977) 21.1%, rgba(0,0,0,0.841) 36.8%, rgba(0,0,0,0.5) 52.6%, rgba(0,0,0,0.159) 68.4%, rgba(0,0,0,0.023) 84.2%, transparent 100%)",
  "radial-gradient(circle 310px at calc(100% - 94px) 880px, rgba(0,0,0,0.985) 0%, rgba(0,0,0,0.841) 22.6%, rgba(0,0,0,0.5) 41.9%, rgba(0,0,0,0.159) 61.3%, rgba(0,0,0,0.023) 80.6%, transparent 100%)",
].join(", ");

export const DotHalo = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(TABLET_QUERY);
    const sync = () => setIsTablet(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const mask = isTablet ? TABLET_MASK : PHONE_MASK;
  const { pitch, dot } = isTablet ? GRID.tablet : GRID.phone;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[4]"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <PixelCard
        key={pitch}
        colors={["#d9d9d9"]}
        gap={pitch}
        pixelSize={dot}
        speed={22}
        appearFrom="bottom"
        autoPlay
        transition={{ type: "tween", duration: 1.4, ease: "easeOut" }}
        backgroundColor="transparent"
        borderWidth={0}
        radius={0}
        padding={0}
      />
    </div>
  );
};
