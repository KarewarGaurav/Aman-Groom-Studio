"use client";

import { cn } from "@/lib/utils";
import { useGsapReveal } from "@/hooks/useGsapReveal";

type SectionTone = "ivory" | "champagne" | "cream" | "warm" | "sand";

const TONE_CLASSES: Record<SectionTone, string> = {
  ivory: "section-bg-ivory",
  champagne: "section-bg-champagne",
  cream: "section-bg-cream",
  warm: "section-bg-warm",
  sand: "section-bg-sand",
};

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  tone?: SectionTone;
}

export function SectionWrapper({
  children,
  className,
  id,
  label,
  title,
  subtitle,
  align = "left",
  light = true,
  tone = "ivory",
}: SectionWrapperProps) {
  const headerRef = useGsapReveal<HTMLDivElement>({ y: 20, duration: 0.6 });

  return (
    <section
      id={id}
      className={cn(
        "section-padding relative content-auto overflow-hidden",
        light ? TONE_CLASSES[tone] : "premium-gradient",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 grain-overlay"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        {(label || title) && (
          <header
            ref={headerRef}
            className={cn("mb-10 md:mb-14", align === "center" && "text-center")}
          >
            {label && (
              <div
                className={cn(
                  "mb-4 flex items-center gap-4",
                  align === "center" && "justify-center"
                )}
              >
                <span
                  className="h-px w-10 bg-gradient-to-r from-transparent to-sandgold/70"
                  aria-hidden
                />
                <p className="editorial-label">{label}</p>
                <span
                  className="h-px w-10 bg-gradient-to-l from-transparent to-sandgold/70"
                  aria-hidden
                />
              </div>
            )}
            {title && (
              <h2 className="editorial-title font-displayAlt">{title}</h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "mt-4 max-w-xl font-sans text-base text-charcoalsoft md:text-lg",
                  align === "center" && "mx-auto"
                )}
              >
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
