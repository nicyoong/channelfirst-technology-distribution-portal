/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "@/components/ui/skeleton";

describe("Skeleton", () => {
  it("renders skeleton", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Skeleton className="custom-skeleton" />);
    expect(screen.getByRole("status")).toHaveClass("custom-skeleton");
  });
});
