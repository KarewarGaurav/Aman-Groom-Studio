"use client";

import type { ReactNode } from "react";
import { AppChrome } from "@/components/layout/AppChrome";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SessionWatchdog } from "@/components/auth/SessionWatchdog";

export default function AppProvidersInner({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <MotionProvider>
      <SessionWatchdog />
      <AppChrome>{children}</AppChrome>
    </MotionProvider>
  );
}
