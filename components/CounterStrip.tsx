"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Stat = {
  target: number;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { target: 12, label: "Origins Sourced" },
  { target: 340, label: "Batches Roasted" },
  { target: 5, label: "Years of Brewing" },
  { target: 28000, suffix: "+", label: "Cups Served" },
];

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const duration = 2200;

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    }

    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function CounterStrip() {
  return (
    <div className="border-y border-charcoal/[0.08] bg-parchment py-16 md:py-20">
      <div className="section-container">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <span className="heading-font text-[clamp(2.75rem,5vw,4.25rem)] font-medium leading-none tracking-[-0.03em] text-mocha">
                <AnimatedNumber target={stat.target} suffix={stat.suffix} />
              </span>
              <p className="font-manrope mt-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-charcoal/40">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
