import Image from "next/image";

export const HeroBackground = () => {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#090a0b]" />

      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 42% 48% at 50% 52%, black 0%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 42% 48% at 50% 52%, black 0%, transparent 72%)",
        }}
      />

      <div
        className="absolute left-1/2 top-[38%] size-[min(52vw,698px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)]"
      />

      <div className="absolute -left-[12%] -top-[18%] h-[58%] w-[42%] rotate-[49.87deg] bg-gradient-to-b from-white/20 to-transparent opacity-60 blur-[88px]" />
      <div className="absolute -right-[12%] -top-[18%] h-[58%] w-[42%] -rotate-[49.87deg] bg-gradient-to-b from-white/20 to-transparent opacity-60 blur-[88px]" />

      <div className="absolute left-[18%] top-0 h-[48%] w-[28%] opacity-70 mix-blend-plus-lighter">
        <Image
          alt=""
          className="size-full object-cover object-top"
          fill
          priority
          sizes="28vw"
          src="/section-1/light-particles.png"
        />
      </div>

      <div className="absolute right-[18%] top-0 h-[48%] w-[28%] scale-x-[-1] opacity-70 mix-blend-plus-lighter">
        <Image
          alt=""
          className="size-full object-cover object-top"
          fill
          priority
          sizes="28vw"
          src="/section-1/light-particles.png"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 35%, rgba(9,10,11,0.55) 72%, #090a0b 100%)",
        }}
      />
    </div>
  );
};
