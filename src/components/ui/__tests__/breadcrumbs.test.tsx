/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

describe("Breadcrumbs", () => {
  it("renders breadcrumbs with items", () => {
    render(
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Current Page", href: null },
      ]} />
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Current Page")).toBeInTheDocument();
  });

  it("renders separator between items", () => {
    render(
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
      ]} />
    );
    // Breadcrumbs typically use "/" or ">" as separator
    expect(screen.getByText("/")).toBeInTheDocument();
  });

  it("renders last item without link", () => {
    render(
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Current", href: null },
      ]} />
    );
    const currentLink = screen.getByText("Current");
    expect(currentLink.tagName).not.toBe("A");
  });

  it("renders first item as link", () => {
    render(
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Current", href: null },
      ]} />
    );
    const homeLink = screen.getByText("Home");
    expect(homeLink.tagName).toBe("A");
  });
});
