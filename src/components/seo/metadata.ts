import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "ChannelFirst Technology — Malaysia's Trusted IT Distribution Partner",
    template: "%s | ChannelFirst Technology",
  },
  description:
    "ChannelFirst Technology is a leading IT distribution company in Malaysia, providing networking, servers, endpoints, cybersecurity, and software solutions to resellers, system integrators, and corporate buyers.",
  keywords: [
    "IT distributor Malaysia",
    "computer reseller Malaysia",
    "networking equipment Malaysia",
    "server distributor",
    "cybersecurity Malaysia",
    "software licensing Malaysia",
    "ChannelFirst Technology",
    "B2B IT distribution",
    "system integrator Malaysia",
  ],
  authors: [{ name: "ChannelFirst Technology" }],
  creator: "ChannelFirst Technology",
  publisher: "ChannelFirst Technology Sdn Bhd",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: "https://www.channelfirst.com.my",
    siteName: "ChannelFirst Technology",
    title: "ChannelFirst Technology — Malaysia's Trusted IT Distribution Partner",
    description:
      "Leading IT distributor in Malaysia serving resellers, system integrators, and enterprise customers with networking, servers, endpoints, cybersecurity, and software solutions.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ChannelFirst Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChannelFirst Technology — Malaysia's Trusted IT Distribution Partner",
    description:
      "Leading IT distributor in Malaysia serving resellers, system integrators, and enterprise customers.",
    images: ["/og-image.svg"],
    creator: "@channelfirstmy",
  },
  alternates: {
    canonical: "https://www.channelfirst.com.my",
    languages: {
      "en-US": "https://www.channelfirst.com.my/en",
      "ms-MY": "https://www.channelfirst.com.my/ms",
    },
  },
  category: "Information Technology",
  classification: "Business",
};

export function generateJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ChannelFirst Technology Sdn Bhd",
    url: "https://www.channelfirst.com.my",
    logo: "https://www.channelfirst.com.my/logo.png",
    description:
      "Leading IT distributor in Malaysia providing networking, servers, endpoints, cybersecurity, and software solutions to resellers and enterprises.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lot 15, Jalan Teknologi 3/5, Taman Sains Selangor",
      addressLocality: "Subang Jaya",
      addressRegion: "Selangor",
      postalCode: "47810",
      addressCountry: "MY",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+60-3-2780-8888",
      contactType: "sales",
      availableLanguage: ["English", "Malay"],
    },
    sameAs: [
      "https://www.facebook.com/channelfirstmy",
      "https://www.linkedin.com/company/channelfirst-technology",
    ],
    knowsAbout: [
      "Networking Equipment",
      "Enterprise Servers",
      "Cybersecurity",
      "Software Licensing",
      "IT Distribution",
    ],
  };
}

export function generateProductJsonLd(product: {
  name: string;
  description: string;
  brand: string;
  category: string;
  availability?: string;
  price?: string;
  priceCurrency?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.category,
    availability: product.availability || "https://schema.org/InStock",
    ...(product.price && {
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: product.priceCurrency || "MYR",
        availability: product.availability || "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "ChannelFirst Technology",
        },
      },
    }),
  };
}

export function generateBreadcrumbJsonLd(items: { label: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.url,
    })),
  };
}
