"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const AppProvidersInner = dynamic(
  () => import("@/components/providers/AppProvidersInner"),
  { ssr: false }
);

/** Keeps the root layout client chunk small; heavy shell loads after hydration. */
export function AppProviders({ children }: { children: ReactNode }) {
  return <AppProvidersInner>{children}</AppProvidersInner>;
}
