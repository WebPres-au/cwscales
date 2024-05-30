import Image from "next/image";
import { getNavItems } from "@/app/supabase-server";
import Link from "next/link";
import ClientContact from "./ClientContact";

export default async function Footer() {
  const navigation = await getNavItems(true);

  return (
    <>
      <ClientContact />
      <footer
        className="bg-gray-900 border-y-[16px] border-green"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto w-[95%] px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="space-y-8 mb-8">
            <Image
              width={300}
              height={300}
              className="mx-auto"
              src="/CWS_logo.png"
              alt="Company name"
            />
            <p className="text-md text-center leading-6 text-gray-300">
              Providing Correct Weighing Solutions for All Applications
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-8 ">
            {navigation.categories.map((category, index) => {
              let firstHalf = category.subcategories;
              let secondHalf = [];

              if (index === 0) {
                const half = Math.ceil(category.subcategories.length / 2);
                firstHalf = category.subcategories.slice(0, half - 1);
                secondHalf = category.subcategories.slice(half);
              }

              return (
                <div
                  key={category.name}
                  className={index === 0 ? "col-span-2" : "col-span-1"}
                >
                  <h2 className="text-sm font-semibold leading-6 text-green">
                    {category.name}
                  </h2>
                  <div className="grid grid-cols-2">
                    <ul role="list" className="mt-6 space-y-4">
                      {firstHalf
                        .filter(
                          (subcategory) => subcategory.name !== "Browse All"
                        )
                        .map((subcategory) => (
                          <li key={subcategory.name}>
                            <Link
                              href={subcategory.href}
                              className="text-sm leading-6 text-gray-300 hover:text-white"
                            >
                              {subcategory.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                    {index === 0 && (
                      <ul role="list" className="mt-6 space-y-4">
                        {secondHalf
                          .filter(
                            (subcategory) => subcategory.name !== "Browse All"
                          )
                          .map((subcategory) => (
                            <li key={subcategory.name}>
                              <Link
                                href={subcategory.href}
                                className="text-sm leading-6 text-gray-300 hover:text-white"
                              >
                                {subcategory.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
            <div>
              <h2 className="text-sm font-semibold leading-6 text-green">
                Other categories
              </h2>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.pages.map((page) => (
                  <li key={page.name}>
                    <Link
                      href={page.href}
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold leading-6 text-green">
                Company
              </h2>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.company.map((page) => (
                  <li key={page.name}>
                    <Link
                      href={page.href}
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-8 flex justify-between sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-gray-400">
              &copy; CWScales {new Date().getFullYear()}. All rights reserved.
            </p>
            <p className="text-xs leading-5 text-gray-400">
              Made by <a href="https://webpres.au">WebPres</a>
            </p>
          </div>
        </div>
      </footer>
      <DialogPopUp />
    </>
  );
}
