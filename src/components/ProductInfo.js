import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function ProductInfo() {
  return (
    <div className="product-info">
      <h2>Medical Floor Scale</h2>
      <h3 className="product-code">LOG907</h3>
      <p>
        The NUWEIGH LOG907 is TGA approved, robust medical floor scale with a
        large non-slip platform.
      </p>
      <div className="pt-6 flex items-center">
        <p className="text-gray-500">Product Details</p>
        <ArrowLongRightIcon className="ml-2 h-6 w-6 text-gray-500" />
      </div>
    </div>
  );
}
