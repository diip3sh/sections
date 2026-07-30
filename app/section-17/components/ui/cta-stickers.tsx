"use client";

import StickerPeeling from "../originkit/sticker-peel";

/** Matches sticker-stage peel defaults */
const PEEL = {
  hoverPeel: 45,
  pressPeel: 64,
  backColor: "#000000",
  shadowEnabled: true,
  shadow: {
    opacity: 30,
    color: "#000000",
    x: -300,
    y: 140,
  },
  transition: {
    type: "tween" as const,
    duration: 0.6,
    ease: "easeInOut" as const,
  },
};

type BreakpointStickers = {
  /** Gap (px) from CTA row bottom → left/right sticker tops. Change this to tune spacing. */
  gapY: number;
  /** Extra px the center sticker sits below left/right */
  centerDrop: number;
  width: number;
  height: number;
  /** Tailwind visibility for this breakpoint set */
  visibility: string;
  leftClass: string;
  rightClass: string;
  centerClass: string;
};

/**
 * Tune `gapY` / `centerDrop` per breakpoint — gap under CTAs updates from these.
 * Mobile first, then iPad (hidden again at desktop-sm; desktop uses StickerStage).
 */
const BREAKPOINTS: BreakpointStickers[] = [
  {
    // < 768
    gapY: 32,
    centerDrop: 100,
    width: 73,
    height: 72,
    visibility: "ipad:hidden",
    leftClass: "left-[4.5%]",
    rightClass: "left-[78%]",
    centerClass: "left-1/2 -translate-x-1/2",
  },
  {
    // 768 – 1023
    gapY: 80,
    centerDrop: 200,
    width: 96,
    height: 96,
    visibility: "hidden ipad:block ipad-landscape:hidden desktop-sm:hidden",
    leftClass: "left-0 -translate-x-[5%]",
    rightClass: "right-0 translate-x-[1%]",
    centerClass: "left-1/2 -translate-x-1/2",
  },
  {
    // 1024 – 1279
    gapY: 41,
    centerDrop: 250,
    width: 101,
    height: 108,
    visibility: "hidden ipad-landscape:block desktop-sm:hidden",
    leftClass: "left-0 -translate-x-[40%]",
    rightClass: "right-0 translate-x-[40%]",
    centerClass: "left-1/2 -translate-x-1/2",
  },
];

type Slot = {
  id: string;
  src: string;
  label: string;
  curlRotation: number;
  side: "left" | "right" | "center";
};

const SLOTS: Slot[] = [
  {
    id: "bl",
    src: "/section-17/portraits/sticker-bl.png",
    label: "Creator portrait — left",
    curlRotation: 300,
    side: "left",
  },
  {
    id: "tr",
    src: "/section-17/portraits/sticker-tl.png",
    label: "Creator portrait — right",
    curlRotation: 230,
    side: "right",
  },
  {
    id: "bc",
    src: "/section-17/portraits/sticker-bc.png",
    label: "Creator portrait — center",
    curlRotation: 240,
    side: "center",
  },
];

const sideClass = (bp: BreakpointStickers, side: Slot["side"]) => {
  if (side === "left") return bp.leftClass;
  if (side === "right") return bp.rightClass;
  return bp.centerClass;
};

/** Absolute portraits — parent must be the CTA row only (`relative`). */
export const CtaStickers = () => {
  return (
    <>
      {BREAKPOINTS.map((bp) => (
        <div
          key={bp.visibility}
          className={`pointer-events-none absolute inset-x-0 top-full z-30 ${bp.visibility}`}
          aria-label="Creator portraits"
          style={{ marginTop: bp.gapY }}
        >
          {SLOTS.map((slot) => {
            const top = slot.side === "center" ? bp.centerDrop : 0;

            return (
              <div
                key={`${bp.visibility}-${slot.id}`}
                className={`pointer-events-auto absolute top-0 ${sideClass(bp, slot.side)}`}
                style={{
                  width: bp.width,
                  height: bp.height,
                  marginTop: top,
                }}
              >
                <StickerPeeling
                  image={{ src: slot.src }}
                  imageWidth={bp.width}
                  imageHeight={bp.height}
                  hoverPeel={PEEL.hoverPeel}
                  pressPeel={PEEL.pressPeel}
                  curlRotation={slot.curlRotation}
                  backColor={PEEL.backColor}
                  shadowEnabled={PEEL.shadowEnabled}
                  shadow={PEEL.shadow}
                  transition={PEEL.transition}
                  style={{ cursor: "pointer" }}
                />
                <span className="sr-only">{slot.label}</span>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

/**
 * In-flow spacer matching sticker footprint (gapY + centerDrop + height).
 * Bottom space only grows when these sticker values increase — nothing clipped.
 */
export const stickerFootprint = (bp: BreakpointStickers) =>
  bp.gapY + bp.centerDrop + bp.height;

export const CtaStickerSpacer = () => {
  return (
    <>
      {BREAKPOINTS.map((bp) => (
        <div
          key={`spacer-${bp.visibility}`}
          aria-hidden="true"
          className={bp.visibility}
          style={{ height: stickerFootprint(bp) }}
        />
      ))}
    </>
  );
};

/** Pixel-wash config — iPad bands pin to bottom; mobile uses a separate wash in HeroContent */
export const IPAD_PIXEL_WASH: { visibility: string; height: number }[] =
  BREAKPOINTS.filter((bp) => bp.visibility !== "ipad:hidden").map((bp) => ({
    visibility: bp.visibility,
    height: stickerFootprint(bp) + 48,
  }));
