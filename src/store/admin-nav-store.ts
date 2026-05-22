"use client";

import { create } from "zustand";

interface AdminNavState {
  isNavigating: boolean;
  pendingHref: string | null;
  startNavigation: (href: string) => void;
  endNavigation: () => void;
}

export const useAdminNavStore = create<AdminNavState>((set) => ({
  isNavigating: false,
  pendingHref: null,
  startNavigation: (href) =>
    set({ isNavigating: true, pendingHref: href }),
  endNavigation: () =>
    set({ isNavigating: false, pendingHref: null }),
}));
