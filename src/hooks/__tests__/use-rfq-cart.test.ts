/** @jest-environment jsdom */
import { describe, it, expect, jest } from "@jest/globals";
import { renderHook, act } from "@testing-library/react";
import { useRFQCart } from "@/hooks/use-rfq-cart";
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
};

describe("useRFQCart", () => {
  beforeEach(() => {
    const fakeNow = new Date("2026-01-01T00:00:00Z").getTime();
    jest.spyOn(Date, "now").mockReturnValue(fakeNow);
    jest.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("starts empty", () => {
    const { result } = renderHook(() => useRFQCart());
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.submittedRef).toBeNull();
    expect(result.current.isOpen).toBe(false);
  });

  describe("addToCart", () => {
    it("adds a new product", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].product.sku).toBe("CS-C1000-24P");
      expect(result.current.items[0].quantity).toBe(1);
      expect(result.current.totalItems).toBe(1);
    });

    it("increments quantity when same product added again", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.addToCart(mockProduct));
      expect(result.current.items[0].quantity).toBe(2);
      expect(result.current.totalItems).toBe(2);
    });

    it("adds a second distinct product separately", () => {
      const productB = { ...mockProduct, sku: "DL-PE-R760" };
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.addToCart(productB));
      expect(result.current.items).toHaveLength(2);
      expect(result.current.totalItems).toBe(2);
    });
  });

  describe("removeFromCart", () => {
    it("removes an item by SKU", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.removeFromCart("CS-C1000-24P"));
      expect(result.current.items).toHaveLength(0);
    });

    it("does nothing for non-existent SKU", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.removeFromCart("NONEXISTENT"));
      expect(result.current.items).toHaveLength(0);
    });
  });

  describe("updateQuantity", () => {
    it("updates quantity for an existing item", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.updateQuantity("CS-C1000-24P", 5));
      expect(result.current.items[0].quantity).toBe(5);
      expect(result.current.totalItems).toBe(5);
    });

    it("removes item when quantity set to 0", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.updateQuantity("CS-C1000-24P", 0));
      expect(result.current.items).toHaveLength(0);
      expect(result.current.totalItems).toBe(0);
    });

    it("removes item when quantity is negative", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.updateQuantity("CS-C1000-24P", -3));
      expect(result.current.items).toHaveLength(0);
    });

    it("leaves other items untouched when updating one", () => {
      const productB = { ...mockProduct, sku: "DL-PE-R760" };
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.addToCart(productB));
      act(() => result.current.updateQuantity("CS-C1000-24P", 3));
      expect(result.current.items[0].quantity).toBe(3);
      expect(result.current.items[1].quantity).toBe(1);
      expect(result.current.totalItems).toBe(4);
    });
  });

  describe("submitRFQ", () => {
    it("returns null when cart is empty", () => {
      const { result } = renderHook(() => useRFQCart());
      let ref: string | null = null;
      act(() => { ref = result.current.submitRFQ(); });
      expect(ref).toBeNull();
    });

    it("generates a reference and clears cart on submit", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      let ref: string | null = null;
      act(() => { ref = result.current.submitRFQ(); });
      expect(ref).toMatch(/^RFQ-CFT-2026-/);
      expect(result.current.items).toHaveLength(0);
      expect(result.current.submittedRef).toBe(ref);
      expect(result.current.notes).toBe("");
    });

    it("closes the cart drawer on submit", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.setIsOpen(true));
      act(() => result.current.addToCart(mockProduct));
      act(() => { result.current.submitRFQ(); });
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe("isOpen / setItems state", () => {
    it("toggles isOpen", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.setIsOpen(true));
      expect(result.current.isOpen).toBe(true);
      act(() => result.current.setIsOpen(false));
      expect(result.current.isOpen).toBe(false);
    });

    it("sets notes", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.setNotes("Handle with care"));
      expect(result.current.notes).toBe("Handle with care");
    });
  });
});
