/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import { JsonLdScript } from "@/components/seo/json-ld";

describe("JsonLdScript", () => {
  it("renders a script tag with JSON-LD", () => {
    render(<JsonLdScript />);
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts).toHaveLength(1);
    const parsed = JSON.parse(scripts[0].textContent || "{}");
    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@type"]).toBe("Organization");
  });
});
