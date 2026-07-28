import type { Metadata } from "next";
import Image from "next/image";
import SpotlightReveal from "./components/spotlight-reveal";
import TrustedBy from "./components/trusted-by";

export const metadata: Metadata = {
  title: "OnChat — Task Management Made Simple and Powerful",
  description:
    "We optimize for the single statistic that matters: Amount of real-world tasks a model can solve.",
};

const TRUSTED_LOGOS = [
  {
    src: "/section-5/logo-1.svg",
    alt: "Logoipsum",
    width: 128,
    height: 12,
    className: "h-2.5 w-auto sm:h-3",
  },
  {
    src: "/section-5/logo-2.svg",
    alt: "Logoipsum",
    width: 95,
    height: 22,
    className: "h-4.5 w-auto sm:h-5.5",
  },
  {
    src: "/section-5/logo-3.svg",
    alt: "Logoipsum",
    width: 108,
    height: 21,
    className: "h-4 w-auto sm:h-5",
  },
  {
    src: "/section-5/logo-4.svg",
    alt: "Logoipsum",
    width: 78,
    height: 18,
    className: "h-3.5 w-auto sm:h-4.5",
  },
] as const;

const Annotation = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-[-26px] -left-[165px] hidden h-[140px] w-[253px] select-none desktop-sm:block"
    >
      <div className="absolute top-[23px] left-[73px] flex h-[36px] w-[80px] items-center justify-center">
        <div className="-scale-y-100 rotate-[83.54deg]">
          <Image
            alt=""
            src="/section-5/annotation-arrow.svg"
            width={27}
            height={78}
            className="h-[78px] w-[27px] max-w-none"
          />
        </div>
      </div>

      <p className="absolute bottom-10 -left-20 flex w-[212px] rotate-[-10.6deg] flex-col justify-center text-center font-tillana text-[18px] leading-[1.25] tracking-[-0.02em] text-[#144a58]">
        <span>Tried hold</span>
        <span>free for 7 days</span>
      </p>
    </div>
  );
};

const MenuIcon = () => {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-4.5"
    >
      <path
        d="M2.25 4.5h13.5M2.25 9h13.5M2.25 13.5h13.5"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
};

