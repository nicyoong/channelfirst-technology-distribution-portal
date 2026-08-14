import React from "react";
import { render, screen } from "@testing-library/react";
import { Toast, ToastTitle, ToastDescription, ToastClose } from "./toast";

describe("Toast component", () => {
  it("renders children content", () => {
    render(<Toast>Toast message</Toast>);
    expect(screen.getByText("Toast message")).toBeInTheDocument();
  });

  it("applies default variant styling", () => {
    const { container } = render(<Toast>Default</Toast>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("border-border");
    expect(el.className).toContain("bg-background");
  });

  it("applies destructive variant styling", () => {
    const { container } = render(<Toast variant="destructive">Error</Toast>);
    expect((container.firstChild as HTMLElement).className).toContain("border-destructive");
    expect((container.firstChild as HTMLElement).className).toContain("bg-destructive/10");
  });

  it("applies success variant styling", () => {
    const { container } = render(<Toast variant="success">Success</Toast>);
    expect((container.firstChild as HTMLElement).className).toContain("border-success");
    expect((container.firstChild as HTMLElement).className).toContain("bg-success/10");
  });

  it("applies warning variant styling", () => {
    const { container } = render(<Toast variant="warning">Warning</Toast>);
    expect((container.firstChild as HTMLElement).className).toContain("border-amber");
    expect((container.firstChild as HTMLElement).className).toContain("bg-amber/10");
  });

  it("passes custom className through", () => {
    const { container } = render(<Toast className="custom-toast">Toast</Toast>);
    expect((container.firstChild as HTMLElement).className).toContain("custom-toast");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Toast ref={ref}>Ref Test</Toast>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has pointer-events-auto by default", () => {
    const { container } = render(<Toast>Toast</Toast>);
    expect((container.firstChild as HTMLElement).className).toContain("pointer-events-auto");
  });
});

describe("ToastTitle component", () => {
  it("renders with font-semibold styling", () => {
    const { container } = render(<ToastTitle>Title</ToastTitle>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("font-semibold");
  });

  it("passes custom className through", () => {
    const { container } = render(<ToastTitle className="custom-title">Title</ToastTitle>);
    expect((container.firstChild as HTMLElement).className).toContain("custom-title");
  });
});

describe("ToastDescription component", () => {
  it("renders with opacity styling", () => {
    const { container } = render(<ToastDescription>Description</ToastDescription>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("opacity-90");
    expect(el.className).toContain("text-sm");
  });

  it("passes custom className through", () => {
    const { container } = render(<ToastDescription className="custom-desc">Desc</ToastDescription>);
    expect((container.firstChild as HTMLElement).className).toContain("custom-desc");
  });
});

describe("ToastClose component", () => {
  it("renders a button element", () => {
    render(<ToastClose aria-label="Close">X</ToastClose>);
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("passes custom className through", () => {
    const { container } = render(<ToastClose className="custom-close" />);
    expect((container.firstChild as HTMLElement).className).toContain("custom-close");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ToastClose ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
