"use client";

const LINK_CLASS =
  "inline-flex min-h-11 items-center font-geist text-[16px] font-normal leading-none text-white touch-manipulation whitespace-nowrap transition-opacity duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-80";

const Logo = () => (
  <a
    href="#"
    aria-label="Digup AI home"
    className="inline-flex min-h-11 items-center gap-3 touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent]"
  >
    <img
      src="/section-16/nav/logo.svg"
      alt=""
      width={23}
      height={23}
      className="size-[23px] shrink-0"
      aria-hidden="true"
    />
    <span className="font-geist text-[24px] font-semibold leading-none text-white whitespace-nowrap">
      Digup AI
    </span>
  </a>
);

export const Navbar = () => {
  return (
    <nav aria-label="Primary" className="relative z-30 w-full">
      {/* Mobile / tablet — logo + menu */}
      <div className="flex w-full items-center justify-between p-4 desktop-sm:hidden">
        <Logo />

        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center touch-manipulation transition-opacity duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-80"
        >
          <img
            src="/section-16/nav/menu-icon.svg"
            alt=""
            width={24}
            height={24}
            className="size-6"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Desktop — Logo + Product/Solutions | gap | Resources/Pricing + auth */}
      <div className="mx-auto hidden w-full max-w-[1512px] items-center justify-between px-10 py-5 desktop-sm:flex desktop-sm:px-16">
        <div className="flex items-center gap-10">
          <Logo />
          <ul className="flex items-center gap-10">
            <li>
              <a href="#product" tabIndex={0} aria-label="Product" className={LINK_CLASS}>
                Product
              </a>
            </li>
            <li>
              <a
                href="#solutions"
                tabIndex={0}
                aria-label="Solutions"
                className={LINK_CLASS}
              >
                Solutions
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-10">
          <ul className="flex items-center gap-10">
            <li>
              <a
                href="#resources"
                tabIndex={0}
                aria-label="Resources"
                className={LINK_CLASS}
              >
                Resources
              </a>
            </li>
            <li>
              <a href="#pricing" tabIndex={0} aria-label="Pricing" className={LINK_CLASS}>
                Pricing
              </a>
            </li>
          </ul>

          <div className="flex shrink-0 items-center gap-6">
            <a
              href="#signup"
              tabIndex={0}
              aria-label="Sign up"
              className={LINK_CLASS}
            >
              Sign up
            </a>

            <a
              href="#login"
              tabIndex={0}
              aria-label="Log in"
              className="inline-flex h-10 min-h-11 shrink-0 items-center justify-center rounded-full bg-white px-5 font-geist text-[15px] font-medium leading-none text-black touch-manipulation whitespace-nowrap transition-opacity duration-200 ease focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90"
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
