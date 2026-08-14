/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge", () => {
  it("renders with default variant and size", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Badge className="custom-class">Test</Badge>);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("applies success variant classes", () => {
    const { container } = render(<Badge variant="success">In Stock</Badge>);
    expect(container.firstChild).toHaveClass("bg-success");
  });

  it("applies warning variant classes", () => {
    const { container } = render(<Badge variant="warning">Low Stock</Badge>);
    expect(container.firstChild).toHaveClass("bg-amber");
  });

  it("applies destructive variant classes", () => {
    const { container } = render(<Badge variant="destructive">Error</Badge>);
    expect(container.firstChild).toHaveClass("bg-destructive");
  });

  it("applies different sizes", () => {
    const { container: sm } = render(<Badge size="sm">Small</Badge>);
    expect(sm.firstChild).toHaveClass("px-2");

    const { container: lg } = render(<Badge size="lg">Large</Badge>);
    expect(lg.firstChild).toHaveClass("px-3");
    expect(lg.firstChild).toHaveClass("text-sm");
  });

  it("passes through HTML attributes", () => {
    const { container } = render(
      <Badge data-testid="badge" aria-label="Stock badge">Test</Badge>
    );
    expect(container.firstChild).toHaveAttribute("data-testid", "badge");
    expect(container.firstChild).toHaveAttribute("aria-label", "Stock badge");
  });
});
