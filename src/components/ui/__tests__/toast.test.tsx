/** @jest-environment jsdom */
import { describe, it, expect, jest } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import { toast } from "@/components/ui/toast";

describe("Toast", () => {
  it("shows toast with title", () => {
    render(
      <div>
        <button onClick={() => toast({ title: "Test Toast" })}>Show Toast</button>
      </div>
    );
    
    fireEvent.click(screen.getByText("Show Toast"));
    
    expect(screen.getByText("Test Toast")).toBeInTheDocument();
  });

  it("shows toast with description", () => {
    render(
      <div>
        <button onClick={() => toast({ title: "Title", description: "Description" })}>
          Show Toast
        </button>
      </div>
    );
    
    fireEvent.click(screen.getByText("Show Toast"));
    
    expect(screen.getByText("Description")).toBeInTheDocument();
  });
});
