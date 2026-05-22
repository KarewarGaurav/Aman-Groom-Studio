"use client";

import { useMemo, useState } from "react";
import { useAdminPageEnter } from "@/hooks/useAdminGsap";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminLuxuryTable } from "@/components/admin/AdminLuxuryTable";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { useAdminStore } from "@/store/admin-store";
import { formatAdminDate } from "@/lib/admin-utils";
import { formatPrice } from "@/lib/utils";
import { IndianRupee, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminPaymentsView() {
  const ref = useAdminPageEnter();
  const payments = useAdminStore((s) => s.payments);
  const orders = useAdminStore((s) => s.orders);
  const [statusFilter, setStatusFilter] = useState("all");

  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((s, p) => s + p.amount, 0);
  const refunded = payments
    .filter((p) => p.status === "refunded")
    .reduce((s, p) => s + p.amount, 0);

  const filtered = useMemo(
    () =>
      payments.filter(
        (p) => statusFilter === "all" || p.status === statusFilter
      ),
    [payments, statusFilter]
  );

  return (
    <div ref={ref}>
      <AdminPageHeader
        label="Finance"
        title="Payments"
        description="Transactions, refunds, and revenue tracking."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <AdminStatCard
          label="Completed revenue"
          value={formatPrice(totalRevenue)}
          icon={IndianRupee}
          accent="gold"
        />
        <AdminStatCard
          label="Refunded"
          value={formatPrice(refunded)}
          icon={RefreshCw}
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="mb-4 rounded-full border border-champagne/50 bg-warmwhite px-4 py-2 font-body text-sm"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="refunded">Refunded</option>
      </select>

      <AdminLuxuryTable
        data={filtered}
        keyExtractor={(p) => p.id}
        columns={[
          {
            key: "ord",
            header: "Order",
            primary: true,
            cell: (p) => p.orderNumber,
          },
          { key: "cust", header: "Customer", cell: (p) => p.customerName },
          {
            key: "amt",
            header: "Amount",
            cell: (p) => formatPrice(p.amount),
          },
          {
            key: "method",
            header: "Method",
            cell: (p) => p.method,
            hideOnMobile: true,
          },
          {
            key: "status",
            header: "Status",
            cell: (p) => (
              <span
                className={cn(
                  "text-xs uppercase tracking-wider",
                  p.status === "completed" && "text-bronze",
                  p.status === "refunded" && "text-burgundy",
                  p.status === "pending" && "text-charcoalsoft"
                )}
              >
                {p.status}
              </span>
            ),
          },
          {
            key: "date",
            header: "Date",
            cell: (p) => formatAdminDate(p.createdAt),
            hideOnMobile: true,
          },
        ]}
      />

      <p className="mt-4 font-body text-xs text-taupe">
        Pending checkout orders:{" "}
        {orders.filter((o) => o.paymentStatus === "pending").length}
      </p>
    </div>
  );
}
