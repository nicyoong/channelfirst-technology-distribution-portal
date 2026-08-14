import { SectionHeading, Badge, Card } from "@/components/ui";

export const metadata = {
  title: "Support Centre — ChannelFirst Technology",
  description:
    "Get technical support, warranty claims, and after-sales assistance from ChannelFirst Technology. Our team is ready to help.",
};

export default function SupportPage() {
  return (
    <div className="bg-background">
      <section className="bg-gradient-to-br from-navy to-slate-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            Support
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Support Centre
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Need help with a product, warranty claim, or technical question?
            Our support team is here for you.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          eyebrow="How Can We Help?"
          title="Support Resources"
          align="center"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {[
            {
              title: "Submit a RMA",
              desc: "Initiate a warranty claim or return for a defective product. Provide your order number and description of the issue.",
              href: "/support/rma",
            },
            {
              title: "Technical FAQ",
              desc: "Find answers to common technical questions, compatibility queries, and product setup guides.",
              href: "/faqs",
            },
            {
              title: "Track Your Order",
              desc: "Check the status of your order and estimated delivery date for shipments across Malaysia.",
              href: "/track-order",
            },
            {
              title: "Shipping & Delivery",
              desc: "Learn about our delivery options, shipping costs, and delivery coverage across Peninsular and East Malaysia.",
              href: "/shipping",
            },
            {
              title: "Contact Support",
              desc: "Reach our support team by phone, email, or through our contact form for personalised assistance.",
              href: "/contact",
            },
            {
              title: "Downloads & Datasheets",
              desc: "Access product datasheets, configuration guides, and firmware updates for your equipment.",
              href: "/downloads",
            },
          ].map((item) => (
            <Card key={item.title} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-base font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
