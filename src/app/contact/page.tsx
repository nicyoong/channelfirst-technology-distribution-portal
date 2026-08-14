"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  Send,
  CheckCircle,
} from "lucide-react";
import { Button, Badge, Input, Textarea, Card } from "@/components/ui";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui";

const branches = [
  {
    name: "Head Office — Subang Jaya",
    address:
      "Lot 15, Jalan Teknologi 3/5, Taman Sains Selangor, 47810 Petaling Jaya, Selangor Darul Ehsan, Malaysia",
    phone: "03-2780 8888",
    fax: "03-2780 8999",
    email: "sales@channelfirst.com.my",
    hours: "Monday – Friday, 9:00 AM – 6:00 PM (GMT+8)",
    type: "headquarters" as const,
  },
  {
    name: "East Malaysia Branch — Kota Kinabalu",
    address:
      "Lot 2-1-8, Block 2, Menara Lien Hoe, Jalan Tun Abang Haji Openg, 88300 Kota Kinabalu, Sabah, Malaysia",
    phone: "088-318 888",
    fax: "088-318 999",
    email: "sabah@channelfirst.com.my",
    hours: "Monday – Friday, 9:00 AM – 5:30 PM (GMT+8)",
    type: "branch" as const,
  },
  {
    name: "Southern Office — Johor Bahru",
    address:
      "Lot 03-01, Plaza Belua, Jalan Tun Abdul Razak, 80000 Johor Bahru, Johor Darul Ta'zim, Malaysia",
    phone: "07-233 8888",
    fax: "07-233 9999",
    email: "jb@channelfirst.com.my",
    hours: "Monday – Friday, 9:00 AM – 5:30 PM (GMT+8)",
    type: "branch" as const,
  },
];

type FormErrors = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.company.trim()) newErrors.company = "Company name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-slate-800 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} className="mb-4" />
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            Contact Us
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get in Touch With Our Team
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Have a question about our products, pricing, or reseller programme?
            Our team is ready to help. Reach out via phone, email, or visit our
            offices.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <Card className="p-10 text-center">
                <div className="inline-flex rounded-full bg-success/10 p-4 mb-4">
                  <CheckCircle className="h-10 w-10 text-success" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Message Sent Successfully
                </h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. Our sales team will get back to
                  you within 1 business day during office hours.
                </p>
                <Button onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </Card>
            ) : (
              <Card className="p-6 sm:p-8">
                <h2 className="text-xl font-bold text-foreground mb-1">
                  Send Us a Message
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Fill in the form below and we'll respond within 1 business
                  day.
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="e.g. Ahmad bin Ali"
                        value={form.name}
                        onChange={handleChange}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-destructive">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Company Name{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="e.g. Tech Solutions Sdn Bhd"
                        value={form.company}
                        onChange={handleChange}
                        className={errors.company ? "border-destructive" : ""}
                      />
                      {errors.company && (
                        <p className="mt-1 text-xs text-destructive">
                          {errors.company}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@company.com.my"
                        value={form.email}
                        onChange={handleChange}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-destructive">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="e.g. 012-345 6789"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Subject <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, subject: e.target.value }))
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a subject...</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="pricing">Pricing & Quotation</option>
                      <option value="reseller">Reseller Registration</option>
                      <option value="technical">Technical Support</option>
                      <option value="after-sales">After-Sales & Warranty</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Message <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      value={form.message}
                      onChange={handleChange}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" size="lg" className="gap-2 w-full sm:w-auto">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </Card>
            )}
          </div>

          {/* Contact Info & Branches */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Contact */}
            <Card className="p-6">
              <h3 className="text-base font-semibold text-foreground mb-4">
                Quick Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-primary/10 p-2.5 shrink-0">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Sales Hotline
                    </p>
                    <p className="text-sm text-muted-foreground">
                      03-2780 8888
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Mon–Fri, 9am–6pm (GMT+8)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-primary/10 p-2.5 shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      General Enquiries
                    </p>
                    <a
                      href="mailto:sales@channelfirst.com.my"
                      className="text-sm text-primary hover:underline"
                    >
                      sales@channelfirst.com.my
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-primary/10 p-2.5 shrink-0">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Office Hours
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Monday – Friday: 9:00 AM – 6:00 PM
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Saturday – Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Branches */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Our Locations
              </h3>
              {branches.map((branch) => (
                <Card
                  key={branch.name}
                  className="p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {branch.name}
                      </p>
                      {branch.type === "headquarters" && (
                        <Badge
                          variant="default"
                          size="sm"
                          className="mt-1"
                        >
                          Headquarters
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {branch.address}
                  </p>
                  <div className="mt-3 pt-3 border-t border-border space-y-1">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">Phone:</span>{" "}
                      {branch.phone}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Email:</span>{" "}
                      {branch.email}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Map placeholder */}
            <Card className="p-4">
              <div className="aspect-video rounded-lg bg-surface border border-border flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">
                    Interactive Map
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Google Maps integration coming soon
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
