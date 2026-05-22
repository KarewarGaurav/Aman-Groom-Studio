export type PaymentOptionId =
  | "razorpay"
  | "upi"
  | "gpay"
  | "paytm"
  | "phonepe"
  | "amazonpay"
  | "card"
  | "netbanking"
  | "cod";

export interface PaymentOption {
  id: PaymentOptionId;
  name: string;
  description: string;
  badge?: string;
  popular?: boolean;
}

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "razorpay",
    name: "Razorpay",
    description: "Cards, UPI, wallets & more — secure checkout",
    badge: "Recommended",
    popular: true,
  },
  {
    id: "upi",
    name: "UPI",
    description: "Pay via any UPI app or VPA",
    popular: true,
  },
  {
    id: "gpay",
    name: "Google Pay",
    description: "Fast UPI payment with GPay",
    popular: true,
  },
  {
    id: "paytm",
    name: "Paytm",
    description: "Paytm UPI, wallet or postpaid",
    popular: true,
  },
  {
    id: "phonepe",
    name: "PhonePe",
    description: "UPI & PhonePe wallet",
  },
  {
    id: "amazonpay",
    name: "Amazon Pay",
    description: "Amazon Pay balance or linked bank",
  },
  {
    id: "card",
    name: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay & Amex",
  },
  {
    id: "netbanking",
    name: "Net Banking",
    description: "All major Indian banks",
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Pay when your order is delivered",
  },
];

export function getPaymentLabel(id: PaymentOptionId, extra?: string): string {
  const option = PAYMENT_OPTIONS.find((p) => p.id === id);
  const base = option?.name ?? id;
  return extra ? `${base} — ${extra}` : base;
}
