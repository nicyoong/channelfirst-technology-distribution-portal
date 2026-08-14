/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge", () => {
  it("renders with default variant", () => {
    render(<Badge>Default Badge</Badge>);
    expect(screen.getByText("Default Badge")).toBeInTheDocument();
  });

  it("renders with secondary variant", () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    expect(screen.getByText("Secondary Badge")).toBeInTheDocument();
  });

  it("renders with outline variant", () => {
    render(<Badge variant="outline">Outline Badge</Badge>);
    expect(screen.getByText("Outline Badge")).toBeInTheDocument();
  });

  it("renders with destructive variant", () => {
    render(<Badge variant="destructive">Destructive Badge</Badge>);
    expect(screen.getByText("Destructive Badge")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    const badge = document.querySelector(".custom-class");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-primary");
  });

  it("renders with children as string", () => {
    render(<Badge>Test</Badge>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders with children as element", () => {
    render(
      <Badge>
        <span>Span inside badge</span>
      </Badge>
    );
    expect(screen.getByText("Span inside badge")).toBeInTheDocument();
  });
});
