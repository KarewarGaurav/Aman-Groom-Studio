import type { AdminProductVariant } from "@/types/admin";

export function sumVariantStock(variants: AdminProductVariant[]): number {
  return variants.reduce((sum, v) => sum + Math.max(0, Number(v.stock) || 0), 0);
}

/** Spread a total evenly across size rows (remainder goes to first sizes). */
export function distributeStockAcrossSizes(
  variants: AdminProductVariant[],
  total: number
): AdminProductVariant[] {
  const safeTotal = Math.max(0, Math.floor(total));
  if (!variants.length) {
    return [{ size: "One Size", stock: safeTotal }];
  }
  const count = variants.length;
  const base = Math.floor(safeTotal / count);
  let remainder = safeTotal % count;
  return variants.map((v) => {
    const extra = remainder > 0 ? 1 : 0;
    if (remainder > 0) remainder -= 1;
    return { ...v, stock: base + extra };
  });
}

export function normalizeVariantStocks(
  variants: AdminProductVariant[]
): AdminProductVariant[] {
  return variants.map((v) => ({
    size: v.size.trim() || "One Size",
    stock: Math.max(0, Math.floor(Number(v.stock) || 0)),
  }));
}
