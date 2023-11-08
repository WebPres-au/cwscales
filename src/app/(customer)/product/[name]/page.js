import { getProductDetails } from "@/app/supabase-server";
import ContentHero from "@/components/ContentHero";
import { snake_case_string } from "@/lib/functions";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }) {
  const product = await getProductDetails(params.name);

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
  const product = await getProductDetails(params.name);
  product.href = `/product/${snake_case_string(product.name)}`;
  product.image = product?.images[0]?.signedUrl;

  if (!product.isPublic) {
    redirect("/404");
  }

  return (
    <div>
      <ContentHero category={product} content={[product]} isOne />
      <div className="mt-32 pb-2" />
    </div>
  );
}
