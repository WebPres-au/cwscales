import Footer from "@/components/ui/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/components/ui/Navigation";
import { Toaster } from "react-hot-toast";

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
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
