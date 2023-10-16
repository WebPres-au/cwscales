import {
    getFilteredProducts,
    getProductDetails,
    getServerCategories,
  } from "@/app/supabase-server";
  import ContentHero from "@/components/ContentHero";

  export async function generateMetadata({ params }) {
    const product = await getProductDetails(params.id);
  
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
    const product = await getProductDetails(params.id);
    product.href = `/product/${product.id}`;
    product.image = product?.images[0]?.signedUrl;
    const categories = await getServerCategories();
  
    return (
      <div>
        <ContentHero category={product} content={[product]} isOne />
        <div className="mt-32" />
      </div>
    );
  }
  