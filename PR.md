# Pull Request — ChannelFirst B2B Portal: Feature & Quality Pass

**Branch:** `feat/channel-first-b2b-portal-refinement` → `main`
**Commits:** 8
**Files changed:** 63 (+15,395 / −10,102)

---

## Summary

This PR delivers three major work streams on top of the existing portal foundation:

1. **Tiered B2B Pricing System** — Product-level tiered pricing with dynamic RFQ cart calculations and tier-incentive UI
2. **Enhanced Catalogue Filtering** — Technical-spec filters (PoE, rack-mount, Wi-Fi, port count) with URL-synced query params
3. **Code Quality & Resilience** — Error boundaries, delayed skeleton loading, Zod validation, zero `any` types

---

## Changes by Area

### 1. Tiered Pricing System

**New files:**
- `src/lib/pricing.ts` — Pure utility functions for tiered price calculations
  - `getTierForQty()`, `getUnitPrice()`, `calcTotal()`
  - `getTierLabel()`, `getNextTier()` for incentive messaging
  - `formatMYR()` for Malaysian Ringgit formatting
- `src/hooks/use-tier-info.ts` — React hook wrapping pricing logic per cart item
- `src/components/ui/rfq-drawer.tsx` — Full RFQ cart drawer with tiered pricing display

**Modified files:**
- `src/data/products.ts` — Added `TieredPrice` interface + `tieredPrice` field to all 12 products
- `src/hooks/use-rfq-cart.ts` — Added `estimatedTotal`, `formatMYR`, tier-aware cart state
- `src/app/product/[sku]/page.tsx` — Refactored into server component + client `product-detail.tsx`
- `src/app/product/[sku]/product-detail.tsx` — New client component with quantity stepper, live price calc, tier table, tier incentive banner

**Product pricing added:**

| Product | List | Tier 2 (10%) | Tier 3 (20%) |
|---------|------|-------------|-------------|
| Cisco Catalyst 1000 | RM 1,500 | RM 1,350 | RM 1,200 |
| Dell PowerEdge R760 | RM 12,500 | RM 11,250 | RM 10,000 |
| HPE DL380 Gen11 | RM 11,800 | RM 10,620 | RM 9,440 |
| Lenovo X1 Carbon G12 | RM 5,200 | RM 4,680 | RM 4,160 |
| FortiGate 200F | RM 8,500 | RM 7,650 | RM 6,800 |
| Aruba AP22 | RM 850 | RM 765 | RM 680 |
| UDM Pro | RM 2,100 | RM 1,890 | RM 1,680 |
| MS 365 Business Premium | RM 420 | RM 378 | RM 336 |
| Logitech Rally Bar | RM 6,800 | RM 6,120 | RM 5,440 |
| Epson EB-L735U | RM 9,500 | RM 8,550 | RM 7,600 |
| Synology RS1221+ | RM 2,800 | RM 2,520 | RM 2,240 |
| APC Smart-UPS 3000VA | RM 3,200 | RM 2,880 | RM 2,560 |

---

### 2. Enhanced Catalogue Filtering

**Modified:** `src/app/catalogue/page.tsx`

- Added **Technical Specs** filter section with multi-select checkboxes:
  - **PoE Support** — matches Aruba AP22, Logitech Rally Bar
  - **Rack Mountable** — 1U (FortiGate, Synology) / 2U (Dell, HPE, APC)
  - **Wi-Fi Standard** — Wi-Fi 6 (Aruba AP22)
  - **Port Count** — 24 (Cisco), 10 (UDM Pro), 8 (FortiGate)
- All filters sync to URL query params (`?category=networking&poe=true&rack=1U,wifi=Wi-Fi%206`)
- Product cards now show PoE and rack-mount badges as image overlays
- Delayed skeleton loading: skeletons only appear after 300ms of filtering (avoids flicker on instant filters)

**Modified:** `src/data/products.ts`

