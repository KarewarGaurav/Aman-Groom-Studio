import type { CartItem } from "@/store/cart-store";
import type { Address, Order, OrderStatus, OrderTimelineStep } from "@/types/auth";
import { ORDER_STATUS_LABELS } from "@/types/auth";

const STATUS_FLOW: OrderStatus[] = [
  "placed",
  "confirmed",
  "tailoring",
  "ready",
  "shipped",
  "delivered",
];

export function buildOrderTimeline(
  current: OrderStatus,
  placedAt: string
): OrderTimelineStep[] {
  const idx = STATUS_FLOW.indexOf(current);
  return STATUS_FLOW.map((status, i) => ({
    status,
    label: ORDER_STATUS_LABELS[status],
    completed: i <= idx,
    active: i === idx,
    date:
      i <= idx
        ? new Date(
            new Date(placedAt).getTime() + i * 86400000 * 2
          ).toISOString()
        : undefined,
  }));
}

export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const seq = Math.floor(1000 + Math.random() * 9000);
  return `AGS-${year}-${seq}`;
}

export function createOrderFromCart(params: {
  userId: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  discount: number;
  coupon: string | null;
  shippingAddress: Address;
  paymentLabel: string;
}): Order {
  const now = new Date().toISOString();
  const id = `ord-${Date.now()}`;
  return {
    id,
    orderNumber: generateOrderNumber(),
    userId: params.userId,
    items: params.items,
    subtotal: params.subtotal,
    total: params.total,
    discount: params.discount,
    status: "placed",
    timeline: buildOrderTimeline("placed", now),
    paymentLabel: params.paymentLabel,
    shippingAddress: params.shippingAddress,
    estimatedDelivery: new Date(
      Date.now() + 21 * 86400000
    ).toISOString().slice(0, 10),
    createdAt: now,
    coupon: params.coupon,
  };
}
