"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function useAdminPageEnter() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.from("[data-admin-enter]", {
        opacity: 0,
        y: 12,
        duration: 0.28,
        stagger: 0.03,
        ease: "power2.out",
        clearProps: "opacity,transform",
      });
    },
    { scope: ref }
  );

  return ref;
}

export function useAdminDashboardReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.from("[data-dash-card]", {
        opacity: 0,
        y: 10,
        duration: 0.3,
        stagger: 0.03,
        ease: "power2.out",
        delay: 0.02,
        clearProps: "opacity,transform",
      });
      gsap.from("[data-dash-chart]", {
        opacity: 0,
        y: 8,
        duration: 0.35,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.05,
        clearProps: "opacity,transform",
      });
    },
    { scope: ref }
  );

  return ref;
}

export function useAdminSidebarAnimate(collapsed: boolean) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced || !ref.current) return;

      gsap.to(ref.current, {
        width: collapsed ? 72 : 260,
        duration: 0.35,
        ease: "power2.inOut",
      });
    },
    { scope: ref, dependencies: [collapsed] }
  );

  return ref;
}
