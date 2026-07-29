"use client";

export const Navbar = () => {
  return (
    <nav aria-label="Primary" className="relative z-30 w-full">
      <div className="flex w-full items-center justify-between p-4">
        <a
          href="#"
          aria-label="Agentic home"
          className="inline-flex min-h-11 items-center gap-2 touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent]"
        >
          <img
            src="/section-14/nav/logo.svg"
            alt=""
            width={43}
            height={42}
            className="h-[42px] w-[43px] shrink-0"
            aria-hidden="true"
          />
          <span className="font-audiowide text-[22px] leading-[1.5] text-white whitespace-nowrap">
            Agentic
          </span>
        </a>

        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center touch-manipulation transition-opacity duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-80"
        >
          <img
            src="/section-14/nav/menu-icon.svg"
            alt=""
            width={24}
            height={24}
            className="size-6"
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  );
};
