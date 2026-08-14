# Changelog

All notable changes to the ChannelFirst Technology Distribution Portal will be documented in this file.

---

## [0.3.0] — 2026-08-14

### Added
- **Reseller Registration** (`/reseller/register`): 2-step form with company details, SSM validation, work-email check (rejects Gmail/Yahoo/Hotmail), business type selector, monthly volume range, category interest tags, document upload placeholder, and success state
- **Reseller Login** (`/reseller/login`): Email/password form with show/hide password, remember me checkbox, forgot password link, security notice, and loading state
- **Training & Events** (`/training`): Event listing with category/vendor/online/onsite filters, event cards with seat availability, detail modal with agenda and speaker info, registration with toast notification
- **Support Hub** (`/support`): RMA 4-step process, warranty lookup form, SLA table by reseller tier (Silver/Gold/Platinum), branch support contact cards, FAQ accordion
- **Toast notification system**: Context-based toasts with success/error/info types, auto-dismiss after 4s, slide-in animation
- **Framer Motion scroll animations**: `MotionWrapper`, `StaggerContainer`, `FadeIn`, `ScaleIn` components with `prefers-reduced-motion` support
- **Favicon**: SVG favicon with ChannelFirst "C" branding
- **OG image**: SVG placeholder for social sharing
- **README.md**: Project overview, tech stack, setup instructions, feature list, folder structure
- **CHANGELOG.md**: This file

### Improved
- Mobile navigation drawer: sticky "Request Quote" button at bottom, collapsible product categories
- Product cards: hover micro-interactions with scale transitions on brand logos
- Catalogue page: skeleton loading states, empty state with clear-filters action
- Support page: interactive warranty lookup with serial number validation

---

## [0.2.0] — 2026-08-13

### Added
- **Homepage rebuild**: Hero with live stock dashboard, trust stats band, infinite-scroll brand marquee, 6 product category cards, 12 best-seller product grid, 3 promotional cards, 3 reseller tier cards (Silver/Gold/Platinum), 3 training event previews, 5-branch coverage with map placeholder, 3 testimonials, final CTA band
- **Product Catalogue** (`/catalogue`): Client-side filtering by category, vendor, stock status; search; sort (name, availability, newest); mobile filter drawer; skeleton loading; empty state
- **Product Detail** (`/product/[sku]`): Breadcrumbs, image gallery, vendor/category/stock badges, key specs, full specs table, branch stock levels with visual bars, pricing CTA, related products carousel, warranty note
- **RFQ Page** (`/rfq`): Detailed quote request form, step-by-step sidebar, urgent contact card, reseller benefits
- **Supporting pages**: `/about`, `/brands`, `/promotions`, `/solutions`, `/support`, `/training`, `/contact`, `/reseller`
- **Data layer**: 12 realistic B2B IT products with full specs, branch stock levels, SKUs; 12 vendors; 6 categories; 5 branches; 3 testimonials; 3 promotions; 3 events; 3 reseller tiers

---

## [0.1.0] — 2026-08-12

### Added
- Next.js 14 App Router project scaffold with TypeScript strict mode
- Tailwind CSS v4 with custom theme tokens (navy, primary blue, amber accents)
- Google Fonts: Inter (body) + Plus Jakarta Sans (headings)
- 18 reusable UI components (Button, Badge, Card, Input, Select, Textarea, Checkbox, RadioGroup, Dialog, Drawer, Toast, SectionHeading, StatCard, Table, Tabs, Skeleton, EmptyState, Breadcrumbs)
- Global layout: utility bar, sticky navbar with mega menu, footer with newsletter
- Mobile responsive drawer with hamburger menu
- SEO metadata template with Open Graph, Twitter cards, JSON-LD Organisation schema
- Root pages: Home, About, Contact, Products, RFQ
- Production build passing with zero TypeScript errors
