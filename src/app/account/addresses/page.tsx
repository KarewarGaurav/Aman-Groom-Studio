"use client";

import { useState } from "react";
import { AccountShell } from "@/components/account/AccountShell";
import { EmptyAccountState } from "@/components/account/EmptyAccountState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store";
import { useAuthAddresses, useAuthPaymentMethods } from "@/hooks/use-auth";
import type { Address } from "@/types/auth";
import { cn } from "@/lib/utils";

export default function AddressesPage() {
  const addresses = useAuthAddresses();
  const addAddress = useAuthStore((s) => s.addAddress);
  const removeAddress = useAuthStore((s) => s.removeAddress);
  const setDefaultAddress = useAuthStore((s) => s.setDefaultAddress);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Address, "id">>({
    label: "Home",
    line1: "",
    line2: "",
    city: "New Delhi",
    state: "Delhi",
    pin: "",
    isDefault: addresses.length === 0,
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(form);
    setShowForm(false);
    setForm({
      label: "Home",
      line1: "",
      line2: "",
      city: "New Delhi",
      state: "Delhi",
      pin: "",
      isDefault: false,
    });
  };

  return (
    <AccountShell
      title="Addresses"
      subtitle="Manage delivery locations for your orders."
      skeletonVariant="form"
    >
      <Button variant="outline" size="sm" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Address"}
      </Button>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="mt-6 space-y-4 rounded-sm border border-taupe/15 bg-cream/30 p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="label">Label</Label>
              <Input id="label" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="pin">PIN</Label>
              <Input id="pin" value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value })} className="mt-2" required />
            </div>
          </div>
          <div>
            <Label htmlFor="line1">Address Line 1</Label>
            <Input id="line1" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} className="mt-2" required />
          </div>
          <div>
            <Label htmlFor="line2">Address Line 2</Label>
            <Input id="line2" value={form.line2} onChange={(e) => setForm({ ...form, line2: e.target.value })} className="mt-2" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="mt-2" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-charcoalsoft">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
              className="accent-burgundy"
            />
            Set as default
          </label>
          <Button type="submit" variant="default" size="sm">
            Save Address
          </Button>
        </form>
      )}

      <div className="mt-8 space-y-4">
        {addresses.length === 0 ? (
          <EmptyAccountState
            title="No saved addresses"
            description="Add a delivery address for faster checkout."
            href="#"
            cta="Add above"
          />
        ) : (
          addresses.map((addr) => (
            <div
              key={addr.id}
              className={cn(
                "rounded-sm border bg-warmwhite p-6 product-card-shadow",
                addr.isDefault ? "border-burgundy/30" : "border-taupe/15"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-bronze">
                    {addr.label}
                    {addr.isDefault && " · Default"}
                  </p>
                  <p className="mt-2 text-sm text-charcoal">
                    {addr.line1}
                    {addr.line2 && `, ${addr.line2}`}
                  </p>
                  <p className="text-sm text-charcoalsoft">
                    {addr.city}, {addr.state} — {addr.pin}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2">
                  {!addr.isDefault && (
                    <Button variant="ghost" size="sm" onClick={() => setDefaultAddress(addr.id)}>
                      Make default
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => removeAddress(addr.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-10 rounded-sm border border-taupe/15 bg-warmwhite p-6 product-card-shadow">
        <h2 className="font-display text-xl text-charcoal">Payment Methods</h2>
        <p className="mt-2 text-sm text-charcoalsoft">
          Demo UI — cards are stored locally for display only.
        </p>
        <PaymentMethodsList />
      </div>
    </AccountShell>
  );
}

function PaymentMethodsList() {
  const methods = useAuthPaymentMethods();
  const removePaymentMethod = useAuthStore((s) => s.removePaymentMethod);
  const addPaymentMethod = useAuthStore((s) => s.addPaymentMethod);

  if (methods.length === 0) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={() =>
          addPaymentMethod({
            brand: "Visa",
            last4: "0000",
            expiry: "12/28",
            isDefault: true,
          })
        }
      >
        Add demo card
      </Button>
    );
  }

  return (
    <ul className="mt-4 space-y-3">
      {methods.map((m) => (
        <li
          key={m.id}
          className="flex items-center justify-between rounded-sm border border-taupe/10 px-4 py-3 text-sm"
        >
          <span>
            {m.brand} •••• {m.last4} · {m.expiry}
            {m.isDefault && (
              <span className="ml-2 text-[10px] uppercase text-bronze">Default</span>
            )}
          </span>
          <button
            type="button"
            onClick={() => removePaymentMethod(m.id)}
            className="text-xs text-burgundy hover:underline"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
