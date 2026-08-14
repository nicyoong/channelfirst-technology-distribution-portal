import React from "react";
import { render, screen } from "@testing-library/react";
import { UtilityBar } from "./utility-bar";

describe("UtilityBar component", () => {
  it("renders phone number", () => {
    render(<UtilityBar />);
    expect(screen.getByText("03-2780 8888")).toBeInTheDocument();
  });

  it("renders email address", () => {
    render(<UtilityBar />);
    expect(screen.getByText("sales@channelfirst.com.my")).toBeInTheDocument();
  });

  it("renders Track Order link", () => {
    render(<UtilityBar />);
    expect(screen.getByRole("link", { name: /track order/i })).toBeInTheDocument();
  });

  it("renders Reseller Support link", () => {
    render(<UtilityBar />);
    expect(screen.getByRole("link", { name: /reseller support/i })).toBeInTheDocument();
  });

  it("renders language toggle (EN/BM)", () => {
    render(<UtilityBar />);
    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getByText("BM")).toBeInTheDocument();
  });

  it("has correct tel link href", () => {
    render(<UtilityBar />);
    const telLink = document.querySelector('a[href^="tel:"]');
    expect(telLink).toHaveAttribute("href", "tel:+603-2780-8888");
  });

  it("has correct mailto link href", () => {
    render(<UtilityBar />);
    const mailLink = document.querySelector('a[href^="mailto:"]');
    expect(mailLink).toHaveAttribute("href", "mailto:sales@channelfirst.com.my");
  });
});
