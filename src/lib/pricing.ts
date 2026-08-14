export interface PriceTier {
  minQty: number;
  maxQty: number | null;
  unitPrice: number;
  discountPercent: number;
}

export interface TieredPrice {
  listPrice: number;
  tiers: PriceTier[];
}

/**
 * Get the applicable tier for a given quantity.
 * Returns the tier whose range contains qty, or the last tier if qty exceeds all ranges.
 * @throws Error if tiers array is empty.
 */
export function getTierForQty(
  tiers: PriceTier[],
  qty: number
): PriceTier {
  if (tiers.length === 0) {
    throw new Error("getTierForQty: tiers array cannot be empty");
  }
  return (
    tiers.find((t) => qty >= t.minQty && (t.maxQty === null || qty <= t.maxQty)) ??
    tiers[tiers.length - 1]
  );
}

/**
 * Calculate the unit price for a quantity using tiered pricing.
 */
export function getUnitPrice(tiers: PriceTier[], qty: number): number {
  return getTierForQty(tiers, qty).unitPrice;
}

/**
 * Calculate the total estimated cost for a quantity.
 */
export function calcTotal(tiers: PriceTier[], qty: number): number {
  return getUnitPrice(tiers, qty) * qty;
}

/**
 * Build a human-readable tier label for display.
 */
export function getTierLabel(tier: PriceTier): string {
  if (tier.maxQty === null) return `${tier.minQty}+ units`;
  return `${tier.minQty}–${tier.maxQty} units`;
}

/**
 * Check if a quantity qualifies for a tier higher than the base tier.
 * Returns null if already at the best tier, or the next better tier if one is reachable.
 */
export function getNextTier(tiers: PriceTier[], qty: number): PriceTier | null {
  const currentTier = getTierForQty(tiers, qty);
  const currentIndex = tiers.indexOf(currentTier);
  // tiers are sorted ascending by minQty, so lower index = worse tier
  // Return the NEXT tier (higher index = better discount)
  if (currentIndex < tiers.length - 1) {
    return tiers[currentIndex + 1];
  }
  return null;
}

/**
 * Format a Malaysian Ringgit price.
 */
export function formatMYR(amount: number): string {
  return `RM ${amount.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
