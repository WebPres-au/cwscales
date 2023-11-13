import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ProductInfo({ categoryName, product, type, isOne }) {
  if (isOne) {
    return (
      <div className="product-info">
        <h2>{product.name}</h2>
        <h3 className="product-code">Product Description:</h3>

        <p>
          {product.description.split("\n").map((item, key) => {
            return (
              <span key={key}>
                {item}
                <br />
              </span>
            );
          })}
        </p>
      </div>
    );
  }
  return (
    <div className="product-info">
      {/* <h2>{categoryName}</h2> */}
      <h3 className="product-code">{product.name}</h3>
      {/* <p>
        {product.short_description}
      </p> */}
      <Link href={product.href} className="pt-6 flex items-center">
        <p className="text-gray-500">View {type}</p>
        <ArrowLongRightIcon className="ml-2 h-6 w-6 text-gray-500" />
      </Link>
    </div>
  );
}
