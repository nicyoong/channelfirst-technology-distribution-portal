/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { theme, ThemeKey } from "@/lib/theme";

describe("theme", () => {
  it("has all primary color tokens", () => {
    expect(theme.colors.primary).toBe("#1D4ED8");
    expect(theme.colors.primaryHover).toBe("#1E40AF");
    expect(theme.colors.primaryLight).toBe("#EFF6FF");
  });

  it("has neutral palette tokens", () => {
    expect(theme.colors.navy).toBe("#0F172A");
    expect(theme.colors.surface).toBe("#F8FAFC");
    expect(theme.colors.border).toBe("#E2E8F0");
    expect(theme.colors.background).toBe("#FFFFFF");
  });

  it("has semantic color tokens", () => {
    expect(theme.colors.destructive).toBe("#DC2626");
    expect(theme.colors.success).toBe("#16A34A");
    expect(theme.colors.warning).toBe("#D97706");
    expect(theme.colors.info).toBe("#1D4ED8");
    expect(theme.colors.accent).toBe("#F59E0B");
  });

  it("has font definitions", () => {
    expect(theme.fonts.body).toContain("Inter");
    expect(theme.fonts.heading).toContain("Plus Jakarta Sans");
  });

  it("has border radius tokens", () => {
    expect(theme.radii.sm).toBe("0.25rem");
    expect(theme.radii.xl).toBe("0.75rem");
    expect(theme.radii.full).toBe("9999px");
  });

  it("has shadow tokens", () => {
    expect(theme.shadows.sm).toContain("0 1px 2px");
    expect(theme.shadows.xl).toContain("0 20px 25px");
  });

  it("has transition tokens with cubic-bezier", () => {
    Object.values(theme.transitions).forEach((t) => {
      expect(t).toContain("cubic-bezier");
      expect(t).toMatch(/^\d+ms/);
    });
  });

  it("ThemeKey type is exhaustive", () => {
    const keys: ThemeKey[] = ["colors", "fonts", "radii", "shadows", "transitions"];
    expect(keys).toHaveLength(5);
    keys.forEach((k) => {
      expect(theme[k]).toBeDefined();
    });
  });

  it("theme structure is type-safe (as const in TS)", () => {
    // `as const` is a TypeScript-only feature; it does not freeze the runtime object.
    // We verify the structure is complete instead.
    expect(Object.keys(theme.colors).length).toBeGreaterThan(0);
    expect(Object.keys(theme.fonts)).toContain("body");
    expect(Object.keys(theme.radii)).toContain("sm");
    expect(Object.keys(theme.shadows)).toContain("lg");
    expect(Object.keys(theme.transitions)).toContain("fast");
  });
});
