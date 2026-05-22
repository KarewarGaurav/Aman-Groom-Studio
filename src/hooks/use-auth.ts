"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { getUserById } from "@/lib/user-registry";
import { isSessionValid } from "@/lib/session-utils";

/** Wait for zustand persist rehydration (fixes getServerSnapshot loop on SSR). */
export function useAuthHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const markHydrated = () => setHydrated(true);

    if (useAuthStore.persist.hasHydrated()) {
      markHydrated();
      return;
    }

    return useAuthStore.persist.onFinishHydration(markHydrated);
  }, []);

  return hydrated;
}

export function useIsAuthenticated() {
  const session = useAuthStore((s) => s.session);
  return useMemo(() => isSessionValid(session), [session]);
}

export function useAuthUser() {
  const session = useAuthStore((s) => s.session);
  const userDataVersion = useAuthStore((s) => s.userDataVersion);
  const authenticated = useMemo(() => isSessionValid(session), [session]);

  return useMemo(() => {
    if (!authenticated || !session) return null;
    return getUserById(session.userId)?.user ?? null;
  }, [authenticated, session, userDataVersion]);
}

export function useAuthOrders() {
  const session = useAuthStore((s) => s.session);
  const userDataVersion = useAuthStore((s) => s.userDataVersion);
  const authenticated = useMemo(() => isSessionValid(session), [session]);

  return useMemo(() => {
    if (!authenticated || !session) return [];
    const orders = getUserById(session.userId)?.orders ?? [];
    return [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [authenticated, session, userDataVersion]);
}

export function useAuthOrder(orderId: string) {
  const orders = useAuthOrders();
  return useMemo(
    () => orders.find((o) => o.id === orderId) ?? null,
    [orders, orderId]
  );
}

export function useAuthAddresses() {
  const session = useAuthStore((s) => s.session);
  const userDataVersion = useAuthStore((s) => s.userDataVersion);
  const authenticated = useMemo(() => isSessionValid(session), [session]);

  return useMemo(() => {
    if (!authenticated || !session) return [];
    return getUserById(session.userId)?.addresses ?? [];
  }, [authenticated, session, userDataVersion]);
}

export function useAuthPaymentMethods() {
  const session = useAuthStore((s) => s.session);
  const userDataVersion = useAuthStore((s) => s.userDataVersion);
  const authenticated = useMemo(() => isSessionValid(session), [session]);

  return useMemo(() => {
    if (!authenticated || !session) return [];
    return getUserById(session.userId)?.paymentMethods ?? [];
  }, [authenticated, session, userDataVersion]);
}

export function useAuthMeasurements() {
  const session = useAuthStore((s) => s.session);
  const userDataVersion = useAuthStore((s) => s.userDataVersion);
  const authenticated = useMemo(() => isSessionValid(session), [session]);

  return useMemo(() => {
    if (!authenticated || !session) return {};
    return getUserById(session.userId)?.measurements ?? {};
  }, [authenticated, session, userDataVersion]);
}
