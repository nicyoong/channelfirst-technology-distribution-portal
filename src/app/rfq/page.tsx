import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Send, Truck, ShieldCheck, CheckCircle2, X } from "lucide-react";
import { Button, Card, Input, Textarea, Badge } from "@/components/ui";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Request a Quote — ChannelFirst Technology",
  description:
    "Submit your RFQ to ChannelFirst Technology. Get competitive pricing on IT products for your business. Fast turnaround, dedicated account support.",
};

export default function RFQPage() {
  const refNumber = `RFQ-CFT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;
  const totalItems = products.length;

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-slate-800 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            Request a Quote
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Submit Your RFQ
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Tell us what you need and our sales team will prepare a competitive
            quotation. We typically respond within 2 business hours during
            office hours.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">
                RFQ Details
              </h2>
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Your Name <span className="text-destructive">*</span>
                    </label>
                    <Input placeholder="Full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Company Name <span className="text-destructive">*</span>
                    </label>
                    <Input placeholder="Company name" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input type="email" placeholder="you@company.com.my" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Phone
                    </label>
                    <Input type="tel" placeholder="012-345 6789" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Product Categories
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Networking", "Servers & Storage", "Endpoints", "Cybersecurity", "Software", "Accessories"].map(
                      (cat) => (
                        <Badge
                          key={cat}
                          variant="outline"
                          className="cursor-pointer hover:border-primary hover:text-primary"
                        >
                          {cat}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Items / SKUs <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    rows={6}
                    placeholder="Please list the products you're interested in, including SKUs, quantities, and any specific configuration requirements..."
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    You can paste a spreadsheet, list SKUs with quantities, or
                    describe your requirements in detail.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Additional Notes
                  </label>
                  <Textarea
                    rows={3}
                    placeholder="Delivery timeline, budget constraints, or any other requirements..."
                  />
                </div>
                <Button type="submit" size="lg" className="gap-2">
                  <Send className="h-4 w-4" />
                  Submit RFQ
                </Button>
              </form>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quote summary */}
            <Card className="p-6 bg-primary text-white">
              <h3 className="text-base font-semibold mb-2">Quick Quote</h3>
              <p className="text-sm text-blue-100 mb-4">
                Browse {products.length} products in our catalogue and add items
                to your RFQ list.
              </p>
              <Link href="/catalogue">
                <Button size="sm" variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                  Browse Catalogue
                </Button>
              </Link>
            </Card>

            {/* What happens next */}
            <Card className="p-6">
              <h3 className="text-base font-semibold text-foreground mb-4">
                What Happens Next?
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: FileText,
                    title: "We Review Your Request",
                    desc: "Our sales team reviews your requirements and checks stock availability.",
                  },
                  {
                    icon: Truck,
                    title: "Competitive Quotation",
                    desc: "We prepare a tailored quotation with the best pricing for your volume.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Dedicated Support",
                    desc: "A dedicated account manager is assigned to assist you throughout.",
                  },
                ].map((step, i) => (
                  <div key={step.title} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Urgent contact */}
            <Card className="p-6 bg-navy text-white">
              <h3 className="text-base font-semibold mb-2">Need Urgent Assistance?</h3>
              <p className="text-sm text-slate-400 mb-4">
                Call our sales team directly for immediate assistance.
              </p>
              <p className="text-xl font-bold">03-2780 8888</p>
              <p className="text-sm text-slate-500 mt-1">
                Mon–Fri, 9am–6pm (GMT+8)
              </p>
              <Link href="/contact" className="mt-4 block">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10"
                >
                  Contact Us
                </Button>
              </Link>
            </Card>

            {/* Reseller benefits */}
            <Card className="p-6">
              <h3 className="text-base font-semibold text-foreground mb-3">
                Reseller Benefits
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Tiered reseller pricing",
                  "Dedicated account manager",
                  "Priority stock allocation",
                  "Marketing development funds",
                  "Fast-track shipping",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/reseller/register" className="mt-4 block">
                <Button variant="ghost" className="w-full text-sm text-primary">
                  Register as Reseller →
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
