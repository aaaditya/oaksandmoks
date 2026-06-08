"use client";

import { motion } from "framer-motion";

const wisps = [
  {
    // left wisp — slow, gentle S-curve
    d: "M20,60 Q12,46 20,32 Q30,18 20,6 Q14,0 18,-6",
    delay: 0,
    duration: 3.2,
    stroke: "rgba(255,255,255,0.18)",
  },
  {
    // centre wisp — tallest, most prominent
    d: "M40,60 Q50,44 38,30 Q28,16 40,4 Q46,-2 42,-10",
    delay: 1.05,
    duration: 2.9,
    stroke: "rgba(255,255,255,0.24)",
  },
  {
    // right wisp — offset, slightly shorter
    d: "M62,60 Q70,46 60,34 Q52,22 64,10 Q70,4 66,-2",
    delay: 2.1,
    duration: 3.5,
    stroke: "rgba(255,255,255,0.16)",
  },
];

/**
 * Three animated SVG steam wisps that rise continuously.
 * Positioned at the bottom of the hero section.
 */
export function HeroSteam() {
  return (
    <div
      className="pointer-events-none absolute bottom-28 left-1/2 -translate-x-1/2 md:bottom-36"
      aria-hidden
    >
      <svg
        width="88"
        height="72"
        viewBox="0 0 80 72"
        fill="none"
        className="overflow-visible"
      >
        {wisps.map((w, i) => (
          <motion.path
            key={i}
            d={w.d}
            stroke={w.stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0, y: 8 }}
            animate={{
              pathLength: [0, 0.7, 1, 1],
              opacity: [0, 0.55, 0.3, 0],
              y: [8, 0, -14, -28],
            }}
            transition={{
              duration: w.duration,
              delay: w.delay,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94],
              times: [0, 0.35, 0.75, 1],
            }}
          />
        ))}
      </svg>
    </div>
  );
}
