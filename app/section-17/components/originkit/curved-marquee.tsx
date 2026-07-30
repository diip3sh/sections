// Curved Marquee — Originkit
// Seamless loop via textPath startOffset (tspan x is ignored inside textPath).

"use client";

import {
  useRef,
  useEffect,
  useState,
  useMemo,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

interface FontValue {
  fontFamily?: string;
  fontWeight?: string | number;
  fontSize?: string | number;
  letterSpacing?: string | number;
  lineHeight?: string | number;
  textAlign?: string;
}

interface CurvedLoopProps {
  text?: string;
  font?: FontValue;
  color?: string;
  direction?: "left" | "right";
  baseVelocity?: number;
  curveAmount?: number;
  gap?: number;
  draggable?: boolean;
  dragIntensity?: number;
  fade?: boolean;
  fadePercent?: number;
  style?: CSSProperties;
}

const MAX_SPEED = 800;

export default function CurvedLoop({
  text = "Originkit",
  font = {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 64,
    lineHeight: "1.5em",
    letterSpacing: "1px",
    textAlign: "left",
  },
  color = "#FFFFFF",
  direction = "right",
  baseVelocity = 35,
  curveAmount = -400,
  gap = 12,
  draggable = true,
  dragIntensity = 10,
  fade = true,
  fadePercent = 12,
  style,
}: CurvedLoopProps) {
  const measureRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [spacing, setSpacing] = useState(0);

  const staticId = useMemo(() => {
    const propsString = `${text}-${curveAmount}-${direction}-${baseVelocity}`;
    let hash = 0;
    for (let i = 0; i < propsString.length; i++) {
      const char = propsString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }, [text, curveAmount, direction, baseVelocity]);
  const pathId = `curve-${staticId}`;
  const fadeGradientId = `fadeGradient-${staticId}`;
  const fadeMaskId = `fadeMask-${staticId}`;

  const isDragging = useRef(false);
  const dragVelocity = useRef(0);
  const offsetRef = useRef(0);
  const effectiveVelocity = (baseVelocity / 100) * MAX_SPEED;
  const actualBaseVelocity =
    direction === "left" ? -effectiveVelocity : effectiveVelocity;
  const dragFactor = dragIntensity * 0.1;

  const processedText = useMemo(() => text.trim(), [text]);

  // Trailing spaces become the visual gap; measuring this string = wrap period
  const unitText = useMemo(() => {
    const spaces = Math.max(1, Math.round(gap / 2) + 1);
    return `${processedText}${"\u00A0".repeat(spaces)}`;
  }, [processedText, gap]);

  const fontFamily = font.fontFamily ?? "sans-serif";
  const fontWeight = font.fontWeight ?? 400;
  const fontSize = font.fontSize ?? 64;
  const letterSpacing = font.letterSpacing ?? "0";
  const lineHeight = font.lineHeight ?? "1em";

  const fontSizePx =
    typeof fontSize === "number"
      ? fontSize
      : Number.parseFloat(String(fontSize)) || 64;

  /**
   * Grow the viewBox with |curveAmount| so the arc + glyphs never clip.
   * Negative curveAmount = upward bow; positive = downward.
   */
  const VIEWBOX_W = 1440;
  const topPad = fontSizePx * 1.2;
  const bottomPad = fontSizePx * 0.6;
  const upward = Math.max(0, -curveAmount);
  const downward = Math.max(0, curveAmount);
  const baseline = topPad + upward;
  const viewBoxH = Math.max(
    topPad + bottomPad + 1,
    topPad + upward + downward + bottomPad,
  );
  const pathD = `M-80,${baseline} Q720,${baseline + curveAmount} 1520,${baseline}`;

  // spacing = measured length of one unit (text + gap spaces)
  const unit = spacing;

  // Fill path (~1600) with enough copies for a continuous marquee
  const pathSpan = 1600;
  const repeats = unit > 0 ? Math.ceil(pathSpan / unit) + 2 : 0;
  const loopText =
    repeats > 0 ? Array.from({ length: repeats }, () => unitText).join("") : unitText;

  useEffect(() => {
    let cancelled = false;

    const measure = () => {
      if (cancelled || !measureRef.current) return;
      const width = measureRef.current.getComputedTextLength();
      if (width > 0) {
        setSpacing(width);
        return;
      }
      const size =
        typeof fontSize === "number"
          ? fontSize
          : Number.parseFloat(String(fontSize)) || 32;
      setSpacing(Math.max(1, unitText.length * size * 0.55));
    };

    const run = async () => {
      try {
        if (typeof document !== "undefined" && document.fonts?.ready) {
          await document.fonts.ready;
        }
      } catch {
        // ignore
      }
      if (cancelled) return;
      measure();
      requestAnimationFrame(measure);
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [unitText, fontFamily, fontWeight, fontSize, letterSpacing]);

  const ready = unit > 0;

  useEffect(() => {
    if (!ready) return;
    let raf = 0;
    let last = performance.now();

    const wrapOffset = (value: number) => {
      let next = value;
      while (next <= -unit) next += unit;
      while (next > 0) next -= unit;
      return next;
    };

    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      const pathEl = textPathRef.current;
      if (!pathEl) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (isDragging.current) {
        offsetRef.current = wrapOffset(offsetRef.current + dragVelocity.current);
        dragVelocity.current *= 0.9;
        if (Math.abs(dragVelocity.current) < 0.01) dragVelocity.current = 0;
      } else {
        let moveBy = actualBaseVelocity * (delta / 1e3);
        moveBy += dragVelocity.current;
        if (Math.abs(dragVelocity.current) > 0.01) {
          dragVelocity.current *= 0.96;
        } else {
          dragVelocity.current = 0;
        }
        offsetRef.current = wrapOffset(offsetRef.current + moveBy);
      }

      pathEl.setAttribute("startOffset", `${offsetRef.current}px`);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, unit, actualBaseVelocity]);

  const lastPointerPosition = useRef({ x: 0, y: 0 });
  const handlePointerDown = (e: ReactPointerEvent<SVGTextElement>) => {
    if (!draggable) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.style.cursor = "grabbing";
    isDragging.current = true;
    lastPointerPosition.current = { x: e.clientX, y: e.clientY };
    dragVelocity.current = 0;
  };
  const handlePointerMove = (e: ReactPointerEvent<SVGTextElement>) => {
    if (!draggable) return;
    if (!isDragging.current) return;
    const currentPosition = { x: e.clientX, y: e.clientY };
    const deltaX = currentPosition.x - lastPointerPosition.current.x;
    dragVelocity.current = deltaX * dragFactor;
    lastPointerPosition.current = currentPosition;
  };
  const handlePointerUp = (e: ReactPointerEvent<SVGTextElement>) => {
    if (!draggable) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    e.currentTarget.style.cursor = "grab";
    isDragging.current = false;
  };
  const cursorStyle = draggable
    ? isDragging.current
      ? "grabbing"
      : "grab"
    : "default";

  const fadeStart = `${fadePercent}%`;
  const fadeEnd = `${100 - fadePercent}%`;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "auto",
        display: "block",
        overflow: "visible",
        opacity: ready ? 1 : 0,
        ...style,
      }}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${viewBoxH}`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          aspectRatio: `${VIEWBOX_W} / ${viewBoxH}`,
          overflow: "visible",
          userSelect: "none",
          fill: color,
          fontFamily,
          fontSize,
          letterSpacing,
          lineHeight,
        }}
      >
        <text
          ref={measureRef}
          xmlSpace="preserve"
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          fontSize={fontSize}
          letterSpacing={letterSpacing}
          style={{
            visibility: "hidden",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          {unitText}
        </text>
        <defs>
          <path
            ref={pathRef}
            id={pathId}
            d={pathD}
            fill="none"
            stroke="transparent"
          />
          {fade && (
            <>
              <linearGradient
                id={fadeGradientId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset={fadeStart} stopColor="white" stopOpacity="1" />
                <stop offset={fadeEnd} stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id={fadeMaskId}>
                <rect
                  width="100%"
                  height="100%"
                  fill={`url(#${fadeGradientId})`}
                />
              </mask>
            </>
          )}
        </defs>
        {ready && (
          <text
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            fontSize={fontSize}
            letterSpacing={letterSpacing}
            xmlSpace="preserve"
            mask={fade ? `url(#${fadeMaskId})` : undefined}
            style={{ cursor: cursorStyle }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset="0px"
              xmlSpace="preserve"
            >
              {loopText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
}
