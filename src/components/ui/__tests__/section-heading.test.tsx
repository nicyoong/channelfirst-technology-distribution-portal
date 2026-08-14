/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/ui/section-heading";

describe("SectionHeading", () => {
  it("renders heading with level 2", () => {
    render(<SectionHeading>Section Title</SectionHeading>);
    expect(screen.getByText("Section Title")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<SectionHeading className="custom-heading">Title</SectionHeading>);
    expect(screen.getByText("Title")).toHaveClass("custom-heading");
  });

  it("renders with icon", () => {
    render(
      <SectionHeading icon="shield">
        Security
      </SectionHeading>
    );
    expect(screen.getByText("Security")).toBeInTheDocument();
  });
});
