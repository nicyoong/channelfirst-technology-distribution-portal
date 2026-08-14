import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — ChannelFirst Technology",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-surface">
      <div className="text-center px-4">
        <div className="inline-flex rounded-full bg-amber-100 p-4 mb-6">
          <AlertCircle className="h-10 w-10 text-amber-600" />
        </div>
        <h1 className="text-6xl font-bold text-navy mb-2">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground max-w-md mb-8">
          The page you are looking for may have been moved, deleted, or does not
          exist. Please check the URL or return to the homepage.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Homepage
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="gap-2">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
