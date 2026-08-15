import { describe, expect, it, jest, beforeEach, afterEach } from "@jest/globals";
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

describe("useRFQCart - edge cases and coverage", () => {
  beforeEach(() => {
    const fakeNow = new Date("2026-01-01T00:00:00Z").getTime();
    jest.spyOn(Date, "now").mockReturnValue(fakeNow);
    jest.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("addToCart edge cases", () => {
    it("handles adding same product multiple times in sequence", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.addToCart(mockProduct));
      expect(result.current.items[0].quantity).toBe(3);
      expect(result.current.totalItems).toBe(3);
    });

    it("does not preserve external notes when adding same product again - notes reset to empty", () => {
      // This reveals a behavior: setNotes updates the top-level notes state,
      // but adding the same product creates a new item with empty notes
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.setNotes("Handle with care"));
      act(() => result.current.addToCart(mockProduct));
      expect(result.current.items[0].notes).toBe("");
      expect(result.current.items[0].quantity).toBe(2);
      // The top-level notes state is separate from item notes
      expect(result.current.notes).toBe("Handle with care");
    });
  });

  describe("removeFromCart edge cases", () => {
    it("handles removing non-existent SKU gracefully", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.removeFromCart("NONEXISTENT-SKU"));
      expect(result.current.items).toEqual([]);
      expect(result.current.totalItems).toBe(0);
    });

    it("removes only the specified item when multiple exist", () => {
      const productB = { ...mockProduct, sku: "DL-PE-R760" };
      const productC = { ...mockProduct, sku: "HP-DL380-G11" };
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.addToCart(productB));
      act(() => result.current.addToCart(productC));
      act(() => result.current.removeFromCart("DL-PE-R760"));
      expect(result.current.items).toHaveLength(2);
      expect(result.current.items.map(i => i.product.sku)).toContain("CS-C1000-24P");
      expect(result.current.items.map(i => i.product.sku)).toContain("HP-DL380-G11");
      expect(result.current.items.map(i => i.product.sku)).not.toContain("DL-PE-R760");
    });
  });

  describe("updateQuantity edge cases", () => {
    it("handles updating non-existent SKU", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.updateQuantity("NONEXISTENT", 5));
      expect(result.current.items).toEqual([]);
    });

    it("sets quantity to exactly 1", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.updateQuantity("CS-C1000-24P", 1));
      expect(result.current.items[0].quantity).toBe(1);
      expect(result.current.totalItems).toBe(1);
    });

    it("handles large quantity values", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.updateQuantity("CS-C1000-24P", 1000));
      expect(result.current.items[0].quantity).toBe(1000);
      expect(result.current.totalItems).toBe(1000);
    });
  });

  describe("submitRFQ edge cases", () => {
    it("generates unique reference on each submit", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      let ref1: string | null = null;
      act(() => { ref1 = result.current.submitRFQ(); });
      expect(ref1).toMatch(/^RFQ-CFT-2026-/);

      // Mock random to return a different value for the second submit
      jest.spyOn(Math, "random").mockReturnValue(0.7);
      act(() => result.current.addToCart(mockProduct));
      let ref2: string | null = null;
      act(() => { ref2 = result.current.submitRFQ(); });
      expect(ref2).toMatch(/^RFQ-CFT-2026-/);
      expect(ref1).not.toBe(ref2);
    });

    it("reference format includes year and 4-digit padding", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      let ref: string | null = null;
      act(() => { ref = result.current.submitRFQ(); });
      expect(ref).toMatch(/^RFQ-CFT-2026-\d{4}$/);
    });

    it("clears notes on submit", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.setNotes("Special handling required"));
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.submitRFQ());
      expect(result.current.notes).toBe("");
    });

    it("does not clear state when submitting empty cart", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.setNotes("Some notes"));
      const ref = result.current.submitRFQ();
      expect(ref).toBeNull();
      expect(result.current.notes).toBe("Some notes");
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe("totalItems calculation", () => {
    it("calculates total across multiple products", () => {
      const productB = { ...mockProduct, sku: "DL-PE-R760" };
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.addToCart(productB));
      expect(result.current.totalItems).toBe(3);
    });

    it("updates total after removal", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.removeFromCart("CS-C1000-24P"));
      expect(result.current.totalItems).toBe(0);
    });

    it("updates total after quantity decrease", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.addToCart(mockProduct));
      act(() => result.current.updateQuantity("CS-C1000-24P", 1));
      expect(result.current.totalItems).toBe(1);
    });
  });

  describe("state management", () => {
    it("isOpen starts as false", () => {
      const { result } = renderHook(() => useRFQCart());
      expect(result.current.isOpen).toBe(false);
    });

    it("notes starts as empty string", () => {
      const { result } = renderHook(() => useRFQCart());
      expect(result.current.notes).toBe("");
    });

    it("submittedRef starts as null", () => {
      const { result } = renderHook(() => useRFQCart());
      expect(result.current.submittedRef).toBeNull();
    });

    it("toggles isOpen independently of cart state", () => {
      const { result } = renderHook(() => useRFQCart());
      act(() => result.current.setIsOpen(true));
      expect(result.current.isOpen).toBe(true);
      expect(result.current.items).toEqual([]);
      act(() => result.current.setIsOpen(false));
      expect(result.current.isOpen).toBe(false);
    });
  });
});
