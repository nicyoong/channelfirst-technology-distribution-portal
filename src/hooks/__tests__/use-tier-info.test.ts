import { describe, expect, it } from "@jest/globals";
import { useTierInfo } from "@/hooks/use-rfq-cart";
import type { Product } from "@/data/products";

const mockProduct: Product = {
  sku: "CS-C1000-24P",
  name: "Cisco Catalyst 1000",
  vendor: "Cisco",
  category: "Networking",
  description: "Test desc",
  shortDesc: "Test short desc",
  specs: ["24 × 1GbE"],
  fullSpecs: [],
  stock: "in-stock",
  priceNote: "Login for pricing",
  branchStock: [],
  warranty: "1 year",
  tags: ["switch"],
  tieredPrice: {
    listPrice: 1500,
    tiers: [
      { minQty: 1, maxQty: 9, unitPrice: 1500, discountPercent: 0 },
      { minQty: 10, maxQty: 49, unitPrice: 1350, discountPercent: 10 },
      { minQty: 50, maxQty: null, unitPrice: 1200, discountPercent: 20 },
    ],
  },
};

const noTierProduct: Product = {
  ...mockProduct,
  sku: "NO-TIER",
  tieredPrice: undefined,
};

describe("useTierInfo", () => {
  it("returns correct tier info for base tier", () => {
    const result = useTierInfo(mockProduct, 5);
    expect(result.current.minQty).toBe(1);
    expect(result.current.unitPrice).toBe(1500);
    // next tier is the NEXT better tier (index + 1)
    // At qty=5, we're at index 0, so next is tier[1]
    expect(result.next?.minQty).toBe(10);
    expect(result.savingsPerUnit).toBe(0); // Same as list price
    expect(result.qualifierNote).toBeDefined();
    expect(result.qualifierNote).toContain("5 more units");
  });

  it("returns correct tier info for second tier", () => {
    const result = useTierInfo(mockProduct, 25);
    expect(result.current.minQty).toBe(10);
    expect(result.current.unitPrice).toBe(1350);
    // At qty=25, we're at index 1, so next is tier[2]
    expect(result.next?.minQty).toBe(50);
    expect(result.savingsPerUnit).toBe(150); // 1500 - 1350
  });

  it("returns best tier with no next tier", () => {
    const result = useTierInfo(mockProduct, 100);
    expect(result.current.minQty).toBe(50);
    // At qty=100, we're at index 2 (best tier), so next is null
    expect(result.next).toBeNull();
    expect(result.qualifierNote).toBeNull();
    expect(result.savingsPerUnit).toBe(300); // 1500 - 1200
  });

  it("handles product without tieredPrice", () => {
    // When tiers is empty, getTierForQty will throw an error
    expect(() => useTierInfo(noTierProduct, 1)).toThrow();
  });

  it("calculates totalDiscount correctly", () => {
    const result = useTierInfo(mockProduct, 10);
    // At qty=10, savingsPerUnit = 1500 - 1350 = 150
    // totalDiscount = 150 * 10 = 1500
    expect(result.totalDiscount).toBe(1500);
  });
});
