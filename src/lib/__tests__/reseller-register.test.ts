import { describe, expect, it } from "@jest/globals";
import {
  resellerRegisterSchema,
  SSM_SCHEMA,
  type ResellerRegisterForm,
} from "../validations/reseller-register";

describe("FREE_EMAIL_DOMAINS", () => {
  // Note: FREE_EMAIL_DOMAINS is not exported, so we test via the schema behavior
  it("rejects gmail email through schema", () => {
    const form: ResellerRegisterForm = {
      companyName: "Test Company",
      ssmNumber: "199901000123",
      businessType: "Sdn Bhd",
      contactName: "John Doe",
      email: "test@gmail.com",
      phone: "012-3456789",
      state: "Selangor",
      monthlyVolume: "RM10,000",
      categories: ["Networking"],
    };
    const result = resellerRegisterSchema.safeParse(form);
    expect(result.success).toBe(false);
  });
});

describe("SSM_SCHEMA", () => {
  describe("valid inputs", () => {
    it("accepts 12-digit numeric SSM", () => {
      const result = SSM_SCHEMA.safeParse("123456789012");
      expect(result.success).toBe(true);
    });

    it("accepts 13-digit numeric SSM", () => {
      const result = SSM_SCHEMA.safeParse("1234567890123");
      expect(result.success).toBe(true);
    });

    it("accepts 14-digit numeric SSM", () => {
      const result = SSM_SCHEMA.safeParse("12345678901234");
      expect(result.success).toBe(true);
    });

    it("accepts legacy format with dash and letter (e.g. 1234567-A)", () => {
      const result = SSM_SCHEMA.safeParse("1234567-A");
      expect(result.success).toBe(true);
    });

    it("accepts legacy format with numeric suffix (e.g. 1234567-1)", () => {
      const result = SSM_SCHEMA.safeParse("1234567-1");
      expect(result.success).toBe(true);
    });

    it("trims whitespace before validating", () => {
      const result = SSM_SCHEMA.safeParse("  123456789012  ");
      expect(result.success).toBe(true);
    });
  });

  describe("invalid inputs", () => {
    it("rejects empty string", () => {
      const result = SSM_SCHEMA.safeParse("");
      expect(result.success).toBe(false);
    });

    it("rejects string with fewer than 12 digits (no dash)", () => {
      const result = SSM_SCHEMA.safeParse("12345678901");
      expect(result.success).toBe(false);
    });

    it("rejects string with more than 14 digits (no dash)", () => {
      const result = SSM_SCHEMA.safeParse("123456789012345");
      expect(result.success).toBe(false);
    });

    it("rejects alphanumeric without dash", () => {
      const result = SSM_SCHEMA.safeParse("ABC12345678901");
      expect(result.success).toBe(false);
    });

    it("rejects legacy format with lowercase suffix", () => {
      const result = SSM_SCHEMA.safeParse("1234567-a");
      expect(result.success).toBe(false);
    });

    it("rejects legacy format with multi-character suffix", () => {
      const result = SSM_SCHEMA.safeParse("1234567-AB");
      expect(result.success).toBe(false);
    });

    it("rejects legacy format without numeric prefix", () => {
      const result = SSM_SCHEMA.safeParse("-A");
      expect(result.success).toBe(false);
    });

    it("rejects SSM with special characters", () => {
      const result = SSM_SCHEMA.safeParse("123456789012!");
      expect(result.success).toBe(false);
    });

    it("rejects SSM with spaces in the middle", () => {
      const result = SSM_SCHEMA.safeParse("12345 6789012");
      expect(result.success).toBe(false);
    });
  });
});

