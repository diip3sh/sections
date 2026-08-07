"use client";

import type { KeyboardEvent } from "react";

import { Button } from "./button";
import { GUTTER, NAV_HEIGHT, TRACK_TIGHT } from "./stage";

const NAV_LINKS = ["Platform", "Solutions", "Resources", "Pricing"] as const;

const LINK_CLASS = `inline-flex min-h-11 cursor-pointer items-center font-tight text-[17px] leading-[25.5px] ${TRACK_TIGHT} whitespace-nowrap text-white transition-[opacity,transform] duration-200 ease-out [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70`;

const handleKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
  if (event.key !== " ") return;
  event.preventDefault();
  event.currentTarget.click();
};

/**
 * Primary nav. Phone and tablet carry logo + hamburger; desktop swaps the
 * hamburger for centre links and the "Launch Now" CTA (Figma 2428:7765).
 *
 * The band is transparent here — its fill is a backdrop layer in the section
 * root, because Figma paints the star field *over* the nav band and under the
 * nav's own text.
 *
 * Desktop alignment is `items-start` + `pt-[26px]` rather than `items-center`:
 * Figma hangs a 51px row off y26 inside a 96px band, which is 3.5px below the
 * band's centre. The logo row is 26px tall and centred in that row, hence the
 * matching `mt-[12.5px]`.
 */
export const Navbar = () => (
  <nav
    aria-label="Primary"
    className={`relative z-30 flex w-full items-center justify-between ${NAV_HEIGHT} ${GUTTER} desktop-sm:items-start desktop-sm:pt-[26px]`}
  >
    <div className="flex items-center gap-[52px] desktop-sm:mt-[12.5px]">
      <a
        href="/"
        aria-label="AstraCore home"
        className="flex cursor-pointer items-center gap-[6.154px] transition-[opacity,transform] duration-200 ease-out [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ipad:gap-[8px] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70"
      >
        <img
          src="/section-39/logo-mark.svg"
          alt=""
          aria-hidden
          className="block size-[18.462px] max-w-none ipad:size-[24px]"
        />
        {/*
          Figma scales the 20px wordmark to 0.769 on the phone rather than
          re-typesetting it, so the phone numbers are the desktop ones times
          that ratio — transcribed instead of rounded.
        */}
        <span
          className={`font-sans text-[15.385px] leading-[19.615px] font-semibold ${TRACK_TIGHT} whitespace-nowrap text-white ipad:text-[20px] ipad:leading-[25.5px]`}
        >
          AstraCore
        </span>
      </a>

      <ul className="hidden items-center gap-[24px] desktop-sm:flex">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a href="#" className={LINK_CLASS} onKeyDown={handleKeyDown}>
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/*
      One control at a time: the hamburger holds the phone and tablet, and the
      CTA takes over at `desktop-sm` where the links unfold inline. Both at once
      offered the same menu twice on a 402 frame.

      The CTA is gated on a wrapper rather than on the button, because `Button`
      carries `inline-flex` in its own base class — `hidden` and `inline-flex`
      are the same utility group, so which one wins is decided by stylesheet
      order rather than by the order they are written here.
    */}
    <div className="flex shrink-0 items-center gap-[12px] ipad:gap-[16px]">
      <div className="hidden desktop-sm:block">
        <Button>Launch Now</Button>
      </div>

      {/*
        Hamburger stays 24x24 in layout so the band keeps Figma's 56/79 height;
        the 44px hit area is an absolute inset rather than a min-height, which
        would push the band taller.
      */}
      <button
        type="button"
        aria-label="Open menu"
        className="relative size-[24px] shrink-0 cursor-pointer touch-manipulation transition-[opacity,transform] duration-200 ease-out [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] motion-reduce:active:scale-100 desktop-sm:hidden [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70"
      >
        <span aria-hidden className="absolute -inset-2.5" />
        <img
          src="/section-39/menu.svg"
          alt=""
          aria-hidden
          className="relative block size-full max-w-none"
        />
      </button>
    </div>
  </nav>
);
