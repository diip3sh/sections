import ParticleSphere from "../originkit/particle-sphere";
import { MaskGroup } from "./mask-group";

/**
 * Dotted orb resting above the hand — Figma "Group 2147241484" (2282:6148).
 *
 * Group box in frame coordinates: 61.33, 499 — 228.39 x 269.82.
 *
 * With `scale: 10` the sphere engine uses radius 1.25 world units at camera z 3;
 * the 2.5x canvas overflow widens the FOV to 98.78deg, so the visible plane
 * spans 6.994 units across 493.3px of canvas:
 *
 *   2.5 / 6.994 * 493.3 = 176.3px  <- SPHERE_DIAMETER
 *
 * Layers, bottom to top:
 *   z-0  MaskGroup — halo + wash, unmasked, bleeding out around the sphere
 *   z-30 the particle sphere
 *   z-40 rim highlight, the one place masking is still used: a blurred warm
 *        ellipse clipped to the sphere's top arc so the glow reads as a
 *        highlight sitting on the surface, not a shape inside it.
 */

/** Projected diameter of the particle sphere, in px. */
const SPHERE_DIAMETER = 197;
/** Sphere centre within the group box. */
const CENTRE_X = 120.47;
const CENTRE_Y = 98;

/** Rim ring is r 81.7624 in a 173.336 x 168.431 viewBox. */
const RIM_SCALE = SPHERE_DIAMETER / (81.7624 * 2);

export const Orb = () => (
  <div
    aria-hidden
    className="absolute top-[499px] left-[61.33px] h-[269.816px] w-[228.39px]"
  >
    {/* Glow behind the sphere */}
    <div
      className="absolute z-0"
      style={{ left: CENTRE_X, top: CENTRE_Y, width: 0, height: 0 }}
    >
      <MaskGroup size={SPHERE_DIAMETER} />
    </div>

    {/* Live particle sphere, in place of Figma's flat "image 3083449" */}
    <div className="pointer-events-auto absolute top-0 left-[12.54px] z-30 h-[197.32px] w-[215.853px]">
      <ParticleSphere
        particlesCount={10000}
        particleScale={7}
        rotationDirection="clockwise"
        speed={20}
        scale={10}
        drag
        smoothing={7}
        dragSpeed={5}
        stopOnHover={false}
        cursorOn
        cursorRadiusUI={75}
        cursorStrengthUI={10}
        clickForce={5}
        sphereColor="#BF5321"
      />
    </div>

    {/* Rim highlight — blurred warm ellipse masked to the sphere's top arc */}
    {/* <svg
      className="pointer-events-none absolute z-40"
      style={{
        width: 173.336 * RIM_SCALE,
        height: 168.431 * RIM_SCALE,
        left: CENTRE_X - 86.6687 * RIM_SCALE,
        top: CENTRE_Y - 86.6677 * RIM_SCALE,
      }}
      viewBox="0 0 174 169"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="orb-rim-mask"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="4"
        y="4"
        width="165"
        height="83"
      >
        <path
          d="M168.431 86.6677C168.431 75.9305 166.316 65.2985 162.207 55.3786C158.098 45.4587 152.076 36.4453 144.483 28.8529C136.891 21.2606 127.878 15.238 117.958 11.1291C108.038 7.02012 97.4059 4.90527 86.6687 4.90527C75.9315 4.90527 65.2994 7.02012 55.3796 11.1291C45.4597 15.238 36.4463 21.2606 28.8539 28.8529C21.2616 36.4453 15.239 45.4587 11.13 55.3786C7.0211 65.2985 4.90625 75.9305 4.90625 86.6677L7.91987 86.6677C7.91987 76.3263 9.95677 66.0861 13.9143 56.5318C17.8718 46.9776 23.6724 38.2964 30.9849 30.9839C38.2974 23.6714 46.9786 17.8708 56.5328 13.9133C66.0871 9.95579 76.3272 7.91889 86.6687 7.91889C97.0101 7.91889 107.25 9.95579 116.805 13.9133C126.359 17.8708 135.04 23.6714 142.353 30.9839C149.665 38.2964 155.466 46.9776 159.423 56.5318C163.381 66.0861 165.418 76.3263 165.418 86.6677L168.431 86.6677Z"
          fill="#FFFFA3"
        />
      </mask>
      <g mask="url(#orb-rim-mask)">
        <g opacity="0.8" filter="url(#orb-rim-blur)">
          <ellipse
            cx="86.6687"
            cy="51.5108"
            rx="81.7624"
            ry="62.9571"
            fill="#FFFF93"
          />
        </g>
      </g>
      <defs>
        <filter
          id="orb-rim-blur"
          x="-23.4381"
          y="-39.7906"
          width="220.214"
          height="182.603"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur stdDeviation="14.1722" result="blur" />
        </filter>
      </defs>
    </svg> */}
  </div>
);
