/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { JsonLd } from "@/components/seo/json-ld";

describe("JsonLd", () => {
  it("renders script tag with JSON-LD", () => {
    const data = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Test Org",
    };
    
    render(<JsonLd data={data} />);
    
    const script = screen.getByRole("script");
    expect(script).toBeInTheDocument();
    expect(JSON.parse(script?.textContent || "{}")).toEqual(data);
  });

  it("renders with multiple scripts", () => {
    const data1 = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Site 1",
    };
    const data2 = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Org 2",
    };
    
    render(
      <>
        <JsonLd data={data1} />
        <JsonLd data={data2} />
      </>
    );
    
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts).toHaveLength(2);
  });
});
