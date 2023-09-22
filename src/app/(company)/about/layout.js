const title = "About us - Correct Weight Scales";
const description =
  "Correct Weight Scales is and Australian owned and ran company and has derived from over 20 years of experience in the Weighing and Packaging Industry. Our experience covers all facets of the Weighing and Packaging industry including Manufacturing, Breakdown and, Fault Finding, Technical Support, Report writing, Calibration and Verification Services.";

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
    url: "https://cwscales.com.au/about-us",
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

export default function AboutLayout({ children }) {
  return <div>{children}</div>;
}
