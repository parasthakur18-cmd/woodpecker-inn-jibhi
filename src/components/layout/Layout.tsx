import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyBookingBar } from "../StickyBookingBar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <StickyBookingBar />
    </div>
  );
};
