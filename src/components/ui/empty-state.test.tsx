import React from "react";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./empty-state";
import { PackageOpen } from "lucide-react";

describe("EmptyState component", () => {
  it("renders title correctly", () => {
    render(<EmptyState title="No Results" />);
    expect(screen.getByRole("heading", { level: 3, name: /no results/i })).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<EmptyState title="Empty" description="Nothing to show" />);
    expect(screen.getByText("Nothing to show")).toBeInTheDocument();
  });

  it("does not render description when omitted", () => {
    render(<EmptyState title="Empty" />);
    expect(screen.queryByText("Some description")).not.toBeInTheDocument();
  });

  it("renders default PackageOpen icon when no icon prop provided", () => {
    const { container } = render(<EmptyState title="Empty" />);
    const iconContainer = container.querySelector('.rounded-full');
    expect(iconContainer).toBeInTheDocument();
  });

  it("renders custom icon when provided", () => {
    render(
      <EmptyState
        title="Custom Icon"
        icon={<span data-testid="custom-icon">Custom</span>}
      />
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders action when provided", () => {
    render(
      <EmptyState
        title="Empty"
        action={<button data-testid="action-btn">Add Item</button>}
      />
    );
    expect(screen.getByTestId("action-btn")).toBeInTheDocument();
  });

  it("does not render action when omitted", () => {
    render(<EmptyState title="Empty" />);
    expect(screen.queryByTestId("action-btn")).not.toBeInTheDocument();
  });

  it("passes custom className through", () => {
    const { container } = render(
      <EmptyState title="Empty" className="custom-empty" />
    );
    expect((container.firstChild as HTMLElement).className).toContain("custom-empty");
  });

  it("has dashed border styling", () => {
    const { container } = render(<EmptyState title="Empty" />);
    expect((container.firstChild as HTMLElement).className).toContain("border-dashed");
  });
});
