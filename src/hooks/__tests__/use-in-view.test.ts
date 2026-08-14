/** @jest-environment jsdom */
import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import { renderHook, act } from "@testing-library/react";
import { useInView } from "../use-in-view";

describe("useInView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock matchMedia for jsdom
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
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

  it("returns false initially", () => {
    const { result } = renderHook(() => useInView());
    expect(result.current[1]).toBe(false);
  });

  it("returns ref and isVisible tuple", () => {
    const { result } = renderHook(() => useInView());
    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current[0]).toBeDefined();
    expect(typeof result.current[1]).toBe('boolean');
  });
});
