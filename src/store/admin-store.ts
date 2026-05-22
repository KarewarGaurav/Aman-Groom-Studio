"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  buildInventoryRows,
  defaultStoreSettings,
  initialAdminCategories,
  initialAdminCustomers,
  initialAdminNotifications,
  initialAdminOrders,
  initialAdminPayments,
  initialAdminProducts,
  initialAdminReviews,
} from "@/data/admin-mock";
import {
  distributeStockAcrossSizes,
  normalizeVariantStocks,
  sumVariantStock,
} from "@/lib/admin-inventory-utils";
import type {
  AdminCategory,
  AdminCustomer,
  AdminInventoryRow,
  AdminNotification,
  AdminOrder,
  AdminOrderStatus,
  AdminPayment,
  AdminProduct,
  AdminProductVariant,
  AdminReview,
  StoreSettings,
} from "@/types/admin";

interface AdminState {
  orders: AdminOrder[];
  products: AdminProduct[];
  customers: AdminCustomer[];
  categories: AdminCategory[];
  inventory: AdminInventoryRow[];
  payments: AdminPayment[];
  reviews: AdminReview[];
  notifications: AdminNotification[];
  settings: StoreSettings;

  updateOrderStatus: (orderId: string, status: AdminOrderStatus) => void;
  cancelOrder: (orderId: string) => void;
  refundOrder: (orderId: string) => void;
  addProduct: (product: AdminProduct) => void;
  updateProduct: (id: string, data: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => void;
  toggleProductFeatured: (id: string) => void;
  toggleCustomerBlock: (id: string) => void;
  updateReviewStatus: (
    id: string,
    status: AdminReview["status"]
  ) => void;
  toggleReviewFeatured: (id: string) => void;
  updateInventory: (
    productId: string,
    data: Partial<AdminInventoryRow>
  ) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateSettings: (data: Partial<StoreSettings>) => void;
  addCategory: (category: AdminCategory) => void;
  syncInventoryFromProducts: () => void;
}

function refreshInventory(products: AdminProduct[]): AdminInventoryRow[] {
  return buildInventoryRows(products);
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      orders: initialAdminOrders,
      products: initialAdminProducts,
      customers: initialAdminCustomers,
      categories: initialAdminCategories,
      inventory: buildInventoryRows(initialAdminProducts),
      payments: initialAdminPayments,
      reviews: initialAdminReviews,
      notifications: initialAdminNotifications,
      settings: defaultStoreSettings,

      updateOrderStatus: (orderId, status) => {
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status,
                  updatedAt: new Date().toISOString(),
                }
              : o
          ),
        }));
      },

      cancelOrder: (orderId) => {
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status: "cancelled",
                  paymentStatus: "refunded" as const,
                  updatedAt: new Date().toISOString(),
                }
              : o
          ),
        }));
      },

      refundOrder: (orderId) => {
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  paymentStatus: "refunded" as const,
                  updatedAt: new Date().toISOString(),
                }
              : o
          ),
          payments: s.payments.map((p) =>
            p.orderId === orderId ? { ...p, status: "refunded" as const } : p
          ),
        }));
      },

      addProduct: (product) => {
        set((s) => {
          const products = [...s.products, product];
          return {
            products,
            inventory: refreshInventory(products),
          };
        });
      },

      updateProduct: (id, data) => {
        set((s) => {
          const products = s.products.map((p) =>
            p.id === id ? { ...p, ...data } : p
          );
          return {
            products,
            inventory: refreshInventory(products),
          };
        });
      },

      deleteProduct: (id) => {
        set((s) => {
          const products = s.products.filter((p) => p.id !== id);
          return {
            products,
            inventory: refreshInventory(products),
          };
        });
      },

      toggleProductFeatured: (id) => {
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id ? { ...p, featured: !p.featured } : p
          ),
        }));
      },

      toggleCustomerBlock: (id) => {
        set((s) => ({
          customers: s.customers.map((c) =>
            c.id === id
              ? {
                  ...c,
                  status: c.status === "active" ? "blocked" : "active",
                }
              : c
          ),
        }));
      },

      updateReviewStatus: (id, status) => {
        set((s) => ({
          reviews: s.reviews.map((r) =>
            r.id === id ? { ...r, status } : r
          ),
        }));
      },

      toggleReviewFeatured: (id) => {
        set((s) => ({
          reviews: s.reviews.map((r) =>
            r.id === id ? { ...r, featured: !r.featured } : r
          ),
        }));
      },

      updateInventory: (productId, data) => {
        set((s) => {
          const product = s.products.find((p) => p.id === productId);
          const row = s.inventory.find((r) => r.productId === productId);
          if (!product || !row) return s;

          let variants: AdminProductVariant[];

          if (data.sizes) {
            variants = normalizeVariantStocks(data.sizes);
          } else if (data.totalStock !== undefined) {
            variants = distributeStockAcrossSizes(
              product.variants.length ? product.variants : row.sizes,
              data.totalStock
            );
          } else {
            variants = normalizeVariantStocks(row.sizes);
          }

          const totalStock = sumVariantStock(variants);
          const available =
            data.available !== undefined
              ? data.available
              : totalStock > 0 && product.inStock;

          const updatedProduct: AdminProduct = {
            ...product,
            variants,
            stockCount: totalStock,
            inStock: available && totalStock > 0,
          };

          const products = s.products.map((p) =>
            p.id === productId ? updatedProduct : p
          );

          return {
            products,
            inventory: refreshInventory(products),
          };
        });
      },

      markNotificationRead: (id) => {
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      markAllNotificationsRead: () => {
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      updateSettings: (data) => {
        set((s) => ({ settings: { ...s.settings, ...data } }));
      },

      addCategory: (category) => {
        set((s) => ({ categories: [...s.categories, category] }));
      },

      syncInventoryFromProducts: () => {
        set((s) => ({
          inventory: refreshInventory(s.products),
        }));
      },
    }),
    {
      name: "aman-admin-data",
      partialize: (s) => ({
        orders: s.orders,
        products: s.products,
        customers: s.customers,
        categories: s.categories,
        reviews: s.reviews,
        settings: s.settings,
        notifications: s.notifications,
      }),
    }
  )
);
