"use client";

// Thunder Strike — Originkit
// Props set in the preview:
//   color: #C98BFF
//   intensity: 85
//   angle: 90
//   speed: 12
//   thickness: 3
//   bloom: 70

import * as React from "react";
import { useEffect, useRef } from "react";

const RenderTarget = {
  current: () => "preview",
  canvas: "canvas",
  export: "export",
  thumbnail: "thumbnail",
  preview: "preview",
};

/**
 * ThunderStrike — a cinematic electric bolt that crackles along a controllable
 * axis. A bright core line jitters with layered glow blooms; soft sparks spit
 * off the path. Tunable color, intensity, angle, speed, thickness, and bloom.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 * @framerIntrinsicWidth 200
 * @framerIntrinsicHeight 400
 */
export default function ThunderStrike(props: Props) {
  props = { ...COMPONENT_DEFAULTS, ...props };
  const {
    color,
    intensity,
    angle,
    speed,
    thickness,
    bloom,
    branchCount,
    style,
  } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  const renderTarget = RenderTarget.current();
  const isStatic =
    renderTarget === RenderTarget.export ||
    renderTarget === RenderTarget.thumbnail;

  const parseColor = (input: string): [number, number, number] => {
    if (!input) return [201, 139, 255];
    const s = input.trim();
    if (s.startsWith("#")) {
      let hex = s.slice(1);
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((c) => c + c)
          .join("");
      }
      const num = parseInt(hex, 16);
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }
    const m = s.match(/rgba?\(([^)]+)\)/i);
    if (m) {
      const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
      return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
    }
    return [201, 139, 255];
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const [cr, cg, cb] = parseColor(color);
    const intensityN = Math.max(0, Math.min(100, intensity)) / 100;
    const bloomN = Math.max(0, Math.min(100, bloom)) / 100;
    const thick = Math.max(0.5, thickness);
    const branches = Math.max(0, Math.min(8, Math.round(branchCount)));
    const speedN = Math.max(0.1, speed);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    type Point = { x: number; y: number };
    type Bolt = { points: Point[]; life: number; maxLife: number; width: number };

    const boltsRef: { main: Bolt | null; sparks: Bolt[]; phase: number } = {
      main: null,
      sparks: [],
      phase: 0,
    };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const buildBolt = (
      x0: number,
      y0: number,
      x1: number,
      y1: number,
      segs: number,
      jag: number,
    ): Point[] => {
      const pts: Point[] = [{ x: x0, y: y0 }];
      for (let i = 1; i < segs; i++) {
        const t = i / segs;
        const nx = x0 + (x1 - x0) * t;
        const ny = y0 + (y1 - y0) * t;
        const dx = x1 - x0;
        const dy = y1 - y0;
        const len = Math.hypot(dx, dy) || 1;
        const px = -dy / len;
        const py = dx / len;
        const offset = (Math.random() * 2 - 1) * jag * (1 - Math.abs(t - 0.5) * 0.4);
        pts.push({ x: nx + px * offset, y: ny + py * offset });
      }
      pts.push({ x: x1, y: y1 });
      return pts;
    };

    const spawnMain = (w: number, h: number) => {
      const rad = ((angle - 90) * Math.PI) / 180;
      const cx = w * 0.5;
      const cy = h * 0.02;
      const length = h * 0.98;
      const ex = cx + Math.cos(rad) * length;
      const ey = cy + Math.sin(rad) * length;
      // Near-straight electric beam — light jitter like Figma Electric Line
      boltsRef.main = {
        points: buildBolt(cx, cy, ex, ey, 22, Math.max(1.5, w * 0.018)),
        life: 1,
        maxLife: 1,
        width: thick,
      };

      boltsRef.sparks = [];
      for (let i = 0; i < branches; i++) {
        const main = boltsRef.main.points;
        const idx = Math.floor(rand(0.25, 0.75) * (main.length - 1));
        const origin = main[idx];
        const side = Math.random() > 0.5 ? 1 : -1;
        const blen = h * rand(0.08, 0.22);
        boltsRef.sparks.push({
          points: buildBolt(
            origin.x,
            origin.y,
            origin.x + side * blen * rand(0.4, 1),
            origin.y + blen * rand(0.6, 1.2),
            8,
            Math.max(2, w * 0.03),
          ),
          life: 1,
          maxLife: 1,
          width: thick * 0.45,
        });
      }
    };

    const drawBolt = (
      bolt: Bolt,
      alpha: number,
      widthMul: number,
      blur: number,
      rgb: [number, number, number],
    ) => {
      if (bolt.points.length < 2) return;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
      ctx.lineWidth = bolt.width * widthMul;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      if (blur > 0) ctx.shadowBlur = blur;
      ctx.shadowColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${Math.min(1, alpha)})`;
      ctx.beginPath();
      ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
      for (let i = 1; i < bolt.points.length; i++) {
        ctx.lineTo(bolt.points[i].x, bolt.points[i].y);
      }
      ctx.stroke();
      ctx.restore();
    };

    const drawTopBloom = (w: number, h: number, pulse: number) => {
      // Elongated vertical star bloom (matches Figma Star 14/15)
      const cx = w * 0.5;
      const cy = h * 0.08;
      const rx = Math.min(w, h) * (0.18 + bloomN * 0.22) * pulse;
      const ry = h * (0.42 + bloomN * 0.28) * pulse;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.translate(cx, cy);
      ctx.scale(rx, ry);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      g.addColorStop(0, `rgba(255,255,255,${0.7 * intensityN * pulse})`);
      g.addColorStop(
        0.12,
        `rgba(${cr},${cg},${cb},${0.55 * intensityN * pulse})`,
      );
      g.addColorStop(
        0.4,
        `rgba(${cr},${cg},${cb},${0.22 * intensityN * pulse})`,
      );
      g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    let strikeTimer = 0;
    let nextStrike = 0.05;

    const drawFrame = (dt: number) => {
      const { w, h } = sizeRef.current;
      if (w < 1 || h < 1) return;

      ctx.clearRect(0, 0, w, h);
      boltsRef.phase += dt * speedN;

      strikeTimer += dt;
      const flicker = 0.75 + 0.25 * Math.sin(boltsRef.phase * 14);

      if (!boltsRef.main || strikeTimer >= nextStrike) {
        spawnMain(w, h);
        strikeTimer = 0;
        nextStrike = rand(0.04, 0.12) * (2.2 / speedN);
      } else if (Math.random() < 0.35 * speedN * dt * 8) {
        // Micro-crackle: rebuild path in place for electric jitter
        const main = boltsRef.main;
        const last = main.points[main.points.length - 1];
        main.points = buildBolt(
          main.points[0].x,
          main.points[0].y,
          last.x,
          last.y,
          22,
          Math.max(1.2, w * 0.016),
        );
      }

      drawTopBloom(w, h, flicker);

      if (boltsRef.main) {
        const a = intensityN * flicker;
        // Wide purple haze along the beam
        drawBolt(boltsRef.main, a * 0.2, 14 + bloomN * 12, 36 + bloomN * 40, [
          cr,
          cg,
          cb,
        ]);
        drawBolt(boltsRef.main, a * 0.35, 7 + bloomN * 5, 22 + bloomN * 18, [
          cr,
          cg,
          cb,
        ]);
        drawBolt(boltsRef.main, a * 0.55, 3.5, 12, [cr, cg, cb]);
        // Hot lavender mid
        drawBolt(boltsRef.main, a * 0.85, 1.8, 6, [
          Math.min(255, cr + 40),
          Math.min(255, cg + 40),
          255,
        ]);
        // White-hot core (Figma electric centerline)
        drawBolt(boltsRef.main, Math.min(1, a * 1.15), 1.1, 3, [255, 255, 255]);
        drawBolt(boltsRef.main, Math.min(1, a * 1.2), 0.45, 0, [255, 255, 255]);

        for (const spark of boltsRef.sparks) {
          drawBolt(spark, a * 0.35, 3, 12, [cr, cg, cb]);
          drawBolt(spark, a * 0.7, 1, 2, [255, 255, 255]);
        }
      }
    };

    if (isStatic) {
      spawnMain(sizeRef.current.w, sizeRef.current.h);
      drawFrame(1 / 60);
      return () => {
        ro.disconnect();
      };
    }

    let lastT = performance.now();
    const loop = (t: number) => {
      const deltaSec = Math.min(0.05, (t - lastT) / 1000);
      lastT = t;
      drawFrame(deltaSec);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [
    color,
    intensity,
    angle,
    speed,
    thickness,
    bloom,
    branchCount,
    isStatic,
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "transparent",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}

type Props = {
  color: string;
  intensity: number;
  angle: number;
  speed: number;
  thickness: number;
  bloom: number;
  branchCount: number;
  style?: React.CSSProperties;
};

const COMPONENT_DEFAULTS: Props = {
  color: "#C98BFF",
  intensity: 85,
  angle: 90,
  speed: 12,
  thickness: 3,
  bloom: 70,
  branchCount: 2,
};
