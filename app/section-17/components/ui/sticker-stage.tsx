"use client";

import StickerPeeling from "../originkit/sticker-peel";

/** Desktop Figma artboard — X/Y are in these units */
const DESKTOP_W = 1440;
const DESKTOP_H = 892;

/** sticker-peel control defaults (from Originkit panel) */
const PEEL = {
  hoverPeel: 45,
  pressPeel: 64,
  curlRotation: 240,
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

type Point = { x: number; y: number };

type StickerConfig = {
  id: string;
  src: string;
  width: number;
  height: number;
  label: string;
  /** Peel curl direction in degrees (sticker-peel `curlRotation`) */
  curlRotation?: number;
  /** Position is the horizontal center (translateX -50%) */
  centerX?: boolean;
  x: number;
  y: number;
  frameW: number;
  frameH: number;
};

type StickerId = "tl" | "tr" | "mr" | "bl" | "bc";

/** desktop-sm (1280) … below wide-lg (1600) */
const DESKTOP_SM_POSITIONS: Record<StickerId, Point> = {
  tl: { x: 74, y: 283 },
  tr: { x: 1266, y: 288 },
  mr: { x: 1153, y: 527 },
  bl: { x: 191, y: 645 },
  bc: { x: 720, y: 844 },
};

/** wide-lg (1600) and above */
const WIDE_LG_POSITIONS: Record<StickerId, Point> = {
  tl: { x: 93, y: 241 },
  tr: { x: 1411, y: 236 },
  mr: { x: 1355, y: 601 },
  bl: { x: 0, y: 661 },
  bc: { x: 720, y: 857 },
};

const DESKTOP_STICKERS: Omit<StickerConfig, "x" | "y" | "frameW" | "frameH">[] =
  [
    {
      id: "tl",
      src: "/section-17/portraits/sticker-tl.png",
      width: 101,
      height: 108,
      curlRotation: 300,
      label: "Creator portrait — top left",
    },
    {
      id: "tr",
      src: "/section-17/portraits/sticker-tr.png",
      width: 101,
      height: 108,
      curlRotation: 230,
      label: "Creator portrait — top right",
    },
    {
      id: "mr",
      src: "/section-17/portraits/sticker-mr.png",
      width: 101,
      height: 108,
      curlRotation: 230,
      label: "Creator portrait — middle right",
    },
    {
      id: "bl",
      src: "/section-17/portraits/sticker-bl.png",
      width: 101,
      height: 108,
      curlRotation: 300,
      label: "Creator portrait — bottom left",
    },
    {
      id: "bc",
      src: "/section-17/portraits/sticker-bc.png",
      width: 101,
      height: 108,
      centerX: true,
      label: "Creator portrait — bottom center",
    },
  ];

const StickerNode = ({
  src,
  width,
  height,
  label,
  centerX,
  curlRotation,
  x,
  y,
  frameW,
  frameH,
}: StickerConfig) => (
  <div
    className="pointer-events-auto absolute"
    style={{
      left: `${(x / frameW) * 100}%`,
      top: `${(y / frameH) * 100}%`,
      width,
      height,
      transform: centerX ? "translateX(-50%)" : undefined,
    }}
  >
    <StickerPeeling
      image={{ src }}
      imageWidth={width}
      imageHeight={height}
      hoverPeel={PEEL.hoverPeel}
      pressPeel={PEEL.pressPeel}
      curlRotation={curlRotation ?? PEEL.curlRotation}
      backColor={PEEL.backColor}
      shadowEnabled={PEEL.shadowEnabled}
      shadow={PEEL.shadow}
      transition={PEEL.transition}
      style={{ cursor: "pointer" }}
    />
    <span className="sr-only">{label}</span>
  </div>
);

const DesktopStickers = ({
  positions,
}: {
  positions: Record<StickerId, Point>;
}) => (
  <>
    {DESKTOP_STICKERS.map((sticker) => {
      const pos = positions[sticker.id as StickerId];

      return (
        <StickerNode
          key={sticker.id}
          {...sticker}
          x={pos.x}
          y={pos.y}
          frameW={DESKTOP_W}
          frameH={DESKTOP_H}
        />
      );
    })}
  </>
);

export const StickerStage = () => {
  return (
    <>
      {/* desktop-sm … below wide-lg — mobile/iPad stickers live in CtaStickers */}
      <div
        className="pointer-events-none absolute inset-0 z-40 hidden desktop-sm:block wide-lg:hidden"
        aria-label="Creator portraits"
      >
        <DesktopStickers positions={DESKTOP_SM_POSITIONS} />
      </div>

      {/* wide-lg and above */}
      <div
        className="pointer-events-none absolute inset-0 z-40 hidden wide-lg:block"
        aria-label="Creator portraits"
      >
        <DesktopStickers positions={WIDE_LG_POSITIONS} />
      </div>
    </>
  );
};
