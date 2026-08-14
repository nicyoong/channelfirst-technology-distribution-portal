import { ReactNode } from "react";
import { UtilityBar, NavBar, Footer } from "@/components/layout";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <UtilityBar />
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
