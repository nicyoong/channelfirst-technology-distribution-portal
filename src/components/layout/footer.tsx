import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook as FacebookIcon,
  Linkedin as LinkedinIcon,
  Twitter as TwitterIcon,
} from "lucide-react";
import { Button } from "@/components/ui";

const footerLinks = {
  products: [
    { label: "Networking", href: "/products/networking" },
    { label: "Servers & Storage", href: "/products/servers-storage" },
    { label: "Endpoints & Mobility", href: "/products/endpoints" },
    { label: "Cybersecurity", href: "/products/cybersecurity" },
    { label: "Software & Licensing", href: "/products/software" },
    { label: "Accessories & Peripherals", href: "/products/accessories" },
  ],
  company: [
    { label: "About ChannelFirst", href: "/about" },
    { label: "Our Brands", href: "/brands" },
    { label: "Solutions", href: "/solutions" },
    { label: "Training & Events", href: "/training" },
    { label: "Careers", href: "/careers" },
    { label: "News & Insights", href: "/news" },
  ],
  support: [
    { label: "Support Centre", href: "/support" },
    { label: "Track Order", href: "/track-order" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Returns & Warranty", href: "/returns" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact Us", href: "/contact" },
  ],
  reseller: [
    { label: "Reseller Portal", href: "/reseller" },
    { label: "Reseller Login", href: "/reseller/login" },
    { label: "Register as Reseller", href: "/reseller/register" },
    { label: "Pricing & Terms", href: "/reseller/pricing" },
    { label: "Marketing Materials", href: "/reseller/materials" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-slate-300">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-white">C</span>
              </div>
              <div>
                <p className="text-base font-bold text-white leading-none">
                  ChannelFirst
                </p>
                <p className="text-xs text-slate-400 leading-none mt-0.5">
                  Technology Sdn Bhd
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              A leading IT distribution company in Malaysia, providing innovative
              technology solutions and products to resellers, system integrators,
              and enterprise customers since 2005.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>03-2780 8888</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>sales@channelfirst.com.my</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Subang Jaya, Selangor, Malaysia</span>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="rounded-md p-2 transition-colors hover:bg-white/10"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="rounded-md p-2 transition-colors hover:bg-white/10"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="rounded-md p-2 transition-colors hover:bg-white/10"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reseller */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Reseller
            </h4>
            <ul className="space-y-2">
              {footerLinks.reseller.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-white">
                Subscribe to our newsletter
              </h4>
              <p className="text-sm text-slate-400 mt-1">
                Stay updated with the latest promotions, new products, and
                industry news.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Email for newsletter"
              />
              <Button size="sm" className="shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              © {currentYear} ChannelFirst Technology Sdn Bhd (123456-X). All
              rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-success" />
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
