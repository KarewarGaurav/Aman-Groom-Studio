"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
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
  coupon: string | null;
  discount: number;
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
  applyCoupon: (code: string) => boolean;
  clearCart: () => void;
  subtotal: () => number;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      coupon: null,
      discount: 0,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (product, size, color, quantity = 1) => {
        const items = get().items;
        const key = `${product.id}-${size}-${color}`;
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
        const normalized = code.trim().toUpperCase();
        if (normalized === "MAHARAJA10") {
          set({ coupon: normalized, discount: 0.1 });
          return true;
        }
        if (normalized === "GROOM15") {
          set({ coupon: normalized, discount: 0.15 });
          return true;
        }
        return false;
      },

      clearCart: () => set({ items: [], coupon: null, discount: 0 }),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      total: () => {
        const sub = get().subtotal();
        return sub - sub * get().discount;
      },
    }),
    { name: "aman-groom-cart" }
  )
);
