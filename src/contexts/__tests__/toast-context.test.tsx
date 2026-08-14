/** @jest-environment jsdom */
import { describe, it, expect, jest } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import { ToastProvider, useToast } from "@/contexts/toast-context";

describe("ToastContext", () => {
  it("renders toast provider", () => {
    render(
      <ToastProvider>
        <div>Test</div>
      </ToastProvider>
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("shows toast with type success", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    fireEvent.click(screen.getByText("Show Success Toast"));
    
    expect(screen.getByText("Success Title")).toBeInTheDocument();
    expect(screen.getByText("Success description")).toBeInTheDocument();
  });

  it("shows toast with type error", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    fireEvent.click(screen.getByText("Show Error Toast"));
    
    expect(screen.getByText("Error Title")).toBeInTheDocument();
    expect(screen.getByText("Error description")).toBeInTheDocument();
  });

  it("shows toast with type warning", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    fireEvent.click(screen.getByText("Show Warning Toast"));
    
    expect(screen.getByText("Warning Title")).toBeInTheDocument();
    expect(screen.getByText("Warning description")).toBeInTheDocument();
  });

  it("shows toast with type info", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    fireEvent.click(screen.getByText("Show Info Toast"));
    
    expect(screen.getByText("Info Title")).toBeInTheDocument();
    expect(screen.getByText("Info description")).toBeInTheDocument();
  });
});

function TestComponent() {
  const { toast } = useToast();
  
  return (
    <div>
      <button onClick={() => toast({ type: "success", title: "Success Title", description: "Success description" })}>
        Show Success Toast
      </button>
      <button onClick={() => toast({ type: "error", title: "Error Title", description: "Error description" })}>
        Show Error Toast
      </button>
      <button onClick={() => toast({ type: "warning", title: "Warning Title", description: "Warning description" })}>
        Show Warning Toast
      </button>
      <button onClick={() => toast({ type: "info", title: "Info Title", description: "Info description" })}>
        Show Info Toast
      </button>
    </div>
  );
}
