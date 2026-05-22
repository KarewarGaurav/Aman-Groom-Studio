"use client";

import { useState } from "react";
import {
  CreditCard,
  Building2,
  Banknote,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PAYMENT_OPTIONS,
  type PaymentOptionId,
} from "@/lib/payment-options";
import { cn } from "@/lib/utils";

const UPI_APPS: PaymentOptionId[] = [
  "upi",
  "gpay",
  "paytm",
  "phonepe",
  "amazonpay",
];

function PaymentIcon({ id }: { id: PaymentOptionId }) {
  if (id === "razorpay") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#072654] text-[10px] font-bold uppercase tracking-wide text-white">
        RZP
      </span>
    );
  }
  if (id === "gpay") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-white border border-taupe/15 text-[9px] font-bold text-charcoal">
        GPay
      </span>
    );
  }
  if (id === "paytm") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#00BAF2] text-[9px] font-bold text-white">
        Paytm
      </span>
    );
  }
  if (id === "phonepe") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#5F259F] text-[8px] font-bold text-white">
        PhonePe
      </span>
    );
  }
  if (id === "amazonpay") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#FF9900] text-[8px] font-bold text-charcoal">
        amazon
      </span>
    );
  }
  if (id === "upi") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#097939] text-[9px] font-bold text-white">
        UPI
      </span>
    );
  }
  if (id === "card") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-cream text-burgundy">
        <CreditCard className="h-5 w-5" />
      </span>
    );
  }
  if (id === "netbanking") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-cream text-burgundy">
        <Building2 className="h-5 w-5" />
      </span>
    );
  }
  if (id === "cod") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-cream text-burgundy">
        <Banknote className="h-5 w-5" />
      </span>
    );
  }
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-cream">
      <Smartphone className="h-5 w-5 text-burgundy" />
    </span>
  );
}

interface PaymentOptionsProps {
  selected: PaymentOptionId;
  onSelect: (id: PaymentOptionId) => void;
  onDetailChange?: (detail: string) => void;
}

