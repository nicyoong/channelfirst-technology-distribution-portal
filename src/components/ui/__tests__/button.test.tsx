/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with default variant", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders with secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText("Secondary")).toBeInTheDocument();
  });

  it("renders with outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByText("Outline")).toBeInTheDocument();
  });

  it("renders with destructive variant", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("renders with ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByText("Ghost")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByText("Custom").parentElement;
    expect(button).toHaveClass("custom-class");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText("Disabled")).toBeDisabled();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    screen.getByText("Click").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders as child component with asChild prop", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    expect(screen.getByText("Link Button")).toBeInTheDocument();
    expect(screen.getByText("Link Button").tagName).toBe("A");
  });
});