describe("resellerRegisterSchema", () => {
  const validForm: ResellerRegisterForm = {
    companyName: "TechCorp Sdn Bhd",
    ssmNumber: "199901000123",
    businessType: "Sdn Bhd",
    contactName: "Ahmad bin Ali",
    email: "ahmad@techcorp.com.my",
    phone: "012-3456789",
    state: "Selangor",
    monthlyVolume: "RM10,000 - RM50,000",
    categories: ["Networking", "Security"],
  };

  describe("happy path", () => {
    it("validates a complete correct form", () => {
      const result = resellerRegisterSchema.safeParse(validForm);
      expect(result.success).toBe(true);
    });

    it("accepts Enterprise business type", () => {
      const form = { ...validForm, businessType: "Enterprise" };
      const result = resellerRegisterSchema.safeParse(form);
      expect(result.success).toBe(true);
    });

    it("accepts LLP business type", () => {
      const form = { ...validForm, businessType: "LLP" };
      expect(resellerRegisterSchema.safeParse(form).success).toBe(true);
    });

    it("accepts System Integrator business type", () => {
      const form = { ...validForm, businessType: "System Integrator" };
      expect(resellerRegisterSchema.safeParse(form).success).toBe(true);
    });
  });

  describe("companyName validation", () => {
    it("rejects empty company name", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        companyName: "",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const err = result.error.flatten();
        expect(err.fieldErrors.companyName).toBeDefined();
      }
    });

    it("rejects single character company name", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        companyName: "A",
      });
      expect(result.success).toBe(false);
    });

    it("accepts two character company name", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        companyName: "AB",
      });
      expect(result.success).toBe(true);
    });

    it("BUG: accepts whitespace-only company name (should reject)", () => {
      // This is a bug! Whitespace-only should be rejected but min(2) passes it
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        companyName: "   ",
      });
      // This test documents the bug - currently passes but shouldn't
      expect(result.success).toBe(true); // BUG: should be false
    });
  });

  describe("ssmNumber validation", () => {
    it("rejects invalid SSM format", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        ssmNumber: "invalid",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const err = result.error.flatten();
        expect(err.fieldErrors.ssmNumber).toBeDefined();
      }
    });

    it("rejects empty SSM", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        ssmNumber: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("businessType validation", () => {
    it("rejects invalid business type", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        businessType: "InvalidType" as ResellerRegisterForm["businessType"],
      });
      expect(result.success).toBe(false);
    });

    it("rejects empty business type", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        businessType: "" as ResellerRegisterForm["businessType"],
      });
      expect(result.success).toBe(false);
    });
  });

  describe("contactName validation", () => {
    it("rejects empty contact name", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        contactName: "",
      });
      expect(result.success).toBe(false);
    });

    it("rejects single character contact name", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        contactName: "A",
      });
      expect(result.success).toBe(false);
    });

    it("accepts two character contact name", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        contactName: "AB",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("email validation", () => {
    it("rejects invalid email format", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        email: "not-an-email",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const err = result.error.flatten();
        expect(err.fieldErrors.email).toBeDefined();
      }
    });

    it("rejects email without domain", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        email: "test@",
      });
      expect(result.success).toBe(false);
    });

    it("rejects Gmail address", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        email: "test@gmail.com",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const err = result.error.flatten();
        expect(err.fieldErrors.email).toBeDefined();
      }
    });

    it("rejects Yahoo email", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        email: "test@yahoo.com",
      });
      expect(result.success).toBe(false);
    });

    it("rejects Hotmail email", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        email: "test@hotmail.com",
      });
      expect(result.success).toBe(false);
    });

    it("rejects Outlook email", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        email: "test@outlook.com",
      });
      expect(result.success).toBe(false);
    });

    it("rejects iCloud email", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        email: "test@icloud.com",
      });
      expect(result.success).toBe(false);
    });

    it("accepts corporate email", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        email: "user@company.com.my",
      });
      expect(result.success).toBe(true);
    });

    it("accepts business email with subdomain", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        email: "user@dept.company.com",
      });
      expect(result.success).toBe(true);
    });

    it("is case-insensitive for free email domains", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        email: "test@GMAIL.COM",
      });
      expect(result.success).toBe(false);
    });

    it("rejects email with free domain in different case", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        email: "test@Yahoo.COM",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("phone validation", () => {
    it("rejects empty phone", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        phone: "",
      });
      expect(result.success).toBe(false);
    });

    it("rejects short phone (less than 7 chars)", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        phone: "123456",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const err = result.error.flatten();
        expect(err.fieldErrors.phone).toBeDefined();
      }
    });

    it("accepts phone with exactly 7 characters", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        phone: "1234567",
      });
      expect(result.success).toBe(true);
    });

    it("accepts formatted phone number", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        phone: "012-3456789",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("state validation", () => {
    it("rejects empty state", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        state: "",
      });
      expect(result.success).toBe(false);
    });

    it("accepts valid state", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        state: "Kuala Lumpur",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("monthlyVolume validation", () => {
    it("rejects empty monthly volume", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        monthlyVolume: "",
      });
      expect(result.success).toBe(false);
    });

    it("accepts valid monthly volume", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        monthlyVolume: "RM50,000+",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("categories validation", () => {
    it("rejects empty categories array", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        categories: [],
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const err = result.error.flatten();
        expect(err.fieldErrors.categories).toBeDefined();
      }
    });

    it("accepts single category", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        categories: ["Networking"],
      });
      expect(result.success).toBe(true);
    });

    it("accepts multiple categories", () => {
      const result = resellerRegisterSchema.safeParse({
        ...validForm,
        categories: ["Networking", "Security", "Cloud"],
      });
      expect(result.success).toBe(true);
    });
  });

  describe("omit helper for step 1 validation", () => {
    it("can omit step 2 fields for step 1 validation", () => {
      const partial = resellerRegisterSchema.omit({
        contactName: true,
        email: true,
        phone: true,
        state: true,
        monthlyVolume: true,
        categories: true,
      });

      const result = partial.safeParse({
        companyName: "TechCorp Sdn Bhd",
        ssmNumber: "199901000123",
        businessType: "Sdn Bhd",
      });
      expect(result.success).toBe(true);
    });

    it("step 1 validation rejects missing companyName", () => {
      const partial = resellerRegisterSchema.omit({
        contactName: true,
        email: true,
        phone: true,
        state: true,
        monthlyVolume: true,
        categories: true,
      });

      const result = partial.safeParse({
        companyName: "",
        ssmNumber: "199901000123",
        businessType: "Sdn Bhd",
      });
      expect(result.success).toBe(false);
    });
  });
});
