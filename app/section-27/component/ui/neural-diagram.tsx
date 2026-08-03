import ParticleImage from "../originkit/svg-particle";

/**
 * Head, brain and labelled nodes — Figma 2288:9696 plus the sibling pills, dots
 * and connectors.
 *
 * The halftone head is rendered live by the particle field (sampling
 * Vector.png, the head silhouette) instead of the flat export; the brain sits
 * on top of it as its own image, and the connectors run from each pill down to
 * its node dot.
 *
 * These are the only nodes Figma positions absolutely (no auto-layout), so they
 * keep absolute coordinates. They are re-based to this 402x423 block: the frame
 * places it at y382, so every Figma y here is the original minus 382.
 */

const BLOCK_WIDTH = 402;
const BLOCK_HEIGHT = 423;

/** Head group — Figma 2288:9696 at (83, 507), 236.264 x 298.5. */
const HEAD = { left: 83, top: 125, width: 236.264, height: 298.5 };
/** Brain — Figma "image 18649", 183.75 x 156.75, offset inside the head group. */
const BRAIN = {
  left: HEAD.left + 13.3,
  top: HEAD.top + 16,
  width: 183.75,
  height: 156.75,
};

type Node = {
  label: string;
  color: string;
  pill: { left: number; top: number; width: number };
  dot: { left: number; top: number };
  line: { x1: number; y1: number; x2: number; y2: number };
};

const NODES: Node[] = [
  {
    label: "Decision Engine",
    color: "#aafc81",
    pill: { left: 147, top: 40, width: 107.75 },
    dot: { left: 195, top: 163 },
    line: { x1: 205, y1: 71, x2: 204.75, y2: 172.75 },
  },
  {
    label: "Neural Processing",
    color: "#746ffc",
    pill: { left: 25, top: 85, width: 119.75 },
    dot: { left: 161.5, top: 220.75 },
    line: { x1: 99, y1: 116, x2: 171.25, y2: 230.5 },
  },
  {
    label: "Agent Coordination",
    color: "#b801c1",
    pill: { left: 249, top: 92, width: 125.75 },
    dot: { left: 220, top: 204.75 },
    line: { x1: 308, y1: 123, x2: 229.75, y2: 214.5 },
  },
];

export const NeuralDiagram = () => (
  <div className="relative h-[423px] w-[402px] max-w-none shrink-0">
    {/* Halftone head — particle field sampling the silhouette */}
    <div
      className="absolute"
      style={{
        left: HEAD.left,
        top: HEAD.top,
        width: HEAD.width,
        height: HEAD.height,
      }}
    >
      <ParticleImage
        width="100%"
        height="100%"
        backgroundColor="transparent"
        particleCount={60}
        particleSize={4}
        particleShape="circle"
        particleColor="single"
        singleColor="#d9d9d9"
        hoverEnabled={false}
        repulsionEnabled
        repulsionConfig={{
          repulsionMode: "outside",
          repulsionForce: 8,
          repulsionRadius: 55,
        }}
        imageConfig={{
          image: "/section-27/Vector.png",
          mode: "fit",
          scale: 10,
        }}
      />
    </div>

    {/* Brain, over the particle head */}
    <img
      aria-hidden
      src="/section-27/brain-only.png"
      alt=""
      className="pointer-events-none absolute block max-w-none"
      style={{
        left: BRAIN.left,
        top: BRAIN.top,
        width: BRAIN.width,
        height: BRAIN.height,
      }}
    />

    {/* Connectors */}
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${BLOCK_WIDTH} ${BLOCK_HEIGHT}`}
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {NODES.map((node) => (
        <line
          key={node.label}
          x1={node.line.x1}
          y1={node.line.y1}
          x2={node.line.x2}
          y2={node.line.y2}
          stroke={node.color}
          strokeWidth="1"
        />
      ))}
    </svg>

    {/* Node dots */}
    {NODES.map((node) => (
      <span
        key={node.label}
        aria-hidden
        className="pointer-events-none absolute size-[19.5px] rounded-full"
        style={{
          left: node.dot.left,
          top: node.dot.top,
          backgroundColor: node.color,
          boxShadow: `0 0 0 1.5px ${node.color}40`,
        }}
      />
    ))}

    {/* Labels */}
    {NODES.map((node) => (
      <div
        key={node.label}
        className="pointer-events-none absolute flex h-[29px] items-center justify-center gap-1.5 rounded-[0.75px] border-[0.75px] border-solid bg-[#0b0b0c] p-1.5"
        style={{
          left: node.pill.left,
          top: node.pill.top,
          width: node.pill.width,
          borderColor: node.color,
          boxShadow: `1.5px 1.5px 0px 0px #0b0b0c, 2.25px 2.25px 0px 0px ${node.color}`,
        }}
      >
        <span
          className="size-[6.75px] shrink-0"
          style={{ backgroundColor: node.color }}
        />
        <span
          className="font-geist text-[11.25px] leading-normal font-semibold tracking-[-0.225px] whitespace-nowrap"
          style={{ color: node.color }}
        >
          {node.label}
        </span>
      </div>
    ))}
  </div>
);
