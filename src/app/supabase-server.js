import { snake_case_string } from "@/lib/functions";
import { createServerClient } from '@supabase/ssr'; // Updated import
import { cookies } from 'next/headers';
import { cache } from 'react';

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies(); 

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
});

const supabase = createServerSupabaseClient();

export async function getSession() {
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
  const { data, error } = await supabase.storage
    .from(bucket)
    .getPublicUrl(image.image_path);

  if (error) throw error;

  return data.publicUrl;
};

export const getProductsFromCategory = async (
  categoryName,
  includesDrafts = false
) => {
  try {
    let subcategories = [];

    if(categoryName) {
      const categoryReq = await supabase.from("categories").select("id, parent_category").eq("snake_case_name", categoryName).single();
      const subcategoriesReq = await supabase.from("categories").select("snake_case_name").eq("parent_category", categoryReq.data.id);
      if(subcategoriesReq.data.length > 0){
        subcategories = [...subcategories, subcategoriesReq.data.map((subcategory) => subcategory.snake_case_name) ];
      }
    }

    const { data, error } = await supabase.rpc("getproductsfromcategory", {
      categoryname: categoryName,
      subcategories: subcategories,
      includesdrafts: includesDrafts,
    });
    
    if (error) throw error;

    // Create an array of Promises that resolve to the transformed product objects
    const transformedDataPromises = data.map(async (product) => {
      // Await all the signed URLs and create the images array
      const id = product.product_id;
      const name = product.product_name;
      const description = product.description;
      const isPublic = product.isPublic;
      const href = `/product/${snake_case_string(product.product_name)}`;
      delete product.product_id;
      delete product.product_name;
      delete product.isPublic;
      delete product.description;

      const images = product?.images? await Promise.all(
        product?.images?.map(async (image, index) => {
          return {
            ...image,
            signedUrl: await getSignedUrl(image, "product-images"),
          };
        })
      ) : null;

      return {
        id,
        name,
        description,
        image: images ? images[0]?.signedUrl : null,
        ...product,
        href,
        images,
        isPublic,
      };
    });

    // Wait for all Promises to resolve and return the transformed data
    return await Promise.all(transformedDataPromises);
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

export const getProductsByTag = async (tagID) => {
  const { data: tagsData, error: tagsError } = await supabase
    .from("product_tags")
    .select("product_id")
    .eq("tag_id", tagID);

  if (tagsError) {
    console.error(tagsError.message);
    return [];
  }

  const productIds = tagsData.map((tag) => tag.product_id);

  const { data: productsData, error: productsError } = await supabase
    .from("products")
    .select(
      `
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
    `
    )
    .in("id", productIds);

  if (productsError) {
    console.error(productsError.message);
    return [];
  }

  // Create an array of Promises that resolve to the transformed product objects
  const transformedDataPromises = productsData.map(async (product) => {
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

export const getCategory = async (categoryName) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select()
      .eq("snake_case_name", categoryName)
      .single();

    if (error) throw error;

    let category = data;

    category.image = await getSignedUrl(
      { image_path: category.image },
      "category-images"
    );

    return category;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const getCategoryWithSubcategories = async (categoryName) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select()
      .eq("snake_case_name", categoryName)
      .single();

    if (error) throw error;

    let category = data;

    category.image = await getSignedUrl(
      { image_path: category.image },
      "category-images"
    );

    const { data: subcategories, error: subcategoriesError } = await supabase
      .from("categories")
      .select()
      .eq("parent_category", category.id)
      .order("isFeatured", { ascending: false });

    if (subcategoriesError) throw subcategoriesError;

    const subcategoriesWithImages = await Promise.all(
      subcategories.map(async (subcategory) => {
        return {
          ...subcategory,
          href: `/product-category/${categoryName}/${subcategory.snake_case_name}`,
          image: await getSignedUrl(
            { image_path: subcategory.image },
            "category-images"
          ),
        };
      })
    );

    return {
      ...category,
      subcategories: subcategoriesWithImages,
    };
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const getServerTags = async () => {
  try {
    const { data, error } = await supabase.from("tags").select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

export const getNavItems = async (hasStaticPages = false) => {
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

    if (hasStaticPages) {
      navigation.pages.push(
        { name: "Repairs & Calibration", href: "/service-repairs-calibration" },
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

export const getProductDetails = async (name) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
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
      `
      )
      .eq("snake_case_name", name)
      .single();

    if (error) throw error;

    const product = data;

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
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

export const getProducts = async () => {
  try {
    const { data, error } = await supabase.from("products").select("*");

    if (error) throw error;

    const products = data;

    return products;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};
