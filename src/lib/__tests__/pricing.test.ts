import { describe, expect, it } from "@jest/globals";
import {
  getTierForQty,
  getUnitPrice,
  calcTotal,
  getTierLabel,
  getNextTier,
  formatMYR,
} from "@/lib/pricing";

describe("pricing utilities", () => {
  const tiers = [
    { minQty: 1, maxQty: 9, unitPrice: 100, discountPercent: 0 },
    { minQty: 10, maxQty: 49, unitPrice: 90, discountPercent: 10 },
    { minQty: 50, maxQty: null, unitPrice: 80, discountPercent: 20 },
  ];

  describe("getTierForQty", () => {
    it("returns base tier for qty=1", () => {
      expect(getTierForQty(tiers, 1)).toBe(tiers[0]);
    });

    it("returns base tier for qty=9 (upper bound)", () => {
      expect(getTierForQty(tiers, 9)).toBe(tiers[0]);
    });

    it("returns second tier for qty=10 (lower bound)", () => {
      expect(getTierForQty(tiers, 10)).toBe(tiers[1]);
    });

    it("returns second tier for qty=49 (upper bound)", () => {
      expect(getTierForQty(tiers, 49)).toBe(tiers[1]);
    });

    it("returns third tier for qty=50 (lower bound)", () => {
      expect(getTierForQty(tiers, 50)).toBe(tiers[2]);
    });

    it("returns third tier for qty=1000 (exceeds all ranges)", () => {
      expect(getTierForQty(tiers, 1000)).toBe(tiers[2]);
    });

    it("throws error for empty tiers array", () => {
      // When tiers is empty, should throw an error
      expect(() => getTierForQty([], 1)).toThrow("tiers array cannot be empty");
    });

    it("returns last tier when qty exactly matches last tier maxQty boundary", () => {
      expect(getTierForQty(tiers, 49)).toBe(tiers[1]);
      expect(getTierForQty(tiers, 50)).toBe(tiers[2]);
    });
  });

  describe("getUnitPrice", () => {
    it("returns base unit price for qty=1", () => {
      expect(getUnitPrice(tiers, 1)).toBe(100);
    });

    it("returns second tier price for qty=15", () => {
      expect(getUnitPrice(tiers, 15)).toBe(90);
    });

    it("returns third tier price for qty=100", () => {
      expect(getUnitPrice(tiers, 100)).toBe(80);
    });

    it("handles qty=0 (falls to last tier)", () => {
      // qty=0 doesn't match any tier (0 >= 1 is false), so falls to last tier
      const result = getUnitPrice(tiers, 0);
      expect(result).toBe(80);
    });
  });

  describe("calcTotal", () => {
    it("calculates total for qty=1 at base price", () => {
      expect(calcTotal(tiers, 1)).toBe(100);
    });

    it("calculates total for qty=10 at second tier price", () => {
      expect(calcTotal(tiers, 10)).toBe(900);
    });

    it("calculates total for qty=50 at third tier price", () => {
      expect(calcTotal(tiers, 50)).toBe(4000);
    });

    it("handles large quantities", () => {
      expect(calcTotal(tiers, 1000)).toBe(80000);
    });
  });

  describe("getTierLabel", () => {
    it("formats tier with maxQty", () => {
      expect(getTierLabel(tiers[0])).toBe("1–9 units");
    });

    it("formats tier without maxQty (open-ended)", () => {
      expect(getTierLabel(tiers[2])).toBe("50+ units");
    });

    it("handles mid-range tier", () => {
      expect(getTierLabel(tiers[1])).toBe("10–49 units");
    });
  });

  describe("getNextTier", () => {
    it("returns null when already at best tier (highest index)", () => {
      // At qty=100, we're at tier[2] (index 2), which is the best tier
      // getNextTier should return null because there's no better tier
      const result = getNextTier(tiers, 100);
      expect(result).toBeNull();
    });

    it("returns next better tier when below threshold", () => {
      // At qty=5, we're at tier[0] (index 0), so returns tier[1]
      const result = getNextTier(tiers, 5);
      expect(result).toBe(tiers[1]);
    });

    it("returns next better tier at exact threshold", () => {
      // At qty=10, we're at tier[1] (index 1), so returns tier[2]
      const result = getNextTier(tiers, 10);
      expect(result).toBe(tiers[2]);
    });

    it("throws error for empty tiers", () => {
      // When tiers is empty, getTierForQty throws an error
      expect(() => getNextTier([], 1)).toThrow("tiers array cannot be empty");
    });

    it("handles single-tier setup correctly", () => {
      const singleTier = [{ minQty: 1, maxQty: null, unitPrice: 100, discountPercent: 0 }];
      // At qty=1, currentIndex=0, so returns null (no next tier)
      expect(getNextTier(singleTier, 1)).toBeNull();
    });
  });

  describe("formatMYR", () => {
    it("formats whole numbers with 2 decimal places", () => {
      expect(formatMYR(100)).toBe("RM 100.00");
    });

    it("formats with commas for thousands", () => {
      expect(formatMYR(1500)).toBe("RM 1,500.00");
    });

    it("formats decimals correctly", () => {
      expect(formatMYR(99.99)).toBe("RM 99.99");
    });

    it("formats large numbers", () => {
      expect(formatMYR(12500)).toBe("RM 12,500.00");
    });

    it("handles zero", () => {
      expect(formatMYR(0)).toBe("RM 0.00");
    });
  });
});
