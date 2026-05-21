"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/types/cms";
import { cn } from "@/lib/utils";

const locationStrip = [...new Set(testimonials.map((t) => t.location))];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, j) => (
        <Star key={j} className="h-3 w-3 fill-gold text-gold" />
      ))}
    </div>
  );
}

function StoryIndex({ index }: { index: number }) {
  return (
    <span
      className="font-display text-5xl font-light leading-none text-gold/15 md:text-6xl"
      aria-hidden
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

function StoryCard({
  testimonial: t,
  index,
  featured = false,
}: {
  testimonial: Testimonial;
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: featured ? 40 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{
        duration: 0.75,
        delay: featured ? 0.1 : 0.15 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -3 }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border border-gold/10 bg-gradient-to-br from-charcoal/90 via-wine/15 to-charcoal/95 transition-[border-color,box-shadow] duration-500 hover:border-gold/30 hover:shadow-[0_24px_48px_-12px_rgba(92,21,40,0.45)]",
        featured ? "glass-panel corner-marks p-10 md:p-12 lg:p-14" : "corner-marks p-7 md:p-8"
      )}
    >
      <Quote
        className={cn(
          "absolute text-gold/8 transition-colors duration-500 group-hover:text-gold/14",
          featured ? "right-8 top-8 h-16 w-16 md:h-20 md:w-20" : "right-5 top-5 h-10 w-10"
        )}
        aria-hidden
      />

      <div className="relative flex items-start justify-between gap-4">
        <StoryIndex index={index} />
        <StarRating rating={t.rating} />
      </div>

      <p
        className={cn(
          "relative mt-6 font-display font-light italic leading-relaxed text-ivory",
          featured
            ? "text-2xl md:text-3xl lg:text-[2rem] lg:leading-snug"
            : "text-lg md:text-xl"
        )}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      {t.outfit && (
        <p className="mt-6 inline-flex w-fit border border-gold/25 bg-wine/30 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-gold/90">
          {t.outfit}
        </p>
      )}

      <footer className="mt-auto flex items-center gap-4 border-t border-gold/15 pt-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gradient-to-br from-wine/60 to-burgundy/40 font-display text-xl text-gradient-gold shadow-[inset_0_1px_0_rgba(212,175,106,0.2)]">
          {t.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <cite className="not-italic font-body text-sm font-semibold text-ivory">
            {t.name}
          </cite>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-champagne/60">
            <span>{t.location}</span>
            {t.weddingDate && (
              <>
                <span className="text-gold/40" aria-hidden>
                  ·
                </span>
                <span className="text-gold/70">{t.weddingDate}</span>
              </>
            )}
          </p>
        </div>
      </footer>
    </motion.blockquote>
  );
}

function LocationMarquee() {
  const items = [...locationStrip, ...locationStrip];

  return (
    <div className="relative mt-14 overflow-hidden border-t border-gold/15 pt-10 md:mt-16">
      <div className="flex w-max animate-marquee">
        {items.map((loc, i) => (
          <span
            key={`${loc}-${i}`}
            className="mx-8 shrink-0 font-body text-[11px] uppercase tracking-[0.35em] text-champagne/40"
          >
            {loc}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const [featured, ...rest] = testimonials;

  return (
    <SectionWrapper
      label="Wedding Stories"
      title="Voices of Excellence"
      subtitle="Grooms who trusted Aman Groom Studio for their greatest day"
      align="center"
      className="relative overflow-hidden bg-gradient-to-b from-charcoal via-wine/15 to-charcoal"
    >
      <div
        className="orb absolute -left-32 top-1/4 h-72 w-72 bg-burgundy/30"
        aria-hidden
      />
      <div
        className="orb absolute -right-24 bottom-1/4 h-64 w-64 bg-gold/10"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 flex flex-col items-center gap-6 md:mb-16"
      >
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <div className="text-center">
            <p className="font-display text-4xl text-gradient-gold md:text-5xl">
              5.0
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-champagne/55">
              Average rating
            </p>
          </div>
          <span className="hidden h-12 w-px bg-gold/25 md:block" aria-hidden />
          <div className="text-center">
            <p className="font-display text-4xl text-ivory md:text-5xl">500+</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-champagne/55">
              Weddings styled
            </p>
          </div>
          <span className="hidden h-12 w-px bg-gold/25 md:block" aria-hidden />
          <div className="text-center">
            <p className="font-display text-4xl text-ivory md:text-5xl">4</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-champagne/55">
              Featured stories
            </p>
          </div>
        </div>
        <p className="max-w-xl text-center font-body text-sm text-champagne/65">
          Real celebrations across India — each ensemble crafted in our Lajpat
          Nagar atelier.
        </p>
      </motion.div>

      <div className="space-y-6 lg:space-y-8">
        <StoryCard testimonial={featured} index={0} featured />

        <div className="grid gap-6 md:grid-cols-3">
          {rest.map((t, i) => (
            <StoryCard key={t.id} testimonial={t} index={i + 1} />
          ))}
        </div>
      </div>

      <LocationMarquee />
    </SectionWrapper>
  );
}
