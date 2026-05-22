"use client";

import Image from "next/image";
import { useAdminDashboardReveal } from "@/hooks/useAdminGsap";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { RevenueAreaChart } from "@/components/admin/charts/RevenueAreaChart";
import { OrdersBarChart } from "@/components/admin/charts/OrdersBarChart";
import { SalesOverviewChart } from "@/components/admin/charts/SalesOverviewChart";
import { revenueChartData, topSellingProducts } from "@/data/admin-mock";
import { useAdminStore } from "@/store/admin-store";
import { computeDashboardStats } from "@/lib/admin-utils";
import { formatPrice } from "@/lib/utils";
import { TrendingUp, Users, ShoppingCart } from "lucide-react";

export function AdminAnalyticsView() {
  const ref = useAdminDashboardReveal();
  const orders = useAdminStore((s) => s.orders);
  const customers = useAdminStore((s) => s.customers);
  const products = useAdminStore((s) => s.products);
  const stats = computeDashboardStats(orders, customers, products);

  const conversionRate = 3.8;
  const growthRate = 24;

  return (
    <div ref={ref}>
      <AdminPageHeader
        label="Insights"
        title="Analytics"
        description="Revenue trends, conversion, and bestseller performance."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        <AdminStatCard
          label="Conversion rate"
          value={`${conversionRate}%`}
          icon={TrendingUp}
          trend="Shop visits to purchase"
          accent="gold"
        />
        <AdminStatCard
          label="Customer growth"
          value={`+${growthRate}%`}
          icon={Users}
          hint="Month over month"
        />
        <AdminStatCard
          label="Avg. order value"
          value={formatPrice(
            stats.totalOrders
              ? Math.round(stats.totalRevenue / stats.totalOrders)
              : 0
          )}
          icon={ShoppingCart}
        />
      </div>

      <div className="mt-8 rounded-2xl border border-champagne/50 bg-warmwhite p-5 shadow-soft">
        <h2 className="mb-4 font-display text-xl font-light">Sales overview</h2>
        <SalesOverviewChart data={revenueChartData} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-champagne/50 bg-warmwhite p-5">
          <h2 className="mb-4 font-display text-xl font-light">Revenue trend</h2>
          <RevenueAreaChart data={revenueChartData} compact />
        </div>
        <div className="rounded-2xl border border-champagne/50 bg-warmwhite p-5">
          <h2 className="mb-4 font-display text-xl font-light">Order volume</h2>
          <OrdersBarChart data={revenueChartData} />
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-champagne/50 bg-warmwhite p-5">
        <h2 className="mb-4 font-display text-xl font-light">Best-selling products</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topSellingProducts.map((p) => (
            <div
              key={p.name}
              data-dash-chart
              className="flex items-center gap-3 rounded-xl border border-champagne/30 p-3"
            >
              <div className="relative h-16 w-14 overflow-hidden rounded-lg bg-cream">
                <Image src={p.image} alt="" fill className="object-cover" sizes="56px" />
              </div>
              <div>
                <p className="font-body text-sm font-medium">{p.name}</p>
                <p className="font-body text-xs text-taupe">{p.sales} units</p>
                <p className="font-body text-sm text-bronze">{formatPrice(p.revenue)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
