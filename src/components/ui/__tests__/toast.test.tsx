/** @jest-environment jsdom */
import { describe, it, expect, jest } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import { ToastProvider, useToast } from "@/contexts/toast-context";

function ToastTrigger() {
  const { toast } = useToast();
  return (
    <div>
      <button onClick={() => toast({ type: "success", title: "Test Toast" })}>
        Show Toast
      </button>
      <button
        onClick={() =>
          toast({ type: "info", title: "Title", description: "Description" })
        }
      >
        Show With Desc
      </button>
    </div>
  );
}

describe("Toast (via context)", () => {
  it("shows toast with title", () => {
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Show Toast"));
    expect(screen.getByText("Test Toast")).toBeInTheDocument();
  });

  it("shows toast with description", () => {
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Show With Desc"));
    expect(screen.getByText("Description")).toBeInTheDocument();
  });
});
