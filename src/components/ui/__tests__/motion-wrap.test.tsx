/** @jest-environment jsdom */
import { describe, it, expect, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MotionWrap } from "@/components/ui/motion-wrap";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => require("react").createElement("div", props, children),
  },
}));

describe("MotionWrap", () => {
  it("renders children", () => {
    render(
      <MotionWrap>
        <div>Test Content</div>
      </MotionWrap>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <MotionWrap className="custom-class">
        <div>Content</div>
      </MotionWrap>
    );
    const wrapper = screen.getByText("Content").parentElement;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("passes through props to motion.div", () => {
    const { container } = render(
      <MotionWrap data-testid="motion-wrap">
        <div>Content</div>
      </MotionWrap>
    );
    expect(container.querySelector('[data-testid="motion-wrap"]')).toBeInTheDocument();
  });
});
