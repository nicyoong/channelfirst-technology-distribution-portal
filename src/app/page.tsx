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
} from "lucide-react";
import { Button, Badge, SectionHeading, StatCard, Card } from "@/components/ui";
import { generateProductJsonLd } from "@/components/seo/metadata";

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
    href: "/products/networking",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: Server,
    label: "Servers & Storage",
    description: "Dell, HPE, Lenovo servers and enterprise storage solutions",
    href: "/products/servers-storage",
    color: "bg-purple-100 text-purple-700",
  },
  {
    icon: Monitor,
    label: "Endpoints & Mobility",
    description: "Laptops, desktops, workstations, and thin clients",
    href: "/products/endpoints",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: Shield,
    label: "Cybersecurity",
    description: "Firewalls, endpoint protection, and security software",
    href: "/products/cybersecurity",
    color: "bg-red-100 text-red-700",
  },
  {
    icon: Package,
    label: "Software & Licensing",
    description: "Microsoft, Adobe, and enterprise software licenses",
    href: "/products/software",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: Cable,
    label: "Accessories & Peripherals",
    description: "Cables, docks, keyboards, and IT consumables",
    href: "/products/accessories",
    color: "bg-slate-100 text-slate-700",
  },
];

const stats = [
  {
    value: "18+",
    label: "Years in Business",
    description: "Serving Malaysia's IT industry since 2005",
    icon: Award,
  },
  {
    value: "500+",
    label: "Reseller Partners",
    description: "Across Peninsular Malaysia and East Malaysia",
    icon: Users,
  },
  {
    value: "12,000+",
    label: "Products Available",
    description: "From top global technology vendors",
    icon: Package,
  },
  {
    value: "98.5%",
    label: "On-Time Delivery",
    description: "Trusted logistics across the nation",
    icon: Truck,
  },
];

