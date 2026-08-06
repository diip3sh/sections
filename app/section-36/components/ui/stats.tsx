/**
 * The four figures — Figma 2402:5479 (mobile), 2402:5980 (tablet),
 * 2402:6279 (desktop).
 *
 * One row of four on desktop, a 2x2 on tablet, a stack on the phone, spanning
 * rail to rail at every width. Alternate cells carry `#f3f4f7`; the rest are the
 * page colour rather than transparent, and that is load-bearing — the band sits
 * over the backdrop grid, and Figma cuts a hole in the grid exactly the height of
 * this band. Painting the page colour is the same result with none of the
 * coupling, so `grid-backdrop.tsx` can run its grid straight through.
 *
 * Tablet is the one frame that reorders: Figma puts 250M+ before 99.99% there so
 * the two filled cells fall on the 2x2 diagonal instead of stacking into a
 * striped left column. The DOM keeps reading order and `order` does the swap,
 * which is also why the fill can stay on items one and three at every width.
 */

const STATS = [
  {
    value: "145+",
    label: "Currencies & payment methods supported worldwide",
    /** Figma 2402:5981 / 6282 — filled at every frame. */
    filled: true,
    order: "",
  },
  {
    value: "$1.6T+",
    label: "Annual payment volume securely processed",
    filled: false,
    order: "",
  },
  {
    value: "99.99%",
    label: "Platform reliability trusted by enterprises",
    filled: true,
    order: "ipad:order-4 desktop-sm:order-none",
  },
  {
    value: "250M+",
    label: "Recurring subscriptions managed globally",
    filled: false,
    order: "ipad:order-3 desktop-sm:order-none",
  },
];

export const Stats = ({ className = "" }: { className?: string }) => (
  <dl
    className={`grid w-full grid-cols-1 ipad:grid-cols-2 desktop-sm:grid-cols-4 ${className}`}
  >
    {STATS.map(({ value, label, filled, order }) => (
      <div
        key={value}
        className={`flex flex-col items-start gap-[8px] p-[20px] ipad:self-start ipad:px-[24px] ipad:py-[16px] ${filled ? "bg-[#f3f4f7]" : "bg-[#edeff3]"} ${order}`}
      >
        <dt className="w-full font-tight text-[22px] leading-[1.1] font-medium tracking-[-0.02em] text-black/70 ipad:text-[28px]">
          {value}
        </dt>
        {/* Figma caps the label at 219/220px on the wider frames; the phone lets
            it run the full cell. */}
        <dd className="font-tight text-[16px] leading-[1.3] text-black opacity-60 ipad:max-w-[220px]">
          {label}
        </dd>
      </div>
    ))}
  </dl>
);
