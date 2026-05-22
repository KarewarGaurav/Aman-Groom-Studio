"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEMO_CREDENTIALS } from "@/data/demo-auth";
import { clearAuthCookie, setAuthCookie } from "@/lib/auth-cookie";
import { createOrderFromCart } from "@/lib/orders";
import {
  getUserByEmail,
  getUserById,
  updateUserRecord,
  upsertUser,
} from "@/lib/user-registry";
import type {
  Address,
  AuthSession,
  MeasurementPrefs,
  Order,
  PaymentMethod,
  User,
} from "@/types/auth";
import type { CartItem } from "@/store/cart-store";
import { isSessionValid as checkSessionValid } from "@/lib/session-utils";

const SESSION_MS = 30 * 60 * 1000;
const ACTIVITY_THROTTLE_MS = 60 * 1000;
const REMEMBER_MS = 30 * 24 * 60 * 60 * 1000;
const REMEMBER_COOKIE_SEC = 30 * 24 * 60 * 60;
const SESSION_COOKIE_SEC = 8 * 60 * 60;

function createToken(): string {
  return `ags_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

function createUserId(): string {
  return `user_${Date.now()}`;
}

interface AuthState {
  session: AuthSession | null;
  userDataVersion: number;
  pendingEmail: string | null;
  pendingOtp: boolean;
  resetEmail: string | null;
  resetToken: string | null;
  error: string | null;
  loading: boolean;

  bumpUserData: () => void;
  touchActivity: () => void;
  isSessionValid: () => boolean;
  getCurrentUser: () => User | null;
  getAddresses: () => Address[];
  getPaymentMethods: () => PaymentMethod[];
  getMeasurements: () => MeasurementPrefs;
  getOrders: () => Order[];

  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<boolean>;
  signup: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) => Promise<boolean>;
  logout: () => void;
  verifyEmail: (code: string) => boolean;
  verifyOtp: (code: string) => boolean;
  resendOtp: () => void;
  requestPasswordReset: (email: string) => Promise<boolean>;
  resetPassword: (password: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => void;
  changePassword: (current: string, next: string) => boolean;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, data: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addPaymentMethod: (method: Omit<PaymentMethod, "id">) => void;
  removePaymentMethod: (id: string) => void;
  updateMeasurements: (data: MeasurementPrefs) => void;
  placeOrder: (params: {
    items: CartItem[];
    subtotal: number;
    total: number;
    discount: number;
    coupon: string | null;
    shippingAddress: Address;
    paymentLabel: string;
  }) => Order | null;
  reorder: (orderId: string) => Order["items"];
  getOrderById: (orderId: string) => Order | null;
  clearError: () => void;
}

function establishSession(
  userId: string,
  rememberMe: boolean
): AuthSession {
  const now = Date.now();
  return {
    userId,
    token: createToken(),
    rememberMe,
    expiresAt: now + (rememberMe ? REMEMBER_MS : SESSION_MS),
    lastActivity: now,
  };
}

function syncCookie(session: AuthSession) {
  setAuthCookie(
    session.token,
    session.rememberMe ? REMEMBER_COOKIE_SEC : SESSION_COOKIE_SEC
  );
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      userDataVersion: 0,
      pendingEmail: null,
      pendingOtp: false,
      resetEmail: null,
      resetToken: null,
      error: null,
      loading: false,

      bumpUserData: () =>
        set((s) => ({ userDataVersion: s.userDataVersion + 1 })),

      touchActivity: () => {
        const { session } = get();
        if (!session) return;
        const now = Date.now();
        if (now - session.lastActivity < ACTIVITY_THROTTLE_MS) return;
        const maxAge = session.rememberMe ? REMEMBER_MS : SESSION_MS;
        set({
          session: {
            ...session,
            lastActivity: now,
            expiresAt: now + maxAge,
          },
        });
      },

      isSessionValid: () => checkSessionValid(get().session),

      getCurrentUser: () => {
        const { session } = get();
        if (!session || !get().isSessionValid()) return null;
        return getUserById(session.userId)?.user ?? null;
      },

      getAddresses: () => {
        const user = get().getCurrentUser();
        if (!user) return [];
        return getUserById(user.id)?.addresses ?? [];
      },

      getPaymentMethods: () => {
        const user = get().getCurrentUser();
        if (!user) return [];
        return getUserById(user.id)?.paymentMethods ?? [];
      },

      getMeasurements: () => {
        const user = get().getCurrentUser();
        if (!user) return {};
        return getUserById(user.id)?.measurements ?? {};
      },

      getOrders: () => {
        const user = get().getCurrentUser();
        if (!user) return [];
        const orders = getUserById(user.id)?.orders ?? [];
        return [...orders].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      },

      login: async (email, password, rememberMe = false) => {
        set({ loading: true, error: null });
        await new Promise((r) => setTimeout(r, 600));
        const record = getUserByEmail(email);
        if (!record || record.password !== password) {
          set({
            loading: false,
            error: "Invalid email or password. Try guest@amangroom.com / Couture123",
          });
          return false;
        }
        if (!record.user.emailVerified) {
          set({
            loading: false,
            pendingEmail: record.user.email,
            pendingOtp: true,
            error: "Please verify your email to continue.",
          });
          return false;
        }
        const session = establishSession(record.user.id, rememberMe);
        syncCookie(session);
        set({ session, loading: false, error: null, pendingEmail: null });
        return true;
      },

      signup: async (data) => {
        set({ loading: true, error: null });
        await new Promise((r) => setTimeout(r, 700));
        if (getUserByEmail(data.email)) {
          set({ loading: false, error: "An account with this email already exists." });
          return false;
        }
        const user: User = {
          id: createUserId(),
          email: data.email.toLowerCase(),
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          emailVerified: false,
          createdAt: new Date().toISOString(),
        };
        const record = {
          user,
          password: data.password,
          addresses: [],
          paymentMethods: [],
          measurements: {},
          orders: [],
        };
        upsertUser(record);
        set({
          loading: false,
          pendingEmail: user.email,
          pendingOtp: true,
        });
        return true;
      },

      logout: () => {
        clearAuthCookie();
        set({
          session: null,
          pendingEmail: null,
          pendingOtp: false,
          resetEmail: null,
          resetToken: null,
          error: null,
        });
      },

      verifyEmail: (code) => {
        const email = get().pendingEmail;
        if (!email) return false;
        if (code.trim() !== "123456" && code.trim().length < 4) {
          set({ error: "Invalid verification code. Use 123456 for demo." });
          return false;
        }
        const record = getUserByEmail(email);
        if (!record) return false;
        record.user.emailVerified = true;
        upsertUser(record);
        set({ error: null, pendingOtp: true });
        return true;
      },

      verifyOtp: (code) => {
        const email = get().pendingEmail;
        if (!email) return false;
        if (code.trim() !== "123456") {
          set({ error: "Invalid OTP. Demo code: 123456" });
          return false;
        }
        const record = getUserByEmail(email);
        if (!record) return false;
        record.user.emailVerified = true;
        upsertUser(record);
        const session = establishSession(record.user.id, true);
        syncCookie(session);
        set({
          session,
          pendingEmail: null,
          pendingOtp: false,
          error: null,
        });
        return true;
      },

      resendOtp: () => {
        set({ error: null });
      },

      requestPasswordReset: async (email) => {
        set({ loading: true, error: null });
        await new Promise((r) => setTimeout(r, 500));
        const record = getUserByEmail(email);
        set({ loading: false });
        if (!record) {
          set({ error: "No account found with this email." });
          return false;
        }
        const token = createToken();
        if (typeof window !== "undefined") {
          sessionStorage.setItem("aman-reset-token", token);
          sessionStorage.setItem("aman-reset-email", email.toLowerCase());
        }
        set({ resetEmail: email.toLowerCase(), resetToken: token });
        return true;
      },

      resetPassword: async (password) => {
        set({ loading: true, error: null });
        await new Promise((r) => setTimeout(r, 500));
        const email =
          get().resetEmail ??
          (typeof window !== "undefined"
            ? sessionStorage.getItem("aman-reset-email")
            : null);
        const token =
          get().resetToken ??
          (typeof window !== "undefined"
            ? sessionStorage.getItem("aman-reset-token")
            : null);
        if (!email || !token) {
          set({ loading: false, error: "Reset link expired. Request a new one." });
          return false;
        }
        const record = getUserByEmail(email);
        if (!record) {
          set({ loading: false, error: "Account not found." });
          return false;
        }
        record.password = password;
        upsertUser(record);
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("aman-reset-token");
          sessionStorage.removeItem("aman-reset-email");
        }
        set({ loading: false, resetEmail: null, resetToken: null, error: null });
        return true;
      },

      updateProfile: (data) => {
        const user = get().getCurrentUser();
        if (!user) return;
        updateUserRecord(user.id, (record) => ({
          ...record,
          user: { ...record.user, ...data },
        }));
        get().bumpUserData();
      },

      changePassword: (current, next) => {
        const user = get().getCurrentUser();
        if (!user) return false;
        const record = getUserById(user.id);
        if (!record || record.password !== current) {
          set({ error: "Current password is incorrect." });
          return false;
        }
        record.password = next;
        upsertUser(record);
        get().bumpUserData();
        set({ error: null });
        return true;
      },

      addAddress: (address) => {
        const user = get().getCurrentUser();
        if (!user) return;
        const id = `addr_${Date.now()}`;
        updateUserRecord(user.id, (record) => {
          const addresses = record.addresses.map((a) =>
            address.isDefault ? { ...a, isDefault: false } : a
          );
          return {
            ...record,
            addresses: [...addresses, { ...address, id }],
          };
        });
        get().bumpUserData();
      },

      updateAddress: (id, data) => {
        const user = get().getCurrentUser();
        if (!user) return;
        updateUserRecord(user.id, (record) => ({
          ...record,
          addresses: record.addresses.map((a) =>
            a.id === id ? { ...a, ...data } : a
          ),
        }));
        get().bumpUserData();
      },

      removeAddress: (id) => {
        const user = get().getCurrentUser();
        if (!user) return;
        updateUserRecord(user.id, (record) => ({
          ...record,
          addresses: record.addresses.filter((a) => a.id !== id),
        }));
        get().bumpUserData();
      },

      setDefaultAddress: (id) => {
        const user = get().getCurrentUser();
        if (!user) return;
        updateUserRecord(user.id, (record) => ({
          ...record,
          addresses: record.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        }));
        get().bumpUserData();
      },

      addPaymentMethod: (method) => {
        const user = get().getCurrentUser();
        if (!user) return;
        const id = `pm_${Date.now()}`;
        updateUserRecord(user.id, (record) => {
          const paymentMethods = record.paymentMethods.map((p) =>
            method.isDefault ? { ...p, isDefault: false } : p
          );
          return {
            ...record,
            paymentMethods: [...paymentMethods, { ...method, id }],
          };
        });
        get().bumpUserData();
      },

      removePaymentMethod: (id) => {
        const user = get().getCurrentUser();
        if (!user) return;
        updateUserRecord(user.id, (record) => ({
          ...record,
          paymentMethods: record.paymentMethods.filter((p) => p.id !== id),
        }));
        get().bumpUserData();
      },

      updateMeasurements: (data) => {
        const user = get().getCurrentUser();
        if (!user) return;
        updateUserRecord(user.id, (record) => ({
          ...record,
          measurements: { ...record.measurements, ...data },
        }));
        get().bumpUserData();
      },

      placeOrder: (params) => {
        const user = get().getCurrentUser();
        if (!user) return null;
        const order = createOrderFromCart({ ...params, userId: user.id });
        updateUserRecord(user.id, (record) => ({
          ...record,
          orders: [order, ...record.orders],
        }));
        get().bumpUserData();
        return order;
      },

      reorder: (orderId) => {
        const order = get().getOrderById(orderId);
        return order?.items ?? [];
      },

      getOrderById: (orderId) => {
        return get().getOrders().find((o) => o.id === orderId) ?? null;
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "aman-groom-auth",
      partialize: (state) => ({
        session: state.session,
        pendingEmail: state.pendingEmail,
        pendingOtp: state.pendingOtp,
        resetEmail: state.resetEmail,
        resetToken: state.resetToken,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.session) syncCookie(state.session);
        if (typeof window !== "undefined") {
          getUserByEmail(DEMO_CREDENTIALS.email);
        }
      },
    }
  )
);
