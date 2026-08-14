import { SectionHeading, Badge, Card } from "@/components/ui";

export const metadata = {
  title: "Promotions — ChannelFirst Technology",
  description:
    "Browse current promotions and special pricing from ChannelFirst Technology. Limited-time offers for resellers and system integrators.",
};

export default function PromotionsPage() {
  return (
    <div className="bg-background">
      <section className="bg-gradient-to-br from-navy to-slate-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            Promotions
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Current Promotions & Special Offers
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Take advantage of our limited-time promotions, bundle deals, and
            trade-in programmes designed for our reseller partners.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              badge: "Limited Time",
              tag: "Promotion",
              title: "Networking Refresh Promo",
              desc: "Purchase 10+ Cisco Catalyst switches or Aruba APs and receive up to 15% off list pricing. Valid until 30 September 2025.",
              validity: "Valid until 30 September 2025",
            },
            {
              badge: "New Arrival",
              tag: "Bundle Deal",
              title: "Endpoint Bundle for SMEs",
              desc: "Bundle a Lenovo ThinkCentre or Dell Vostro workstation with a 24\" monitor and Logitech peripherals at a bundled price. Includes 3-year on-site warranty.",
              validity: "Valid until 31 December 2025",
            },
            {
              badge: "Hot Deal",
              tag: "Trade-In",
              title: "Security Appliance Trade-In",
              desc: "Trade in your legacy firewall and receive additional discount on a FortiGate 200F. Includes free FortiGuard subscription for 12 months.",
              validity: "Valid until 28 February 2026",
            },
          ].map((promo) => (
            <Card key={promo.title} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="warning" size="sm">{promo.badge}</Badge>
                  <Badge variant="category" size="sm">{promo.tag}</Badge>
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {promo.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {promo.desc}
                </p>
                <p className="mt-3 text-xs text-muted-foreground font-medium">
                  ⏱ {promo.validity}
                </p>
                <div className="mt-4">
                  <a href="/rfq" className="block">
                    <button className="w-full px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors">
                      Request Promo Pricing
                    </button>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
