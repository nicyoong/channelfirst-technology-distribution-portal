/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { StatCard } from "@/components/ui/stat-card";

describe("StatCard", () => {
  it("renders stat card with title and value", () => {
    render(
      <StatCard
        title="Total Products"
        value="150"
      />
    );
    expect(screen.getByText("Total Products")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  it("renders with icon", () => {
    render(
      <StatCard
        title="Revenue"
        value="$50,000"
        icon="dollar-sign"
      />
    );
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$50,000")).toBeInTheDocument();
  });

  it("renders with trend", () => {
    render(
      <StatCard
        title="Orders"
        value="1,234"
        trend="+12%"
      />
    );
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("1,234")).toBeInTheDocument();
    expect(screen.getByText("+12%")).toBeInTheDocument();
  });
});
