/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/ui/section-heading";

describe("SectionHeading", () => {
  it("renders heading text", () => {
    render(<SectionHeading title="Section Title" />);
    expect(screen.getByText("Section Title")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<SectionHeading title="Title" className="custom-heading" />);
    const heading = document.querySelector(".custom-heading");
    expect(heading).toBeInTheDocument();
  });

  it("renders eyebrow text", () => {
    render(<SectionHeading eyebrow="EP 01" title="Title" />);
    expect(screen.getByText("EP 01")).toBeInTheDocument();
  });
});
