"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAdminNavStore } from "@/store/admin-nav-store";

export function useAdminRouter() {
  const router = useRouter();
  const startNavigation = useAdminNavStore((s) => s.startNavigation);

  const push = useCallback(
    (href: string) => {
      startNavigation(href);
      router.push(href);
    },
    [router, startNavigation]
  );

  const replace = useCallback(
    (href: string) => {
      startNavigation(href);
      router.replace(href);
    },
    [router, startNavigation]
  );

  return { push, replace, back: router.back, refresh: router.refresh };
}
