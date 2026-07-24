import type { Metadata } from "next";
import Image from "next/image";

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
    className: "h-3 w-[128px]",
  },
  {
    src: "/section-5/logo-2.svg",
    alt: "Logoipsum",
    width: 95,
    height: 22,
    className: "h-[22px] w-[95px]",
  },
  {
    src: "/section-5/logo-3.svg",
    alt: "Logoipsum",
    width: 108,
    height: 21,
    className: "h-[21px] w-[108px]",
  },
  {
    src: "/section-5/logo-4.svg",
    alt: "Logoipsum",
    width: 78,
    height: 18,
    className: "h-[18px] w-[78px]",
  },
] as const;

const SafariToolbar = () => {
  return (
    <div className="relative flex h-8.5 shrink-0 items-center rounded-t-[10px] bg-white shadow-[0_0.3px_0_rgba(0,0,0,0.15)]">
      <div className="absolute left-3.5 flex items-center gap-1.5">
        <Image
          alt=""
          aria-hidden="true"
          src="/section-5/traffic-close.svg"
          width={8}
          height={8}
          className="size-2"
        />
        <Image
          alt=""
          aria-hidden="true"
          src="/section-5/traffic-min.svg"
          width={8}
          height={8}
          className="size-2"
        />
        <Image
          alt=""
          aria-hidden="true"
          src="/section-5/traffic-full.svg"
          width={8}
          height={8}
          className="size-2"
        />
      </div>

      <div className="mx-auto flex h-4.5 w-[min(46%,280px)] items-center justify-center gap-1 rounded-md bg-black/5 px-2">
        <Image
          alt=""
          aria-hidden="true"
          src="/section-5/lock.svg"
          width={5}
          height={7}
          className="h-[7px] w-[5px]"
        />
        <span className="text-[10px] leading-none tracking-[-0.02em] text-[#4c4c4c]">
          figma.com
        </span>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-black/5"
      />
    </div>
  );
};

