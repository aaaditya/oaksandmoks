"use client";

import { useScroll, useTransform, useSpring, motion } from "framer-motion";

/**
 * Fixed bottom-right coffee cup that fills up as the user scrolls.
 * Empty at the top of the page, full at the bottom.
 */
export function ScrollCup() {
  const { scrollYProgress } = useScroll();

  // Coffee fill: y=42 = empty (rect pushed below cup), y=0 = full
  const rawFillY = useTransform(scrollYProgress, [0.02, 0.96], [42, 0]);
  const fillY = useSpring(rawFillY, { stiffness: 55, damping: 18 });

  // Whole widget fades in after a tiny scroll, fades out near the very bottom
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.94, 1],
    [0, 1, 1, 0],
  );

  // Steam appears once the cup is roughly half-full
  const steamOpacity = useTransform(scrollYProgress, [0.48, 0.72], [0, 1]);

  // "Crema" ellipse at the liquid surface
  const cremaOpacity = useTransform(scrollYProgress, [0.7, 0.92], [0, 0.85]);

  const steamPaths = [
    "M14,32 Q9,24 15,16 Q21,8 14,2",
    "M20,32 Q27,22 19,14 Q13,6 21,0",
    "M27,32 Q22,24 28,16 Q34,8 26,2",
  ];

  return (
    <motion.div
      className="fixed bottom-7 right-7 z-50 hidden flex-col items-center gap-2 md:flex"
      style={{ opacity }}
      aria-hidden
    >
      {/* Steam wisps — emerge as cup fills */}
      <motion.div
        style={{ opacity: steamOpacity }}
        className="relative h-8 w-10 overflow-visible"
      >
        <svg
          viewBox="0 0 40 34"
          className="h-full w-full overflow-visible"
          fill="none"
        >
          {steamPaths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="rgba(111,78,55,0.55)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0, y: 4 }}
              animate={{
                pathLength: [0, 1, 1],
                opacity: [0, 0.55, 0],
                y: [4, 0, -12],
              }}
              transition={{
                duration: 2.4 + i * 0.5,
                delay: i * 0.75,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Cup SVG */}
      <svg width="38" height="52" viewBox="0 0 40 54" fill="none">
        <defs>
          {/* Clip to cup interior shape */}
          <clipPath id="cup-inner">
            <path d="M6,13 L8,43 L32,43 L34,13 Z" />
          </clipPath>
          <linearGradient id="coffee-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A07248" />
            <stop offset="100%" stopColor="#3E1E08" />
          </linearGradient>
        </defs>

        {/* Coffee fill — animates upward as you scroll */}
        <motion.rect
          x="0"
          y="0"
          width="40"
          height="54"
          fill="url(#coffee-grad)"
          clipPath="url(#cup-inner)"
          style={{ y: fillY }}
        />

        {/* Crema (lighter ellipse floating on surface) */}
        <motion.ellipse
          cx="20"
          cy="13"
          rx="13"
          ry="2.5"
          fill="#C49A6C"
          clipPath="url(#cup-inner)"
          style={{ y: fillY, opacity: cremaOpacity }}
        />

        {/* Cup body outline */}
        <path
          d="M6,13 L8,43 L32,43 L34,13"
          stroke="#6F4E37"
          strokeWidth="1.6"
          fill="none"
          strokeLinejoin="round"
        />

        {/* Cup rim */}
        <path
          d="M4,13 Q20,17 36,13"
          stroke="#6F4E37"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Saucer */}
        <path
          d="M2,46 Q20,51 38,46"
          stroke="#6F4E37"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M2,46 L8,43 M38,46 L32,43"
          stroke="#6F4E37"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Handle */}
        <path
          d="M34,20 Q45,20 45,28 Q45,36 34,36"
          stroke="#6F4E37"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <span className="font-manrope text-[8px] font-bold uppercase tracking-[0.32em] text-mocha/30">
        scroll
      </span>
    </motion.div>
  );
}
