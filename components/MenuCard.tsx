"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";

type MenuCardProps = {
  type: string;
  name: string;
  desc: string;
  price: string;
  variants?: Variants;
};

/**
 * Menu card with 3D tilt-on-hover using mouse position tracking.
 * Each card tilts ±6° in both axes, with a springy feel.
 * A gloss sheen slides across the face of the card on hover.
 */
export function MenuCard({ type, name, desc, price, variants }: MenuCardProps) {
  const ref = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Map mouse position (-0.5 to +0.5) to rotation degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  // Spring-smoothed rotation for natural feel
  const rxSpring = useSpring(rotateX, { stiffness: 220, damping: 26 });
  const rySpring = useSpring(rotateY, { stiffness: 220, damping: 26 });

  // Gloss sheen: horizontal position tracks mouse X
  const glossX = useTransform(mouseX, [-0.5, 0.5], ["-60%", "160%"]);
  const glossOpacity = useTransform(
    mouseX,
    [-0.5, -0.2, 0, 0.2, 0.5],
    [0, 0.12, 0, 0.12, 0],
  );

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.article
      ref={ref}
      className="menu-card group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-parchment p-7 ring-1 ring-charcoal/[0.06] shadow-soft transition-shadow duration-500 hover:shadow-card"
      variants={variants}
      style={{
        rotateX: rxSpring,
        rotateY: rySpring,
        transformPerspective: 900,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top accent line that sweeps in on hover */}
      <div className="menu-card-accent" aria-hidden />

      {/* Gloss sheen overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background: `linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)`,
          x: glossX,
          opacity: glossOpacity,
        }}
        aria-hidden
      />

      <div>
        <span className="font-manrope inline-block rounded-full bg-sage/10 px-3 py-1 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-sage">
          {type}
        </span>
        <h3
          className="heading-font mt-4 font-medium leading-tight tracking-tight text-charcoal"
          style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.6rem)" }}
        >
          {name}
        </h3>
        <p className="font-manrope mt-3 text-[13.5px] leading-[1.7] text-charcoal/55">
          {desc}
        </p>
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-charcoal/[0.07] pt-5">
        <span className="heading-font text-[1.65rem] font-medium leading-none tracking-tight text-mocha">
          {price}
        </span>
        <span className="font-manrope text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/28 transition-colors duration-300 group-hover:text-sage">
          Order ↗
        </span>
      </div>
    </motion.article>
  );
}
