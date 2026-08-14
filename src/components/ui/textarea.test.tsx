import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./textarea";

describe("Textarea component", () => {
  it("renders a textarea element", () => {
    render(<Textarea placeholder="Enter message" />);
    expect(screen.getByPlaceholderText("Enter message")).toBeInTheDocument();
  });

  it("accepts and displays value", async () => {
    render(<Textarea placeholder="Type here" />);
    const textarea = screen.getByPlaceholderText("Type here") as HTMLTextAreaElement;
    const user = userEvent.setup();
    await user.type(textarea, "Hello\nWorld");
    expect(textarea.value).toBe("Hello\nWorld");
  });

  it("applies rows attribute", () => {
    render(<Textarea rows={5} />);
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.rows).toBe(5);
  });

  it("is disabled when disabled prop is passed", () => {
    render(<Textarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("passes custom className through", () => {
    const { container } = render(<Textarea className="custom-textarea" />);
    expect((container.firstChild as HTMLElement).className).toContain("custom-textarea");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("renders with standard styling classes", () => {
    const { container } = render(<Textarea />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("min-h-");
    expect(el.className).toContain("w-full");
    expect(el.className).toContain("border");
  });
});
