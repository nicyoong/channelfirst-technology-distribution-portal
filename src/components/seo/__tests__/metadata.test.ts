/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { generateMetadata } from "@/components/seo/metadata";

describe("generateMetadata", () => {
  it("generates metadata with title", () => {
    const metadata = generateMetadata({
      title: "Test Page",
    });
    expect(metadata.title).toBe("Test Page");
  });

  it("generates metadata with description", () => {
    const metadata = generateMetadata({
      title: "Test",
      description: "Test description",
    });
    expect(metadata.description).toBe("Test description");
  });

  it("generates metadata with open graph", () => {
    const metadata = generateMetadata({
      title: "Test",
      openGraph: {
        title: "OG Title",
        description: "OG Description",
        images: [{ url: "https://example.com/image.jpg" }],
      },
    });
    expect(metadata.openGraph?.title).toBe("OG Title");
    expect(metadata.openGraph?.images).toHaveLength(1);
  });

  it("generates metadata with twitter", () => {
    const metadata = generateMetadata({
      title: "Test",
      twitter: {
        card: "summary_large_image",
        title: "Twitter Title",
      },
    });
    expect(metadata.twitter?.title).toBe("Twitter Title");
  });
});
