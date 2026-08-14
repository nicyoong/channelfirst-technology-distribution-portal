/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import {
  testimonials,
  promotions,
  resellerTiers,
  events,
  branches,
} from "@/data/site";
import type { Testimonial, Promotion, ResellerTier, Event, Branch } from "@/data/site";

describe("testimonials", () => {
  it("has 3 testimonials", () => {
    expect(testimonials).toHaveLength(3);
  });

  it("each testimonial has required fields", () => {
    const required: (keyof Testimonial)[] = ["name", "role", "company", "quote", "rating"];
    testimonials.forEach((t) => {
      required.forEach((field) => {
        expect(t[field]).toBeDefined();
        expect(String(t[field]).length).toBeGreaterThan(0);
      });
    });
  });

  it("ratings are between 1 and 5", () => {
    testimonials.forEach((t) => {
      expect(t.rating).toBeGreaterThanOrEqual(1);
      expect(t.rating).toBeLessThanOrEqual(5);
    });
  });
});

describe("promotions", () => {
  it("has 3 promotions", () => {
    expect(promotions).toHaveLength(3);
  });

  it("each promotion has required fields", () => {
    const required: (keyof Promotion)[] = ["id", "title", "description", "validity", "tag", "badge"];
    promotions.forEach((p) => {
      required.forEach((field) => {
        expect(p[field]).toBeDefined();
        expect(String(p[field]).length).toBeGreaterThan(0);
      });
    });
  });

  it("has distinct promotion IDs", () => {
    const ids = promotions.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("resellerTiers", () => {
  it("has 3 tiers", () => {
    expect(resellerTiers).toHaveLength(3);
  });

  it("Gold tier is highlighted", () => {
    const gold = resellerTiers.find((t) => t.name === "Gold Partner");
    expect(gold).toBeDefined();
    expect(gold?.highlight).toBe(true);
  });

  it("only one tier is highlighted", () => {
    const highlighted = resellerTiers.filter((t) => t.highlight);
    expect(highlighted).toHaveLength(1);
  });

  it("each tier has benefits array", () => {
    resellerTiers.forEach((t) => {
      expect(Array.isArray(t.benefits)).toBe(true);
      expect(t.benefits.length).toBeGreaterThan(0);
    });
  });

  it("tiers are ordered by spend ascending", () => {
    const spends = resellerTiers.map((t) =>
      parseInt(t.minAnnualSpend.replace(/[^0-9]/g, ""), 10)
    );
    expect(spends).toEqual([...spends].sort((a, b) => a - b));
  });
});

describe("events", () => {
  it("has 3 events", () => {
    expect(events).toHaveLength(3);
  });

  it("each event has required fields", () => {
    const required: (keyof Event)[] = [
      "id", "title", "date", "time", "location", "seats", "available", "description", "tags",
    ];
    events.forEach((e) => {
      required.forEach((field) => {
        expect(e[field]).toBeDefined();
      });
    });
  });

  it("available seats never exceed total seats", () => {
    events.forEach((e) => {
      expect(e.available).toBeLessThanOrEqual(e.seats);
      expect(e.available).toBeGreaterThanOrEqual(0);
    });
  });

  it("has distinct event IDs", () => {
    const ids = events.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("branches", () => {
  it("has 5 branches", () => {
    expect(branches).toHaveLength(5);
  });

  it("has exactly one HQ", () => {
    const hqs = branches.filter((b) => b.type === "hq");
    expect(hqs).toHaveLength(1);
    expect(hqs[0].name).toBe("Kuala Lumpur HQ");
  });

  it("each branch has required fields", () => {
    const required: (keyof Branch)[] = ["name", "address", "phone", "email", "hours", "type"];
    branches.forEach((b) => {
      required.forEach((field) => {
        expect(String(b[field]).length).toBeGreaterThan(0);
      });
    });
  });

  it("branch emails use channelfirst.com.my domain", () => {
    branches.forEach((b) => {
      expect(b.email).toContain("@channelfirst.com.my");
    });
  });
});
