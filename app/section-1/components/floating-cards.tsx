import Image from "next/image";

export const FloatingCards = () => {
  return (
    <>
      <div className="absolute -left-[7.35%] top-[6.83%] z-10 h-[82.62%] w-[37.52%] max-lg:left-[-14%] max-lg:top-[4%] max-lg:h-[78%] max-lg:w-[52%] max-md:left-[-22%] max-md:top-[2%] max-md:h-[72%] max-md:w-[68%] max-sm:left-[-30%] max-sm:top-0 max-sm:h-[66%] max-sm:w-[88%]">
        <Image
          alt="Productivity dashboard cards showing backlog, activity feed, and productivity reports"
          className="size-full object-contain object-left-top"
          fill
          priority
          sizes="(max-width: 768px) 88vw, (max-width: 1024px) 52vw, 38vw"
          src="/section-1/cards-left.png"
        />
      </div>

      <div className="absolute -top-[14.11%] left-[70.31%] z-10 h-[103.56%] w-[37.45%] max-lg:left-[62%] max-lg:top-[-10%] max-lg:h-[96%] max-lg:w-[52%] max-md:left-[54%] max-md:top-[-8%] max-md:h-[88%] max-md:w-[68%] max-sm:left-[46%] max-sm:top-[-6%] max-sm:h-[80%] max-sm:w-[88%]">
        <Image
          alt="Workspace sidebar, performance chart, and keyboard shortcut cards"
          className="size-full object-contain object-right-top"
          fill
          priority
          sizes="(max-width: 768px) 88vw, (max-width: 1024px) 52vw, 38vw"
          src="/section-1/cards-right.png"
        />
      </div>
    </>
  );
};