- Added `TechSpecs` interface with `poeSupport`, `rackMountable`, `wifiStandard`, `portCount`
- All 12 products tagged with realistic technical specifications

---

### 3. Reseller Registration — Zod Validation

**New files:**
- `src/lib/validations/reseller-register.ts` — Zod schema with strict validation

**Modified:** `src/app/reseller/register/page.tsx`

- Work email validation rejects free domains (Gmail, Yahoo, Hotmail, Outlook, etc.)
- SSM registration number validates both formats:
  - New: 12–14 digit numeric (`199901000123`)
  - Legacy: 1–7 digits + dash + alphanumeric (`1234567-A`)
- Business type dropdown updated to Malaysian entity types: Sdn Bhd, Enterprise, LLP, System Integrator
- Whitespace-only company names correctly rejected (`.trim().min(2)`)
- Two-step form with progress indicator

---

### 4. Error Boundaries & Resilience

**New files:**
- `src/components/ui/error-boundary.tsx` — Generic React error boundary with:
  - `getDerivedStateFromError` + `componentDidCatch`
  - Custom fallback UI with "Try again" button
  - Optional `fallback` prop for page-specific error states

**Applied to:**
- `/catalogue` — `CatalogueErrorFallback` with reload button
- RFQ Drawer — inline error fallback with reload

---

### 5. Test Infrastructure

**New test files (14 files, ~2,200 lines):**
- `src/lib/__tests__/reseller-register.test.ts` — 55 tests for Zod validation
- `src/lib/__tests__/pricing.test.ts` — 30 tests for tiered pricing logic
- `src/hooks/__tests__/use-rfq-cart.test.ts` — 18 tests for cart operations
- `src/hooks/__tests__/use-tier-info.test.ts` — 12 tests for tier calculations
- `src/hooks/__tests__/use-in-view.test.ts` — 3 tests for intersection observer
- `src/data/__tests__/products.test.ts` — 7 tests for product data
- `src/data/__tests__/products-tiered-pricing.test.ts` — tiered pricing data tests
- `src/data/__tests__/site.test.ts` — 12 tests for site data
- `src/components/ui/__tests__/error-boundary.test.tsx` — 16 tests
- `src/components/ui/__tests__/error-boundary-edge-cases.test.tsx` — 18 tests
- `src/components/ui/__tests__/rfq-drawer.test.tsx` — 27 tests
- Plus existing component tests updated

**Configuration fixes:**
- `jest.config.js` — Fixed ESM/CommonJS interop for framer-motion, Radix UI
- `tsconfig.json` — Excluded test files from TypeScript build (fixes Vercel deploy)
- `mocks/canvas.js` — Added canvas mock for jsdom test environment

---

## Build Status

```
✓ Compiled successfully
✓ TypeScript: 0 errors
✓ 30 static routes + 12 dynamic product pages = 42 total
```

---

## Key Decisions

1. **Server/Client split for product detail** — The `[sku]/page.tsx` is a server component (for `generateMetadata`/`generateStaticParams`), dynamically importing the client-side `product-detail.tsx` for interactive features.

2. **Tiered pricing as data, not computation** — Each product carries its own `TieredPrice` object. The pricing engine is pure and testable; no backend dependency.

3. **URL-synced filters** — All catalogue filters are reflected in the URL, making filtered views shareable and bookmarkable. Uses `router.replace()` to avoid history pollution.

4. **Delayed skeletons** — Filter changes trigger skeletons only after 300ms to avoid jarring flicker on instant filters while still showing loading state for complex multi-filter combinations.

5. **Zod over manual validation** — The reseller form uses a single Zod schema for all validation rules, with errors mapped directly to form fields.

---

## Risks & Notes

- The `eslint-config-next/core-web-vitals` import path warning is cosmetic and does not affect the build
- Test files are excluded from the TypeScript build via `tsconfig.json` — they run independently via Jest
- The `canvas` mock is required for `@radix-ui` tests in jsdom; remove if tests are migrated to Vitest
