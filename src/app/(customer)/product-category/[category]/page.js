import {
  getFilteredProducts,
  getServerCategories,
} from "@/app/supabase-server";
import ContentHero from "@/components/ContentHero";

export default async function CategoryPage({ params }) {
  const categories = await getServerCategories();

  const category = categories.find(
    (category) => category.snake_case_name === params.category
  );
  // const title = "Our Range";
  let products = await getFilteredProducts(params.category);
  products = products.map((product) => {
    return { ...product, image: product?.images[0]?.signedUrl, href: "#" };
  });

  return (
    <div>
      <ContentHero category={category} content={products} />
      <div className="mt-32" />
    </div>
  );
}
