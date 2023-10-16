import {
    getFilteredProducts,
    getProductDetails,
    getServerCategories,
  } from "@/app/supabase-server";
  import ContentHero from "@/components/ContentHero";
  
  export default async function ProductPage({ params }) {
    const product = await getProductDetails(params.id);
    product.href = `/product/${product.id}`;
    product.image = product?.images[0]?.signedUrl;
    const categories = await getServerCategories();
  

    // const title = "Our Range";


  
    return (
      <div>
        <ContentHero category={product} content={[product]} isOne />
        <div className="mt-32" />
      </div>
    );
  }
  