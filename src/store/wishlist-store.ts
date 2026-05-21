"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) => {
        const ids = get().ids;
        if (ids.includes(productId)) {
          set({ ids: ids.filter((id) => id !== productId) });
        } else {
          set({ ids: [...ids, productId] });
        }
      },
      has: (productId) => get().ids.includes(productId),
    }),
    { name: "aman-groom-wishlist" }
  )
);
