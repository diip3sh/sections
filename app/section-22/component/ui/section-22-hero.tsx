"use client";

import { useState } from "react";
import InteractiveHeroCanvas from "../originkit/wave-arcs";

export const Section22Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <section
      aria-label="Stay ahead of the bezier curve"
      className="relative isolate flex min-h-svh w-full flex-col justify-between overflow-hidden bg-[#050304] text-white select-none"
    >
      {/* Wave Arcs background canvas (rotated ~8.47deg to match design) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <InteractiveHeroCanvas
          backgroundColor="#050304"
          lineColor="rgb(0, 178, 255)"
          lineWidth={2.2}
          lineCount={230}
          speed={4}
          glow={4}
          rotation={8.47}
          interactive={true}
          className="size-full"
        />

        {/* Ambient cyan & dark blur glows */}
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00A3FF]/15 blur-[120px]" />
        <div className="absolute bottom-10 left-1/2 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-[#00B2FF]/20 blur-[100px]" />
      </div>

      {/* Top Navbar */}
      <header className="relative z-20 flex w-full items-center justify-between px-6 py-6 ipad:px-12 desktop-sm:px-16">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M11 0L13.5 8.5L22 11L13.5 13.5L11 22L8.5 13.5L0 11L8.5 8.5L11 0Z"
              fill="currentColor"
            />
          </svg>
          <span className="font-sans text-xl font-semibold tracking-[-0.4px]">
            Visionary
          </span>
        </div>

        {/* Center Pill Nav */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center rounded-xl border border-white/10 bg-white/[0.03] p-1 shadow-lg backdrop-blur-md ipad:flex"
        >
          <a
            href="#home"
            className="rounded-lg bg-white/15 px-4 py-2 text-xs font-normal text-white transition-colors hover:bg-white/20"
          >
            Home
          </a>
          <a
            href="#service"
            className="px-4 py-2 text-xs font-normal text-white/80 transition-colors hover:text-white"
          >
            Service
          </a>
          <a
            href="#product"
            className="px-4 py-2 text-xs font-normal text-white/80 transition-colors hover:text-white"
          >
            Proudct
          </a>
          <a
            href="#about"
            className="px-4 py-2 text-xs font-normal text-white/80 transition-colors hover:text-white"
          >
            About Us
          </a>
        </nav>

        {/* Right CTA Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-full border border-[#2f2f2f] bg-white/[0.02] px-5 py-2.5 text-sm font-normal text-white transition-colors hover:border-white/30 hover:bg-white/10"
          >
            Sign in
          </button>
          <button
            type="button"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#121212] transition-transform hover:scale-105"
          >
            Join Now
          </button>
        </div>
      </header>

      {/* Main Hero Content */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12 text-center">
        {/* Main Serif Headline */}
        <h1 className="font-serif text-[48px] leading-[1.1] tracking-[-1px] text-white ipad:text-[68px] desktop-sm:text-[74px] desktop-sm:leading-[81px]">
          Stay ahead of the <br />
          <span className="font-serif italic">(bazier)</span> curve
        </h1>

        {/* Description & Social Proof */}
        <div className="mt-8 flex max-w-[536px] flex-col items-center gap-6">
          <p className="font-sans text-base leading-relaxed text-white/80 ipad:text-lg">
            Get inspired, learn what’s new in design, and <br className="hidden ipad:block" />
            connect with pros - all delivered in weekly mail.
          </p>

          {/* Avatar Stack + Professionals Counter */}
          <div className="flex items-center gap-3">
            <div className="grid grid-cols-1 grid-rows-1 place-items-start leading-none">
              <div className="col-start-1 row-start-1 h-[26px] w-[26px] overflow-hidden rounded-[4px] shadow-md">
                <img
                  src="/section-22/avatar-1.png"
                  alt="Member 1"
                  className="size-full object-cover"
                />
              </div>
              <div className="col-start-1 row-start-1 ml-[11px] mt-[1px] rotate-[8.44deg]">
                <div className="h-[26px] w-[26px] overflow-hidden rounded-[4px] shadow-md">
                  <img
                    src="/section-22/avatar-2.png"
                    alt="Member 2"
                    className="size-full object-cover"
                  />
                </div>
              </div>
              <div className="col-start-1 row-start-1 ml-[29.5px] rotate-[1.22deg]">
                <div className="h-[26px] w-[26px] overflow-hidden rounded-[4px] shadow-md">
                  <img
                    src="/section-22/avatar-3.png"
                    alt="Member 3"
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </div>
            <span className="font-sans text-sm tracking-[-0.5px] text-white/60 ipad:text-base">
              Join 100k design professionals
            </span>
          </div>

          {/* Email Subscription Bar */}
          <form
            onSubmit={handleSubmit}
            className="mt-2 w-full max-w-[512px] rounded-full border border-white/10 bg-white/[0.05] p-2 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center justify-between rounded-full bg-[#101113] py-2 pl-6 pr-2 shadow-inner">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent font-sans text-sm text-white placeholder:text-white/50 focus:outline-none ipad:text-base"
                required
              />
              <button
                type="submit"
                className="shrink-0 rounded-full border border-[#2f2f2f] bg-white/[0.02] px-6 py-2.5 text-sm text-white transition-colors hover:border-white/40 hover:bg-white/10"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Empty footer spacer for baseline balance */}
      <footer className="relative z-10 py-4" />
    </section>
  );
};
