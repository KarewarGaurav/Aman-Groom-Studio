"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminPageEnter } from "@/hooks/useAdminGsap";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useAdminStore } from "@/store/admin-store";
import type { StoreSettings } from "@/types/admin";

export function AdminSettingsView() {
  const ref = useAdminPageEnter();
  const settings = useAdminStore((s) => s.settings);
  const updateSettings = useAdminStore((s) => s.updateSettings);
  const [form, setForm] = useState<StoreSettings>(settings);
  const [saved, setSaved] = useState(false);

  const handleChange = (key: keyof StoreSettings, value: string | number | boolean) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div ref={ref}>
      <AdminPageHeader
        label="Configuration"
        title="Settings"
        description="Store details, shipping, banners, and notifications."
        action={
          <Button
            className="bg-charcoal hover:bg-burgundy"
            onClick={handleSave}
          >
            {saved ? "Saved" : "Save changes"}
          </Button>
        }
      />

      <div className="space-y-8">
        <section
          data-admin-enter
          className="rounded-2xl border border-champagne/50 bg-warmwhite p-6"
        >
          <h2 className="font-display text-xl font-light">Store information</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Store name</Label>
              <Input
                value={form.storeName}
                onChange={(e) => handleChange("storeName", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Tagline</Label>
              <Input
                value={form.tagline}
                onChange={(e) => handleChange("tagline", e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Address</Label>
              <Input
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </section>

        <section
          data-admin-enter
          className="rounded-2xl border border-champagne/50 bg-warmwhite p-6"
        >
          <h2 className="font-display text-xl font-light">Shipping & tax</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <Label>Shipping fee (₹)</Label>
              <Input
                type="number"
                value={form.shippingFee}
                onChange={(e) =>
                  handleChange("shippingFee", Number(e.target.value))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Free shipping above (₹)</Label>
              <Input
                type="number"
                value={form.freeShippingAbove}
                onChange={(e) =>
                  handleChange("freeShippingAbove", Number(e.target.value))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Tax rate (%)</Label>
              <Input
                type="number"
                value={form.taxRate}
                onChange={(e) => handleChange("taxRate", Number(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>
        </section>

        <section
          data-admin-enter
          className="rounded-2xl border border-champagne/50 bg-warmwhite p-6"
        >
          <h2 className="font-display text-xl font-light">Marketing</h2>
          <div className="mt-4 space-y-4">
            <div>
              <Label>Hero banner title</Label>
              <Input
                value={form.heroBannerTitle}
                onChange={(e) => handleChange("heroBannerTitle", e.target.value)}
                className="mt-1"
              />
            </div>
            <label className="flex items-center gap-2 font-body text-sm">
              <input
                type="checkbox"
                checked={form.promoBannerEnabled}
                onChange={(e) =>
                  handleChange("promoBannerEnabled", e.target.checked)
                }
              />
              Enable promo banner on homepage
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Instagram</Label>
                <Input
                  value={form.instagram}
                  onChange={(e) => handleChange("instagram", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>WhatsApp</Label>
                <Input
                  value={form.whatsapp}
                  onChange={(e) => handleChange("whatsapp", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          data-admin-enter
          className="rounded-2xl border border-champagne/50 bg-warmwhite p-6"
        >
          <h2 className="font-display text-xl font-light">Notifications</h2>
          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-2 font-body text-sm">
              <input
                type="checkbox"
                checked={form.orderNotifications}
                onChange={(e) =>
                  handleChange("orderNotifications", e.target.checked)
                }
              />
              Email alerts for new orders
            </label>
            <label className="flex items-center gap-2 font-body text-sm">
              <input
                type="checkbox"
                checked={form.lowStockAlerts}
                onChange={(e) =>
                  handleChange("lowStockAlerts", e.target.checked)
                }
              />
              Low stock alerts
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
