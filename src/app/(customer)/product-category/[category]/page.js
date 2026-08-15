import {
  getCategory,
  getCategoryWithSubcategories,
  getProductsFromCategory,
} from "@/app/supabase-server";
import ContentHero from "@/components/ContentHero";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const category = await getCategory(slug);

  if (!category) return { title: "Category not found" };

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: category.name,
      description: category.description,
      images: [
        {
          url: category.image,
          width: 500,
          height: 500,
          alt: category.name,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category: slug } = await params;
  const data = await getCategoryWithSubcategories(slug);

  if (!data) notFound();

  let category = { ...data };
  delete category.subcategories;

  let subCategories = data.subcategories;
  const isParent = subCategories.length > 0 ? true : false;

  let products;

  if (isParent) {
    products = [];
  } else {
    products = await getProductsFromCategory(slug);
  }
  // if (products.length > 0) {
  //   const randomProduct = products[Math.floor(Math.random() * products.length)];
  //   category.image = randomProduct.image;
  // }
  return (
    <div>
      <ContentHero
        category={category}
        content={isParent ? subCategories : products}
        type={isParent ? "Subcategory" : "Product"}
      />
      <div className="mt-32 pb-2" />
    </div>
  );
}
