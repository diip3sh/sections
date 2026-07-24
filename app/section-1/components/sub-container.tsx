import Image from "next/image";

type Logo = {
  icon: string;
  text: string;
  textB?: string;
};

const LOGOS: Logo[] = [
  { icon: "/section-1/logos/icon-1.png", text: "/section-1/logos/text-1.png" },
  { icon: "/section-1/logos/icon-2.png", text: "/section-1/logos/text-2.png" },
  { icon: "/section-1/logos/icon-3.png", text: "/section-1/logos/text-3.png" },
  { icon: "/section-1/logos/icon-4.png", text: "/section-1/logos/text-4.png" },
  {
    icon: "/section-1/logos/icon-5.png",
    text: "/section-1/logos/text-5.png",
    textB: "/section-1/logos/text-5b.png",
  },
  { icon: "/section-1/logos/icon-6.png", text: "/section-1/logos/text-6.png" },
  { icon: "/section-1/logos/icon-7.png", text: "/section-1/logos/text-7.png" },
  { icon: "/section-1/logos/icon-8.png", text: "/section-1/logos/text-8.png" },
  { icon: "/section-1/logos/icon-9.png", text: "/section-1/logos/text-9.png" },
  { icon: "/section-1/logos/icon-10.png", text: "/section-1/logos/text-10.png" },
  { icon: "/section-1/logos/icon-11.png", text: "/section-1/logos/text-11.png" },
  { icon: "/section-1/logos/icon-12.png", text: "/section-1/logos/text-12.png" },
  { icon: "/section-1/logos/icon-13.png", text: "/section-1/logos/text-13.png" },
  { icon: "/section-1/logos/icon-14.png", text: "/section-1/logos/text-14.png" },
];

export const SubContainer = () => {
  return (
    <div className="flex w-full flex-col items-center gap-[30px]">
      <p className="font-tight text-[clamp(0.875rem,1.2vw,1.125rem)] font-medium leading-[1.5] text-[#9297a0]">
        Trusted by 50,000+ businesses for innovative design and growth.
      </p>

      <div
        className="flex w-full items-center justify-center gap-5 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        {LOGOS.map((logo, index) => (
          <div key={index} className="flex items-center gap-5">
            {index > 0 && (
              <span
                aria-hidden="true"
                className="h-6 w-px shrink-0 bg-white/15"
              />
            )}
            <div className="flex shrink-0 items-center gap-2 opacity-70">
              <span className="relative h-6 w-6">
                <Image
                  alt=""
                  src={logo.icon}
                  fill
                  sizes="24px"
                  className="object-contain"
                />
              </span>
              <span className="relative flex flex-col">
                <span className="relative h-4 w-[68px]">
                  <Image
                    alt=""
                    src={logo.text}
                    fill
                    sizes="68px"
                    className="object-contain object-left"
                  />
                </span>
                {logo.textB && (
                  <span className="relative mt-0.5 h-2 w-[68px]">
                    <Image
                      alt=""
                      src={logo.textB}
                      fill
                      sizes="68px"
                      className="object-contain object-left"
                    />
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
