"use client";

import type { KeyboardEvent } from "react";
import { Button } from "./button";

const NAV_LINKS = [
  { label: "Discover", href: "#discover" },
  { label: "Creators", href: "#creators" },
  { label: "Community", href: "#community" },
  { label: "Stories", href: "#stories" },
] as const;

type NavbarProps = {
  onViewStories: () => void;
};

export const Navbar = ({ onViewStories }: NavbarProps) => {
  const handleKeyDown = (
    event: KeyboardEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    window.location.hash = href;
  };

  return (
    <nav aria-label="Primary" className="relative z-30 w-full">
      {/* Mobile / tablet */}
      <div className="flex w-full items-center justify-between px-4 py-6 desktop-sm:hidden">
        <a
          href="#"
          aria-label="Creatora home"
          className="inline-flex min-h-11 items-center gap-2 touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black [-webkit-tap-highlight-color:transparent]"
        >
          <img
            src="/section-17/nav/logo.svg"
            alt=""
            width={21}
            height={24}
            className="h-[24px] w-[21px] shrink-0"
            aria-hidden="true"
          />
          <span className="font-sans text-[20px] font-semibold leading-[1.1] tracking-[-0.6px] text-[#121212]">
            Creatora
          </span>
        </a>

        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center touch-manipulation transition-opacity duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black [-webkit-tap-highlight-color:transparent] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-80"
        >
          <span
            aria-hidden="true"
            className="flex size-6 flex-col justify-center gap-1.5"
          >
            <span className="block h-0.5 w-full rounded-full bg-[#121212]" />
            <span className="block h-0.5 w-full rounded-full bg-[#121212]" />
            <span className="block h-0.5 w-full rounded-full bg-[#121212]" />
          </span>
        </button>
      </div>

      {/* Desktop — Figma: 165px side inset within 1440 frame */}
      <div className="mx-auto hidden w-full items-center justify-between p-7.5 bg-[#F5F5F5] desktop-sm:flex max-w-[1110px] h-[111px] mx-auto mt-10">
        <a
          href="#"
          aria-label="Creatora home"
          className="inline-flex min-h-11 w-[299px] items-center gap-2 touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black [-webkit-tap-highlight-color:transparent]"
        >
          <img
            src="/section-17/nav/logo.svg"
            alt=""
            width={21}
            height={24}
            className="h-[24px] w-[21px] shrink-0"
            aria-hidden="true"
          />
          <span className="font-sans text-[20px] font-semibold leading-[1.1] tracking-[-0.6px] text-[#121212]">
            Creatora
          </span>
        </a>

        <ul className="flex items-center gap-6 font-tight text-[17px] leading-[25.5px] tracking-[-0.34px] text-black">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                tabIndex={0}
                aria-label={link.label}
                onKeyDown={(event) => handleKeyDown(event, link.href)}
                className="inline-flex min-h-11 items-center touch-manipulation whitespace-nowrap transition-opacity duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black [-webkit-tap-highlight-color:transparent] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex w-[299px] items-center justify-end">
          <Button
            variant="secondary"
            aria-label="View Stories"
            onClick={onViewStories}
          >
            View Stories
          </Button>
        </div>
      </div>
    </nav>
  );
};
