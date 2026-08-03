"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Metric = {
  id: string;
  icon: string;
  label: string;
  value: string;
  /** The highlighted light row (Weekly Earnings in the design). */
  highlight?: boolean;
  trend?: boolean;
};

type MetricItem = Metric & {
  /** Unique per cycle so AnimatePresence treats wrap-around as exit + enter. */
  key: string;
};

const METRICS: Metric[] = [
  {
    id: "supervisees",
    icon: "/section-25/icon-bell.svg",
    label: "Active supervisees ",
    value: "05",
  },
  {
    id: "sessions",
    icon: "/section-25/icon-calendar.svg",
    label: "Upcoming sessions",
    value: "2 Today",
  },
  {
    id: "earnings",
    icon: "/section-25/icon-notes-a.svg",
    label: "Weekly Earnings",
    value: "$1200",
    highlight: true,
  },
  {
    id: "hours",
    icon: "/section-25/icon-clock.svg",
    label: "Weekly supervision hours.",
    value: "20% vs last month",
    trend: true,
  },
];

const ROW_HEIGHT = 30.973;
const ROW_GAP = 7.743;
/** A row must clear its own height plus the gap to leave the stack cleanly. */
const TRAVEL = ROW_HEIGHT + ROW_GAP;
const CYCLE_MS = 2400;
/** ease-out-quint — rows settling into their new slot */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
/** ease-in-cubic — the leaving row accelerates away */
const EASE_IN = [0.55, 0.055, 0.675, 0.19] as const;

const MetricRow = ({ metric }: { metric: Metric }) => {
  return (
    <div
      className={`flex h-[30.973px] w-full items-center overflow-hidden rounded-[6.453px] border-[0.645px] py-[3.872px] pr-[3.872px] pl-[7.743px] ${
        metric.highlight
          ? "border-[#efebd2] bg-[#fbfaf4]"
          : "border-[rgba(227,216,197,0.2)] bg-[#424242]"
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-[6.453px]">
          {metric.highlight ? (
            <span className="relative block size-[15.487px] shrink-0">
              <Image
                src="/section-25/icon-notes-a.svg"
                alt=""
                fill
                sizes="16px"
                className="!inset-[28.72%_35.32%_8.34%_8.33%] !h-auto !w-auto"
              />
              <Image
                src="/section-25/icon-notes-b.svg"
                alt=""
                fill
                sizes="16px"
                className="!inset-[8.33%_10.07%_25.01%_29.17%] !h-auto !w-auto"
              />
            </span>
          ) : (
            <Image
              src={metric.icon}
              alt=""
              width={16}
              height={16}
              className="size-[15.487px] shrink-0"
            />
          )}
          <p
            className={`font-tight text-[9.034px] font-medium tracking-[-0.0903px] whitespace-nowrap ${
              metric.highlight ? "text-black" : "text-[#f1e6db]"
            }`}
          >
            {metric.label}
          </p>
        </div>

        <div
          className={`flex flex-col items-center justify-center px-[9.034px] py-[6.453px] ${
            metric.highlight ? "rounded-[4px]" : "rounded-[2.581px]"
          }`}
        >
          {metric.trend ? (
            <span className="flex items-center gap-[2.581px]">
              <Image
                src="/section-25/icon-arrow-up.svg"
                alt=""
                width={8}
                height={8}
                className="size-[7.743px]"
              />
              <p className="font-tight text-[7.743px] font-medium tracking-[-0.0774px] whitespace-nowrap text-[#f1e6db]">
                {metric.value}
              </p>
            </span>
          ) : (
            <p
              className={`font-tight text-[9.034px] font-medium tracking-[-0.0903px] whitespace-nowrap ${
                metric.highlight ? "text-black" : "text-[#f1e6db]"
              }`}
            >
              {metric.value}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

/** Floating supervision dashboard — metric rows cycle upward in a continuous loop. */
export const DashboardCard = ({ className = "" }: { className?: string }) => {
  const prefersReducedMotion = useReducedMotion();
  const cycleRef = useRef(0);
  const [metrics, setMetrics] = useState<MetricItem[]>(() =>
    METRICS.map((metric) => ({ ...metric, key: `${metric.id}-0` })),
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setMetrics((prev) => {
        const [first, ...rest] = prev;
        if (!first) return prev;

        cycleRef.current += 1;
        return [...rest, { ...first, key: `${first.id}-${cycleRef.current}` }];
      });
    }, CYCLE_MS);

    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <div
      className={`h-[218.812px] w-[325.863px] ipad:h-[267.953px] ipad:w-[400.615px] desktop-sm:h-[339px] desktop-sm:w-[505px] ${className}`}
    >
      <div className="w-[325.863px] origin-top-left bg-[#1d1d1d] p-[1.291px] ipad:scale-[1.2294] desktop-sm:scale-[1.5497]">
        <div className="w-full border-[0.645px] border-[#363534] bg-[#262626] p-[10.324px]">
          <div className="flex w-full items-center overflow-hidden rounded-[12.905px] border-[0.645px] border-[rgba(227,216,197,0.2)] bg-[#1d1d1d] p-[12.905px] shadow-[0px_21.939px_5.807px_0px_rgba(0,0,0,0),0px_14.196px_5.807px_0px_rgba(0,0,0,0.01),0px_7.743px_4.517px_0px_rgba(0,0,0,0.05),0px_3.226px_3.226px_0px_rgba(0,0,0,0.09),0px_0.645px_1.936px_0px_rgba(0,0,0,0.1)]">
            <div
              aria-live="off"
              className="relative flex min-w-px flex-1 flex-col gap-[7.743px] overflow-hidden"
            >
              <AnimatePresence initial={false} mode="popLayout">
                {metrics.map((metric) => (
                  <motion.div
                    key={metric.key}
                    layout
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: TRAVEL }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReducedMotion
                        ? undefined
                        : {
                            opacity: 0,
                            y: -TRAVEL,
                            transition: {
                              y: { duration: 0.4, ease: EASE_IN },
                              // Fades ahead of the travel so the row reads as
                              // dissolving out rather than sliding under the edge.
                              opacity: { duration: 0.3, ease: EASE_OUT },
                            },
                          }
                    }
                    transition={{
                      layout: { duration: 0.55, ease: EASE_OUT },
                      y: { duration: 0.55, ease: EASE_OUT },
                      opacity: { duration: 0.3, ease: EASE_OUT },
                    }}
                    className="will-change-transform"
                  >
                    <MetricRow metric={metric} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
