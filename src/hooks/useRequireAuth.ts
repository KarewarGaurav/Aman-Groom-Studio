"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthRedirectStore } from "@/store/auth-redirect-store";
import { useAuthHydrated, useIsAuthenticated } from "@/hooks/use-auth";

export function useRequireAuth(redirectTo = "/login") {
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useAuthHydrated();
  const isAuthenticated = useIsAuthenticated();
  const setReturnUrl = useAuthRedirectStore((s) => s.setReturnUrl);

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      setReturnUrl(pathname);
      router.replace(`${redirectTo}?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [hydrated, isAuthenticated, pathname, redirectTo, router, setReturnUrl]);

  return { ready: hydrated && isAuthenticated, isAuthenticated };
}
