/** @jest-environment jsdom */
import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResellerRegisterPage from "../page";

// Mock the toast context
jest.mock("../../contexts/toast-context", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => require("react").createElement("div", props, children),
    h1: ({ children, ...props }: any) => require("react").createElement("h1", props, children),
    h2: ({ children, ...props }: any) => require("react").createElement("h2", props, children),
    p: ({ children, ...props }: any) => require("react").createElement("p", props, children),
    button: ({ children, ...props }: any) => require("react").createElement("button", props, children),
  },
  AnimatePresence: ({ children }: any) => children,
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
      expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    });

    it("renders SSM registration input on step 1", () => {
      render(<ResellerRegisterPage />);
      expect(screen.getByLabelText(/ssm registration no/i)).toBeInTheDocument();
    });

    it("renders business type selector on step 1", () => {
      render(<ResellerRegisterPage />);
      expect(screen.getByLabelText(/business type/i)).toBeInTheDocument();
    });

    it("has Sdn Bhd selected by default for business type", () => {
      render(<ResellerRegisterPage />);
      const select = screen.getByLabelText(/business type/i);
      expect(select).toHaveValue("Sdn Bhd");
    });

    it("shows next button on step 1", () => {
      render(<ResellerRegisterPage />);
      expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    });
  });

  describe("step 1 - company information validation", () => {
    it("shows error when company name is empty", async () => {
      render(<ResellerRegisterPage />);
      const nextBtn = screen.getByRole("button", { name: /next/i });
      
      await userEvent.click(nextBtn);
      
      await waitFor(() => {
        expect(screen.getByText(/company name is required/i)).toBeInTheDocument();
      });
    });

    it("shows error when SSM number is invalid", async () => {
      render(<ResellerRegisterPage />);
      
      await userEvent.type(screen.getByLabelText(/company name/i), "Test Company");
      await userEvent.type(screen.getByLabelText(/ssm registration no/i), "invalid");
      
      const nextBtn = screen.getByRole("button", { name: /next/i });
      await userEvent.click(nextBtn);
      
      await waitFor(() => {
        expect(screen.getByText(/invalid format/i)).toBeInTheDocument();
      });
    });

    it("allows navigation to step 2 with valid step 1 data", async () => {
      render(<ResellerRegisterPage />);
      
      await userEvent.type(screen.getByLabelText(/company name/i), "Test Company Sdn Bhd");
      await userEvent.type(screen.getByLabelText(/ssm registration no/i), "199901000123");
      
      const nextBtn = screen.getByRole("button", { name: /next/i });
      await userEvent.click(nextBtn);
      
      await waitFor(() => {
        expect(screen.getByLabelText(/contact person/i)).toBeInTheDocument();
      });
    });

    it("validates SSM with legacy format", async () => {
      render(<ResellerRegisterPage />);
      
      await userEvent.type(screen.getByLabelText(/company name/i), "Test Company");
      await userEvent.type(screen.getByLabelText(/ssm registration no/i), "1234567-A");
      
      const nextBtn = screen.getByRole("button", { name: /next/i });
      await userEvent.click(nextBtn);
      
      await waitFor(() => {
        expect(screen.getByLabelText(/contact person/i)).toBeInTheDocument();
      });
    });
  });

  describe("step 2 - contact information validation", () => {
    it("shows error when contact name is empty", async () => {
      render(<ResellerRegisterPage />);
      
      // Fill step 1
      await userEvent.type(screen.getByLabelText(/company name/i), "Test Company");
      await userEvent.type(screen.getByLabelText(/ssm registration no/i), "199901000123");
      await userEvent.click(screen.getByRole("button", { name: /next/i }));
      
      // Try to submit step 2 with empty contact name
      const submitBtn = screen.getByRole("button", { name: /submit registration/i });
      await userEvent.click(submitBtn);
      
      await waitFor(() => {
        expect(screen.getByText(/contact person is required/i)).toBeInTheDocument();
      });
    });

    it("shows error when email is invalid", async () => {
      render(<ResellerRegisterPage />);
      
      // Fill step 1
      await userEvent.type(screen.getByLabelText(/company name/i), "Test Company");
      await userEvent.type(screen.getByLabelText(/ssm registration no/i), "199901000123");
      await userEvent.click(screen.getByRole("button", { name: /next/i }));
      
      // Fill contact name
      await userEvent.type(screen.getByLabelText(/contact person/i), "John Doe");
      await userEvent.type(screen.getByLabelText(/email/i), "invalid-email");
      
      const submitBtn = screen.getByRole("button", { name: /submit registration/i });
      await userEvent.click(submitBtn);
      
      await waitFor(() => {
        expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
      });
    });

    it("rejects free email domains", async () => {
      render(<ResellerRegisterPage />);
      
      // Fill step 1
      await userEvent.type(screen.getByLabelText(/company name/i), "Test Company");
      await userEvent.type(screen.getByLabelText(/ssm registration no/i), "199901000123");
      await userEvent.click(screen.getByRole("button", { name: /next/i }));
      
      // Fill contact name
      await userEvent.type(screen.getByLabelText(/contact person/i), "John Doe");
      await userEvent.type(screen.getByLabelText(/email/i), "john@gmail.com");
      
      const submitBtn = screen.getByRole("button", { name: /submit registration/i });
      await userEvent.click(submitBtn);
      
      await waitFor(() => {
        expect(screen.getByText(/work email/i)).toBeInTheDocument();
      });
    });

    it("shows error when phone is too short", async () => {
      render(<ResellerRegisterPage />);
      
      // Fill step 1
      await userEvent.type(screen.getByLabelText(/company name/i), "Test Company");
      await userEvent.type(screen.getByLabelText(/ssm registration no/i), "199901000123");
      await userEvent.click(screen.getByRole("button", { name: /next/i }));
      
      // Fill other fields
      await userEvent.type(screen.getByLabelText(/contact person/i), "John Doe");
      await userEvent.type(screen.getByLabelText(/email/i), "john@company.com");
      await userEvent.type(screen.getByLabelText(/phone/i), "123");
      
      const submitBtn = screen.getByRole("button", { name: /submit registration/i });
      await userEvent.click(submitBtn);
      
      await waitFor(() => {
        expect(screen.getByText(/valid phone number/i)).toBeInTheDocument();
      });
    });

    it("shows error when state is not selected", async () => {
      render(<ResellerRegisterPage />);
      
      // Fill step 1
      await userEvent.type(screen.getByLabelText(/company name/i), "Test Company");
      await userEvent.type(screen.getByLabelText(/ssm registration no/i), "199901000123");
      await userEvent.click(screen.getByRole("button", { name: /next/i }));
      
      // Fill other fields
      await userEvent.type(screen.getByLabelText(/contact person/i), "John Doe");
      await userEvent.type(screen.getByLabelText(/email/i), "john@company.com");
      await userEvent.type(screen.getByLabelText(/phone/i), "012-3456789");
      
      const submitBtn = screen.getByRole("button", { name: /submit registration/i });
      await userEvent.click(submitBtn);
      
      await waitFor(() => {
        expect(screen.getByText(/select a state/i)).toBeInTheDocument();
      });
    });

    it("shows error when monthly volume is not selected", async () => {
      render(<ResellerRegisterPage />);
      
      // Fill step 1
      await userEvent.type(screen.getByLabelText(/company name/i), "Test Company");
      await userEvent.type(screen.getByLabelText(/ssm registration no/i), "199901000123");
      await userEvent.click(screen.getByRole("button", { name: /next/i }));
      
      // Fill other fields
      await userEvent.type(screen.getByLabelText(/contact person/i), "John Doe");
      await userEvent.type(screen.getByLabelText(/email/i), "john@company.com");
      await userEvent.type(screen.getByLabelText(/phone/i), "012-3456789");
      
      // Select state
      const stateSelect = screen.getByLabelText(/state \/ region/i);
      await userEvent.selectOptions(stateSelect, "Selangor");
      
      const submitBtn = screen.getByRole("button", { name: /submit registration/i });
      await userEvent.click(submitBtn);
      
      await waitFor(() => {
        expect(screen.getByText(/select a volume range/i)).toBeInTheDocument();
      });
    });

    it("shows error when no categories are selected", async () => {
      render(<ResellerRegisterPage />);
      
      // Fill step 1
      await userEvent.type(screen.getByLabelText(/company name/i), "Test Company");
      await userEvent.type(screen.getByLabelText(/ssm registration no/i), "199901000123");
      await userEvent.click(screen.getByRole("button", { name: /next/i }));
      
      // Fill all required fields
      await userEvent.type(screen.getByLabelText(/contact person/i), "John Doe");
      await userEvent.type(screen.getByLabelText(/email/i), "john@company.com");
      await userEvent.type(screen.getByLabelText(/phone/i), "012-3456789");
      
      const stateSelect = screen.getByLabelText(/state \/ region/i);
      await userEvent.selectOptions(stateSelect, "Selangor");
      
      const volumeSelect = screen.getByLabelText(/monthly volume/i);
      await userEvent.selectOptions(volumeSelect, "RM10,000 - RM50,000");
      
      const submitBtn = screen.getByRole("button", { name: /submit registration/i });
      await userEvent.click(submitBtn);
      
      await waitFor(() => {
        expect(screen.getByText(/at least one category/i)).toBeInTheDocument();
      });
    });
  });

  describe("successful submission", () => {
    it("submits successfully with all valid data", async () => {
      render(<ResellerRegisterPage />);
      
      // Step 1
      await userEvent.type(screen.getByLabelText(/company name/i), "Test Company Sdn Bhd");
      await userEvent.type(screen.getByLabelText(/ssm registration no/i), "199901000123");
      await userEvent.click(screen.getByRole("button", { name: /next/i }));
      
      // Step 2
      await userEvent.type(screen.getByLabelText(/contact person/i), "John Doe");
      await userEvent.type(screen.getByLabelText(/email/i), "john@company.com");
      await userEvent.type(screen.getByLabelText(/phone/i), "012-3456789");
      
      const stateSelect = screen.getByLabelText(/state \/ region/i);
      await userEvent.selectOptions(stateSelect, "Selangor");
      
      const volumeSelect = screen.getByLabelText(/monthly volume/i);
      await userEvent.selectOptions(volumeSelect, "RM10,000 - RM50,000");
      
      // Select a category
      const networkingCheckbox = screen.getByRole("checkbox", { name: /Networking/i });
      await userEvent.click(networkingCheckbox);
      
      const submitBtn = screen.getByRole("button", { name: /submit registration/i });
      await userEvent.click(submitBtn);
      
      await waitFor(() => {
        expect(screen.getByText(/application submitted/i)).toBeInTheDocument();
      });
    });
  });

  describe("back button navigation", () => {
    it("returns to step 1 when back is clicked on step 2", async () => {
      render(<ResellerRegisterPage />);
      
      // Navigate to step 2
      await userEvent.type(screen.getByLabelText(/company name/i), "Test Company");
      await userEvent.type(screen.getByLabelText(/ssm registration no/i), "199901000123");
      await userEvent.click(screen.getByRole("button", { name: /next/i }));
      
      // Click back
      const backBtn = screen.getByRole("button", { name: /back/i });
      await userEvent.click(backBtn);
      
      await waitFor(() => {
        expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/ssm registration no/i)).toBeInTheDocument();
      });
    });
  });

  describe("business type options", () => {
    it("shows correct business type options", () => {
      render(<ResellerRegisterPage />);
      const select = screen.getByLabelText(/business type/i);
      
      expect(select).toHaveValue("Sdn Bhd");
      expect(screen.getByRole("option", { name: /Sdn Bhd/i })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: /Enterprise/i })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: /LLP/i })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: /System Integrator/i })).toBeInTheDocument();
    });

    it("does not show old business type options", () => {
      render(<ResellerRegisterPage />);
      
      expect(screen.queryByRole("option", { name: /Reseller/i })).not.toBeInTheDocument();
      expect(screen.queryByRole("option", { name: /Managed Service Provider/i })).not.toBeInTheDocument();
      expect(screen.queryByRole("option", { name: /Educational Institution/i })).not.toBeInTheDocument();
      expect(screen.queryByRole("option", { name: /Government/i })).not.toBeInTheDocument();
    });
  });

  describe("state options", () => {
    it("shows Malaysia state options", () => {
      render(<ResellerRegisterPage />);
      const stateSelect = screen.getByLabelText(/state \/ region/i);
      
      expect(screen.getByRole("option", { name: /Johor/i })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: /Selangor/i })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: /Kuala Lumpur/i })).toBeInTheDocument();
    });
  });

  describe("category selection", () => {
    it("allows selecting multiple categories", async () => {
      render(<ResellerRegisterPage />);
      
      // Navigate to step 2
      await userEvent.type(screen.getByLabelText(/company name/i), "Test Company");
      await userEvent.type(screen.getByLabelText(/ssm registration no/i), "199901000123");
      await userEvent.click(screen.getByRole("button", { name: /next/i }));
      
      // Fill required fields
      await userEvent.type(screen.getByLabelText(/contact person/i), "John Doe");
      await userEvent.type(screen.getByLabelText(/email/i), "john@company.com");
      await userEvent.type(screen.getByLabelText(/phone/i), "012-3456789");
      
      const stateSelect = screen.getByLabelText(/state \/ region/i);
      await userEvent.selectOptions(stateSelect, "Selangor");
      
      const volumeSelect = screen.getByLabelText(/monthly volume/i);
      await userEvent.selectOptions(volumeSelect, "RM10,000 - RM50,000");
      
      // Select multiple categories
      const networkingCheckbox = screen.getByRole("checkbox", { name: /Networking/i });
      const securityCheckbox = screen.getByRole("checkbox", { name: /Security/i });
      
      await userEvent.click(networkingCheckbox);
      await userEvent.click(securityCheckbox);
      
      expect(networkingCheckbox).toBeChecked();
      expect(securityCheckbox).toBeChecked();
    });
  });
});
