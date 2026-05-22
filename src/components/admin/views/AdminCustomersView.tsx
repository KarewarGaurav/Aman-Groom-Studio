"use client";

import { useMemo, useState } from "react";
import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminPageEnter } from "@/hooks/useAdminGsap";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminLuxuryTable } from "@/components/admin/AdminLuxuryTable";
import { CustomerDetailModal } from "@/components/admin/CustomerDetailModal";
import { useAdminStore } from "@/store/admin-store";
import { formatPrice } from "@/lib/utils";
import type { AdminCustomer } from "@/types/admin";
import { cn } from "@/lib/utils";

export function AdminCustomersView() {
  const ref = useAdminPageEnter();
  const customers = useAdminStore((s) => s.customers);
  const orders = useAdminStore((s) => s.orders);
  const toggleBlock = useAdminStore((s) => s.toggleCustomerBlock);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<AdminCustomer | null>(null);

  const filtered = useMemo(
    () =>
      customers.filter(
        (c) =>
          !search ||
          `${c.firstName} ${c.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase())
      ),
    [customers, search]
  );

  const exportCsv = () => {
    const header = "Name,Email,Phone,City,Spent,Orders,Status\n";
    const rows = customers
      .map(
        (c) =>
          `"${c.firstName} ${c.lastName}",${c.email},${c.phone},${c.city},${c.totalSpent},${c.orderCount},${c.status}`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aman-groom-customers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={ref}>
      <AdminPageHeader
        label="Clientele"
        title="Customers"
        description="Profiles, spending analytics, and wishlist activity."
        action={
          <Button variant="outline" className="border-champagne" onClick={exportCsv}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        }
      />

      <div data-admin-enter className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />
        <input
          type="search"
          placeholder="Search customers…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-champagne/50 bg-warmwhite py-2 pl-10 pr-4 font-body text-sm"
        />
      </div>

      <AdminLuxuryTable
        data={filtered}
        keyExtractor={(c) => c.id}
        onRowClick={setSelected}
        columns={[
          {
            key: "name",
            header: "Customer",
            primary: true,
            cell: (c) => (
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full font-body text-xs font-medium",
                    c.avatarColor
                  )}
                >
                  {c.firstName[0]}
                  {c.lastName[0]}
                </span>
                <span>
                  {c.firstName} {c.lastName}
                </span>
              </div>
            ),
          },
          {
            key: "email",
            header: "Email",
            cell: (c) => c.email,
            hideOnMobile: true,
          },
          {
            key: "city",
            header: "City",
            cell: (c) => c.city,
            hideOnMobile: true,
          },
          {
            key: "spent",
            header: "Spent",
            cell: (c) => formatPrice(c.totalSpent),
          },
          {
            key: "orders",
            header: "Orders",
            cell: (c) => c.orderCount,
          },
          {
            key: "status",
            header: "Status",
            cell: (c) => (
              <span
                className={cn(
                  "text-xs uppercase tracking-wider",
                  c.status === "blocked" ? "text-burgundy" : "text-bronze"
                )}
              >
                {c.status}
              </span>
            ),
          },
        ]}
      />

      <CustomerDetailModal
        customer={selected}
        orders={orders}
        open={!!selected}
        onClose={() => setSelected(null)}
        onToggleBlock={toggleBlock}
      />
    </div>
  );
}
