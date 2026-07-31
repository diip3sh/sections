"use client";

export const Navbar = () => {
  return (
    <nav
      aria-label="Primary"
      className="relative flex w-full items-center justify-between p-4 px-[48px]"
    >
      <a
        href="#"
        aria-label="Neura home"
        className="inline-flex min-h-11 items-center gap-2 touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent]"
      >
        <img
          src="/section-19/nav/logo.svg"
          alt=""
          width={22}
          height={22}
          className="size-[22px] shrink-0"
          aria-hidden="true"
        />
        <span className="font-sans text-[20px] font-medium leading-[32.39px] tracking-[-0.4px] text-white whitespace-nowrap">
          Neura
        </span>
      </a>

      <button
        type="button"
        aria-label="Open menu"
        className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center touch-manipulation transition-opacity duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-80"
      >
        <img
          src="/section-19/nav/menu.svg"
          alt=""
          width={24}
          height={24}
          className="size-6"
          aria-hidden="true"
        />
      </button>
    </nav>
  );
};
