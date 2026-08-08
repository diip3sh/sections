import { Sticker } from "./sticker";

/**
 * The folder at the bottom edge (Figma 1457:1598 / 1457:1498 / 1457:1249).
 *
 * Three layers, and the order is the whole effect: a plate behind, the three
 * cards, then a front panel painted *over* their lower halves so they read as
 * tucked into a pocket rather than stacked on a tray. Getting that wrong is not
 * subtle — the cards float clear of the folder and the panel reads as a stray
 * white shape below them.
 *
 * So the panel carries a z above the cards rather than sharing a wrapper with
 * the plate. The cards sit between the two, and they are stickers, not art:
 * each one peels and drags like the six loose ones, which is why they are not
 * inside a scaled wrapper — a WebGL canvas under a CSS `scale` rasterises at the
 * wrong size and comes back soft.
 *
 * The plate and panel are restated per frame instead of scaled for the same
 * reason the order matters: they interleave with canvases, and a transform on
 * either would take the whole layer out of the flow the z-order depends on.
 * Every number is Figma's own — the phone's are the tablet's at 0.7056, which is
 * the frame ratio, so they agree by construction rather than by rounding.
 *
 * The folder hangs below the frame's bottom edge by 11.4 / 5.5 / 47.5 — Figma
 * runs it off the fold — so it is measured from the bottom, which also keeps it
 * on the fold when `min-h-dvh` makes the stage taller than the frame.
 */
const STACK =
  "absolute bottom-[-11.4px] left-1/2 h-[170.391px] w-[221.234px] -translate-x-1/2 ipad:bottom-[-5.5px] ipad:h-[241.497px] ipad:w-[313.558px] desktop-sm:bottom-[-47.5px]";

/** Rotated bounding boxes, phone / tablet — Figma's own outer boxes. */
const FIGMA = { mobile: 79.023, ipad: 112 };
const SLACK = { mobile: 86.968, ipad: 123.261 };
const NOTION = { mobile: 106.188, ipad: 150.501 };

export const CardStack = () => (
  <div className={`${STACK} z-[15]`}>
    {/* The plate behind everything: a white hairline over #f5f5f5, lifted on a
        soft drop shadow and lined with an inset glow. The fill sits on a child
        so the inset shadow paints over it rather than under it. */}
    <div
      aria-hidden
      className="pointer-events-none absolute top-[7.76px] left-[14.81px] z-0 h-[160.868px] w-[196.146px] rounded-[13.457px] border-[0.666px] border-solid border-white shadow-[0px_10.766px_16.148px_0px_rgba(0,0,0,0.3)] ipad:top-[11px] ipad:left-[21px] ipad:h-[228px] ipad:w-[278px] ipad:rounded-[19.073px] ipad:border-[0.943px] ipad:shadow-[0px_15.258px_22.887px_0px_rgba(0,0,0,0.3)]"
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-[inherit] bg-[#f5f5f5]"
      />
      <span
        aria-hidden
        className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_26.914px_0px_rgba(255,255,255,0.4)] ipad:shadow-[inset_0px_0px_38.146px_0px_rgba(255,255,255,0.4)]"
      />
    </div>

    {/* Notion sits furthest back and furthest turned; Figma is square to the plate. */}
    <Sticker
      name="notion"
      label="Notion"
      size={NOTION}
      className="top-[-1.41px] left-[11.28px] z-[1] ipad:top-[-2px] ipad:left-[16px]"
    />
    <Sticker
      name="slack"
      label="Slack"
      size={SLACK}
      className="top-[14.11px] left-[117.83px] z-[2] ipad:top-[20px] ipad:left-[167px]"
    />
    <Sticker
      name="figma"
      label="Figma"
      size={FIGMA}
      className="top-[-30.5px] left-[65.45px] z-[3] ipad:top-[-43.24px] ipad:left-[92.76px]"
    />

    {/*
      The folder's front panel, over the cards. Figma bakes it as a vector
      carrying its own gradient — the one layer here that is not a box, so it is
      the one that ships as an export.
    */}
    <img
      src="/section-44/card-stack-plate.svg"
      alt=""
      aria-hidden
      className="pointer-events-none absolute top-[43.63px] left-0 z-[4] block h-[126.766px] w-[221.234px] max-w-none ipad:top-[61.83px] ipad:h-[179.667px] ipad:w-[313.558px]"
    />
  </div>
);
