"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Scissors, Sparkles, Crown, Phone } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";

const steps = [
  {
    icon: Phone,
    label: "Step 01",
    title: "Private Consultation",
    desc: "Share your vision, wedding palette, and ceremonial timeline with our style director in a private atelier session.",
    accent: "from-burgundy/60 to-wine/30",
  },
  {
    icon: Scissors,
    label: "Step 02",
    title: "Design & Fabric",
    desc: "Curated swatches, hand-embroidery motifs, and silhouette decisions — chosen from our exclusive fabric library.",
    accent: "from-gold/30 to-bronze/20",
  },
  {
    icon: Sparkles,
    label: "Step 03",
    title: "Fittings & Refinement",
    desc: "Multiple precision fittings ensure impeccable drape, comfort, and ceremonial readiness across every ritual.",
    accent: "from-wine/50 to-burgundy/20",
  },
  {
    icon: Crown,
    label: "Step 04",
    title: "The Celebration",
    desc: "Walk into your wedding day commanding the room — in a piece crafted exclusively for your greatest moment.",
    accent: "from-champagne/20 to-gold/10",
  },
];

const LINE_HEIGHT = 480;

export function WeddingTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-120px" });

  return (
    <SectionWrapper
      label="The Wedding Journey"
      title="From Consultation to Celebration"
      subtitle="A refined four-step process designed for the discerning groom"
      align="center"
      className="bg-gradient-to-b from-charcoal via-wine/10 to-charcoal"
    >
      <div ref={containerRef} className="relative mx-auto max-w-5xl">

        {/* ── Animated vertical spine ── */}
        <div
          className="absolute left-6 top-0 bottom-0 w-px bg-white/5 md:left-1/2 md:-translate-x-px"
          aria-hidden
        >
          <motion.div
            className="w-full origin-top bg-gradient-to-b from-gold via-bronze to-transparent"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: LINE_HEIGHT }}
          />
        </div>

        {/* ── Steps ── */}
        <div className="flex flex-col gap-0">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.75,
                  delay: 0.2 + i * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative flex items-start gap-4 pb-12 pl-14 sm:gap-6 sm:pb-14 sm:pl-16 md:items-center md:gap-8 md:pb-16 md:pl-0 ${
                  isLeft
                    ? "md:flex-row md:pr-[calc(50%+2rem)]"
                    : "md:flex-row-reverse md:pl-[calc(50%+2rem)]"
                }`}
              >
                {/* Node on spine */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    inView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{ delay: 0.35 + i * 0.18, duration: 0.4 }}
                  className="absolute left-[9px] top-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold bg-charcoal shadow-[0_0_16px_rgba(212,175,106,0.35)] sm:left-[13px] md:left-1/2 md:-translate-x-1/2 md:top-auto"
                  aria-hidden
                >
                  <span className="font-body text-[10px] font-semibold tracking-wider text-gold">
                    {i + 1}
                  </span>
                </motion.div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className={`min-w-0 w-full overflow-hidden border border-white/8 bg-gradient-to-br ${step.accent} glass-panel p-4 sm:p-6 md:p-8`}
                >
                  <div
                    className={`flex items-start gap-4 ${
                      isLeft ? "md:flex-row-reverse md:text-right" : ""
                    }`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-charcoal/80">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 font-body text-[10px] uppercase tracking-[0.3em] text-gold/80">
                        {step.label}
                      </p>
                      <h3 className="font-display text-xl font-light text-ivory sm:text-2xl md:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 font-body text-sm leading-relaxed text-champagne/80 md:text-base">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom gold accent line */}
                  <motion.div
                    className="mt-5 h-px w-0 bg-gradient-to-r from-gold/60 to-transparent"
                    animate={inView ? { width: "100%" } : { width: 0 }}
                    transition={{ delay: 0.6 + i * 0.18, duration: 0.8 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
