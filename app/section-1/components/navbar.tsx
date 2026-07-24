import Image from "next/image";

const NAV_LINKS = ["Home", "Features", "Benefits", "Blogs", "Changelog"] as const;

export const Navbar = () => {
  return (
    <nav
      aria-label="Primary"
      className="absolute left-1/2 top-[34px] z-30 flex w-[min(920px,calc(100%-32px))] -translate-x-1/2 items-center justify-between rounded-[16px] border border-[#1d1e21] bg-black/80 px-4 py-3.5 shadow-[0px_2px_1px_rgba(0,0,0,0.5),0px_16px_15px_rgba(0,0,0,0.5)] backdrop-blur-xl max-md:top-[20px] max-md:px-3 max-md:py-3"
    >
      <a
        href="#"
        className="flex items-center gap-2.5"
        aria-label="Suprema home"
      >
        <span className="relative h-[34px] w-[34px] shrink-0">
          <Image
            alt=""
            src="/section-1/navbar/logo-frame.png"
            fill
            sizes="34px"
            className="object-contain"
          />
        </span>
        <span className="relative flex items-baseline">
          <span className="font-tight text-[20px] font-bold leading-none text-white">
            Suprema
          </span>
          <span className="ml-0.5 font-tight text-[10px] font-medium leading-none text-[#9297a0]">
            UI
          </span>
        </span>
      </a>

      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-5 max-md:hidden">
        {NAV_LINKS.map((link) => {
          const isActive = link === "Home";
          return (
            <a
              key={link}
              href="#"
              aria-current={isActive ? "page" : undefined}
              className={
                "font-tight text-[15px] font-semibold leading-none transition-colors duration-200 " +
                (isActive
                  ? "rounded-[10px] border border-[#1d1e21] bg-[#141415] px-5 py-3 text-white"
                  : "px-1 py-3 text-[#9297a0] hover:text-white")
              }
            >
              {link}
            </a>
          );
        })}
      </div>

      <a
        href="#"
        className="rounded-[12px] bg-white px-4 py-2.5 font-tight text-[15px] font-semibold leading-none text-[#060607] transition-opacity duration-200 hover:opacity-90"
      >
        Contact Us
      </a>
    </nav>
  );
};
