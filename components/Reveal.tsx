"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useMemo } from "react";
import { appleEase } from "@/lib/motion-variants";

type RevealProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  ...props
}: RevealProps) {
  const reduce = useReducedMotion();

  const variants = useMemo(
    () =>
      reduce
        ? {
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.2 } },
          }
        : {
            hidden: { opacity: 0, y: 32 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.85, ease: appleEase, delay },
            },
          },
    [reduce, delay]
  );

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px", amount: 0.2 }}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
}
