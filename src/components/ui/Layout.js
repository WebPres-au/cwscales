"use client";

import Navigation from "./Navigation";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pageName = usePathname();

  const isAdmin =
    pageName.startsWith("/admin") || pageName.startsWith("/dashboard");

  return (
    <div>
      {isAdmin ? (
        children
      ) : (
        <>
          <Navigation />
          {children}
          <Footer />
        </>
      )}
    </div>
  );
}
