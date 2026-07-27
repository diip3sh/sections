"use client";

import Image from "next/image";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { useState, type FormEvent } from "react";

const easeOutQuint = [0.23, 1, 0.32, 1] as const;

const useWaitlistReveal = (delay: number) => {
  const prefersReducedMotion = useReducedMotion();

  return {
    initial: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 24, filter: "blur(4px)" },
    animate: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: {
      type: "tween" as const,
      duration: prefersReducedMotion ? 0.2 : 0.5,
      delay: prefersReducedMotion ? 0 : delay,
      ease: easeOutQuint,
    },
  };
};

type WaitlistRevealProps = HTMLMotionProps<"div"> & {
  delay: number;
};

const WaitlistReveal = ({
  delay,
  children,
  ...props
}: WaitlistRevealProps) => {
  const reveal = useWaitlistReveal(delay);

  return (
    <motion.div {...reveal} {...props}>
      {children}
    </motion.div>
  );
};

const NAV_LINKS = [
  { label: "Partners", href: "#partners" },
  { label: "Benefits", href: "#benefits" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Team", href: "#team" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "/section-9/icon-linkedin.svg",
  },
  {
    label: "X",
    href: "https://x.com",
    icon: "/section-9/icon-x.svg",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: "/section-9/icon-instagram.svg",
  },
] as const;

