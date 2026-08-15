/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Textarea } from "@/components/ui/textarea";

describe("Textarea", () => {
  it("renders textarea", () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Textarea className="custom-textarea" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-textarea");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Textarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("renders with value", () => {
    render(<Textarea value="test value" />);
    expect(screen.getByRole("textbox")).toHaveValue("test value");
  });
});
