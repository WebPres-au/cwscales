import { getCategory, getProductsFromCategory } from "@/app/supabase-server";
import ContentHero from "@/components/ContentHero";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { subCategory: slug } = await params;
  const subCategory = await getCategory(slug);

  if (!subCategory) {
    return { title: "Category not found" };
  }

  return {
    title: subCategory.name,
    description: subCategory.description,
    openGraph: {
      title: subCategory.name,
      description: subCategory.description,
      images: [
        {
          url: subCategory.image,
          width: 500,
          height: 500,
          alt: subCategory.name,
        },
      ],
    },
  };
}

export default async function SubCategoryPage({ params }) {
  const { subCategory: slug } = await params;
  const category = await getCategory(slug);

  if (!category) notFound();

  const products = await getProductsFromCategory(slug);

  if (products.length > 0) {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    category.image = randomProduct.image;
  }

  return (
    <div>
      <ContentHero category={category} content={products} />
      <div className="mt-32 pb-2" />
    </div>
  );
}
