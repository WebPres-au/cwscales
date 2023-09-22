import {
  normalPages,
  digitalWeighingPages,
  packagingPages,
  extraServices,
} from "@/lib/data";

export default function sitemap() {
  const domain = process.env.VERCEL_URL || "https://cwscales.com.au";
  return [
    ...normalPages.map((page) => ({
      url: `${domain}/${page}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    })),
    ...digitalWeighingPages.map((page) => ({
      url: `${domain}/${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    })),
    ...packagingPages.map((page) => ({
      url: `${domain}/${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    })),
    ...extraServices.map((page) => ({
      url: `${domain}/${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    })),
  ];
}
