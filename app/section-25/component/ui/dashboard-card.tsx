import Image from "next/image";

type Metric = {
  id: string;
  icon: string;
  label: string;
  value: string;
  /** The highlighted light row (Weekly Earnings in the design). */
  highlight?: boolean;
  trend?: boolean;
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

const RowContent = ({ metric }: { metric: Metric }) => (
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
);

/** Floating supervision dashboard — Figma 2271:4897. Static, as designed. */
export const DashboardCard = ({ className = "" }: { className?: string }) => (
  <div
    className={`h-[218.812px] w-[325.863px] ipad:h-[267.953px] ipad:w-[400.615px] desktop-sm:h-[339px] desktop-sm:w-[505px] ${className}`}
  >
    <div className="w-[325.863px] origin-top-left bg-[#1d1d1d] p-[1.291px] ipad:scale-[1.2294] desktop-sm:scale-[1.5497]">
      <div className="w-full border-[0.645px] border-[#363534] bg-[#262626] p-[10.324px]">
        <div className="flex w-full items-center overflow-hidden rounded-[12.905px] border-[0.645px] border-[rgba(227,216,197,0.2)] bg-[#1d1d1d] p-[12.905px] shadow-[0px_21.939px_5.807px_0px_rgba(0,0,0,0),0px_14.196px_5.807px_0px_rgba(0,0,0,0.01),0px_7.743px_4.517px_0px_rgba(0,0,0,0.05),0px_3.226px_3.226px_0px_rgba(0,0,0,0.09),0px_0.645px_1.936px_0px_rgba(0,0,0,0.1)]">
          <div className="flex min-w-px flex-1 flex-col gap-[7.743px]">
            {METRICS.map((metric) =>
              metric.highlight ? (
                /* Tilted highlight row over its dashed slot */
                <div key={metric.id} className="relative h-[30.973px] w-full">
                  <div className="absolute inset-0 rounded-[6.453px] border-[0.645px] border-dashed border-[#d9d9d9] bg-[#252525]" />
                  <div className="absolute top-[4.52px] left-[2.94%] w-[97.06%] rotate-[2.5deg] overflow-hidden rounded-[10px] border-[0.645px] border-[#efebd2] bg-[#fbfaf4] py-[3.872px] pr-[3.872px] pl-[7.743px] drop-shadow-[0px_0px_0.323px_rgba(102,102,102,0.09)]">
                    <RowContent metric={metric} />
                  </div>
                </div>
              ) : (
                <div
                  key={metric.id}
                  className="flex h-[30.973px] w-full items-center overflow-hidden rounded-[6.453px] border-[0.645px] border-[rgba(227,216,197,0.2)] bg-[#424242] py-[3.872px] pr-[3.872px] pl-[7.743px]"
                >
                  <RowContent metric={metric} />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
