import { theme, ThemeKey } from "./theme";

describe("theme", () => {
  it("exports a non-empty theme object", () => {
    expect(theme).toBeDefined();
    expect(typeof theme).toBe("object");
  });

  it("contains expected color keys", () => {
    const expectedColors = [
      "primary",
      "primaryHover",
      "primaryLight",
      "navy",
      "surface",
      "border",
      "background",
      "muted",
      "mutedForeground",
      "accent",
      "accentForeground",
      "destructive",
      "success",
      "warning",
      "info",
    ];
    expectedColors.forEach((key) => {
      expect(theme.colors).toHaveProperty(key);
      expect(typeof theme.colors[key as keyof typeof theme.colors]).toBe("string");
    });
  });

  it("color values are valid hex color strings", () => {
    Object.values(theme.colors).forEach((value) => {
      expect(value).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  it("contains fonts configuration", () => {
    expect(theme.fonts).toBeDefined();
    expect(theme.fonts.body).toContain("Inter");
    expect(theme.fonts.heading).toContain("Plus Jakarta Sans");
  });

  it("contains radii configuration", () => {
    expect(theme.radii.sm).toBe("0.25rem");
    expect(theme.radii.md).toBe("0.375rem");
    expect(theme.radii.lg).toBe("0.5rem");
    expect(theme.radii.xl).toBe("0.75rem");
    expect(theme.radii.full).toBe("9999px");
  });

  it("contains shadows configuration", () => {
    expect(theme.shadows.sm).toBeDefined();
    expect(theme.shadows.md).toBeDefined();
    expect(theme.shadows.lg).toBeDefined();
    expect(theme.shadows.xl).toBeDefined();
  });

  it("contains transitions configuration", () => {
    expect(theme.transitions.fast).toMatch(/150ms/);
    expect(theme.transitions.base).toMatch(/200ms/);
    expect(theme.transitions.slow).toMatch(/300ms/);
  });

  it("ThemeKey type includes all top-level keys", () => {
    const keys: ThemeKey[] = ["colors", "fonts", "radii", "shadows", "transitions"];
    expect(keys).toEqual(Object.keys(theme));
  });

  it("theme values are correct", () => {
    expect(theme.colors.primary).toBe("#1D4ED8");
    expect(theme.colors.navy).toBe("#0F172A");
    expect(theme.colors.success).toBe("#16A34A");
  });
});
