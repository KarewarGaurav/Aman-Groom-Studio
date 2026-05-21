"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Palette, Scissors, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LuxuryImage } from "@/components/common/LuxuryImage";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";

const steps: {
  step: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  accent: string;
}[] = [
  {
    step: "01",
    icon: Palette,
    title: "Concept & Mood Board",
    desc: "Private style direction — your vision, wedding palette, and ceremonial timeline mapped with our director.",
    accent: "from-burgundy/50 to-wine/25",
  },
  {
    step: "02",
    icon: Scissors,
    title: "Fabric & Silhouette",
    desc: "Exclusive atelier visit with our master tailor — curated swatches, embroidery motifs, and form.",
    accent: "from-gold/25 to-bronze/15",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "Fittings & Couture Finish",
    desc: "Precision fittings and hand-finished details until every line drapes flawlessly on your day.",
    accent: "from-wine/45 to-burgundy/20",
  },
];

const highlights = [
  { value: "3", suffix: "", label: "Private consultations", sub: "in our Delhi atelier" },
  { value: "120", suffix: "+", label: "Hours per piece", sub: "hand craftsmanship" },
  { value: "∞", suffix: "", label: "Lifetime alterations", sub: "on every bespoke order" },
];

function BespokeStepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const Icon = step.icon;

  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.65,
        delay: 0.12 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ x: 4 }}
      className={cn(
        "group relative list-none overflow-hidden border border-gold/10 bg-gradient-to-br p-5 transition-[border-color,box-shadow] duration-500 hover:border-gold/28 hover:shadow-[0_20px_40px_-16px_rgba(92,21,40,0.4)] md:p-6",
        step.accent,
        "glass-panel corner-marks"
      )}
    >
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-2">
          <span className="font-display text-2xl font-light leading-none text-gold/25">
            {step.step}
          </span>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-charcoal/80 shadow-[0_0_20px_rgba(212,175,106,0.12)] transition-shadow duration-500 group-hover:shadow-[0_0_24px_rgba(212,175,106,0.28)]">
            <Icon className="h-5 w-5 text-gold" />
          </div>
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/75">
            Phase {step.step}
          </p>
          <h3 className="mt-1 font-display text-xl font-light text-ivory md:text-2xl">
            {step.title}
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-champagne/75">
            {step.desc}
          </p>
        </div>
      </div>
      <motion.div
        className="mt-4 h-px w-0 bg-gradient-to-r from-gold/50 to-transparent group-hover:w-full"
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ delay: 0.35 + index * 0.1, duration: 0.7 }}
      />
    </motion.li>
  );
}

export function BespokeSection() {
  return (
    <SectionWrapper
      id="bespoke"
      label="Tailored by Hand"
      className="relative overflow-hidden bg-gradient-to-br from-wine/20 via-charcoal to-charcoal"
    >
      <div
        className="orb absolute -right-20 top-1/3 h-80 w-80 bg-burgundy/25"
        aria-hidden
      />
      <div
        className="orb absolute -left-16 bottom-0 h-64 w-64 bg-gold/8"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="-mt-2 mb-12 md:mb-14"
      >
        <h2 className="editorial-title text-ivory">
          Bespoke Tailoring
          <br />
          <span className="text-gradient-gold">Experience</span>
        </h2>
        <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-champagne/75 md:text-lg">
          From the first sketch to the final fitting, our master tailors sculpt
          every silhouette to your form — because your wedding ensemble is a
          legacy piece.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-12 grid gap-6 sm:grid-cols-3 md:mb-16"
      >
        {highlights.map((h) => (
          <div
            key={h.label}
            className="glass-panel corner-marks border-gold/10 px-5 py-5 text-center sm:text-left"
          >
            <p className="font-display text-3xl text-gradient-gold md:text-4xl">
              {h.value}
              {h.suffix && (
                <span className="text-2xl text-gold/80">{h.suffix}</span>
              )}
            </p>
            <p className="mt-2 font-display text-base text-ivory">{h.label}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.28em] text-champagne/50">
              {h.sub}
            </p>
          </div>
        ))}
      </motion.div>

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <div className="flex flex-col gap-8">
          <ul className="relative flex flex-col gap-4">
            <span
              className="absolute bottom-4 left-[1.65rem] top-4 w-px bg-gradient-to-b from-gold/40 via-gold/15 to-transparent"
              aria-hidden
            />
            {steps.map((s, i) => (
              <BespokeStepCard key={s.step} step={s} index={i} />
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button asChild variant="gold" size="lg" className="group">
              <Link href="/booking">
                Begin Your Bespoke Journey
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <p className="text-[11px] uppercase tracking-[0.25em] text-champagne/45">
              Lajpat Nagar · By appointment only
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:sticky lg:top-28"
        >
          <div className="relative overflow-hidden border border-gold/15 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.65)]">
            <LuxuryImage
              src={IMAGES.bespoke}
              alt="Bespoke tailoring atelier"
              aspectClass="aspect-[4/5] lg:aspect-[3/4]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/20" />
            <span
              className="pointer-events-none absolute inset-3 corner-marks md:inset-4"
              aria-hidden
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute -bottom-4 -left-4 glass-panel corner-marks border-gold/20 px-6 py-4 md:-bottom-6 md:-left-6"
          >
            <p className="font-display text-3xl text-gradient-gold md:text-4xl">
              120+
            </p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.3em] text-champagne/60">
              Hours per bespoke piece
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="absolute -right-3 top-8 glass-panel border-gold/20 px-5 py-3 md:-right-5 md:top-10"
          >
            <p className="font-body text-[10px] uppercase tracking-[0.35em] text-gold">
              Master tailor
            </p>
            <p className="mt-1 font-display text-lg text-ivory">
              Hand-finished
            </p>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
