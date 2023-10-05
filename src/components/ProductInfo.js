import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function ProductInfo({ categoryName, product }) {
  return (
    <div className="product-info">
      <h2>{categoryName}</h2>
      <h3 className="product-code">{product.name}</h3>
      {/* <p>
        {product.short_description}
      </p> */}
      <div className="pt-6 flex items-center">
        <p className="text-gray-500">Product Details</p>
        <ArrowLongRightIcon className="ml-2 h-6 w-6 text-gray-500" />
      </div>
    </div>
  );
}
