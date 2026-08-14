import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Truck,
  Headphones,
  TrendingUp,
  Network,
  Server,
  Monitor,
  ShieldCheck,
  Package,
  Cable,
  Users,
  Building2,
  Award,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Button, Badge, SectionHeading, StatCard, Card } from "@/components/ui";
import { products } from "@/data/products";
import { testimonials } from "@/data/site";
import { promotions, resellerTiers, events, branches } from "@/data/site";

export const metadata = {
  title: "Home — ChannelFirst Technology",
  description:
    "Malaysia's trusted IT distributor. We supply networking, servers, endpoints, cybersecurity, and software to resellers, system integrators, and enterprises.",
};

const categories = [
  {
    icon: Network,
    label: "Networking",
    description: "Switches, routers, APs, and enterprise networking gear",
    href: "/catalogue?category=networking",
    count: "2,400+",
  },
  {
    icon: Server,
    label: "Servers & Storage",
    description: "Dell, HPE, Lenovo servers and enterprise storage solutions",
    href: "/catalogue?category=servers-storage",
    count: "850+",
  },
  {
    icon: Monitor,
    label: "Endpoints & Mobility",
    description: "Laptops, desktops, workstations, and mobile devices",
    href: "/catalogue?category=endpoints",
    count: "3,200+",
  },
  {
    icon: Shield,
    label: "Cybersecurity",
    description: "Firewalls, endpoint protection, and security software",
    href: "/catalogue?category=cybersecurity",
    count: "1,600+",
  },
  {
    icon: Package,
    label: "Software & Licensing",
    description: "Microsoft, Adobe, and enterprise software licenses",
    href: "/catalogue?category=software",
    count: "2,800+",
  },
  {
    icon: Cable,
    label: "Accessories & Peripherals",
    description: "Cables, docks, keyboards, and IT consumables",
    href: "/catalogue?category=accessories",
    count: "1,500+",
  },
];

const vendors = [
  "Cisco",
  "Dell Technologies",
  "HPE",
  "Lenovo",
  "Fortinet",
  "Aruba",
  "Microsoft",
  "Ubiquiti",
  "Logitech",
  "Epson",
  "Synology",
  "APC",
];

