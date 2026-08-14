/** @jest-environment jsdom */
import { describe, it, expect, vi, beforeEach, afterEach } from "@jest/globals";
import { generateJsonLd, generateProductJsonLd, generateBreadcrumbJsonLd } from "@/components/seo/metadata";

describe("generateJsonLd", () => {
  it("returns valid Organization schema", () => {
    const json = generateJsonLd();
    expect(json["@context"]).toBe("https://schema.org");
    expect(json["@type"]).toBe("Organization");
    expect(json.name).toBe("ChannelFirst Technology Sdn Bhd");
    expect(json.url).toBe("https://www.channelfirst.com.my");
  });

  it("includes address and contact info", () => {
    const json = generateJsonLd();
    expect(json.address).toBeDefined();
    expect(json.address.addressCountry).toBe("MY");
    expect(json.contactPoint).toBeDefined();
    expect(json.contactPoint.telephone).toContain("+60");
  });

  it("includes knowsAbout array", () => {
    const json = generateJsonLd();
    expect(Array.isArray(json.knowsAbout)).toBe(true);
    expect(json.knowsAbout).toContain("Networking Equipment");
  });
});

describe("generateProductJsonLd", () => {
  it("returns valid Product schema with required fields", () => {
    const json = generateProductJsonLd({
      name: "Cisco Switch",
      description: "A switch",
      brand: "Cisco",
      category: "Networking",
    });
    expect(json["@type"]).toBe("Product");
    expect(json.name).toBe("Cisco Switch");
    expect(json.brand.name).toBe("Cisco");
  });

  it("defaults availability to InStock when not provided", () => {
    const json = generateProductJsonLd({
      name: "Product",
      description: "Desc",
      brand: "Brand",
      category: "Cat",
    });
    expect(json.availability).toBe("https://schema.org/InStock");
  });

  it("uses provided availability", () => {
    const json = generateProductJsonLd({
      name: "Product",
      description: "Desc",
      brand: "Brand",
      category: "Cat",
      availability: "https://schema.org/OutOfStock",
    });
    expect(json.availability).toBe("https://schema.org/OutOfStock");
  });

  it("includes offers when price is provided", () => {
    const json = generateProductJsonLd({
      name: "Product",
      description: "Desc",
      brand: "Brand",
      category: "Cat",
      price: "999.00",
      priceCurrency: "MYR",
    });
    expect(json.offers).toBeDefined();
    expect(json.offers.price).toBe("999.00");
    expect(json.offers.priceCurrency).toBe("MYR");
  });

  it("omits offers when price is not provided", () => {
    const json = generateProductJsonLd({
      name: "Product",
      description: "Desc",
      brand: "Brand",
      category: "Cat",
    });
    expect(json.offers).toBeUndefined();
  });
});

describe("generateBreadcrumbJsonLd", () => {
  it("generates correct ListItem positions", () => {
    const json = generateBreadcrumbJsonLd([
      { label: "Home", url: "/" },
      { label: "Products", url: "/products" },
      { label: "Switch", url: "/products/switch" },
    ]);
    expect(json["@type"]).toBe("BreadcrumbList");
    expect(json.itemListElement).toHaveLength(3);
    expect(json.itemListElement[0].position).toBe(1);
    expect(json.itemListElement[1].position).toBe(2);
    expect(json.itemListElement[2].position).toBe(3);
  });

  it("maps label and item correctly", () => {
    const json = generateBreadcrumbJsonLd([
      { label: "Home", url: "/" },
    ]);
    expect(json.itemListElement[0].name).toBe("Home");
    expect(json.itemListElement[0].item).toBe("/");
  });

  it("handles empty array", () => {
    const json = generateBreadcrumbJsonLd([]);
    expect(json.itemListElement).toHaveLength(0);
  });
});
