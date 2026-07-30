"use client";

import { useEffect, useState } from "react";
import CircularText from "../originkit/text-ring";

/** Matches `--breakpoint-desktop-sm` in globals.css */
const DESKTOP_SM_MQ = "(min-width: 1280px)";

/**
 * Upper arc of “2 Months Free - Annually” above the headline.
 * Edges fade via alpha mask so the ring blends into the grid.
 */
export const TextArc = () => {
  const [mounted, setMounted] = useState(false);
  const [fontSize, setFontSize] = useState("13px");

  useEffect(() => {
    setMounted(true);

    const mql = window.matchMedia(DESKTOP_SM_MQ);
    const syncFontSize = () => {
      setFontSize(mql.matches ? "15.6px" : "13px");
    };

    syncFontSize();
    mql.addEventListener("change", syncFontSize);
    return () => mql.removeEventListener("change", syncFontSize);
  }, []);

  const edgeMask =
    "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)";

  return (
    <div
      className="pointer-events-none relative mx-auto -mb-2 h-[72px] w-full max-w-[680px] overflow-hidden desktop-sm:h-[88px]"
      aria-hidden="true"
      style={{
        maskImage: edgeMask,
        WebkitMaskImage: edgeMask,
        maskMode: "alpha",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      {mounted ? (
        <div className="absolute top-0 left-1/2 size-[560px] -translate-x-1/2 desktop-sm:size-[680px]">
          <CircularText
            words={["2 Months Free - Annually"]}
            separator="   "
            diameter={680}
            color="#010101"
            onHover="pause"
            hoverSpeed={8}
            transition={{ type: "tween", duration: 48, ease: "linear" }}
            font={{
              fontFamily: "var(--font-helvetica-neue-family), Helvetica Neue, sans-serif",
              fontWeight: 500,
              fontSize,
              letterSpacing: "0.01em",
              lineHeight: "1em",
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ) : null}
    </div>
  );
};
