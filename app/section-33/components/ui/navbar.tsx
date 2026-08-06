/**
 * Top nav — Figma 2405:6316 (mobile) / 2405:6408 (tablet) / 2405:6500 (desktop).
 *
 * Logo against a hamburger below 1280, and against a link row plus the two
 * account buttons above it. The bar spans the full frame — it is the one thing
 * in the section that sits outside the rails — and its bottom edge is the rule
 * the side hatch starts under.
 *
 * That full width belongs to the bar and its rule, not to the row inside it.
 * The row caps with everything else, or past 1440 the wordmark and the account
 * buttons walk out to the corners of the screen while the copy, the rails and
 * the logo strip stay centred — the same split `section-30` uses.
 */

const NAV_LINKS = ["Home", "About", "Documentation", "Blogs"];

/** Shared pressable / focus stack — house Button contract on a dark bar. */
const CONTROL =
  "cursor-pointer touch-manipulation [-webkit-tap-highlight-color:transparent] transition-[opacity,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] motion-reduce:active:scale-100 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-80";

/** Login / Sign Up share everything but their fill — Figma 2405:6521/6523. */
const ACCOUNT_BUTTON =
  "inline-flex items-center justify-center px-[6px] py-[8px] font-geist-mono text-[14px] leading-[normal] tracking-[-0.06em] whitespace-nowrap";

export const Navbar = () => (
  <nav
    aria-label="Primary"
    className="relative z-20 w-full shrink-0 border-b border-solid border-white/12"
  >
    <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-[16px] py-[12px] desktop-sm:px-[56px]">
      <a href="#" aria-label="Home" className={`shrink-0 ${CONTROL}`}>
        <img
          src="/section-33/logo-mark.svg"
          alt=""
          aria-hidden
          className="block size-8 max-w-none"
        />
      </a>

      <div className="hidden items-center gap-[32px] desktop-sm:flex">
        <ul className="flex items-center gap-[24px]">
          {NAV_LINKS.map((label) => (
            <li key={label}>
              <a
                href="#"
                className={`flex min-h-11 items-center font-geist-mono text-[16px] leading-[1.1] tracking-[-0.02em] whitespace-nowrap text-white opacity-60 ${CONTROL}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-[8px]">
          <button
            type="button"
            className={`bg-[#313131] text-white ${ACCOUNT_BUTTON} ${CONTROL}`}
          >
            Login
          </button>
          <button
            type="button"
            className={`bg-white text-black ${ACCOUNT_BUTTON} ${CONTROL}`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* The icon keeps its 24px slot so the bar height stays Figma's; the 44px
        target grows around it off an absolute inset. */}
      <button
        type="button"
        aria-label="Open menu"
        className={`relative size-6 shrink-0 desktop-sm:hidden ${CONTROL}`}
      >
        <span aria-hidden className="absolute -inset-2.5" />
        <img
          src="/section-33/menu.svg"
          alt=""
          aria-hidden
          className="relative block size-full max-w-none"
        />
      </button>
    </div>
  </nav>
);
