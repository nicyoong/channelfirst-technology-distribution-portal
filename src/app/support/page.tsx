"use client";

import { useState } from "react";
import {
  FileText,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Plus,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import { Button, Badge, Card, Input } from "@/components/ui";
import { branches } from "@/data/site";

const rmaSteps = [
  {
    icon: FileText,
    num: "01",
    title: "Submit a Support Ticket",
    desc: "Open a ticket via our support portal or email. Include your order number, product SKU, serial number, and a description of the issue.",
  },
  {
    icon: ShieldCheck,
    num: "02",
    title: "Warranty Validation",
    desc: "Our team validates the warranty status and reviews the fault description. Typical turnaround: 1 business day.",
  },
  {
    icon: CheckCircle2,
    num: "03",
    title: "Receive RMA Number",
    desc: "Once approved, you'll receive an RMA number and return instructions via email.",
  },
  {
    icon: Truck,
    num: "04",
    title: "Return or Replace Unit",
    desc: "Ship the unit to our warehouse with the RMA clearly marked. We process replacements or repairs within 3–5 business days.",
  },
];

const faqData = [
  {
    q: "How do I become a reseller?",
    a: "You can apply for a reseller account through our registration page. Simply fill in your company details, upload your SSM certificate, and our channel team will verify your application within 2 business days.",
  },
  {
    q: "How do I request pricing for a product?",
    a: "Reseller pricing is available in the reseller portal after account approval. If you're not yet a reseller, you can submit an RFQ through our Request a Quote page and our sales team will respond with competitive pricing within 2 business hours.",
  },
  {
    q: "What is the warranty process?",
    a: "All products sold through ChannelFirst come with the manufacturer's standard warranty. In the event of a fault, submit a support ticket with your order details and serial number. Our team will validate the warranty and issue an RMA number for replacement or repair.",
  },
  {
    q: "Do you offer drop shipping?",
    a: "Yes, we offer direct-to-customer shipping for most products. You can place orders through the reseller portal and specify the end-customer's delivery address. Shipping costs and delivery timelines vary by product and location.",
  },
  {
    q: "Can I register for training events?",
    a: "Yes! Training sessions are open to all registered resellers and system integrators. Visit our Training & Events page to browse upcoming workshops and register your interest. Seats are limited and allocated on a first-come basis.",
  },
  {
    q: "What are your support hours?",
    a: "Our support team is available Monday to Friday, 9:00 AM to 6:00 PM (GMT+8). For urgent issues outside business hours, Platinum partners can access our 24/7 priority support line.",
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [serialInput, setSerialInput] = useState("");
  const [warrantyResult, setWarrantyResult] = useState<string | null>(null);

  const handleWarrantyLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (serialInput.trim()) {
      setWarrantyResult(
        `Warranty valid for product with serial ${serialInput.trim()}. Contact support for claim initiation.`
      );
    }
  };

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-slate-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            Support Centre
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ChannelFirst Support Hub
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Technical support, warranty claims, RMA processing, and training
            resources — everything your team needs in one place.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* RMA Process */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-8">
            RMA & Warranty Process
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rmaSteps.map((step, i) => (
              <Card key={step.title} className="p-6 relative">
                <div className="absolute -top-3 -left-1 text-5xl font-black text-primary/10 select-none">
                  {step.num}
                </div>
                <div className="relative">
                  <div className="rounded-lg bg-primary/10 w-10 h-10 flex items-center justify-center mb-4">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Warranty Lookup */}
        <section>
          <Card className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-navy mb-4">
              Warranty Lookup
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Enter a serial number or SKU to check warranty status.
            </p>
            <form onSubmit={handleWarrantyLookup} className="flex gap-3">
              <Input
                placeholder="Enter serial number or SKU..."
                value={serialInput}
                onChange={(e) => setSerialInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="outline">
                Check
              </Button>
            </form>
            {warrantyResult && (
              <div className="mt-4 rounded-lg border border-success/20 bg-success/5 px-4 py-3 text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 text-success inline mr-2" />
                {warrantyResult}
              </div>
            )}
          </Card>
        </section>

        {/* SLA Table */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-6">
            Support SLA by Reseller Tier
          </h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="text-left px-6 py-3 font-semibold text-foreground">
                      Tier
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">
                      Response Time
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">
                      Resolution Target
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">
                      Support Channel
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">
                      RMA Priority
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      tier: "Silver",
                      color: "text-slate-500",
                      response: "Next business day",
                      resolution: "5 business days",
                      channel: "Email & phone",
                      rma: "Standard",
                    },
                    {
                      tier: "Gold",
                      color: "text-amber-600",
                      response: "4 business hours",
                      resolution: "3 business days",
                      channel: "Dedicated hotline",
                      rma: "Priority",
                    },
                    {
                      tier: "Platinum",
                      color: "text-primary",
                      response: "2 business hours",
                      resolution: "24–48 hours",
                      channel: "24/7 priority line",
                      rma: "Express",
                    },
                  ].map((row) => (
                    <tr
                      key={row.tier}
                      className="border-b border-border last:border-0 hover:bg-surface transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold">
                        <span className={row.color}>{row.tier} Partner</span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {row.response}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {row.resolution}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {row.channel}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={
                            row.tier === "Platinum"
                              ? "default"
                              : row.tier === "Gold"
                              ? "warning"
                              : "secondary"
                          }
                          size="sm"
                        >
                          {row.rma}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* Branch Support */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-6">
            Branch Support Contacts
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {branches.map((branch) => (
              <Card key={branch.name} className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-md bg-primary/10 p-2">
                    {branch.type === "hq" ? (
                      <FileText className="h-4 w-4 text-primary" />
                    ) : (
                      <MapPin className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {branch.name}
                    </p>
                    {branch.type === "hq" && (
                      <Badge variant="default" size="sm" className="mt-0.5">
                        HQ
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-primary" />
                    {branch.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-primary" />
                    {branch.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-primary" />
                    {branch.hours}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Accordion */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqData.map((faq, i) => (
              <Card
                key={i}
                className="overflow-hidden cursor-pointer"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between p-5">
                  <h3 className="text-sm font-semibold text-foreground pr-4">
                    {faq.q}
                  </h3>
                  <button
                    className={`shrink-0 rounded-md p-1 transition-colors hover:bg-accent ${
                      openFaq === i ? "bg-accent" : ""
                    }`}
                    aria-label={openFaq === i ? "Collapse" : "Expand"}
                  >
                    {openFaq === i ? (
                      <X className="h-4 w-4 text-foreground" />
                    ) : (
                      <Plus className="h-4 w-4 text-foreground" />
                    )}
                  </button>
                </div>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
