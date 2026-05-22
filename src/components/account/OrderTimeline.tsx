"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Check } from "lucide-react";
import type { OrderTimelineStep } from "@/types/auth";
import { cn } from "@/lib/utils";

interface OrderTimelineProps {
  steps: OrderTimelineStep[];
}

export function OrderTimeline({ steps }: OrderTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;
      gsap.from("[data-timeline-step]", {
        opacity: 0,
        x: -12,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-champagne" />
      <ul className="space-y-6">
        {steps.map((step) => (
          <li
            key={step.status}
            data-timeline-step
            className="relative flex gap-4 pl-8"
          >
            <span
              className={cn(
                "absolute left-0 flex h-6 w-6 items-center justify-center rounded-full border text-[10px]",
                step.completed
                  ? "border-burgundy bg-burgundy text-warmwhite"
                  : "border-taupe/30 bg-warmwhite text-taupe"
              )}
            >
              {step.completed ? <Check className="h-3 w-3" /> : null}
            </span>
            <div>
              <p
                className={cn(
                  "font-display text-base",
                  step.active ? "text-burgundy" : "text-charcoal"
                )}
              >
                {step.label}
              </p>
              {step.date && (
                <p className="mt-0.5 text-xs text-taupe">
                  {new Date(step.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
