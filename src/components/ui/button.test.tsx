import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button, buttonVariants } from "./button";

describe("Button component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("applies default variant (primary)", () => {
    const { container } = render(<Button>Primary</Button>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bg-primary");
    expect(el.className).toContain("text-primary-foreground");
  });

  it("applies secondary variant classes", () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container.firstChild as HTMLElement).toHaveClass("bg-secondary");
  });

  it("applies outline variant classes", () => {
    const { container } = render(<Button variant="outline">Outline</Button>);
    expect(container.firstChild as HTMLElement).toHaveClass("border-border");
  });

  it("applies ghost variant classes", () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>);
    expect(container.firstChild as HTMLElement).toHaveClass("hover:bg-accent");
  });

  it("applies link variant classes", () => {
    const { container } = render(<Button variant="link">Link</Button>);
    expect(container.firstChild as HTMLElement).toHaveClass("text-primary");
  });

  it("applies danger variant classes", () => {
    const { container } = render(<Button variant="danger">Danger</Button>);
    expect(container.firstChild as HTMLElement).toHaveClass("bg-destructive");
  });

  it("applies amber variant classes", () => {
    const { container } = render(<Button variant="amber">Amber</Button>);
    expect(container.firstChild as HTMLElement).toHaveClass("bg-amber");
  });

  it("applies size variants correctly", () => {
    const { container: sm } = render(<Button size="sm">Small</Button>);
    expect((sm.firstChild as HTMLElement).className).toContain("h-9");
    expect((sm.firstChild as HTMLElement).className).toContain("px-3");
    expect((sm.firstChild as HTMLElement).className).toContain("text-xs");

    const { container: md } = render(<Button size="md">Medium</Button>);
    expect((md.firstChild as HTMLElement).className).toContain("h-10");
    expect((md.firstChild as HTMLElement).className).toContain("px-4");

    const { container: lg } = render(<Button size="lg">Large</Button>);
    expect((lg.firstChild as HTMLElement).className).toContain("h-12");
    expect((lg.firstChild as HTMLElement).className).toContain("px-8");
    expect((lg.firstChild as HTMLElement).className).toContain("text-base");

    const { container: icon } = render(<Button size="icon">Icon</Button>);
    expect((icon.firstChild as HTMLElement).className).toContain("h-10");
    expect((icon.firstChild as HTMLElement).className).toContain("w-10");
  });

  it("passes disabled state correctly", () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeDisabled();
    expect(el.className).toContain("disabled:opacity-50");
  });

  it("handles click events", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("passes custom className through", () => {
    const { container } = render(<Button className="my-custom">Custom</Button>);
    expect((container.firstChild as HTMLElement).className).toContain("my-custom");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Test</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("exposes buttonVariants export", () => {
    expect(buttonVariants).toBeDefined();
    expect(typeof buttonVariants).toBe("function");
  });

  it("supports inline gap for icon layouts", () => {
    const { container } = render(
      <Button className="gap-4">
        <span>Icon</span>
        Text
      </Button>
    );
    expect((container.firstChild as HTMLElement).className).toContain("gap-4");
  });
});
