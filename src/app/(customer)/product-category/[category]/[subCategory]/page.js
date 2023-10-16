import {
  getFilteredProducts,
  getServerCategories,
} from "@/app/supabase-server";
import ContentHero from "@/components/ContentHero";

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
