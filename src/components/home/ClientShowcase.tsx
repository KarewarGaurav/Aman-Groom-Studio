"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionWrapper } from "@/components/common/SectionWrapper";

const stats = [
  { value: 500, suffix: "+", label: "Luxury Weddings", sub: "styled across India" },
  { value: 8,   suffix: "+", label: "Years of Excellence", sub: "Delhi's premier atelier" },
  { value: 98,  suffix: "%", label: "Client Satisfaction", sub: "based on feedback" },
  { value: 120, suffix: "+", label: "Hours per Bespoke", sub: "hand craftsmanship" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  if (inView) motionVal.set(value);

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
    </span>
  );
}

export function ClientShowcase() {
  return (
    <SectionWrapper
      className="border-y border-gold/15 bg-gradient-to-r from-wine/20 via-charcoal to-burgundy/20"
      label="By the Numbers"
      title="The Aman Groom Legacy"
      align="center"
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="glass-panel corner-marks p-8 text-center"
          >
            <p className="font-display text-4xl text-gradient-gold md:text-5xl">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-3 font-display text-lg text-ivory">{s.label}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-champagne/50">{s.sub}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
