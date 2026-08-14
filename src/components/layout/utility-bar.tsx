import { Phone, Mail, Truck, Languages } from "lucide-react";
import Link from "next/link";

export function UtilityBar() {
  return (
    <div className="hidden md:block bg-navy text-slate-300 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-9 items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:+603-2780-8888"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>03-2780 8888</span>
            </a>
            <a
              href="mailto:sales@channelfirst.com.my"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>sales@channelfirst.com.my</span>
            </a>
            <span className="flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5" />
              <Link
                href="/track-order"
                className="hover:text-white transition-colors"
              >
                Track Order
              </Link>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/reseller"
              className="hover:text-white transition-colors font-medium"
            >
              Reseller Support
            </Link>
            <span className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
              <Languages className="h-3.5 w-3.5" />
              <span>EN</span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-500">BM</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
