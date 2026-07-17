import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingCTA } from "../FloatingCTA";
import { LeadCapturePopupLoader } from "../LeadCapturePopupLoader";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pb-20 lg:pb-0">{children}</main>
      <Footer />
      <FloatingCTA />
      <LeadCapturePopupLoader />
    </div>
  );
};
