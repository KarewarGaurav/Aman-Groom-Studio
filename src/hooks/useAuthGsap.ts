"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function useAuthPageEnter() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.from("[data-auth-enter]", {
        opacity: 0,
        y: 24,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from("[data-auth-visual]", {
        opacity: 0,
        scale: 1.04,
        duration: 1.1,
        ease: "power2.out",
      });
    },
    { scope: ref }
  );

  return ref;
}

export function useDashboardReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.from("[data-dash-card]", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.1,
      });
    },
    { scope: ref, dependencies: [] }
  );

  return ref;
}
