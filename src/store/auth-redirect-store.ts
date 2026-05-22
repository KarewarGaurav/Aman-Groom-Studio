"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthRedirectState {
  returnUrl: string | null;
  setReturnUrl: (url: string) => void;
  consumeReturnUrl: () => string;
}

export const useAuthRedirectStore = create<AuthRedirectState>()(
  persist(
    (set, get) => ({
      returnUrl: null,
      setReturnUrl: (url) => set({ returnUrl: url }),
      consumeReturnUrl: () => {
        const url = get().returnUrl ?? "/account";
        set({ returnUrl: null });
        return url;
      },
    }),
    { name: "aman-groom-auth-redirect" }
  )
);
