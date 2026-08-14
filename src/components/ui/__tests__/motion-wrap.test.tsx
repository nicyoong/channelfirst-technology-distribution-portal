/** @jest-environment jsdom */
import { describe, it, expect, beforeEach } from "@jest/globals";
import { render } from "@testing-library/react";
import { MotionWrapper } from "@/components/ui/motion-wrap";

// Mock framer-motion to strip animation but keep element type
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) =>
      require("react").createElement("div", props, children),
  },
}));

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("MotionWrapper", () => {
  it("renders children", () => {
    const { container } = render(
      <MotionWrapper>
        <div>Test Content</div>
      </MotionWrapper>
    );
    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <MotionWrapper className="custom-class">
        <div>Content</div>
      </MotionWrapper>
    );
    const wrapper = document.querySelector(".custom-class");
    expect(wrapper).toBeInTheDocument();
  });

  it("passes through props", () => {
    const { container } = render(
      <MotionWrapper data-testid="motion-wrapper" className="test-class">
        <div>Content</div>
      </MotionWrapper>
    );
    const el = container.querySelector(".test-class");
    expect(el).toBeInTheDocument();
  });
});
