"use server";

import { snake_case_string } from "@/lib/functions";
import { requireAdmin } from "@/lib/supabase/auth";
import { createServerClient } from "@/lib/supabase/server";

const PRODUCT_BUCKET = "product-images";
const CATEGORY_BUCKET = "category-images";

function resultError(error) {
  console.error("Admin operation failed:", error);
  return { data: null, error: error?.message || "Operation failed" };
}

function safeFileName(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

async function adminClient() {
  await requireAdmin();
  return createServerClient();
}

export async function getAdminTaxonomy() {
  try {
    const supabase = await adminClient();
    const [categories, tags] = await Promise.all([
      supabase.from("categories").select("id,name,parent_category,snake_case_name"),
      supabase.from("tags").select("id,name,snake_case_name"),
    ]);
    if (categories.error) throw categories.error;
    if (tags.error) throw tags.error;
    return { data: { categories: categories.data, tags: tags.data }, error: null };
  } catch (error) {
    return resultError(error);
  }
}

export async function createProduct(input) {
  try {
    const supabase = await adminClient();
    if (!input.name?.trim() || !input.categoryIds?.length) {
      throw new Error("A name and at least one category are required");
    }

    const { data: product, error } = await supabase
      .from("products")
      .insert({
        name: input.name.trim(),
        snake_case_name: snake_case_string(input.name),
        description: input.description || "",
        short_description: input.shortDescription || "",
        isPublic: Boolean(input.isPublic),
        youtube_link: input.youtubeLink || "",
      })
      .select("id")
      .single();
    if (error) throw error;

    const categoryRows = input.categoryIds.map((categoryId) => ({
      product_id: product.id,
      category_id: categoryId,
    }));
    const { error: categoryError } = await supabase
      .from("product_categories")
      .insert(categoryRows);
    if (categoryError) throw categoryError;

    if (input.tagIds?.length) {
      const { error: tagError } = await supabase.from("product_tags").insert(
        input.tagIds.map((tagId) => ({ product_id: product.id, tag_id: tagId }))
      );
      if (tagError) throw tagError;
    }

    const imageRows = [];
    for (const file of input.files || []) {
      const path = `product_images/${product.id}/${safeFileName(file.name)}`;
      const { error: uploadError } = await supabase.storage
        .from(PRODUCT_BUCKET)
        .upload(path, file);
      if (uploadError) throw uploadError;
      imageRows.push({ product_id: product.id, image_path: path });
    }
    if (imageRows.length) {
      const { error: imageError } = await supabase
        .from("product_images")
        .insert(imageRows);
      if (imageError) throw imageError;
    }

    return { data: { id: product.id }, error: null };
  } catch (error) {
    return resultError(error);
  }
}

export async function updateProduct(input) {
  try {
    const supabase = await adminClient();
    if (!input.id || !input.name?.trim() || !input.categoryIds?.length) {
      throw new Error("A product, name, and at least one category are required");
    }
    const { error } = await supabase
      .from("products")
      .update({
        name: input.name.trim(),
        snake_case_name: snake_case_string(input.name),
        description: input.description || "",
        short_description: input.shortDescription || "",
        isPublic: Boolean(input.isPublic),
        youtube_link: input.youtubeLink || "",
      })
      .eq("id", input.id);
    if (error) throw error;

    const [categoriesDelete, tagsDelete] = await Promise.all([
      supabase.from("product_categories").delete().eq("product_id", input.id),
      supabase.from("product_tags").delete().eq("product_id", input.id),
    ]);
    if (categoriesDelete.error) throw categoriesDelete.error;
    if (tagsDelete.error) throw tagsDelete.error;

    const { error: categoryError } = await supabase
      .from("product_categories")
      .insert(input.categoryIds.map((categoryId) => ({ product_id: input.id, category_id: categoryId })));
    if (categoryError) throw categoryError;
    if (input.tagIds?.length) {
      const { error: tagError } = await supabase
        .from("product_tags")
        .insert(input.tagIds.map((tagId) => ({ product_id: input.id, tag_id: tagId })));
      if (tagError) throw tagError;
    }

    const imageRows = [];
    for (const file of input.files || []) {
      const path = `product_images/${input.id}/${safeFileName(file.name)}`;
      const { error: uploadError } = await supabase.storage.from(PRODUCT_BUCKET).upload(path, file);
      if (uploadError) throw uploadError;
      imageRows.push({ product_id: input.id, image_path: path });
    }
    if (imageRows.length) {
      const { error: imageError } = await supabase.from("product_images").insert(imageRows);
      if (imageError) throw imageError;
    }
    return { data: { id: input.id }, error: null };
  } catch (error) {
    return resultError(error);
  }
}

export async function setProductPublished(productId, isPublic) {
  try {
    const supabase = await adminClient();
    const { error } = await supabase.from("products").update({ isPublic: Boolean(isPublic) }).eq("id", productId);
    if (error) throw error;
    return { data: true, error: null };
  } catch (error) { return resultError(error); }
}

export async function deleteProduct(productId) {
  try {
    const supabase = await adminClient();
    const { error } = await supabase.from("products").delete().eq("id", productId);
    if (error) throw error;
    return { data: true, error: null };
  } catch (error) { return resultError(error); }
}

export async function deleteProductImage({ imageId, imagePath }) {
  try {
    const supabase = await adminClient();
    const { error } = await supabase.storage.from(PRODUCT_BUCKET).remove([imagePath]);
    if (error) throw error;
    const { error: rowError } = await supabase.from("product_images").delete().eq("id", imageId);
    if (rowError) throw rowError;
    return { data: true, error: null };
  } catch (error) { return resultError(error); }
}

export async function createCategory(input) {
  try {
    const supabase = await adminClient();
    if (!input.name?.trim() || !input.file) throw new Error("A category name and image are required");
    const { data, error } = await supabase.from("categories").insert({
      name: input.name.trim(),
      parent_category: input.parentCategory || null,
      snake_case_name: snake_case_string(input.name),
      description: input.description || "",
      isFeatured: Boolean(input.isFeatured),
    }).select("id,name,parent_category,snake_case_name").single();
    if (error) throw error;
    const path = `categories/${data.id}/${safeFileName(input.file.name)}_${Date.now()}`;
    const { error: uploadError } = await supabase.storage.from(CATEGORY_BUCKET).upload(path, input.file);
    if (uploadError) throw uploadError;
    const { error: imageError } = await supabase.from("categories").update({ image: path }).eq("id", data.id);
    if (imageError) throw imageError;
    return { data, error: null };
  } catch (error) { return resultError(error); }
}

export async function createTag(name) {
  try {
    const supabase = await adminClient();
    if (!name?.trim()) throw new Error("A tag name is required");
    const { data, error } = await supabase.from("tags").insert({
      name: name.trim(), snake_case_name: snake_case_string(name),
    }).select("id,name,snake_case_name").single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) { return resultError(error); }
}
