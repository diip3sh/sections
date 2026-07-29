"use client";

// Spiral Images — Originkit
// Lituus spiral: r = a · θ^(-1/2)
// Props set in the preview:
//   turns: 1.2
//   speed: -1
//   spacing: 10
//   spread: 7
//   curve: 0.5  (classic lituus exponent)
//   imageSize: 261
//   sizeAttenuation (Size Falloff): 3
//   fadeIn: 0
//   fadeOut: 6
//   cornerRadius (Radius): 6

import { useEffect, useRef } from "react";

const TWO_PI = Math.PI * 2;

const DEFAULT_IMAGES = [
  { src: "/section-15/portraits/portrait-01.png" },
  { src: "/section-15/portraits/portrait-02.png" },
  { src: "/section-15/portraits/portrait-03.png" },
];

type SpiralImage = {
  src?: string;
};

type SpiralImagesProps = {
  images?: SpiralImage[];
  turns?: number;
  speed?: number;
  spacing?: number;
  spread?: number;
  sizeAttenuation?: number;
  imageSize?: number;
  fadeIn?: number;
  fadeOut?: number;
  cornerRadius?: number;
  /** Horizontal center as fraction of width (0–1). Default 0.5. */
  centerX?: number;
  /** Vertical center as fraction of height (0–1). Default 0.5. */
  centerY?: number;
  /**
   * When set, spiral terminus tracks this element's center each frame
   * (relative to the spiral canvas container). Use for the camera lens.
   */
  originRef?: React.RefObject<HTMLElement | null>;
  /** Extra px offset applied after origin / center resolution. */
  originOffsetX?: number;
  originOffsetY?: number;
  /**
   * Lituus exponent in r = a · θ^(-curve).
   * Classic lituus uses 0.5 (r = a / √θ). Higher = tighter toward center.
   */
  curve?: number;
  /**
   * Card orientation:
   * - outward: top of each image points away from hub (Figma)
   * - tangent: image follows the spiral path direction
   */
  rotationMode?: "outward" | "tangent";
  /** Extra rotation in degrees applied after mode. */
  rotationOffset?: number;
  /** Rotates the whole spiral path in degrees (0 = starts on +X / right of lens). */
  startAngle?: number;
  /** When true, spiral winds clockwise (Figma). */
  clockwise?: boolean;
  style?: React.CSSProperties;
};

/**
 * Spiral Images
 * Images flow along a lituus spiral (r = a · θ^(-1/2)) into the center.
 */
