import React from "react";
import { render, screen } from "@testing-library/react";
import { StatCard } from "./stat-card";

describe("StatCard component", () => {
  it("renders value and label", () => {
    render(<StatCard value="500+" label="Reseller Partners" />);
    expect(screen.getByText("500+")).toBeInTheDocument();
    expect(screen.getByText("Reseller Partners")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <StatCard value="18+" label="Years" description="Serving since 2005" />
    );
    expect(screen.getByText("Serving since 2005")).toBeInTheDocument();
  });

  it("does not render description when omitted", () => {
    render(<StatCard value="100" label="Products" />);
    expect(screen.queryByText("No description")).not.toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    render(
      <StatCard
        value="50+"
        label="Vendors"
        icon={<span data-testid="test-icon">Icon</span>}
      />
    );
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("does not render icon when omitted", () => {
    const { container } = render(<StatCard value="10" label="Tests" />);
    const iconContainer = container.querySelector('[class*="rounded-lg"]');
    expect(iconContainer).toBeNull();
  });

  it("passes custom className through", () => {
    const { container } = render(
      <StatCard value="5" label="Tests" className="custom-card" />
    );
    expect((container.firstChild as HTMLElement).className).toContain("custom-card");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<StatCard value="1" label="One" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("handles numeric value prop", () => {
    render(<StatCard value={42} label="Answer" />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders with expected styling structure", () => {
    const { container } = render(<StatCard value="100" label="Count" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("rounded-xl");
    expect(el.className).toContain("border-border");
  });
});
