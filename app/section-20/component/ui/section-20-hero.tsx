"use client";

import GalleryTunnel from "../originkit/gallery-tunnel";
import { HeroContent } from "./hero-content";
import { PORTRAIT_IMAGES } from "./portraits";

/** Dark slabs so non-photo panels stay invisible in the tunnel. */
const TUNNEL_COLORS = ["#181818", "#1c1c1c", "#222222", "#161616"];

export const Section20Hero = () => {
  const handleExploreGallery = () => {
    window.location.hash = "#gallery";
  };

  const handleBookShoot = () => {
    window.location.hash = "#book";
  };

  return (
    <section
      aria-label="Elevating portraits through perspective"
      className="relative isolate flex min-h-svh w-full items-center justify-center overflow-hidden bg-[#131313]"
    >
      {/* 3D portrait tunnel */}
      <div
        aria-hidden="true"
        className="pointer-events-auto absolute inset-0 z-0"
      >
        <GalleryTunnel
          images={PORTRAIT_IMAGES}
          background="#000000"
          lineColor="#B0B0B0"
          lineOpacity={0}
          grid={8}
          speed={50}
          boost={100}
          fade={100}
          label={false}
        />
      </div>

      {/* Smooth radial vignette wash behind text so copy stays readable while 3D images blend naturally */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/95 blur-[80px] ipad:h-[550px] ipad:w-[550px] ipad:blur-[100px] desktop-sm:h-[600px] desktop-sm:w-[600px] desktop-sm:blur-[110px]"
      />

      <div className="pointer-events-none relative z-20 flex w-full max-w-[763px] items-center justify-center py-12">
        <div className="pointer-events-auto relative flex w-full items-center justify-center">
          <HeroContent
            onExploreGallery={handleExploreGallery}
            onBookShoot={handleBookShoot}
          />
        </div>
      </div>
    </section>
  );
};
