"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";
import { BRAND } from "@/lib/constants";

const MARQUEE_WORDS = [
  "Luxury Couture",
  "·",
  "Bespoke Tailoring",
  "·",
  "Royal Sherwanis",
  "·",
  "Imperial Tuxedos",
  "·",
  "Indo-Western",
  "·",
  "New Delhi Atelier",
  "·",
];

function Particles() {
  const dots = [
    { left: "12%", top: "18%", size: 2, dur: 5 },
    { left: "25%", top: "60%", size: 1, dur: 6 },
    { left: "40%", top: "30%", size: 3, dur: 4 },
    { left: "55%", top: "72%", size: 1, dur: 7 },
    { left: "68%", top: "22%", size: 2, dur: 5 },
    { left: "78%", top: "55%", size: 1, dur: 6 },
    { left: "88%", top: "38%", size: 2, dur: 4.5 },
    { left: "15%", top: "82%", size: 1, dur: 5.5 },
    { left: "32%", top: "45%", size: 2, dur: 6.5 },
    { left: "72%", top: "78%", size: 1, dur: 5 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold"
          style={{ left: d.left, top: d.top, width: d.size, height: d.size }}
          animate={{ opacity: [0.15, 0.7, 0.15], y: [0, -16, 0] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: i * 0.35 }}
        />
      ))}
      {/* Larger soft glows */}
      <motion.div
        className="absolute left-[60%] top-[20%] h-64 w-64 orb bg-burgundy/20"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute left-[10%] top-[50%] h-48 w-48 orb bg-gold/10"
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />
    </div>
  );
}

function MarqueeStrip() {
  const words = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-gold/15 bg-charcoal/60 backdrop-blur-sm py-3">
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite" }}
      >
        {words.map((w, i) => (
          <span
            key={i}
            className={
              w === "·"
                ? "text-gold/60"
                : "font-body text-[10px] uppercase tracking-[0.28em] text-champagne/60"
            }
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
      className="absolute bottom-16 right-8 z-20 hidden flex-col items-center gap-2 md:flex"
      aria-hidden
    >
      <span className="editorial-label rotate-90 origin-center text-champagne/40">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="flex h-8 w-px flex-col items-center"
      >
        <div className="h-6 w-px bg-gradient-to-b from-gold/60 to-transparent" />
        <ArrowDown className="h-3 w-3 text-gold/60 -mt-1" />
      </motion.div>
    </motion.div>
  );
}

const stagger = {
  label:   { delay: 0.15, duration: 0.7 },
  divider: { delay: 0.30, duration: 0.8 },
  heading: { delay: 0.42, duration: 1.0 },
  sub:     { delay: 0.60, duration: 0.8 },
  ctas:    { delay: 0.76, duration: 0.7 },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image + overlays */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt="Luxury groom couture editorial"
          fill
          priority
          className="object-cover object-[72%_center] md:object-[68%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-charcoal/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-transparent to-transparent" />
      </div>

      <div className="grain-overlay absolute inset-0 opacity-50" aria-hidden />
      <Particles />
      <ScrollIndicator />
      <MarqueeStrip />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-4 pb-24 pt-32 md:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-7xl">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger.label}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-gold/60" />
            <p className="editorial-label">{BRAND.tagline}</p>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...stagger.heading, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl font-display text-5xl font-light leading-[1.04] text-ivory md:text-7xl lg:text-8xl"
          >
            Crafted for the
            <br />
            <em className="text-gradient-gold not-italic">Modern Maharaja</em>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ ...stagger.divider, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 h-px w-24 origin-left bg-gradient-to-r from-gold to-transparent"
          />

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger.sub}
            className="mt-6 max-w-md font-body text-base text-champagne/85 md:text-lg"
          >
            Bespoke sherwanis, imperial tuxedos, and couture styling for the
            groom who defines his era.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger.ctas}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button asChild size="lg" variant="gold">
              <Link href="/shop">Explore Collection</Link>
            </Button>
            <Button asChild size="lg" variant="luxury">
              <Link href="/booking">Book Styling Session</Link>
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-14 flex flex-wrap gap-6 border-t border-white/10 pt-8"
          >
            {[
              ["500+", "Weddings Styled"],
              ["Since 2018", "Delhi's Premier Atelier"],
              ["Bespoke", "Lifetime Alterations"],
            ].map(([stat, desc]) => (
              <div key={stat}>
                <p className="font-display text-xl text-gold">{stat}</p>
                <p className="text-[11px] uppercase tracking-widest text-champagne/50">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
