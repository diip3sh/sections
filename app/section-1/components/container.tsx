import Image from "next/image";

export const HeroContainer = () => {
  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <div className="flex flex-col items-center gap-2.5">
        <a
          href="#"
          className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#141415] py-2 pl-4 pr-2 transition-colors duration-200 hover:border-white/20"
        >
          <span className="relative h-[22px] w-[22px]">
            <Image
              alt=""
              src="/section-1/container/badge-logo.png"
              fill
              sizes="22px"
              className="object-contain"
            />
          </span>
          <span className="font-tight text-[15px] font-medium leading-none text-[#d6d8db]">
            Manage projects end-to-end
          </span>
          <span className="flex size-[26px] items-center justify-center rounded-full bg-white/10 transition-colors duration-200 group-hover:bg-white/15">
            <Image
              alt=""
              src="/section-1/container/arrow-right.png"
              width={12}
              height={12}
              className="object-contain"
            />
          </span>
        </a>

        <div className="flex flex-col items-center gap-5">
          <h1 className="font-tight text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white [text-shadow:0px_8px_30px_rgba(255,255,255,0.25),0px_4px_8px_rgba(255,255,255,0.05)]">
            Plan and navigate from idea to launch.
          </h1>
          <p className="max-w-[640px] font-tight text-[clamp(1rem,1.4vw,1.25rem)] font-medium leading-[1.5] text-[#9297a0]">
            Create a clear roadmap, track progress, and smoothly guide your
            project from idea to successful launch.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5">
        <a
          href="#"
          className="rounded-[12px] bg-white px-[30px] py-4 font-tight text-[18px] font-semibold leading-none text-[#060607] transition-opacity duration-200 hover:opacity-90"
        >
          Get Started For Free
        </a>
        <div className="flex items-center gap-1.5">
          <span className="relative h-[22px] w-[22px]">
            <Image
              alt=""
              src="/section-1/container/info-icon.png"
              fill
              sizes="22px"
              className="object-contain"
            />
          </span>
          <span className="font-tight text-[15px] font-medium leading-[1.5] text-[#9297a0]">
            No credit card required
          </span>
        </div>
      </div>
    </div>
  );
};
