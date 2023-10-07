import KebabMenu from "./KebabMenu";
import { getProducts, getSession } from "@/app/supabase-server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { classNames } from "@/lib/functions";

const statuses = {
  Complete: "text-green-700 bg-green-50 ring-green-600/20",
  "In progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
  Archived: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
};

export default async function ProductList() {
  const session = await getSession();

  let products = await getProducts();

  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <ul role="list" className="divide-y mb-32 divide-gray-100">
      {products.map((product) => {

        product.status = product.isPublic ? "Complete" : "Archived";

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
                    {/* <p
                      className={
                        "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                      }
                      key={"status"}
                    >
                      {product.isPublic ? "Public" : "Draft"}
                    </p> */}
                    <div
                      className={classNames(
                        statuses[product.status],
                        "flex-none rounded-full p-1"
                      )}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-current" />
                    </div>
                    <div className="hidden text-white sm:block">
                      {product.status}
                    </div>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {product.tags.map((tag) => (
                      <p
                        className={
                          "rounded-md whitespace-nowrap mt-0.5 px-3 py-1 text-xs font-medium ring-1 ring-inset"
                        }
                        key={tag.id}
                      >
                        {tag.name}
                      </p>
                    ))}
                  </div>
                  {/* <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p className="">{product.short_description}</p>
                  </div> */}
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
        )
      }
      
      )}
    </ul>
  );
}
