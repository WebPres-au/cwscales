const title = "Scales Hire - Correct Weight Scales";
const description =
  "Correct Weight Scales offer a Large range of Hire Scales to suit all Industries and Hire Periods. Floor Scales, Counting Scales, Platform Scales, Table Scales, Linear Weighers, Crane Scales Contact Us Now To Discuss Your Short or Long Term HIRE OPTIONS";

export const metadata = {
  title,
  description,
  keywords: [
    "Hire Scales",
    "Scales for All Industries",
    "Short Term Hire Scales",
    "Long Term Hire Scales",
    "Floor Scales",
    "Counting Scales",
    "Platform Scales",
    "Table Scales",
    "Linear Weighers",
    "Crane Scales",
    "Scales for Hire",
    "Industrial Scales Hire",
    "Commercial Scale Rental",
    "Hire Period Options",
  ],
  openGraph: {
    title,
    description,
    url: "https://cwscales.com.au/service-repairs-calibration/scales-hire/",
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

export default function ScalesHireLayout({ children }) {
  return <div>{children}</div>;
}
