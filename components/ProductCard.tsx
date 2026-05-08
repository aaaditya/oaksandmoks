"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  staggerItem,
  staggerItemReduced,
  appleEase,
} from "@/lib/motion-variants";

type ProductCardProps = {
  title: string;
  subtitle: string;
  price: string;
  image: string;
};

export default function ProductCard({
  title,
  subtitle,
  price,
  image,
}: ProductCardProps) {
  const reduce = useReducedMotion();
  const variants = reduce ? staggerItemReduced : staggerItem;

  return (
    <motion.article
      className="group flex flex-col"
      variants={variants}
      whileHover={
        reduce
          ? undefined
          : { y: -6, transition: { duration: 0.45, ease: appleEase } }
      }
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.35rem] bg-stone-warm shadow-soft ring-1 ring-charcoal/[0.05] transition-shadow duration-500 group-hover:shadow-card-hover group-hover:ring-charcoal/[0.07]">
        <motion.img
          src={image}
          alt={`${title} — specialty coffee`}
          className="h-full w-full object-cover"
          whileHover={reduce ? undefined : { scale: 1.06 }}
          transition={{ duration: 0.65, ease: appleEase }}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden
        />
      </div>
      <div className="mt-6 flex flex-1 flex-col">
        <h3 className="heading-font text-xl font-medium tracking-tight text-charcoal md:text-[1.35rem]">
          {title}
        </h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-charcoal/50">
          {subtitle}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-charcoal/[0.06] pt-5">
          <span className="text-[17px] font-semibold tabular-nums tracking-tight text-sage">
            {price}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal/35 transition-colors duration-300 group-hover:text-sage">
            View
          </span>
        </div>
      </div>
    </motion.article>
  );
}
