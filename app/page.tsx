"use client";

import { useRef } from "react";
import { Coffee, Globe2, Package, Sparkles } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import {
  appleEase,
  staggerContainer,
  appleSpring,
} from "@/lib/motion-variants";
import { brew, cafe, green, hero, product } from "@/lib/resource-images";

const products = [
  {
    title: "House Blend",
    subtitle: "Chocolate, Nuts",
    price: "₹699",
    image: product[0],
  },
  {
    title: "Ethiopia Sidamo",
    subtitle: "Floral, Citrus",
    price: "₹749",
    image: product[1],
  },
  {
    title: "Monsoon Malabar",
    subtitle: "Bold, Smoky",
    price: "₹699",
    image: product[2],
  },
  {
    title: "Espresso Blend",
    subtitle: "Dark Chocolate",
    price: "₹649",
    image: brew[2],
  },
];

const heroContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: appleEase },
  },
};

const valueProps = [
  {
    icon: Coffee,
    title: "Small batch roasted",
    desc: "Micro-lots, carefully profiled.",
  },
  {
    icon: Globe2,
    title: "Ethically sourced",
    desc: "Transparent farm relationships.",
  },
  {
    icon: Sparkles,
    title: "Brewed with intention",
    desc: "Barista-led craft in every cup.",
  },
  {
    icon: Package,
    title: "Freshly packed",
    desc: "Sealed at peak flavour.",
  },
] as const;

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const rawImageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const rawContentY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const scale = useSpring(rawScale, { stiffness: 90, damping: 28, mass: 0.4 });
  const imageY = useSpring(rawImageY, { stiffness: 90, damping: 28, mass: 0.4 });
  const contentY = useSpring(rawContentY, { stiffness: 90, damping: 28, mass: 0.4 });
  const contentOpacity = useSpring(rawOpacity, {
    stiffness: 80,
    damping: 35,
    mass: 0.35,
  });

  return (
    <main className="oaks-main overflow-x-hidden bg-cream">
      <Navbar />

      <section
        ref={heroRef}
        className="oaks-hero relative isolate flex min-h-[100dvh] items-end overflow-hidden bg-charcoal md:items-center"
        aria-labelledby="hero-heading"
      >
        {/* Photo layer: must stay z≥0 inside isolate — negative z-index hid image behind <main> cream */}
        <motion.div
          className="absolute inset-0 z-0"
          style={
            reduce
              ? undefined
              : {
                  scale,
                  y: imageY,
                }
          }
        >
          <img
            src={hero[0]}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          />
        </motion.div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-charcoal/88 via-charcoal/45 to-charcoal/25"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-charcoal/55 via-transparent to-charcoal/25"
          aria-hidden
        />

        <div className="oaks-hero-inner section-container relative z-10 w-full pb-20 pt-28 md:pb-28 md:pt-32">
          <motion.div
            style={
              reduce
                ? undefined
                : { y: contentY, opacity: contentOpacity }
            }
            className="max-w-3xl"
          >
            <motion.div
              variants={heroContainer}
              initial="hidden"
              animate="show"
              className="flex flex-col"
            >
              <motion.p
                variants={heroItem}
                className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/65 md:text-xs"
              >
                Jaipur · Specialty roastery
              </motion.p>
              <motion.h1
                id="hero-heading"
                variants={heroItem}
                className="heading-font mt-6 text-[clamp(2.5rem,8vw+1rem,6rem)] font-medium leading-[1.02] tracking-[-0.03em] text-white"
              >
                Slow coffee.
                <span className="mt-1 block text-white/88">
                  Thoughtfully crafted.
                </span>
              </motion.h1>
              <motion.p
                variants={heroItem}
                className="mt-8 max-w-md text-[17px] font-normal leading-[1.55] text-white/78 md:text-[19px] md:leading-[1.5]"
              >
                Small-batch roasting and transparent sourcing—cups brewed with
                intention, rooted in Jaipur&apos;s café culture.
              </motion.p>
              <motion.div
                variants={heroItem}
                className="oaks-hero-ctas mt-12 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <motion.a
                  href="#coffees"
                  className="btn-primary inline-flex justify-center text-center sm:min-w-[11rem]"
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  transition={appleSpring}
                >
                  Shop coffee
                </motion.a>
                <motion.a
                  href="#cafes"
                  className="btn-secondary-light inline-flex justify-center text-center sm:min-w-[11rem]"
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  transition={appleSpring}
                >
                  Visit our cafés
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none absolute bottom-8 left-1/2 hidden h-9 w-5 -translate-x-1/2 rounded-full border border-white/35 md:block"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: appleEase }}
          aria-hidden
        >
          <motion.span
            className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/80"
            animate={reduce ? undefined : { y: [0, 10, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </motion.div>
      </section>

      <section
        className="border-y border-charcoal/[0.08] bg-beige py-10 md:py-12"
        aria-label="What we stand for"
      >
        <div className="section-container">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-8">
            {valueProps.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="flex flex-col items-start text-left"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.65,
                  ease: appleEase,
                  delay: i * 0.05,
                }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage/15 text-sage">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <p className="font-manrope mt-4 text-[15px] font-semibold text-charcoal">
                  {title}
                </p>
                <p className="font-manrope mt-1.5 text-[13px] leading-relaxed text-charcoal/55">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t border-charcoal/[0.06] bg-cream py-12 md:py-16"
        aria-label="Roastery gallery"
      >
        <div className="section-container">
          <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.28em] text-charcoal/45">
            Roastery &amp; moments
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {[hero[1], hero[2], hero[3]].map((src, i) => (
              <motion.div
                key={src}
                className="overflow-hidden rounded-2xl bg-beige ring-1 ring-charcoal/[0.06] md:rounded-3xl"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.7,
                  ease: appleEase,
                  delay: i * 0.06,
                }}
              >
                <img
                  src={src}
                  alt={`Coffee scene ${i + 2}`}
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="coffees"
        className="relative border-t border-charcoal/[0.06] bg-cream py-24 md:py-36"
        aria-labelledby="coffees-heading"
      >
        <div className="section-container">
          <div className="oaks-coffees-head flex max-w-4xl flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16">
            <Reveal className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sage">
                The lineup
              </p>
              <h2
                id="coffees-heading"
                className="heading-font mt-5 text-[clamp(2rem,5vw+1rem,3.75rem)] font-medium leading-[1.06] tracking-[-0.03em] text-charcoal"
              >
                Explore our coffees.
              </h2>
              <p className="mt-6 text-[17px] leading-[1.6] text-charcoal/55 md:text-[19px]">
                Seasonal single origins and house blends, roasted for clarity
                and balance. Whole bean or ground for your brew method.
              </p>
            </Reveal>
            <Reveal className="shrink-0 self-start md:self-auto">
              <motion.a
                href="#footer"
                className="btn-ghost-dark inline-flex"
                whileHover={reduce ? undefined : { scale: 1.02 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                transition={appleSpring}
              >
                View full catalog
              </motion.a>
            </Reveal>
          </div>

          <motion.div
            className="oaks-grid-products mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px", amount: 0.12 }}
          >
            {products.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </motion.div>
        </div>
      </section>

      <section
        id="cafes"
        className="section-container pb-24 md:pb-36"
        aria-labelledby="cafes-heading"
      >
        <motion.div
          className="oaks-cafe-split overflow-hidden rounded-[1.75rem] bg-stone-warm shadow-soft ring-1 ring-charcoal/[0.05] md:grid md:grid-cols-2 md:rounded-[2rem] md:ring-charcoal/[0.04]"
          initial={reduce ? false : { opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px", amount: 0.2 }}
          transition={{ duration: 0.95, ease: appleEase }}
        >
          <motion.div
            className="grid grid-cols-2 gap-2 p-2 md:aspect-auto md:min-h-[32rem] md:gap-3 md:p-3"
            initial={reduce ? false : { scale: 1.02 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.15, ease: appleEase }}
          >
            {cafe.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`Café ambience ${i + 1}`}
                className="h-full min-h-[9rem] w-full rounded-xl object-cover md:min-h-[14rem] md:rounded-2xl"
              />
            ))}
          </motion.div>
          <div className="flex flex-col justify-center px-8 py-14 md:px-16 md:py-20 lg:pl-20 lg:pr-24">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sage">
                Visit us
              </p>
              <h2
                id="cafes-heading"
                className="heading-font mt-5 text-[clamp(2rem,4vw+1rem,3.25rem)] font-medium leading-[1.08] tracking-[-0.03em] text-charcoal"
              >
                A space to brew, connect &amp; unwind.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.6] text-charcoal/55 md:text-[18px]">
                Greenery-inspired interiors, natural light, and baristas who
                care about every pour. Find your nearest Oaks &amp; Moks.
              </p>
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.7, ease: appleEase }}
              >
                <motion.button
                  type="button"
                  className="btn-primary"
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  transition={appleSpring}
                >
                  Find a café
                </motion.button>
              </motion.div>
            </Reveal>
          </div>
        </motion.div>
      </section>

      <section
        id="brew"
        className="border-t border-charcoal/[0.06] bg-beige py-24 md:py-32"
        aria-labelledby="brew-heading"
      >
        <div className="section-container">
          <Reveal className="max-w-2xl">
            <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.28em] text-sage">
              Brewing shots
            </p>
            <h2
              id="brew-heading"
              className="heading-font mt-4 text-[clamp(2rem,4vw+1rem,3.25rem)] font-medium leading-[1.08] tracking-[-0.03em] text-charcoal"
            >
              Precision in every pour.
            </h2>
            <p className="mt-5 max-w-lg font-manrope text-[17px] leading-[1.6] text-charcoal/55">
              Gear, timing, and calm hands—the ritual behind every cup at Oaks
              &amp; Moks.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {brew.map((src, i) => (
              <motion.div
                key={src}
                className="overflow-hidden rounded-2xl bg-cream shadow-soft ring-1 ring-charcoal/[0.06] md:rounded-3xl"
                initial={reduce ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.75,
                  ease: appleEase,
                  delay: i * 0.08,
                }}
              >
                <img
                  src={src}
                  alt={`Brewing detail ${i + 1}`}
                  className="aspect-[4/5] w-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="green"
        className="relative overflow-hidden bg-olive py-24 text-white md:py-32"
        aria-labelledby="green-heading"
      >
        <div className="section-container relative z-10">
          <Reveal className="max-w-2xl">
            <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
              Greenery
            </p>
            <h2
              id="green-heading"
              className="heading-font mt-4 text-[clamp(2rem,4vw+1rem,3.25rem)] font-medium leading-[1.08] tracking-[-0.03em]"
            >
              Calm, leafy, sun-lit spaces.
            </h2>
            <p className="mt-5 max-w-lg font-manrope text-[17px] leading-[1.6] text-white/75">
              The same quiet energy we bring into our cafés—inviting you to
              slow down.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-6">
            {green.map((src, i) => (
              <motion.div
                key={src}
                className="group relative overflow-hidden rounded-2xl ring-1 ring-white/15 md:rounded-3xl"
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  ease: appleEase,
                  delay: i * 0.07,
                }}
              >
                <img
                  src={src}
                  alt={`Greenery ${i + 1}`}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent"
                  aria-hidden
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer
        id="footer"
        className="oaks-footer border-t border-white/10 bg-olive text-white"
      >
        <div className="section-container py-20 md:py-24">
          <motion.div
            className="oaks-footer-grid grid gap-14 md:grid-cols-12 md:gap-10"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.85, ease: appleEase }}
          >
            <div className="md:col-span-5">
              <p className="heading-font text-[clamp(1.75rem,3vw,2.5rem)] font-medium tracking-tight">
                Oaks &amp; Moks
              </p>
              <p className="mt-5 max-w-sm text-[15px] leading-[1.65] text-white/60">
                Premium specialty coffee—roasted with care in Jaipur for
                everyone who believes a good cup can slow the day down.
              </p>
            </div>
            <div className="md:col-span-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Navigate
              </p>
              <ul className="mt-5 flex flex-col gap-3.5 text-[15px] text-white/72">
                <li>
                  <a
                    href="#coffees"
                    className="transition-colors duration-300 hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="#coffees"
                    className="transition-colors duration-300 hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Subscriptions
                  </a>
                </li>
                <li>
                  <a
                    href="#cafes"
                    className="transition-colors duration-300 hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Our cafés
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:col-span-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Social
              </p>
              <p className="mt-5 text-[15px] text-white/72">
                <a
                  href="https://instagram.com"
                  className="transition-colors duration-300 hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  @oaksandmoksindia
                </a>
              </p>
              <p className="mt-8 text-[13px] text-white/40">
                © {new Date().getFullYear()} Oaks &amp; Moks. All rights
                reserved.
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}
