import { getCouponByCode } from "@/data/coupons";
import type {
  AppliedDiscountLine,
  CouponOffer,
  DiscountSummary,
} from "@/types/coupon";
import type { CartItem } from "@/store/cart-store";

function itemCount(items: CartItem[]): number {
  return items.reduce((n, i) => n + i.quantity, 0);
}

function calcLineAmount(
  offer: CouponOffer,
  subtotal: number,
  items: CartItem[],
  runningSubtotal: number
): number | null {
  switch (offer.type) {
    case "percentage":
      return Math.round(runningSubtotal * offer.value);
    case "fixed":
      if (offer.minSpend && subtotal < offer.minSpend) return null;
      return Math.min(offer.value, runningSubtotal);
    case "spend_threshold":
      if (!offer.minSpend || subtotal < offer.minSpend) return null;
      return Math.round(runningSubtotal * offer.value);
    case "item_quantity": {
      if (offer.minItems && itemCount(items) < offer.minItems) return null;
      return Math.round(runningSubtotal * offer.value);
    }
    default:
      return null;
  }
}

function validateCoupon(
  offer: CouponOffer,
  subtotal: number,
  items: CartItem[],
  appliedCodes: string[]
): string | null {
  if (appliedCodes.includes(offer.code)) {
    return "This coupon is already applied.";
  }

  if (!offer.stackable && appliedCodes.length > 0) {
    return `${offer.code} cannot be combined with other offers.`;
  }

  const hasNonStackable = appliedCodes.some((code) => {
    const c = getCouponByCode(code);
    return c && !c.stackable;
  });
  if (hasNonStackable && !offer.stackable) {
    return "Remove existing offer before applying another exclusive coupon.";
  }
  if (hasNonStackable && offer.stackable) {
    return "Remove the exclusive coupon first to add more offers.";
  }

  if (offer.minSpend && subtotal < offer.minSpend) {
    return `Spend ${formatInr(offer.minSpend)}+ to unlock this offer.`;
  }
  if (offer.minItems && itemCount(items) < offer.minItems) {
    return `Add ${offer.minItems - itemCount(items)} more item(s) to qualify.`;
  }

  const probe = calcLineAmount(offer, subtotal, items, subtotal);
  if (probe === null || probe <= 0) return "This offer does not apply to your bag.";

  return null;
}

function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildDiscountSummary(
  items: CartItem[],
  appliedCodes: string[]
): DiscountSummary {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const lines: AppliedDiscountLine[] = [];
  let running = subtotal;

  const sorted = [...appliedCodes]
    .map((code) => getCouponByCode(code))
    .filter((c): c is CouponOffer => !!c)
    .sort((a, b) => {
      const order = { fixed: 0, spend_threshold: 1, item_quantity: 2, percentage: 3 };
      return order[a.type] - order[b.type];
    });

  for (const offer of sorted) {
    const amount = calcLineAmount(offer, subtotal, items, running);
    if (amount && amount > 0) {
      lines.push({
        code: offer.code,
        label: offer.title,
        amount,
      });
      running = Math.max(0, running - amount);
    }
  }

  const totalDiscount = Math.min(
    subtotal,
    lines.reduce((s, l) => s + l.amount, 0)
  );

  return { lines, totalDiscount, subtotal };
}

export function tryApplyCoupon(
  code: string,
  items: CartItem[],
  appliedCodes: string[]
): { ok: true } | { ok: false; message: string } {
  const normalized = code.trim().toUpperCase();
  if (!normalized) {
    return { ok: false, message: "Enter a coupon code." };
  }

  const offer = getCouponByCode(normalized);
  if (!offer) {
    return { ok: false, message: "Invalid coupon code." };
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const err = validateCoupon(offer, subtotal, items, appliedCodes);
  if (err) return { ok: false, message: err };

  return { ok: true };
}

export function getOfferDisplayValue(offer: CouponOffer): string {
  switch (offer.type) {
    case "percentage":
      return `${offer.value * 100}% off`;
    case "fixed":
      return `₹${offer.value.toLocaleString("en-IN")} off`;
    case "spend_threshold":
      return `${offer.value * 100}% off`;
    case "item_quantity":
      return `${offer.value * 100}% extra off`;
    default:
      return "Special offer";
  }
}
