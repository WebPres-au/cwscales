import {
  getProducts,
  getNavItems,
  getServerTags,
} from "./src/app/supabase-server";

export default async function sitemap() {
  const domain = process.env.VERCEL_URL || "https://cwscales.com.au";
  const products = await getProducts(supabase);
  const navigation = await getNavItems(supabase, true);
  const tags = await getServerTags(supabase);

  return [
    {
      url: `${domain}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 10,
    },
    ...navigation.company.map((page) => ({
      url: `${domain}${page.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 10,
    })),
    ...navigation.categories.flatMap((category) =>
      category.subcategories.map((subCategory) => ({
        url: `${domain}${subCategory.href}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 10,
      }))
    ),
    ...navigation.pages.map((page) => ({
      url: `${domain}${page.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 10,
    })),
    ...products.map((product) => ({
      url: `${domain}/product/${product.snake_case_name}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 10,
    })),
    ...tags.map((tag) => ({
      url: `${domain}/product-tag/${tag.snake_case_name}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 10,
    })),
  ];
}