const bestSellers = products.slice(0, 12);

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative bg-gradient-to-br from-navy via-slate-900 to-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.04%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-slate-200 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-amber-400" />
                Malaysia IT Distribution & Reseller Partner
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Your trusted{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                  channel partner
                </span>{" "}
                for enterprise IT products.
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                As an authorised distributor for 40+ global technology brands,
                we supply networking, servers, endpoints, cybersecurity, and
                software to resellers, system integrators, and enterprises across
                Malaysia — with same-day dispatch on selected stock and
                nationwide logistics.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/reseller/register">
                  <Button size="lg" className="gap-2 bg-amber-500 hover:bg-amber-600 text-navy font-bold">
                    Become a Reseller
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/catalogue">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-white/30 text-white hover:bg-white/10"
                  >
                    Browse Catalogue
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 pt-2">
                {["40+ Authorised Brands", "3,500+ Resellers", "5 Regional Branches"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-400">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Live Stock Dashboard */}
            <div className="hidden lg:block">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-success" />
                    </span>
                    <span className="text-sm font-semibold text-white">
                      Live Stock Availability
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  {products.slice(0, 3).map((p) => (
                    <div
                      key={p.sku}
                      className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-md bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                          {p.vendor[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white line-clamp-1">
                            {p.name}
                          </p>
                          <p className="text-xs font-mono text-slate-400">
                            {p.sku}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            p.stock === "in-stock"
                              ? "success"
                              : p.stock === "low-stock"
                              ? "warning"
                              : "secondary"
                          }
                          size="sm"
                        >
                          {p.stock === "in-stock"
                            ? `${p.branchStock[0]?.stock || 0} in stock`
                            : p.stock}
                        </Badge>
                        <p className="text-xs text-slate-500 mt-1">
                          {p.branchStock[0]?.branch}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Link
                    href="/catalogue"
                    className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                  >
                    View all {products.length}+ products <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST STATS BAND ═══ */}
      <section className="bg-surface border-y border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "40+", label: "Authorised Brands", sublabel: "Global technology vendors" },
              { value: "3,500+", label: "Active Resellers", sublabel: "Nationwide partner network" },
              { value: "5", label: "Regional Branches", sublabel: "KL, Penang, JB, KK, Kuching" },
              { value: "Same-Day", label: "Dispatch on Selected Stock", sublabel: "KL HQ warehouse" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-navy">{stat.value}</p>
                <p className="text-sm font-medium text-foreground mt-1">{stat.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BRAND MARQUEE ═══ */}
      <section className="py-10 bg-background border-b border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">
            Authorised distributor for the world&apos;s leading technology brands
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex animate-marquee gap-12 items-center">
            {[...vendors, ...vendors].map((brand, i) => (
              <div
                key={`${brand}-${i}`}
                className="flex-shrink-0 px-6 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-default"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PRODUCT CATEGORIES ═══ */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Product Categories"
            title="Complete IT Solutions for Every Business"
            subtitle="From core infrastructure to end-user devices, we stock the products you need from the world&apos;s leading technology vendors."
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-md"
              >
                <div className="shrink-0 rounded-lg bg-primary/10 p-3 transition-transform group-hover:scale-110">
                  <cat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {cat.label}
                    </h3>
                    <span className="ml-2 text-xs font-mono text-muted-foreground shrink-0">
                      {cat.count} SKUs
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                  <p className="mt-3 text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Browse category <ArrowRight className="h-3 w-3" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BEST-SELLING PRODUCTS GRID ═══ */}
      <section className="py-16 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <SectionHeading
              eyebrow="Best-Selling Products"
              title="Popular Items Among Our Resellers"
              align="left"
            />
            <Link href="/catalogue">
              <Button variant="ghost" className="gap-1 text-sm">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROMOTIONS SECTION ═══ */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Current Promotions"
            title="Special Offers for Our Resellers"
            align="center"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {promotions.map((promo) => (
              <Card key={promo.id} className="group hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="warning" size="sm" className="flex items-center gap-1">
                      {promo.badge}
                    </Badge>
                    <Badge variant="category" size="sm">
                      {promo.tag}
                    </Badge>
                  </div>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {promo.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {promo.description}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground font-medium">
                    ⏱ {promo.validity}
                  </p>
                  <div className="mt-4">
                    <Link href="/rfq">
                      <Button size="sm" variant="outline" className="w-full gap-1 text-xs">
                        Request Promo Pricing
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RESELLER TIER SECTION ═══ */}
      <section className="py-16 bg-gradient-to-b from-surface to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Reseller Programme"
            title="Partner Levels Designed for Your Growth"
            subtitle="Each tier unlocks better pricing, dedicated support, and marketing resources to help your business grow."
            align="center"
          />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {resellerTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-6 ${
                  tier.highlight
                    ? "border-amber-400 bg-white shadow-lg scale-105"
                    : "border-border bg-card"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="warning" className="font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className="text-center mb-6">
                  <div
                    className={`inline-flex h-12 w-12 rounded-full bg-gradient-to-br ${tier.color} items-center justify-center text-white font-bold text-lg mb-3`}
                  >
                    {tier.name[0]}
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Minimum annual spend: {tier.minAnnualSpend}
                  </p>
                </div>
                <ul className="space-y-3">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link href="/reseller/register">
                    <Button
                      variant={tier.highlight ? "primary" : "outline"}
                      className="w-full"
                    >
                      Apply for {tier.name}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRAINING & EVENTS PREVIEW ═══ */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <SectionHeading
              eyebrow="Training & Events"
              title="Upskill Your Team"
              align="left"
            />
            <Link href="/training">
              <Button variant="ghost" className="gap-1 text-sm">
                View All Events <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {event.title}
                  </h3>
                  <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{event.date} · {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>
                        {event.available} / {event.seats} seats available
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                  <div className="mt-4">
                    <Button size="sm" variant="outline" className="w-full">
                      Register Interest
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BRANCH COVERAGE SECTION ═══ */}
      <section className="py-16 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Presence"
            title="Branch Coverage Across Malaysia"
            align="center"
          />
          <div className="grid lg:grid-cols-2 gap-10 mt-10">
            {/* Map Placeholder */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-3" />
                  <p className="text-base font-semibold text-foreground">
                    Malaysia Branch Map
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    5 branches covering Peninsular & East Malaysia
                  </p>
                </div>
                {/* Branch dots */}
                <div className="absolute inset-0">
                  {[
                    { top: "45%", left: "35%", label: "KL HQ" },
                    { top: "25%", left: "25%", label: "Penang" },
                    { top: "80%", left: "40%", label: "JB" },
                    { top: "35%", left: "80%", label: "KK" },
                    { top: "55%", left: "85%", label: "Kuching" },
                  ].map((dot) => (
                    <div
                      key={dot.label}
                      className="absolute flex flex-col items-center"
                      style={{ top: dot.top, left: dot.left }}
                    >
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                      </span>
                      <span className="mt-1 text-xs font-medium text-navy bg-white px-1.5 py-0.5 rounded shadow">
                        {dot.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Branch List */}
            <div className="space-y-4">
              {branches.map((branch) => (
                <div
                  key={branch.name}
                  className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="rounded-md bg-primary/10 p-2.5 shrink-0">
                    {branch.type === "hq" ? (
                      <Building2 className="h-5 w-5 text-primary" />
                    ) : (
                      <MapPin className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">
                        {branch.name}
                      </p>
                      {branch.type === "hq" && (
                        <Badge variant="default" size="sm">HQ</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {branch.address}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {branch.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {branch.email}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Partner Testimonials"
            title="Trusted by Malaysia&apos;s IT Resellers"
            align="center"
          />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {testimonials.map((t, i) => (
              <Card key={i} className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-foreground leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA BAND ═══ */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to grow with ChannelFirst?
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Join over 3,500 resellers and system integrators who trust us for
            competitive pricing, reliable stock, and dedicated support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/reseller/register">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-navy font-bold gap-2"
              >
                Apply for Reseller Account
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/catalogue">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white/30 text-white hover:bg-white/10"
              >
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
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
    <div className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-200">
      {/* Product image placeholder */}
      <div className="aspect-[4/3] bg-surface border-b border-border flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <div className="h-16 w-16 rounded-xl bg-primary/10 mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <span className="text-2xl font-bold text-primary">
              {product.vendor[0]}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{product.vendor}</p>
        </div>
        {/* Stock badge */}
        <div className="absolute top-3 right-3">
          <Badge
            variant={stockVariant}
            size="sm"
          >
            {stockLabel}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Vendor + category badges */}
        <div className="flex items-center gap-2">
          <Badge variant="secondary" size="sm">
            {product.vendor}
          </Badge>
          <Badge variant="category" size="sm">
            {product.category}
          </Badge>
        </div>

        {/* Product name */}
        <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* SKU */}
        <p className="text-xs font-mono text-muted-foreground">{product.sku}</p>

        {/* Key specs */}
        <ul className="space-y-1">
          {product.specs.map((spec) => (
            <li
              key={spec}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <ChevronRight className="h-3 w-3 text-primary shrink-0" />
              {spec}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Link
            href={`/product/${product.sku.toLowerCase()}`}
            className="flex-1"
          >
            <Button size="sm" variant="outline" className="w-full text-xs gap-1">
              View Details
            </Button>
          </Link>
          <Link href="/rfq" className="flex-1">
            <Button size="sm" className="w-full text-xs gap-1 bg-primary hover:bg-primary/90">
              Add to RFQ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
