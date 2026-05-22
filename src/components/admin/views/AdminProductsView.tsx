"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Plus, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminPageEnter } from "@/hooks/useAdminGsap";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminLuxuryTable } from "@/components/admin/AdminLuxuryTable";
import { ProductFormModal } from "@/components/admin/ProductFormModal";
import { useAdminStore } from "@/store/admin-store";
import { formatPrice } from "@/lib/utils";
import type { AdminProduct } from "@/types/admin";

export function AdminProductsView() {
  const ref = useAdminPageEnter();
  const products = useAdminStore((s) => s.products);
  const addProduct = useAdminStore((s) => s.addProduct);
  const updateProduct = useAdminStore((s) => s.updateProduct);
  const deleteProduct = useAdminStore((s) => s.deleteProduct);
  const toggleFeatured = useAdminStore((s) => s.toggleProductFeatured);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProduct | null>(null);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          !search ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.includes(search.toLowerCase())
      ),
    [products, search]
  );

  const handleSave = (p: AdminProduct) => {
    if (editing) updateProduct(p.id, p);
    else addProduct(p);
    setEditing(null);
  };

  return (
    <div ref={ref}>
      <AdminPageHeader
        label="Catalogue"
        title="Products"
        description="Manage sherwanis, tuxedos, and couture inventory."
        action={
          <Button
            className="bg-charcoal hover:bg-burgundy"
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add product
          </Button>
        }
      />

      <div data-admin-enter className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />
        <input
          type="search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-champagne/50 bg-warmwhite py-2 pl-10 pr-4 font-body text-sm"
        />
      </div>

      <AdminLuxuryTable
        data={filtered}
        keyExtractor={(p) => p.id}
        columns={[
          {
            key: "img",
            header: "",
            hideOnMobile: true,
            cell: (p) => (
              <div className="relative h-14 w-11 overflow-hidden rounded-lg bg-cream">
                <Image src={p.image} alt="" fill className="object-cover" sizes="44px" />
              </div>
            ),
            className: "w-16",
          },
          {
            key: "name",
            header: "Product",
            primary: true,
            cell: (p) => (
              <div>
                <p className="font-medium">{p.name}</p>
                {p.featured ? (
                  <Star className="mt-0.5 inline h-3 w-3 fill-sandgold text-sandgold" />
                ) : null}
              </div>
            ),
          },
          {
            key: "cat",
            header: "Category",
            cell: (p) => (
              <span className="capitalize text-charcoalsoft">{p.category}</span>
            ),
            hideOnMobile: true,
          },
          {
            key: "price",
            header: "Price",
            cell: (p) => formatPrice(p.price),
          },
          {
            key: "stock",
            header: "Stock",
            cell: (p) => p.stockCount,
          },
          {
            key: "actions",
            header: "",
            cell: (p) => (
              <div className="flex gap-2">
                <button
                  type="button"
                  className="font-body text-xs text-bronze hover:underline"
                  onClick={() => {
                    setEditing(p);
                    setModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="font-body text-xs text-bronze hover:underline"
                  onClick={() => toggleFeatured(p.id)}
                >
                  {p.featured ? "Unfeature" : "Feature"}
                </button>
                <button
                  type="button"
                  className="font-body text-xs text-burgundy hover:underline"
                  onClick={() => {
                    if (confirm("Delete this product?")) deleteProduct(p.id);
                  }}
                >
                  Delete
                </button>
              </div>
            ),
          },
        ]}
      />

      <ProductFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        product={editing}
        onSave={handleSave}
      />
    </div>
  );
}
