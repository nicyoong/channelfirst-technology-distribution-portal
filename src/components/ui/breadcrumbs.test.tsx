import React from "react";
import { render, screen } from "@testing-library/react";
import { Breadcrumbs, type BreadcrumbItem } from "./breadcrumbs";

describe("Breadcrumbs component", () => {
  const items: BreadcrumbItem[] = [
    { label: "Products", href: "/products" },
    { label: "Networking", href: "/products/networking" },
  ];

  it("renders home link", () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
  });

  it("renders breadcrumb items", () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Networking")).toBeInTheDocument();
  });

  it("renders chevron separators between items", () => {
    render(<Breadcrumbs items={items} />);
    const chevrons = screen.getAllByRole("img");
    expect(chevrons.length).toBeGreaterThanOrEqual(2);
  });

  it("makes last item non-clickable (current page)", () => {
    render(<Breadcrumbs items={items} />);
    // Last item should be a span, not a link
    const lastItem = screen.getByText("Networking").closest("li");
    expect(lastItem?.querySelector("a")).toBeNull();
    expect(lastItem?.getAttribute("aria-current")).toBe("page");
  });

  it("renders href links for non-last items", () => {
    render(<Breadcrumbs items={items} />);
    const productsLink = screen.getByRole("link", { name: /products/i });
    expect(productsLink).toHaveAttribute("href", "/products");
  });

  it("handles single item correctly", () => {
    const singleItem: BreadcrumbItem[] = [{ label: "Current Page" }];
    render(<Breadcrumbs items={singleItem} />);
    expect(screen.getByText("Current Page")).toBeInTheDocument();
  });

  it("handles empty items array", () => {
    render(<Breadcrumbs items={[]} />);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
  });

  it("passes className through to nav element", () => {
    const { container } = render(<Breadcrumbs items={items} className="custom-bc" />);
    const nav = container.querySelector("nav");
    expect(nav?.className).toContain("custom-bc");
  });

  it("renders aria-label on nav", () => {
    const { container } = render(<Breadcrumbs items={items} />);
    const nav = container.querySelector("nav");
    expect(nav).toHaveAttribute("aria-label", "Breadcrumb");
  });
});
