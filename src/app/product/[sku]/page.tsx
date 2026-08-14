import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  Package,
  Truck,
  ShieldCheck,
  Download,
  FileText,
  Star,
  CheckCircle2,
  Building2,
  AlertCircle,
} from "lucide-react";
import { Button, Badge, Card, SectionHeading, Skeleton } from "@/components/ui";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui";
import { products } from "@/data/products";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ sku: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { sku } = await params;
  const product = products.find(
    (p) => p.sku.toLowerCase() === sku.toLowerCase()
  );
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — ChannelFirst Technology`,
    description: product.shortDesc,
  };
}

export async function generateStaticParams() {
  return products.map((p) => ({ sku: p.sku.toLowerCase() }));
}

export default async function ProductPage({ params }: PageProps) {
  const { sku } = await params;
  const product = products.find(
    (p) => p.sku.toLowerCase() === sku.toLowerCase()
  );

  if (!product) notFound();

  const relatedProducts = products.filter(
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
              <div className="flex items-center gap-2 mb-2">
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

            {/* Price CTA */}
            <div className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-muted-foreground">Reseller Pricing</p>
                  <p className="text-xl font-bold text-foreground">
                    {product.priceNote}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href="/reseller/login">
                    <Button size="sm" variant="outline">
                      Login for Price
                    </Button>
                  </Link>
                  <Link href="/rfq">
                    <Button size="sm" className="gap-1 bg-primary hover:bg-primary/90">
                      <FileText className="h-3 w-3" />
                      Request Quote
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Package className="h-3 w-3" />
                  Add to RFQ
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Download className="h-3 w-3" />
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
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-navy mb-4">
              Full Specifications
            </h2>
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
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <SectionHeading
              eyebrow="Related Products"
              title="You May Also Like"
              align="left"
            />
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
