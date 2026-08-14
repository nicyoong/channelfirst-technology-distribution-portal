/** @jest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from "@jest/globals";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges two static classes", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("later classes override earlier ones", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("merges conditional classes correctly", () => {
    const isActive = true;
    expect(cn("base", isActive && "active", !isActive && "inactive")).toBe(
      "base active"
    );
  });

  it("ignores falsy values (false, null, undefined, '')", () => {
    expect(cn("text-lg", false, null, undefined, "", "p-2")).toBe(
      "text-lg p-2"
    );
  });

  it("accepts arrays of classes", () => {
    expect(cn(["a", "b"], ["c", "d"])).toBe("a b c d");
  });

  it("accepts objects with conditional keys", () => {
    expect(cn({ "text-red-500": true, "text-green-500": false })).toBe(
      "text-red-500"
    );
  });

  it("accepts objects and strings mixed", () => {
    expect(cn("base", { "conditional": true })).toBe("base conditional");
  });

  it("handles duplicate class resolution (tailwind-merge dedup)", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("handles className propagation (typical component pattern)", () => {
    const userClass = "custom-override";
    expect(cn("base-classes", userClass)).toBe("base-classes custom-override");
  });

  it("returns empty string when no inputs", () => {
    expect(cn()).toBe("");
    expect(cn(undefined)).toBe("");
  });
});
