/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { metadata } from "@/components/seo/metadata";

describe("metadata (default export)", () => {
  it("has a default title", () => {
    expect(metadata.title?.default).toContain("ChannelFirst Technology");
  });

  it("has a title template", () => {
    expect(metadata.title?.template).toBe("%s | ChannelFirst Technology");
  });

  it("has a description", () => {
    expect(typeof metadata.description).toBe("string");
    expect(metadata.description.length).toBeGreaterThan(0);
  });

  it("has OpenGraph config", () => {
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph.type).toBe("website");
    expect(metadata.openGraph.locale).toBe("en_MY");
  });

  it("has Twitter config", () => {
    expect(metadata.twitter).toBeDefined();
    expect(metadata.twitter.card).toBe("summary_large_image");
  });

  it("has robots config", () => {
    expect(metadata.robots).toBeDefined();
    expect(metadata.robots.index).toBe(true);
  });
});
