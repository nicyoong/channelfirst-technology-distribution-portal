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
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Current Page")).toBeInTheDocument();
  });

  it("renders last item without link", () => {
    render(
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Current", href: null },
      ]} />
    );
    const currentEl = screen.getByText("Current");
    expect(currentEl.tagName).not.toBe("A");
  });

  it("renders first item as link", () => {
    render(
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Current", href: null },
      ]} />
    );
    const homeLinks = screen.getAllByText("Home");
    const homeLink = homeLinks.find(el => el.tagName === "A");
    expect(homeLink).toBeInTheDocument();
  });
});
