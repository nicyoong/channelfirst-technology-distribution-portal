"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Button, Badge, Input, Card } from "@/components/ui";
import { useToast } from "@/contexts/toast-context";
import {
  resellerRegisterSchema,
  FREE_EMAIL_DOMAINS,
  type ResellerRegisterForm,
} from "@/lib/validations/reseller-register";

const BUSINESS_TYPES = ["Sdn Bhd", "Enterprise", "LLP", "System Integrator"];

const STATES = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Perak",
  "Perlis",
  "Pulau Pinang",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Selangor (KL area)",
  "Terengganu",
  "W.P. Kuala Lumpur",
  "W.P. Putrajaya",
  "W.P. Labuan",
];

const CATEGORIES = [
  "Networking",
  "Servers & Storage",
  "Endpoints & Mobility",
  "Cybersecurity",
  "Software & Licensing",
  "Accessories & Peripherals",
];

export default function ResellerRegisterPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<ResellerRegisterForm>({
    companyName: "",
    ssmNumber: "",
    businessType: "Sdn Bhd",
    contactName: "",
    email: "",
    phone: "",
    state: "",
    monthlyVolume: "",
    categories: [],
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ResellerRegisterForm, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const toggleCategory = (cat: string) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
    setErrors((prev) => ({ ...prev, categories: undefined }));
  };

  const validateStep1 = (): boolean => {
    const result = resellerRegisterSchema.omit({
      contactName: true,
      email: true,
      phone: true,
      state: true,
      monthlyVolume: true,
      categories: true,
    }).safeParse({
      companyName: form.companyName,
      ssmNumber: form.ssmNumber,
      businessType: form.businessType,
    });

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ResellerRegisterForm, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ResellerRegisterForm;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const validateStep2 = (): boolean => {
    const result = resellerRegisterSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ResellerRegisterForm, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ResellerRegisterForm;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setSubmitted(true);
    toast({
      type: "success",
      title: "Application Submitted",
      description:
        "Your application has been received. Our channel team will verify your documents within 2 business days.",
    });
  };

  if (submitted) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="inline-flex rounded-full bg-success/10 p-4 mb-5">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-navy mb-3">
            Application Received
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Thank you for applying to become a ChannelFirst reseller. Our channel
            team will review your application and verify your documents within
            2 business days. You will receive a confirmation email once your
            account is approved.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">Return to Homepage</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/catalogue">Browse Catalogue</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-slate-800 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            Reseller Programme
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Apply for a Reseller Account
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Join 3,500+ resellers and system integrators across Malaysia. Get
            access to competitive pricing, dedicated support, and priority stock
            allocation.
          </p>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-surface border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <div className="flex items-center gap-4">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    s <= step
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </span>
                <span
                  className={`text-sm font-medium ${
                    s <= step ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s === 1 ? "Company Details" : "Contact & Preferences"}
                </span>
                {s < 2 && (
                  <div
                    className={`flex-1 h-0.5 rounded ${
                      s < step ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <Card className="p-6 sm:p-8 space-y-5">
                  <h2 className="text-xl font-bold text-navy">
                    Company Information
                  </h2>

                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Company Name <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="companyName"
                        placeholder="e.g. Nexus Integrated Systems Sdn Bhd"
                        value={form.companyName}
                        onChange={handleChange}
                        className={`pl-10 ${errors.companyName ? "border-destructive" : ""}`}
                      />
                    </div>
                    {errors.companyName && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  {/* SSM Number + Business Type */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        SSM Registration No. <span className="text-destructive">*</span>
                      </label>
                      <Input
                        name="ssmNumber"
                        placeholder="e.g. 199901000123 or 1234567-A"
                        value={form.ssmNumber}
                        onChange={handleChange}
                        className={`pl-3 ${errors.ssmNumber ? "border-destructive" : ""}`}
                      />
                      {errors.ssmNumber && (
                        <p className="mt-1 text-xs text-destructive">
                          {errors.ssmNumber}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-muted-foreground">
                        12–14 digits, or legacy format with dash (e.g. 1234567-A)
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Business Type <span className="text-destructive">*</span>
                      </label>
                      <select
                        name="businessType"
                        value={form.businessType ?? ""}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            businessType: e.target.value as ResellerRegisterForm["businessType"],
                          }))
                        }
                        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary ${
                          errors.businessType ? "border-destructive" : ""
                        }`}
                      >
                        <option value="">Select type...</option>
                        {BUSINESS_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {errors.businessType && (
                        <p className="mt-1 text-xs text-destructive">
                          {errors.businessType}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" onClick={handleNext} className="gap-2">
                      Continue
                      <span aria-hidden="true">→</span>
                    </Button>
                  </div>
                </Card>
              )}

              {step === 2 && (
                <Card className="p-6 sm:p-8 space-y-5">
                  <h2 className="text-xl font-bold text-navy">
                    Contact & Preferences
                  </h2>

                  {/* Contact Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Contact Person <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="contactName"
                        placeholder="e.g. Ahmad bin Ali"
                        value={form.contactName}
                        onChange={handleChange}
                        className={`pl-10 ${errors.contactName ? "border-destructive" : ""}`}
                      />
                    </div>
                    {errors.contactName && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.contactName}
                      </p>
                    )}
                  </div>

                  {/* Email + Phone */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Work Email <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          name="email"
                          type="email"
                          placeholder="ahmad@company.com.my"
                          value={form.email}
                          onChange={handleChange}
                          className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-destructive">
                          {errors.email}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-muted-foreground">
                        Free email services ({FREE_EMAIL_DOMAINS.slice(0, 3).join(", ")}…
                        ) are not accepted.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          name="phone"
                          type="tel"
                          placeholder="e.g. 012-345 6789"
                          value={form.phone}
                          onChange={handleChange}
                          className={errors.phone ? "border-destructive" : ""}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-destructive">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* State + Monthly Volume */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        State / Region <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <select
                          name="state"
                          value={form.state}
                          onChange={handleChange}
                          className={`flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary ${
                            errors.state ? "border-destructive" : ""
                          }`}
                        >
                          <option value="">Select state...</option>
                          {STATES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.state && (
                        <p className="mt-1 text-xs text-destructive">
                          {errors.state}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Est. Monthly Purchase Volume{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <select
                        name="monthlyVolume"
                        value={form.monthlyVolume}
                        onChange={handleChange}
                        className={`h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary ${
                          errors.monthlyVolume ? "border-destructive" : ""
                        }`}
                      >
                        <option value="">Select range...</option>
                        <option value="below-10k">Below RM 10,000</option>
                        <option value="10k-50k">RM 10,000 – RM 50,000</option>
                        <option value="50k-100k">RM 50,000 – RM 100,000</option>
                        <option value="100k-500k">RM 100,000 – RM 500,000</option>
                        <option value="above-500k">Above RM 500,000</option>
                      </select>
                      {errors.monthlyVolume && (
                        <p className="mt-1 text-xs text-destructive">
                          {errors.monthlyVolume}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Product Categories of Interest{" "}
                      <span className="text-destructive">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => toggleCategory(cat)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                            form.categories.includes(cat)
                              ? "bg-primary/10 border-primary text-primary"
                              : "border-border text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    {errors.categories && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.categories}
                      </p>
                    )}
                  </div>

                  {/* Document Upload */}
                  <div className="border border-dashed border-border rounded-lg p-6 text-center">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">
                      Company Registration Certificate
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload your SSM certification or business registration
                      document (PDF, max 5MB)
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="mt-3 block w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-input file:bg-background file:text-sm file:font-medium file:cursor-pointer hover:file:bg-accent"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between gap-4 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      ← Back
                    </Button>
                    <Button type="submit" className="gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Submit Application
                    </Button>
                  </div>
                </Card>
              )}
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 bg-primary text-white">
              <h3 className="text-base font-semibold mb-3">
                Reseller Benefits
              </h3>
              <ul className="space-y-3 text-sm text-blue-100">
                {[
                  "Competitive tiered pricing (5–25% off list)",
                  "Dedicated account manager",
                  "Priority stock allocation",
                  "Same-day dispatch on selected stock",
                  "Marketing development funds (MDF)",
                  "Free technical training sessions",
                  "Fast-track RMA & warranty support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-base font-semibold text-foreground mb-3">
                What to Expect
              </h3>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Submit Application", desc: "Fill in your company details and upload your SSM certificate." },
                  { step: "2", title: "Document Verification", desc: "Our channel team verifies your business registration within 2 business days." },
                  { step: "3", title: "Account Approval", desc: "You'll receive an email with your reseller login credentials." },
                  { step: "4", title: "Start Ordering", desc: "Access competitive pricing, real-time stock, and exclusive promotions." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {item.step}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="rounded-xl border border-border bg-surface p-5">
              <p className="text-sm text-muted-foreground mb-3">
                Need help with your application?
              </p>
              <p className="text-base font-semibold text-foreground">
                03-2780 8888
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Mon–Fri, 9am–6pm (GMT+8)
              </p>
              <Link href="/contact" className="mt-4 block">
                <Button variant="outline" size="sm" className="w-full text-sm">
                  Contact Sales Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
