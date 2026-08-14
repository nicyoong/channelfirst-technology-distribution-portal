/** @jest-environment jsdom */
import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals";
import { render, screen, act } from "@testing-library/react";
import { ToastProvider, useToast } from "@/contexts/toast-context";

function ToastConsumer() {
  const { toast, dismiss, toasts } = useToast();
  return (
    <div>
      <button onClick={() => toast({ title: "Hello", type: "info" })}>
        Show Info
      </button>
      <button onClick={() => toast({ title: "Success!", type: "success" })}>
        Show Success
      </button>
      <button onClick={() => toast({ title: "Error!", type: "error" })}>
        Show Error
      </button>
      <span data-testid="count">{toasts.length}</span>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <ToastProvider>
      <ToastConsumer />
    </ToastProvider>
  );
}

describe("ToastProvider", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders nothing when no toasts", () => {
    renderWithProvider();
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("shows a toast when toast() is called", () => {
    renderWithProvider();
    act(() => {
      screen.getByText("Show Info").click();
    });
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  it("applies correct styling for success type", () => {
    renderWithProvider();
    act(() => {
      screen.getByText("Show Success").click();
    });
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("bg-green-900");
  });

  it("applies correct styling for error type", () => {
    renderWithProvider();
    act(() => {
      screen.getByText("Show Error").click();
    });
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("bg-red-900");
  });

  it("applies correct styling for info type", () => {
    renderWithProvider();
    act(() => {
      screen.getByText("Show Info").click();
    });
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("bg-slate-800");
  });

  it("shows description when provided", () => {
    function Helper() {
      const { toast } = useToast();
      return (
        <button onClick={() => toast({ title: "Title", description: "Desc", type: "info" })}>
          trigger
        </button>
      );
    }
    render(
      <ToastProvider>
        <Helper />
      </ToastProvider>
    );
    act(() => {
      screen.getByText("trigger").click();
    });
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Desc")).toBeInTheDocument();
  });

  it("dismisses a toast when the dismiss button is clicked", () => {
    renderWithProvider();
    act(() => {
      screen.getByText("Show Info").click();
    });
    expect(screen.getByRole("alert")).toBeInTheDocument();
    const dismissBtn = screen.getByLabelText("Dismiss");
    act(() => {
      dismissBtn.click();
    });
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("auto-removes toast after 4 seconds", () => {
    renderWithProvider();
    act(() => {
      screen.getByText("Show Info").click();
    });
    expect(screen.getByRole("alert")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("supports multiple simultaneous toasts", () => {
    renderWithProvider();
    act(() => {
      screen.getByText("Show Info").click();
    });
    act(() => {
      screen.getByText("Show Success").click();
    });
    expect(screen.getAllByRole("alert")).toHaveLength(2);
  });

  it("throws when useToast is used outside provider", () => {
    function OutsideProvider() {
      useToast();
      return null;
    }
    expect(() => render(<OutsideProvider />)).toThrow(
      "useToast must be used within ToastProvider"
    );
  });
});
