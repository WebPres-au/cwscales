import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/ui/Layout";

const inter = Inter({ subsets: ["latin"] });

const title =
  "Correct Weight Scales - Digital Scales, Weighing Equipment, Scale repairs Melbourne";
const description =
  "Welcome to Correct Weight Scales! Correct Weight Scales has derived from over 20 years experience in the Weighing and Packaging Industry. We can assist in helping your business weighing applications through the perfect combination of unsurpassed experience and loyal committed customer service that is unfortunately hard";

export const metadata = {
  title,
  description,
  keywords: [
    "Correct Weight Scales Melbourne",
    "Digital Weighing Scales",
    "Weighbridge Calibration",
    "Packaging Equipment",
    "Weighing Equipment Repairs",
    "NMI Verification Services",
    "Weighing Scales Hire Melbourne",
    "Preventative Maintenance Agreement",
    "24/7 Weighing Equipment Service",
    "Laboratory Balances",
    "Large Scale Batching Equipment",
    "Expert Weighing Solutions",
    "Competitive Equipment Sales",
    "Weighing Project Hire",
    "Stocktake Scales",
    "Industrial Weighing Solutions",
    "Retail Scale Solutions",
    "Medical Weighing Equipment",
    "Oil Industry Scales",
    "Logistics Weighing Solutions",
    "Household Scales",
    "Manufacturing Weighing Solutions",
    "Food Processing Scales",
    "WEIGHBRIDGES Melbourne",
  ],
  openGraph: {
    title,
    description,
    url: "https://cwscales.com.au",
    type: "website",
    images: [
      {
        url: "/banner/bakery.jpg",
        width: 500,
        height: 500,
        alt: "An image of a scale with flower in a bakery",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
