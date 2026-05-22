"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sumVariantStock } from "@/lib/admin-inventory-utils";
import type { AdminInventoryRow, AdminProductVariant } from "@/types/admin";

interface InventoryEditModalProps {
  row: AdminInventoryRow | null;
  open: boolean;
  onClose: () => void;
  onSave: (
    productId: string,
    data: {
      sizes: AdminProductVariant[];
      available: boolean;
    }
  ) => void;
}

export function InventoryEditModal({
  row,
  open,
  onClose,
  onSave,
}: InventoryEditModalProps) {
  const [sizes, setSizes] = useState<AdminProductVariant[]>([]);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (!row) return;
    setSizes(
      row.sizes.length
        ? row.sizes.map((s) => ({ size: s.size, stock: s.stock }))
        : [{ size: "One Size", stock: row.totalStock }]
    );
    setAvailable(row.available);
  }, [row]);

  const totalStock = useMemo(() => sumVariantStock(sizes), [sizes]);

  const updateSizeStock = (index: number, stock: string) => {
    setSizes((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, stock: Math.max(0, Math.floor(Number(stock) || 0)) }
          : item
      )
    );
  };

  const handleSave = () => {
    if (!row) return;
    onSave(row.productId, {
      sizes,
      available: available && totalStock > 0,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[min(90dvh,100%)] overflow-y-auto border-champagne/50 bg-warmwhite sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-light">
            Update inventory
          </DialogTitle>
        </DialogHeader>
        {row ? (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-cream">
                <Image
                  src={row.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="min-w-0">
                <p className="font-body text-sm font-medium text-charcoal">
                  {row.productName}
                </p>
                <p className="font-body text-xs text-charcoalsoft">
                  SKU {row.sku}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-champagne/50 bg-ivory/50 px-4 py-3">
              <p className="font-body text-[10px] uppercase tracking-wider text-bronze">
                Total stock
              </p>
              <p className="font-display text-2xl font-medium text-charcoal">
                {totalStock}
              </p>
              <p className="mt-1 font-body text-[11px] text-charcoalsoft">
                Auto-synced from size counts · updates product catalogue
              </p>
            </div>

            <div>
              <Label className="mb-2 block">Stock by size</Label>
              <ul className="space-y-2">
                {sizes.map((variant, index) => (
                  <li
                    key={`${variant.size}-${index}`}
                    className="flex items-center gap-3 rounded-lg border border-champagne/40 bg-warmwhite px-3 py-2"
                  >
                    <span className="w-12 shrink-0 font-body text-sm font-medium text-charcoal">
                      {variant.size}
                    </span>
                    <Input
                      type="number"
                      min={0}
                      value={variant.stock}
                      onChange={(e) => updateSizeStock(index, e.target.value)}
                      className="h-9 flex-1"
                      aria-label={`Stock for size ${variant.size}`}
                    />
                    <span className="shrink-0 font-body text-xs text-taupe">
                      units
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <label className="flex cursor-pointer items-center gap-2 font-body text-sm text-charcoal">
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                className="accent-burgundy"
              />
              Available for sale
            </label>

            <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="button"
                className="bg-charcoal hover:bg-burgundy"
                onClick={handleSave}
              >
                Save & sync
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
