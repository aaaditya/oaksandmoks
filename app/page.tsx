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
import { CounterStrip } from "@/components/CounterStrip";
import { appleEase, staggerContainer, appleSpring } from "@/lib/motion-variants";
import { brew, cafe, green, hero, product } from "@/lib/resource-images";

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const products = [
  { title: "House Blend", subtitle: "Chocolate · Nuts", price: "₹699", image: product[0] },
  { title: "Ethiopia Sidamo", subtitle: "Floral · Citrus", price: "₹749", image: product[1] },
  { title: "Monsoon Malabar", subtitle: "Bold · Smoky", price: "₹699", image: product[2] },
  { title: "Espresso Blend", subtitle: "Dark Chocolate", price: "₹649", image: brew[2] },
];

const menuItems = [
  {
    type: "House Roast",
    name: "The Oak Blend",
    desc: "Our signature espresso. Dark, smoky, with a whisper of oakwood and a long caramel finish.",
    price: "₹180",
  },
  {
    type: "Single Origin",
    name: "Moks Pour‑Over",
    desc: "Ethiopian Yirgacheffe, light-roasted to keep its bright florals and stone-fruit clarity alive.",
    price: "₹240",
  },
  {
    type: "Cold Brew",
    name: "Night Barrel",
    desc: "18-hour cold steep in our dark roast. Velvety, bold chocolate notes. Zero heat, maximum soul.",
    price: "₹220",
  },
  {
    type: "Espresso",
    name: "The Cortado",
    desc: "Equal parts espresso and steamed milk. The balance we have chased since day one.",
    price: "₹160",
  },
  {
    type: "Roastery Special",
    name: "First Crack",
    desc: "A rotating single-origin, fresh off our drum. Ask us what's popping today.",
    price: "₹260",
  },
  {
    type: "Café Staple",
    name: "Forest Chai",
    desc: "House-spiced masala chai. Because even the oaks deserve something warm and spiced.",
    price: "₹140",
  },
];

const marqueeItems1 = [
  "Freshly Roasted",
  "Small Batch",
  "Oaks & Moks",
  "Single Origin",
  "Drum Roasted",
  "Handcrafted",
  "Est. 2019",
  "Jaipur",
];

const marqueeItems2 = [
  "First Crack",
  "Caramelisation",
  "Maillard Reaction",
  "Degassing",
  "Cupping Notes",
  "Origin Forward",
  "Small Batch",
];

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

/* ─── Animation variants ────────────────────────────────────────────────────── */

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: appleEase } },
};

const menuCardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: appleEase } },
};