const BrowserPreview = () => {
  return (
    <div className="relative mx-auto mt-4 w-full min-w-0 max-w-[56rem] translate-y-14 self-center rounded-[14px] bg-[#f4f0e8] p-[8.5px] shadow-[0_0_6px_1px_rgba(0,0,0,0.05),0_0_200px_rgba(0,0,0,0.08),0_15px_20px_-17px_rgba(0,0,0,0.13),0_7px_14px_-10px_rgba(0,0,0,0.08)] ipad:mt-6 ipad:rounded-[18px] laptop:mt-8">
      <div className="relative overflow-hidden rounded-[7px] ipad:rounded-[11px]">
        <Image
          alt="Mirror Pro dashboard preview showing welcome banner and task metrics"
          src="/section-5/product.png"
          width={1424}
          height={504}
          priority
          className="m-0 mx-auto block h-auto w-full p-0"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)] ipad:size-14">
            <Image
              alt=""
              src="/section-5/play.svg"
              width={28}
              height={28}
              className="ml-0.5 size-6 ipad:size-7"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Section5 = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-3 pt-2.5 text-[#010110]">
      <section
        aria-labelledby="onchat-hero-heading"
        className="relative mx-auto w-full overflow-hidden rounded-[18px] bg-[url(/section-5/mesh-gradient.png)] bg-cover bg-center pb-10 desktop-sm:min-h-[50rem]"
      >
        <div className="relative z-10 flex w-full flex-col items-center px-1 pt-2 iphone:px-2 ipad:px-3 ipad:pt-2.5">
          <header className="animate-hero-reveal flex w-full max-w-150.5 items-center justify-between gap-2 rounded-full border border-white bg-white px-2.5 py-1.5 shadow-[0_0_0.5px_rgba(0,0,0,0.5)] [animation-delay:0ms] ipad:gap-3 ipad:px-3 ipad:py-2">
            <a
              href="#main"
              className="flex shrink-0 items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#010110] ipad:gap-1.5"
              aria-label="OnChat home"
            >
              <Image
                alt=""
                aria-hidden="true"
                src="/section-5/logo-mark.svg"
                width={24}
                height={24}
                className="size-5 ipad:size-6"
              />
              <span className="font-geist text-[1.125rem] font-medium leading-none text-black ipad:text-[1.35rem]">
                OnChat
              </span>
            </a>

            <nav
              aria-label="Primary"
              className="flex items-center gap-3 ipad:gap-6"
            >
              <a
                href="#login"
                className="text-sm font-medium leading-none text-[#363636] transition-colors duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#010110] ipad:text-[15px] [@media(hover:hover)_and_(pointer:fine)]:hover:text-black"
              >
                Login
              </a>

              <a
                href="#contact"
                className="relative hidden min-h-11 items-center justify-center overflow-clip rounded-[41px] border border-solid border-[#57565f] px-5 py-3 text-center text-[15px] font-medium leading-[19.6px] text-white transition-[opacity,transform] duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#010110] active:scale-[0.96] motion-reduce:active:scale-100 ipad:inline-flex [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90"
                style={{
                  boxShadow:
                    "0 4px 7.7px rgba(0,0,0,0.05), 0 10px 24px rgba(0,0,0,0.05), 0 24px 40.8px rgba(0,0,0,0.15), 0 25px 18.7px rgba(0,0,0,0.05), 0 52px 41.4px rgba(0,0,0,0.05)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[41px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #000002, #000002), radial-gradient(ellipse 170px 258px at 50% -198px, rgba(237,239,255,0.71) 0%, rgba(237,239,255,0) 100%), linear-gradient(123.39deg, #1f1f21 0%, #3e3d4c 34%, #1f1f21 51%, #3e3d4c 72%, #1f1f21 100%)",
                  }}
                />
                <span className="relative">Contact Us</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[41px] shadow-[inset_0_5px_8px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.25)]"
                />
              </a>

              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#111] text-white shadow-[0_4px_12px_rgba(0,0,0,0.18)] transition-[opacity,transform] duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#010110] active:scale-[0.96] motion-reduce:active:scale-100 ipad:hidden [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90"
              >
                <MenuIcon />
              </button>
            </nav>
          </header>

          <div
            id="main"
            className="mt-10 flex w-full max-w-162.75 scroll-mt-24 flex-col items-center gap-7 text-center iphone:mt-12 ipad:mt-16 ipad:gap-10 laptop:mt-20"
          >
            <div className="flex w-full flex-col items-center gap-3 ipad:gap-3.5">
              <SpotlightReveal
                id="onchat-hero-heading"
                text="Task Management Made Simple and Powerful"
                blur={6}
                delay={0.1}
                className="max-w-20ch text-[clamp(26px,6.5vw,56px)] font-medium leading-[1.15] tracking-[-0.02em] text-balance text-[#010110] [text-shadow:0_5px_5px_rgba(0,0,0,0.05),0_1px_1px_rgba(0,0,0,0.16),0_1px_1px_rgba(255,255,255,0.6)] ipad:leading-[1.1]"
              />
              <p className="animate-hero-reveal max-w-118.75 px-1 text-[clamp(15px,2.5vw,16px)] font-medium leading-normal tracking-[-0.02em] text-pretty text-[#45545e] [animation-delay:200ms] ipad:px-0">
                We optimize for the single statistic that matters: Amount of
                real-world tasks a model can solve
              </p>
            </div>

            <div className="animate-hero-reveal relative flex w-full max-w-80 flex-col items-stretch gap-3 [animation-delay:300ms] ipad:max-w-none ipad:w-auto ipad:flex-row ipad:items-center ipad:justify-center ipad:gap-5">
              <Annotation />
              <a
                href="#trial"
                className="relative inline-flex min-h-11.5 w-full shrink-0 items-center justify-center overflow-clip rounded-full border-3 border-solid border-[#3E3E3E] bg-linear-to-b from-[#292929] to-[#111] py-3.5 pr-5 pl-[19px] text-center text-[clamp(15px,2.5vw,16px)] font-medium leading-[1.1] tracking-[-0.01em] text-white transition-[opacity,transform] duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#010110] active:scale-[0.96] motion-reduce:active:scale-100 ipad:w-auto [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90"
              >
                Start your free trial
              </a>
              <a
                href="#demo"
                className="relative inline-flex min-h-11.5 w-full shrink-0 items-center justify-center rounded-full border-3 border-solid border-white bg-linear-to-b from-[#f4f4f4] to-[#fefefe] py-3.5 pr-5 pl-[19px] text-center text-[clamp(15px,2.5vw,16px)] font-medium leading-[1.1] tracking-[-0.01em] text-[#161616] transition-[opacity,transform] duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#010110] active:scale-[0.96] motion-reduce:active:scale-100 ipad:w-auto [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90 shadow-[0_0_0.225px_rgba(0,0,0,0.07),0_0_0.225px_rgba(0,0,0,0.05),0_2.698px_2.923px_-1.349px_rgba(0,0,0,0.25),0_0.899px_3.598px_0.899px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_1px_rgba(0,0,0,0.06)]"
              >
                Book a demo
              </a>
            </div>
          </div>

          <BrowserPreview />
        </div>
      </section>
      <div className="relative z-10 -mt-6 flex flex-col items-center px-4 pt-10 pb-12 ipad:-mt-8 ipad:px-6 ipad:pt-14 ipad:pb-16 laptop:pt-16 laptop:pb-20">
        <TrustedBy logos={TRUSTED_LOGOS} />
      </div>
    </main>
  );
};

export default Section5;
