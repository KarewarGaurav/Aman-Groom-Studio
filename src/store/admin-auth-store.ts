"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ADMIN_CREDENTIALS,
  DEMO_ADMIN_USER,
} from "@/data/admin-credentials";
import {
  ADMIN_REMEMBER_MS,
  ADMIN_SESSION_MS,
  clearAdminAuthCookie,
  setAdminAuthCookie,
} from "@/lib/admin-auth-cookie";
import type { AdminSession, AdminUser } from "@/types/admin";

function createToken(): string {
  return `ags_admin_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

interface AdminAuthState {
  session: AdminSession | null;
  admin: AdminUser | null;
  error: string | null;
  loading: boolean;

  isSessionValid: () => boolean;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  touchActivity: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set, get) => ({
      session: null,
      admin: null,
      error: null,
      loading: false,

      isSessionValid: () => {
        const { session } = get();
        if (!session) return false;
        return Date.now() < session.expiresAt;
      },

      clearError: () => set({ error: null }),

      touchActivity: () => {
        const { session } = get();
        if (!session) return;
        set({
          session: { ...session, lastActivity: Date.now() },
        });
      },

      login: async (email, password, rememberMe = false) => {
        set({ loading: true, error: null });
        await new Promise((r) => setTimeout(r, 280));

        const normalized = email.trim().toLowerCase();
        const valid =
          normalized === ADMIN_CREDENTIALS.email.toLowerCase() &&
          password === ADMIN_CREDENTIALS.password;

        if (!valid) {
          set({
            loading: false,
            error: "Invalid credentials. Please verify your studio admin email and password.",
          });
          return false;
        }

        const ms = rememberMe ? ADMIN_REMEMBER_MS : ADMIN_SESSION_MS;
        const token = createToken();
        const session: AdminSession = {
          adminId: DEMO_ADMIN_USER.id,
          token,
          expiresAt: Date.now() + ms,
          lastActivity: Date.now(),
        };

        setAdminAuthCookie(token, Math.floor(ms / 1000));
        set({
          session,
          admin: DEMO_ADMIN_USER,
          loading: false,
          error: null,
        });
        return true;
      },

      logout: () => {
        clearAdminAuthCookie();
        set({ session: null, admin: null, error: null });
      },
    }),
    {
      name: "aman-admin-auth",
      partialize: (s) => ({
        session: s.session,
        admin: s.admin,
      }),
    }
  )
);
