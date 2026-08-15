import { describe, expect, it } from "@jest/globals";
import { products } from "../products";
import type { Product } from "../products";

describe("products with tiered pricing", () => {
  it("all physical products have tiered pricing", () => {
    const physicalProducts = products.filter((p) => p.stock !== "digital");
    physicalProducts.forEach((product) => {
      expect(product.tieredPrice).toBeDefined();
      expect(product.tieredPrice!.tiers.length).toBeGreaterThan(0);
    });
  });

  it("tiered pricing tiers are sorted by minQty ascending", () => {
    products.forEach((product) => {
      if (product.tieredPrice) {
        const tiers = product.tieredPrice.tiers;
        for (let i = 1; i < tiers.length; i++) {
          expect(tiers[i].minQty).toBeGreaterThan(tiers[i - 1].minQty);
        }
      }
    });
  });

  it("tiered pricing has correct discount progression", () => {
    products.forEach((product) => {
      if (product.tieredPrice) {
        const tiers = product.tieredPrice.tiers;
        for (let i = 1; i < tiers.length; i++) {
          // Higher tiers should have lower or equal unit prices
          expect(tiers[i].unitPrice).toBeLessThanOrEqual(tiers[i - 1].unitPrice);
          // Higher tiers should have equal or higher discount percent
          expect(tiers[i].discountPercent).toBeGreaterThanOrEqual(tiers[i - 1].discountPercent);
        }
      }
    });
  });

  it("last tier has null maxQty", () => {
    products.forEach((product) => {
      if (product.tieredPrice) {
        const lastTier = product.tieredPrice.tiers[product.tieredPrice.tiers.length - 1];
        expect(lastTier.maxQty).toBeNull();
      }
    });
  });

  it("first tier starts at minQty=1", () => {
    products.forEach((product) => {
      if (product.tieredPrice) {
        expect(product.tieredPrice.tiers[0].minQty).toBe(1);
      }
    });
  });

  it("listPrice matches first tier unitPrice", () => {
    products.forEach((product) => {
      if (product.tieredPrice) {
        expect(product.tieredPrice.listPrice).toBe(
          product.tieredPrice.tiers[0].unitPrice
        );
      }
    });
  });

  it("digital products may or may not have tiered pricing", () => {
    const digitalProducts = products.filter((p) => p.stock === "digital");
    digitalProducts.forEach((product) => {
      // Digital products might have tiered pricing for volume licenses
      if (product.tieredPrice) {
        expect(product.tieredPrice.tiers.length).toBeGreaterThan(0);
      }
    });
  });

  it("each product has unique SKU", () => {
    const skus = products.map((p) => p.sku);
    const uniqueSkus = new Set(skus);
    expect(uniqueSkus.size).toBe(products.length);
  });

  it("each product has valid branch stock data", () => {
    products.forEach((product) => {
      product.branchStock.forEach((bs) => {
        expect(bs.branch).toBeTruthy();
        expect(typeof bs.stock).toBe("number");
        expect(bs.stock).toBeGreaterThanOrEqual(0);
      });
    });
  });

  it("products have expected categories", () => {
    const expectedCategories = [
      "Networking",
      "Servers & Storage",
      "Endpoints & Mobility",
      "Cybersecurity",
      "Software & Licensing",
      "Accessories & Peripherals",
    ];
    products.forEach((product) => {
      expect(expectedCategories).toContain(product.category);
    });
  });
});
