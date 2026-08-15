/** @jest-environment jsdom */
import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResellerRegisterPage from "../page";

// Mock the toast context
jest.mock("@/contexts/toast-context", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

describe("ResellerRegisterPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("initial render", () => {
    it("renders the page title", () => {
      render(<ResellerRegisterPage />);
      expect(screen.getByText(/Apply for a Reseller Account/i)).toBeInTheDocument();
    });

    it("renders company name input on step 1", () => {
      render(<ResellerRegisterPage />);
      const input = document.querySelector('input[name="companyName"]');
      expect(input).toBeInTheDocument();
    });

    it("renders SSM registration input on step 1", () => {
      render(<ResellerRegisterPage />);
      const input = document.querySelector('input[name="ssmNumber"]');
      expect(input).toBeInTheDocument();
    });

    it("renders business type selector on step 1", () => {
      render(<ResellerRegisterPage />);
      const select = document.querySelector('select[name="businessType"]');
      expect(select).toBeInTheDocument();
    });

    it("has Sdn Bhd selected by default for business type", () => {
      render(<ResellerRegisterPage />);
      const select = document.querySelector('select[name="businessType"]');
      expect(select).toHaveValue("Sdn Bhd");
    });

    it("shows next button on step 1", () => {
      render(<ResellerRegisterPage />);
      expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
    });
  });

  describe("step 1 validation", () => {
    it("shows error when company name is empty", async () => {
      render(<ResellerRegisterPage />);
      const nextBtn = screen.getByRole("button", { name: /continue/i });
      await userEvent.click(nextBtn);
      expect(screen.getByText(/company name is required/i)).toBeInTheDocument();
    });

    it("shows error when SSM number is invalid", async () => {
      render(<ResellerRegisterPage />);
      const companyNameInput = document.querySelector('input[name="companyName"]') as HTMLInputElement;
      const ssmInput = document.querySelector('input[name="ssmNumber"]') as HTMLInputElement;

      await userEvent.type(companyNameInput!, "Test Company");
      await userEvent.type(ssmInput!, "invalid");

      const nextBtn = screen.getByRole("button", { name: /continue/i });
      await userEvent.click(nextBtn);

      expect(screen.getByText(/invalid format/i)).toBeInTheDocument();
    });

    it("allows navigation to step 2 with valid step 1 data", async () => {
      render(<ResellerRegisterPage />);
      const companyNameInput = document.querySelector('input[name="companyName"]') as HTMLInputElement;
      const ssmInput = document.querySelector('input[name="ssmNumber"]') as HTMLInputElement;

      await userEvent.type(companyNameInput!, "Test Company Sdn Bhd");
      await userEvent.type(ssmInput!, "199901000123");

      const nextBtn = screen.getByRole("button", { name: /continue/i });
      await userEvent.click(nextBtn);

      const contactInput = document.querySelector('input[name="contactName"]');
      expect(contactInput).toBeInTheDocument();
    });

    it("validates SSM with legacy format", async () => {
      render(<ResellerRegisterPage />);
      const companyNameInput = document.querySelector('input[name="companyName"]') as HTMLInputElement;
      const ssmInput = document.querySelector('input[name="ssmNumber"]') as HTMLInputElement;

      await userEvent.type(companyNameInput!, "Test Company");
      await userEvent.type(ssmInput!, "1234567-A");

      const nextBtn = screen.getByRole("button", { name: /continue/i });
      await userEvent.click(nextBtn);

      const contactInput = document.querySelector('input[name="contactName"]');
      expect(contactInput).toBeInTheDocument();
    });
  });

  describe("business type options", () => {
    it("shows correct business type options", () => {
      render(<ResellerRegisterPage />);
      const select = document.querySelector('select[name="businessType"]');
      expect(select).toHaveValue("Sdn Bhd");
      expect(screen.getByRole("option", { name: "Sdn Bhd" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Enterprise" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "LLP" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "System Integrator" })).toBeInTheDocument();
    });

    it("does not show old business type options", () => {
      render(<ResellerRegisterPage />);
      expect(screen.queryByRole("option", { name: /Reseller/i })).not.toBeInTheDocument();
      expect(screen.queryByRole("option", { name: /Managed Service Provider/i })).not.toBeInTheDocument();
    });
  });

  describe("placeholder text", () => {
    it("shows the updated placeholder with whitespace warning", () => {
      render(<ResellerRegisterPage />);
      const input = document.querySelector('input[name="companyName"]') as HTMLInputElement;
      expect(input?.placeholder).toContain("no leading/trailing spaces");
    });
  });
});
