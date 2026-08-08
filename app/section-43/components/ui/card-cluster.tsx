"use client";

import { useEffect, useRef, useState } from "react";

import StickerDrag from "../originkit/draggable-sticker";

/**
 * The fan of payment cards — Figma `Group 2147241479` (desktop 499:1978,
 * tablet 499:1522, phone 499:1944) — rendered as four peelable, draggable
 * stickers rather than four flat crops. They are the section: the frame is
 * built around the interaction.
 *
 * **The rotation is in the texture, not in CSS.** Figma turns each card 87–107°
 * and the obvious move is a `rotate()` on the host, but StickerDrag drags by
 * writing screen-space pointer deltas into its own `left`/`top`. Under a
 * rotated ancestor those axes turn with it and a card dragged sideways travels
 * diagonally. So each `card-N.webp` is exported pre-rotated to its bounding
 * box and every element here stays axis-aligned — which also means the tilt on
 * pickup leans toward the direction of the drag rather than toward some rotated
 * frame of the card's own.
 *
 * **The cluster is measured in its own box, not in the frame.** Figma's group
 * bounding box does not match the union of the rotated cards — the HTML port
 * this came from had to hand-shift the phone cluster 102px to get it back under
 * the headline. So the box here is that true union at each frame (298 x 181 on
 * the phone, 448 x 272 on the tablet, 584 x 399 on desktop) and every card is
 * placed as a percentage of it. One measured width then drives the card sizes,
 * so the fan holds together at any width between the frames instead of only at
 * 402 / 744 / 1440.
 *
 * **Two arrangements, not three.** Divided by their own box the phone and
 * tablet placements come out identical to four decimal places — the tablet is
 * the phone at 1.5x — so they share one set of percentages and desktop has its
 * own. The one card that genuinely moves between them is `card-3`, the most
 * rotated of the four: desktop fans it out to 38% across, the smaller frames
 * tuck it back to 49% against `card-2`.
 *
 * The cluster is centred rather than carrying Figma's 1.4% leftward bias, which
 * both small frames share and which is an artifact of the same mismatched group
 * box — 7px on the phone, on a hand-scattered pile.
 */

/**
 * Rest and drag shadows. The renders carry their own contact shadow baked in,
 * so there is nothing to draw at rest and only the lift is left to grow — two
 * stacked would read as a double drop. Figma's 30/36 drop is a desktop number
 * and is scaled off each card's measured width, since a 30px offset under a
 * phone-sized card is most of the card.
 */
const REST_SHADOW = "0px 0px 0px rgba(0, 0, 0, 0)";

/**
 * `aspect` is the card's rotated bounding box, which is also the file's own
 * pixel ratio, so nothing is stretched. `native` is that box at the desktop
 * frame — the one number the drag shadow scales against.
 *
 * Class strings are written out rather than composed, because Tailwind reads
 * this file as text and would not see an interpolated percentage.
 */
const CARDS = [
  {
    id: "card-1",
    native: 192.61,
    className:
      "aspect-[192.61/289.88] w-[32.278%] left-[83.854%] top-[40.023%] desktop-sm:w-[32.955%] desktop-sm:left-[83.524%] desktop-sm:top-[43.417%]",
  },
  {
    id: "card-2",
    native: 186.3,
    className:
      "aspect-[186.30/285.98] w-[31.222%] left-[60.141%] top-[59.807%] desktop-sm:w-[31.878%] desktop-sm:left-[61.415%] desktop-sm:top-[63.466%]",
  },
  {
    id: "card-3",
    native: 254.92,
    className:
      "aspect-[254.92/322.45] w-[42.722%] left-[49.488%] top-[49.113%] desktop-sm:w-[43.618%] desktop-sm:left-[37.683%] desktop-sm:top-[40.456%]",
  },
  {
    id: "card-4",
    native: 196.08,
    className:
      "aspect-[196.08/291.98] w-[32.860%] left-[16.437%] top-[59.686%] desktop-sm:w-[33.549%] desktop-sm:left-[16.775%] desktop-sm:top-[63.367%]",
  },
] as const;

type StickerCardProps = {
  id: string;
  native: number;
  className: string;
};

/**
 * StickerDrag wants its box in pixels while the fan is a set of percentages, so
 * the host reserves the card with `aspect-*`, measures itself, and mounts only
 * then. Both dimensions are rounded before they cross into the component: it
 * sizes its backing store from them at 2x device pixels, and a fractional width
 * can land that on an odd pixel count.
 */
const StickerCard = ({ id, native, className }: StickerCardProps) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const measure = ({ width, height }: { width: number; height: number }) =>
      setBox({ width: Math.round(width), height: Math.round(height) });

    measure(host.getBoundingClientRect());
    const observer = new ResizeObserver(([entry]) =>
      measure(entry.contentRect),
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const scale = box.width / native;

  return (
    <div
      ref={hostRef}
      className={`absolute -translate-x-1/2 -translate-y-1/2 ${className}`}
    >
      {box.width > 0 && (
        <StickerDrag
          image={`/section-43/${id}.webp`}
          imageWidth={box.width}
          imageHeight={box.height}
          tilt={16}
          elevation={6}
          lightingStrength={5}
          staticShadow={REST_SHADOW}
          dynamicShadow={`0px ${(30 * scale).toFixed(1)}px ${(36 * scale).toFixed(1)}px rgba(0, 0, 0, 0.38)`}
        />
      )}
    </div>
  );
};

export const CardCluster = () => (
  <div
    role="img"
    aria-label="A fan of four payment cards, loosely stacked"
    className="relative w-[298px] max-w-full shrink-0 aspect-[297.99/180.85] ipad:w-[448px] desktop-sm:aspect-[584.45/398.52] desktop-sm:w-[52.117%]"
  >
    {/*
      No `z-*` on the hosts. StickerDrag lifts the card being dragged by writing
      an incrementing z-index onto its own container; a z-index here would make
      the host a stacking context and trap that value inside. Left at `auto`
      they order by DOM position — Figma's own stacking, card 4 on top — and on
      pickup the dragged card clears the rest.
    */}
    {CARDS.map((card) => (
      <StickerCard key={card.id} {...card} />
    ))}
  </div>
);
