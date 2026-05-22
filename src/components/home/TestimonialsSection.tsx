"use client";

import { Star } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { testimonials } from "@/data/testimonials";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export function TestimonialsSection() {
  const gridRef = useGsapReveal<HTMLDivElement>({
    childSelector: "[data-testimonial]",
    stagger: 0.08,
  });

  return (
    <SectionWrapper
      label="Reviews"
      title="What Our Clients Say"
      align="center"
      tone="cream"
    >
      <div ref={gridRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.slice(0, 4).map((t) => (
          <blockquote
            key={t.id}
            data-testimonial
            className="luxury-card-tint flex h-full flex-col rounded-sm p-6 transition-shadow duration-300 hover:shadow-luxury"
          >
            <div className="flex gap-1">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-3 w-3 fill-sandgold text-sandgold" />
              ))}
            </div>
            <p className="mt-4 flex-1 font-display text-lg italic leading-relaxed text-charcoal">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-4 border-t border-taupe/10 pt-4">
              <cite className="not-italic font-sans text-sm font-medium text-charcoal">
                {t.name}
              </cite>
              <p className="text-xs text-charcoalsoft">{t.location}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </SectionWrapper>
  );
}
