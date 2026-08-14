/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { StatCard } from "@/components/ui/stat-card";

describe("StatCard", () => {
  it("renders stat card with label and value", () => {
    render(<StatCard label="Total Products" value="150" />);
    expect(screen.getByText("150")).toBeInTheDocument();
    expect(screen.getByText("Total Products")).toBeInTheDocument();
  });

  it("renders with icon", () => {
    render(<StatCard label="Revenue" value="$50,000" icon={<span>💰</span>} />);
    expect(screen.getByText("$50,000")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
  });

  it("renders with description", () => {
    render(
      <StatCard
        label="Orders"
        value="1,234"
        description="Last 30 days"
      />
    );
    expect(screen.getByText("1,234")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("Last 30 days")).toBeInTheDocument();
  });
});
