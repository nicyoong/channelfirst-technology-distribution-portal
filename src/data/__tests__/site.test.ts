import { describe, expect, it } from "@jest/globals";
import { testimonials, promotions, resellerTiers, events, branches } from "../site";

describe("site data", () => {
  it("exports testimonials", () => {
    expect(Array.isArray(testimonials)).toBe(true);
    expect(testimonials.length).toBeGreaterThan(0);
  });

  it("has 3 testimonials", () => {
    expect(testimonials).toHaveLength(3);
  });

  it("each testimonial has required fields", () => {
    testimonials.forEach((t) => {
      expect(t.name).toBeDefined();
      expect(t.role).toBeDefined();
      expect(t.company).toBeDefined();
      expect(t.rating).toBeDefined();
    });
  });

  it("exports promotions", () => {
    expect(Array.isArray(promotions)).toBe(true);
    expect(promotions.length).toBeGreaterThan(0);
  });

  it("has 3 promotions", () => {
    expect(promotions).toHaveLength(3);
  });

  it("exports reseller tiers", () => {
    expect(Array.isArray(resellerTiers)).toBe(true);
    expect(resellerTiers.length).toBe(3);
  });

  it("has Silver, Gold, and Platinum tiers", () => {
    const tierNames = resellerTiers.map((t) => t.name);
    expect(tierNames).toContain("Silver Partner");
    expect(tierNames).toContain("Gold Partner");
    expect(tierNames).toContain("Platinum Partner");
  });

  it("exports events", () => {
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
  });

  it("has 3 events", () => {
    expect(events).toHaveLength(3);
  });

  it("exports branches", () => {
    expect(Array.isArray(branches)).toBe(true);
    expect(branches.length).toBe(5);
  });

  it("has KL HQ branch", () => {
    const klBranch = branches.find((b) => b.type === "hq");
    expect(klBranch).toBeDefined();
    expect(klBranch?.name).toBe("Kuala Lumpur HQ");
  });

  it("has branches in different states", () => {
    const branchNames = branches.map((b) => b.name);
    expect(branchNames).toContain("Penang Branch");
    expect(branchNames).toContain("Johor Bahru Office");
    expect(branchNames).toContain("Kota Kinabalu Branch");
    expect(branchNames).toContain("Kuching Office");
  });
});
