"use client";

import { LazyMotion } from "framer-motion";
import { domAnimation } from "@/lib/motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
