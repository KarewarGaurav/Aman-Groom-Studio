"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Download, RotateCcw } from "lucide-react";
import { AccountShell } from "@/components/account/AccountShell";
import { OrderTimeline } from "@/components/account/OrderTimeline";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { useAuthStore } from "@/store/auth-store";
import { useAuthOrder } from "@/hooks/use-auth";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const order = useAuthOrder(id);
  const reorder = useAuthStore((s) => s.reorder);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  if (!order) {
    return (
      <AccountShell title="Order Not Found">
        <p className="text-charcoalsoft">This order could not be found.</p>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/account/orders">Back to orders</Link>
        </Button>
      </AccountShell>
    );
  }

  const handleReorder = () => {
    const items = reorder(order.id);
    items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) addItem(product, item.size, item.color, item.quantity);
    });
    openCart();
  };

  const handleInvoice = () => {
    window.print();
  };

  return (
    <AccountShell
      title={order.orderNumber}
      subtitle={`Placed ${new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`}
      skeletonVariant="list"
    >
      <div className="flex flex-wrap items-center gap-3">
        <OrderStatusBadge status={order.status} />
        <Button variant="outline" size="sm" onClick={handleInvoice}>
          <Download className="mr-2 h-4 w-4" />
          Download Invoice
        </Button>
        <Button variant="default" size="sm" onClick={handleReorder}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reorder
        </Button>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="rounded-sm border border-taupe/15 bg-warmwhite p-6 product-card-shadow">
          <h2 className="font-display text-xl text-charcoal">Order Progress</h2>
          <div className="mt-8">
            <OrderTimeline steps={order.timeline} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-sm border border-taupe/15 bg-warmwhite p-6 product-card-shadow">
            <h2 className="font-display text-xl text-charcoal">Delivery</h2>
            <p className="mt-4 text-sm text-charcoalsoft">
              Estimated:{" "}
              <span className="font-medium text-charcoal">
                {new Date(order.estimatedDelivery).toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </span>
            </p>
            <p className="mt-4 text-sm text-charcoal">
              {order.shippingAddress.line1}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.pin}
            </p>
          </div>

          <div className="rounded-sm border border-taupe/15 bg-warmwhite p-6 product-card-shadow">
            <h2 className="font-display text-xl text-charcoal">Payment</h2>
            <p className="mt-4 text-sm text-charcoal">{order.paymentLabel}</p>
            <p className="mt-2 font-display text-2xl text-charcoal">
              {formatPrice(order.total)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-sm border border-taupe/15 bg-warmwhite p-6 product-card-shadow">
        <h2 className="font-display text-xl text-charcoal">Items</h2>
        <ul className="mt-6 divide-y divide-taupe/10">
          {order.items.map((item) => (
            <li
              key={`${item.productId}-${item.size}`}
              className="flex gap-4 py-4 first:pt-0"
            >
              <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-cream">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized={item.image.startsWith("http")}
                />
              </div>
              <div className="flex-1">
                <p className="font-display text-lg text-charcoal">{item.name}</p>
                <p className="text-sm text-charcoalsoft">
                  {item.size} · {item.color} · Qty {item.quantity}
                </p>
              </div>
              <p className="text-sm font-medium">
                {formatPrice(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <Button asChild variant="ghost" className="mt-8">
        <Link href="/account/orders">← All orders</Link>
      </Button>
    </AccountShell>
  );
}
