import Footer from "@/components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import Navigation from "../components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CW Scales | Home",
  description:
    "Homepage for CW Scales where you can learn about what we offer and access our various categories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
