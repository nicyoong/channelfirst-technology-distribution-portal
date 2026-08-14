"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  ChevronDown,
  Network,
  Server,
  Monitor,
  Shield,
  Package,
  Cable,
  CheckCircle2,
  X,
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

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  });

  const filteredProducts = useMemo(() => {
    let result = [...products];

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

    if (selectedVendor) {
      result = result.filter((p) => p.vendor === selectedVendor);
    }

    if (stockFilter === "in-stock") {
      result = result.filter(
        (p) => p.stock === "in-stock" || p.stock === "low-stock"
      );
    } else if (stockFilter === "out-of-stock") {
      result = result.filter(
        (p) => p.stock === "out-of-stock" || p.stock === "digital"
      );
    }

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
  }, [searchQuery, selectedCategory, selectedVendor, stockFilter, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedVendor("");
    setStockFilter("");
    setSortBy("name-asc");
  };

  const hasActiveFilters =
    selectedCategory || selectedVendor || stockFilter || searchQuery;

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
                  `${filteredProducts.length} products found`
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
                {(selectedCategory || selectedVendor || stockFilter) && (
                  <span className="h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center">
                    {[selectedCategory, selectedVendor, stockFilter].filter(Boolean).length}
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
            className={`w-full lg:w-64 shrink-0 space-y-6 ${
              isFilterOpen ? "block" : "hidden lg:block"
            }`}
          >
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Stock Status
              </label>
              <div className="space-y-1">
                {[
                  { value: "in-stock", label: "In Stock" },
                  { value: "low-stock", label: "Low Stock" },
                  { value: "out-of-stock", label: "Out of Stock" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() =>
                      setStockFilter(
                        stockFilter === opt.value ? "" : opt.value
                      )
                    }
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

            {hasActiveFilters && (
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
                  hasActiveFilters ? (
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
        <div className="absolute top-3 right-3">
          <Badge variant={stockVariant} size="sm">
            {stockLabel}
          </Badge>
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
