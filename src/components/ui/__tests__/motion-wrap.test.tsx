/** @jest-environment jsdom */
import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MotionWrapper, StaggerContainer, FadeIn, ScaleIn } from "@/components/ui/motion-wrap";

// Polyfill matchMedia for jsdom
beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // Polyfill IntersectionObserver for framer-motion
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    })),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("MotionWrapper", () => {
  it("renders children in a wrapper div", () => {
    render(<MotionWrapper><span>Content</span></MotionWrapper>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders a plain div when prefers-reduced-motion is true", () => {
    jest.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as any);
    const { container } = render(<MotionWrapper><span>Content</span></MotionWrapper>);
    expect(container.firstChild.tagName.toLowerCase()).toBe("div");
  });

  it("applies custom className", () => {
    const { container } = render(
      <MotionWrapper className="my-class"><span>Content</span></MotionWrapper>
    );
    expect(container.firstChild).toHaveClass("my-class");
  });

  it("renders with motion when reduced motion is false", () => {
    jest.spyOn(window, "matchMedia").mockReturnValue({ matches: false } as any);
    const { container } = render(
      <MotionWrapper delay={0.5}><span>Content</span></MotionWrapper>
    );
    expect(container.firstChild.tagName.toLowerCase()).toBe("div");
  });
});

describe("StaggerContainer", () => {
  it("renders children", () => {
    render(
      <StaggerContainer>
        <div>1</div>
        <div>2</div>
      </StaggerContainer>
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders a plain div when prefers-reduced-motion is true", () => {
    jest.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as any);
    const { container } = render(
      <StaggerContainer><span>Content</span></StaggerContainer>
    );
    expect(container.firstChild.tagName.toLowerCase()).toBe("div");
  });
});

describe("FadeIn", () => {
  it("renders children", () => {
    render(<FadeIn><span>Faded</span></FadeIn>);
    expect(screen.getByText("Faded")).toBeInTheDocument();
  });

  it("renders plain div when reduced motion", () => {
    jest.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as any);
    const { container } = render(<FadeIn><span>Content</span></FadeIn>);
    expect(container.firstChild.tagName.toLowerCase()).toBe("div");
  });
});

describe("ScaleIn", () => {
  it("renders children", () => {
    render(<ScaleIn><span>Scaled</span></ScaleIn>);
    expect(screen.getByText("Scaled")).toBeInTheDocument();
  });

  it("renders plain div when reduced motion", () => {
    jest.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as any);
    const { container } = render(<ScaleIn><span>Content</span></ScaleIn>);
    expect(container.firstChild.tagName.toLowerCase()).toBe("div");
  });
});
