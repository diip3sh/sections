"use client";

import StickerPeeling from "../originkit/sticker-peel";

type StickerConfig = {
  id: string;
  src: string;
  /** Percent of 1440 frame width */
  left: string;
  /** Percent of 892 frame height */
  top: string;
  rotate?: number;
  width?: number;
  height?: number;
  /** Square size shorthand when width === height */
  size?: number;
  curlRotation?: number;
  label: string;
  /** Translate X by -50% (centered stickers) */
  centerX?: boolean;
};

/** Figma artboard 1440×892 — positions as % of frame */
const STICKERS: StickerConfig[] = [
  {
    // Post-it-1 · node 1:2268 — x:165.89 y:224 w:104.44 h:117.37 · rotate 1.96°
    id: "tl",
    src: "/section-17/portraits/sticker-tl.png",
    left: `${(165.89 / 1440) * 100}%`,
    top: `${(224 / 892) * 100}%`,
    rotate: 1.96,
    width: 104,
    height: 117,
    curlRotation: 200,
    label: "Creator portrait — top left",
  },
  {
    id: "tr",
    src: "/section-17/portraits/sticker-tr.png",
    left: "81.6%",
    top: "26.5%",
    rotate: -3,
    size: 101,
    curlRotation: 260,
    label: "Creator portrait — top right",
  },
  {
    id: "mr",
    src: "/section-17/portraits/sticker-mr.png",
    left: "74.7%",
    top: "60.3%",
    rotate: 4,
    size: 101,
    curlRotation: 220,
    label: "Creator portrait — middle right",
  },
  {
    id: "bl",
    src: "/section-17/portraits/sticker-bl.png",
    left: "18.4%",
    top: "60.3%",
    rotate: -2,
    size: 101,
    curlRotation: 280,
    label: "Creator portrait — bottom left",
  },
  {
    id: "bc",
    src: "/section-17/portraits/sticker-bc.png",
    left: "50%",
    top: "83.1%",
    rotate: 1,
    size: 101,
    curlRotation: 240,
    centerX: true,
    label: "Creator portrait — bottom center",
  },
];

const Star = ({ className }: { className?: string }) => (
  <img
    src="/section-17/decor/star.svg"
    alt=""
    width={22}
    height={36}
    className={className}
    aria-hidden="true"
  />
);

export const StickerStage = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 hidden desktop-sm:block"
      aria-label="Interactive creator stickers"
    >
      {STICKERS.map((sticker) => {
        const width = sticker.width ?? sticker.size ?? 101;
        const height = sticker.height ?? sticker.size ?? 101;
        const tx = sticker.centerX ? "-50%" : "0";

        return (
          <div
            key={sticker.id}
            className="pointer-events-auto absolute"
            style={{
              left: sticker.left,
              top: sticker.top,
              width,
              height,
              transform: `translate(${tx}, 0) rotate(${sticker.rotate ?? 0}deg)`,
              willChange: "transform",
            }}
          >
            <StickerPeeling
              image={{ src: sticker.src }}
              imageWidth={width}
              imageHeight={height}
              curlRotation={sticker.curlRotation ?? 240}
              hoverPeel={48}
              pressPeel={68}
              backColor="#f0ece6"
              shadowEnabled
              shadow={{ opacity: 28, color: "#000000", x: -40, y: 60 }}
              transition={{
                type: "tween",
                duration: 0.45,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              style={{ cursor: "pointer" }}
            />
            <span className="sr-only">{sticker.label}</span>
          </div>
        );
      })}
    </div>
  );
};
