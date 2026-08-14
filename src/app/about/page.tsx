import Link from "next/link";
import { Building2, Award, Users, MapPin, Phone, Mail, Clock } from "lucide-react";
import { SectionHeading, StatCard, Badge, Card, Button } from "@/components/ui";

const milestones = [
  {
    year: "2005",
    title: "Company Founded",
    description:
      "Established in Subang Jaya, Selangor with a vision to bridge global technology vendors with Malaysian businesses.",
  },
  {
    year: "2008",
    title: "First Major Vendor Partnership",
    description:
      "Became an authorised distributor for Dell Technologies and Cisco, expanding our product portfolio significantly.",
  },
  {
    year: "2012",
    title: "East Malaysia Expansion",
    description:
      "Opened a branch office in Kota Kinabalu, Sabah to better serve customers in East Malaysia and Borneo region.",
  },
  {
    year: "2016",
    title: "Cybersecurity Portfolio Launch",
    description:
      "Added Fortinet and Sophos to our portfolio, responding to growing demand for enterprise security solutions.",
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description:
      "Launched our online reseller portal, enabling 24/7 ordering, real-time stock checks, and digital quote management.",
  },
  {
    year: "2024",
    title: "500+ Reseller Network",
    description:
      "Surpassed 500 active reseller partners nationwide, becoming one of Malaysia's most trusted IT distribution channels.",
  },
];

const values = [
  {
    icon: Award,
    title: "Integrity & Trust",
    description:
      "We build lasting partnerships on transparency, honesty, and mutual respect. Our word is our bond.",
  },
  {
    icon: Users,
    title: "Customer-Centric",
    description:
      "Every decision we make is guided by what delivers the best outcomes for our reseller partners and their customers.",
  },
  {
    icon: Building2,
    title: "Excellence",
    description:
      "We strive for operational excellence in logistics, technical support, and every interaction we have with our partners.",
  },
  {
    icon: MapPin,
    title: "Local Understanding",
    description:
      "Deep knowledge of the Malaysian market, business culture, and regulatory landscape that global vendors often lack.",
  },
];

export const metadata = {
  title: "About Us — ChannelFirst Technology",
  description:
    "Learn about ChannelFirst Technology — Malaysia's leading IT distributor since 2005. Our story, mission, values, and the team behind your technology supply chain.",
};

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-slate-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              About Us
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Malaysia's Trusted IT Distribution Partner
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Since 2005, ChannelFirst Technology has been the bridge between
              the world's leading technology vendors and Malaysia's resellers,
              system integrators, and enterprise buyers. We are committed to
              delivering the right products, at the right price, at the right
              time.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              value="18+"
              label="Years of Operation"
              description="Serving Malaysia since 2005"
            />
            <StatCard
              value="500+"
              label="Reseller Partners"
              description="Nationwide coverage"
            />
            <StatCard
              value="12,000+"
              label="Products Available"
              description="From 50+ global brands"
            />
            <StatCard
              value="50+"
              label="Global Vendors"
              description="Authorised distributorships"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading
                eyebrow="Our Mission"
                title="Empowering Malaysia's Digital Transformation"
              />
              <p className="text-muted-foreground leading-relaxed mb-6">
                To be the most reliable and responsive IT distribution partner
                in Malaysia, enabling our resellers and system integrators to
                grow their businesses through access to world-class technology
                products, competitive pricing, and exceptional support services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe that by strengthening the distribution channel, we
                contribute to the broader digitalisation of Malaysian businesses
                — from SMEs to large enterprises and government agencies.
              </p>
            </div>
            <div>
              <SectionHeading
                eyebrow="Our Vision"
                title="The Preferred Technology Distribution Channel in Southeast Asia"
              />
              <p className="text-muted-foreground leading-relaxed mb-6">
                To be recognised as the gold standard for IT distribution in
                Malaysia and the broader ASEAN region, known for our integrity,
                technical expertise, and unwavering commitment to partner
                success.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We envision a future where every technology reseller in Malaysia
                — regardless of size — has access to the same quality of products,
                pricing, and support that large enterprises currently enjoy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Values"
            title="What Drives Us Every Day"
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="p-6 text-center">
                <div className="inline-flex rounded-lg bg-primary/10 p-3 mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Journey"
            title="Key Milestones"
            align="center"
          />
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-start gap-6 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 mt-1.5">
                    <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                  </div>
                  <div
                    className={`ml-10 md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary mb-2">
                      {milestone.year}
                    </span>
                    <h3 className="text-base font-semibold text-foreground">
                      {milestone.title}
                    </h3>
                  </div>
                  <div
                    className={`ml-10 md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? "md:text-left" : "md:text-right"
                    }`}
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Leadership"
            title="Experienced Team Behind the Operation"
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Tan Sri Datuk Seri Ahmad Razali",
                role: "Chairman & Founder",
                bio: "Over 30 years of experience in the Malaysian IT industry. Former VP at a multinational technology vendor.",
              },
              {
                name: "Lim Wei Jie",
                role: "Chief Executive Officer",
                bio: "Leads the company's strategic direction and growth initiatives. Previously headed operations at a regional distributor.",
              },
              {
                name: "Siti Nurhaliza Binti Hassan",
                role: "Chief Operating Officer",
                bio: "Oversees day-to-day operations, logistics, and supply chain management across all branches.",
              },
            ].map((member) => (
              <Card key={member.name} className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {member.name}
                    </p>
                    <p className="text-xs text-primary font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Want to Partner With Us?
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Whether you're a reseller looking for a reliable distributor or a
            system integrator needing technical support, we'd love to hear from
            you. Get in touch with our team today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-slate-100 gap-2"
              >
                <Mail className="h-4 w-4" />
                Contact Us
              </Button>
            </Link>
            <Link href="/reseller/register">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white/30 text-white hover:bg-white/10"
              >
                Register as Reseller
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
