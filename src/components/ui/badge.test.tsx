import React from "react";
import { render, screen } from "@testing-library/react";
import { Badge, badgeVariants } from "./badge";

describe("Badge component", () => {
  it("renders text content correctly", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    const { container } = render(<Badge>Default</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bg-primary");
    expect(el.className).toContain("text-primary-foreground");
  });

  it("applies secondary variant classes", () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bg-secondary");
  });

  it("applies outline variant classes", () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("border-border");
  });

  it("applies success variant classes", () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bg-success");
  });

  it("applies warning variant classes", () => {
    const { container } = render(<Badge variant="warning">Warning</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bg-amber");
  });

  it("applies destructive variant classes", () => {
    const { container } = render(<Badge variant="destructive">Error</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bg-destructive");
  });

  it("applies info variant classes", () => {
    const { container } = render(<Badge variant="info">Info</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bg-info");
  });

  it("applies custom className prop", () => {
    const { container } = render(<Badge className="custom-class">Custom</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("custom-class");
  });

  it("applies size variants correctly", () => {
    const { container: sm } = render(<Badge size="sm">Small</Badge>);
    expect((sm.firstChild as HTMLElement).className).toContain("px-2 py-0.5");

    const { container: md } = render(<Badge size="md">Medium</Badge>);
    expect((md.firstChild as HTMLElement).className).toContain("px-2.5 py-0.5");

    const { container: lg } = render(<Badge size="lg">Large</Badge>);
    expect((lg.firstChild as HTMLElement).className).toContain("px-3 py-1");
  });

  it("passes through additional props (aria, data attributes)", () => {
    const { container } = render(
      <Badge aria-label="Test badge" data-testid="badge">
        Accessible
      </Badge>
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("aria-label", "Test badge");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Badge ref={ref}>Ref Test</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.textContent).toBe("Ref Test");
  });

  it("exposes badgeVariants export with correct structure", () => {
    expect(badgeVariants).toBeDefined();
    expect(typeof badgeVariants).toBe("function");
  });
});
