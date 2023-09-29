import { snake_case_string } from "@/lib/functions";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient({ cookies })
);

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export const getSignedUrl = async (image, bucket) => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(image.image_path, 60);

  if (error) throw error; // Log error

  return data.signedUrl;
};

export const getProducts = async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("products").select(`
    *,
    product_categories (
      categories (
        id,
        name
      )
    ),
    product_tags (
      tags (
        id,
        name
      )
    ),
    product_images (
      id,
      image_path
    )
  `);

  if (error) {
    console.error(error.message);
    return [];
  }

  // Create an array of Promises that resolve to the transformed product objects
  const transformedDataPromises = data.map(async (product) => {
    const categories = product.product_categories.map((pc) => pc.categories);
    const tags = product.product_tags.map((pt) => pt.tags);

    // Await all the signed URLs and create the images array
    const images = await Promise.all(
      product.product_images.map(async (image) => {
        return {
          ...image,
          signedUrl: await getSignedUrl(image, "product-images"),
        };
      })
    );

    return {
      ...product,
      categories,
      tags,
      images,
    };
  });

  // Wait for all Promises to resolve and return the transformed data
  return await Promise.all(transformedDataPromises);
};

export const getFilteredProducts = async (categoryName) => {
  const supabase = createServerSupabaseClient();

  // 1. Fetch the ID of the category by its name
  const { data: categoriesData, error: categoriesError } = await supabase
    .from("categories")
    .select("id")
    .eq("snake_case_name", categoryName);

  if (categoriesError || !categoriesData || categoriesData.length === 0) {
    console.error(
      categoriesError?.message || `No category found for name: ${categoryName}`
    );
    return [];
  }

  const categoryId = categoriesData[0].id;

  // 2. Recursively fetch all subcategories of the given category using the ID
  const fetchSubcategories = async (categoryId) => {
    const { data: subcategoriesData, error: subcategoriesError } =
      await supabase
        .from("categories")
        .select("id")
        .eq("parent_category", categoryId);

    if (subcategoriesError) {
      console.error(subcategoriesError.message);
      return [];
    }

    let subcategories = subcategoriesData || [];
    for (const subcategory of subcategoriesData) {
      const children = await fetchSubcategories(subcategory.id);
      subcategories = subcategories.concat(children);
    }
    return subcategories;
  };

  const allCategories = [
    { id: categoryId },
    ...(await fetchSubcategories(categoryId)),
  ];

  // 3. Fetch all products and their categories, tags and images
  const { data, error } = await supabase.from("products").select(`
      *,
      product_categories (
        categories (
          id,
          name
        )
      ),
      product_tags (
        tags (
          id,
          name
        )
      ),
      product_images (
        id,
        image_path
      )
    `);

  if (error) {
    console.error(error.message);
    return [];
  }

  // Create an array of Promises that resolve to the transformed product objects
  const transformedDataPromises = data.map(async (product) => {
    const categories = product.product_categories.map((pc) => pc.categories);
    const tags = product.product_tags.map((pt) => pt.tags);

    // Await all the signed URLs and create the images array
    const images = await Promise.all(
      product.product_images.map(async (image) => {
        return {
          ...image,
          signedUrl: await getSignedUrl(image, "product-images"),
        };
      })
    );

    return {
      ...product,
      categories,
      tags,
      images,
    };
  });

  // Wait for all Promises to resolve and get the transformed data
  const transformedData = await Promise.all(transformedDataPromises);

  // 4. Filter products based on the category and its subcategories IDs
  return transformedData.filter((product) =>
    product.categories.some((category) =>
      allCategories.map((c) => c.id).includes(category.id)
    )
  );
};

export const getServerCategories = async (hasNoSubcategories = false) => {
  const supabase = createServerSupabaseClient();
  try {
    if (hasNoSubcategories) {
      const { data, error } = await supabase
        .from("categories")
        .select()
        .is("parent_category", null);
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase.from("categories").select();
      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

export const getNavItems = async () => {
  const supabase = createServerSupabaseClient();

  try {
    const { data: categories, error } = await supabase.rpc("get_categories");

    if (error) throw error;

    let navigation = {
      categories: [],
      pages: [],
    };

    for (const category of categories) {
      if (category.subcategories && category.subcategories.length > 0) {
        navigation.categories.push({
          name: category.name,
          subcategories: [
            ...category.subcategories.map((sub) => ({
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
                imageSrc: await getSignedUrl(
                  { image_path: sub.image },
                  "category-images"
                ),
                imageAlt: sub.name,
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

    navigation.pages.push(
      { name: "Repairs & Calibration", href: "/service-repairs-calibration" },
      { name: "Scale Hire", href: "/service-repairs-calibration/scales-hire" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" }
    );

    return navigation;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
