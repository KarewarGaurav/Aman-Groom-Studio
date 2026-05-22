"use client";

import Image from "next/image";
import { AdminNavLink } from "@/components/admin/AdminNavLink";
import { useAdminRouter } from "@/hooks/useAdminRouter";
import {
  ShoppingBag,
  IndianRupee,
  Clock,
  PackageCheck,
  Users,
  AlertTriangle,
} from "lucide-react";
import { useAdminDashboardReveal } from "@/hooks/useAdminGsap";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { AdminLuxuryTable } from "@/components/admin/AdminLuxuryTable";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import { RevenueAreaChart } from "@/components/admin/charts/RevenueAreaChart";
import { useAdminStore } from "@/store/admin-store";
import { computeDashboardStats, formatAdminDate } from "@/lib/admin-utils";
import { formatPrice } from "@/lib/utils";
import { revenueChartData, topSellingProducts } from "@/data/admin-mock";

export function AdminDashboardView() {
  const router = useAdminRouter();
  const ref = useAdminDashboardReveal();
  const orders = useAdminStore((s) => s.orders);
  const customers = useAdminStore((s) => s.customers);
  const products = useAdminStore((s) => s.products);
  const notifications = useAdminStore((s) => s.notifications);

  const stats = computeDashboardStats(orders, customers, products);
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  const recentCustomers = [...customers].slice(0, 4);
  const unreadNotifs = notifications.filter((n) => !n.read).slice(0, 4);

  return (
    <div ref={ref}>
      <AdminPageHeader
        label="Studio Control"
        title="Dashboard"
        description="Overview of orders, revenue, and atelier operations."
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6">
        <AdminStatCard
          label="Total orders"
          value={String(stats.totalOrders)}
          icon={ShoppingBag}
          accent="sapphire"
        />
        <AdminStatCard
          label="Total revenue"
          value={formatPrice(stats.totalRevenue)}
          icon={IndianRupee}
          accent="gold"
          trend="+18% vs last month"
        />
        <AdminStatCard
          label="Pending"
          value={String(stats.pendingOrders)}
          icon={Clock}
          accent="burgundy"
        />
        <AdminStatCard
          label="Delivered"
          value={String(stats.deliveredOrders)}
          icon={PackageCheck}
          accent="emerald"
        />
        <AdminStatCard
          label="Active clients"
          value={String(stats.activeCustomers)}
          icon={Users}
          accent="amber"
        />
        <AdminStatCard
          label="Low stock"
          value={String(stats.lowStockAlerts)}
          hint="Requires attention"
          icon={AlertTriangle}
          accent="burgundy"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div
          data-dash-card
          className="admin-card border-sandgold/40 bg-gradient-to-br from-champagne/25 to-warmwhite p-5 lg:col-span-2"
        >
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-lg font-medium text-burgundy sm:text-xl">
              Revenue
            </h2>
            <AdminNavLink
              href="/admin/analytics"
              className="w-fit cursor-pointer rounded-full border border-burgundy/20 bg-burgundy/5 px-3 py-1 font-body text-xs font-medium text-burgundy transition-colors hover:bg-burgundy/12"
            >
              View analytics →
            </AdminNavLink>
          </div>
          <RevenueAreaChart data={revenueChartData} />
        </div>

        <div
          data-dash-card
          className="admin-card border-burgundy/15 bg-gradient-to-br from-burgundy/5 to-warmwhite p-5"
        >
          <h2 className="font-display text-xl font-medium text-burgundy">
            Notifications
          </h2>
          <ul className="mt-4 space-y-3">
            {unreadNotifs.map((n) => {
              const accent =
                n.type === "order"
                  ? "border-l-sky-500 bg-sky-50/70"
                  : n.type === "inventory"
                    ? "border-l-amber-500 bg-amber-50/70"
                    : n.type === "payment"
                      ? "border-l-emerald-500 bg-emerald-50/70"
                      : "border-l-violet-500 bg-violet-50/70";
              return (
                <li
                  key={n.id}
                  className={`rounded-xl border-l-4 px-3 py-2 ${accent}`}
                >
                  <p className="font-body text-sm font-semibold text-charcoal">
                    {n.title}
                  </p>
                  <p className="font-body text-xs text-charcoalsoft">
                    {n.message}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div
          data-dash-card
          className="admin-card border-amber-400/25 bg-gradient-to-br from-amber-50/50 to-warmwhite p-5"
        >
          <h2 className="mb-4 font-display text-xl font-medium text-amber-900">
            Top selling
          </h2>
          <ul className="space-y-3">
            {topSellingProducts.map((p) => (
              <li key={p.name} className="flex items-center gap-3">
                <div className="relative h-12 w-10 overflow-hidden rounded-lg bg-cream">
                  <Image src={p.image} alt="" fill className="object-cover" sizes="40px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-body text-sm text-charcoal">{p.name}</p>
                  <p className="font-body text-xs text-taupe">{p.sales} sold</p>
                </div>
                <p className="font-body text-sm text-bronze">{formatPrice(p.revenue)}</p>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-dash-card
          className="admin-card border-emerald-600/20 bg-gradient-to-br from-emerald-50/40 to-warmwhite p-5"
        >
          <h2 className="mb-4 font-display text-xl font-medium text-emerald-900">
            Recent clients
          </h2>
          <ul className="space-y-2">
            {recentCustomers.map((c) => (
              <li
                key={c.id}
                className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-emerald-100/50"
              >
                <span className="font-body text-sm">
                  {c.firstName} {c.lastName}
                </span>
                <span className="font-body text-xs text-bronze">
                  {formatPrice(c.totalSpent)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="admin-card mt-8 border-sky-500/20 bg-gradient-to-br from-sky-50/30 to-warmwhite p-5"
        data-dash-card
      >
        <h2 className="mb-4 font-display text-xl font-medium text-sky-900">
          Recent orders
        </h2>
        <AdminLuxuryTable
          data={recentOrders}
          keyExtractor={(o) => o.id}
          onRowClick={() => router.push("/admin/orders")}
          columns={[
            {
              key: "num",
              header: "Order",
              primary: true,
              cell: (o) => (
                <span className="font-medium">{o.orderNumber}</span>
              ),
            },
            {
              key: "customer",
              header: "Customer",
              cell: (o) => o.customerName,
              hideOnMobile: true,
            },
            {
              key: "total",
              header: "Total",
              cell: (o) => formatPrice(o.total),
            },
            {
              key: "status",
              header: "Status",
              cell: (o) => <AdminStatusBadge status={o.status} />,
            },
            {
              key: "date",
              header: "Date",
              cell: (o) => formatAdminDate(o.createdAt),
              hideOnMobile: true,
            },
          ]}
        />
      </div>
    </div>
  );
}
