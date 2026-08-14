import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./input";

describe("Input component", () => {
  it("renders an input element", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("accepts and displays a value", async () => {
    render(<Input placeholder="Test" />);
    const input = screen.getByPlaceholderText("Test") as HTMLInputElement;
    const user = userEvent.setup();
    await user.type(input, "Hello World");
    expect(input.value).toBe("Hello World");
  });

  it("applies type attribute correctly", () => {
    render(<Input type="email" placeholder="Email" />);
    const input = screen.getByPlaceholderText("Email") as HTMLInputElement;
    expect(input.type).toBe("email");
  });

  it("is disabled when disabled prop is passed", () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });

  it("passes custom className through", () => {
    const { container } = render(<Input className="custom-input" />);
    expect((container.firstChild as HTMLElement).className).toContain("custom-input");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("supports name and id attributes", () => {
    render(<Input name="username" id="username-input" />);
    const input = screen.getByLabelText("") as HTMLInputElement; // fallback, just check DOM
    const inputs = document.querySelectorAll('input[id="username-input"]');
    expect(inputs.length).toBe(1);
  });

  it("renders with standard styling classes", () => {
    const { container } = render(<Input />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("h-10");
    expect(el.className).toContain("w-full");
    expect(el.className).toContain("border");
    expect(el.className).toContain("rounded-md");
  });
});
