import {
  getFilteredProducts,
  getServerCategories,
  getSubCategories,
} from "@/app/supabase-server";
import ContentHero from "@/components/ContentHero";

export async function generateMetadata({ params }) {
  const categories = await getServerCategories();

  const category = categories.find(
    (item) => item.snake_case_name == params.category
  );

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: category.name,
      description: category.description,
      images: [
        {
          url: category.signedUrl,
          width: 500,
          height: 500,
          alt: category.name,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params }) {
  const categories = await getServerCategories();

  const category = categories.find(
    (category) => category.snake_case_name === params.category
  );

  let products = await getFilteredProducts(params.category);
  products = products.map((product) => {
    return { ...product, image: product?.images[0]?.signedUrl, href: `/product/${product.id}` };
  });

  let subCategories = categories.filter((cat) => cat.parent_category === category.id);
  subCategories = subCategories.sort(
    // featured first
    (a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1)
  ).map((sub) => ({
    ...sub,
    href: `/product-category/${params.category}/${sub.snake_case_name}`,
    image: sub.signedUrl,
  }));

  const isParent = subCategories.length > 0;

  return (
    <div>
      <ContentHero category={category} content={isParent ? subCategories : products} type={isParent ? "Subcategory" : "Product"} />
      <div className="mt-32" />
    </div>
  );
}
