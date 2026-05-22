"use client";

import Link from "next/link";
import Image from "next/image";
import { AccountShell } from "@/components/account/AccountShell";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { EmptyAccountState } from "@/components/account/EmptyAccountState";
import { useAuthOrders } from "@/hooks/use-auth";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
  const orders = useAuthOrders();

  return (
    <AccountShell title="Orders" subtitle="Track and manage your couture purchases.">
      {orders.length === 0 ? (
        <EmptyAccountState
          title="No orders yet"
          description="When you place an order, it will appear here with full tracking."
        />
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="rounded-sm border border-taupe/15 bg-warmwhite p-6 product-card-shadow"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-cream">
                  {order.items[0] && (
                    <Image
                      src={order.items[0].image}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized={order.items[0].image.startsWith("http")}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-display text-xl text-charcoal">
                      {order.orderNumber}
                    </p>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <p className="mt-2 text-sm text-charcoalsoft">
                    Placed{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    · {order.items.length} item
                    {order.items.length > 1 ? "s" : ""}
                  </p>
                  <p className="mt-1 font-display text-lg text-charcoal">
                    {formatPrice(order.total)}
                  </p>
                  <p className="mt-1 text-xs text-taupe">
                    Est. delivery:{" "}
                    {new Date(order.estimatedDelivery).toLocaleDateString(
                      "en-IN",
                      { day: "numeric", month: "short", year: "numeric" }
                    )}
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:items-end">
                  <Button asChild variant="default" size="sm">
                    <Link href={`/account/order/${order.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AccountShell>
  );
}
