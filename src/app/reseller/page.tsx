import { SectionHeading, Badge, Card } from "@/components/ui";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Reseller Programme — ChannelFirst Technology",
  description:
    "Join ChannelFirst Technology's reseller programme. Access competitive pricing, dedicated support, MDF, and priority stock allocation.",
};

export default function ResellerPage() {
  return (
    <div className="bg-background">
      <section className="bg-gradient-to-br from-navy to-slate-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            Reseller Programme
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Grow Your Business With ChannelFirst
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Whether you&apos;re a small reseller or a large system integrator, our
            reseller programme is designed to give you the tools, pricing, and
            support you need to win more deals.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          eyebrow="Why Partner With Us"
          title="Everything You Need to Succeed"
          align="center"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {[
            {
              icon: ShieldCheck,
              title: "Competitive Reseller Pricing",
              desc: "Tiered discounts from 5% to 25% off list pricing based on your annual spend and partnership level.",
            },
            {
              icon: CheckCircle2,
              title: "Dedicated Account Manager",
              desc: "Each reseller gets a named account manager who understands your business and can fast-track quotes and orders.",
            },
            {
              icon: CheckCircle2,
              title: "Marketing Development Funds",
              desc: "Qualify for MDF up to RM 20,000/year for co-branded campaigns, events, and lead generation activities.",
            },
            {
              icon: CheckCircle2,
              title: "Priority Stock Allocation",
              desc: "Guaranteed stock reservation for enterprise deals and access to same-day dispatch on KL HQ inventory.",
            },
            {
              icon: CheckCircle2,
              title: "Technical Training",
              desc: "Free access to product training sessions, certification prep, and quarterly technical webinars.",
            },
            {
              icon: CheckCircle2,
              title: "Fast RMA & Warranty",
              desc: "Streamlined warranty claims and RMA processing with priority handling for Platinum partners.",
            },
          ].map((item) => (
            <Card key={item.title} className="p-6">
              <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to join? Apply for a reseller account today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/reseller/register" className="inline-flex">
              <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Register as Reseller
              </button>
            </a>
            <a href="/contact" className="inline-flex">
              <button className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-accent transition-colors">
                Contact Sales Team
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
