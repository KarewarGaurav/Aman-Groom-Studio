"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuthStore } from "@/store/admin-auth-store";

function useAdminAuthHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const markHydrated = () => setHydrated(true);
    const persist = useAdminAuthStore.persist;

    if (!persist) {
      markHydrated();
      return;
    }

    if (persist.hasHydrated()) {
      markHydrated();
      return;
    }

    return persist.onFinishHydration(markHydrated);
  }, []);

  return hydrated;
}

export function useRequireAdmin() {
  const router = useRouter();
  const isValid = useAdminAuthStore((s) => s.isSessionValid);
  const hydrated = useAdminAuthHydrated();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!isValid()) {
      router.replace("/admin_login");
      return;
    }
    setReady(true);
  }, [hydrated, isValid, router]);

  return ready;
}
