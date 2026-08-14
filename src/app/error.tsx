"use client";

import { useEffect } from "react";

export default function GlobalError() {
  useEffect(() => {
    // Client-side error boundary fallback
  }, []);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-surface">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold text-navy mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
