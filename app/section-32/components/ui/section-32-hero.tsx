import { AsciiField } from "./ascii-field";
import { HeroContent } from "./hero-content";
import { Navbar } from "./navbar";
import { Orb } from "./orb";
import { StarDust } from "./star-dust";

/**
 * Figma frames:
 * - Mobile  2371:1684 — 402 x 874
 * - iPad    2371:2441 — 744 x 1068  (`ipad:`)
 * - Desktop 2371:3198 — 1440 x 885  (`desktop-sm:`)
 *
 * One centred column at every width — orb, badge, headline, sub, CTAs — over a
 * burning ASCII field. Nothing reflows; the frames re-pitch type and reposition
 * the two blocks, which is why the whole thing is two absolutely placed groups
 * rather than a flow. Both are centred horizontally at all three frames, so
 * only their y changes.
 *
 * Desktop takes a floor of the viewport height: 885 is shorter than most
 * laptops and the page would otherwise end mid-screen. The nav stays pinned to
 * the top and the ASCII field is bottom-anchored — it is a flame, it has to
 * reach the floor — so the surplus goes to the band between them. Orb and copy
 * hang off that band's centre at their Figma offsets (-220.5 and +127), which
 * reproduces the frame exactly at 885 and drifts them down together as it
 * opens up. The band is transparent to the pointer so it cannot eat nav clicks.
 *
 * The dark wash is Figma's `Ellipse 21852` — a #181818 disc under a 148px blur,
 * sitting between the field and the copy. It is the only reason the headline
 * reads: it neutralises the green and erases the glyphs behind the text while
 * leaving them at the frame edges. Rebuilt as a radial gradient rather than a
 * filter, with stops from `alpha ~ Phi((R - d) / sigma)` at sigma/R = 0.402,
 * run out to 2.4R where the falloff finally reaches zero.
 */

const WASH_FILL = `radial-gradient(closest-side, ${[
  "rgba(24,24,24,0.994) 0%",
  "rgba(24,24,24,0.932) 16.7%",
  "rgba(24,24,24,0.691) 33.3%",
  "rgba(24,24,24,0.5) 41.7%",
  "rgba(24,24,24,0.309) 50%",
  "rgba(24,24,24,0.16) 58.3%",
  "rgba(24,24,24,0.068) 66.7%",
  "rgba(24,24,24,0.023) 75%",
  "rgba(24,24,24,0.006) 83.3%",
  "transparent 100%",
].join(", ")})`;

export const Section32Hero = () => (
  <main className="relative isolate w-full overflow-hidden bg-[#031602]">
    <div className="relative h-[874px] w-full ipad:h-[1068px] desktop-sm:h-[885px] desktop-sm:min-h-dvh">
      <AsciiField />

      <div className="relative mx-auto h-full w-full max-w-[402px] ipad:max-w-[744px] desktop-sm:max-w-[1440px]">
        <Navbar />

        <div className="pointer-events-none absolute inset-0 desktop-sm:top-[80px] desktop-sm:bottom-0">
          {/* Wash — centred on the copy, not on the orb, which is what pulls
              the glyphs out from behind the headline rather than the orb. It
              lives in the band so it travels with the copy it is there for. */}
          <div
            className="absolute top-[484px] left-1/2 z-[1] h-[1010px] w-[1332px] -translate-x-1/2 -translate-y-1/2 ipad:top-[533px] ipad:h-[1769px] ipad:w-[1769px] desktop-sm:top-[calc(50%+34px)]"
            style={{ backgroundImage: WASH_FILL }}
          />
          <StarDust className="top-[201px] z-[2] ipad:top-[234px] desktop-sm:top-[calc(50%-220.5px)]" />
          <Orb className="top-[61px] z-[2] ipad:top-[94px] desktop-sm:top-[calc(50%-220.5px)] desktop-sm:-translate-y-1/2" />
          <HeroContent className="top-[344px] ipad:top-[495px] desktop-sm:top-[calc(50%+127px)] desktop-sm:-translate-y-1/2" />
        </div>
      </div>
    </div>
  </main>
);
