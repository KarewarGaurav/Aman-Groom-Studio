import type { CouponOffer } from "@/types/coupon";

export const COUPON_OFFERS: CouponOffer[] = [
  {
    code: "MAHARAJA10",
    title: "Maharaja Welcome",
    description: "10% off your couture order",
    type: "percentage",
    value: 0.1,
    stackable: true,
    badge: "Popular",
  },
  {
    code: "GROOM15",
    title: "Groom Elite",
    description: "15% off for wedding season",
    type: "percentage",
    value: 0.15,
    stackable: false,
    badge: "Seasonal",
  },
  {
    code: "SPEND2L15",
    title: "Spend & Save",
    description: "Spend ₹2,00,000 or more — get 15% off",
    type: "spend_threshold",
    value: 0.15,
    minSpend: 200000,
    stackable: true,
    badge: "Big spend",
  },
  {
    code: "SPEND1L8",
    title: "Silver Tier",
    description: "Spend ₹1,00,000 or more — get 8% off",
    type: "spend_threshold",
    value: 0.08,
    minSpend: 100000,
    stackable: true,
  },
  {
    code: "FLAT10000",
    title: "Flat ₹10,000 Off",
    description: "₹10,000 off when you spend ₹1,50,000+",
    type: "fixed",
    value: 10000,
    minSpend: 150000,
    stackable: true,
  },
  {
    code: "FLAT5000",
    title: "Flat ₹5,000 Off",
    description: "₹5,000 off on orders above ₹75,000",
    type: "fixed",
    value: 5000,
    minSpend: 75000,
    stackable: true,
  },
  {
    code: "BUY2GET10",
    title: "Buy More, Save More",
    description: "Buy 2 or more pieces — extra 10% off",
    type: "item_quantity",
    value: 0.1,
    minItems: 2,
    stackable: true,
    badge: "Bundle",
  },
  {
    code: "COUTURE20",
    title: "Couture Week",
    description: "20% off — single use, not combinable",
    type: "percentage",
    value: 0.2,
    stackable: false,
    badge: "Limited",
  },
];

export function getCouponByCode(code: string): CouponOffer | undefined {
  return COUPON_OFFERS.find(
    (c) => c.code === code.trim().toUpperCase()
  );
}
