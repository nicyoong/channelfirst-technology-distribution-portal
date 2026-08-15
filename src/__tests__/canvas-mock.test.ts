/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";

// Mock canvas globally to prevent jsdom from loading the native module
jest.mock("canvas", () => ({
  createCanvas: jest.fn(() => ({
    width: 800,
    height: 600,
    getContext: jest.fn(() => ({})),
    toDataURL: jest.fn(() => "data:image/png;base64,mock"),
  })),
  createImageData: jest.fn(),
  loadImage: jest.fn(() => Promise.resolve()),
}));

describe("Canvas Mock", () => {
  it("mocks canvas module", () => {
    expect(require("canvas").createCanvas).toBeDefined();
  });
});
