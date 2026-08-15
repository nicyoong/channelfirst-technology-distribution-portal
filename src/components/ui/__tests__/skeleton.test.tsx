/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "@/components/ui/skeleton";

describe("Skeleton", () => {
  it("renders skeleton element", () => {
    render(<Skeleton />);
    // Skeleton renders a div with animation classes, no ARIA role
    const skeleton = document.querySelector(".animate-pulse");
    expect(skeleton).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Skeleton className="custom-skeleton" />);
    const skeleton = document.querySelector(".custom-skeleton");
    expect(skeleton).toBeInTheDocument();
  });
});
