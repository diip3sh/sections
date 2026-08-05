/**
 * Top navigation — Figma mobile 2371:1750, iPad 2371:2442, desktop 2371:3201.
 *
 * The centre links and the two right-hand actions are desktop-only; both
 * stacked frames swap the lot for a hamburger. Figma sets no nav container on
 * desktop — `Frame 9` just sits at y19 in a 42px row — so the bar is given the
 * 80px height that puts its content on the same centre line.
 *
 * Gutters are Figma's own: 16 / 48 / 150.
 */

const NAV_LINKS = [
  { label: "Platform", hasMenu: true },
  { label: "Solutions", hasMenu: true },
  { label: "Community", hasMenu: false },
  { label: "Resources", hasMenu: true },
] as const;

const LINK_CLASS =
  "flex min-h-11 items-center gap-[2px] font-switzer text-[14px] leading-[normal] font-medium tracking-[-0.14px] whitespace-nowrap text-white/60" +
  " transition-opacity duration-200 ease-out" +
  " focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bbfb50]" +
  " [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70";

export const Navbar = () => (
  <nav
    aria-label="Primary"
    className="relative z-30 flex h-[64px] w-full items-center justify-between px-[16px] ipad:px-[48px] desktop-sm:h-[80px] desktop-sm:px-[150px]"
  >
    <a
      href="#"
      aria-label="Ozone home"
      className="flex items-center gap-[12px] rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bbfb50]"
    >
      <img
        src="/section-32/logo-mark.svg"
        alt=""
        aria-hidden
        className="block size-8 max-w-none"
      />
      <span className="font-sans text-[16.901px] leading-[normal] font-bold tracking-[-0.169px] whitespace-nowrap text-white ipad:text-[20px] ipad:tracking-[-0.2px]">
        OZONE
      </span>
    </a>

    {/* Desktop centre links (2371:3211) — centred on the bar, not on the row */}
    <ul className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-[24px] desktop-sm:flex">
      {NAV_LINKS.map((link) => (
        <li key={link.label}>
          <a href="#" className={LINK_CLASS}>
            {link.label}
            {link.hasMenu ? (
              <img
                src="/section-32/chevron-down.svg"
                alt=""
                aria-hidden
                className="block size-5 max-w-none"
              />
            ) : null}
          </a>
        </li>
      ))}
    </ul>

    {/* Desktop actions (2371:3207) */}
    <div className="hidden items-center gap-[24px] desktop-sm:flex">
      <a href="#" className={LINK_CLASS}>
        Contact
      </a>
      <button
        type="button"
        className="flex min-h-11 cursor-pointer items-center justify-center rounded-[8px] bg-[#b6f64b] px-[14px] py-[12px] font-switzer text-[14px] leading-[normal] font-medium tracking-[-0.14px] whitespace-nowrap text-black transition-opacity duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] motion-reduce:active:scale-100 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90"
      >
        Request a demo
      </button>
    </div>

    {/* Stacked frames get a hamburger instead (2371:1756 / 2371:2448). Figma's
        24px glyph is too small to press, so the target is 44px and the negative
        margin keeps the glyph on the gutter Figma set. */}
    <button
      type="button"
      aria-label="Open menu"
      className="-mr-2.5 flex size-11 cursor-pointer items-center justify-center touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bbfb50] active:scale-[0.97] motion-reduce:active:scale-100 desktop-sm:hidden"
    >
      <img
        src="/section-32/menu.svg"
        alt=""
        aria-hidden
        className="block size-6 max-w-none ipad:size-8"
      />
    </button>
  </nav>
);
