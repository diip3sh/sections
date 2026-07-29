"use client";

import Image from "next/image";

const NAV_LINKS = [
  { label: "Benefits", href: "#benefits" },
  { label: "Features", href: "#features" },
  { label: "How To Use", href: "#how-to-use" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Waitlist", href: "#waitlist" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "/section-10/linkedin.svg",
  },
  {
    label: "X",
    href: "https://x.com",
    icon: "/section-10/twitter.svg",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: "/section-10/instagram.svg",
  },
] as const;

const STORE_BUTTONS = [
  {
    href: "https://play.google.com",
    icon: "/section-10/google-play.svg",
    eyebrow: "Get It On",
    label: "Google Play",
    ariaLabel: "Get it on Google Play",
  },
  {
    href: "https://apps.apple.com",
    icon: "/section-10/app-store.svg",
    eyebrow: "Download on",
    label: "App Store",
    ariaLabel: "Download on the App Store",
  },
] as const;

const DotGrid = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute top-[clamp(-18rem,-38vw,-10rem)] left-1/2 z-0 h-[clamp(20rem,55vw,36.5rem)] w-[min(997px,200%)] -translate-x-1/2 opacity-60"
  >
    <div
      className="size-full scale-y-[-1]"
      style={{
        backgroundImage:
          "radial-gradient(circle, #c8ced8 1.4px, transparent 1.5px)",
        backgroundSize: "9.02px 9.02px",
        maskImage:
          "radial-gradient(ellipse 68% 88% at 50% 100%, black 8%, transparent 70%), linear-gradient(to bottom, transparent 0%, black 18%, black 74%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 68% 88% at 50% 100%, black 8%, transparent 70%), linear-gradient(to bottom, transparent 0%, black 18%, black 74%, transparent 100%)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    />
  </div>
);

type PhoneMockupProps = {
  screen: string;
  screenWidth: number;
  screenHeight: number;
  className?: string;
};

/**
 * Upright Mobile.svg frame with screen clipped to the Figma placeholder.
 * Screen rotates with the frame — do not counter-rotate the image.
 */
const PhoneMockup = ({
  screen,
  screenWidth,
  screenHeight,
  className = "",
}: PhoneMockupProps) => (
  <div className={`relative overflow-clip ${className}`}>
    {/* Screen behind frame — shows through Mobile.svg hole */}
    <div
      aria-hidden="true"
      className="absolute inset-[1.4%_4.2%_1.4%_4.2%] overflow-hidden bg-white"
    >
      <Image
        src={screen}
        alt=""
        width={screenWidth}
        height={screenHeight}
        priority
        className="size-full object-cover object-top"
      />
    </div>

    {/* Frame + Dynamic Island on top */}
    <Image
      src="/section-10/Mobile.svg"
      alt=""
      aria-hidden="true"
      width={235}
      height={476}
      priority
      className="pointer-events-none absolute inset-0 z-10 size-full object-fill"
    />
  </div>
);

const PhonesHero = () => (
  <div className="pointer-events-none absolute top-0 left-1/2 z-10 -translate-x-1/2 overflow-hidden">
    <div className="relative h-[528.892px] w-[506.68px] origin-bottom scale-[0.58] android-sm:scale-[0.72] iphone:scale-[0.85] ipad:scale-100">
      {/* Dot grid behind phones */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, #c8ced8 1.4px, transparent 1.5px)",
          backgroundSize: "9.02px 9.02px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%), linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%), linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Left phone — flip-in after center */}
      <div className="absolute bottom-0 left-[calc(50%-102.85px)] z-[1] flex h-[451.104px] w-[300.972px] -translate-x-1/2 items-center justify-center [perspective:900px]">
        <div className="origin-bottom animate-phone-flip-in-x will-change-transform motion-reduce:animate-none [transform-style:preserve-3d] [animation-delay:280ms]">
          <div className="flex-none rotate-[-14.52deg]">
            <PhoneMockup
              screen="/section-10/Vector2.png"
              screenWidth={362}
              screenHeight={788}
              className="h-[413.181px] w-[203.908px]"
            />
          </div>
        </div>
      </div>

      {/* Right phone — flip-in after center */}
      <div className="absolute bottom-0 left-[calc(50%+102.84px)] z-[1] flex h-[451.108px] w-[300.987px] -translate-x-1/2 items-center justify-center [perspective:900px]">
        <div className="origin-bottom animate-phone-flip-in-x will-change-transform motion-reduce:animate-none [transform-style:preserve-3d] [animation-delay:360ms]">
          <div className="flex-none rotate-[14.52deg]">
            <PhoneMockup
              screen="/section-10/Vector3.png"
              screenWidth={362}
              screenHeight={788}
              className="h-[413.181px] w-[203.908px]"
            />
          </div>
        </div>
      </div>

      {/* Center phone — slide up first */}
      <div className="absolute bottom-[21.82px] left-1/2 z-10 -translate-x-1/2 animate-phone-slide-up will-change-transform motion-reduce:animate-none [animation-delay:0ms]">
        <PhoneMockup
          screen="/section-10/Vector.png"
          screenWidth={417}
          screenHeight={906}
          className="h-[475.386px] w-[234.606px]"
        />
      </div>

      {/* Soft white bottom fade — dissolves phones into the page (no hard edge) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[55%] bg-linear-to-t from-white from-[20%] via-white/70 via-[55%] to-transparent to-[100%] ipad:h-[65%] ipad:from-[12%] ipad:via-[42%]"
      />
    </div>
  </div>
);

const StoreButton = ({
  href,
  icon,
  eyebrow,
  label,
  ariaLabel,
}: (typeof STORE_BUTTONS)[number]) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="inline-flex w-[195px] h-[65px] xl:h-[68px] xl:w-[192px] py-3 touch-manipulation items-center justify-center gap-2.5 rounded-full border border-solid border-[#dee5ed] bg-[#f5f7fa] px-6 transition-[background-color,border-color] duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333] motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#c9d3e0] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#eef2f7]"
  >
    <span className="relative size-8 shrink-0 overflow-clip">
      <Image
        src={icon}
        alt=""
        width={32}
        height={32}
        className="size-full"
        aria-hidden="true"
      />
    </span>
    <span className="flex flex-col items-start justify-center font-medium leading-[1.5]">
      <span className="text-[13px] text-[#262626]">{eyebrow}</span>
      <span className="whitespace-nowrap text-[16px] xl:text-[18px] text-[#333]">
        {label}
      </span>
    </span>
  </a>
);

const Footer = () => (
  <footer className="flex w-full flex-col gap-12.5">
    <div className="flex items-center gap-4.5 iphone:gap-7.5">
      <div aria-hidden="true" className="h-px min-w-0 flex-1 bg-[#dee5ed]" />
      <a
        href="mailto:hello@capable.com"
        className="inline-flex min-h-12 shrink-0 touch-manipulation items-center gap-1 rounded-full border border-solid border-[#dee5ed] bg-[#f5f7fa] px-4 py-3 transition-[background-color,border-color] duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333] [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#c9d3e0] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#eef2f7]"
      >
        <span className="relative size-6 shrink-0 overflow-clip">
          <Image
            src="/section-10/email.svg"
            alt=""
            width={24}
            height={24}
            className="size-full"
            aria-hidden="true"
          />
        </span>
        <span className="text-base xl:text-[18px] font-medium leading-normal whitespace-nowrap text-[#262626]">
          hello@capable.com
        </span>
      </a>
      <div aria-hidden="true" className="h-px min-w-0 flex-1 bg-[#dee5ed]" />
    </div>

    <div className="flex flex-col gap-12.5">
      <nav
        aria-label="Footer"
        className="flex flex-wrap items-center justify-center gap-3 iphone:gap-4.5"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="group relative inline-flex min-h-[52px] xl:min-h-[55px] touch-manipulation items-center justify-center overflow-clip rounded-full border border-solid border-[#dee5ed] bg-[#f5f7fa] px-5 py-3.5 text-base font-medium leading-normal whitespace-nowrap text-[#333] transition-[background-color,border-color] duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333] motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#c9d3e0] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#eef2f7]"
          >
            <span className="translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-[150%] xl:text-[18px]">
              {link.label}
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center translate-y-[150%] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-0 xl:text-[18px]"
            >
              {link.label}
            </span>
          </a>
        ))}
      </nav>

      <div className="relative flex flex-col items-center gap-6 border-t border-solid border-[#dee5ed] px-4 py-6 ipad:flex-row ipad:justify-between ipad:gap-0 ipad:px-7.5 ipad:py-7.5">
        <p className="order-2 text-base xl:text-[18px] font-medium leading-normal text-[#262626] ipad:order-1">
          Template by Origin
        </p>

        <div className="order-1 flex items-center justify-center gap-2.5 ipad:absolute ipad:top-1/2 ipad:left-1/2 ipad:order-0 ipad:-translate-x-1/2 ipad:-translate-y-1/2">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="inline-flex size-11 touch-manipulation items-center justify-center rounded-full bg-[#262626] p-2.5 transition-[background-color,transform] duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#262626] motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#3a3a3a]"
            >
              <span className="relative size-6 overflow-clip">
                <Image
                  src={social.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="size-full"
                  aria-hidden="true"
                />
              </span>
            </a>
          ))}
        </div>

        <a
          href="#privacy"
          className="order-3 text-base xl:text-[18px] font-medium leading-normal text-[#262626] transition-colors duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#262626] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#333]"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  </footer>
);

const Section10 = () => {
  return (
    <section
      aria-label="Download Capable"
      className="relative w-full overflow-hidden bg-white text-[#0d0d0d]"
    >
      <a
        href="#download"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[#262626] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 pt-[clamp(5rem,14vw,16.25rem)] pb-10 android-sm:px-8 ipad:px-[119px] ipad:pb-16">
        <div
          id="download"
          className="flex w-full max-w-[1201px] scroll-mt-8 flex-col items-center gap-[clamp(3.5rem,8vw,6.25rem)]"
        >
          <div className="relative flex w-full max-w-[795px] flex-col items-center gap-10 pt-[clamp(20.5rem,52vw,23.75rem)] android-sm:pt-[clamp(24.5rem,56vw,27rem)] iphone:pt-[clamp(29rem,60vw,32rem)] ipad:pt-[23.75rem]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1013.7 586.55' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(5.2218e-7 -58.655 68.122 6.0647e-7 507.62 586.55)'><stop stop-color='rgba(255,255,255,0)' offset='0.085153'/><stop stop-color='rgba(255,255,255,1)' offset='1'/></radialGradient></defs></svg>\")",
              }}
            />
            <PhonesHero />

            <div className="relative z-20 flex w-full animate-hero-reveal flex-col items-center gap-5 px-0 pt-2 text-center motion-reduce:animate-none android-sm:pt-4 iphone:pt-6 ipad:px-12.5 ipad:pt-0 [animation-delay:80ms]">
              <h1 className="font-urbanist text-[30px] lg:text-[45px] xl:text-[58px] lg:mt-20 font-bold leading-[1.2] text-[#0d0d0d] text-pretty">
                Download Capable and Connect Today
              </h1>
              <p className="w-full lg:max-w-[650px] mx-auto text-base xl:text-[18px] font-medium leading-normal text-[#666] text-pretty bg-white">
                Download Capable now to start connecting with like-minded people
                and enjoy a seamless social experience!
              </p>
            </div>

            <div className="relative z-20 flex w-full animate-hero-reveal flex-col items-center justify-center gap-4 motion-reduce:animate-none iphone:items-center iphone:gap-5 lg:flex-row lg:gap-5 [animation-delay:160ms]">
              {STORE_BUTTONS.map((button) => (
                <StoreButton key={button.label} {...button} />
              ))}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </section>
  );
};

export default Section10;
