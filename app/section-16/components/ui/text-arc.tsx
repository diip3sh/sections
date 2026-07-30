"use client";

import { useEffect, useState } from "react";
import CircularText from "../originkit/text-ring";

/**
 * Upper arc of “AI Without Limits” above the headline.
 * Edges fade via alpha mask only — no painted overlays — so text blends into bg.
 */
/** Matches `--breakpoint-desktop-sm` in globals.css */
const DESKTOP_SM_MQ = "(min-width: 1280px)";

export const TextArc = () => {
  const [mounted, setMounted] = useState(false);
  const [fontSize, setFontSize] = useState("13px");

  useEffect(() => {
    setMounted(true);

    const mql = window.matchMedia(DESKTOP_SM_MQ);
    const syncFontSize = () => {
      setFontSize(mql.matches ? "16px" : "13px");
    };

    syncFontSize();
    mql.addEventListener("change", syncFontSize);
    return () => mql.removeEventListener("change", syncFontSize);
  }, []);

  // Soft L/R fade: text alpha → 0 into #091009 (no solid bars)
  const edgeMask =
    "linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%)";

  return (
    <div
      className="pointer-events-none relative mx-auto mb-3 h-[56px] w-full max-w-[316px] overflow-hidden"
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
        <div className="absolute top-0 left-1/2 size-[440px] -translate-x-1/2">
          <CircularText
            words={["AI Without Limits"]}
            separator=" · "
            diameter={440}
            color="rgba(255,255,255,1)"
            onHover="pause"
            hoverSpeed={8}
            transition={{ type: "tween", duration: 40, ease: "linear" }}
            font={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize,
              letterSpacing: "0.06em",
              lineHeight: "1em",
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ) : null}
    </div>
  );
};
