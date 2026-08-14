/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "@/components/ui/empty-state";

describe("EmptyState", () => {
  it("renders empty state with icon", () => {
    render(
      <EmptyState
        icon="search"
        title="No results"
        description="Try adjusting your search"
      />
    );
    expect(screen.getByText("No results")).toBeInTheDocument();
    expect(screen.getByText("Try adjusting your search")).toBeInTheDocument();
  });

  it("renders with custom icon", () => {
    render(
      <EmptyState
        icon="package"
        title="No products"
        description="Add products to your cart"
      />
    );
    expect(screen.getByText("No products")).toBeInTheDocument();
  });
});
