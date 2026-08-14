import React from "react";
import { render, screen } from "@testing-library/react";
import { RadioGroup, RadioGroupItem } from "./radio-group";

describe("RadioGroup component", () => {
  it("renders children", () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" id="opt-a" />
      </RadioGroup>
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("applies grid gap styling", () => {
    const { container } = render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" id="opt-a" />
      </RadioGroup>
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("grid");
    expect(el.className).toContain("gap-2");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <RadioGroup ref={ref} defaultValue="a">
        <RadioGroupItem value="a" id="opt-a" />
      </RadioGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("passes custom className through", () => {
    const { container } = render(
      <RadioGroup className="custom-group" defaultValue="a">
        <RadioGroupItem value="a" id="opt-a" />
      </RadioGroup>
    );
    expect((container.firstChild as HTMLElement).className).toContain("custom-group");
  });
});

describe("RadioGroupItem component", () => {
  it("renders as a radio input", () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" id="radio-a" />
      </RadioGroup>
    );
    expect(screen.getByRole("radio", { name: /radio-a/i })).toBeInTheDocument();
  });

  it("is disabled when disabled prop is passed", () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" id="disabled-radio" disabled />
      </RadioGroup>
    );
    expect(screen.getByRole("radio", { name: /disabled-radio/i })).toBeDisabled();
  });

  it("has correct size styling (aspect-square)", () => {
    const { container } = render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" id="sized-radio" />
      </RadioGroup>
    );
    const el = container.querySelector('[data-state]') as HTMLElement;
    expect(el?.className).toContain("aspect-square");
    expect(el?.className).toContain("h-4");
    expect(el?.className).toContain("w-4");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem ref={ref} value="a" id="ref-radio" />
      </RadioGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
