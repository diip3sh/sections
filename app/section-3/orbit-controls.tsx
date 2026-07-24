type OrbitRing = {
  diameter: number;
  positionY: number;
};

const DESKTOP_RINGS: OrbitRing[] = [
  { diameter: 318, positionY: 371 },
  { diameter: 355, positionY: 372 },
  { diameter: 393, positionY: 373 },
  { diameter: 432, positionY: 374 },
  { diameter: 434, positionY: 375 },
];

const MOBILE_RINGS: OrbitRing[] = [
  { diameter: 297, positionY: -3 },
  { diameter: 327, positionY: 0 },
  { diameter: 358, positionY: 0 },
  { diameter: 381, positionY: 0 },
  { diameter: 416, positionY: 0 },
];

const OrbitLayer = ({
  rings,
  className,
  positionClass,
}: {
  rings: OrbitRing[];
  className: string;
  positionClass: string;
}) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 mask-[linear-gradient(to_right,transparent,black_14%,black_86%,transparent)] ${className}`}
    >
      {rings.map((ring, index) => (
        <div
          key={ring.diameter}
          style={{
            width: `${ring.diameter}px`,
            height: `${ring.diameter}px`,
            marginTop: `${ring.positionY}px`,
            opacity: 0.18 - index * 0.0375,
          }}
          className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white ${positionClass}`}
        />
      ))}
    </div>
  );
};

const OrbitControls = () => {
  return (
    <>
      <OrbitLayer
        rings={DESKTOP_RINGS}
        className="hidden sm:block"
        positionClass="top-92.375"
      />
      <OrbitLayer
        rings={MOBILE_RINGS}
        className="sm:hidden"
        positionClass="top-67"
      />
    </>
  );
};

export default OrbitControls;
