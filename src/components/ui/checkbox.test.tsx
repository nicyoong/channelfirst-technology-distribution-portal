import React from "react";
import { render, screen } from "@testing-library/react";
import { Checkbox } from "./checkbox";

describe("Checkbox component", () => {
  it("renders a checkbox input", () => {
    render(<Checkbox id="test-checkbox" />);
    expect(screen.getByRole("checkbox", { name: /test-checkbox/i })).toBeInTheDocument();
  });

  it("has the correct base styling", () => {
    const { container } = render(<Checkbox id="cb" />);
    // Radix checkbox root is a button-like element
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("h-4");
    expect(el.className).toContain("w-4");
    expect(el.className).toContain("rounded-sm");
    expect(el.className).toContain("border");
  });

  it("is disabled when disabled prop is passed", () => {
    render(<Checkbox id="disabled-cb" disabled />);
    expect(screen.getByRole("checkbox", { name: /disabled-cb/i })).toBeDisabled();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Checkbox id="ref-cb" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("passes custom className through", () => {
    const { container } = render(<Checkbox id="custom-cb" className="custom-class" />);
    expect((container.firstChild as HTMLElement).className).toContain("custom-class");
  });

  it("shows check indicator when checked", () => {
    render(<Checkbox id="checked-cb" defaultChecked />);
    // The indicator should be present when checked
    const el = document.querySelector('[data-state="checked"]');
    expect(el).toBeInTheDocument();
  });
});