const Navbar = () => {
  return (
    <nav
      aria-label="Primary"
      className="relative flex items-center gap-0 rounded-full bg-white py-1.5 pr-1.5 pl-1.5 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0_rgba(0,0,0,0.04)] ipad-landscape:gap-4 ipad-landscape:pl-6 ipad-landscape:pr-6"
    >
      <a
        href="#top"
        className="relative flex size-12.5 shrink-0 items-center justify-center overflow-clip rounded-full transition-transform duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b47eb] active:scale-[0.96] motion-reduce:active:scale-100"
        aria-label="Replex home"
      >
        <span className="relative size-[26px]">
          <Image
            src="/section-9/logo-purple.svg"
            alt=""
            width={44}
            height={27}
            className="size-full object-contain"
            aria-hidden="true"
          />
        </span>
      </a>

      <div className="flex items-center gap-1 ipad-landscape:gap-4">
        <a
          href="#top"
          className="inline-flex min-h-11 touch-manipulation items-center gap-1 overflow-clip rounded-full bg-[#8b47eb] py-3.5 pr-3.5 pl-4 text-[17px] font-bold leading-none whitespace-nowrap text-white transition-[opacity,transform] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b47eb] active:scale-[0.96] motion-reduce:active:scale-100 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90"
        >
          Home
          <Image
            src="/section-9/icon-down.svg"
            alt=""
            width={20}
            height={20}
            className="size-5 shrink-0 rotate-180"
            aria-hidden="true"
          />
        </a>

        <ul
          className="hidden items-center gap-1 ipad-landscape:flex ipad-landscape:gap-3"
          aria-label="Navigation links"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center px-2.5 text-[17px] font-medium leading-none whitespace-nowrap text-[#5b5e71] transition-colors duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b47eb] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#2b106a]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

const BrandMark = () => (
  <div className="relative flex shrink-0 items-start gap-2.5 rounded-full border border-solid border-[#8b47eb] p-1.5">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[-6.5px] left-1/2 h-[254px] w-[219px] -translate-x-1/2"
    >
      <Image
        src="/section-9/logo-glow.svg"
        alt=""
        width={219}
        height={255}
        className="size-full max-w-none"
      />
    </div>
    <div className="relative overflow-clip rounded-full border-t-[1.5px] border-solid border-[#c7bbf6] bg-linear-to-b from-[#a875f0] to-[#8b47eb] p-3 shadow-[0_-1px_0_0_#ab7af0]">
      <div className="relative size-12.5 overflow-clip ipad:size-15">
        <span className="absolute inset-[23.33%_5.83%_23.33%_7.5%]">
          <Image
            src="/section-9/logo-white.svg"
            alt=""
            width={52}
            height={32}
            className="size-full object-contain"
            aria-hidden="true"
          />
        </span>
      </div>
    </div>
  </div>
);

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    window.setTimeout(() => {
      setIsSubmitting(false);
      setStatus("success");
      setEmail("");
    }, 600);
  };

  return (
    <div className="relative w-full max-w-[662px]">
      <Image
        src="/section-9/connector.svg"
        alt=""
        width={45}
        height={34}
        className="pointer-events-none absolute top-[-34px] left-[30px] h-[34px] w-[45px]"
        aria-hidden="true"
      />
      <Image
        src="/section-9/connector.svg"
        alt=""
        width={45}
        height={34}
        className="pointer-events-none absolute top-[-34px] right-[30px] h-[34px] w-[45px]"
        aria-hidden="true"
      />

      <div className="rounded-3xl bg-linear-to-b from-white/80 to-white/0 p-1.5 [mask-image:linear-gradient(to_bottom,black_0%,black_83%,rgba(0,0,0,0.45)_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_72%,rgba(0,0,0,0.45)_88%,transparent_100%)] [mask-size:100%_100%] [mask-repeat:no-repeat]">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="relative flex w-full flex-col items-center gap-7.5 overflow-clip rounded-[20px] border border-solid border-[#ede8fc] bg-[#f8f6fe] p-6 iphone:p-8 ipad:p-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[-1px] left-[35px] h-[82px] w-[19px] bg-linear-to-b from-[#8b47eb]/30 to-transparent blur-[9px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[-1px] right-[34px] h-[82px] w-[19px] bg-linear-to-b from-[#8b47eb]/30 to-transparent blur-[9px]"
          />

          <div className="flex w-full flex-col items-center gap-0.5 text-center leading-normal">
            <h2 className="w-full text-[22px] font-semibold text-[#200c50]">
              Join the waitlist
            </h2>
            <p className="w-full text-[17px] font-medium text-[#72758d]">
              Sign up now for early notification upon launch.
            </p>
          </div>

          <div className="flex w-full flex-col items-stretch gap-4 ipad:flex-row ipad:items-start">
            <label className="sr-only" htmlFor="waitlist-email">
              Email address
            </label>
            <input
              id="waitlist-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="Enter your Email…"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status !== "idle") {
                  setStatus("idle");
                }
              }}
              disabled={isSubmitting}
              className="min-h-11 w-full min-w-0 flex-1 touch-manipulation rounded-full border border-solid border-[#e2dbfa] bg-[#f4f1fd] px-6 py-4 text-[18px] font-medium leading-normal text-[#200c50] placeholder:text-[#72758d] transition-colors duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b47eb] disabled:opacity-70"
              aria-invalid={status === "error"}
              aria-describedby="waitlist-status"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-11 shrink-0 touch-manipulation items-center justify-center overflow-clip rounded-full bg-[#8b47eb] px-6 py-4 text-[17px] font-bold leading-normal whitespace-nowrap text-white transition-[opacity,transform] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b47eb] active:scale-[0.96] disabled:opacity-70 motion-reduce:active:scale-100 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90 cursor-pointer"
            >
              {isSubmitting ? "Joining…" : "Join Waitlist"}
            </button>
          </div>

          <p
            id="waitlist-status"
            role="status"
            aria-live="polite"
            className={`min-h-5 text-center text-sm font-medium ${
              status === "error"
                ? "text-[#b42318]"
                : status === "success"
                  ? "text-[#027a48]"
                  : "sr-only"
            }`}
          >
            {status === "error"
              ? "Enter a valid email address."
              : status === "success"
                ? "You’re on the list. We’ll be in touch."
                : ""}
          </p>
        </form>
      </div>
    </div>
  );
};

const SocialLinks = () => (
  <ul className="flex items-start gap-2.5">
    {SOCIAL_LINKS.map((link) => (
      <li key={link.label}>
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="inline-flex size-14 touch-manipulation items-center justify-center rounded-full border border-solid border-[#ede9fc] bg-white p-3.5 transition-[opacity,transform] duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b47eb] active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90"
        >
          <span className="relative size-7 overflow-clip">
            <Image
              src={link.icon}
              alt=""
              width={28}
              height={28}
              className="size-full"
              aria-hidden="true"
            />
          </span>
        </a>
      </li>
    ))}
  </ul>
);

