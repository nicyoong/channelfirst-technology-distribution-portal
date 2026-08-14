/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Input } from "@/components/ui/input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");
  });

  it("accepts and applies custom className", () => {
    const { container } = render(<Input className="my-input" />);
    expect(container.firstChild).toHaveClass("my-input");
  });

  it("passes through HTML attributes", () => {
    render(<Input placeholder="Type here" type="email" data-testid="email-input" />);
    const input = screen.getByTestId("email-input");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "Type here");
  });

  it("supports ref forwarding", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input ref={ref as any} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
