import type { OrderStatus } from "@/types/auth";

export type AdminOrderStatus = OrderStatus;

export interface AdminSession {
  adminId: string;
  token: string;
  expiresAt: number;
  lastActivity: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "operations" | "stylist";
  avatarInitials: string;
}

export interface AdminCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  totalSpent: number;
  orderCount: number;
  wishlistCount: number;
  status: "active" | "blocked";
  joinedAt: string;
  lastOrderAt: string;
  avatarColor: string;
}

export interface AdminProductVariant {
  size: string;
  stock: number;
}

export interface AdminProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  collectionId?: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  tags: string[];
  featured: boolean;
  inStock: boolean;
  stockCount: number;
  variants: AdminProductVariant[];
  description: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  image: string;
  featured: boolean;
}

export interface AdminOrderItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: AdminOrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: AdminOrderStatus;
  paymentMethod: string;
  paymentStatus: "paid" | "pending" | "refunded" | "partial_refund";
  shippingCity: string;
  trackingId?: string;
  tailoringNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminPayment {
  id: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  method: string;
  status: "completed" | "pending" | "refunded" | "failed";
  createdAt: string;
}

export interface AdminReview {
  id: string;
  customerName: string;
  productName: string;
  productImage: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  featured: boolean;
  createdAt: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: "order" | "inventory" | "review" | "payment";
  read: boolean;
  createdAt: string;
}

export interface AdminInventoryRow {
  productId: string;
  productName: string;
  image: string;
  category: string;
  sku: string;
  totalStock: number;
  lowStockThreshold: number;
  sizes: AdminProductVariant[];
  available: boolean;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  orders: number;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  shippingFee: number;
  freeShippingAbove: number;
  taxRate: number;
  heroBannerTitle: string;
  promoBannerEnabled: boolean;
  instagram: string;
  whatsapp: string;
  orderNotifications: boolean;
  lowStockAlerts: boolean;
}

export interface AdminDashboardStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
  activeCustomers: number;
  lowStockAlerts: number;
}
