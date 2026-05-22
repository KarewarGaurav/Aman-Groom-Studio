"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  buildDiscountSummary,
  tryApplyCoupon,
} from "@/lib/coupon-utils";
import type { DiscountSummary } from "@/types/coupon";
import type { Product } from "@/types/cms";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  appliedCoupons: string[];
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (
    product: Product,
    size: string,
    color: string,
    quantity?: number
  ) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => void;
  applyCoupon: (code: string) => { ok: boolean; message?: string };
  removeCoupon: (code: string) => void;
  clearCoupons: () => void;
  clearCart: () => void;
  subtotal: () => number;
  discountSummary: () => DiscountSummary;
  total: () => number;
  /** Legacy: first applied code */
  coupon: () => string | null;
  /** Legacy: effective discount rate for orders */
  discount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      appliedCoupons: [],

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (product, size, color, quantity = 1) => {
        const items = get().items;
        const existing = items.find(
          (i) =>
            i.productId === product.id &&
            i.size === size &&
            i.color === color
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i.productId === product.id &&
              i.size === size &&
              i.color === color
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [
              ...items,
              {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0],
                size,
                color,
                quantity,
              },
            ],
            isOpen: true,
          });
        }
      },

      removeItem: (productId, size, color) =>
        set({
          items: get().items.filter(
            (i) =>
              !(
                i.productId === productId &&
                i.size === size &&
                i.color === color
              )
          ),
        }),

      updateQuantity: (productId, size, color, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId, size, color);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId &&
            i.size === size &&
            i.color === color
              ? { ...i, quantity }
              : i
          ),
        });
      },

      applyCoupon: (code) => {
        const result = tryApplyCoupon(code, get().items, get().appliedCoupons);
        if (!result.ok) {
          return { ok: false, message: result.message };
        }
        const normalized = code.trim().toUpperCase();
        set({
          appliedCoupons: [...get().appliedCoupons, normalized],
        });
        return { ok: true };
      },

      removeCoupon: (code) =>
        set({
          appliedCoupons: get().appliedCoupons.filter(
            (c) => c !== code.toUpperCase()
          ),
        }),

      clearCoupons: () => set({ appliedCoupons: [] }),

      clearCart: () => set({ items: [], appliedCoupons: [] }),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      discountSummary: () =>
        buildDiscountSummary(get().items, get().appliedCoupons),

      total: () => {
        const { subtotal, totalDiscount } = get().discountSummary();
        return Math.max(0, subtotal - totalDiscount);
      },

      coupon: () => get().appliedCoupons[0] ?? null,

      discount: () => {
        const { subtotal, totalDiscount } = get().discountSummary();
        if (subtotal <= 0) return 0;
        return totalDiscount / subtotal;
      },
    }),
    {
      name: "aman-groom-cart",
      partialize: (state) => ({
        items: state.items,
        appliedCoupons: state.appliedCoupons,
      }),
      version: 1,
      migrate: (persisted) => {
        const state = persisted as {
          items?: CartItem[];
          appliedCoupons?: string[];
          coupon?: string | null;
        };
        if (Array.isArray(state.appliedCoupons)) {
          return { items: state.items ?? [], appliedCoupons: state.appliedCoupons };
        }
        return {
          items: state.items ?? [],
          appliedCoupons: state.coupon ? [String(state.coupon).toUpperCase()] : [],
        };
      },
    }
  )
);
