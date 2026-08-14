import { describe, expect, it, jest, beforeEach, afterEach } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import { NavBar } from "@/components/layout/navbar";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock the hooks
jest.mock("@/hooks/use-rfq-cart", () => ({
  useRFQCart: jest.fn(),
}));

// Mock RFQDrawer
jest.mock("@/components/ui/rfq-drawer", () => ({
  RFQDrawer: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
    isOpen ? (
      <div data-testid="rfq-drawer" role="dialog">
        <button onClick={onClose}>Close Drawer</button>
      </div>
    ) : null,
}));

const { usePathname } = require("next/navigation");
const { useRFQCart } = require("@/hooks/use-rfq-cart");

describe("NavBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders logo and brand name", () => {
    usePathname.mockReturnValue("/");
    useRFQCart.mockReturnValue({ items: [], isOpen: false, totalItems: 0 });

    render(<NavBar />);

    expect(screen.getByText("ChannelFirst")).toBeInTheDocument();
  });

  it("renders desktop navigation links", () => {
    usePathname.mockReturnValue("/");
    useRFQCart.mockReturnValue({ items: [], isOpen: false, totalItems: 0 });

    render(<NavBar />);

    expect(screen.getByText("Brands")).toBeInTheDocument();
    expect(screen.getByText("Solutions")).toBeInTheDocument();
    expect(screen.getByText("Promotions")).toBeInTheDocument();
    expect(screen.getByText("Training & Events")).toBeInTheDocument();
  });

  it("highlights current page in navigation", () => {
    usePathname.mockReturnValue("/brands");
    useRFQCart.mockReturnValue({ items: [], isOpen: false, totalItems: 0 });

    render(<NavBar />);

    const brandsLink = screen.getByText("Brands").closest("a");
    expect(brandsLink).toHaveClass("bg-accent");
  });

  it("shows NEW badge on Promotions link", () => {
    usePathname.mockReturnValue("/");
    useRFQCart.mockReturnValue({ items: [], isOpen: false, totalItems: 0 });

    render(<NavBar />);

    expect(screen.getByText("NEW")).toBeInTheDocument();
  });

  it("renders RFQ cart button", () => {
    usePathname.mockReturnValue("/");
    useRFQCart.mockReturnValue({ items: [], isOpen: false, totalItems: 0 });

    render(<NavBar />);

    const cartBtn = screen.getByLabelText(/RFQ cart/i);
    expect(cartBtn).toBeInTheDocument();
  });

  it("shows cart badge when items exist", () => {
    usePathname.mockReturnValue("/");
    useRFQCart.mockReturnValue({ items: [], isOpen: false, totalItems: 3 });

    render(<NavBar />);

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("opens RFQ drawer when cart button is clicked", () => {
    const mockSetIsOpen = jest.fn();
    usePathname.mockReturnValue("/");
    useRFQCart.mockReturnValue({ items: [], isOpen: false, totalItems: 0, setIsOpen: mockSetIsOpen });

    render(<NavBar />);

    const cartBtn = screen.getByLabelText(/RFQ cart/i);
    fireEvent.click(cartBtn);

    expect(mockSetIsOpen).toHaveBeenCalledWith(true);
  });

  it("renders mobile menu button", () => {
    usePathname.mockReturnValue("/");
    useRFQCart.mockReturnValue({ items: [], isOpen: false, totalItems: 0 });

    const { container } = render(<NavBar />);
    
    // The mobile menu button should exist
    const menuBtn = container.querySelector('[aria-label="Open menu"]');
    expect(menuBtn).toBeInTheDocument();
  });

  it("toggles mobile menu when hamburger is clicked", () => {
    usePathname.mockReturnValue("/");
    useRFQCart.mockReturnValue({ items: [], isOpen: false, totalItems: 0 });

    const { container } = render(<NavBar />);
    
    const menuBtn = container.querySelector('[aria-label="Open menu"]');
    fireEvent.click(menuBtn!);

    // Mobile drawer should be visible - look for mobile-specific content
    // The mobile menu has "View all products" link
    const mobileContent = container.querySelector('.fixed.inset-y-0.left-0');
    expect(mobileContent).toBeInTheDocument();
  });

  it("closes mobile menu when close button is clicked", () => {
    usePathname.mockReturnValue("/");
    useRFQCart.mockReturnValue({ items: [], isOpen: false, totalItems: 0 });

    const { container } = render(<NavBar />);
    
    const menuBtn = container.querySelector('[aria-label="Open menu"]');
    fireEvent.click(menuBtn!);

    const closeBtn = screen.getByLabelText(/Close menu/i);
    fireEvent.click(closeBtn);

    // Mobile drawer should be hidden
    const mobileContent = container.querySelector('.fixed.inset-y-0.left-0');
    expect(mobileContent).not.toBeInTheDocument();
  });

  it("renders product categories in mobile menu", () => {
    usePathname.mockReturnValue("/");
    useRFQCart.mockReturnValue({ items: [], isOpen: false, totalItems: 0 });

    const { container } = render(<NavBar />);
    
    const menuBtn = container.querySelector('[aria-label="Open menu"]');
    fireEvent.click(menuBtn!);

    expect(screen.getByText("Networking")).toBeInTheDocument();
    expect(screen.getByText("Servers & Storage")).toBeInTheDocument();
    expect(screen.getByText("Endpoints & Mobility")).toBeInTheDocument();
  });

  it("closes mobile menu when a nav link is clicked", () => {
    usePathname.mockReturnValue("/");
    useRFQCart.mockReturnValue({ items: [], isOpen: false, totalItems: 0 });

    const { container } = render(<NavBar />);
    
    const menuBtn = container.querySelector('[aria-label="Open menu"]');
    fireEvent.click(menuBtn!);

    // Click on a mobile nav link
    const mobileNavLinks = container.querySelectorAll('.fixed.inset-y-0.left-0 a');
    if (mobileNavLinks.length > 0) {
      fireEvent.click(mobileNavLinks[0]);
    }

    // Mobile drawer should be hidden
    const mobileContent = container.querySelector('.fixed.inset-y-0.left-0');
    expect(mobileContent).not.toBeInTheDocument();
  });

  it("renders search input", () => {
    usePathname.mockReturnValue("/");
    useRFQCart.mockReturnValue({ items: [], isOpen: false, totalItems: 0 });

    render(<NavBar />);

    const searchInput = screen.getByPlaceholderText(/Search products/i);
    expect(searchInput).toBeInTheDocument();
  });

  it("calls onSearch when search form is submitted", () => {
    const mockOnSearch = jest.fn();
    usePathname.mockReturnValue("/");
    useRFQCart.mockReturnValue({ items: [], isOpen: false, totalItems: 0 });

    render(<NavBar onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText(/Search products/i);
    fireEvent.change(searchInput, { target: { value: "switch" } });
    
    // Find and submit the form
    const form = searchInput.closest("form");
    if (form) {
      fireEvent.submit(form);
    }

    expect(mockOnSearch).toHaveBeenCalledWith("switch");
  });

  it("highlights Promotions link as special", () => {
    usePathname.mockReturnValue("/");
    useRFQCart.mockReturnValue({ items: [], isOpen: false, totalItems: 0 });

    render(<NavBar />);

    const promotionsLink = screen.getByText("Promotions").closest("a");
    expect(promotionsLink).toHaveClass("text-amber-600");
  });

  it("does not highlight Promotions when on promotions page", () => {
    usePathname.mockReturnValue("/promotions");
    useRFQCart.mockReturnValue({ items: [], isOpen: false, totalItems: 0 });

    render(<NavBar />);

    const promotionsLink = screen.getByText("Promotions").closest("a");
    expect(promotionsLink).toHaveClass("bg-accent");
    expect(promotionsLink).not.toHaveClass("text-amber-600");
  });
});
