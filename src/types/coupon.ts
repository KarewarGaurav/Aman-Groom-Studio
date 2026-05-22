export type CouponType =
  | "percentage"
  | "fixed"
  | "spend_threshold"
  | "item_quantity";

export interface CouponOffer {
  code: string;
  title: string;
  description: string;
  type: CouponType;
  /** Percent as decimal (0.1 = 10%), fixed/threshold as INR amount */
  value: number;
  minSpend?: number;
  minItems?: number;
  stackable: boolean;
  badge?: string;
}

export interface AppliedDiscountLine {
  code: string;
  label: string;
  amount: number;
}

export interface DiscountSummary {
  lines: AppliedDiscountLine[];
  totalDiscount: number;
  subtotal: number;
}
