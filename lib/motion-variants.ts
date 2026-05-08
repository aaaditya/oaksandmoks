import type { Variants } from "framer-motion";

/** Apple-like easing: fast start, gentle settle */
export const appleEase = [0.25, 0.1, 0.25, 1] as const;

export const appleSpring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 24,
  mass: 0.9,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: appleEase },
  },
};

export const fadeUpReduced: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.25 },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: appleEase },
  },
};

export const staggerItemReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};
