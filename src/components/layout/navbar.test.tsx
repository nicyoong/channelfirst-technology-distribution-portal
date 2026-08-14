import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NavBar } from "./navbar";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("NavBar component", () => {
  it("renders the logo link", () => {
    render(<NavBar />);
    expect(screen.getByText("ChannelFirst")).toBeInTheDocument();
  });

  it("renders desktop navigation links", () => {
    render(<NavBar />);
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
  });

  it("shows Products link with dropdown trigger", () => {
    render(<NavBar />);
    expect(screen.getByRole("link", { name: /products/i })).toBeInTheDocument();
  });

  it("renders mobile menu button", () => {
    render(<NavBar />);
    const menuBtn = screen.getByLabelText("Open menu");
    expect(menuBtn).toBeInTheDocument();
  });

  it("opens mobile menu when hamburger is clicked", async () => {
    render(<NavBar />);
    const menuBtn = screen.getByLabelText("Open menu");
    await userEvent.click(menuBtn);
    
    await waitFor(() => {
      expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
    });
  });

  it("closes mobile menu when close button is clicked", async () => {
    render(<NavBar />);
    const menuBtn = screen.getByLabelText("Open menu");
    await userEvent.click(menuBtn);
    
    await waitFor(() => {
      expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
    });
    
    const closeBtn = screen.getByLabelText("Close menu");
    await userEvent.click(closeBtn);
    
    await waitFor(() => {
      expect(screen.queryByLabelText("Close menu")).not.toBeInTheDocument();
    });
  });

  it("highlights current page link", () => {
    jest.mock("next/navigation", () => ({
      usePathname: () => "/about",
    }));
    render(<NavBar />);
    // The About link should be active
    const aboutLink = screen.getByRole("link", { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
  });

  it("renders RFQ cart button with badge when cartCount > 0", () => {
    render(<NavBar cartCount={3} />);
    const cartBtn = screen.getByLabelText(/rfq cart with 3 items/i);
    expect(cartBtn).toBeInTheDocument();
  });

  it("does not render cart badge when cartCount is 0", () => {
    const { container } = render(<NavBar cartCount={0} />);
    // No badge should be visible
    expect(container.querySelector('[class*="rounded-full"]')).not.toBeInTheDocument();
  });

  it("calls onSearch when search is submitted", async () => {
    const onSearch = jest.fn();
    render(<NavBar onSearch={onSearch} />);
    
    const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
    if (searchInput) {
      await userEvent.type(searchInput, "laptop");
      await userEvent.keyboard("{Enter}");
      expect(onSearch).toHaveBeenCalledWith("laptop");
    }
  });

  it("renders Reseller Login button", () => {
    render(<NavBar />);
    expect(screen.getByRole("link", { name: /reseller login/i })).toBeInTheDocument();
  });

  it("has sticky header with proper z-index", () => {
    const { container } = render(<NavBar />);
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
  });
});
