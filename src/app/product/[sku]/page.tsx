import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products } from "@/data/products";
import type { Product } from "@/data/products";

interface PageProps {
  params: Promise<{ sku: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ sku: p.sku.toLowerCase() }));
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

export default async function ProductPage({ params }: PageProps) {
  const { sku } = await params;
  const product = products.find(
    (p) => p.sku.toLowerCase() === sku.toLowerCase()
  );

  if (!product) notFound();

  // Import client component dynamically to avoid SSR issues with hooks
  const ProductDetail = (await import("./product-detail")).default;

  return <ProductDetail product={product} />;
}
