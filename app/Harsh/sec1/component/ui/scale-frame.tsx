"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Renders a fixed-width design frame and scales it to the available width.
 *
 *  CSS can't express this on its own — `zoom` and `transform: scale()` both
 *  need a unitless number, and calc() can't divide a vw by a px — so the
 *  factor is measured. Everything inside stays at its exact Figma pixel
 *  value; only the frame is scaled, so line breaks and proportions can't
 *  drift the way per-property clamps let them.
 */
export const ScaleFrame = ({
  frameWidth,
  className,
  children,
}: {
  frameWidth: number;
  className?: string;
  children: ReactNode;
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const measure = () => {
      const next = outer.clientWidth / frameWidth;
      setScale(next);
      setHeight(inner.offsetHeight * next);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(outer);
    observer.observe(inner);
    measure();

    return () => observer.disconnect();
  }, [frameWidth]);

  return (
    <div ref={outerRef} className={className} style={{ height }}>
      <div
        ref={innerRef}
        style={{
          width: frameWidth,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
};
