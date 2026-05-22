"use client";

import Link from "next/link";
import Image from "next/image";
import { Package, Heart, MapPin, ArrowRight } from "lucide-react";
import { AccountShell } from "@/components/account/AccountShell";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { EmptyAccountState } from "@/components/account/EmptyAccountState";
import { useAuthAddresses, useAuthOrders } from "@/hooks/use-auth";
import { useWishlistStore } from "@/store/wishlist-store";
import { useRecentlyViewedStore } from "@/store/recently-viewed-store";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AccountOverviewPage() {
  const orders = useAuthOrders();
  const addresses = useAuthAddresses();
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const recentIds = useRecentlyViewedStore((s) => s.ids);
  const recentProducts = products.filter((p) => recentIds.includes(p.id)).slice(0, 4);
  const activeOrders = orders.filter(
    (o) => o.status !== "delivered" && o.status !== "cancelled"
  );

  return (
    <AccountShell
      title="Overview"
      subtitle="Your couture dashboard at a glance."
      skeletonVariant="overview"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Active Orders", value: activeOrders.length, icon: Package },
          { label: "Wishlist", value: wishlistCount, icon: Heart },
          { label: "Addresses", value: addresses.length, icon: MapPin },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-sm border border-taupe/15 bg-warmwhite p-6 product-card-shadow"
          >
            <Icon className="h-5 w-5 text-bronze" />
            <p className="mt-4 font-display text-3xl text-charcoal">{value}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-taupe">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-charcoal">Recent Orders</h2>
          <Link
            href="/account/orders"
            className="text-xs uppercase tracking-widest text-burgundy hover:underline"
          >
            View all
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="mt-6">
            <EmptyAccountState
              title="No orders yet"
              description="Your bespoke pieces will appear here once you place your first order."
            />
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {orders.slice(0, 3).map((order) => (
              <li
                key={order.id}
                className="flex flex-col gap-4 rounded-sm border border-taupe/15 bg-warmwhite p-5 product-card-shadow sm:flex-row sm:items-center"
              >
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-cream">
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
                  <p className="font-display text-lg text-charcoal">
                    {order.orderNumber}
                  </p>
                  <p className="text-sm text-charcoalsoft">
                    {formatPrice(order.total)} · Est.{" "}
                    {new Date(order.estimatedDelivery).toLocaleDateString(
                      "en-IN",
                      { day: "numeric", month: "short" }
                    )}
                  </p>
                  <div className="mt-2">
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/account/order/${order.id}`}>
                    Track
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {recentProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-2xl text-charcoal">Recently Viewed</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </AccountShell>
  );
}
