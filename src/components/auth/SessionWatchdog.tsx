"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { isSessionValid } from "@/lib/session-utils";

const ACCOUNT_PREFIX = "/account";
const CHECKOUT = "/checkout";

export function SessionWatchdog() {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  useEffect(() => {
    const onActivity = () => useAuthStore.getState().touchActivity();
    window.addEventListener("click", onActivity, { passive: true });
    window.addEventListener("keydown", onActivity, { passive: true });

    const interval = setInterval(() => {
      const { session, logout } = useAuthStore.getState();
      if (!session) return;
      if (!isSessionValid(session)) {
        logout();
        const path = pathnameRef.current;
        if (path.startsWith(ACCOUNT_PREFIX) || path === CHECKOUT) {
          router.push("/login?timeout=1");
        }
      }
    }, 60000);

    return () => {
      window.removeEventListener("click", onActivity);
      window.removeEventListener("keydown", onActivity);
      clearInterval(interval);
    };
  }, [router]);

  return null;
}