const featuredBrands = [
  "Dell Technologies",
  "HP Inc.",
  "Lenovo",
  "Cisco",
  "Juniper Networks",
  "Microsoft",
  "Fortinet",
  "Sophos",
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy via-slate-900 to-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-slate-200 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-amber-400" />
                Malaysia's Trusted IT Distribution Partner
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Powering Malaysia's{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                  Digital Future
                </span>
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                We supply cutting-edge technology solutions to resellers, system
                integrators, and enterprises across Malaysia. From networking
                infrastructure to cybersecurity, we deliver the products your
                business needs to thrive.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="gap-2">
                    Browse Products
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/reseller/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-white/30 text-white hover:bg-white/10"
                  >
                    Become a Reseller
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  <span>Authorized Distributor</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Nationwide Delivery</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-amber-500/20 rounded-3xl blur-3xl" />
              <div className="relative grid grid-cols-2 gap-4">
                {[
                  { icon: Network, label: "Networking", count: "2,400+ SKUs" },
                  { icon: Server, label: "Servers", count: "850+ SKUs" },
                  { icon: Monitor, label: "Endpoints", count: "3,200+ SKUs" },
                  { icon: Shield, label: "Security", count: "1,600+ SKUs" },
                ].map((item, i) => (
                  <Card
                    key={item.label}
                    className="bg-white/10 backdrop-blur-md border-white/20 text-white p-5"
                  >
                    <item.icon className="h-8 w-8 text-amber-400 mb-3" />
                    <p className="text-sm font-medium text-slate-300">
                      {item.label}
                    </p>
                    <p className="text-2xl font-bold mt-1">{item.count}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Product Categories"
            title="Complete IT Solutions for Every Business"
            subtitle="From core infrastructure to end-user devices, we stock the products you need from the world's leading technology vendors."
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-md"
              >
                <div
                  className={`shrink-0 rounded-lg ${cat.color} p-3 transition-transform group-hover:scale-110`}
                >
                  <cat.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cat.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                  <p className="mt-3 text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore now <ArrowRight className="h-3 w-3" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why ChannelFirst"
            title="Trusted by Hundreds of Technology Partners"
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                description={stat.description}
                icon={
                  <stat.icon className="h-5 w-5" />
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Partners"
            title="Authorized Distributor for World-Class Brands"
            subtitle="We maintain strong partnerships with leading global technology vendors to bring you the best products at competitive prices."
            align="center"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredBrands.map((brand) => (
              <div
                key={brand}
                className="flex items-center justify-center rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <span className="text-sm font-semibold text-muted-foreground text-center">
                  {brand}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/brands">
              <Button variant="outline" className="gap-2">
                View All Brands
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reseller CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Join Our Reseller Network
              </h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                As an authorised reseller, you gain access to competitive
                pricing, dedicated account management, technical support, and
                marketing co-op funds. Whether you're a small integrator or a
                large systems house, we have a programme tailored for you.
              </p>
              <div className="space-y-3">
                {[
                  "Exclusive reseller pricing and tiered discounts",
                  "Dedicated account manager and technical support",
                  "Marketing development funds (MDF) and co-op campaigns",
                  "Fast track shipping and priority inventory allocation",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-blue-50">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <div className="flex items-center gap-4 p-6">
                  <div className="rounded-lg bg-amber-400/20 p-3">
                    <Users className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">500+</p>
                    <p className="text-blue-200 text-sm">
                      Active Reseller Partners
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <div className="flex items-center gap-4 p-6">
                  <div className="rounded-lg bg-amber-400/20 p-3">
                    <TrendingUp className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">RM 50M+</p>
                    <p className="text-blue-200 text-sm">
                      Annual Revenue Generated
                    </p>
                  </div>
                </div>
              </Card>
              <Link href="/reseller/register">
                <Button
                  size="lg"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-navy font-bold gap-2"
                >
                  Register as a Reseller
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Services"
            title="More Than Just Distribution"
            subtitle="We provide comprehensive services to support your business growth and technical success."
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Truck,
                title: "Nationwide Logistics",
                description:
                  "Fast and reliable delivery across Peninsular Malaysia, Sabah, and Sarawak with real-time tracking.",
              },
              {
                icon: Headphones,
                title: "Technical Support",
                description:
                  "Pre-sales and post-sales technical support from our certified engineers to help you succeed.",
              },
              {
                icon: Building2,
                title: "Enterprise Solutions",
                description:
                  "Customised solutions for large-scale deployments including data centres, campuses, and government projects.",
              },
              {
                icon: Award,
                title: "Training & Certification",
                description:
                  "Regular product training sessions and certification programmes for your technical team.",
              },
              {
                icon: Users,
                title: "Dedicated Account Management",
                description:
                  "Each reseller gets a dedicated account manager for personalised pricing and support.",
              },
              {
                icon: ShieldCheck,
                title: "Warranty & RMA Support",
                description:
                  "Streamlined warranty claims and RMA processing to minimise downtime for your customers.",
              },
            ].map((service) => (
              <Card key={service.title} className="p-6 hover:shadow-md transition-shadow">
                <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Promotions Teaser */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <SectionHeading
              eyebrow="Current Promotions"
              title="Special Offers for Our Resellers"
              align="left"
            />
            <Link href="/promotions">
              <Button variant="ghost" className="gap-1 text-sm">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                badge: "Limited Time",
                title: "Dell Vostro Workstations — Reseller Special",
                description:
                  "Bulk purchase discount on Dell Vostro 3000 and 5000 series. Available until 30 September 2025.",
                tag: "Promotion",
              },
              {
                badge: "New Arrival",
                title: "FortiGate 60F Next-Gen Firewall Bundle",
                description:
                  "Free Secure Token and 1-year Advanced Threat Protection when purchased with FortiGuard subscription.",
                tag: "Bundle",
              },
              {
                badge: "Hot Deal",
                title: "Lenovo ThinkCentre M90q Gen 5 — Volume Pricing",
                description:
                  "Special volume pricing for 10+ units. Perfect for SME office deployments and educational institutions.",
                tag: "Volume Deal",
              },
            ].map((promo) => (
              <Card
                key={promo.title}
                className="group cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      variant="warning"
                      size="sm"
                      className="flex items-center gap-1"
                    >
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
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
