"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import { formatPrice } from "@/lib/utils";
import { formatAdminDate } from "@/lib/admin-utils";
import { ORDER_STATUS_LABELS } from "@/types/auth";
import type { AdminOrder, AdminOrderStatus } from "@/types/admin";

const STATUS_OPTIONS: AdminOrderStatus[] = [
  "placed",
  "confirmed",
  "tailoring",
  "ready",
  "shipped",
  "delivered",
  "cancelled",
];

interface OrderDetailModalProps {
  order: AdminOrder | null;
  open: boolean;
  onClose: () => void;
  onStatusChange: (id: string, status: AdminOrderStatus) => void;
  onCancel: (id: string) => void;
  onRefund: (id: string) => void;
}

export function OrderDetailModal({
  order,
  open,
  onClose,
  onStatusChange,
  onCancel,
  onRefund,
}: OrderDetailModalProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[min(90dvh,100%)] max-w-2xl overflow-y-auto border-champagne/50 bg-warmwhite sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-light sm:text-2xl">
            {order.orderNumber}
          </DialogTitle>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <AdminStatusBadge status={order.status} />
            <span className="font-body text-xs text-charcoalsoft">
              {formatAdminDate(order.createdAt)}
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          <section>
            <p className="editorial-label mb-2">Customer</p>
            <p className="font-body text-sm text-charcoal">{order.customerName}</p>
            <p className="font-body text-xs text-charcoalsoft">
              {order.customerEmail} · {order.customerPhone}
            </p>
            <p className="font-body text-xs text-taupe">Ship to {order.shippingCity}</p>
          </section>

          <section>
            <p className="editorial-label mb-3">Items</p>
            <ul className="space-y-3">
              {order.items.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl border border-champagne/30 bg-ivory/50 p-3"
                >
                  <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-cream">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-body text-sm font-medium text-charcoal">
                      {item.name}
                    </p>
                    <p className="font-body text-xs text-charcoalsoft">
                      {item.size} · {item.color} · Qty {item.quantity}
                    </p>
                    <p className="font-body text-sm text-bronze">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-right font-display text-xl text-charcoal">
              {formatPrice(order.total)}
            </p>
          </section>

          <section>
            <p className="editorial-label mb-2">Payment</p>
            <p className="font-body text-sm">{order.paymentMethod}</p>
            <p className="font-body text-xs capitalize text-charcoalsoft">
              Status: {order.paymentStatus.replace("_", " ")}
            </p>
          </section>

          {order.tailoringNotes ? (
            <section className="rounded-xl bg-champagne/20 p-4">
              <p className="editorial-label mb-1">Tailoring</p>
              <p className="font-body text-sm text-charcoal">{order.tailoringNotes}</p>
            </section>
          ) : null}

          {order.trackingId ? (
            <p className="font-body text-xs text-charcoalsoft">
              Tracking: {order.trackingId}
            </p>
          ) : null}

          <section>
            <p className="editorial-label mb-2">Update status</p>
            <select
              value={order.status}
              onChange={(e) =>
                onStatusChange(order.id, e.target.value as AdminOrderStatus)
              }
              className="w-full rounded-lg border border-champagne/50 bg-ivory px-3 py-2 font-body text-sm"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {ORDER_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </section>

          <div className="flex flex-wrap gap-2 border-t border-champagne/30 pt-4">
            <Button
              type="button"
              variant="outline"
              className="border-champagne text-charcoal"
              onClick={() => window.print()}
            >
              Print invoice
            </Button>
            {order.status !== "cancelled" ? (
              <Button
                type="button"
                variant="outline"
                className="border-burgundy/30 text-burgundy"
                onClick={() => onCancel(order.id)}
              >
                Cancel order
              </Button>
            ) : null}
            {order.paymentStatus === "paid" ? (
              <Button
                type="button"
                variant="outline"
                className="text-charcoalsoft"
                onClick={() => onRefund(order.id)}
              >
                Process refund
              </Button>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
