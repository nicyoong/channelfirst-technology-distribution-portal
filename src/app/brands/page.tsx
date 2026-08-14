import { SectionHeading, Badge, Card } from "@/components/ui";

export const metadata = {
  title: "Brands — ChannelFirst Technology",
  description:
    "Explore our portfolio of 40+ authorised technology brands. We distribute products from Cisco, Dell, Fortinet, Microsoft, and more.",
};

const brandGroups = [
  {
    title: "Networking & Infrastructure",
    brands: ["Cisco", "Aruba", "Ubiquiti", "Juniper Networks", "Ruckus", "MikroTik"],
  },
  {
    title: "Servers & Workstations",
    brands: ["Dell Technologies", "HPE", "Lenovo", "Supermicro", "QNAP"],
  },
  {
    title: "Cybersecurity",
    brands: ["Fortinet", "Sophos", "Trend Micro", "CrowdStrike", "Proofpoint"],
  },
  {
    title: "Software & Cloud",
    brands: ["Microsoft", "Adobe", "VMware", "Citrix", "Splunk"],
  },
  {
    title: "Endpoints & Collaboration",
    brands: ["Lenovo", "Dell", "HP Inc.", "Logitech", "Poly", "Epson"],
  },
  {
    title: "Storage & Power",
    brands: ["Synology", "APC by Schneider", "Eaton", "LaCie"],
  },
];

export default function BrandsPage() {
  return (
    <div className="bg-background">
      <section className="bg-gradient-to-br from-navy to-slate-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            Our Brands
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            40+ Authorised Technology Brands
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            We are an authorised distributor for the world&apos;s leading technology
            vendors. Every product we supply comes with full manufacturer
            warranty and support.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {brandGroups.map((group) => (
          <div key={group.title} className="mb-12">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {group.title}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {group.brands.map((brand) => (
                <Card
                  key={brand}
                  className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
                >
                  <span className="text-sm font-medium text-foreground">
                    {brand}
                  </span>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
