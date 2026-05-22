"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { formatAdminDate } from "@/lib/admin-utils";
import type { AdminCustomer } from "@/types/admin";
import type { AdminOrder } from "@/types/admin";

interface CustomerDetailModalProps {
  customer: AdminCustomer | null;
  orders: AdminOrder[];
  open: boolean;
  onClose: () => void;
  onToggleBlock: (id: string) => void;
}

export function CustomerDetailModal({
  customer,
  orders,
  open,
  onClose,
  onToggleBlock,
}: CustomerDetailModalProps) {
  if (!customer) return null;

  const customerOrders = orders.filter((o) => o.customerId === customer.id);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto border-champagne/50 bg-warmwhite">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-light">
            {customer.firstName} {customer.lastName}
          </DialogTitle>
          <p className="font-body text-sm text-charcoalsoft">{customer.email}</p>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="rounded-xl bg-cream/60 p-4">
            <p className="text-[10px] uppercase tracking-wider text-bronze">Spent</p>
            <p className="font-display text-xl">{formatPrice(customer.totalSpent)}</p>
          </div>
          <div className="rounded-xl bg-cream/60 p-4">
            <p className="text-[10px] uppercase tracking-wider text-bronze">Orders</p>
            <p className="font-display text-xl">{customer.orderCount}</p>
          </div>
        </div>

        <p className="editorial-label">Order history</p>
        <ul className="mt-2 space-y-2">
          {customerOrders.length ? (
            customerOrders.map((o) => (
              <li
                key={o.id}
                className="flex justify-between rounded-lg border border-champagne/30 px-3 py-2 font-body text-sm"
              >
                <span>{o.orderNumber}</span>
                <span className="text-bronze">{formatPrice(o.total)}</span>
              </li>
            ))
          ) : (
            <li className="font-body text-sm text-charcoalsoft">No orders yet</li>
          )}
        </ul>

        <p className="mt-4 font-body text-xs text-taupe">
          Wishlist items: {customer.wishlistCount} · Joined {formatAdminDate(customer.joinedAt)}
        </p>

        <Button
          type="button"
          variant="outline"
          className="mt-4 w-full border-burgundy/30 text-burgundy"
          onClick={() => onToggleBlock(customer.id)}
        >
          {customer.status === "active" ? "Block customer" : "Unblock customer"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
