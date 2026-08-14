import React from "react";
import { render, screen } from "@testing-library/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./table";

describe("Table component", () => {
  it("renders table with children", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("wraps table in overflow-auto div", () => {
    const { container } = render(<Table />);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    expect((container.firstChild as HTMLElement).className).toContain("overflow-auto");
  });

  it("passes custom className through", () => {
    const { container } = render(<Table className="custom-table" />);
    expect((container.firstChild as HTMLElement).className).toContain("custom-table");
  });
});

describe("TableHeader component", () => {
  it("renders as thead element", () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Head</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );
    const thead = container.querySelector("thead");
    expect(thead).toBeInTheDocument();
  });

  it("applies border-bottom styling", () => {
    const { container } = render(<TableHeader />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("[&_tr]:border-b");
  });
});

describe("TableBody component", () => {
  it("renders as tbody element", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(container.querySelector("tbody")).toBeInTheDocument();
  });
});

describe("TableFooter component", () => {
  it("renders as tfoot element", () => {
    const { container } = render(
      <Table>
        <TableFooter>
          <TableRow>
            <TableCell>Footer</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
    expect(container.querySelector("tfoot")).toBeInTheDocument();
  });

  it("applies muted background styling", () => {
    const { container } = render(<TableFooter />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bg-muted/50");
  });
});

describe("TableHead component", () => {
  it("renders as th element", () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );
    expect(container.querySelector("th")).toBeInTheDocument();
    expect(screen.getByText("Header")).toBeInTheDocument();
  });

  it("applies text-left alignment", () => {
    const { container } = render(<TableHead>Head</TableHead>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("text-left");
    expect(el.className).toContain("font-medium");
  });
});

describe("TableRow component", () => {
  it("renders as tr element", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(container.querySelector("tr")).toBeInTheDocument();
  });

  it("applies hover and border styling", () => {
    const { container } = render(<TableRow />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("border-b");
    expect(el.className).toContain("hover:bg-muted/50");
  });
});

describe("TableCell component", () => {
  it("renders as td element", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByText("Cell Content")).toBeInTheDocument();
    expect(container.querySelector("td")).toBeInTheDocument();
  });

  it("applies padding styling", () => {
    const { container } = render(<TableCell>Cell</TableCell>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("p-4");
  });
});

describe("TableCaption component", () => {
  it("renders as caption element", () => {
    const { container } = render(
      <Table>
        <TableCaption>Caption Text</TableCaption>
      </Table>
    );
    expect(container.querySelector("caption")).toBeInTheDocument();
    expect(screen.getByText("Caption Text")).toBeInTheDocument();
  });

  it("applies muted foreground styling", () => {
    const { container } = render(<TableCaption>Caption</TableCaption>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("text-muted-foreground");
    expect(el.className).toContain("text-sm");
  });
});
