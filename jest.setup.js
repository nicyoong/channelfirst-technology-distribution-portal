import "@testing-library/jest-dom";

// Mock canvas before jsdom loads to prevent the native module error
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
