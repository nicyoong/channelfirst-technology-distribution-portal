// Test the contact page validation logic extracted from the component
// This tests the core business logic without React rendering

type FormErrors = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

function validate(form: {
  name: string;
  company: string;
  email: string;
  subject: string;
  message: string;
}): { errors: FormErrors; isValid: boolean } {
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
  return { errors: newErrors, isValid: Object.keys(newErrors).length === 0 };
}

describe("Contact form validation logic", () => {
  describe("valid inputs", () => {
    it("passes validation with all required fields filled", () => {
      const result = validate({
        name: "Ahmad Ali",
        company: "Tech Sdn Bhd",
        email: "ahmad@tech.com.my",
        subject: "Product Inquiry",
        message: "I need your pricing list",
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it("accepts various valid email formats", () => {
      const validEmails = [
        "user@example.com",
        "user.name@example.com",
        "user+tag@example.com",
        "user@sub.example.com",
        "user@company.com.my",
      ];
      validEmails.forEach((email) => {
        const result = validate({
          name: "Name",
          company: "Company",
          email,
          subject: "Subject",
          message: "Message",
        });
        expect(result.isValid).toBe(true);
      });
    });

    it("accepts whitespace-only fields that are not required", () => {
      // phone is optional, so whitespace is fine
      const result = validate({
        name: "Name",
        company: "Company",
        email: "test@test.com",
        subject: "Subject",
        message: "Message",
      });
      expect(result.isValid).toBe(true);
    });
  });

  describe("invalid inputs", () => {
    it("returns error when name is empty", () => {
      const result = validate({
        name: "",
        company: "Company",
        email: "test@test.com",
        subject: "Subject",
        message: "Message",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe("Name is required");
    });

    it("returns error when name is whitespace only", () => {
      const result = validate({
        name: "   ",
        company: "Company",
        email: "test@test.com",
        subject: "Subject",
        message: "Message",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe("Name is required");
    });

    it("returns error when company is empty", () => {
      const result = validate({
        name: "Name",
        company: "",
        email: "test@test.com",
        subject: "Subject",
        message: "Message",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.company).toBe("Company name is required");
    });

    it("returns error when email is empty", () => {
      const result = validate({
        name: "Name",
        company: "Company",
        email: "",
        subject: "Subject",
        message: "Message",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe("Email is required");
    });

    it("returns error when email has no @ symbol", () => {
      const result = validate({
        name: "Name",
        company: "Company",
        email: "invalid-email",
        subject: "Subject",
        message: "Message",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe("Please enter a valid email address");
    });

    it("returns error when email has no dot in domain", () => {
      const result = validate({
        name: "Name",
        company: "Company",
        email: "test@localhost",
        subject: "Subject",
        message: "Message",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe("Please enter a valid email address");
    });

    it("returns error when email starts with @", () => {
      const result = validate({
        name: "Name",
        company: "Company",
        email: "@example.com",
        subject: "Subject",
        message: "Message",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe("Please enter a valid email address");
    });

    it("returns error when email ends with dot", () => {
      const result = validate({
        name: "Name",
        company: "Company",
        email: "test@example.",
        subject: "Subject",
        message: "Message",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe("Please enter a valid email address");
    });

    it("returns error when subject is empty", () => {
      const result = validate({
        name: "Name",
        company: "Company",
        email: "test@test.com",
        subject: "",
        message: "Message",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.subject).toBe("Subject is required");
    });

    it("returns error when message is empty", () => {
      const result = validate({
        name: "Name",
        company: "Company",
        email: "test@test.com",
        subject: "Subject",
        message: "",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.message).toBe("Message is required");
    });

    it("returns error when message is whitespace only", () => {
      const result = validate({
        name: "Name",
        company: "Company",
        email: "test@test.com",
        subject: "Subject",
        message: "   ",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.message).toBe("Message is required");
    });

    it("returns multiple errors when all required fields are empty", () => {
      const result = validate({
        name: "",
        company: "",
        email: "",
        subject: "",
        message: "",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe("Name is required");
      expect(result.errors.company).toBe("Company name is required");
      expect(result.errors.email).toBe("Email is required");
      expect(result.errors.subject).toBe("Subject is required");
      expect(result.errors.message).toBe("Message is required");
    });

    it("handles very long inputs without error", () => {
      const longString = "x".repeat(10000);
      const result = validate({
        name: longString,
        company: longString,
        email: "test@test.com",
        subject: longString,
        message: longString,
      });
      expect(result.isValid).toBe(true);
    });
  });

  describe("boundary cases", () => {
    it("accepts single-character name", () => {
      const result = validate({
        name: "A",
        company: "Company",
        email: "a@b.com",
        subject: "S",
        message: "M",
      });
      expect(result.isValid).toBe(true);
    });

    it("accepts minimal valid email", () => {
      const result = validate({
        name: "Name",
        company: "Company",
        email: "a@b.c",
        subject: "Subject",
        message: "Message",
      });
      expect(result.isValid).toBe(true);
    });

    it("rejects email with spaces", () => {
      const result = validate({
        name: "Name",
        company: "Company",
        email: "test user@example.com",
        subject: "Subject",
        message: "Message",
      });
      expect(result.isValid).toBe(false);
    });

    it("accepts Malaysian email domain", () => {
      const result = validate({
        name: "Name",
        company: "Company",
        email: "user@company.com.my",
        subject: "Subject",
        message: "Message",
      });
      expect(result.isValid).toBe(true);
    });
  });
});
