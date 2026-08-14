"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Search,
  User,
  FileText,
  Network,
  Server,
  Monitor,
  Shield,
  Package,
  Cable,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const productCategories = [
  {
    id: "networking",
    label: "Networking",
    icon: Network,
    description: "Switches, routers, access points, and network infrastructure",
    href: "/products/networking",
  },
  {
    id: "servers-storage",
    label: "Servers & Storage",
    icon: Server,
    description: "Enterprise servers, NAS, SAN, and storage solutions",
    href: "/products/servers-storage",
  },
  {
    id: "endpoints",
    label: "Endpoints & Mobility",
    icon: Monitor,
    description: "Laptops, desktops, workstations, and mobile devices",
    href: "/products/endpoints",
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    icon: Shield,
    description: "Firewalls, endpoint protection, and security software",
    href: "/products/cybersecurity",
  },
  {
    id: "software",
    label: "Software & Licensing",
    icon: Package,
    description: "Microsoft, Adobe, and enterprise software licenses",
    href: "/products/software",
  },
  {
    id: "accessories",
    label: "Accessories & Peripherals",
    icon: Cable,
    description: "Cables, docking stations, peripherals, and consumables",
    href: "/products/accessories",
  },
];

const mainNavLinks = [
  { label: "Brands", href: "/brands" },
  { label: "Solutions", href: "/solutions" },
  { label: "Promotions", href: "/promotions", highlight: true },
  { label: "Training & Events", href: "/training" },
  { label: "Support", href: "/support" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface NavBarProps {
  cartCount?: number;
  onSearch?: (query: string) => void;
}

export function NavBar({ cartCount = 0, onSearch }: NavBarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [productsOpen, setProductsOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const productsTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleProductsEnter = () => {
    if (productsTimeout.current) clearTimeout(productsTimeout.current);
    setProductsOpen(true);
  };

  const handleProductsLeave = () => {
    productsTimeout.current = setTimeout(() => setProductsOpen(false), 150);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (onSearch) onSearch(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim());
      setSearchOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-white">C</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-base font-bold text-navy leading-none">
                  ChannelFirst
                </span>
                <span className="text-xs text-muted-foreground leading-none mt-0.5">
                  Technology
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {/* Products Mega Menu */}
              <div
                className="relative"
                onMouseEnter={handleProductsEnter}
                onMouseLeave={handleProductsLeave}
              >
                <Link
                  href="/products"
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground rounded-md transition-colors hover:bg-accent hover:text-foreground",
                    pathname?.startsWith("/products") &&
                      "bg-accent text-foreground"
                  )}
                >
                  Products
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      productsOpen && "rotate-180"
                    )}
                  />
                </Link>

                {productsOpen && (
                  <div className="absolute left-0 top-full w-[640px] bg-background border border-border rounded-lg shadow-lg mt-1 p-5 z-50">
                    <div className="grid grid-cols-2 gap-4">
                      {productCategories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={cat.href}
                          className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
                        >
                          <div className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
                            <cat.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {cat.label}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                              {cat.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <Link
                        href="/products"
                        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        View all products →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-foreground",
                    pathname === link.href && "bg-accent text-foreground",
                    link.highlight && !pathname?.startsWith(link.href) && "text-amber-600"
                  )}
                >
                  {link.label}
                  {link.highlight && (
                    <span className="ml-1.5 inline-flex items-center rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
                      NEW
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="hidden md:flex items-center relative">
                <div
                  className={cn(
                    "flex items-center rounded-md border border-input bg-background px-3 py-1.5 transition-all duration-200",
                    searchOpen
                      ? "w-64 border-primary ring-2 ring-primary/20"
                      : "w-48 hover:border-primary/50"
                  )}
                >
                  <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    onFocus={() => setSearchOpen(true)}
                    onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(e)}
                  />
                </div>
              </div>

              {/* Reseller Login */}
              <Link href="/reseller/login">
                <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                  <User className="h-4 w-4" />
                  Reseller Login
                </Button>
              </Link>

              {/* RFQ Cart */}
              <button
                className="relative flex h-10 w-10 items-center justify-center rounded-md border border-input text-foreground transition-colors hover:bg-accent"
                aria-label={`RFQ cart with ${cartCount} items`}
              >
                <FileText className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                className="flex h-10 w-10 items-center justify-center rounded-md border border-input text-foreground lg:hidden transition-colors hover:bg-accent"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-[300px] bg-background shadow-xl">
            <div className="flex items-center justify-between px-4 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-sm font-bold text-white">C</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-navy">ChannelFirst</p>
                  <p className="text-xs text-muted-foreground leading-none mt-0.5">
                    Technology
                  </p>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-2 transition-colors hover:bg-accent"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-4 space-y-1">
              {/* Mobile search */}
              <form onSubmit={handleSearchSubmit} className="mb-4">
                <div className="flex items-center rounded-md border border-input px-3 py-2">
                  <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </form>

              {/* Mobile Product Categories */}
              <div className="mb-2">
                <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Products
                </p>
                {productCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-md px-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    <cat.icon className="h-4 w-4 text-primary" />
                    {cat.label}
                  </Link>
                ))}
                <Link
                  href="/products"
                  onClick={() => setMobileOpen(false)}
                  className="block px-2 py-2 text-sm text-primary hover:underline"
                >
                  View all products →
                </Link>
              </div>

              <div className="my-2 border-t border-border" />

              {/* Mobile Nav Links */}
              <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Company
              </p>
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-2.5 text-sm font-medium transition-colors hover:bg-accent",
                    pathname === link.href && "bg-accent text-foreground",
                    link.highlight && !pathname?.startsWith(link.href) && "text-amber-600"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile bottom actions */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background p-4 space-y-2">
              <Link href="/reseller/login" onClick={() => setMobileOpen(false)}>
                <Button className="w-full gap-2" variant="outline">
                  <User className="h-4 w-4" />
                  Reseller Login
                </Button>
              </Link>
              <Link href="/rfq" onClick={() => setMobileOpen(false)}>
                <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                  <FileText className="h-4 w-4" />
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
