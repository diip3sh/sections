"use client";

import { useEffect, useRef, useState } from "react";

import BlackHole from "../originkit/black-hole";

/**
 * The accretion disk — Figma `image 3083603` (2405:6373 / 6455 / 6489), live
 * rather than the flattened PNG it bakes.
 *
 * Figma's box is 370x297 / 647x520 / 673x540, and it hangs off the bottom of the
 * section rather than the top: its foot lands on the logo strip at every frame,
 * so that is the edge the offsets in `section-33-hero.tsx` measure from.
 *
 * `voidRadius` is the one control that cannot be a constant. It is an absolute
 * pixel radius the component reads in JS, and the frame keeps it at a fixed
 * *fraction* of the box — 45px in the 673 desktop box and 25 in the 370 phone
 * one, both 6.7% — so a fixed number would give the phone a black hole nearly
 * twice its share. Measuring the box and deriving from it covers the widths
 * between the breakpoints too, which a tier table would not.
 *
 * Everything else is a ratio or a rate and holds at any size: `outerRadius` is a
 * percentage of the half-canvas, and the orange is Figma's `#f40` — the render's
 * darker browns are the trail fading, not a second colour in the palette.
 */

/** Void radius over box width, read off all three frames. */
const VOID_RATIO = 0.067;

export const AccretionDisk = ({ className = "" }: { className?: string }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    setWidth(Math.round(host.getBoundingClientRect().width));
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.round(entry.contentRect.width)),
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${className}`}
    >
      {width > 0 && (
        <BlackHole
          /* The component paints its own black plate; the plume behind it has to
             stay visible, so the plate is turned off rather than matched. */
          style={{ background: "transparent" }}
          colors={["#ff4400"]}
          /* 1200, not the component default 1000 or anything denser: Figma's
             disk reads as separated orbital bands with dark gaps between them,
             and past about 1500 the trails merge into one solid mass. */
          particleCount={1200}
          particleSize={4}
          outerRadius={95}
          trail={50}
          orbitSpeed={4}
          pullSpeed={0}
          tilt={20}
          tiltSideway={160}
          showCenter
          centre={{
            voidRadius: Math.round(width * VOID_RATIO),
            voidX: 50,
            voidY: 50,
          }}
        />
      )}
    </div>
  );
};
