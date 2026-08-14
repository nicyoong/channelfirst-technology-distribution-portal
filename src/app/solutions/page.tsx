import { SectionHeading, Badge, Card } from "@/components/ui";

export const metadata = {
  title: "Solutions — ChannelFirst Technology",
  description:
    "Explore IT solutions for enterprise deployments, SMB offices, data centres, and cloud environments.",
};

const solutions = [
  {
    title: "Branch Office Networking",
    description:
      "Complete networking solution for branch offices — from managed switches and Wi-Fi 6 access points to secure SD-WAN gateways. Ideal for multi-site deployments across Malaysia.",
    categories: ["Networking", "Cybersecurity"],
  },
  {
    title: "SME Server & Storage",
    description:
      "Right-sized server and storage solutions for small and medium enterprises. From Dell PowerEdge and HPE ProLiant servers to Synology NAS for file services and backup.",
    categories: ["Servers & Storage", "Endpoints"],
  },
  {
    title: "Secure SD-WAN for Enterprises",
    description:
      "Next-generation WAN with built-in security. FortiGate firewalls with SD-WAN capabilities provide secure, high-performance connectivity for distributed enterprises.",
    categories: ["Networking", "Cybersecurity"],
  },
  {
    title: "Microsoft 365 Cloud Adoption",
    description:
      "Comprehensive M365 licensing and deployment support for organisations migrating to cloud productivity. Includes Defender for Office 365 and Intune device management.",
    categories: ["Software & Licensing"],
  },
  {
    title: "Video Conferencing & Collaboration",
    description:
      "Professional AV solutions for modern meeting rooms — from Logitech Rally Bar all-in-one systems to Epson laser projectors for large boardrooms.",
    categories: ["Endpoints & Mobility", "Accessories"],
  },
  {
    title: "Data Centre Infrastructure",
    description:
      "Enterprise-grade server, storage, and networking infrastructure for data centre builds and upgrades. Rack servers, SAN storage, and high-density switching.",
    categories: ["Servers & Storage", "Networking"],
  },
];

export default function SolutionsPage() {
  return (
    <div className="bg-background">
      <section className="bg-gradient-to-br from-navy to-slate-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            Solutions
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            IT Solutions for Every Business
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            From branch office networking to data centre infrastructure, we
            provide complete solutions tailored to your requirements.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol) => (
            <Card key={sol.title} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {sol.categories.map((cat) => (
                    <Badge key={cat} variant="category" size="sm">
                      {cat}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {sol.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {sol.description}
                </p>
                <div className="mt-4">
                  <a href="/catalogue" className="text-sm font-medium text-primary hover:underline">
                    View Products →
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
