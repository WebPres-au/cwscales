"use client";
import Image from "next/image";
import ProductInfo from "./ProductInfo";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

export default function ContentHero({ category, content }) {
  if (!category) return <div>loading...</div>;
  return (
    <>
      <div className="flex flex-wrap lg:flex-nowrap [&>*]:basis-full lg:[&>*]:basis-1/2 mt-32 min-h-screen -mb-32">
        <div className="relative">
          <div className="absolute bottom-0 left-0 p-20 z-10 text-white">
            <h1 className="capitalize text-3xl sm:text-6xl md:text-8xl">
              {category.name}
            </h1>
            <p className="pt-4">{category.description}</p>
            <button className="px-4 py-2 bg-blue-400 rounded-md mt-2">
              Enquire now
            </button>
          </div>
          {category.signedUrl && (
            <Image
              src={category.signedUrl}
              className="object-cover opacity-90 w-full h-full"
              width={400}
              height={400}
              alt={category.name}
              priority
              unoptimized
            />
          )}
        </div>
        <div className="w-full lg:w-1/2 h-full inset-0 ml-auto sm:mt-[0vh] ">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 300: 1, 1280: 2, }}
          >
            <Masonry>
              {content.length > 0 &&
                content.map((item, index) => (
                  <div
                    key={index}
                    className="h-full w-full group hover:border hover:border-gray-400 border border-white delay-75"
                  >
                    {item.image && (
                      <Image
                        className="w-full h-auto lg:h-auto lg:w-full object-cover"
                        width={400}
                        height={400}
                        src={item.image}
                        alt={item.name}
                      />
                    )}
                    <ProductInfo categoryName={category.name} product={item} />
                  </div>
                ))}
            </Masonry>
          </ResponsiveMasonry>

          {content.length <= 0 && (
            <div className="h-full w-full mx-auto group hover:border hover:border-gray-400 border border-white delay-75">
              No products found
            </div>
          )}
        </div>
      </div>
    </>
  );
}
