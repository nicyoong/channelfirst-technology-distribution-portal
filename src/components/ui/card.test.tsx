import React from "react";
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";

describe("Card component", () => {
  it("renders children correctly", () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("applies default card styling", () => {
    const { container } = render(<Card>Card</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("rounded-xl");
    expect(el.className).toContain("border-border");
    expect(el.className).toContain("shadow-sm");
  });

  it("passes custom className through", () => {
    const { container } = render(<Card className="custom-card">Card</Card>);
    expect((container.firstChild as HTMLElement).className).toContain("custom-card");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Ref Test</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("CardHeader component", () => {
  it("renders with flex column layout", () => {
    const { container } = render(<CardHeader><CardTitle>Header</CardTitle></CardHeader>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("flex");
    expect(el.className).toContain("flex-col");
    expect(el.className).toContain("space-y-1.5");
    expect(el.className).toContain("p-5");
  });

  it("passes custom className through", () => {
    const { container } = render(<CardHeader className="my-header">Header</CardHeader>);
    expect((container.firstChild as HTMLElement).className).toContain("my-header");
  });
});

describe("CardTitle component", () => {
  it("renders as an h3 element", () => {
    render(<CardTitle>Card Title</CardTitle>);
    expect(screen.getByRole("heading", { level: 3, name: /card title/i })).toBeInTheDocument();
  });

  it("applies font styles", () => {
    const { container } = render(<CardTitle>Title</CardTitle>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("font-semibold");
    expect(el.className).toContain("text-base");
  });
});

describe("CardDescription component", () => {
  it("renders as a paragraph element", () => {
    render(<CardDescription>Card Description</CardDescription>);
    expect(screen.getByText("Card Description")).toBeInTheDocument();
  });

  it("applies muted foreground styling", () => {
    const { container } = render(<CardDescription>Desc</CardDescription>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("text-muted-foreground");
    expect(el.className).toContain("text-sm");
  });
});

describe("CardContent component", () => {
  it("renders with correct padding", () => {
    const { container } = render(<CardContent>Content</CardContent>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("p-5");
    expect(el.className).toContain("pt-0");
  });

  it("passes custom className through", () => {
    const { container } = render(<CardContent className="my-content">Content</CardContent>);
    expect((container.firstChild as HTMLElement).className).toContain("my-content");
  });
});

describe("CardFooter component", () => {
  it("renders with flex layout and padding", () => {
    const { container } = render(<CardFooter>Footer</CardFooter>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("flex");
    expect(el.className).toContain("items-center");
    expect(el.className).toContain("p-5");
    expect(el.className).toContain("pt-0");
  });
});
