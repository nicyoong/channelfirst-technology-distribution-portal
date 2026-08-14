import { describe, expect, it, beforeEach, afterEach, jest } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import { RFQDrawer } from "@/components/ui/rfq-drawer";
import { useRFQCart, useTierInfo } from "@/hooks/use-rfq-cart";

// Mock the hooks
jest.mock("@/hooks/use-rfq-cart", () => ({
  useRFQCart: jest.fn(),
  useTierInfo: jest.fn(),
}));

const mockUseRFQCart = useRFQCart as jest.MockedFunction<typeof useRFQCart>;
const mockUseTierInfo = useTierInfo as jest.MockedFunction<typeof useTierInfo>;

describe("RFQDrawer", () => {
  const mockOnClose = jest.fn();
  const mockOnOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders null when closed", () => {
    mockUseRFQCart.mockReturnValue({
      items: [],
      isOpen: false,
      setIsOpen: jest.fn(),
      notes: "",
      setNotes: jest.fn(),
      submittedRef: null,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      submitRFQ: jest.fn(),
      totalItems: 0,
      estimatedTotal: 0,
      formatMYR: (n: number) => `RM ${n.toFixed(2)}`,
    } as any);

    const { container } = render(
      <RFQDrawer isOpen={false} onClose={mockOnClose} onOpen={mockOnOpen} />
    );

    expect(container.innerHTML).toBe("");
    expect(mockOnOpen).not.toHaveBeenCalled();
  });

  it("renders empty state when cart is empty", () => {
    mockUseRFQCart.mockReturnValue({
      items: [],
      isOpen: true,
      setIsOpen: jest.fn(),
      notes: "",
      setNotes: jest.fn(),
      submittedRef: null,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      submitRFQ: jest.fn(),
      totalItems: 0,
      estimatedTotal: 0,
      formatMYR: (n: number) => `RM ${n.toFixed(2)}`,
    } as any);

    render(<RFQDrawer isOpen={true} onClose={mockOnClose} onOpen={mockOnOpen} />);

    expect(screen.getByText("Your RFQ is empty")).toBeInTheDocument();
    expect(screen.getByText("Browse Catalogue")).toBeInTheDocument();
  });

  it("calls onOpen when isOpen changes to true", () => {
    mockUseRFQCart.mockReturnValue({
      items: [],
      isOpen: true,
      setIsOpen: jest.fn(),
      notes: "",
      setNotes: jest.fn(),
      submittedRef: null,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      submitRFQ: jest.fn(),
      totalItems: 0,
      estimatedTotal: 0,
      formatMYR: (n: number) => `RM ${n.toFixed(2)}`,
    } as any);

    render(<RFQDrawer isOpen={true} onClose={mockOnClose} onOpen={mockOnOpen} />);

    expect(mockOnOpen).toHaveBeenCalled();
  });

  it("displays items in cart with correct format", () => {
    const mockProduct = {
      sku: "TEST-001",
      name: "Test Product",
      vendor: "TestVendor",
      tieredPrice: {
        listPrice: 100,
        tiers: [
          { minQty: 1, maxQty: 9, unitPrice: 100, discountPercent: 0 },
        ],
      },
    } as any;

    mockUseRFQCart.mockReturnValue({
      items: [
        { product: mockProduct, quantity: 2, notes: "" },
      ],
      isOpen: true,
      setIsOpen: jest.fn(),
      notes: "",
      setNotes: jest.fn(),
      submittedRef: null,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      submitRFQ: jest.fn(),
      totalItems: 2,
      estimatedTotal: 200,
      formatMYR: (n: number) => `RM ${n.toFixed(2)}`,
    } as any);

    mockUseTierInfo.mockReturnValue({
      current: { minQty: 1, maxQty: 9, unitPrice: 100, discountPercent: 0 },
      next: null,
      savingsPerUnit: 0,
      totalDiscount: 0,
      qualifierNote: null,
    });

    render(<RFQDrawer isOpen={true} onClose={mockOnClose} onOpen={mockOnOpen} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("TEST-001")).toBeInTheDocument();
    // Check for line total
    const lineTotalElements = screen.getAllByText("RM 200.00");
    expect(lineTotalElements.length).toBeGreaterThan(0);
  });

  it("calls removeFromCart when remove button is clicked", () => {
    const mockRemove = jest.fn();
    const mockProduct = {
      sku: "TEST-001",
      name: "Test Product",
      vendor: "TestVendor",
    } as any;

    mockUseRFQCart.mockReturnValue({
      items: [
        { product: mockProduct, quantity: 1, notes: "" },
      ],
      isOpen: true,
      setIsOpen: jest.fn(),
      notes: "",
      setNotes: jest.fn(),
      submittedRef: null,
      addToCart: jest.fn(),
      removeFromCart: mockRemove,
      updateQuantity: jest.fn(),
      submitRFQ: jest.fn(),
      totalItems: 1,
      estimatedTotal: 100,
      formatMYR: (n: number) => `RM ${n.toFixed(2)}`,
    } as any);

    mockUseTierInfo.mockReturnValue({
      current: { unitPrice: 100 },
      next: null,
      savingsPerUnit: 0,
      totalDiscount: 0,
      qualifierNote: null,
    });

    render(<RFQDrawer isOpen={true} onClose={mockOnClose} onOpen={mockOnOpen} />);

    const removeBtn = screen.getByLabelText(/Remove Test Product from RFQ/i);
    fireEvent.click(removeBtn);

    expect(mockRemove).toHaveBeenCalledWith("TEST-001");
  });

  it("calls updateQuantity when decrease button is clicked", () => {
    const mockUpdate = jest.fn();
    const mockProduct = {
      sku: "TEST-001",
      name: "Test Product",
      vendor: "TestVendor",
      quantity: 5,
    } as any;

    mockUseRFQCart.mockReturnValue({
      items: [
        { product: mockProduct, quantity: 5, notes: "" },
      ],
      isOpen: true,
      setIsOpen: jest.fn(),
      notes: "",
      setNotes: jest.fn(),
      submittedRef: null,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: mockUpdate,
      submitRFQ: jest.fn(),
      totalItems: 5,
      estimatedTotal: 500,
      formatMYR: (n: number) => `RM ${n.toFixed(2)}`,
    } as any);

    mockUseTierInfo.mockReturnValue({
      current: { unitPrice: 100 },
      next: null,
      savingsPerUnit: 0,
      totalDiscount: 0,
      qualifierNote: null,
    });

    render(<RFQDrawer isOpen={true} onClose={mockOnClose} onOpen={mockOnOpen} />);

    const decreaseBtn = screen.getByLabelText(/Decrease quantity/i);
    fireEvent.click(decreaseBtn);

    expect(mockUpdate).toHaveBeenCalledWith("TEST-001", 4);
  });

  it("calls updateQuantity when increase button is clicked", () => {
    const mockUpdate = jest.fn();
    const mockProduct = {
      sku: "TEST-001",
      name: "Test Product",
      vendor: "TestVendor",
      quantity: 1,
    } as any;

    mockUseRFQCart.mockReturnValue({
      items: [
        { product: mockProduct, quantity: 1, notes: "" },
      ],
      isOpen: true,
      setIsOpen: jest.fn(),
      notes: "",
      setNotes: jest.fn(),
      submittedRef: null,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: mockUpdate,
      submitRFQ: jest.fn(),
      totalItems: 1,
      estimatedTotal: 100,
      formatMYR: (n: number) => `RM ${n.toFixed(2)}`,
    } as any);

    mockUseTierInfo.mockReturnValue({
      current: { unitPrice: 100 },
      next: null,
      savingsPerUnit: 0,
      totalDiscount: 0,
      qualifierNote: null,
    });

    render(<RFQDrawer isOpen={true} onClose={mockOnClose} onOpen={mockOnOpen} />);

    const increaseBtn = screen.getByLabelText(/Increase quantity/i);
    fireEvent.click(increaseBtn);

    expect(mockUpdate).toHaveBeenCalledWith("TEST-001", 2);
  });

  it("shows tier incentive when applicable", () => {
    const mockProduct = {
      sku: "TEST-001",
      name: "Test Product",
      vendor: "TestVendor",
      tieredPrice: {
        listPrice: 100,
        tiers: [
          { minQty: 1, maxQty: 9, unitPrice: 100, discountPercent: 0 },
          { minQty: 10, maxQty: null, unitPrice: 80, discountPercent: 20 },
        ],
      },
    } as any;

    mockUseRFQCart.mockReturnValue({
      items: [
        { product: mockProduct, quantity: 5, notes: "" },
      ],
      isOpen: true,
      setIsOpen: jest.fn(),
      notes: "",
      setNotes: jest.fn(),
      submittedRef: null,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      submitRFQ: jest.fn(),
      totalItems: 5,
      estimatedTotal: 500,
      formatMYR: (n: number) => `RM ${n.toFixed(2)}`,
    } as any);

    mockUseTierInfo.mockReturnValue({
      current: { minQty: 1, maxQty: 9, unitPrice: 100, discountPercent: 0 },
      next: { minQty: 10, maxQty: null, unitPrice: 80, discountPercent: 20 },
      savingsPerUnit: 20,
      totalDiscount: 100,
      qualifierNote: "Add 5 more units to qualify for 20% off",
    });

    render(<RFQDrawer isOpen={true} onClose={mockOnClose} onOpen={mockOnOpen} />);

    // Should show tier incentive
    expect(screen.getByText("20% OFF")).toBeInTheDocument();
    expect(screen.getByText(/Add 5 more units/i)).toBeInTheDocument();
  });

  it("does not show tier incentive at best tier", () => {
    const mockProduct = {
      sku: "TEST-001",
      name: "Test Product",
      vendor: "TestVendor",
      tieredPrice: {
        listPrice: 100,
        tiers: [
          { minQty: 1, maxQty: 9, unitPrice: 100, discountPercent: 0 },
          { minQty: 10, maxQty: null, unitPrice: 80, discountPercent: 20 },
        ],
      },
    } as any;

    mockUseRFQCart.mockReturnValue({
      items: [
        { product: mockProduct, quantity: 15, notes: "" },
      ],
      isOpen: true,
      setIsOpen: jest.fn(),
      notes: "",
      setNotes: jest.fn(),
      submittedRef: null,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      submitRFQ: jest.fn(),
      totalItems: 15,
      estimatedTotal: 1200,
      formatMYR: (n: number) => `RM ${n.toFixed(2)}`,
    } as any);

    mockUseTierInfo.mockReturnValue({
      current: { minQty: 10, maxQty: null, unitPrice: 80, discountPercent: 20 },
      next: null,
      savingsPerUnit: 20,
      totalDiscount: 300,
      qualifierNote: null,
    });

    render(<RFQDrawer isOpen={true} onClose={mockOnClose} onOpen={mockOnOpen} />);

    // Should not show tier incentive at best tier
    expect(screen.queryByText("20% OFF")).not.toBeInTheDocument();
  });

  it("calls submitRFQ and closes when submit button is clicked", () => {
    const mockSubmit = jest.fn().mockReturnValue("RFQ-CFT-2026-1234");
    const mockClose = jest.fn();

    mockUseRFQCart.mockReturnValue({
      items: [
        { product: { sku: "TEST-001", vendor: "TestVendor" }, quantity: 1, notes: "" },
      ],
      isOpen: true,
      setIsOpen: jest.fn(),
      notes: "",
      setNotes: jest.fn(),
      submittedRef: null,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      submitRFQ: mockSubmit,
      totalItems: 1,
      estimatedTotal: 100,
      formatMYR: (n: number) => `RM ${n.toFixed(2)}`,
    } as any);

    mockUseTierInfo.mockReturnValue({
      current: { unitPrice: 100 },
      next: null,
      savingsPerUnit: 0,
      totalDiscount: 0,
      qualifierNote: null,
    });

    render(<RFQDrawer isOpen={true} onClose={mockClose} onOpen={jest.fn()} />);

    const submitBtn = screen.getByText("Submit RFQ");
    fireEvent.click(submitBtn);

    expect(mockSubmit).toHaveBeenCalled();
    expect(mockClose).toHaveBeenCalled();
  });

  it("does not show footer when submitting empty cart", () => {
    const mockSubmit = jest.fn().mockReturnValue(null);
    const mockClose = jest.fn();

    mockUseRFQCart.mockReturnValue({
      items: [],
      isOpen: true,
      setIsOpen: jest.fn(),
      notes: "",
      setNotes: jest.fn(),
      submittedRef: null,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      submitRFQ: mockSubmit,
      totalItems: 0,
      estimatedTotal: 0,
      formatMYR: (n: number) => `RM ${n.toFixed(2)}`,
    } as any);

    render(<RFQDrawer isOpen={true} onClose={mockClose} onOpen={jest.fn()} />);

    // Footer should not be visible when cart is empty
    expect(screen.queryByText("Submit RFQ")).not.toBeInTheDocument();
  });

  it("displays estimated total correctly", () => {
    mockUseRFQCart.mockReturnValue({
      items: [
        { product: { sku: "TEST-001", vendor: "TestVendor", tieredPrice: { tiers: [] } }, quantity: 1, notes: "" },
        { product: { sku: "TEST-002", vendor: "TestVendor", tieredPrice: { tiers: [] } }, quantity: 2, notes: "" },
      ],
      isOpen: true,
      setIsOpen: jest.fn(),
      notes: "",
      setNotes: jest.fn(),
      submittedRef: null,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      submitRFQ: jest.fn(),
      totalItems: 3,
      estimatedTotal: 350,
      formatMYR: (n: number) => `RM ${n.toFixed(2)}`,
    } as any);

    mockUseTierInfo.mockReturnValue({
      current: { unitPrice: 0 },
      next: null,
      savingsPerUnit: 0,
      totalDiscount: 0,
      qualifierNote: null,
    });

    render(<RFQDrawer isOpen={true} onClose={mockOnClose} onOpen={mockOnOpen} />);

    expect(screen.getByText("RM 350.00")).toBeInTheDocument();
  });

  it("shows savings per unit when applicable", () => {
    const mockProduct = {
      sku: "TEST-001",
      name: "Test Product",
      vendor: "TestVendor",
      tieredPrice: {
        listPrice: 100,
        tiers: [
          { minQty: 1, maxQty: 9, unitPrice: 100, discountPercent: 0 },
          { minQty: 10, maxQty: null, unitPrice: 80, discountPercent: 20 },
        ],
      },
    } as any;

    mockUseRFQCart.mockReturnValue({
      items: [
        { product: mockProduct, quantity: 15, notes: "" },
      ],
      isOpen: true,
      setIsOpen: jest.fn(),
      notes: "",
      setNotes: jest.fn(),
      submittedRef: null,
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      submitRFQ: jest.fn(),
      totalItems: 15,
      estimatedTotal: 1200,
      formatMYR: (n: number) => `RM ${n.toFixed(2)}`,
    } as any);

    mockUseTierInfo.mockReturnValue({
      current: { minQty: 10, maxQty: null, unitPrice: 80, discountPercent: 20 },
      next: null,
      savingsPerUnit: 20,
      totalDiscount: 300,
      qualifierNote: null,
    });

    render(<RFQDrawer isOpen={true} onClose={mockOnClose} onOpen={mockOnOpen} />);

    expect(screen.getByText("Save RM 20.00/unit")).toBeInTheDocument();
  });
});
