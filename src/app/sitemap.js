// import {
//   getProducts,
//   getNavItems,
//   getServerTags,
// } from "./supabase-server";
import { snake_case_string } from "@/lib/functions";
import { createServerClient } from "@/lib/supabase/server";

export default async function sitemap() {
  const supabase = await createServerClient();

  const domain = process.env.VERCEL_URL || "https://cwscales.com.au";

  const getServerTags = async () => {
    try {
      const { data, error } = await supabase.from("tags").select();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  };

  const getProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*");

      if (error) throw error;

      const products = data;

      return products;
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const getNavItems = async (hasStaticPages = false) => {
    try {
      const { data: categories, error } = await supabase.rpc("get_categories");

      if (error) throw error;

      let navigation = {
        categories: [],
        pages: [],
        company: [],
      };

      for (const category of categories) {
        if (category.subcategories && category.subcategories.length > 0) {
          navigation.categories.push({
            name: category.name,
            subcategories: [
              ...category.subcategories
                .filter((cat) => !cat.isFeatured)
                .map((sub) => ({
                  name: sub.name,
                  href: `/product-category/${snake_case_string(
                    category.name
                  )}/${snake_case_string(sub.name)}`,
                })),
              {
                name: "Browse All",
                href: `/product-category/${snake_case_string(category.name)}`,
              },
            ],
            featured: await Promise.all(
              category.subcategories
                .filter((cat) => cat.isFeatured)
                .map(async (sub) => ({
                  name: sub.name,
                  href: `/product-category/${snake_case_string(
                    category.name
                  )}/${snake_case_string(sub.name)}`,
                }))
            ),
          });
        } else {
          navigation.pages.push({
            name: category.name,
            href: `/product-category/${snake_case_string(category.name)}`,
          });
        }
      }

      if (hasStaticPages) {
        navigation.pages.push(
          {
            name: "Repairs & Calibration",
            href: "/service-repairs-calibration",
          },
          {
            name: "Scale Hire",
            href: "/service-repairs-calibration/scales-hire",
          }
        );
      }
      if (hasStaticPages) {
        navigation.company.push(
          { name: "About", href: "/about" },
          { name: "Contact", href: "/contact" },
          { name: "Privacy & Terms", href: "/privacy-terms" }
        );
      }

      return navigation;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const products = await getProducts();
  const navigation = await getNavItems(true);
  const tags = await getServerTags();

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