export function PaymentOptions({
  selected,
  onSelect,
  onDetailChange,
}: PaymentOptionsProps) {
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [selectedBank, setSelectedBank] = useState("hdfc");

  const upiOptions = PAYMENT_OPTIONS.filter((p) => UPI_APPS.includes(p.id));
  const otherOptions = PAYMENT_OPTIONS.filter(
    (p) => !UPI_APPS.includes(p.id) && p.id !== "razorpay"
  );
  const razorpay = PAYMENT_OPTIONS.find((p) => p.id === "razorpay")!;

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-sm border border-taupe/15 bg-cream/50 px-4 py-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-burgundy" />
        <p className="text-sm text-charcoalsoft">
          All payments are secured with 256-bit encryption. Razorpay powers
          cards, UPI, wallets, and net banking at checkout.
        </p>
      </div>

      <button
        type="button"
        onClick={() => onSelect(razorpay.id)}
        className={cn(
          "flex w-full items-center gap-4 rounded-sm border p-4 text-left transition-all",
          selected === razorpay.id
            ? "border-burgundy bg-burgundy/5 ring-1 ring-burgundy/20"
            : "border-taupe/15 bg-warmwhite hover:border-taupe/30"
        )}
      >
        <PaymentIcon id={razorpay.id} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-lg text-charcoal">
              {razorpay.name}
            </span>
            {razorpay.badge && (
              <span className="rounded-sm bg-burgundy px-2 py-0.5 text-[9px] uppercase tracking-wider text-warmwhite">
                {razorpay.badge}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-charcoalsoft">
            {razorpay.description}
          </p>
        </div>
        <span
          className={cn(
            "h-4 w-4 shrink-0 rounded-full border-2",
            selected === razorpay.id
              ? "border-burgundy bg-burgundy"
              : "border-taupe/40"
          )}
          aria-hidden
        />
      </button>

      <div>
        <p className="editorial-label mb-3">UPI & Wallets</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {upiOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={cn(
                "flex items-center gap-3 rounded-sm border p-3 text-left transition-all",
                selected === option.id
                  ? "border-burgundy bg-burgundy/5 ring-1 ring-burgundy/20"
                  : "border-taupe/15 bg-warmwhite hover:border-taupe/30"
              )}
            >
              <PaymentIcon id={option.id} />
              <div className="min-w-0 flex-1">
                <p className="font-sans text-sm font-medium text-charcoal">
                  {option.name}
                </p>
                <p className="truncate text-xs text-charcoalsoft">
                  {option.description}
                </p>
              </div>
              <span
                className={cn(
                  "h-3.5 w-3.5 shrink-0 rounded-full border-2",
                  selected === option.id
                    ? "border-burgundy bg-burgundy"
                    : "border-taupe/40"
                )}
                aria-hidden
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="editorial-label mb-3">More Options</p>
        <div className="space-y-3">
          {otherOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={cn(
                "flex w-full items-center gap-4 rounded-sm border p-4 text-left transition-all",
                selected === option.id
                  ? "border-burgundy bg-burgundy/5 ring-1 ring-burgundy/20"
                  : "border-taupe/15 bg-warmwhite hover:border-taupe/30"
              )}
            >
              <PaymentIcon id={option.id} />
              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm font-medium text-charcoal">
                  {option.name}
                </p>
                <p className="text-xs text-charcoalsoft">{option.description}</p>
              </div>
              <span
                className={cn(
                  "h-4 w-4 shrink-0 rounded-full border-2",
                  selected === option.id
                    ? "border-burgundy bg-burgundy"
                    : "border-taupe/40"
                )}
                aria-hidden
              />
            </button>
          ))}
        </div>
      </div>

      {selected === "razorpay" && (
        <div className="rounded-sm border border-dashed border-taupe/25 bg-cream/40 px-4 py-5 text-center">
          <p className="text-sm text-charcoal">
            You will be redirected to Razorpay secure checkout
          </p>
          <p className="mt-1 text-xs text-charcoalsoft">
            Supports all UPI apps, cards, Paytm, PhonePe, net banking & more
          </p>
        </div>
      )}

      {UPI_APPS.includes(selected) && selected !== "razorpay" && (
        <div className="space-y-3 rounded-sm border border-taupe/15 bg-warmwhite p-4">
          <Label htmlFor="upi-id">UPI ID / VPA</Label>
          <Input
            id="upi-id"
            placeholder="yourname@upi"
            value={upiId}
            onChange={(e) => {
              setUpiId(e.target.value);
              onDetailChange?.(e.target.value);
            }}
          />
          <p className="text-xs text-charcoalsoft">
            Or scan QR on the next screen after confirming your order
          </p>
        </div>
      )}

      {selected === "card" && (
        <div className="space-y-3 rounded-sm border border-taupe/15 bg-warmwhite p-4">
          <Input
            placeholder="Card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="MM/YY"
              value={cardExpiry}
              onChange={(e) => setCardExpiry(e.target.value)}
            />
            <Input placeholder="CVV" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} />
          </div>
          <p className="text-xs text-charcoalsoft">
            Processed securely via Razorpay
          </p>
        </div>
      )}

      {selected === "netbanking" && (
        <div className="rounded-sm border border-taupe/15 bg-warmwhite p-4">
          <Label htmlFor="bank">Select Bank</Label>
          <select
            id="bank"
            value={selectedBank}
            onChange={(e) => {
              setSelectedBank(e.target.value);
              onDetailChange?.(e.target.options[e.target.selectedIndex].text);
            }}
            className="mt-2 flex h-11 w-full rounded-sm border border-taupe/20 bg-warmwhite px-4 font-sans text-sm text-charcoal focus-visible:border-burgundy/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-burgundy/20"
          >
            <option value="hdfc">HDFC Bank</option>
            <option value="icici">ICICI Bank</option>
            <option value="sbi">State Bank of India</option>
            <option value="axis">Axis Bank</option>
            <option value="kotak">Kotak Mahindra Bank</option>
            <option value="pnb">Punjab National Bank</option>
          </select>
        </div>
      )}

      {selected === "cod" && (
        <p className="text-sm text-charcoalsoft">
          Pay in cash when your order is delivered. Our concierge may call to
          confirm availability for your pin code.
        </p>
      )}
    </div>
  );
}
