/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

describe("RadioGroup", () => {
  it("renders radio group", () => {
    render(
      <RadioGroup defaultValue="option-1">
        <RadioGroupItem value="option-1" id="option-1" />
        <label htmlFor="option-1">Option 1</label>
        <RadioGroupItem value="option-2" id="option-2" />
        <label htmlFor="option-2">Option 2</label>
      </RadioGroup>
    );
    expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Option 2")).toBeInTheDocument();
  });

  it("selects default value", () => {
    render(
      <RadioGroup defaultValue="option-1">
        <RadioGroupItem value="option-1" id="option-1" />
        <label htmlFor="option-1">Option 1</label>
      </RadioGroup>
    );
    expect(screen.getByLabelText("Option 1")).toBeChecked();
  });
});
