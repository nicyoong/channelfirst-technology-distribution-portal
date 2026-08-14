/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with default variant and size", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies primary variant classes", () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect(container.firstChild).toHaveClass("bg-primary");
  });

  it("applies outline variant classes", () => {
    const { container } = render(<Button variant="outline">Outline</Button>);
    expect(container.firstChild).toHaveClass("border-border");
  });

  it("applies ghost variant classes", () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>);
    expect(container.firstChild).toHaveClass("hover:bg-accent");
  });

  it("applies danger variant classes", () => {
    const { container } = render(<Button variant="danger">Delete</Button>);
    expect(container.firstChild).toHaveClass("bg-destructive");
  });

  it("applies different sizes", () => {
    const { container: sm } = render(<Button size="sm">Small</Button>);
    expect(sm.firstChild).toHaveClass("h-9");

    const { container: lg } = render(<Button size="lg">Large</Button>);
    expect(lg.firstChild).toHaveClass("h-12");
    expect(lg.firstChild).toHaveClass("text-base");
  });

  it("respects disabled state", () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    expect(container.firstChild).toHaveClass("disabled:opacity-50");
    expect(container.firstChild).toHaveAttribute("disabled");
  });

  it("passes through HTML attributes", () => {
    render(
      <Button data-testid="btn" onClick={() => {}} type="button">
        Test
      </Button>
    );
    const btn = screen.getByTestId("btn");
    expect(btn).toHaveAttribute("type", "button");
  });

  it("applies custom className", () => {
    const { container } = render(<Button className="custom">Custom</Button>);
    expect(container.firstChild).toHaveClass("custom");
  });
});
