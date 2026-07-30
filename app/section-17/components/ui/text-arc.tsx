"use client";

import { useEffect, useRef, useState } from "react";
import CurvedLoop from "../originkit/curved-marquee";

const VIEWBOX_WIDTH = 1440;

/** Change this to tune the bow — viewBox height / top space scales with it */
const CURVE_AMOUNT = -120;

/**
 * Arc sits in normal flow above the headline.
 * Width from parent column; font + curve drive a growing SVG so nothing clips.
 */
export const TextArc = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sync = (nextWidth: number) => {
      const rounded = Math.round(nextWidth);
      setWidth((prev) => (prev === rounded ? prev : rounded));
    };

    sync(root.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      sync(entry.contentRect.width);
    });

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const visualPx = width > 0 ? Math.min(16, Math.max(9, width * 0.024)) : 11;
  const fontSize =
    width > 0 ? Math.round(visualPx * (VIEWBOX_WIDTH / width)) : 36;

  // Approximate reserved height so layout doesn't jump before mount
  const fontSizePx = fontSize;
  const upward = Math.max(0, -CURVE_AMOUNT);
  const reserveH = Math.max(fontSizePx * 1.8, fontSizePx * 1.8 + upward);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none w-full overflow-visible"
      aria-hidden="true"
    >
      {width > 0 ? (
        <CurvedLoop
          text="2 Months Free - Annually"
          direction="left"
          baseVelocity={10}
          curveAmount={-646}
          gap={5}
          draggable={false}
          fade
          fadePercent={50}
          color="#010101"
          font={{
            fontFamily:
              "var(--font-helvetica-neue-family), Helvetica Neue, sans-serif",
            fontWeight: 500,
            fontSize,
            letterSpacing: "0.16em",
            lineHeight: "1em",
            textAlign: "left",
          }}
          style={{ width: "100%", height: "auto" }}
        />
      ) : (
        <div
          className="w-full"
          style={{ aspectRatio: `${VIEWBOX_WIDTH} / ${reserveH}` }}
        />
      )}
    </div>
  );
};
