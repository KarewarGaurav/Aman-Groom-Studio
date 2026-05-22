"use client";

import { useState } from "react";
import Image from "next/image";
import { useAdminPageEnter } from "@/hooks/useAdminGsap";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminLuxuryTable } from "@/components/admin/AdminLuxuryTable";
import { InventoryEditModal } from "@/components/admin/InventoryEditModal";
import { useAdminStore } from "@/store/admin-store";
import type { AdminInventoryRow } from "@/types/admin";
import { cn } from "@/lib/utils";

export function AdminInventoryView() {
  const ref = useAdminPageEnter();
  const inventory = useAdminStore((s) => s.inventory);
  const updateInventory = useAdminStore((s) => s.updateInventory);
  const [editing, setEditing] = useState<AdminInventoryRow | null>(null);

  const lowStock = inventory.filter(
    (r) => r.totalStock <= r.lowStockThreshold && r.available
  );

  return (
    <div ref={ref}>
      <AdminPageHeader
        label="Stock"
        title="Inventory"
        description="Track availability, sizes, and low-stock alerts. Size counts sync with products."
      />

      {lowStock.length > 0 ? (
        <div
          data-admin-enter
          className="mb-6 rounded-2xl border border-sandgold/40 bg-champagne/20 px-4 py-3 font-body text-sm text-charcoal"
        >
          <strong>{lowStock.length}</strong> product(s) below threshold — review
          restocking.
        </div>
      ) : null}

      <AdminLuxuryTable
        data={inventory}
        keyExtractor={(r) => r.productId}
        columns={[
          {
            key: "img",
            header: "",
            hideOnMobile: true,
            cell: (r) => (
              <div className="relative h-12 w-10 overflow-hidden rounded-lg bg-cream">
                <Image src={r.image} alt="" fill className="object-cover" sizes="40px" />
              </div>
            ),
            className: "w-14",
          },
          {
            key: "name",
            header: "Product",
            primary: true,
            cell: (r) => r.productName,
          },
          {
            key: "sku",
            header: "SKU",
            cell: (r) => r.sku,
            hideOnMobile: true,
          },
          {
            key: "stock",
            header: "Stock",
            cell: (r) => (
              <span
                className={cn(
                  r.totalStock <= r.lowStockThreshold && "font-medium text-burgundy"
                )}
              >
                {r.totalStock}
              </span>
            ),
          },
          {
            key: "sizes",
            header: "Sizes",
            cell: (r) =>
              r.sizes.map((s) => `${s.size} (${s.stock})`).join(", "),
          },
          {
            key: "avail",
            header: "Available",
            cell: (r) => (r.available ? "Yes" : "No"),
            hideOnMobile: true,
          },
          {
            key: "act",
            header: "",
            cell: (r) => (
              <button
                type="button"
                className="font-body text-xs text-bronze hover:underline"
                onClick={() => setEditing(r)}
              >
                Edit
              </button>
            ),
          },
        ]}
      />

      <InventoryEditModal
        row={editing}
        open={!!editing}
        onClose={() => setEditing(null)}
        onSave={(productId, data) => updateInventory(productId, data)}
      />
    </div>
  );
}
