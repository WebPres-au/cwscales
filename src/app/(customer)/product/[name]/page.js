import { getProductDetails } from "@/app/supabase-server";
import ContentHero from "@/components/ContentHero";
import { snake_case_string } from "@/lib/functions";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { name } = await params;
  const product = await getProductDetails(name);

  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.short_description,
    openGraph: {
      title: product.name,
      description: product.short_description,
      images: [
        {
          url: product?.images[0]?.signedUrl,
          width: 500,
          height: 500,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }) {
  const { name } = await params;
  const product = await getProductDetails(name);

  if (!product || !product.isPublic) notFound();

  product.href = `/product/${snake_case_string(product.name)}`;
  product.image = product?.images[0]?.signedUrl;

  return (
    <div>
      <ContentHero category={product} content={[product]} isOne />
      <div className="mt-32 pb-2" />
    </div>
  );
}
