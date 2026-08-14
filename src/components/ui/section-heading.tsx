import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

const SectionHeading = React.forwardRef<HTMLDivElement, SectionHeadingProps>(
  ({ eyebrow, title, subtitle, align = "left", className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mb-8",
          align === "center" && "text-center",
          className
        )}
      >
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-base text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);
SectionHeading.displayName = "SectionHeading";

export { SectionHeading };
