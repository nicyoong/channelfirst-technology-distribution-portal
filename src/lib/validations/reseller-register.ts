import { z } from "zod";

export const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "mail.com",
  "protonmail.com",
  "yandex.com",
];

// Old SSM format: 14-digit numeric with optional dash + letter suffix
// e.g. 12345678901234 or 1234567-A or 12345678901234-T
// New SSM format: 12-digit numeric
// e.g. 123456789012
export const SSM_SCHEMA = z.string().refine(
  (val) =>
    /^[0-9]{12,14}$/.test(val.trim()) ||
    /^[0-9]{1,7}-[A-Z0-9]$/.test(val.trim()),
  {
    message:
      "Invalid format. Accepts 12–14 digit numeric (e.g. 199901000123) or legacy format with dash (e.g. 1234567-A)",
  }
);

export const resellerRegisterSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  ssmNumber: SSM_SCHEMA,
  businessType: z.enum(["Sdn Bhd", "Enterprise", "LLP", "System Integrator"]),
  contactName: z.string().min(2, "Contact person is required"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .refine(
      (val) => {
        const domain = val.split("@")[1]?.toLowerCase();
        return domain && !FREE_EMAIL_DOMAINS.includes(domain);
      },
      { message: "Please use your work email address. Free email services are not accepted." }
    ),
  phone: z.string().min(7, "Please enter a valid phone number"),
  state: z.string().min(1, "Please select a state/region"),
  monthlyVolume: z.string().min(1, "Please select a volume range"),
  categories: z.array(z.string()).min(1, "Please select at least one category"),
});

export type ResellerRegisterForm = z.infer<typeof resellerRegisterSchema>;
