/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Checkbox } from "@/components/ui/checkbox";

describe("Checkbox", () => {
  it("renders checkbox", () => {
    render(<Checkbox id="test-checkbox" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Checkbox id="test-checkbox" />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("can be checked", () => {
    render(<Checkbox id="test-checkbox" defaultChecked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("applies custom className", () => {
    render(<Checkbox id="test-checkbox" className="custom-class" />);
    expect(screen.getByRole("checkbox")).toHaveClass("custom-class");
  });
});
