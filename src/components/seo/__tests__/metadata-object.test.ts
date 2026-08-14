/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { metadata } from "@/components/seo/metadata";

describe("metadata", () => {
  it("has default title", () => {
    expect(metadata.title.default).toContain("ChannelFirst Technology");
  });

  it("has title template", () => {
    expect(metadata.title.template).toBe("%s | ChannelFirst Technology");
  });

  it("has description", () => {
    expect(metadata.description.length).toBeGreaterThan(0);
  });

  it("has OpenGraph config", () => {
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph.type).toBe("website");
    expect(metadata.openGraph.locale).toBe("en_MY");
    expect(metadata.openGraph.url).toBe("https://www.channelfirst.com.my");
  });

  it("has Twitter config", () => {
    expect(metadata.twitter).toBeDefined();
    expect(metadata.twitter.card).toBe("summary_large_image");
  });

  it("has robots config", () => {
    expect(metadata.robots.index).toBe(true);
    expect(metadata.robots.follow).toBe(true);
  });

  it("has alternates with canonical URL", () => {
    expect(metadata.alternates?.canonical).toBe("https://www.channelfirst.com.my");
  });
});
