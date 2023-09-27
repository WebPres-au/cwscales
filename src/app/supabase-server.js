import { snake_case_string } from '@/lib/functions';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient({ cookies })
);

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const getProducts = async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
  .from('products')
  .select(`
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

  const getSignedUrl = async (image) => {
    const { data, error } = await supabase
      .storage
      .from('product-images')
      .createSignedUrl(image.image_path, 60);
    
    if (error) throw error; // Log error
  
    return data.signedUrl;
  }
  
  // Create an array of Promises that resolve to the transformed product objects
  const transformedDataPromises = data.map(async (product) => {
    const categories = product.product_categories.map(pc => pc.categories);
    const tags = product.product_tags.map(pt => pt.tags);
    
    // Await all the signed URLs and create the images array
    const images = await Promise.all(product.product_images.map(async (image) => {return {...image, signedUrl: await getSignedUrl(image)}}));

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
  const { data, error } = await supabase
    .from('products')
    .select(`
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

  const getSignedUrl = async (image) => {
    const { data, error } = await supabase
      .storage
      .from('product-images')
      .createSignedUrl(image.image_path, 60);
    
    if (error) throw error; // Log error
  
    return data.signedUrl;
  }

  // Create an array of Promises that resolve to the transformed product objects
  const transformedDataPromises = data.map(async (product) => {
    const categories = product.product_categories.map(pc => pc.categories);
    const tags = product.product_tags.map(pt => pt.tags);

    // Await all the signed URLs and create the images array
    const images = await Promise.all(product.product_images.map(async (image) => {return {...image, signedUrl: await getSignedUrl(image)}}));

    return {
      ...product,
      categories,
      tags,
      images,
    };
  });

  // Wait for all Promises to resolve and get the transformed data
  const transformedData = await Promise.all(transformedDataPromises);

  // Filter products based on the categoryName
  return transformedData.filter(product => 
    product.categories.some(category => snake_case_string(category.name) === categoryName)
  );
};


export const getServerCategories = async () => {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase.from("categories").select();
    if (error) throw error;
    return data;
  } catch (error) {
    toast.error(error.message);
    return [];
  }
};