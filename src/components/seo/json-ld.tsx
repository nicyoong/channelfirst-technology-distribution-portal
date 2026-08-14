"use client";

import Script from "next/script";
import { generateJsonLd } from "./metadata";

export function JsonLdScript() {
  const jsonLd = generateJsonLd();
  return (
    <Script
      id="json-ld-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
