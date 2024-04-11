import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import SupabaseProvider from "./supabase-provider";
import { Analytics } from "@vercel/analytics/react"

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

const title = {
  default:
    "Correct Weight Scales - Digital Scales, Weighing Equipment, Scale repairs Melbourne",
  template: "%s | Correct Weight Scales",
};
("Correct Weight Scales - Digital Scales, Weighing Equipment, Scale repairs Melbourne");
const description =
  "Welcome to Correct Weight Scales! Correct Weight Scales has derived from over 20 years experience in the Weighing and Packaging Industry. We can assist in helping your business weighing applications through the perfect combination of unsurpassed experience and loyal committed customer service that is unfortunately hard";

export const metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
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
    "Weighbridges Melbourne",
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
      <Script id="google-analyticds">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-W9R3N59N')`}
      </Script>
      <body className={inter.className}>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-W9R3N59N"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
        <SupabaseProvider>
          <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
          {children}
          <Analytics />
        </SupabaseProvider>
      </body>
    </html>
  );
}