/* ─── Page ──────────────────────────────────────────────────────────────────── */

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
  const contentOpacity = useSpring(rawOpacity, { stiffness: 80, damping: 35, mass: 0.35 });

  return (
    <main className="oaks-main overflow-x-hidden bg-cream">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="oaks-hero relative isolate flex min-h-[100dvh] items-end overflow-hidden bg-charcoal md:items-center"
        aria-labelledby="hero-heading"
      >
        {/* Background photo with parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={reduce ? undefined : { scale, y: imageY }}
        >
          <img
            src={hero[0]}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-charcoal/92 via-charcoal/55 to-charcoal/20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/20"
          aria-hidden
        />

        {/* Hero content */}
        <div className="oaks-hero-inner section-container relative z-10 w-full pb-20 pt-28 md:pb-28 md:pt-32">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-[min(50rem,95%)] bg-gradient-to-r from-charcoal/60 via-charcoal/20 to-transparent"
            aria-hidden
          />
          <motion.div
            style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
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
                className="font-manrope text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60 md:text-xs"
              >
                Est. 2019 &nbsp;·&nbsp; Jaipur &nbsp;·&nbsp; Now Roasting
              </motion.p>

              <motion.h1
                id="hero-heading"
                variants={heroItem}
                className="heading-font mt-6 font-medium text-white"
                style={{
                  fontSize: "clamp(3rem, 9vw + 0.5rem, 6.5rem)",
                  lineHeight: "1.02",
                  letterSpacing: "-0.03em",
                }}
              >
                Slow coffee.
                <br />
                <em className="italic text-white/85">Thoughtfully crafted.</em>
              </motion.h1>

              <motion.p
                variants={heroItem}
                className="font-manrope mt-8 max-w-md text-[17px] font-normal leading-[1.6] text-white/78 md:text-[19px]"
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

        {/* Scroll indicator */}
        <motion.div
          className="pointer-events-none absolute bottom-8 left-1/2 hidden h-9 w-5 -translate-x-1/2 rounded-full border border-white/30 md:block"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: appleEase }}
          aria-hidden
        >
          <motion.span
            className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/75"
            animate={reduce ? undefined : { y: [0, 10, 0] }}
            transition={
              reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </motion.div>
      </section>

      {/* ── MARQUEE 1 (Charcoal) ─────────────────────────────────────────────── */}
      <div className="overflow-hidden bg-charcoal py-[14px]" aria-hidden>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems1, ...marqueeItems1].map((item, i) => (
            <span
              key={i}
              className="font-manrope mx-8 inline-flex shrink-0 items-center gap-8 text-[10.5px] font-semibold uppercase tracking-[0.26em] text-white/45"
            >
              {item}
              <span className="text-sage/50">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────────── */}
      <section
        className="border-y border-charcoal/[0.08] bg-beige py-12 md:py-14"
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
                transition={{ duration: 0.65, ease: appleEase, delay: i * 0.06 }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage/12 text-sage">
                  <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                </div>
                <p className="font-manrope mt-4 text-[15px] font-semibold text-charcoal">
                  {title}
                </p>
                <p className="font-manrope mt-1.5 text-[13px] leading-relaxed text-charcoal/52">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROASTERY STORY ───────────────────────────────────────────────────── */}
      <section
        id="roasting"
        className="overflow-hidden bg-cream py-24 md:py-36"
        aria-labelledby="roastery-heading"
      >
        <div className="section-container">
          <div className="grid items-center gap-16 md:grid-cols-2 md:gap-12 lg:gap-24">
            {/* Text column */}
            <Reveal>
              <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">
                The Roastery
              </p>
              <h2
                id="roastery-heading"
                className="heading-font mt-5 font-medium tracking-[-0.03em] text-charcoal"
                style={{
                  fontSize: "clamp(2.25rem, 5vw + 0.75rem, 4.25rem)",
                  lineHeight: "1.06",
                }}
              >
                We now roast
                <br />
                <em className="italic text-mocha">our own.</em>
              </h2>
              <p className="font-manrope mt-7 max-w-lg text-[17px] leading-[1.75] text-charcoal/58">
                From raw green bean to your morning cup — we&apos;ve brought the
                entire journey under our roof. Our drum roaster works its loud,
                smoky, glorious magic right here. Every batch is ours, every
                profile dialled by hand.
              </p>

              {/* Bean journey visual */}
              <div className="mt-10 flex items-center gap-5">
                <div className="flex flex-col items-center gap-2.5">
                  <div
                    className="h-11 w-7 rounded-full shadow-sm ring-1 ring-charcoal/10"
                    style={{
                      background:
                        "radial-gradient(circle at 38% 32%, #86efac, #15803d)",
                    }}
                    aria-hidden
                  />
                  <p className="font-manrope text-[9.5px] font-semibold uppercase tracking-[0.24em] text-charcoal/40">
                    Raw
                  </p>
                </div>
                <span className="text-xl text-charcoal/25" aria-hidden>
                  →
                </span>
                <div className="flex flex-col items-center gap-2.5">
                  <div
                    className="h-11 w-7 rounded-full shadow-sm ring-1 ring-charcoal/10"
                    style={{
                      background:
                        "radial-gradient(circle at 38% 32%, #b45309, #1c0a01)",
                    }}
                    aria-hidden
                  />
                  <p className="font-manrope text-[9.5px] font-semibold uppercase tracking-[0.24em] text-charcoal/40">
                    Roasted
                  </p>
                </div>
                <span className="text-xl text-charcoal/25" aria-hidden>
                  →
                </span>
                <div className="flex flex-col items-center gap-2.5">
                  {/* Coffee cup icon */}
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-charcoal/10"
                    style={{ background: "#ECE8E1" }}
                    aria-hidden
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5 text-mocha"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
                      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                      <line x1="6" y1="2" x2="6" y2="4" />
                      <line x1="10" y1="2" x2="10" y2="4" />
                      <line x1="14" y1="2" x2="14" y2="4" />
                    </svg>
                  </div>
                  <p className="font-manrope text-[9.5px] font-semibold uppercase tracking-[0.24em] text-charcoal/40">
                    Brewed
                  </p>
                </div>
              </div>

              <motion.a
                href="#brew"
                className="btn-ghost-dark mt-10 inline-flex"
                whileHover={reduce ? undefined : { scale: 1.02 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                transition={appleSpring}
              >
                See the process
              </motion.a>
            </Reveal>

            {/* Photo column */}
            <motion.div
              className="relative"
              initial={reduce ? false : { opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: appleEase }}
            >
              <div className="overflow-hidden rounded-[1.75rem] shadow-card ring-1 ring-charcoal/[0.06]">
                <img
                  src={hero[1]}
                  alt="Coffee being roasted at Oaks & Moks"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              {/* Floating stat card */}
              <motion.div
                className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-cream px-7 py-5 shadow-float ring-1 ring-charcoal/[0.07] md:block"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.75, ease: appleEase }}
              >
                <p
                  className="heading-font font-medium leading-none text-mocha"
                  style={{ fontSize: "clamp(2.25rem, 4vw, 3rem)" }}
                >
                  340
                </p>
                <p className="font-manrope mt-1.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-charcoal/40">
                  Batches
                  <br />
                  Roasted
                </p>
              </motion.div>
              {/* Small accent image */}
              <motion.div
                className="absolute -right-5 -top-5 hidden h-28 w-28 overflow-hidden rounded-2xl shadow-card ring-1 ring-charcoal/[0.06] md:block lg:h-36 lg:w-36"
                initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.75, ease: appleEase }}
              >
                <img
                  src={brew[0]}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GALLERY STRIP ────────────────────────────────────────────────────── */}
      <section
        className="border-t border-charcoal/[0.06] bg-beige py-12 md:py-16"
        aria-label="Roastery gallery"
      >
        <div className="section-container">
          <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.28em] text-charcoal/40">
            Roastery &amp; moments
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {[hero[2], hero[3], brew[1]].map((src, i) => (
              <motion.div
                key={src}
                className="overflow-hidden rounded-2xl bg-stone-warm ring-1 ring-charcoal/[0.06] md:rounded-3xl"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: appleEase, delay: i * 0.07 }}
              >
                <img
                  src={src}
                  alt={`Coffee scene ${i + 1}`}
                  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENU / OFFERINGS ─────────────────────────────────────────────────── */}
      <section
        id="menu"
        className="border-t border-charcoal/[0.06] bg-cream py-24 md:py-36"
        aria-labelledby="menu-heading"
      >
        <div className="section-container">
          {/* Header */}
          <div className="mb-14 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">
                The Menu
              </p>
              <h2
                id="menu-heading"
                className="heading-font mt-4 font-medium tracking-[-0.03em] text-charcoal"
                style={{
                  fontSize: "clamp(2.25rem, 5vw + 0.5rem, 3.75rem)",
                  lineHeight: "1.06",
                }}
              >
                What&apos;s{" "}
                <em className="italic text-mocha">brewing.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="font-manrope max-w-xs text-[15px] leading-[1.65] text-charcoal/50">
                Signature offerings, crafted every morning. Ask us what&apos;s on
                the drum today.
              </p>
            </Reveal>
          </div>

          {/* Cards */}
          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px", amount: 0.08 }}
          >
            {menuItems.map((item) => (
              <motion.article
                key={item.name}
                className="menu-card group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-parchment p-7 ring-1 ring-charcoal/[0.06] shadow-soft transition-shadow duration-500 hover:shadow-card"
                variants={menuCardVariants}
                whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.35, ease: appleEase } }}
              >
                {/* Top accent line */}
                <div className="menu-card-accent" aria-hidden />

                <div>
                  <span className="font-manrope inline-block rounded-full bg-sage/10 px-3 py-1 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-sage">
                    {item.type}
                  </span>
                  <h3
                    className="heading-font mt-4 font-medium leading-tight tracking-tight text-charcoal"
                    style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.6rem)" }}
                  >
                    {item.name}
                  </h3>
                  <p className="font-manrope mt-3 text-[13.5px] leading-[1.7] text-charcoal/55">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-charcoal/[0.07] pt-5">
                  <span className="heading-font text-[1.65rem] font-medium leading-none tracking-tight text-mocha">
                    {item.price}
                  </span>
                  <span className="font-manrope text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/28 transition-colors duration-300 group-hover:text-sage">
                    Order ↗
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE 2 (Olive) ────────────────────────────────────────────────── */}
      <div className="overflow-hidden bg-olive py-[14px]" aria-hidden>
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {[...marqueeItems2, ...marqueeItems2].map((item, i) => (
            <span
              key={i}
              className="font-manrope mx-8 inline-flex shrink-0 items-center gap-8 text-[10.5px] font-semibold uppercase tracking-[0.26em] text-white/45"
            >
              {item}
              <span className="text-white/25">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── PULL QUOTE ───────────────────────────────────────────────────────── */}
      <section
        className="bg-charcoal px-6 py-28 text-center md:py-40"
        aria-label="Philosophy"
      >
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <span
              className="heading-font block font-medium leading-none text-sage/30 select-none"
              style={{ fontSize: "clamp(5rem, 12vw, 9rem)", lineHeight: 0.8 }}
              aria-hidden
            >
              &ldquo;
            </span>
            <p
              className="heading-font -mt-2 font-medium italic leading-[1.3] text-white md:-mt-4"
              style={{ fontSize: "clamp(1.65rem, 3.5vw + 0.5rem, 3.25rem)" }}
            >
              Coffee is a language in itself.
              <br />
              We just learned a whole new dialect.
            </p>
            <p className="font-manrope mt-8 text-[11.5px] font-semibold uppercase tracking-[0.3em] text-sage/65">
              — The Folks at Oaks &amp; Moks
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── COUNTER STRIP ────────────────────────────────────────────────────── */}
      <CounterStrip />

      {/* ── SHOP COFFEES ─────────────────────────────────────────────────────── */}
      <section
        id="coffees"
        className="relative border-t border-charcoal/[0.06] bg-cream py-24 md:py-36"
        aria-labelledby="coffees-heading"
      >
        <div className="section-container">
          <div className="oaks-coffees-head flex max-w-4xl flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16">
            <Reveal className="max-w-xl">
              <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">
                The lineup
              </p>
              <h2
                id="coffees-heading"
                className="heading-font mt-5 font-medium tracking-[-0.03em] text-charcoal"
                style={{
                  fontSize: "clamp(2rem, 5vw + 0.5rem, 3.75rem)",
                  lineHeight: "1.06",
                }}
              >
                Explore our coffees.
              </h2>
              <p className="font-manrope mt-6 text-[17px] leading-[1.6] text-charcoal/55 md:text-[19px]">
                Seasonal single origins and house blends, roasted for clarity and
                balance.
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
            {products.map((p) => (
              <ProductCard key={p.title} {...p} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CAFÉS ────────────────────────────────────────────────────────────── */}
      <section
        id="cafes"
        className="section-container pb-24 md:pb-36"
        aria-labelledby="cafes-heading"
      >
        <motion.div
          className="oaks-cafe-split relative isolate overflow-hidden rounded-[1.75rem] bg-stone-warm shadow-soft ring-1 ring-charcoal/[0.05] md:grid md:grid-cols-2 md:rounded-[2rem]"
          initial={reduce ? false : { opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px", amount: 0.2 }}
          transition={{ duration: 0.95, ease: appleEase }}
        >
          {/* Photo grid */}
          <motion.div
            className="relative z-0 grid aspect-[16/11] grid-cols-2 gap-2 overflow-hidden p-2 md:aspect-auto md:min-h-[32rem] md:gap-3 md:p-3"
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
                className="h-full w-full rounded-xl object-cover md:min-h-[14rem] md:rounded-2xl"
              />
            ))}
          </motion.div>

          {/* Text */}
          <div className="relative z-10 flex flex-col justify-center px-8 py-14 md:px-14 md:py-20 lg:pl-18 lg:pr-20">
            <Reveal>
              <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">
                Visit us
              </p>
              <h2
                id="cafes-heading"
                className="heading-font mt-5 font-medium tracking-[-0.03em] text-charcoal"
                style={{
                  fontSize: "clamp(2rem, 4vw + 0.5rem, 3.25rem)",
                  lineHeight: "1.08",
                }}
              >
                A space to brew,
                <br />
                connect &amp; unwind.
              </h2>
              <p className="font-manrope mt-6 max-w-sm text-[17px] leading-[1.65] text-charcoal/55">
                Greenery-inspired interiors, natural light, and baristas who care
                about every pour. Find your nearest Oaks &amp; Moks.
              </p>
              <motion.div
                className="mt-10"
                initial={reduce ? false : { opacity: 0, y: 16 }}
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

      {/* ── BREW ─────────────────────────────────────────────────────────────── */}
      <section
        id="brew"
        className="border-t border-charcoal/[0.06] bg-beige py-24 md:py-32"
        aria-labelledby="brew-heading"
      >
        <div className="section-container">
          <Reveal className="max-w-2xl">
            <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.3em] text-sage">
              Brewing shots
            </p>
            <h2
              id="brew-heading"
              className="heading-font mt-4 font-medium tracking-[-0.03em] text-charcoal"
              style={{
                fontSize: "clamp(2rem, 4vw + 0.5rem, 3.25rem)",
                lineHeight: "1.08",
              }}
            >
              Precision in every pour.
            </h2>
            <p className="font-manrope mt-5 max-w-lg text-[17px] leading-[1.65] text-charcoal/55">
              Gear, timing, and calm hands — the ritual behind every cup at Oaks
              &amp; Moks.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {brew.map((src, i) => (
              <motion.div
                key={src}
                className="group overflow-hidden rounded-2xl bg-cream shadow-soft ring-1 ring-charcoal/[0.06] md:rounded-3xl"
                initial={reduce ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75, ease: appleEase, delay: i * 0.08 }}
              >
                <div className="overflow-hidden">
                  <img
                    src={src}
                    alt={`Brewing detail ${i + 1}`}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GREENERY ─────────────────────────────────────────────────────────── */}
      <section
        id="green"
        className="relative overflow-hidden bg-olive py-24 text-white md:py-32"
        aria-labelledby="green-heading"
      >
        <div className="section-container relative z-10">
          <Reveal className="max-w-2xl">
            <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.3em] text-white/48">
              Greenery
            </p>
            <h2
              id="green-heading"
              className="heading-font mt-4 font-medium tracking-[-0.03em]"
              style={{
                fontSize: "clamp(2rem, 4vw + 0.5rem, 3.25rem)",
                lineHeight: "1.08",
              }}
            >
              Calm, leafy, sun-lit spaces.
            </h2>
            <p className="font-manrope mt-5 max-w-lg text-[17px] leading-[1.65] text-white/68">
              The same quiet energy we bring into our cafés — inviting you to
              slow down.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-6">
            {green.map((src, i) => (
              <motion.div
                key={src}
                className="group relative overflow-hidden rounded-2xl ring-1 ring-white/12 md:rounded-3xl"
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: appleEase, delay: i * 0.07 }}
              >
                <img
                  src={src}
                  alt={`Greenery ${i + 1}`}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/45 to-transparent"
                  aria-hidden
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer
        id="footer"
        className="oaks-footer border-t border-white/10 bg-olive-dark text-white"
        style={{ backgroundColor: "#3D5035" }}
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
              <p
                className="heading-font font-medium tracking-tight"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                Oaks &amp; Moks
              </p>
              <p className="font-manrope mt-5 max-w-sm text-[15px] leading-[1.65] text-white/58">
                Premium specialty coffee — roasted with care in Jaipur for
                everyone who believes a good cup can slow the day down.
              </p>
            </div>
            <div className="md:col-span-3">
              <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Navigate
              </p>
              <ul className="mt-5 flex flex-col gap-3.5 text-[15px] text-white/68">
                {[
                  { href: "#menu", label: "Menu" },
                  { href: "#coffees", label: "Shop" },
                  { href: "#cafes", label: "Our cafés" },
                  { href: "#brew", label: "Brew guide" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="transition-colors duration-300 hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4">
              <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Follow along
              </p>
              <p className="mt-5 text-[15px] text-white/68">
                <a
                  href="https://instagram.com/oaksandmoksindia"
                  className="transition-colors duration-300 hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  @oaksandmoksindia
                </a>
              </p>
              <p className="font-manrope mt-8 text-[13px] text-white/35">
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