const SpiralImages = ({
  images = DEFAULT_IMAGES,
  turns = 3.5,
  speed = 2,
  spacing = 5,
  spread = 6,
  sizeAttenuation = 2,
  imageSize = 200,
  fadeIn = 20,
  fadeOut = 0,
  cornerRadius = 5,
  centerX = 0.5,
  centerY = 0.5,
  originRef,
  originOffsetX = 0,
  originOffsetY = 0,
  curve = 0.5,
  rotationMode = "outward",
  rotationOffset = 0,
  startAngle = 0,
  clockwise = true,
  style = {},
}: SpiralImagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const progressRef = useRef(0);
  const lastRef = useRef(0);
  const imgsRef = useRef<(HTMLImageElement | null)[]>([]);

  const items: SpiralImage[] = images.length > 0 ? images : DEFAULT_IMAGES;

  const srcKey = items.map((im) => im?.src || "").join("|");
  useEffect(() => {
    imgsRef.current = items.map((im) => {
      if (!im?.src) return null;
      const el = new Image();
      el.src = im.src;
      return el;
    });
  }, [srcKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(
      2,
      typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
    );
    let w = 0;
    let h = 0;

    const resize = () => {
      w = container.clientWidth || 600;
      h = container.clientHeight || 600;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const wind = clockwise ? -1 : 1;
    const startRad = (startAngle * Math.PI) / 180;
    const offsetRad = (rotationOffset * Math.PI) / 180;
    // Classic lituus: r = a · θ^(-1/2). `curve` dials the exponent (default 0.5).
    const exponent = Math.max(0.05, curve);
    // θ must stay > 0 (lituus singular at 0)
    const thetaMin = 0.35;
    const thetaSpan = Math.max(turns, 0.01) * TWO_PI;

    const spiral = (n: number, R: number) => {
      const theta = thetaMin + n * thetaSpan;
      // a chosen so outer edge (n=0) lands at radius R
      const a = R * Math.pow(thetaMin, exponent);
      const rad = a * Math.pow(theta, -exponent);
      const ang = startRad + wind * (theta - thetaMin);
      return { x: rad * Math.cos(ang), y: -rad * Math.sin(ang) };
    };

    const M = 2000;
    const cum = new Float32Array(M + 1);
    let prev = spiral(0, 1);
    for (let k = 1; k <= M; k++) {
      const pt = spiral(k / M, 1);
      const dx = pt.x - prev.x;
      const dy = pt.y - prev.y;
      cum[k] = cum[k - 1] + Math.sqrt(dx * dx + dy * dy);
      prev = pt;
    }
    const total = cum[M] || 1;
    const K = 1024;
    const nForArc = new Float32Array(K + 1);
    let j = 0;
    for (let a = 0; a <= K; a++) {
      const target = (a / K) * total;
      while (j < M && cum[j + 1] < target) j++;
      const seg = cum[j + 1] - cum[j];
      const f2 = seg > 0 ? (target - cum[j]) / seg : 0;
      nForArc[a] = (j + f2) / M;
    }
    const arcToN = (s: number) => {
      const x = Math.max(0, Math.min(K, s * K));
      const i = Math.floor(x);
      const a = nForArc[i];
      const b = nForArc[Math.min(i + 1, K)];
      return a + (b - a) * (x - i);
    };

    const roundRect = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      rw: number,
      rh: number,
      r: number,
    ) => {
      const rr = Math.min(r, rw / 2, rh / 2);
      c.beginPath();
      c.moveTo(x + rr, y);
      c.arcTo(x + rw, y, x + rw, y + rh, rr);
      c.arcTo(x + rw, y + rh, x, y + rh, rr);
      c.arcTo(x, y + rh, x, y, rr);
      c.arcTo(x, y, x + rw, y, rr);
      c.closePath();
    };

    const draw = (now: number) => {
      const dt = lastRef.current ? (now - lastRef.current) / 1000 : 0;
      lastRef.current = now;
      const f = Math.min(dt, 0.1);

      progressRef.current =
        (((progressRef.current + speed * f) % 100) + 100) % 100;
      const L = progressRef.current;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Prefer live origin (camera lens) over static fractions
      let cx = w * centerX;
      let cy = h * centerY;
      const origin = originRef?.current;
      if (origin && container) {
        const cr = container.getBoundingClientRect();
        const or = origin.getBoundingClientRect();
        if (cr.width > 0 && cr.height > 0) {
          cx = or.left + or.width / 2 - cr.left;
          cy = or.top + or.height / 2 - cr.top;
        }
      }
      cx += originOffsetX;
      cy += originOffsetY;

      // Radius from spiral center to farthest edge so outer cards fill the frame
      const edgeDist = Math.max(cx, w - cx, cy, h - cy);
      const R = edgeDist * 0.92 * (1 + (spread - 1) * 0.12);
      const els = imgsRef.current;
      const nImgs = els.length || 1;

      const stepFrac = Math.max(0.005, (spacing * 0.5) / 100);
      const slots = Math.min(400, Math.ceil(1 / stepFrac) + 2);
      const base = L / 100;

      const cards: { tt: number; n: number; img: number }[] = [];
      for (let i = 0; i < slots; i++) {
        const s = (((base + i * stepFrac) % 1) + 1) % 1;
        const n = arcToN(s);
        cards.push({ tt: s * 100, n, img: i % nImgs });
      }
      cards.sort((a, b) => a.n - b.n);

      for (let k = 0; k < cards.length; k++) {
        const { tt, n, img: imgIdx } = cards[k];
        const p = spiral(n, R);
        const dist = Math.sqrt(p.x * p.x + p.y * p.y);

        let opacity = 1;
        if (tt < fadeIn) opacity = tt / fadeIn;
        else if (tt > 100 - fadeOut) opacity = (100 - tt) / fadeOut;
        if (opacity < 0.01) continue;

        const scale =
          sizeAttenuation > 0
            ? Math.pow(Math.min(dist / R, 1), sizeAttenuation * 0.5)
            : 1;

        const p2 = spiral(Math.min(n + 0.001, 1), R);
        // Figma: tops point away from hub. Tangent follows the path instead.
        const angle =
          (rotationMode === "tangent"
            ? Math.atan2(p2.y - p.y, p2.x - p.x)
            : Math.atan2(p.y, p.x) + Math.PI / 2) + offsetRad;

        const el = els[imgIdx];
        const ready = el && el.complete && el.naturalWidth > 0;
        const aspect = ready ? el!.naturalWidth / el!.naturalHeight : 1;
        let cw = imageSize * scale;
        let ch = cw / aspect;
        if (aspect < 1) {
          ch = imageSize * scale;
          cw = ch * aspect;
        }

        const x = cx + p.x;
        const y = cy + p.y;
        const rad = (cornerRadius / 20) * (Math.min(cw, ch) / 2);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.globalAlpha = opacity;
        roundRect(ctx, -cw / 2, -ch / 2, cw, ch, rad);
        ctx.clip();
        if (ready) {
          ctx.drawImage(el!, -cw / 2, -ch / 2, cw, ch);
        } else {
          ctx.fillStyle = `hsl(${(imgIdx * 360) / nImgs}, 65%, 55%)`;
          ctx.fillRect(-cw / 2, -ch / 2, cw, ch);
        }
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    lastRef.current = 0;
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [
    srcKey,
    turns,
    speed,
    spacing,
    spread,
    sizeAttenuation,
    imageSize,
    fadeIn,
    fadeOut,
    cornerRadius,
    centerX,
    centerY,
    originRef,
    originOffsetX,
    originOffsetY,
    curve,
    rotationMode,
    rotationOffset,
    startAngle,
    clockwise,
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        ...style,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
};

export default SpiralImages;
