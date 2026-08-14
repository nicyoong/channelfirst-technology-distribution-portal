/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Card } from "@/components/ui/card";

describe("Card", () => {
  it("renders card with content", () => {
    render(
      <Card>
        <div>Card Content</div>
      </Card>
    );
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <Card className="custom-card">
        <div>Content</div>
      </Card>
    );
    const card = screen.getByText("Content").parentElement;
    expect(card).toHaveClass("custom-card");
  });

  it("renders card header", () => {
    render(
      <Card>
        <div className="p-6">
          <div className="flex flex-col space-y-1.5 pb-6">
            <h3 className="font-semibold tracking-tight">Card Title</h3>
            <p className="text-sm text-muted-foreground">Card Description</p>
          </div>
          <div>Content</div>
        </div>
      </Card>
    );
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card Description")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders card with no content", () => {
    render(<Card />);
    expect(screen.getByRole("region")).toBeInTheDocument();
  });
});
