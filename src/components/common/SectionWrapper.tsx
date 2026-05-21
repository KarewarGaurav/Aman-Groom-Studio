"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionWrapper({
  children,
  className,
  id,
  label,
  title,
  subtitle,
  align = "left",
}: SectionWrapperProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section id={id} className={cn("section-padding relative content-auto", className)}>
      <div className="grain-overlay absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        {(label || title) && (
          <motion.header
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: reduceMotion ? 0 : 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn("mb-12 md:mb-16", align === "center" && "text-center")}
          >
            {label && (
              <div
                className={cn(
                  "mb-5 flex items-center gap-4",
                  align === "center" && "justify-center"
                )}
              >
                <span className="h-px w-8 bg-gold/50" aria-hidden />
                <p className="editorial-label">{label}</p>
                <span className="h-px w-8 bg-gold/50" aria-hidden />
              </div>
            )}
            {title && (
              <h2 className="editorial-title text-ivory">{title}</h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "mt-5 max-w-2xl font-body text-base text-champagne/75 md:text-lg",
                  align === "center" && "mx-auto"
                )}
              >
                {subtitle}
              </p>
            )}
          </motion.header>
        )}
        {children}
      </div>
    </section>
  );
}
