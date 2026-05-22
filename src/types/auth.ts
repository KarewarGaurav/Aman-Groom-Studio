import type { CartItem } from "@/store/cart-store";

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "tailoring"
  | "ready"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  emailVerified: boolean;
  createdAt: string;
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pin: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export interface MeasurementPrefs {
  chest?: string;
  waist?: string;
  shoulder?: string;
  sleeve?: string;
  notes?: string;
}

export interface OrderTimelineStep {
  status: OrderStatus;
  label: string;
  date?: string;
  completed: boolean;
  active?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  discount: number;
  status: OrderStatus;
  timeline: OrderTimelineStep[];
  paymentLabel: string;
  shippingAddress: Address;
  estimatedDelivery: string;
  createdAt: string;
  coupon?: string | null;
}

export interface StoredUserRecord {
  user: User;
  password: string;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  measurements: MeasurementPrefs;
  orders: Order[];
}

export interface AuthSession {
  userId: string;
  token: string;
  rememberMe: boolean;
  expiresAt: number;
  lastActivity: number;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  placed: "Order Placed",
  confirmed: "Confirmed",
  tailoring: "Tailoring in Process",
  ready: "Ready for Dispatch",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
