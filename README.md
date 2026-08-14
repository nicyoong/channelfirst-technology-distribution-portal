# ChannelFirst Technology — B2B IT Distribution Portal

A production-grade corporate and B2B reseller distribution portal for **ChannelFirst Technology**, a Malaysian IT distributor serving resellers, system integrators, and enterprise buyers.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) (strict mode) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Components | [Radix UI](https://www.radix-ui.com/) primitives |
| Icons | [Lucide React](https://lucide.dev/) |
| Motion | [Framer Motion](https://www.framer.com/motion/) |
| Utilities | [class-variance-authority](https://cva.style/), [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge) |
| Linting | [ESLint](https://eslint.org/) with Next.js config |

## Project Overview

ChannelFirst Technology is an authorised IT distributor in Malaysia supplying networking, servers, endpoints, cybersecurity, and software to 3,500+ resellers and system integrators nationwide. This portal serves as the public-facing digital presence and B2B reseller entry point.

### Key Features

- **Corporate website** with hero, trust stats, brand marquee, product categories, and promotions
- **Product catalogue** with client-side filtering (category, vendor, stock status), search, and sorting
- **Product detail pages** with full specs, branch stock levels, and RFQ integration
- **Reseller programme** with registration, login, and tier benefits (Silver / Gold / Platinum)
- **Training & Events** with filtering and registration
- **Support Hub** with RMA process, warranty lookup, SLA table, and FAQ accordion
- **Request for Quote (RFQ)** flow with reference number generation
- **SEO** with Open Graph, Twitter cards, JSON-LD Organisation schema, and bilingual alternates (EN/BM)
- **Accessibility**: semantic HTML, keyboard navigation, visible focus states, ARIA labels, skip-to-content link
- **Responsive**: mobile drawer navigation, collapsible filters, sticky RFQ button

## Setup & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

The development server runs at `http://localhost:3000`.

## Folder Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout (fonts, theme, providers)
│   ├── globals.css           # Tailwind CSS + custom theme tokens
│   ├── page.tsx              # Homepage
│   ├── about/page.tsx        # About page
│   ├── contact/page.tsx      # Contact page with form + branches
│   ├── products/page.tsx     # Products overview (redirects to /catalogue)
│   ├── catalogue/page.tsx    # Full catalogue with filters
│   ├── product/[sku]/page.tsx # Product detail pages (SSG)
│   ├── rfq/page.tsx          # Request for Quote
│   ├── reseller/
│   │   ├── page.tsx          # Reseller programme overview
│   │   ├── login/page.tsx    # Reseller login
│   │   └── register/page.tsx # Reseller registration (2-step form)
│   ├── training/page.tsx     # Training & events
│   ├── support/page.tsx      # Support hub (RMA, SLA, FAQ)
│   ├── brands/page.tsx       # Brand directory
│   ├── promotions/page.tsx   # Promotions listing
│   ├── solutions/page.tsx    # Solution categories
│   └── not-found.tsx         # 404 page
├── components/
│   ├── layout/               # Utility bar, navbar, footer
│   ├── seo/                  # Metadata, JSON-LD schema
│   └── ui/                   # 18 reusable component modules
│       ├── button, badge, card, input, select, textarea
│       ├── checkbox, radio-group, dialog, drawer, toast
│       ├── section-heading, stat-card, table, tabs
│       ├── skeleton, empty-state, breadcrumbs, motion-wrap
│       └── index.ts          # Barrel exports
├── contexts/
│   └── toast-context.tsx     # Toast notification system
├── data/
│   ├── products.ts           # 12 mock products with full specs
│   └── site.ts               # Events, testimonials, branches, tiers
└── lib/
    ├── utils.ts              # cn() class merger
    └── fonts.ts              # Google Fonts (Inter + Plus Jakarta Sans)
```

## Design System

| Token | Value |
|-------|-------|
| Primary | `#1D4ED8` |
| Navy | `#0F172A` |
| Surface | `#F8FAFC` |
| Border | `#E2E8F0` |
| Accent (Promotions) | `#F59E0B` |
| Success | `#16A34A` |
| Body Font | Inter |
| Heading Font | Plus Jakarta Sans |

## Production

```bash
npm run build   # produces .next/ output
npm start       # serves on port 3000
```

The project is configured for deployment on [Vercel](https://vercel.com) or any Node.js hosting platform supporting Next.js.

## License

Proprietary — ChannelFirst Technology Sdn Bhd
