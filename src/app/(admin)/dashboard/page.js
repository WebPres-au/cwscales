import KebabMenu from "./KebabMenu";
import { getProductsFromCategory } from "@/app/supabase-server";
import Image from "next/image";
import { classNames, snake_case_string } from "@/lib/functions";
import Link from "next/link";

const statuses = {
  Active: "text-green bg-green/30",
  Archived: "text-red-900 bg-red-900/30",
};

export default async function ProductList({ searchParams }) {
  const { category, subcategory } = searchParams;

  let products;
  if (subcategory) {
    products = await getProductsFromCategory(subcategory, null, true);
  } else if (category) {
    products = await getProductsFromCategory(category, null, true);
  } else {
    products = await getProductsFromCategory("", null, true);
  }

  return (
    <ul role="list" className="divide-y mb-32 divide-gray-100">
      {products.map((product) => {
        product.status = product.isPublic ? "Active" : "Archived";

        return (
          <li
            key={product.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0">
              <div className="flex">
                {product.images && product.images.length > 0 && (
                  <Image
                    className="h-16 w-16 flex-none rounded-sm bg-gray-50"
                    src={product.images[0].signedUrl}
                    alt={product.name}
                    width={64}
                    height={64}
                  />
                )}
                <div className="ml-3 mt-2">
                  <div className="flex items-start">
                    <p className="text-sm font-semibold leading-6 text-gray-900 mr-2">
                      {product.name}
                    </p>
                    <div
                      className={classNames(
                        statuses[product.status],
                        "flex-none rounded-full p-1 mt-1"
                      )}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-current" />
                    </div>
                    <div
                      className={classNames(
                        statuses[product.status],
                        "block ml-1"
                      )}
                    />
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {product.tags?.map((tag) => (
                      <Link
                        href={`/product-tag/${snake_case_string(tag.name)}`}
                        className={
                          "rounded-md whitespace-nowrap mt-0.5 px-3 py-1 text-xs font-medium ring-1 ring-inset"
                        }
                        key={tag.id}
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <a
                href={product.href}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
              >
                View product<span className="sr-only">, {product.name}</span>
              </a>
              <KebabMenu product={product} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