const Section5 = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#010110]">
      <section
        aria-labelledby="onchat-hero-heading"
        className="relative mx-auto w-full max-w-[1440px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 top-2.5 h-[min(756px,78vw)] overflow-hidden rounded-[10px] border border-white"
        >
          <Image
            alt=""
            src="/section-5/mesh-gradient.png"
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 1416px"
            className="object-cover object-center"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center px-4 pt-6 sm:px-6 sm:pt-10">
          <header className="flex w-full max-w-[602px] items-center justify-between gap-3 rounded-full border border-white bg-white px-3 py-2 shadow-[0_0_0.5px_rgba(0,0,0,0.5)]">
            <a
              href="#main"
              className="flex shrink-0 items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#010110]"
              aria-label="OnChat home"
            >
              <Image
                alt=""
                aria-hidden="true"
                src="/section-5/logo-mark.svg"
                width={24}
                height={24}
                className="size-6"
              />
              <span className="font-geist text-[clamp(1.125rem,3vw,1.35rem)] font-medium leading-none text-black">
                OnChat
              </span>
            </a>

            <nav
              aria-label="Primary"
              className="flex items-center gap-3 sm:gap-6"
            >
              <a
                href="#login"
                className="text-[15px] font-medium leading-none text-[#363636] transition-colors duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#010110] [@media(hover:hover)_and_(pointer:fine)]:hover:text-black"
              >
                Login
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center justify-center rounded-[41px] border border-[#57565f] px-4 py-3 text-[15px] font-medium leading-[19.6px] text-white shadow-[0_4px_7.7px_rgba(0,0,0,0.05),0_10px_24px_rgba(0,0,0,0.05),0_24px_40.8px_rgba(0,0,0,0.15),0_25px_18.7px_rgba(0,0,0,0.05),0_52px_41.4px_rgba(0,0,0,0.05)] transition-opacity duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#010110] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90 sm:px-5"
                style={{
                  backgroundImage:
                    "linear-gradient(123deg, #1f1f21 0%, #3e3d4c 34%, #1f1f21 51%, #3e3d4c 72%, #1f1f21 100%)",
                }}
              >
                Contact Us
              </a>
            </nav>
          </header>

          <div
            id="main"
            className="mt-14 flex w-full max-w-[651px] scroll-mt-24 flex-col items-center gap-10 text-center sm:mt-20"
          >
            <div className="flex w-full flex-col items-center gap-3.5">
              <h1
                id="onchat-hero-heading"
                className="text-[clamp(2rem,6vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-balance text-[#010110] [text-shadow:0_5px_5px_rgba(0,0,0,0.05),0_1px_1px_rgba(0,0,0,0.16),0_1px_1px_rgba(255,255,255,0.6)]"
              >
                Task Management Made
                <br />
                Simple and Powerful
              </h1>
              <p className="max-w-[475px] text-[clamp(0.9375rem,2vw,1rem)] font-medium leading-normal tracking-[-0.02em] text-[#45545e]">
                We optimize for the single statistic that matters: Amount of
                real-world tasks a model can solve
              </p>
            </div>

            <div className="relative flex flex-wrap items-center justify-center gap-4 sm:gap-5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-10 -left-4 hidden w-[200px] select-none desktop-sm:top-14 desktop-sm:-left-52 desktop-sm:block"
              >
                <p className="font-tillana -rotate-[10.6deg] text-center text-lg leading-[1.25] tracking-[-0.02em] text-[#144a58]">
                  Tried hold
                  <br />
                  free for 7 days
                </p>
                <Image
                  alt=""
                  src="/section-5/annotation-arrow.svg"
                  width={27}
                  height={78}
                  className="absolute top-0 -right-6 h-9 w-20 rotate-[83.54deg]"
                />
              </div>

              <a
                href="#trial"
                className="inline-flex min-h-11 items-center justify-center rounded-full border-[3px] border-white bg-linear-to-b from-[#292929] to-[#111] px-5 py-3.5 text-base font-medium leading-[1.1] tracking-[-0.01em] text-white shadow-[0_0_0.225px_0.225px_rgba(0,0,0,0.07),0_0_0.225px_0.675px_rgba(0,0,0,0.05),0_2.7px_2.9px_-1.35px_rgba(0,0,0,0.25),0_0.9px_3.6px_0.9px_rgba(0,0,0,0.12)] transition-opacity duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#010110] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90"
              >
                Start your free trial
              </a>
              <a
                href="#demo"
                className="inline-flex min-h-11 items-center justify-center rounded-full border-[3px] border-white bg-linear-to-b from-[#f4f4f4] to-[#fefefe] px-5 py-3.5 text-base font-medium leading-[1.1] tracking-[-0.01em] text-[#161616] shadow-[0_0_0.225px_rgba(0,0,0,0.07),0_2.7px_2.9px_rgba(0,0,0,0.25),0_0.9px_3.6px_rgba(0,0,0,0.12)] transition-colors duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#010110] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#eee]"
              >
                Book a demo
              </a>
            </div>
          </div>

          <div className="relative mt-10 w-full max-w-[841px] sm:mt-14">
            <div className="relative overflow-hidden rounded-t-[18px] rounded-b-sm p-2 shadow-[0_0_6px_1px_rgba(0,0,0,0.05),0_0_200px_rgba(0,0,0,0.08),0_15px_20px_-17px_rgba(0,0,0,0.13),0_7px_14px_-10px_rgba(0,0,0,0.08)]">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-t-[18px] rounded-b-sm bg-white/40 backdrop-blur-[5px]"
              />

              <div className="relative overflow-hidden rounded-t-[10px] rounded-b-[10px] bg-white">
                <SafariToolbar />

                <div className="relative h-[min(280px,48vw)] overflow-hidden sm:h-[296px]">
                  <Image
                    alt="Mirror Pro dashboard preview showing tasks, metrics, and team collaboration"
                    src="/section-5/browser-mockup.png"
                    width={1241}
                    height={683}
                    priority
                    className="h-auto w-full object-cover object-top"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-b from-transparent to-white"
                  />
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 top-[48%] z-20 flex justify-center">
              <button
                type="button"
                aria-label="Play product demo"
                className="flex size-14 cursor-pointer items-center justify-center rounded-full border border-[#bfbfbf] bg-linear-to-b from-[#eaeaea] to-white p-2.5 shadow-[inset_0_6px_13px_rgba(0,0,0,0.1)] transition-transform duration-200 ease-[cubic-bezier(.215,.61,.355,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#010110] motion-reduce:transition-none sm:size-[72px] [@media(hover:hover)_and_(pointer:fine)]:hover:scale-105 [@media(hover:hover)_and_(pointer:fine)]:motion-reduce:hover:scale-100"
              >
                <span className="flex size-full items-center justify-center rounded-full bg-white shadow-[0_1px_0.5px_rgba(0,0,0,0.15),0_3px_1.5px_rgba(0,0,0,0.03),0_5px_2.5px_rgba(0,0,0,0.05),inset_0_-5px_9px_rgba(0,0,0,0.05),inset_0_-1px_3px_rgba(0,0,0,0.25)]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    src="/section-5/play.svg"
                    width={32}
                    height={32}
                    className="size-6 sm:size-8"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-10 -mt-4 flex flex-col items-center bg-white px-4 pt-14 pb-16 sm:px-6 sm:pt-18 sm:pb-20">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="hidden h-px w-16 bg-[#d0d0d0] sm:block sm:w-25"
              />
              <p className="text-center text-base font-medium tracking-[-0.0125em] text-black/70">
                More than 100+ companies trusted us
              </p>
              <span
                aria-hidden="true"
                className="hidden h-px w-16 bg-[#d0d0d0] sm:block sm:w-25"
              />
            </div>

            <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              {TRUSTED_LOGOS.map((logo) => (
                <li key={logo.src} className="opacity-80">
                  <Image
                    alt={logo.alt}
                    src={logo.src}
                    width={logo.width}
                    height={logo.height}
                    className={logo.className}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Section5;
