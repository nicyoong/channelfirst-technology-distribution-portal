import { metadata } from "./metadata";

describe("metadata export", () => {
  it("has a default title", () => {
    expect(metadata.title).toBeDefined();
    expect(metadata.title.default).toBe(
      "ChannelFirst Technology — Malaysia's Trusted IT Distribution Partner"
    );
  });

  it("has a title template", () => {
    expect(metadata.title.template).toBe("%s | ChannelFirst Technology");
  });

  it("has a description", () => {
    expect(metadata.description).toBeDefined();
    expect(typeof metadata.description).toBe("string");
    expect(metadata.description.length).toBeGreaterThan(0);
  });

  it("has keywords array", () => {
    expect(metadata.keywords).toBeDefined();
    expect(Array.isArray(metadata.keywords)).toBe(true);
    expect(metadata.keywords.length).toBeGreaterThan(0);
  });

  it("has authors configured", () => {
    expect(metadata.authors).toBeDefined();
    expect(metadata.authors[0].name).toBe("ChannelFirst Technology");
  });

  it("has openGraph configuration", () => {
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph.type).toBe("website");
    expect(metadata.openGraph.locale).toBe("en_MY");
    expect(metadata.openGraph.url).toBe("https://www.channelfirst.com.my");
  });

  it("has openGraph images", () => {
    expect(metadata.openGraph?.images).toBeDefined();
    expect(metadata.openGraph.images[0].url).toBe("/og-image.jpg");
    expect(metadata.openGraph.images[0].width).toBe(1200);
    expect(metadata.openGraph.images[0].height).toBe(630);
  });

  it("has twitter card configuration", () => {
    expect(metadata.twitter).toBeDefined();
    expect(metadata.twitter.card).toBe("summary_large_image");
    expect(metadata.twitter.creator).toBe("@channelfirstmy");
  });

  it("has robots configuration", () => {
    expect(metadata.robots).toBeDefined();
    expect(metadata.robots.index).toBe(true);
    expect(metadata.robots.follow).toBe(true);
    expect(metadata.robots.googleBot).toBeDefined();
    expect(metadata.robots.googleBot.index).toBe(true);
  });

  it("has alternates with canonical URL", () => {
    expect(metadata.alternates).toBeDefined();
    expect(metadata.alternates.canonical).toBe("https://www.channelfirst.com.my");
    expect(metadata.alternates.languages).toBeDefined();
    expect(metadata.alternates.languages["en-US"]).toBe("https://www.channelfirst.com.my/en");
    expect(metadata.alternates.languages["ms-MY"]).toBe("https://www.channelfirst.com.my/ms");
  });
});
