"use client";

import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { useRef, useState } from "react";
import { appleSpring } from "@/lib/motion-variants";

const navLinks = [
  { href: "#coffees", label: "Shop" },
  { href: "#brew", label: "Brew" },
  { href: "#cafes", label: "Cafés" },
  { href: "#green", label: "Greenery" },
  { href: "#footer", label: "Contact" },
];

export default function Navbar() {
  const reduce = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (reduce) return;
    const prev = lastY.current;
    lastY.current = latest;
    if (latest < 48) {
      setHidden(false);
      return;
    }
    if (latest > prev && latest > 120) setHidden(true);
    else if (latest < prev) setHidden(false);
  });

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-charcoal/[0.05] bg-cream/75 backdrop-blur-2xl supports-[backdrop-filter]:bg-cream/65"
      initial={false}
      animate={{
        y: reduce ? 0 : hidden ? -100 : 0,
      }}
      transition={reduce ? { duration: 0 } : appleSpring}
    >
      <div className="section-container oaks-nav-row flex h-[3.25rem] items-center justify-between md:h-[3.5rem]">
        <motion.div
          whileHover={reduce ? undefined : { scale: 1.02 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Link
            href="/"
            className="heading-font text-lg tracking-tight text-charcoal transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage md:text-xl"
          >
            Oaks &amp; Moks
          </Link>
        </motion.div>

        <nav
          className="hidden items-center gap-0.5 md:flex"
          aria-label="Primary"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-4 py-2 text-[13px] font-medium text-charcoal/55 transition-colors duration-300 hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.div
            whileHover={reduce ? undefined : { scale: 1.03 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <Link
              href="#coffees"
              className="btn-primary hidden px-5 py-2 text-[13px] sm:inline-flex md:px-6 md:py-2.5"
            >
              Shop coffee
            </Link>
          </motion.div>
          <button
            type="button"
            className="rounded-full px-3 py-2 text-[13px] font-medium text-charcoal md:hidden"
            aria-label="Open menu"
            aria-expanded="false"
          >
            Menu
          </button>
        </div>
      </div>
    </motion.header>
  );
}
