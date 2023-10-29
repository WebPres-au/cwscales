import { getCategory, getProductsFromCategory } from "@/app/supabase-server";
import ContentHero from "@/components/ContentHero";
export async function generateMetadata({ params }) {
  const subCategory = await getCategory(params.subCategory);

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
  const category = await getCategory(params.subCategory);

  let products = await getProductsFromCategory(params.subCategory);

  return (
    <div>
      <ContentHero category={category} content={products} />
      <div className="mt-32" />
    </div>
  );
}
