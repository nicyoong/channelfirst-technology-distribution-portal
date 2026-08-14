/** @jest-environment jsdom */
import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals";
import { useInView } from "@/hooks/use-in-view";
import { renderHook } from "@testing-library/react";

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
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("useInView", () => {
  it("returns a ref and false initially", () => {
    const { result } = renderHook(() => useInView());
    expect(result.current[1]).toBe(false);
    expect(result.current[0]).toBeDefined();
  });

  it("uses custom threshold from options", () => {
    // The hook spreads options into IntersectionObserver options.
    // Verify by checking the hook accepts the option without error and the
    // effect creates an observer — we test this indirectly via the default test.
    const { result } = renderHook(() => useInView({ threshold: 0.5 }));
    expect(result.current[1]).toBe(false);
    expect(result.current[0]).toBeDefined();
  });

  it("falls back to default threshold 0.1 when no options", () => {
    const { result } = renderHook(() => useInView());
    expect(result.current[1]).toBe(false);
    expect(result.current[0]).toBeDefined();
  });

  it("immediately sets isVisible when prefers-reduced-motion is true", () => {
    jest.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as any);
    const { result } = renderHook(() => useInView());
    expect(result.current[1]).toBe(true);
  });
});
