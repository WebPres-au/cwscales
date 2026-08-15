import { getProductsByTag, getServerTags } from "@/app/supabase-server";
import ContentHero from "@/components/ContentHero";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { tag: slug } = await params;
  const tags = await getServerTags();

  const tag = tags.find((tag) => tag.snake_case_name === slug);

  if (!tag) return { title: "Tag not found" };

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
  const { tag: slug } = await params;
  const tags = await getServerTags();

  const tag = tags.find((tag) => tag.snake_case_name === slug);

  if (!tag) notFound();

  let products = await getProductsByTag(tag.id);
  products = products.map((product) => {
    return {
      ...product,
      image: product?.images[0]?.signedUrl,
      href: `/product/${product.snake_case_name}`,
    };
  });

  if (products.length > 0) {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    tag.image = randomProduct.image;
  }

  return (
    <div>
      <ContentHero category={tag} content={products} />
      <div className="mt-32 pb-2" />
    </div>
  );
}
