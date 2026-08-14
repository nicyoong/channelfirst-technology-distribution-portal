/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import {
  products,
  vendors,
  categories,
} from "@/data/products";
import type { Product } from "@/data/products";

describe("products data", () => {
  it("exports an array of products", () => {
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it("each product has required fields", () => {
    const requiredFields: (keyof Product)[] = [
      "sku",
      "name",
      "vendor",
      "category",
      "description",
      "shortDesc",
      "specs",
      "fullSpecs",
      "stock",
      "priceNote",
      "branchStock",
      "warranty",
      "tags",
    ];
    products.forEach((p) => {
      requiredFields.forEach((field) => {
        expect(p[field]).toBeDefined();
        if (field === "sku") expect(String(p[field]).length).toBeGreaterThan(0);
      });
    });
  });

  it("stock values are valid enum values", () => {
    const validStocks = ["in-stock", "low-stock", "out-of-stock", "digital"];
    products.forEach((p) => {
      expect(validStocks).toContain(p.stock);
    });
  });

  it("has expected number of products", () => {
    expect(products).toHaveLength(12);
  });

  it("has SKUs that are unique", () => {
    const skus = products.map((p) => p.sku);
    const unique = new Set(skus);
    expect(unique.size).toBe(skus.length);
  });

  it("categorizes products correctly", () => {
    const cisco = products.find((p) => p.vendor === "Cisco");
    expect(cisco).toBeDefined();
    expect(cisco?.category).toBe("Networking");

    const dell = products.find((p) => p.vendor === "Dell Technologies");
    expect(dell).toBeDefined();
    expect(dell?.category).toBe("Servers & Storage");

    const ms = products.find((p) => p.vendor === "Microsoft");
    expect(ms).toBeDefined();
    expect(ms?.stock).toBe("digital");
  });

  it("has branch stock for physical products", () => {
    const physical = products.filter((p) => p.stock !== "digital");
    physical.forEach((p) => {
      expect(Array.isArray(p.branchStock)).toBe(true);
    });
  });

  it("digital products have empty branchStock", () => {
    const digital = products.filter((p) => p.stock === "digital");
    digital.forEach((p) => {
      expect(p.branchStock).toEqual([]);
    });
  });
});

describe("vendors", () => {
  it("exports a list of vendor names", () => {
    expect(Array.isArray(vendors)).toBe(true);
    expect(vendors.length).toBe(12);
  });

  it("includes all product vendors", () => {
    const productVendors = [...new Set(products.map((p) => p.vendor))];
    productVendors.forEach((v) => {
      expect(vendors).toContain(v);
    });
  });
});

describe("categories", () => {
  it("exports category definitions", () => {
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBe(6);
  });

  it("each category has id, label, and icon", () => {
    categories.forEach((c) => {
      expect(c.id).toBeDefined();
      expect(c.label).toBeDefined();
      expect(c.icon).toBeDefined();
    });
  });
});
