"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/** Sizing has to happen before the first paint, otherwise the frame shows at
 *  1× for a frame or two and then snaps to its real scale. React can't do that
 *  during SSR, so this runs inline right after the markup — the browser applies
 *  it while still parsing, and the effect below only keeps it in sync. */
const inlineScale = (id: string, frameWidth: number) =>
  `(function(){var o=document.getElementById(${JSON.stringify(id)});if(!o)return;` +
  `var i=o.firstElementChild;if(!i)return;var w=o.clientWidth;if(!w)return;` +
  `var s=w/${frameWidth};i.style.transform='scale('+s+')';` +
  `o.style.height=(i.offsetHeight*s)+'px';})()`;

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

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
  const id = useId();
  const [measured, setMeasured] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const measure = () => {
      const width = outer.clientWidth;
      if (!width) return;
      const scale = width / frameWidth;
      inner.style.transform = `scale(${scale})`;
      outer.style.height = `${inner.offsetHeight * scale}px`;
      setMeasured(true);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(outer);
    observer.observe(inner);
    measure();

    return () => observer.disconnect();
  }, [frameWidth]);

  return (
    <>
      {/* the inline script below writes height/transform before hydration, so
          the server markup deliberately differs from the client's */}
      <div ref={outerRef} id={id} className={className} suppressHydrationWarning>
        <div
          ref={innerRef}
          suppressHydrationWarning
          style={{
            width: frameWidth,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
      {!measured && (
        <script dangerouslySetInnerHTML={{ __html: inlineScale(id, frameWidth) }} />
      )}
    </>
  );
};
