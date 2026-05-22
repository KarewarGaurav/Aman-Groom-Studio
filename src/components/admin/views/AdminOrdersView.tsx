"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useAdminPageEnter } from "@/hooks/useAdminGsap";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminLuxuryTable } from "@/components/admin/AdminLuxuryTable";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import { OrderDetailModal } from "@/components/admin/OrderDetailModal";
import { useAdminStore } from "@/store/admin-store";
import { formatAdminDate } from "@/lib/admin-utils";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/types/auth";
import type { AdminOrder, AdminOrderStatus } from "@/types/admin";

export function AdminOrdersView() {
  const ref = useAdminPageEnter();
  const orders = useAdminStore((s) => s.orders);
  const updateStatus = useAdminStore((s) => s.updateOrderStatus);
  const cancelOrder = useAdminStore((s) => s.cancelOrder);
  const refundOrder = useAdminStore((s) => s.refundOrder);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<AdminOrder | null>(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        !search ||
        o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        o.customerName.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "all" || o.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  return (
    <div ref={ref}>
      <AdminPageHeader
        label="Operations"
        title="Orders"
        description="Manage wedding orders, tailoring workflow, and dispatch."
      />

      <div
        data-admin-enter
        className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />
          <input
            type="search"
            placeholder="Search orders…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-champagne/50 bg-warmwhite py-2 pl-10 pr-4 font-body text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-full border border-champagne/50 bg-warmwhite px-4 py-2 font-body text-sm"
        >
          <option value="all">All statuses</option>
          {(Object.keys(ORDER_STATUS_LABELS) as AdminOrderStatus[]).map((s) => (
            <option key={s} value={s}>
              {ORDER_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <AdminLuxuryTable
        data={filtered}
        keyExtractor={(o) => o.id}
        onRowClick={setSelected}
        columns={[
          {
            key: "num",
            header: "Order",
            primary: true,
            cell: (o) => o.orderNumber,
          },
          { key: "cust", header: "Customer", cell: (o) => o.customerName },
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
            key: "pay",
            header: "Payment",
            cell: (o) => (
              <span className="capitalize text-charcoalsoft">
                {o.paymentStatus}
              </span>
            ),
            hideOnMobile: true,
          },
          {
            key: "date",
            header: "Date",
            cell: (o) => formatAdminDate(o.createdAt),
            hideOnMobile: true,
          },
        ]}
      />

      <OrderDetailModal
        order={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        onStatusChange={(id, status) => {
          updateStatus(id, status);
          setSelected((prev) =>
            prev && prev.id === id ? { ...prev, status } : prev
          );
        }}
        onCancel={(id) => {
          cancelOrder(id);
          setSelected(null);
        }}
        onRefund={refundOrder}
      />
    </div>
  );
}
