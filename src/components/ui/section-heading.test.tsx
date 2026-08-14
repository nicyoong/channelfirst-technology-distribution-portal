import React from "react";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "./section-heading";

describe("SectionHeading component", () => {
  it("renders title correctly", () => {
    render(<SectionHeading title="Main Title" />);
    expect(screen.getByRole("heading", { level: 2, name: /main title/i })).toBeInTheDocument();
  });

  it("renders eyebrow when provided", () => {
    render(<SectionHeading eyebrow="Our Story" title="About Us" />);
    expect(screen.getByText("Our Story")).toBeInTheDocument();
  });

  it("does not render eyebrow when omitted", () => {
    render(<SectionHeading title="Just Title" />);
    expect(screen.queryByText("Our Story")).not.toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(
      <SectionHeading title="Title" subtitle="A description of the section" />
    );
    expect(screen.getByText("A description of the section")).toBeInTheDocument();
  });

  it("does not render subtitle when omitted", () => {
    render(<SectionHeading title="Title Only" />);
    expect(screen.queryByText("No subtitle here")).not.toBeInTheDocument();
  });

  it("applies center alignment when align='center'", () => {
    const { container } = render(
      <SectionHeading title="Centered" align="center" />
    );
    expect((container.firstChild as HTMLElement).className).toContain("text-center");
  });

  it("applies left alignment by default", () => {
    const { container } = render(<SectionHeading title="Left Aligned" />);
    // default is left, so text-center should NOT be present
    expect((container.firstChild as HTMLElement).className).not.toContain("text-center");
  });

  it("passes custom className through", () => {
    const { container } = render(
      <SectionHeading title="Custom" className="my-custom-class" />
    );
    expect((container.firstChild as HTMLElement).className).toContain("my-custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<SectionHeading title="Ref Test" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("renders eyebrow in uppercase styling", () => {
    const { container } = render(
      <SectionHeading eyebrow="EYEBROW" title="Title" />
    );
    const eyebrow = container.querySelector('p');
    expect(eyebrow?.className).toContain("uppercase");
    expect(eyebrow?.className).toContain("tracking-wider");
  });

  it("handles empty title gracefully", () => {
    render(<SectionHeading title="" />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });
});
