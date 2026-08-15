"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  Truck,
  ShieldCheck,
  Download,
  FileText,
  CheckCircle2,
  Building2,
  AlertCircle,
  Plus,
  Minus,
} from "lucide-react";
import { Button, Badge, Card } from "@/components/ui";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui";
import type { Product } from "@/data/products";
import { products } from "@/data/products";
import {
  getUnitPrice,
  getTierLabel,
  getNextTier,
  formatMYR,
} from "@/lib/pricing";
import { useRFQCart } from "@/hooks/use-rfq-cart";
import { useToast } from "@/contexts/toast-context";

export default function ProductDetail({ product }: { product: Product }) {
  const { toast } = useToast();
  const { addToCart } = useRFQCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "stock">("specs");

  const relatedProducts: Product[] = products.filter(
    (p) =>
      p.sku !== product.sku &&
      (p.category === product.category || p.vendor === product.vendor)
  ).slice(0, 4);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Catalogue", href: "/catalogue" },
    { label: product.category, href: `/catalogue?category=${product.category.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}` },
    { label: product.name },
  ];

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
      ? "Digital — Instant Delivery"
      : "Out of Stock";

  const tiers = product.tieredPrice?.tiers ?? [];
  const currentUnitPrice = tiers.length > 0 ? getUnitPrice(tiers, quantity) : 0;
  const lineTotal = currentUnitPrice * quantity;
  const nextTier = tiers.length > 0 ? getNextTier(tiers, quantity) : null;

  const handleAddToRFQ = () => {
    addToCart(product);
    toast({
      type: "success",
      title: "Added to RFQ",
      description: `${product.name} (${product.sku}) added to your quote request.`,
    });
  };

  return (
    <div className="bg-background">
      {/* Breadcrumbs */}
      <div className="bg-surface border-b border-border py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-xl border border-border bg-surface flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <div className="h-24 w-24 rounded-2xl bg-primary/10 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">
                    {product.vendor[0]}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground">
                  {product.vendor}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Product Image
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg border border-border bg-surface flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
                >
                  <span className="text-xs text-muted-foreground">
                    {i === 0 ? "Front" : i === 1 ? "Side" : i === 2 ? "Back" : "Detail"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="category">{product.category}</Badge>
                <Badge variant="secondary">{product.vendor}</Badge>
                <Badge variant={stockVariant}>{stockLabel}</Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-navy">
                {product.name}
              </h1>
              <p className="mt-2 text-sm font-mono text-muted-foreground">
                SKU: {product.sku}
              </p>
            </div>

            <p className="text-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Key specs */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Key Specifications
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {product.specs.map((spec) => (
                  <div
                    key={spec}
                    className="rounded-lg border border-border bg-surface px-3 py-2 text-center"
                  >
                    <p className="text-xs font-medium text-foreground">
                      {spec}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tiered Pricing + Add to RFQ */}
            <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
              {product.tieredPrice ? (
                <>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-bold text-navy">
                        {formatMYR(currentUnitPrice)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /unit
                      </span>
                    </div>
                    {currentUnitPrice < product.tieredPrice.listPrice && (
                      <p className="text-sm text-success font-medium">
                        You&apos;re saving{" "}
                        {formatMYR(
                          product.tieredPrice.listPrice - currentUnitPrice
                        )}{" "}
                        per unit ({Math.round(
                          ((product.tieredPrice.listPrice - currentUnitPrice) /
                            product.tieredPrice.listPrice) *
                            100
                        )}% off list)
                      </p>
                    )}
                    {nextTier && (
                      <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                        <p className="text-xs text-amber-800">
                          <span className="font-semibold">Tier incentive:</span>{" "}
                          Add {nextTier.minQty - quantity} more unit
                          {nextTier.minQty - quantity > 1 ? "s" : ""} to unlock{" "}
                          {nextTier.discountPercent}% off (
                          {formatMYR(nextTier.unitPrice)}/unit)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Tier table */}
                  <div className="space-y-1.5">
                    {tiers.map((tier) => {
                      const isActive =
                        quantity >= tier.minQty &&
                        (tier.maxQty === null || quantity <= tier.maxQty);
                      return (
                        <div
                          key={tier.minQty}
                          className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${
                            isActive
                              ? "bg-primary/10 border border-primary/30"
                              : "bg-background border border-border"
                          }`}
                        >
                          <span className="text-foreground font-medium">
                            {getTierLabel(tier)}
                          </span>
                          <div className="flex items-center gap-3">
                            {tier.discountPercent > 0 && (
                              <span className="text-xs text-success font-medium">
                                {tier.discountPercent}% off
                              </span>
                            )}
                            <span
                              className={`font-semibold ${
                                isActive ? "text-primary" : "text-foreground"
                              }`}
                            >
                              {formatMYR(tier.unitPrice)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quantity stepper */}
                  <div className="flex items-center gap-4 pt-2">
                    <span className="text-sm font-medium text-foreground">
                      Quantity:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="h-9 w-9 rounded-md border border-border flex items-center justify-center hover:bg-accent transition-colors"
                        aria-label="Decrease quantity"
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center text-sm font-semibold text-foreground">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="h-9 w-9 rounded-md border border-border flex items-center justify-center hover:bg-accent transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      = {formatMYR(lineTotal)} total
                    </span>
                  </div>
                </>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground">
                    {product.priceNote}
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleAddToRFQ}
                  className="flex-1 gap-1 bg-primary hover:bg-primary/90"
                  disabled={product.stock === "out-of-stock"}
                >
                  <Package className="h-4 w-4" />
                  Add to RFQ
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Datasheet
                </Button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: "Fast Dispatch", sub: "Same-day on selected stock" },
                { icon: ShieldCheck, label: "Full Warranty", sub: product.warranty },
                { icon: CheckCircle2, label: "Authentic Product", sub: "100% genuine" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="text-center p-3 rounded-lg border border-border"
                >
                  <item.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-xs font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Specifications & Stock by Branch */}
        <div className="mt-12 space-y-4">
          <div className="flex gap-1 border-b border-border">
            {(["specs", "stock"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "specs" ? "Full Specifications" : "Stock by Branch"}
              </button>
            ))}
          </div>

          {activeTab === "specs" && (
            <Card className="p-6">
              <div className="space-y-2">
                {product.fullSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-start gap-3 py-2 border-b border-border last:border-0"
                  >
                    <span className="text-sm font-medium text-muted-foreground w-40 shrink-0">
                      {spec.label}
                    </span>
                    <span className="text-sm text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "stock" && (
            <Card className="p-6">
              <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Stock by Branch
              </h2>
              {product.branchStock.length > 0 ? (
                <div className="space-y-2">
                  {product.branchStock.map((bs) => (
                    <div
                      key={bs.branch}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <span className="text-sm text-foreground">{bs.branch}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-surface overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              bs.stock > 10
                                ? "bg-success"
                                : bs.stock > 0
                                ? "bg-amber-500"
                                : "bg-destructive/50"
                            }`}
                            style={{ width: `${Math.min(bs.stock * 3, 100)}%` }}
                          />
                        </div>
                        <span
                          className={`text-sm font-mono ${
                            bs.stock > 10
                              ? "text-success"
                              : bs.stock > 0
                              ? "text-amber-600"
                              : "text-destructive"
                          }`}
                        >
                          {bs.stock}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Digital product — instant delivery upon purchase.
                </p>
              )}
              {product.branchStock.some((bs) => bs.stock === 0) && (
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <AlertCircle className="h-3 w-3" />
                  Some branches may be out of stock. Contact your local branch for
                  availability.
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-navy mb-6">
              You May Also Like
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <Link
                  key={p.sku}
                  href={`/product/${p.sku.toLowerCase()}`}
                  className="group"
                >
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <div className="aspect-[4/3] bg-surface border-b border-border flex items-center justify-center">
                      <div className="text-center">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-xl font-bold text-primary">
                            {p.vendor[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-mono text-muted-foreground mb-1">
                        {p.sku}
                      </p>
                      <p className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {p.name}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Warranty & Support Note */}
        <div className="mt-8 rounded-xl border border-border bg-surface p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Warranty & Support
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                This product comes with{" "}
                <span className="font-medium text-foreground">
                  {product.warranty}
                </span>
                . ChannelFirst Technology provides full RMA support and warranty
                claim processing. Contact your account manager or our support
                team for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
