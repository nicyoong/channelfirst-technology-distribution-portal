import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

describe("Footer component", () => {
  it("renders the brand name", () => {
    render(<Footer />);
    expect(screen.getByText("ChannelFirst")).toBeInTheDocument();
  });

  it("renders contact information", () => {
    render(<Footer />);
    expect(screen.getByText("03-2780 8888")).toBeInTheDocument();
    expect(screen.getByText("sales@channelfirst.com.my")).toBeInTheDocument();
    expect(screen.getByText("Subang Jaya, Selangor, Malaysia")).toBeInTheDocument();
  });

  it("renders product category links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /networking/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /servers/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /endpoints/i })).toBeInTheDocument();
  });

  it("renders company links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /about channelfirst/i })).toBeInTheDocument();
  });

  it("renders support links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /support centre/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact us/i })).toBeInTheDocument();
  });

  it("renders reseller links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /reseller portal/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /register as reseller/i })).toBeInTheDocument();
  });

  it("renders newsletter subscription section", () => {
    render(<Footer />);
    expect(screen.getByText("Subscribe to our newsletter")).toBeInTheDocument();
    expect(screen.getByLabelText("Email for newsletter")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
  });

  it("renders copyright with current year", () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
  });

  it("renders legal links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /terms of service/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cookie policy/i })).toBeInTheDocument();
  });

  it("renders social media links", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
  });

  it("shows system status indicator", () => {
    render(<Footer />);
    expect(screen.getByText("All systems operational")).toBeInTheDocument();
  });
});
