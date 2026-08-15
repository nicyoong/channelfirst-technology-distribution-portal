/** @jest-environment jsdom */
import { describe, it, expect, beforeEach, jest, afterEach } from "@jest/globals";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { ToastProvider, useToast } from "../toast-context";

function ToastConsumer() {
  const { toast, dismiss, toasts } = useToast();
  return (
    <div>
      <button onClick={() => toast({ type: "success", title: "Test Success" })}>
        Show Success
      </button>
      <button onClick={() => toast({ type: "error", title: "Test Error", description: "Something went wrong" })}>
        Show Error
      </button>
      <button onClick={() => toast({ type: "info", title: "Test Info" })}>
        Show Info
      </button>
      <button onClick={() => toast({ type: "success", title: "Auto-dismiss Test" })}>
        Show Auto
      </button>
      <span data-testid="toast-count">{toasts.length}</span>
    </div>
  );
}

describe("ToastProvider", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders children", () => {
    render(
      <ToastProvider>
        <div>Children content</div>
      </ToastProvider>
    );
    expect(screen.getByText("Children content")).toBeInTheDocument();
  });

  it("does not render toast container when no toasts", () => {
    render(
      <ToastProvider>
        <ToastConsumer />
      </ToastProvider>
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByTestId("toast-count")).toHaveTextContent("0");
  });

  it("shows success toast", () => {
    render(
      <ToastProvider>
        <ToastConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Show Success"));
    expect(screen.getByText("Test Success")).toBeInTheDocument();
    expect(screen.getByTestId("toast-count")).toHaveTextContent("1");
  });

  it("shows error toast with description", () => {
    render(
      <ToastProvider>
        <ToastConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Show Error"));
    expect(screen.getByText("Test Error")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("shows info toast", () => {
    render(
      <ToastProvider>
        <ToastConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Show Info"));
    expect(screen.getByText("Test Info")).toBeInTheDocument();
  });

  it("applies correct styling for success toast", () => {
    render(
      <ToastProvider>
        <ToastConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Show Success"));
    const toast = screen.getByText("Test Success").closest('div[role="alert"]');
    expect(toast).toHaveClass("bg-green-900");
  });

  it("applies correct styling for error toast", () => {
    render(
      <ToastProvider>
        <ToastConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Show Error"));
    const toast = screen.getByText("Test Error").closest('div[role="alert"]');
    expect(toast).toHaveClass("bg-red-900");
  });

  it("applies correct styling for info toast", () => {
    render(
      <ToastProvider>
        <ToastConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Show Info"));
    const toast = screen.getByText("Test Info").closest('div[role="alert"]');
    expect(toast).toHaveClass("bg-slate-800");
  });

  it("dismissing a toast removes it", () => {
    render(
      <ToastProvider>
        <ToastConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Show Success"));
    expect(screen.getByText("Test Success")).toBeInTheDocument();

    // Find and click the dismiss button
    const toast = screen.getByText("Test Success").closest('div[role="alert"]');
    fireEvent.click(toast!.querySelector("button")!);
    expect(screen.queryByText("Test Success")).not.toBeInTheDocument();
    expect(screen.getByTestId("toast-count")).toHaveTextContent("0");
  });

  it("auto-dismisses toast after 4 seconds", async () => {
    render(
      <ToastProvider>
        <ToastConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Show Auto"));
    expect(screen.getByText("Auto-dismiss Test")).toBeInTheDocument();

    // Advance timers by 4 seconds
    await act(async () => {
      jest.advanceTimersByTime(4000);
      await Promise.resolve();
    });
    expect(screen.queryByText("Auto-dismiss Test")).not.toBeInTheDocument();
    expect(screen.getByTestId("toast-count")).toHaveTextContent("0");
  });

  it("can show multiple toasts simultaneously", () => {
    render(
      <ToastProvider>
        <ToastConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Show Success"));
    fireEvent.click(screen.getByText("Show Error"));
    fireEvent.click(screen.getByText("Show Info"));

    expect(screen.getByText("Test Success")).toBeInTheDocument();
    expect(screen.getByText("Test Error")).toBeInTheDocument();
    expect(screen.getByText("Test Info")).toBeInTheDocument();
    expect(screen.getByTestId("toast-count")).toHaveTextContent("3");
  });

  it("each toast has a unique id", () => {
    render(
      <ToastProvider>
        <ToastConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Show Success"));
    fireEvent.click(screen.getByText("Show Success"));

    // Both toasts should be present
    const successToasts = screen.getAllByText("Test Success");
    expect(successToasts).toHaveLength(2);
  });
});

describe("useToast hook", () => {
  it("throws when used outside ToastProvider", () => {
    expect(() => render(<ToastConsumer />)).toThrow(
      "useToast must be used within ToastProvider"
    );
  });
});
