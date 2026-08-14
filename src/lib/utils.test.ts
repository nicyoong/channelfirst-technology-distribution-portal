import { cn } from "./utils";

describe("cn (utility)", () => {
  it("returns a single class name unchanged", () => {
    expect(cn("px-4")).toBe("px-4");
  });

  it("merges multiple classes correctly", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("merges Tailwind classes with clsx logic (conditional truthy/falsy)", () => {
    const enabled = true;
    expect(cn("base", enabled && "conditional")).toBe("base conditional");
    expect(cn("base", enabled && false && "not-included")).toBe("base");
  });

  it("overrides conflicting Tailwind utility classes via twMerge", () => {
    // twMerge ensures later classes win on conflicts
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    expect(cn("m-4", "m-2")).toBe("m-2");
  });

  it("handles empty inputs gracefully", () => {
    expect(cn()).toBe("");
    expect(cn("", null, undefined, false)).toBe("");
  });

  it("passes through arbitrary object values (clsx behavior)", () => {
    expect(cn({ active: true, hidden: false })).toBe("active");
  });

  it("preserves custom class names that do not conflict", () => {
    expect(cn("my-custom-class", "rounded-xl")).toBe("my-custom-class rounded-xl");
  });

  it("does not mutate the original input arrays", () => {
    const input = ["foo", "bar"];
    cn(input);
    expect(input).toEqual(["foo", "bar"]);
  });
});
