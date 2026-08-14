import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductDetail from "@/app/product/[sku]/product-detail";
import type { Product } from "@/data/products";

// Mock dependencies
jest.mock("@/contexts/toast-context", () => ({
  useToast: jest.fn(() => ({ toast: jest.fn() })),
}));

jest.mock("@/hooks/use-rfq-cart", () => ({
  useRFQCart: jest.fn(() => ({
    addToCart: jest.fn(),
  })),
}));

const { useToast } = require("@/contexts/toast-context");
const { useRFQCart } = require("@/hooks/use-rfq-cart");

describe("ProductDetail", () => {
  const mockProduct: Product = {
    sku: "CS-C1000-24P",
    name: "Cisco Catalyst 1000 24-Port Switch",
    vendor: "Cisco",
    category: "Networking",
    description: "Enterprise-grade managed switch",
    shortDesc: "24-port managed switch",
    specs: ["24 × 1GbE", "4 × SFP", "Layer 2"],
    fullSpecs: [
      { label: "Ports", value: "24 × 10/100/1000BASE-T" },
      { label: "Uplinks", value: "4 × 1G SFP" },
    ],
    stock: "in-stock",
    priceNote: "Login for pricing",
    tieredPrice: {
      listPrice: 1500,
      tiers: [
        { minQty: 1, maxQty: 9, unitPrice: 1500, discountPercent: 0 },
        { minQty: 10, maxQty: 49, unitPrice: 1350, discountPercent: 10 },
        { minQty: 50, maxQty: null, unitPrice: 1200, discountPercent: 20 },
      ],
    },
    branchStock: [
      { branch: "KL HQ", stock: 10 },
      { branch: "Penang", stock: 0 },
    ],
    warranty: "Limited lifetime",
    tags: ["switch"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product name and SKU", () => {
    render(<ProductDetail product={mockProduct} />);

    // Use getByRole to find the h1 element
    expect(screen.getByRole("heading", { level: 1, name: /cisco catalyst 1000/i })).toBeInTheDocument();
    // SKU might be split across elements, so use a regex
    expect(screen.getByText(/CS-C1000-24P/i)).toBeInTheDocument();
  });

  it("displays current unit price", () => {
    render(<ProductDetail product={mockProduct} />);

    // There are multiple RM 1,500.00 texts, so use getAllByText
    const priceElements = screen.getAllByText(/RM 1,500\.00/);
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it("shows tier table with all tiers", () => {
    render(<ProductDetail product={mockProduct} />);

    // Should show all three tiers
    expect(screen.getByText("1–9 units")).toBeInTheDocument();
    expect(screen.getByText("10–49 units")).toBeInTheDocument();
    expect(screen.getByText("50+ units")).toBeInTheDocument();
  });

  it("highlights active tier", () => {
    render(<ProductDetail product={mockProduct} />);

    // At qty=1, the first tier should be active
    const activeTier = screen.getByText("1–9 units");
    expect(activeTier.closest("div")).toHaveClass("bg-primary/10");
  });

  it("renders key specifications", () => {
    render(<ProductDetail product={mockProduct} />);

    expect(screen.getByText("24 × 1GbE")).toBeInTheDocument();
    expect(screen.getByText("4 × SFP")).toBeInTheDocument();
  });

  it("shows stock badge as success for in-stock", () => {
    render(<ProductDetail product={mockProduct} />);

    expect(screen.getByText("In Stock")).toBeInTheDocument();
  });

  it("disables Add to RFQ for out-of-stock products", () => {
    const outOfStockProduct = { ...mockProduct, stock: "out-of-stock" };
    render(<ProductDetail product={outOfStockProduct} />);

    const addBtn = screen.getByText("Add to RFQ");
    expect(addBtn).toBeDisabled();
  });

  it("calls addToCart and shows toast when Add to RFQ is clicked", () => {
    const mockAddToCart = jest.fn();
    const mockToast = jest.fn();
    
    useRFQCart.mockReturnValue({ addToCart: mockAddToCart });
    useToast.mockReturnValue({ toast: mockToast });

    render(<ProductDetail product={mockProduct} />);

    const addBtn = screen.getByText("Add to RFQ");
    fireEvent.click(addBtn);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "success",
        title: "Added to RFQ",
      })
    );
  });

  it("renders stock by branch tab", () => {
    render(<ProductDetail product={mockProduct} />);

    // Click on Stock by Branch tab
    const stockTab = screen.getByText("Stock by Branch");
    fireEvent.click(stockTab);

    expect(screen.getByText("KL HQ")).toBeInTheDocument();
    expect(screen.getByText("Penang")).toBeInTheDocument();
  });

  it("shows warning for out-of-stock branches", () => {
    render(<ProductDetail product={mockProduct} />);

    const stockTab = screen.getByText("Stock by Branch");
    fireEvent.click(stockTab);

    expect(screen.getByText(/Some branches may be out of stock/i)).toBeInTheDocument();
  });

  it("renders related products", () => {
    render(<ProductDetail product={mockProduct} />);

    expect(screen.getByText("You May Also Like")).toBeInTheDocument();
  });

  it("displays quantity total calculation", () => {
    render(<ProductDetail product={mockProduct} />);

    // Find elements with "total" text
    const totalElements = screen.getAllByText(/total/);
    expect(totalElements.length).toBeGreaterThan(0);
  });

  it("renders breadcrumbs with correct structure", () => {
    render(<ProductDetail product={mockProduct} />);

    // Breadcrumbs should have the navigation structure
    expect(screen.getByText("Catalogue")).toBeInTheDocument();
    // Use getAllByText to handle multiple matches
    const networkingElements = screen.getAllByText(/Networking/i);
    expect(networkingElements.length).toBeGreaterThan(0);
  });
});
