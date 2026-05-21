"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentlyViewedState {
  ids: string[];
  add: (productId: string) => void;
}

const MAX_ITEMS = 8;

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      ids: [],
      add: (productId) => {
        const filtered = get().ids.filter((id) => id !== productId);
        set({ ids: [productId, ...filtered].slice(0, MAX_ITEMS) });
      },
    }),
    { name: "aman-groom-recent" }
  )
);
