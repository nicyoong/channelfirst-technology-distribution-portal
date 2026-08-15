import { describe, expect, it } from "@jest/globals";
import { products, vendors, categories } from "../products";

describe("products data", () => {
  it("exports products array", () => {
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it("has 12 products", () => {
    expect(products).toHaveLength(12);
  });

  it("each product has required fields", () => {
    products.forEach((product) => {
      expect(product.sku).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.vendor).toBeDefined();
      expect(product.category).toBeDefined();
    });
  });

  it("exports vendors array", () => {
    expect(Array.isArray(vendors)).toBe(true);
    expect(vendors.length).toBeGreaterThan(0);
  });

  it("exports categories array", () => {
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  it("has products from expected vendors", () => {
    const vendorNames = products.map((p) => p.vendor);
    expect(vendorNames).toContain("Cisco");
    expect(vendorNames).toContain("Dell Technologies");
    expect(vendorNames).toContain("HPE");
  });

  it("has products from expected categories", () => {
    const categoryNames = products.map((p) => p.category);
    expect(categoryNames).toContain("Networking");
    expect(categoryNames).toContain("Servers & Storage");
    expect(categoryNames).toContain("Endpoints & Mobility");
  });
});
