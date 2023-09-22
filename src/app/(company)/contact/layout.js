const title = "Contact - Correct Weight Scales";
const description =
  "Get in touch today There are multiple ways to contact Correct Weight Scales, the fastest way is to call us on 0402 980 089 or alternatively fill out the form below.";

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
    url: "https://cwscales.com.au/contact",
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

export default function ContactLayout({ children }) {
  return <div>{children}</div>;
}
