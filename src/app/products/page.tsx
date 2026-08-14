import Link from "next/link";
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
  Send,
  Phone,
} from "lucide-react";
import {
  Badge,
  Card,
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Button,
  SectionHeading,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — ChannelFirst Technology",
  description:
    "Browse our complete range of IT products including networking equipment, servers, endpoints, cybersecurity solutions, software licensing, and accessories.",
};

const categories = [
  {
    id: "networking",
    label: "Networking",
    icon: Network,
    description: "Switches, routers, access points, cabling, and network infrastructure",
    count: 2400,
    href: "/products/networking",
  },
  {
    id: "servers-storage",
    label: "Servers & Storage",
    icon: Server,
    description: "Dell, HPE, Lenovo servers, NAS, SAN, and data centre solutions",
    count: 850,
    href: "/products/servers-storage",
  },
  {
    id: "endpoints",
    label: "Endpoints & Mobility",
    icon: Monitor,
    description: "Laptops, desktops, workstations, monitors, and mobile devices",
    count: 3200,
    href: "/products/endpoints",
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    icon: Shield,
    description: "Firewalls, endpoint protection, UTM appliances, and security software",
    count: 1600,
    href: "/products/cybersecurity",
  },
  {
    id: "software",
    label: "Software & Licensing",
    icon: Package,
    description: "Microsoft, Adobe, and enterprise software licence programmes",
    count: 2800,
    href: "/products/software",
  },
  {
    id: "accessories",
    label: "Accessories & Peripherals",
    icon: Cable,
    description: "Cables, docking stations, keyboards, mice, and consumables",
    count: 1500,
    href: "/products/accessories",
  },
];

const featuredProducts = [
  {
    name: "Dell PowerEdge R750 Server",
    category: "Servers & Storage",
    brand: "Dell Technologies",
    price: "From RM 8,500",
    stock: "In Stock",
    stockStatus: "in-stock" as const,
    sku: "DL-PE-R750",
  },
  {
    name: "Cisco Catalyst 9200L-48P",
    category: "Networking",
    brand: "Cisco",
    price: "From RM 4,200",
    stock: "In Stock",
    stockStatus: "in-stock" as const,
    sku: "CS-C9200L-48P",
  },
  {
    name: "Lenovo ThinkCentre M90q Gen 5",
    category: "Endpoints",
    brand: "Lenovo",
    price: "From RM 2,100",
    stock: "In Stock",
    stockStatus: "in-stock" as const,
    sku: "LN-TC-M90Q-G5",
  },
  {
    name: "FortiGate 60F Next-Gen Firewall",
    category: "Cybersecurity",
    brand: "Fortinet",
    price: "From RM 3,800",
    stock: "In Stock",
    stockStatus: "in-stock" as const,
    sku: "FN-FG-60F",
  },
  {
    name: "Microsoft 365 Business Premium",
    category: "Software",
    brand: "Microsoft",
    price: "From RM 149/user/year",
    stock: "Digital — Instant",
    stockStatus: "digital" as const,
    sku: "MS-M365-BP",
  },
  {
    name: "HP EliteDisplay E24i Monitor",
    category: "Accessories",
    brand: "HP Inc.",
    price: "From RM 1,250",
    stock: "Low Stock",
    stockStatus: "low-stock" as const,
    sku: "HP-ED-E24I",
  },
];

const breadcrumbs: BreadcrumbItem[] = [
  { label: "Products", href: "/products" },
];

export default function ProductsPage() {
  return (
    <div className="bg-background">
      {/* Header */}
      <section className="bg-surface border-b border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} className="mb-4" />
          <h1 className="text-3xl font-bold text-navy mb-2">Products</h1>
          <p className="text-muted-foreground">
            Browse our complete range of IT products from the world's leading
            technology vendors.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products by name, SKU, or keyword..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-3">
            <Select>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                Category
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <ChevronDown className="mr-2 h-4 w-4" />
                Sort By
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A–Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z–A)</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="flex flex-wrap gap-1 bg-transparent p-0 h-auto">
            <TabsTrigger value="all" className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-white">
              All Products
            </TabsTrigger>
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                {cat.label}
                <span className="ml-1.5 text-xs opacity-60">{cat.count}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Category Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group block"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-200 border-primary/20">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="rounded-lg bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                      <cat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {cat.count.toLocaleString()} items
                    </Badge>
                  </div>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cat.label}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Browse category
                    <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Featured Products */}
        <SectionHeading
          eyebrow="Featured Products"
          title="Popular Items Among Our Resellers"
          align="left"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <Card
              key={product.sku}
              className="group hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[4/3] rounded-t-xl bg-surface border-b border-border flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="h-20 w-20 rounded-lg bg-primary/10 mx-auto mb-2 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {product.brand[0]}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Product Image</p>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="category" size="sm">
                    {product.category}
                  </Badge>
                  <Badge variant="secondary" size="sm">
                    {product.brand}
                  </Badge>
                </div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  SKU: {product.sku}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-base font-bold text-foreground">
                    {product.price}
                  </span>
                  <Badge
                    variant={
                      product.stockStatus === "in-stock"
                        ? "success"
                        : product.stockStatus === "low-stock"
                        ? "warning"
                        : "info"
                    }
                    size="sm"
                  >
                    {product.stock}
                  </Badge>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link href={`/rfq?sku=${product.sku}`} className="flex-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full gap-1 text-xs"
                    >
                      Add to RFQ
                    </Button>
                  </Link>
                  <Link href={`/products/${product.sku.toLowerCase()}`} className="flex-1">
                    <Button size="sm" className="w-full gap-1 text-xs">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bulk / Custom Order CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-navy to-slate-800 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Need a Custom Quote or Bulk Order?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-6">
            For large-volume orders, custom configurations, or specialised
            requirements, our sales team is ready to provide a tailored
            quotation. Get competitive pricing designed for your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/rfq">
              <Button size="lg" className="gap-2 bg-amber-500 hover:bg-amber-600 text-navy font-bold">
                Submit RFQ
                <Send className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white/30 text-white hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                Call Our Sales Team
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