const HeroAtmosphere = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden border-none"
  >
    <div className="absolute top-[-25px] left-[3%] h-[365px] w-[653px] rotate-[23.65deg] mix-blend-screen opacity-80">
      <Image
        src="/section-9/glow-left.png"
        alt=""
        width={408}
        height={228}
        className="size-full object-cover"
      />
    </div>
    <div className="absolute top-[-25px] right-[4%] h-[189px] w-[597px] -rotate-[34deg] mix-blend-screen opacity-80">
      <Image
        src="/section-9/glow-right.png"
        alt=""
        width={287}
        height={91}
        className="size-full object-cover"
      />
    </div>
    <div className="absolute top-[20%] right-[6%] h-[345px] w-[725px] mix-blend-screen opacity-70">
      <Image
        src="/section-9/glow-center.png"
        alt=""
        width={313}
        height={135}
        className="size-full object-cover"
      />
    </div>
    <div className="absolute top-[-10%] left-1/2 h-[485px] w-[495px] -translate-x-1/2 rotate-[42deg] opacity-60">
      <Image
        src="/section-9/lights.svg"
        alt=""
        width={495}
        height={485}
        className="size-full max-w-none"
      />
    </div>
    <div className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-b from-transparent via-[#f6e8f7]/80 to-[#f8f6fe]" />
  </div>
);

const Section9 = () => {
  const headingReveal = useWaitlistReveal(0.24);
  const descriptionReveal = useWaitlistReveal(0.34);

  return (
    <main
      id="top"
      className="min-h-screen bg-[#f8f6fe] font-manrope text-[#19093e]"
    >
      <div className="relative mx-auto flex w-full max-w-[1835px] flex-col items-center px-2 pt-10 iphone:px-2 ipad:pt-12 ipad-landscape:px-12.5 laptop:pt-[54px]">
        <section
          aria-labelledby="waitlist-heading"
          className="relative w-full rounded-tl-[40px] rounded-tr-[40px] rounded-br-3xl rounded-bl-3xl bg-linear-to-b from-white to-white/0 p-1.5 ipad:rounded-tl-[70px] ipad:rounded-tr-[70px] ipad:rounded-br-[40px] ipad:rounded-bl-[40px]"
        >
          <div className="absolute top-0 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2">
            <Navbar />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 h-70 w-full -translate-x-1/2 bg-[#f8f6fe] mask-[linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)]"
          />
          <div
            className="relative z-10 flex w-full flex-col items-center gap-8 overflow-clip rounded-tl-[36px] rounded-tr-[36px] px-4 pt-20 pb-16 iphone:gap-10 iphone:px-6 ipad:rounded-tl-[64px] ipad:rounded-tr-[64px] ipad:px-10 ipad:pt-30 ipad:pb-20"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgb(230, 223, 251) 0%, rgb(246, 232, 247) 66%, rgb(249, 243, 251) 85%, rgb(248, 246, 254) 100%)",
            }}
          >
            <HeroAtmosphere />

            <div className="relative z-10 flex w-full max-w-210 flex-col items-center gap-3.5">
              <BrandMark />

              <div className="flex w-full flex-col items-center gap-4 text-center ipad:gap-4">
                <div className="mt-2 flex w-full flex-col items-center gap-11.75 ipad:mt-0">
                  <div className="flex w-full flex-col items-center gap-4 px-0 ipad:px-8">
                    <motion.h1
                      id="waitlist-heading"
                      className="w-full text-[clamp(2rem,5vw,3.625rem)] font-bold leading-[1.2] text-balance text-[#19093e]"
                      {...headingReveal}
                    >
                      Blessings Unveiled through Waitlist{" "}
                      <span className="font-baskervville font-normal italic">
                        Patience!
                      </span>
                    </motion.h1>
                    <motion.p
                      className="max-w-160 text-pretty text-[clamp(16px,2vw,17px)] font-medium leading-normal text-[#2b106a]"
                      {...descriptionReveal}
                    >
                      Be first to experience Replex. Join our waitlist for
                      exclusive benefits and revolutionary automation solutions.
                    </motion.p>
                  </div>

                  <WaitlistReveal
                    delay={0.44}
                    className="flex w-full flex-col items-center"
                  >
                    <WaitlistForm />
                  </WaitlistReveal>
                  <WaitlistReveal delay={0.54}>
                    <SocialLinks />
                  </WaitlistReveal>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Section9;
