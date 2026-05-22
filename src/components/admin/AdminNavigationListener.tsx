"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAdminNavStore } from "@/store/admin-nav-store";

const NAV_TIMEOUT_MS = 12000;

export function AdminNavigationListener() {
  const pathname = usePathname();
  const isNavigating = useAdminNavStore((s) => s.isNavigating);
  const endNavigation = useAdminNavStore((s) => s.endNavigation);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      endNavigation();
    }
  }, [pathname, endNavigation]);

  useEffect(() => {
    if (!isNavigating) return;
    const timeout = setTimeout(endNavigation, NAV_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, [isNavigating, endNavigation]);

  useEffect(() => {
    return () => endNavigation();
  }, [endNavigation]);

  return null;
}
