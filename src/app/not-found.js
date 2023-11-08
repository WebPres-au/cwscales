import Footer from "@/components/ui/Footer";
import Navigation from "@/components/ui/Navigation";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

const links = [
  {
    name: "Digital Weighing Scales",
    href: "/product-category/digital-weighing-scales",
    description: "View our digital weighing scales range",
  },
  {
    name: "Packaging Equipment",
    href: "/product-category/packaging-equipment",
    description: "Our large scale packaging equipment for all your needs",
  },
  {
    name: "Rental enquiries",
    href: "/#contact",
    description: "We do rentals for any duration, reach out to learn more",
  },
];

export default function Custom404() {
  return (
    <div>
      <Navigation />
      <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-24 sm:pb-24 lg:px-8 mt-32">
        <Image
          className="mx-auto h-10 w-auto sm:h-12"
          src="/CWS_logo.png"
          alt="Your Company"
          width={200}
          height={100}
        />
        <div className="mx-auto max-w-2xl text-center mt-12">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            This page does not exist
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
          <h2 className="sr-only">Popular pages</h2>
          <ul
            role="list"
            className="-mt-6 divide-y divide-gray-900/5 border-b border-gray-900/5"
          >
            {links.map((link, linkIdx) => (
              <li key={linkIdx} className="relative flex gap-x-6 py-6">
                <div className="flex-auto">
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    <a href={link.href}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      {link.name}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {link.description}
                  </p>
                </div>
                <div className="flex-none self-center">
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="text-sm font-semibold leading-6 text-white bg-green px-2.5 py-2 rounded-md"
            >
              <span className="mr-2" aria-hidden="true">
                &larr;
              </span>
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
