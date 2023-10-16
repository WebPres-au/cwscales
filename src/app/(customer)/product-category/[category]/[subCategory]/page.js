import {
  getFilteredProducts,
  getServerCategories,
} from "@/app/supabase-server";
import ContentHero from "@/components/ContentHero";

export async function generateMetadata({ params }) {
  const categories = await getServerCategories();

  const subCategory = categories.find(
    (item) => item.snake_case_name == params.subCategory
  );

  return {
    title: subCategory.name,
    description: subCategory.description,
    openGraph: {
      title: subCategory.name,
      description: subCategory.description,
      images: [
        {
          url: subCategory.signedUrl,
          width: 500,
          height: 500,
          alt: subCategory.name,
        },
      ],
    },
  };
}

export default async function SubCategoryPage({ params }) {
  const categories = await getServerCategories();

  const category = categories.find(
    (category) => category.snake_case_name === params.subCategory
  );
  // const title = "Our Range";
  let products = await getFilteredProducts(params.subCategory);
  products = products.map((product) => {
    return { ...product, image: product?.images[0]?.signedUrl, href: `/product/${product.id}` };
  });

  return (
    <div>
      <ContentHero category={category} content={products} />
      <div className="mt-32" />
    </div>
  );
}
