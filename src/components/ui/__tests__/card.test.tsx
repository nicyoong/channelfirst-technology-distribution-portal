/** @jest-environment jsdom */
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

describe("Card", () => {
  it("renders card with content", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("applies custom className to Card", () => {
    const { container } = render(
      <Card className="custom-card"><CardContent>Body</CardContent></Card>
    );
    expect(container.firstChild).toHaveClass("custom-card");
  });

  it("CardTitle renders as h3", () => {
    const { container } = render(
      <Card><CardHeader><CardTitle>Title</CardTitle></CardHeader></Card>
    );
    expect(container.querySelector("h3")).toBeInTheDocument();
  });

  it("CardDescription renders as p", () => {
    const { container } = render(
      <Card><CardHeader><CardDescription>Desc</CardDescription></CardHeader></Card>
    );
    expect(container.querySelector("p")).toBeInTheDocument();
  });
});
