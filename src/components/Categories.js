import Image from "next/image";
import { categories } from "@/lib/data";

export default function Categories() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-full">
        <div className="mx-auto grid max-w-full auto-rows-fr grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {categories.map((item, index) => (
            <article
              key={index}
              className={`relative isolate flex flex-col justify-end overflow-hidden bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 ${
                index === 0 ? "col-span-2 lg:col-span-1" : ""
              }`}
            >
              <Image
                src={item.imageUrl}
                alt={item.description}
                className="absolute inset-0 -z-10 h-full w-full object-cover"
                fill={true}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/10" />

              <h3 className="mt-3 text-lg font-semibold leading-6 text-center text-white">
                <a href={item.href}>
                  <span className="absolute inset-0" />
                  {item.title}
                </a>
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
