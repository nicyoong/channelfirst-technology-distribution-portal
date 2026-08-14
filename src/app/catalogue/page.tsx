"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Network,
  Server,
  Monitor,
  Shield,
  Package,
  Cable,
  CheckCircle2,
  X,
  ChevronDown,
  Zap,
  HardDrive,
  Wifi,
  Cpu as NetworkPort,
} from "lucide-react";
import {
  Badge,
  Card,
  Input,
  Button,
  Skeleton,
  EmptyState,
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/ui";
import type { Product } from "@/data/products";
import { products, categories, vendors } from "@/data/products";

const breadcrumbs: BreadcrumbItem[] = [
  { label: "Catalogue", href: "/catalogue" },
];

const categoryIcons: Record<string, typeof Network> = {
  networking: Network,
  "servers-storage": Server,
  endpoints: Monitor,
  cybersecurity: Shield,
  software: Package,
  accessories: Cable,
};

// Technical spec filter options
const POE_OPTIONS = [
  { value: "true", label: "PoE Support" },
];

const RACK_OPTIONS = [
  { value: "1U", label: "1U Rack Mount" },
  { value: "2U", label: "2U Rack Mount" },
];

const WIFI_OPTIONS = [
  { value: "Wi-Fi 6", label: "Wi-Fi 6 (802.11ax)" },
  { value: "Wi-Fi 6E", label: "Wi-Fi 6E" },
  { value: "Wi-Fi 7", label: "Wi-Fi 7 (802.11be)" },
];

const PORT_OPTIONS = [
  { value: "24", label: "24 Ports" },
  { value: "48", label: "48 Ports" },
];

function CatalogueContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read all filter params from URL
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";
  const initialVendor = searchParams.get("vendor") || "";
  const initialStock = searchParams.get("stock") || "";
  const initialSortBy = searchParams.get("sort") || "name-asc";
  const initialPoE = searchParams.get("poe") || "";
  const initialRack = searchParams.get("rack") || "";
  const initialWifi = searchParams.get("wifi") || "";
  const initialPort = searchParams.get("port") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedVendor, setSelectedVendor] = useState(initialVendor);
  const [stockFilter, setStockFilter] = useState(initialStock);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Tech spec filters (can be multi-select via comma-separated values)
  const [selectedPoE, setSelectedPoE] = useState<string[]>(
    initialPoE ? initialPoE.split(",") : []
  );
  const [selectedRack, setSelectedRack] = useState<string[]>(
    initialRack ? initialRack.split(",") : []
  );
  const [selectedWifi, setSelectedWifi] = useState<string[]>(
    initialWifi ? initialWifi.split(",") : []
  );
  const [selectedPort, setSelectedPort] = useState<string[]>(
    initialPort ? initialPort.split(",") : []
  );

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedVendor) params.set("vendor", selectedVendor);
    if (stockFilter) params.set("stock", stockFilter);
    if (sortBy !== "name-asc") params.set("sort", sortBy);
    if (selectedPoE.length) params.set("poe", selectedPoE.join(","));
    if (selectedRack.length) params.set("rack", selectedRack.join(","));
    if (selectedWifi.length) params.set("wifi", selectedWifi.join(","));
    if (selectedPort.length) params.set("port", selectedPort.join(","));
    router.replace(`/catalogue?${params.toString()}`, { scroll: false });
  }, [
    searchQuery,
    selectedCategory,
    selectedVendor,
    stockFilter,
    sortBy,
    selectedPoE,
    selectedRack,
    selectedWifi,
    selectedPort,
    router,
  ]);

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  });

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.vendor.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory) {
      const catMap: Record<string, string> = {
        networking: "Networking",
        "servers-storage": "Servers & Storage",
        endpoints: "Endpoints & Mobility",
        cybersecurity: "Cybersecurity",
        software: "Software & Licensing",
        accessories: "Accessories & Peripherals",
      };
      result = result.filter((p) => p.category === catMap[selectedCategory]);
    }

    // Vendor
    if (selectedVendor) {
      result = result.filter((p) => p.vendor === selectedVendor);
    }

    // Stock
    if (stockFilter === "in-stock") {
      result = result.filter(
        (p) => p.stock === "in-stock" || p.stock === "low-stock"
      );
    } else if (stockFilter === "out-of-stock") {
      result = result.filter(
        (p) => p.stock === "out-of-stock" || p.stock === "digital"
      );
    }

    // PoE
    if (selectedPoE.length > 0) {
      result = result.filter((p) =>
        selectedPoE.some((v) => {
          if (v === "true") return p.techSpecs.poeSupport === true;
          return false;
        })
      );
    }

    // Rack mountable
    if (selectedRack.length > 0) {
      result = result.filter((p) =>
        selectedRack.some((v) => p.techSpecs.rackMountable === v)
      );
    }

    // Wi-Fi standard
    if (selectedWifi.length > 0) {
      result = result.filter((p) =>
        selectedWifi.some((v) => p.techSpecs.wifiStandard === v)
      );
    }

    // Port count
    if (selectedPort.length > 0) {
      result = result.filter((p) =>
        selectedPort.some((v) => p.techSpecs.portCount === parseInt(v, 10))
      );
    }

    // Sort
    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "availability":
        result.sort((a, b) => {
          const order = {
            "in-stock": 0,
            "low-stock": 1,
            digital: 2,
            "out-of-stock": 3,
          };
          return (order[a.stock] ?? 3) - (order[b.stock] ?? 3);
        });
        break;
      case "newest":
        result.reverse();
        break;
    }

    return result;
  }, [
    searchQuery,
    selectedCategory,
    selectedVendor,
    stockFilter,
    sortBy,
    selectedPoE,
    selectedRack,
    selectedWifi,
    selectedPort,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedVendor("");
    setStockFilter("");
    setSortBy("name-asc");
    setSelectedPoE([]);
    setSelectedRack([]);
    setSelectedWifi([]);
    setSelectedPort([]);
  };

  const toggleArrayFilter = (
    current: string[],
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
  };

  const activeFilterCount = [
    selectedCategory,
    selectedVendor,
    stockFilter,
    selectedPoE.length,
    selectedRack.length,
    selectedWifi.length,
    selectedPort.length,
  ].filter(Boolean).length;

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-surface border-b border-border py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} className="mb-3" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-navy">
                Product Catalogue
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {isLoading ? (
                  <Skeleton className="h-4 w-48" />
                ) : (
                  `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""} found`
                )}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden gap-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                aria-label="Sort products"
              >
                <option value="name-asc">Name A–Z</option>
                <option value="name-desc">Name Z–A</option>
                <option value="availability">Availability</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside
            className={`w-full lg:w-72 shrink-0 space-y-6 ${
              isFilterOpen ? "block" : "hidden lg:block"
            }`}
          >
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="SKU, name, keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    !selectedCategory
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => {
                  const Icon = categoryIcons[cat.id];
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vendor */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Vendor</label>
              <select
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                aria-label="Filter by vendor"
              >
                <option value="">All Vendors</option>
                {vendors.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Stock Status</label>
              <div className="space-y-1">
                {[
                  { value: "", label: "All Stock Levels" },
                  { value: "in-stock", label: "In Stock" },
                  { value: "low-stock", label: "Low Stock" },
                  { value: "out-of-stock", label: "Out of Stock / Digital" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setStockFilter(opt.value)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      stockFilter === opt.value
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Technical Specs */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-primary" />
                <label className="text-sm font-semibold text-foreground">
                  Technical Specs
                </label>
              </div>

              {/* PoE */}
              <div className="mb-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Power over Ethernet
                </p>
                <div className="space-y-1">
                  {POE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        toggleArrayFilter(selectedPoE, opt.value, setSelectedPoE)
                      }
                      className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedPoE.includes(opt.value)
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      <Zap className="h-3.5 w-3.5 shrink-0" />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rack Mountable */}
              <div className="mb-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Rack Mountable
                </p>
                <div className="space-y-1">
                  {RACK_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        toggleArrayFilter(selectedRack, opt.value, setSelectedRack)
                      }
                      className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedRack.includes(opt.value)
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      <HardDrive className="h-3.5 w-3.5 shrink-0" />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wi-Fi Standard */}
              <div className="mb-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Wi-Fi Standard
                </p>
                <div className="space-y-1">
                  {WIFI_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        toggleArrayFilter(selectedWifi, opt.value, setSelectedWifi)
                      }
                      className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedWifi.includes(opt.value)
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      <Wifi className="h-3.5 w-3.5 shrink-0" />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Port Count */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Port Count
                </p>
                <div className="space-y-1">
                  {PORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        toggleArrayFilter(selectedPort, opt.value, setSelectedPort)
                      }
                      className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedPort.includes(opt.value)
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      <NetworkPort className="h-3.5 w-3.5 shrink-0" />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear all */}
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="w-full gap-1 text-sm text-destructive"
              >
                <X className="h-4 w-4" />
                Clear All Filters
              </Button>
            )}
          </aside>

          {/* Product Grid */}
          <main className="flex-1 min-w-0">
            {isLoading ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="p-4">
                    <Skeleton className="h-40 w-full rounded-lg mb-4" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2 mb-1" />
                    <Skeleton className="h-3 w-2/3 mb-4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-9 flex-1" />
                      <Skeleton className="h-9 flex-1" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <EmptyState
                title="No products found"
                description="Try adjusting your filters or search terms."
                action={
                  activeFilterCount > 0 ? (
                    <Button variant="outline" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  ) : undefined
                }
              />
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.sku} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const stockVariant =
    product.stock === "in-stock"
      ? "success"
      : product.stock === "low-stock"
      ? "warning"
      : product.stock === "digital"
      ? "info"
      : "secondary";

  const stockLabel =
    product.stock === "in-stock"
      ? "In Stock"
      : product.stock === "low-stock"
      ? "Low Stock"
      : product.stock === "digital"
      ? "Digital — Instant"
      : "Out of Stock";

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="aspect-[4/3] bg-surface border-b border-border flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <div className="h-16 w-16 rounded-xl bg-primary/10 mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <span className="text-2xl font-bold text-primary">
              {product.vendor[0]}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{product.vendor}</p>
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          <Badge variant={stockVariant} size="sm">
            {stockLabel}
          </Badge>
          {/* Quick tech spec badges */}
          {product.techSpecs.poeSupport && (
            <Badge variant="secondary" size="sm" className="text-[10px]">
              PoE
            </Badge>
          )}
          {product.techSpecs.rackMountable && (
            <Badge variant="secondary" size="sm" className="text-[10px]">
              {product.techSpecs.rackMountable}
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" size="sm">
            {product.vendor}
          </Badge>
          <Badge variant="category" size="sm">
            {product.category}
          </Badge>
        </div>

        <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <p className="text-xs font-mono text-muted-foreground">
          {product.sku}
        </p>

        <ul className="space-y-0.5">
          {product.specs.map((spec) => (
            <li
              key={spec}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
              {spec}
            </li>
          ))}
        </ul>

        <div className="flex gap-2 pt-2">
          <Link
            href={`/product/${product.sku.toLowerCase()}`}
            className="flex-1"
          >
            <Button size="sm" variant="outline" className="w-full text-xs">
              View Details
            </Button>
          </Link>
          <Link href="/rfq" className="flex-1">
            <Button
              size="sm"
              className="w-full text-xs bg-primary hover:bg-primary/90"
            >
              Add to RFQ
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default function CataloguePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CatalogueContent />
    </Suspense>
  );
}
