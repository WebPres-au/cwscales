import { getProductsByTag, getServerTags } from "@/app/supabase-server";
import ContentHero from "@/components/ContentHero";

export async function generateMetadata({ params }) {
  const tags = await getServerTags();

  const tag = tags.find((tag) => tag.snake_case_name == params.tag);

  return {
    title: tag.name,
    description: tag.description,
    openGraph: {
      title: tag.name,
      description: tag.description,
      images: [
        {
          url: tag.signedUrl,
          width: 500,
          height: 500,
          alt: tag.name,
        },
      ],
    },
  };
}

export default async function TagPage({ params }) {
  const tags = await getServerTags();

  const tag = tags.find((tag) => tag.snake_case_name == params.tag);

  let products = await getProductsByTag(tag.id);
  products = products.map((product) => {
    return {
      ...product,
      image: product?.images[0]?.signedUrl,
      href: `/product/${product.snake_case_name}`,
    };
  });

  return (
    <div>
      <ContentHero category={tag} content={products} />
      <div className="mt-32" />
    </div>
  );
}
