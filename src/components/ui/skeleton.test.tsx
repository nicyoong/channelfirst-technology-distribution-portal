import React from "react";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "./skeleton";

describe("Skeleton component", () => {
  it("renders a div element", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it("applies animation and background classes", () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("animate-pulse");
    expect(el.className).toContain("bg-muted");
    expect(el.className).toContain("rounded-md");
  });

  it("passes custom className through", () => {
    const { container } = render(<Skeleton className="w-32 h-8" />);
    expect((container.firstChild as HTMLElement).className).toContain("w-32");
    expect((container.firstChild as HTMLElement).className).toContain("h-8");
  });

  it("renders with expected default styling", () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("rounded-md");
  });
});
