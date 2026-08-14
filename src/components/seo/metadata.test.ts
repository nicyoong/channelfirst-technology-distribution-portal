import React from "react";
import { render, screen } from "@testing-library/react";
import { generateJsonLd, generateProductJsonLd, generateBreadcrumbJsonLd } from "./metadata";

describe("generateJsonLd", () => {
  it("returns a valid JSON-LD Organization object", () => {
    const result = generateJsonLd();
    expect(result).toBeDefined();
    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("Organization");
  });

  it("contains organization name", () => {
    const result = generateJsonLd();
    expect(result.name).toBe("ChannelFirst Technology Sdn Bhd");
  });

  it("contains organization URL", () => {
    const result = generateJsonLd();
    expect(result.url).toBe("https://www.channelfirst.com.my");
  });

  it("contains logo URL", () => {
    const result = generateJsonLd();
    expect(result.logo).toBe("https://www.channelfirst.com.my/logo.png");
  });

  it("contains address information", () => {
    const result = generateJsonLd();
    expect(result.address).toBeDefined();
    expect(result.address["@type"]).toBe("PostalAddress");
    expect(result.address.addressLocality).toBe("Subang Jaya");
    expect(result.address.addressRegion).toBe("Selangor");
    expect(result.address.postalCode).toBe("47810");
    expect(result.address.addressCountry).toBe("MY");
  });

  it("contains contact point information", () => {
    const result = generateJsonLd();
    expect(result.contactPoint).toBeDefined();
    expect(result.contactPoint["@type"]).toBe("ContactPoint");
    expect(result.contactPoint.telephone).toBe("+60-3-2780-8888");
    expect(result.contactPoint.contactType).toBe("sales");
  });

  it("contains sameAs social links", () => {
    const result = generateJsonLd();
    expect(result.sameAs).toBeDefined();
    expect(result.sameAs.length).toBeGreaterThan(0);
    expect(result.sameAs).toContain("https://www.facebook.com/channelfirstmy");
  });

  it("contains knowsAbout topics", () => {
    const result = generateJsonLd();
    expect(result.knowsAbout).toBeDefined();
    expect(Array.isArray(result.knowsAbout)).toBe(true);
    expect(result.knowsAbout).toContain("Networking Equipment");
  });
});

describe("generateProductJsonLd", () => {
  it("returns a valid Product JSON-LD", () => {
    const product = {
      name: "Dell PowerEdge R750",
      description: "Enterprise server",
      brand: "Dell",
      category: "Servers",
    };
    const result = generateProductJsonLd(product);
    expect(result["@type"]).toBe("Product");
    expect(result.name).toBe("Dell PowerEdge R750");
  });

  it("includes brand information", () => {
    const product = {
      name: "Test Product",
      description: "A test",
      brand: "TestBrand",
      category: "Test",
    };
    const result = generateProductJsonLd(product);
    expect(result.brand["@type"]).toBe("Brand");
    expect(result.brand.name).toBe("TestBrand");
  });

  it("defaults availability to InStock when not provided", () => {
    const product = {
      name: "Product",
      description: "Desc",
      brand: "Brand",
      category: "Cat",
    };
    const result = generateProductJsonLd(product);
    expect(result.availability).toBe("https://schema.org/InStock");
  });

  it("uses provided availability when given", () => {
    const product = {
      name: "Product",
      description: "Desc",
      brand: "Brand",
      category: "Cat",
      availability: "https://schema.org/OutOfStock",
    };
    const result = generateProductJsonLd(product);
    expect(result.availability).toBe("https://schema.org/OutOfStock");
  });

  it("includes offers when price is provided", () => {
    const product = {
      name: "Product",
      description: "Desc",
      brand: "Brand",
      category: "Cat",
      price: "100",
      priceCurrency: "MYR",
    };
    const result = generateProductJsonLd(product);
    expect(result.offers).toBeDefined();
    expect(result.offers["@type"]).toBe("Offer");
    expect(result.offers.price).toBe("100");
    expect(result.offers.priceCurrency).toBe("MYR");
  });

  it("does not include offers when price is omitted", () => {
    const product = {
      name: "Product",
      description: "Desc",
      brand: "Brand",
      category: "Cat",
    };
    const result = generateProductJsonLd(product);
    expect(result.offers).toBeUndefined();
  });

  it("defaults priceCurrency to MYR when not provided", () => {
    const product = {
      name: "Product",
      description: "Desc",
      brand: "Brand",
      category: "Cat",
      price: "50",
    };
    const result = generateProductJsonLd(product);
    expect(result.offers.priceCurrency).toBe("MYR");
  });
});

describe("generateBreadcrumbJsonLd", () => {
  it("returns a valid BreadcrumbList JSON-LD", () => {
    const items = [
      { label: "Home", url: "/" },
      { label: "Products", url: "/products" },
    ];
    const result = generateBreadcrumbJsonLd(items);
    expect(result["@type"]).toBe("BreadcrumbList");
    expect(result.itemListElement).toBeDefined();
  });

  it("maps items to ListItem objects with correct positions", () => {
    const items = [
      { label: "Home", url: "/" },
      { label: "Products", url: "/products" },
    ];
    const result = generateBreadcrumbJsonLd(items);
    expect(result.itemListElement).toHaveLength(2);
    expect(result.itemListElement[0].position).toBe(1);
    expect(result.itemListElement[1].position).toBe(2);
  });

  it("sets correct name and item for each breadcrumb", () => {
    const items = [
      { label: "Home", url: "/" },
    ];
    const result = generateBreadcrumbJsonLd(items);
    expect(result.itemListElement[0].name).toBe("Home");
    expect(result.itemListElement[0].item).toBe("/");
  });

  it("handles empty items array", () => {
    const result = generateBreadcrumbJsonLd([]);
    expect(result.itemListElement).toHaveLength(0);
  });
});
